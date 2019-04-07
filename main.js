const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain} = require('electron')
const {remote} = require('electron');
const {parse} = require('parse');
const axios = require('axios');
const qs = require('qs');

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token'
const GOOGLE_PROFILE_URL = 'https://www.googleapis.com/userinfo/v2/me'

require('electron-handlebars') ({
  MODE: process.env["MODE"],
  LOG_URL: process.env["LOG_URL"],
  BASE_URL: process.env["BASE_URL"],
  CSRF_TOKEN: "",
  GOOGLE_API_KEY: ""
});

let win

function createWindow() {
  let win = new BrowserWindow({ width: 800, height: 600})

  win.loadURL(url.format({
    pathname: path.join(__dirname, './build/web/views/editor.html'), //./code.pyret.org/build/web/views/editor.html
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.openDevTools()

  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  //win.loadFile('./code.pyret.org/build_experiment/web/views/editor.html')//./code.pyret.org/build/web/views/editor.html
}








ipcMain.on('openFile', (event, path) => {
  const {dialog} = require('electron')
  const fs = require('fs')
  dialog.showOpenDialog(function (fileNames) {
    if(fileNames === undefined) {
      console.log("No file selected");
    } else {
      readFile(fileNames[0]);
    }
  });

  function readFile(filepath) {
    fs.readFile(filepath, 'utf-8', (err, data) => {
      if(err){
        alert("An error occurred reading the file:" + err.message)
        return
      }
      event.sender.send('fileData', data)
    })
  }
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

// module.exports = {
//   signInWithPopup: function () {
//     return new Promise((resolve, reject) => {
//       const authWindow = new remote.BrowserWindow({
//         width: 500,
//         height: 600,
//         show: true,
//       })
// 
//       // TODO: Generate and validate PKCE code_challenge value
//       const urlParams = {
//         response_type: 'code',
//         redirect_uri: GOOGLE_REDIRECT_URI,
//         client_id: GOOGLE_CLIENT_ID,
//         scope: 'profile email',
//       }
//       const authUrl = `${GOOGLE_AUTHORIZATION_URL}?${qs.stringify(urlParams)}`
// 
//       function handleNavigation (url) {
//         const query = parse(url, true).query
//           if (query) {
//             if (query.error) {
//               reject(new Error(`There was an error: ${query.error}`))
//             } else if (query.code) {
//               // Login is complete
//               authWindow.removeAllListeners('closed')
//               setImmediate(() => authWindow.close())
// 
//               // This is the authorization code we need to request tokens
//               resolve(query.code)
//             }
//           }
// 
//       }
// 
//       authWindow.on('closed', () => {
//         // TODO: Handle this smoothly
//         throw new Error('Auth window was closed by user')
//       })
// 
//       authWindow.webContents.on('will-navigate', (event, url) => {
//         handleNavigation(url)
//       })
// 
//       authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
//         handleNavigation(newUrl)
//       })
// 
//       authWindow.loadURL(authUrl)
//     })
//   },
// 
//   googleSignIn: async function() {
//     const code = await signInWithPopup()
//     const tokens = await fetchAccessTokens(code)
//     const {id, email, name} = await fetchGoogleProfile(tokens.access_token)
//     const providerUser = {
//       uid: id,
//       email,
//       displayName: name,
//       idToken: tokens.id_token,
//     }
// 
//     return mySignInFunction(providerUser)
//   },
//   fetchAccessTokens: async function (code) {
//     const response = await axios.post(GOOGLE_TOKEN_URL, qs.stringify({
//       code,
//       client_id: GOOGLE_CLIENT_ID,
//       redirect_uri: GOOGLE_REDIRECT_URI,
//       grant_type: 'authorization_code',
//     }), {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     })
//     return response.data
//   },
// 
// };
