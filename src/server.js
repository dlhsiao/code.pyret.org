var Q = require("q");
var gapi = require('googleapis');
var path = require('path');
var uuid = require('node-uuid');

var BACKREF_KEY = "originalProgram";

function start(config, onServerReady) {
  var express = require('express');
  var cookieSession = require('cookie-session');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var csrf = require('csurf');
  var googleAuth = require('./google-auth.js');
  var request = require('request');
  var mustache = require('mustache-express');
  var url = require('url');
  var fs = require('fs');

  function loggedIn(req) {
    var session = req.session;
    return session && session["user_id"];
  }

  function requireLogin(req, res) {
    var login = Q.defer();
    var session = req.session;
    function redirect() {
      res.redirect("/login?redirect=" + encodeURIComponent(req.originalUrl));
    }
    if(!session || !session["user_id"]) {
      redirect();
    }
    else {
      var maybeUser = db.getUserByGoogleId(req.session["user_id"]);
      maybeUser.then(function(u) {
        login.resolve(u);
      });
    }
    return login.promise;
  }

  app = express();
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // From http://stackoverflow.com/questions/7185074/heroku-nodejs-http-to-https-ssl-forced-redirect
  /* At the top, with other redirect methods before other routes */
  app.get('*',function(req,res,next){
    if(req.headers['x-forwarded-proto'] !== 'https' && !config.development)
      res.redirect(config.baseUrl + req.url);
    else
      next(); /* Continue to other routes if we're not redirecting */
  })

  // This has to go first to override other options
  app.get("/js/pyret.js", function(req, res) {
    res.set("Content-Encoding", "gzip");
    res.set("Content-Type", "application/javascript");
    res.send(fs.readFileSync("build/web/js/pyret.js.gz"));
  });
  app.get("/js/cpo-main.jarr.gz.js", function(req, res) {
    res.set("Content-Encoding", "gzip");
    res.set("Content-Type", "application/javascript");
    res.send(fs.readFileSync("build/web/js/cpo-main.jarr.gz.js"));
  });

  app.use(cookieSession({
    secret: config.sessionSecret,
    key: "code.pyret.org"
  }));
  app.use(cookieParser());

  var auth = googleAuth.makeAuth(config);
  var db = config.db;

  app.set('views', __dirname + '/../build/web/views');
  app.engine('html', mustache());
  app.set('view engine', 'html');

  app.use(express.static(__dirname + "/../build/web/"));
  if(config.development) {
    app.use(express.static(__dirname + "/../test-util/"));
  }

  app.use(csrf());

  app.get("/close.html", function(_, res) { res.render("close.html"); });

  app.get("/faq", function(_, res) { res.render("faq.html"); });

  app.get("/", function(req, res) {
    var content = loggedIn(req) ? "My Programs" : "Log In";
    res.render("index.html", {
      LEFT_LINK: content,
      GOOGLE_API_KEY: config.GOOGLE_API_KEY
    });
  });

  app.get("/login", function(req, res) {
    var redirect = req.param("redirect") || "/editor";
    if(!(req.session && req.session["user_id"])) {
      res.redirect(auth.getAuthUrl(redirect));
    }
    else {
      res.redirect(redirect);
    }
  });

  app.use(function(req, res, next) {
    var contentType = req.headers['content-type'] || '';
    var mime = contentType.split(';')[0];

    if (mime != 'application/atom+xml' && mime != 'application/json') {
      return next();
    }

    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
      data += chunk;
    });
    req.on('end', function() {
      req.rawBody = data;
      next();
    });
  });

  app.get("/downloadImg", function(req, response) {
    var parsed = url.parse(req.url);
    var googleLink = decodeURIComponent(parsed.query.slice(0));
    var googleParsed = url.parse(googleLink);
    var gReq = request({url: googleLink, encoding: 'binary'}, function(error, imgResponse, body) {
      if(error) {
        response.status(400).send({type: "image-load-failure", error: "Unable to load image " + String(error)});
      }
      else {
        var h = imgResponse.headers;
        var ct = h['content-type']
        if(ct.indexOf('image/') !== 0) {
          response.status(400).send({type: "non-image", error: "Invalid image type " + ct});
          return;
        }
        response.set('content-type', ct);
        response.end(body, 'binary');
      }
    });
  });

  app.get(config.google.redirect, function(req, res) {
    auth.serveRedirect(req, function(err, data) {
      if(err) { res.send({type: "auth error", error: err}); }
      else {
        var existingUser = db.getUserByGoogleId(data.googleId);
        existingUser.fail(function(err) {
          console.error("Error on getting user: ", err);
          res.send({type: "DB error", error: err});
        });
        var user = existingUser.then(function(user) {
          if(user === null) {
            var newUser = db.createUser({
              google_id: data.googleId,
              refresh_token: data.refresh
            });
            return newUser;
          }
          else {
            var thisUser = user;
            // The refresh token is present if the old one expired; we should
            // always use the most up-to-date token we've received from Google
            // TODO(joe): cache invalidation here
            if(data.refresh) {
              var updated = db.updateRefreshToken(user.google_id, data.refresh);
              thisUser = updated.then(function(_) {
                return db.getUserByGoogleId(data.googleId);
              });
            } else {
              thisUser = Q.fcall(function() { return user; });
            }
            return thisUser;
          }
        });
        user.then(function(u) {
          const redirect = req.param("state") || "/editor";
          req.session["user_id"] = u.google_id;
          res.redirect(redirect);
        });
        user.fail(function(err) {
          console.error("Authentication failure", err, err.stack);
          res.redirect("/authError");
        });
      }
    });
  });

  app.get("/getAccessToken", function(req, res) {
    function noAuth() {
      res.status(404).send("No account information found.");
    }
    if(req.session && req.session["user_id"]) {
      var maybeUser = db.getUserByGoogleId(req.session["user_id"]);
      maybeUser.then(function(u) {
        if(u === null) {
          noAuth();
          return null;
        }
        return auth.refreshAccess(u.refresh_token, function(err, newToken) {
          if(err) { res.send(err); res.end(); return; }
          else {
            res.send({ access_token: newToken, user_id: req.session["user_id"] });
            res.end();
          }
        });
      });
      maybeUser.fail(function(err) {
        console.error("Failed to get an access token: ", err);
        noAuth();
      });
    } else {
      noAuth();
    }
  });

  app.get("/new-from-drive", function(req, res) {
    var u = requireLogin(req, res);
    u.then(function(user) {
      auth.refreshAccess(user.refresh_token, function(err, newToken) {
        var client = new gapi.auth.OAuth2(
            config.google.clientId,
            config.google.clientSecret,
            config.baseUrl + config.google.redirect
          );
        client.setCredentials({
          access_token: newToken
        });
        var drive = gapi.drive({ version: 'v2', auth: client });
        var parsed = url.parse(req.url, true);
        var state = decodeURIComponent(parsed.query["state"]);
        var folderId = JSON.parse(state)["folderId"];
        drive.files.insert({
          resource: {
            title: 'new-file.arr',
            mimeType: 'text/plain',
            parents: [{id: folderId}]
          },
          media: {
            mimeType: 'text/plain',
            body: ''
          }
        }, function(err, response) {
          if(err) {
            res.redirect("/editor");
          }
          else {
            res.redirect("/editor#program=" + response.id);
          }
        });
      });
    });
  });

  app.get("/open-from-drive", function(req, res) {
    var u = requireLogin(req, res);
    u.then(function(user) {
      var parsed = url.parse(req.url, true);
      var state = decodeURIComponent(parsed.query["state"]);
      var programId = JSON.parse(state)["ids"][0];
      res.redirect("/editor#program=" + programId);
    });
  });

  app.get("/editor", function(req, res) {
    res.render("editor.html", {
      CSRF_TOKEN: req.csrfToken()
    });
  });

  app.get("/ide", function(req, res) {
    res.render(
      path.resolve(__dirname, "web", "ide.html"),
      {ASSET_BASE_URL: process.env.ASSET_BASE_URL || ''}
    );
  });

  app.get("/neweditor", function(req, res) {
    res.sendfile("build/web/editor.html");
  });

  app.get("/share", function(req, res) {

  });

  app.post("/create-shared-program", function(req, res) {
  console.log(req);
    var driveFileId = req.body.fileId;
    var title = req.body.title;
    var collectionId = req.body.collectionId;
    console.log(driveFileId, title, collectionId);
    var maybeUser = db.getUserByGoogleId(req.session["user_id"]);
    maybeUser.then(function(u) {
      if(u === null) {
        res.status(403).send("Invalid or inaccessible user information");
        return null;
      }
      auth.refreshAccess(u.refresh_token, function(err, newToken) {
        if(err) { res.send(err); res.end(); return; }
        else {
          var client = new gapi.auth.OAuth2(
              config.google.clientId,
              config.google.clientSecret,
              config.baseUrl + config.google.redirect
            );
          client.setCredentials({
            access_token: newToken
          });

          var drive = gapi.drive({ version: 'v2', auth: client });

          var newFileP = Q.defer();
          
          drive.files.copy({
            fileId: driveFileId,
            resource: {
              name: title + " published",
              parents: [{id: collectionId}],
              properties: [{
                "key": BACKREF_KEY,
                "value": String(driveFileId),
                "visibility": "PRIVATE"
              }]
            }
          }, function(err, response) {
            if(err) { newFileP.reject(err); }
            else {
              newFileP.resolve(response);
            }
          });

          var updatedP = newFileP.promise.then(function(newFile) {
            console.log(newFile);
            return drive.permissions.insert({
              fileId: newFile.id,
              resource: {
                'role': 'reader',
                'type': 'anyone',
                'id': newFile.permissionId
              }
            });
          });

          var bothP = Q.all([newFileP.promise, updatedP])
          var done = bothP.then(function(files) {
            var newFile = files[0];
            var sharedProgram = db.createSharedProgram(newFile.id, u.google_id);
            sharedProgram.then(function(sp) {
              res.send({
                id: newFile.id,
                modifiedDate: newFile.modifiedDate,
                title: title
              });
              res.end();
            });
            return sharedProgram;
          });
          done.fail(function(err) {
            res.status(500);
            console.error("Failed to create shared file: ", err);
            res.send("Failed to create shared file");
            res.end();
          });
        }
      });
    });
    maybeUser.fail(function(err) {
      console.error("Failed to get an access token: ", err);
      noAuth();
    });
  });

  function getDriveClient(token) {
    var client = new gapi.auth.OAuth2(
        config.google.clientId,
        config.google.clientSecret,
        config.baseUrl + config.google.redirect
      );
    client.setCredentials({
      access_token: newToken
    });

    var drive = gapi.drive({ version: 'v2', auth: client });
    return drive;
  }

  app.get("/shared-program-contents", function(req, res) {
    var parsedLink = url.parse(req.selfLink);
    console.log(parsedLink);
    // Don't try redirecting to other places
    if(parsedLink.hostname !== "drive.google.com") {
      res.status(401);
      res.send("Can only fetch contents for Drive files");
      res.ent();
      return;
    }
    var sharedProgramId = req.sharedProgramId;
    var program = db.getSharedProgram(sharedProgramId);
    program.fail(function(err) {
      res.status(404).send("No account information found.");
      res.end();
    });
    program.then(function(p) {
      auth.refreshAccess(prog.userId, function(err, newToken) {
        console.log("refreshAccess: ", err, newToken);
        if(err) { res.status(403).send("Couldn't access shared file " + sharedProgramId); res.end(); return; }
        else {
          request({
              url: req.selfLink,
              headers: {
                method: "get",
                dataType: 'text',
                headers: {'Authorization': 'Bearer ' + gapi.auth.getToken().access_token }
              }
            },
            function(err, response, body) {
              console.log("Download response: ", err, response, body);
              if(err) {
                res.status(400).send("Couldn't access shared file " + id); 
              }
              else {
                res.status(200);
                res.send(body);
                res.end();
              }
            });
        }
      })
    })
  });

  app.get("/shared-program", function(req, res) {
    var sharedProgramId = req.sharedProgramId;
    var program = db.getSharedProgram(sharedProgramId);
    program.fail(function(err) {
      res.status(404).send("No share information found for " + sharedProgramId);
      res.end();
    });
    program.then(function(prog) {
      auth.refreshAccess(prog.userId, function(err, newToken) {
        console.log("refreshAccess: ", err, newToken);
        if(err) { res.status(403).send("Couldn't access shared file " + sharedProgramId); res.end(); return; }
        else {
          var drive = getDriveClient(newToken);
          drive.files.get({fileId: id}, function(err, response) {
            console.log("Get file: ", err, response);
            if(err) { res.status(400).send("Couldn't access shared file " + id); }
            else {
              res.send({
                id: response.id,
                modifiedDate: response.modifiedDate,
                title: response.title,
                selfLink: googFileObject.selfLink
              });
              res.status(200);
              res.end();
            }
          });
        }
      });
    });
  });

  app.get("/embeditor", function(req, res) {
    res.sendfile("build/web/embedditor.html");
  });

  app.get("/my-programs", function(req, res) {
    var u = requireLogin(req, res);
    u.then(function(user) {
      res.sendfile("build/web/my-programs.html");
    });
  });
  app.get("/api-test", function(req, res) {
    res.sendfile("build/web/api-play.html");
  });

  app.get("/logout", function(req, res) {
    req.session = null;
    delete req.session;
    res.redirect("/");
  });

  var server = app.listen(config["port"]);

  onServerReady(app, server);

}

module.exports = {
  start: start
};
