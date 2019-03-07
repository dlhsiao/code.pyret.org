/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "a66059f49be9598f4731"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:5001/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/* global $ jQuery CPO CodeMirror storageAPI Q createProgramCollectionAPI makeShareAPI */
	
	var shareAPI = makeShareAPI((""));
	
	var url = __webpack_require__(2);
	var modalPrompt = __webpack_require__(5);
	window.modalPrompt = modalPrompt;
	
	var LOG = true;
	window.ct_log = function () /* varargs */{
	  if (window.console && LOG) {
	    console.log.apply(console, arguments);
	  }
	};
	
	window.ct_error = function () /* varargs */{
	  if (window.console && LOG) {
	    console.error.apply(console, arguments);
	  }
	};
	var initialParams = url.parse(document.location.href);
	var params = url.parse("/?" + initialParams["hash"]);
	window.highlightMode = "mcmh"; // what is this for?
	window.clearFlash = function () {
	  $(".notificationArea").empty();
	};
	window.stickError = function (message, more) {
	  CPO.sayAndForget(message);
	  clearFlash();
	  var err = $("<div>").addClass("error").text(message);
	  if (more) {
	    err.attr("title", more);
	  }
	  err.tooltip();
	  $(".notificationArea").prepend(err);
	};
	window.flashError = function (message) {
	  CPO.sayAndForget(message);
	  clearFlash();
	  var err = $("<div>").addClass("error").text(message);
	  $(".notificationArea").prepend(err);
	  err.fadeOut(7000);
	};
	window.flashMessage = function (message) {
	  CPO.sayAndForget(message);
	  clearFlash();
	  var msg = $("<div>").addClass("active").text(message);
	  $(".notificationArea").prepend(msg);
	  msg.fadeOut(7000);
	};
	window.stickMessage = function (message) {
	  CPO.sayAndForget(message);
	  clearFlash();
	  var err = $("<div>").addClass("active").text(message);
	  $(".notificationArea").prepend(err);
	};
	window.mkWarningUpper = function () {
	  return $("<div class='warning-upper'>");
	};
	window.mkWarningLower = function () {
	  return $("<div class='warning-lower'>");
	};
	
	$(window).bind("beforeunload", function () {
	  return "Because this page can load slowly, and you may have outstanding changes, we ask that you confirm before leaving the editor in case closing was an accident.";
	});
	
	var Documents = function () {
	
	  function Documents() {
	    this.documents = new Map();
	  }
	
	  Documents.prototype.has = function (name) {
	    return this.documents.has(name);
	  };
	
	  Documents.prototype.get = function (name) {
	    return this.documents.get(name);
	  };
	
	  Documents.prototype.set = function (name, doc) {
	    if (logger.isDetailed) logger.log("doc.set", { name: name, value: doc.getValue() });
	    return this.documents.set(name, doc);
	  };
	
	  Documents.prototype.delete = function (name) {
	    if (logger.isDetailed) logger.log("doc.del", { name: name });
	    return this.documents.delete(name);
	  };
	
	  Documents.prototype.forEach = function (f) {
	    return this.documents.forEach(f);
	  };
	
	  return Documents;
	}();
	
	var VERSION_CHECK_INTERVAL = 120000 + 30000 * Math.random();
	
	function checkVersion() {
	  $.get("/current-version").then(function (resp) {
	    resp = JSON.parse(resp);
	    if (resp.version && resp.version !== ("")) {
	      window.flashMessage("A new version of Pyret is available. Save and reload the page to get the newest version.");
	    }
	  });
	}
	window.setInterval(checkVersion, VERSION_CHECK_INTERVAL);
	
	window.CPO = {
	  save: function save() {},
	  autoSave: function autoSave() {},
	  documents: new Documents()
	};
	$(function () {
	  function merge(obj, extension) {
	    var newobj = {};
	    Object.keys(obj).forEach(function (k) {
	      newobj[k] = obj[k];
	    });
	    Object.keys(extension).forEach(function (k) {
	      newobj[k] = extension[k];
	    });
	    return newobj;
	  }
	  var animationDiv = null;
	  function closeAnimationIfOpen() {
	    if (animationDiv) {
	      animationDiv.empty();
	      animationDiv.dialog("destroy");
	      animationDiv = null;
	    }
	  }
	  CPO.makeEditor = function (container, options) {
	    var initial = "";
	    if (options.hasOwnProperty("initial")) {
	      initial = options.initial;
	    }
	
	    var textarea = jQuery("<textarea aria-hidden='true'>");
	    textarea.val(initial);
	    container.append(textarea);
	
	    var runFun = function runFun(code, replOptions) {
	      options.run(code, { cm: CM }, replOptions);
	    };
	
	    var useLineNumbers = !options.simpleEditor;
	    var useFolding = !options.simpleEditor;
	
	    var gutters = !options.simpleEditor ? ["CodeMirror-linenumbers", "CodeMirror-foldgutter"] : [];
	
	    function reindentAllLines(cm) {
	      var last = cm.lineCount();
	      cm.operation(function () {
	        for (var i = 0; i < last; ++i) {
	          cm.indentLine(i);
	        }
	      });
	    }
	
	    // place a vertical line at character 80 in code editor, and not repl
	    var CODE_LINE_WIDTH = 100;
	
	    var rulers, rulersMinCol;
	    if (options.simpleEditor) {
	      rulers = [];
	    } else {
	      rulers = [{ color: "#317BCF", column: CODE_LINE_WIDTH, lineStyle: "dashed", className: "hidden" }];
	      rulersMinCol = CODE_LINE_WIDTH;
	    }
	
	    var cmOptions = {
	      extraKeys: CodeMirror.normalizeKeyMap({
	        "Shift-Enter": function ShiftEnter(cm) {
	          runFun(cm.getValue());
	        },
	        "Shift-Ctrl-Enter": function ShiftCtrlEnter(cm) {
	          runFun(cm.getValue());
	        },
	        "Tab": "indentAuto",
	        "Ctrl-I": reindentAllLines,
	        "Esc Left": "goBackwardSexp",
	        "Alt-Left": "goBackwardSexp",
	        "Esc Right": "goForwardSexp",
	        "Alt-Right": "goForwardSexp",
	        "Ctrl-Left": "goBackwardToken",
	        "Ctrl-Right": "goForwardToken"
	      }),
	      indentUnit: 2,
	      tabSize: 2,
	      viewportMargin: Infinity,
	      lineNumbers: useLineNumbers,
	      matchKeywords: true,
	      matchBrackets: true,
	      styleSelectedText: true,
	      foldGutter: useFolding,
	      gutters: gutters,
	      lineWrapping: true,
	      logging: true,
	      rulers: rulers,
	      rulersMinCol: rulersMinCol
	    };
	
	    cmOptions = merge(cmOptions, options.cmOptions || {});
	
	    var CM = CodeMirror.fromTextArea(textarea[0], cmOptions);
	
	    if (useLineNumbers) {
	      CM.display.wrapper.appendChild(mkWarningUpper()[0]);
	      CM.display.wrapper.appendChild(mkWarningLower()[0]);
	    }
	
	    getTopTierMenuitems();
	
	    return {
	      cm: CM,
	      refresh: function refresh() {
	        CM.refresh();
	      },
	      run: function run() {
	        runFun(CM.getValue());
	      },
	      focus: function focus() {
	        CM.focus();
	      },
	      focusCarousel: null //initFocusCarousel
	    };
	  };
	  CPO.RUN_CODE = function () {
	    console.log("Running before ready", arguments);
	  };
	
	  function setUsername(target) {
	    return gwrap.load({ name: 'plus',
	      version: 'v1'
	    }).then(function (api) {
	      api.people.get({ userId: "me" }).then(function (user) {
	        var name = user.displayName;
	        if (user.emails && user.emails[0] && user.emails[0].value) {
	          name = user.emails[0].value;
	        }
	        target.text(name);
	      });
	    });
	  }
	
	  storageAPI.then(function (api) {
	    api.collection.then(function () {
	      $(".loginOnly").show();
	      $(".logoutOnly").hide();
	      setUsername($("#username"));
	    });
	    api.collection.fail(function () {
	      $(".loginOnly").hide();
	      $(".logoutOnly").show();
	    });
	  });
	
	  storageAPI = storageAPI.then(function (api) {
	    return api.api;
	  });
	  $("#connectButton").click(function () {
	    $("#connectButton").text("Connecting...");
	    $("#connectButton").attr("disabled", "disabled");
	    $('#connectButtonli').attr('disabled', 'disabled');
	    $("#connectButton").attr("tabIndex", "-1");
	    //$("#topTierUl").attr("tabIndex", "0");
	    getTopTierMenuitems();
	    storageAPI = createProgramCollectionAPI("code.pyret.org", false);
	    storageAPI.then(function (api) {
	      api.collection.then(function () {
	        $(".loginOnly").show();
	        $(".logoutOnly").hide();
	        document.activeElement.blur();
	        $("#bonniemenubutton").focus();
	        setUsername($("#username"));
	        if (params["get"] && params["get"]["program"]) {
	          var toLoad = api.api.getFileById(params["get"]["program"]);
	          console.log("Logged in and has program to load: ", toLoad);
	          loadProgram(toLoad);
	          programToSave = toLoad;
	        } else {
	          programToSave = Q.fcall(function () {
	            return null;
	          });
	        }
	      });
	      api.collection.fail(function () {
	        $("#connectButton").text("Connect to Google Drive");
	        $("#connectButton").attr("disabled", false);
	        $('#connectButtonli').attr('disabled', false);
	        //$("#connectButton").attr("tabIndex", "0");
	        document.activeElement.blur();
	        $("#connectButton").focus();
	        //$("#topTierUl").attr("tabIndex", "-1");
	      });
	    });
	    storageAPI = storageAPI.then(function (api) {
	      return api.api;
	    });
	  });
	
	  /*
	    initialProgram holds a promise for a Drive File object or null
	     It's null if the page doesn't have a #share or #program url
	     If the url does have a #program or #share, the promise is for the
	    corresponding object.
	  */
	  var initialProgram = storageAPI.then(function (api) {
	    var programLoad = null;
	    if (params["get"] && params["get"]["program"]) {
	      enableFileOptions();
	      programLoad = api.getFileById(params["get"]["program"]);
	      programLoad.then(function (p) {
	        showShareContainer(p);
	      });
	    }
	    if (params["get"] && params["get"]["share"]) {
	      logger.log('shared-program-load', {
	        id: params["get"]["share"]
	      });
	      programLoad = api.getSharedFileById(params["get"]["share"]);
	      programLoad.then(function (file) {
	        // NOTE(joe): If the current user doesn't own or have access to this file
	        // (or isn't logged in) this will simply fail with a 401, so we don't do
	        // any further permission checking before showing the link.
	        file.getOriginal().then(function (response) {
	          console.log("Response for original: ", response);
	          var original = $("#open-original").show().off("click");
	          var id = response.result.value;
	          original.removeClass("disabled");
	          original.click(function () {
	            window.open(window.APP_BASE_URL + "/editor#program=" + id, "_blank");
	          });
	        });
	      });
	    }
	    if (programLoad) {
	      programLoad.fail(function (err) {
	        console.error(err);
	        window.stickError("The program failed to load.");
	      });
	      return programLoad;
	    } else {
	      return null;
	    }
	  });
	
	  function setTitle(progName) {
	    document.title = progName + " - code.pyret.org";
	  }
	  CPO.setTitle = setTitle;
	
	  var filename = false;
	
	  $("#download a").click(function () {
	    var downloadElt = $("#download a");
	    var contents = CPO.editor.cm.getValue();
	    var downloadBlob = window.URL.createObjectURL(new Blob([contents], { type: 'text/plain' }));
	    if (!filename) {
	      filename = 'untitled_program.arr';
	    }
	    if (filename.indexOf(".arr") !== filename.length - 4) {
	      filename += ".arr";
	    }
	    downloadElt.attr({
	      download: filename,
	      href: downloadBlob
	    });
	    $("#download").append(downloadElt);
	  });
	
	  var TRUNCATE_LENGTH = 20;
	
	  function truncateName(name) {
	    if (name.length <= TRUNCATE_LENGTH + 1) {
	      return name;
	    }
	    return name.slice(0, TRUNCATE_LENGTH / 2) + "…" + name.slice(name.length - TRUNCATE_LENGTH / 2, name.length);
	  }
	
	  function updateName(p) {
	    filename = p.getName();
	    $("#filename").text(" (" + truncateName(filename) + ")");
	    setTitle(filename);
	    showShareContainer(p);
	  }
	
	  function loadProgram(p) {
	    programToSave = p;
	    return p.then(function (prog) {
	      if (prog !== null) {
	        updateName(prog);
	        if (prog.shared) {
	          window.stickMessage("You are viewing a shared program. Any changes you make will not be saved. You can use File -> Save a copy to save your own version with any edits you make.");
	        }
	        return prog.getContents();
	      }
	    });
	  }
	
	  function say(msg, forget) {
	    if (msg === "") return;
	    var announcements = document.getElementById("announcementlist");
	    var li = document.createElement("LI");
	    li.appendChild(document.createTextNode(msg));
	    announcements.insertBefore(li, announcements.firstChild);
	    if (forget) {
	      setTimeout(function () {
	        announcements.removeChild(li);
	      }, 1000);
	    }
	  }
	
	  function sayAndForget(msg) {
	    //console.log('doing sayAndForget', msg);
	    say(msg, true);
	  }
	
	  function cycleAdvance(currIndex, maxIndex, reverseP) {
	    var nextIndex = currIndex + (reverseP ? -1 : +1);
	    nextIndex = (nextIndex % maxIndex + maxIndex) % maxIndex;
	    return nextIndex;
	  }
	
	  function populateFocusCarousel(editor) {
	    if (!editor.focusCarousel) {
	      editor.focusCarousel = [];
	    }
	    var fc = editor.focusCarousel;
	    var docmain = document.getElementById("main");
	    if (!fc[0]) {
	      var toolbar = document.getElementById('Toolbar');
	      fc[0] = toolbar;
	      //fc[0] = document.getElementById("headeronelegend");
	      //getTopTierMenuitems();
	      //fc[0] = document.getElementById('bonniemenubutton');
	    }
	    if (!fc[1]) {
	      var docreplMain = docmain.getElementsByClassName("replMain");
	      var docreplMain0;
	      if (docreplMain.length === 0) {
	        docreplMain0 = undefined;
	      } else if (docreplMain.length === 1) {
	        docreplMain0 = docreplMain[0];
	      } else {
	        for (var i = 0; i < docreplMain.length; i++) {
	          if (docreplMain[i].innerText !== "") {
	            docreplMain0 = docreplMain[i];
	          }
	        }
	      }
	      fc[1] = docreplMain0;
	    }
	    if (!fc[2]) {
	      var docrepl = docmain.getElementsByClassName("repl");
	      var docreplcode = docrepl[0].getElementsByClassName("prompt-container")[0].getElementsByClassName("CodeMirror")[0];
	      fc[2] = docreplcode;
	    }
	    if (!fc[3]) {
	      fc[3] = document.getElementById("announcements");
	    }
	  }
	
	  function cycleFocus(reverseP) {
	    //console.log('doing cycleFocus', reverseP);
	    var editor = this.editor;
	    populateFocusCarousel(editor);
	    var fCarousel = editor.focusCarousel;
	    var maxIndex = fCarousel.length;
	    var currentFocusedElt = fCarousel.find(function (node) {
	      if (!node) {
	        return false;
	      } else {
	        return node.contains(document.activeElement);
	      }
	    });
	    var currentFocusIndex = fCarousel.indexOf(currentFocusedElt);
	    var nextFocusIndex = currentFocusIndex;
	    var focusElt;
	    do {
	      nextFocusIndex = cycleAdvance(nextFocusIndex, maxIndex, reverseP);
	      focusElt = fCarousel[nextFocusIndex];
	      //console.log('trying focusElt', focusElt);
	    } while (!focusElt);
	
	    var focusElt0;
	    if (focusElt.classList.contains('toolbarregion')) {
	      //console.log('settling on toolbar region')
	      getTopTierMenuitems();
	      focusElt0 = document.getElementById('bonniemenubutton');
	    } else if (focusElt.classList.contains("replMain") || focusElt.classList.contains("CodeMirror")) {
	      //console.log('settling on defn window')
	      var textareas = focusElt.getElementsByTagName("textarea");
	      //console.log('txtareas=', textareas)
	      //console.log('txtarea len=', textareas.length)
	      if (textareas.length === 0) {
	        //console.log('I')
	        focusElt0 = focusElt;
	      } else if (textareas.length === 1) {
	        //console.log('settling on inter window')
	        focusElt0 = textareas[0];
	      } else {
	        //console.log('settling on defn window')
	        /*
	        for (var i = 0; i < textareas.length; i++) {
	          if (textareas[i].getAttribute('tabIndex')) {
	            focusElt0 = textareas[i];
	          }
	        }
	        */
	        focusElt0 = textareas[textareas.length - 1];
	        focusElt0.removeAttribute('tabIndex');
	      }
	    } else {
	      //console.log('settling on announcement region', focusElt)
	      focusElt0 = focusElt;
	    }
	
	    document.activeElement.blur();
	    focusElt0.click();
	    focusElt0.focus();
	    //console.log('(cf)docactelt=', document.activeElement);
	  }
	
	  var programLoaded = loadProgram(initialProgram);
	
	  var programToSave = initialProgram;
	
	  function showShareContainer(p) {
	    //console.log('called showShareContainer');
	    if (!p.shared) {
	      $("#shareContainer").empty();
	      $('#publishli').show();
	      $("#shareContainer").append(shareAPI.makeShareLink(p));
	      getTopTierMenuitems();
	    }
	  }
	
	  function nameOrUntitled() {
	    return filename || "Untitled";
	  }
	  function autoSave() {
	    programToSave.then(function (p) {
	      if (p !== null && !p.shared) {
	        save();
	      }
	    });
	  }
	
	  function enableFileOptions() {
	    $("#filemenuContents *").removeClass("disabled");
	  }
	
	  function menuItemDisabled(id) {
	    return $("#" + id).hasClass("disabled");
	  }
	
	  function newEvent(e) {
	    window.open(window.APP_BASE_URL + "/editor");
	  }
	
	  function saveEvent(e) {
	    if (menuItemDisabled("save")) {
	      return;
	    }
	    return save();
	  }
	
	  /*
	    save : string (optional) -> undef
	     If a string argument is provided, create a new file with that name and save
	    the editor contents in that file.
	     If no filename is provided, save the existing file referenced by the editor
	    with the current editor contents.  If no filename has been set yet, just
	    set the name to "Untitled".
	   */
	  function save(newFilename) {
	    var useName, create;
	    if (newFilename !== undefined) {
	      useName = newFilename;
	      create = true;
	    } else if (filename === false) {
	      filename = "Untitled";
	      create = true;
	    } else {
	      useName = filename; // A closed-over variable
	      create = false;
	    }
	    window.stickMessage("Saving...");
	    var savedProgram = programToSave.then(function (p) {
	      if (p !== null && p.shared && !create) {
	        return p; // Don't try to save shared files
	      }
	      if (create) {
	        programToSave = storageAPI.then(function (api) {
	          return api.createFile(useName);
	        }).then(function (p) {
	          // showShareContainer(p); TODO(joe): figure out where to put this
	          history.pushState(null, null, "#program=" + p.getUniqueId());
	          updateName(p); // sets filename
	          enableFileOptions();
	          return p;
	        });
	        return programToSave.then(function (p) {
	          return save();
	        });
	      } else {
	        return programToSave.then(function (p) {
	          if (p === null) {
	            return null;
	          } else {
	            return p.save(CPO.editor.cm.getValue(), false);
	          }
	        }).then(function (p) {
	          if (p !== null) {
	            window.flashMessage("Program saved as " + p.getName());
	          }
	          return p;
	        });
	      }
	    });
	    savedProgram.fail(function (err) {
	      window.stickError("Unable to save", "Your internet connection may be down, or something else might be wrong with this site or saving to Google.  You should back up any changes to this program somewhere else.  You can try saving again to see if the problem was temporary, as well.");
	      console.error(err);
	    });
	    return savedProgram;
	  }
	
	  function saveAs() {
	    if (menuItemDisabled("saveas")) {
	      return;
	    }
	    programToSave.then(function (p) {
	      var name = p === null ? "Untitled" : p.getName();
	      var saveAsPrompt = new modalPrompt({
	        title: "Save a copy",
	        style: "text",
	        options: [{
	          message: "The name for the copy:",
	          defaultValue: name
	        }]
	      });
	      return saveAsPrompt.show().then(function (newName) {
	        if (newName === null) {
	          return null;
	        }
	        window.stickMessage("Saving...");
	        return save(newName);
	      }).fail(function (err) {
	        console.error("Failed to rename: ", err);
	        window.flashError("Failed to rename file");
	      });
	    });
	  }
	
	  function rename() {
	    programToSave.then(function (p) {
	      var renamePrompt = new modalPrompt({
	        title: "Rename this file",
	        style: "text",
	        options: [{
	          message: "The new name for the file:",
	          defaultValue: p.getName()
	        }]
	      });
	      // null return values are for the "cancel" path
	      return renamePrompt.show().then(function (newName) {
	        if (newName === null) {
	          return null;
	        }
	        window.stickMessage("Renaming...");
	        programToSave = p.rename(newName);
	        return programToSave;
	      }).then(function (p) {
	        if (p === null) {
	          return null;
	        }
	        updateName(p);
	        window.flashMessage("Program saved as " + p.getName());
	      }).fail(function (err) {
	        console.error("Failed to rename: ", err);
	        window.flashError("Failed to rename file");
	      });
	    }).fail(function (err) {
	      console.error("Unable to rename: ", err);
	    });
	  }
	
	  $("#runButton").click(function () {
	    CPO.autoSave();
	  });
	
	  $("#new").click(newEvent);
	  $("#save").click(saveEvent);
	  $("#rename").click(rename);
	  $("#saveas").click(saveAs);
	
	  var focusableElts = $(document).find('#header .focusable');
	  //console.log('focusableElts=', focusableElts)
	  var theToolbar = $(document).find('#Toolbar');
	
	  function getTopTierMenuitems() {
	    //console.log('doing getTopTierMenuitems')
	    var topTierMenuitems = $(document).find('#header ul li.topTier').toArray();
	    topTierMenuitems = topTierMenuitems.filter(function (elt) {
	      return !(elt.style.display === 'none' || elt.getAttribute('disabled') === 'disabled');
	    });
	    var numTopTierMenuitems = topTierMenuitems.length;
	    for (var i = 0; i < numTopTierMenuitems; i++) {
	      var ithTopTierMenuitem = topTierMenuitems[i];
	      var iChild = $(ithTopTierMenuitem).children().first();
	      //console.log('iChild=', iChild);
	      iChild.find('.focusable').attr('aria-setsize', numTopTierMenuitems.toString()).attr('aria-posinset', (i + 1).toString());
	    }
	    return topTierMenuitems;
	  }
	
	  function updateEditorHeight() {
	    var toolbarHeight = document.getElementById('topTierUl').scrollHeight;
	    // gets bumped to 67 on initial resize perturbation, but actual value is indeed 40
	    if (toolbarHeight < 80) toolbarHeight = 40;
	    toolbarHeight += 'px';
	    document.getElementById('REPL').style.paddingTop = toolbarHeight;
	    var docMain = document.getElementById('main');
	    var docReplMain = docMain.getElementsByClassName('replMain');
	    if (docReplMain.length !== 0) {
	      docReplMain[0].style.paddingTop = toolbarHeight;
	    }
	  }
	
	  $(window).on('resize', updateEditorHeight);
	
	  function insertAriaPos(submenu) {
	    //console.log('doing insertAriaPos', submenu)
	    var arr = submenu.toArray();
	    //console.log('arr=', arr);
	    var len = arr.length;
	    for (var i = 0; i < len; i++) {
	      var elt = arr[i];
	      //console.log('elt', i, '=', elt);
	      elt.setAttribute('aria-setsize', len.toString());
	      elt.setAttribute('aria-posinset', (i + 1).toString());
	    }
	  }
	
	  document.addEventListener('click', function () {
	    hideAllTopMenuitems();
	  });
	
	  theToolbar.click(function (e) {
	    e.stopPropagation();
	  });
	
	  theToolbar.keydown(function (e) {
	    //console.log('toolbar keydown', e);
	    //most any key at all
	    var kc = e.keyCode;
	    if (kc === 27) {
	      // escape
	      hideAllTopMenuitems();
	      //console.log('calling cycleFocus from toolbar')
	      CPO.cycleFocus();
	      e.stopPropagation();
	    } else if (kc === 9 || kc === 37 || kc === 38 || kc === 39 || kc === 40) {
	      // an arrow
	      var target = $(this).find('[tabIndex=-1]');
	      getTopTierMenuitems();
	      document.activeElement.blur(); //needed?
	      target.first().focus(); //needed?
	      //console.log('docactelt=', document.activeElement);
	      e.stopPropagation();
	    } else {
	      hideAllTopMenuitems();
	    }
	  });
	
	  function clickTopMenuitem(e) {
	    hideAllTopMenuitems();
	    var thisElt = $(this);
	    //console.log('doing clickTopMenuitem on', thisElt);
	    var topTierUl = thisElt.closest('ul[id=topTierUl]');
	    if (thisElt[0].hasAttribute('aria-hidden')) {
	      return;
	    }
	    if (thisElt[0].getAttribute('disabled') === 'disabled') {
	      return;
	    }
	    //var hiddenP = (thisElt[0].getAttribute('aria-expanded') === 'false');
	    //hiddenP always false?
	    var thisTopMenuitem = thisElt.closest('li.topTier');
	    //console.log('thisTopMenuitem=', thisTopMenuitem);
	    var t1 = thisTopMenuitem[0];
	    var submenuOpen = thisElt[0].getAttribute('aria-expanded') === 'true';
	    if (!submenuOpen) {
	      //console.log('hiddenp true branch');
	      hideAllTopMenuitems();
	      thisTopMenuitem.children('ul.submenu').attr('aria-hidden', 'false').show();
	      thisTopMenuitem.children().first().find('[aria-expanded]').attr('aria-expanded', 'true');
	    } else {
	      //console.log('hiddenp false branch');
	      thisTopMenuitem.children('ul.submenu').attr('aria-hidden', 'true').hide();
	      thisTopMenuitem.children().first().find('[aria-expanded]').attr('aria-expanded', 'false');
	    }
	    e.stopPropagation();
	  }
	
	  var expandableElts = $(document).find('#header [aria-expanded]');
	  expandableElts.click(clickTopMenuitem);
	
	  function hideAllTopMenuitems() {
	    //console.log('doing hideAllTopMenuitems');
	    var topTierUl = $(document).find('#header ul[id=topTierUl]');
	    topTierUl.find('[aria-expanded]').attr('aria-expanded', 'false');
	    topTierUl.find('ul.submenu').attr('aria-hidden', 'true').hide();
	  }
	
	  var nonexpandableElts = $(document).find('#header .topTier > div > button:not([aria-expanded])');
	  nonexpandableElts.click(hideAllTopMenuitems);
	
	  function switchTopMenuitem(destTopMenuitem, destElt) {
	    //console.log('doing switchTopMenuitem', destTopMenuitem, destElt);
	    //console.log('dtmil=', destTopMenuitem.length);
	    hideAllTopMenuitems();
	    if (destTopMenuitem && destTopMenuitem.length !== 0) {
	      var elt = destTopMenuitem[0];
	      var eltId = elt.getAttribute('id');
	      destTopMenuitem.children('ul.submenu').attr('aria-hidden', 'false').show();
	      destTopMenuitem.children().first().find('[aria-expanded]').attr('aria-expanded', 'true');
	    }
	    if (destElt) {
	      //destElt.attr('tabIndex', '0').focus();
	      destElt.focus();
	    }
	  }
	
	  var showingHelpKeys = false;
	
	  function showHelpKeys() {
	    showingHelpKeys = true;
	    $('#help-keys').fadeIn(100);
	    reciteHelp();
	  }
	
	  focusableElts.keydown(function (e) {
	    //console.log('focusable elt keydown', e);
	    var kc = e.keyCode;
	    //$(this).blur(); // Delete?
	    var withinSecondTierUl = true;
	    var topTierUl = $(this).closest('ul[id=topTierUl]');
	    var secondTierUl = $(this).closest('ul.submenu');
	    if (secondTierUl.length === 0) {
	      withinSecondTierUl = false;
	    }
	    if (kc === 27) {
	      //console.log('escape pressed i')
	      $('#help-keys').fadeOut(500);
	    }
	    if (kc === 27 && withinSecondTierUl) {
	      // escape
	      var destTopMenuitem = $(this).closest('li.topTier');
	      var possElts = destTopMenuitem.find('.focusable:not([disabled])').filter(':visible');
	      switchTopMenuitem(destTopMenuitem, possElts.first());
	      e.stopPropagation();
	    } else if (kc === 39) {
	      // rightarrow
	      //console.log('rightarrow pressed');
	      var srcTopMenuitem = $(this).closest('li.topTier');
	      //console.log('srcTopMenuitem=', srcTopMenuitem);
	      srcTopMenuitem.children().first().find('.focusable').attr('tabIndex', '-1');
	      var topTierMenuitems = getTopTierMenuitems();
	      //console.log('ttmi* =', topTierMenuitems);
	      var ttmiN = topTierMenuitems.length;
	      var j = topTierMenuitems.indexOf(srcTopMenuitem[0]);
	      //console.log('j initial=', j);
	      for (var i = (j + 1) % ttmiN; i !== j; i = (i + 1) % ttmiN) {
	        var destTopMenuitem = $(topTierMenuitems[i]);
	        //console.log('destTopMenuitem(a)=', destTopMenuitem);
	        var possElts = destTopMenuitem.find('.focusable:not([disabled])').filter(':visible');
	        //console.log('possElts=', possElts)
	        if (possElts.length > 0) {
	          //console.log('final i=', i);
	          //console.log('landing on', possElts.first());
	          switchTopMenuitem(destTopMenuitem, possElts.first());
	          e.stopPropagation();
	          break;
	        }
	      }
	    } else if (kc === 37) {
	      // leftarrow
	      //console.log('leftarrow pressed');
	      var srcTopMenuitem = $(this).closest('li.topTier');
	      //console.log('srcTopMenuitem=', srcTopMenuitem);
	      srcTopMenuitem.children().first().find('.focusable').attr('tabIndex', '-1');
	      var topTierMenuitems = getTopTierMenuitems();
	      //console.log('ttmi* =', topTierMenuitems);
	      var ttmiN = topTierMenuitems.length;
	      var j = topTierMenuitems.indexOf(srcTopMenuitem[0]);
	      //console.log('j initial=', j);
	      for (var i = (j + ttmiN - 1) % ttmiN; i !== j; i = (i + ttmiN - 1) % ttmiN) {
	        var destTopMenuitem = $(topTierMenuitems[i]);
	        //console.log('destTopMenuitem(b)=', destTopMenuitem);
	        //console.log('i=', i)
	        var possElts = destTopMenuitem.find('.focusable:not([disabled])').filter(':visible');
	        //console.log('possElts=', possElts)
	        if (possElts.length > 0) {
	          //console.log('final i=', i);
	          //console.log('landing on', possElts.first());
	          switchTopMenuitem(destTopMenuitem, possElts.first());
	          e.stopPropagation();
	          break;
	        }
	      }
	    } else if (kc === 38) {
	      // uparrow
	      //console.log('uparrow pressed');
	      var submenu;
	      if (withinSecondTierUl) {
	        var nearSibs = $(this).closest('div').find('.focusable').filter(':visible');
	        //console.log('nearSibs=', nearSibs);
	        var myId = $(this)[0].getAttribute('id');
	        //console.log('myId=', myId);
	        submenu = $([]);
	        var thisEncountered = false;
	        for (var i = nearSibs.length - 1; i >= 0; i--) {
	          if (thisEncountered) {
	            //console.log('adding', nearSibs[i]);
	            submenu = submenu.add($(nearSibs[i]));
	          } else if (nearSibs[i].getAttribute('id') === myId) {
	            thisEncountered = true;
	          }
	        }
	        //console.log('submenu so far=', submenu);
	        var farSibs = $(this).closest('li').prevAll().find('div:not(.disabled)').find('.focusable').filter(':visible');
	        submenu = submenu.add(farSibs);
	        if (submenu.length === 0) {
	          submenu = $(this).closest('li').closest('ul').find('div:not(.disabled)').find('.focusable').filter(':visible').last();
	        }
	        if (submenu.length > 0) {
	          submenu.last().focus();
	        } else {
	          /*
	          //console.log('no actionable submenu found')
	          var topmenuItem = $(this).closest('ul.submenu').closest('li')
	          .children().first().find('.focusable:not([disabled])').filter(':visible');
	          if (topmenuItem.length > 0) {
	            topmenuItem.first().focus();
	          } else {
	            //console.log('no actionable topmenuitem found either')
	          }
	          */
	        }
	      }
	      e.stopPropagation();
	    } else if (kc === 40) {
	      // downarrow
	      //console.log('downarrow pressed');
	      var submenuDivs;
	      var submenu;
	      if (!withinSecondTierUl) {
	        //console.log('1st tier')
	        submenuDivs = $(this).closest('li').children('ul').find('div:not(.disabled)');
	        submenu = submenuDivs.find('.focusable').filter(':visible');
	        insertAriaPos(submenu);
	      } else {
	        //console.log('2nd tier')
	        var nearSibs = $(this).closest('div').find('.focusable').filter(':visible');
	        //console.log('nearSibs=', nearSibs);
	        var myId = $(this)[0].getAttribute('id');
	        //console.log('myId=', myId);
	        submenu = $([]);
	        var thisEncountered = false;
	        for (var i = 0; i < nearSibs.length; i++) {
	          if (thisEncountered) {
	            //console.log('adding', nearSibs[i]);
	            submenu = submenu.add($(nearSibs[i]));
	          } else if (nearSibs[i].getAttribute('id') === myId) {
	            thisEncountered = true;
	          }
	        }
	        //console.log('submenu so far=', submenu);
	        var farSibs = $(this).closest('li').nextAll().find('div:not(.disabled)').find('.focusable').filter(':visible');
	        submenu = submenu.add(farSibs);
	        if (submenu.length === 0) {
	          submenu = $(this).closest('li').closest('ul').find('div:not(.disabled)').find('.focusable').filter(':visible');
	        }
	      }
	      //console.log('submenu=', submenu)
	      if (submenu.length > 0) {
	        submenu.first().focus();
	      } else {
	        //console.log('no actionable submenu found')
	      }
	      e.stopPropagation();
	    } else if (kc === 27) {
	      //console.log('esc pressed');
	      hideAllTopMenuitems();
	      if (showingHelpKeys) {
	        showingHelpKeys = false;
	      } else {
	        //console.log('calling cycleFocus ii')
	        CPO.cycleFocus();
	      }
	      e.stopPropagation();
	      e.preventDefault();
	      //$(this).closest('nav').closest('main').focus();
	    } else if (kc === 9) {
	      if (e.shiftKey) {
	        hideAllTopMenuitems();
	        CPO.cycleFocus(true);
	      }
	      e.stopPropagation();
	      e.preventDefault();
	    } else if (kc === 13 || kc === 17 || kc === 20 || kc === 32) {
	      // 13=enter 17=ctrl 20=capslock 32=space
	      //console.log('stopprop 1')
	      e.stopPropagation();
	    } else if (kc >= 112 && kc <= 123) {
	      //console.log('doprop 1')
	      // fn keys
	      // go ahead, propagate
	    } else if (e.ctrlKey && kc === 191) {
	      //console.log('C-? pressed')
	      showHelpKeys();
	      e.stopPropagation();
	    } else {
	      //console.log('stopprop 2')
	      e.stopPropagation();
	    }
	    //e.stopPropagation();
	  });
	
	  // shareAPI.makeHoverMenu($("#filemenu"), $("#filemenuContents"), false, function(){});
	  // shareAPI.makeHoverMenu($("#bonniemenu"), $("#bonniemenuContents"), false, function(){});
	
	
	  var codeContainer = $("<div>").addClass("replMain");
	  codeContainer.attr("role", "region").attr("aria-label", "Definitions");
	  //attr("tabIndex", "-1");
	  $("#main").prepend(codeContainer);
	
	  CPO.editor = CPO.makeEditor(codeContainer, {
	    runButton: $("#runButton"),
	    simpleEditor: false,
	    run: CPO.RUN_CODE,
	    initialGas: 100
	  });
	  CPO.editor.cm.setOption("readOnly", "nocursor");
	  CPO.editor.cm.setOption("longLines", new Map());
	  function removeShortenedLine(lineHandle) {
	    var rulers = CPO.editor.cm.getOption("rulers");
	    var rulersMinCol = CPO.editor.cm.getOption("rulersMinCol");
	    var longLines = CPO.editor.cm.getOption("longLines");
	    if (lineHandle.text.length <= rulersMinCol) {
	      lineHandle.rulerListeners.forEach(function (f, evt) {
	        return lineHandle.off(evt, f);
	      });
	      longLines.delete(lineHandle);
	      // console.log("Removed ", lineHandle);
	      refreshRulers();
	    }
	  }
	  function deleteLine(lineHandle) {
	    var longLines = CPO.editor.cm.getOption("longLines");
	    lineHandle.rulerListeners.forEach(function (f, evt) {
	      return lineHandle.off(evt, f);
	    });
	    longLines.delete(lineHandle);
	    // console.log("Removed ", lineHandle);
	    refreshRulers();
	  }
	  function refreshRulers() {
	    var rulers = CPO.editor.cm.getOption("rulers");
	    var longLines = CPO.editor.cm.getOption("longLines");
	    var minLength;
	    if (longLines.size === 0) {
	      minLength = 0; // if there are no long lines, then we don't care about showing any rulers
	    } else {
	      minLength = Number.MAX_VALUE;
	      longLines.forEach(function (lineNo, lineHandle) {
	        if (lineHandle.text.length < minLength) {
	          minLength = lineHandle.text.length;
	        }
	      });
	    }
	    for (var i = 0; i < rulers.length; i++) {
	      if (rulers[i].column >= minLength) {
	        rulers[i].className = "hidden";
	      } else {
	        rulers[i].className = undefined;
	      }
	    }
	    // gotta set the option twice, or else CM short-circuits and ignores it
	    CPO.editor.cm.setOption("rulers", undefined);
	    CPO.editor.cm.setOption("rulers", rulers);
	  }
	  CPO.editor.cm.on('changes', function (instance, changeObjs) {
	    var minLine = instance.lastLine(),
	        maxLine = 0;
	    var rulersMinCol = instance.getOption("rulersMinCol");
	    var longLines = instance.getOption("longLines");
	    changeObjs.forEach(function (change) {
	      if (minLine > change.from.line) {
	        minLine = change.from.line;
	      }
	      if (maxLine < change.from.line + change.text.length) {
	        maxLine = change.from.line + change.text.length;
	      }
	    });
	    var changed = false;
	    instance.eachLine(minLine, maxLine, function (lineHandle) {
	      if (lineHandle.text.length > rulersMinCol) {
	        if (!longLines.has(lineHandle)) {
	          changed = true;
	          longLines.set(lineHandle, lineHandle.lineNo());
	          lineHandle.rulerListeners = new Map([["change", removeShortenedLine], ["delete", function () {
	            // needed because the delete handler gets no arguments at all
	            deleteLine(lineHandle);
	          }]]);
	          lineHandle.rulerListeners.forEach(function (f, evt) {
	            return lineHandle.on(evt, f);
	          });
	          // console.log("Added ", lineHandle);
	        }
	      } else {
	        if (longLines.has(lineHandle)) {
	          changed = true;
	          longLines.delete(lineHandle);
	          // console.log("Removed ", lineHandle);
	        }
	      }
	    });
	    if (changed) {
	      refreshRulers();
	    }
	  });
	
	  programLoaded.then(function (c) {
	    CPO.documents.set("definitions://", CPO.editor.cm.getDoc());
	
	    // NOTE(joe): Clearing history to address https://github.com/brownplt/pyret-lang/issues/386,
	    // in which undo can revert the program back to empty
	    CPO.editor.cm.clearHistory();
	    CPO.editor.cm.setValue(c);
	  });
	
	  programLoaded.fail(function () {
	    CPO.documents.set("definitions://", CPO.editor.cm.getDoc());
	  });
	
	  var pyretLoad = document.createElement('script');
	  console.log(("../js/cpo-main.jarr"));
	  pyretLoad.src = ("../js/cpo-main.jarr");
	  pyretLoad.type = "text/javascript";
	  document.body.appendChild(pyretLoad);
	
	  var pyretLoad2 = document.createElement('script');
	
	  function logFailureAndManualFetch(url, e) {
	
	    // NOTE(joe): The error reported by the "error" event has essentially no
	    // information on it; it's just a notification that _something_ went wrong.
	    // So, we log that something happened, then immediately do an AJAX request
	    // call for the same URL, to see if we can get more information. This
	    // doesn't perfectly tell us about the original failure, but it's
	    // something.
	
	    // In addition, if someone is seeing the Pyret failed to load error, but we
	    // don't get these logging events, we have a strong hint that something is
	    // up with their network.
	    logger.log('pyret-load-failure', {
	      event: 'initial-failure',
	      url: url,
	
	      // The timestamp appears to count from the beginning of page load,
	      // which may approximate download time if, say, requests are timing out
	      // or getting cut off.
	
	      timeStamp: e.timeStamp
	    });
	
	    var manualFetch = $.ajax(url);
	    manualFetch.then(function (res) {
	      // Here, we log the first 100 characters of the response to make sure
	      // they resemble the Pyret blob
	      logger.log('pyret-load-failure', {
	        event: 'success-with-ajax',
	        contentsPrefix: res.slice(0, 100)
	      });
	    });
	    manualFetch.fail(function (res) {
	      logger.log('pyret-load-failure', {
	        event: 'failure-with-ajax',
	        status: res.status,
	        statusText: res.statusText,
	        // Since responseText could be a long error page, and we don't want to
	        // log huge pages, we slice it to 100 characters, which is enough to
	        // tell us what's going on (e.g. AWS failure, network outage).
	        responseText: res.responseText.slice(0, 100)
	      });
	    });
	  }
	
	  $(pyretLoad).on("error", function (e) {
	    logFailureAndManualFetch(path, e);
	    console.log(process.env);
	    pyretLoad2.src = (undefined);
	    pyretLoad2.type = "text/javascript";
	    document.body.appendChild(pyretLoad2);
	  });
	
	  $(pyretLoad2).on("error", function (e) {
	    $("#loader").hide();
	    $("#runPart").hide();
	    $("#breakButton").hide();
	    window.stickError("Pyret failed to load; check your connection or try refreshing the page.  If this happens repeatedly, please report it as a bug.");
	    logFailureAndManualFetch((undefined), e);
	  });
	
	  programLoaded.fin(function () {
	    CPO.editor.focus();
	    CPO.editor.cm.setOption("readOnly", false);
	  });
	
	  CPO.autoSave = autoSave;
	  CPO.save = save;
	  CPO.updateName = updateName;
	  CPO.showShareContainer = showShareContainer;
	  CPO.loadProgram = loadProgram;
	  CPO.cycleFocus = cycleFocus;
	  CPO.say = say;
	  CPO.sayAndForget = sayAndForget;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {// Copyright 2013-2014 Kevin Cox
	
	/*******************************************************************************
	*                                                                              *
	*  This software is provided 'as-is', without any express or implied           *
	*  warranty. In no event will the authors be held liable for any damages       *
	*  arising from the use of this software.                                      *
	*                                                                              *
	*  Permission is granted to anyone to use this software for any purpose,       *
	*  including commercial applications, and to alter it and redistribute it      *
	*  freely, subject to the following restrictions:                              *
	*                                                                              *
	*  1. The origin of this software must not be misrepresented; you must not     *
	*     claim that you wrote the original software. If you use this software in  *
	*     a product, an acknowledgment in the product documentation would be       *
	*     appreciated but is not required.                                         *
	*                                                                              *
	*  2. Altered source versions must be plainly marked as such, and must not be  *
	*     misrepresented as being the original software.                           *
	*                                                                              *
	*  3. This notice may not be removed or altered from any source distribution.  *
	*                                                                              *
	*******************************************************************************/
	
	+function(){
	"use strict";
	
	var array = /\[([^\[]*)\]$/;
	
	/// URL Regex.
	/**
	 * This regex splits the URL into parts.  The capture groups catch the important
	 * bits.
	 * 
	 * Each section is optional, so to work on any part find the correct top level
	 * `(...)?` and mess around with it.
	 */
	var regex = /^(?:([a-z]*):)?(?:\/\/)?(?:([^:@]*)(?::([^@]*))?@)?([a-z-._]+)?(?::([0-9]*))?(\/[^?#]*)?(?:\?([^#]*))?(?:#(.*))?$/i;
	//               1 - scheme                2 - user    3 = pass 4 - host        5 - port  6 - path        7 - query    8 - hash
	
	var noslash = ["mailto","bitcoin"];
	
	var self = {
		/** Parse a query string.
		 *
		 * This function parses a query string (sometimes called the search
		 * string).  It takes a query string and returns a map of the results.
		 *
		 * Keys are considered to be everything up to the first '=' and values are
		 * everything afterwords.  Since URL-decoding is done after parsing, keys
		 * and values can have any values, however, '=' have to be encoded in keys
		 * while '?' and '&' have to be encoded anywhere (as they delimit the
		 * kv-pairs).
		 *
		 * Keys and values will always be strings, except if there is a key with no
		 * '=' in which case it will be considered a flag and will be set to true.
		 * Later values will override earlier values.
		 *
		 * Array keys are also supported.  By default keys in the form of `name[i]`
		 * will be returned like that as strings.  However, if you set the `array`
		 * flag in the options object they will be parsed into arrays.  Note that
		 * although the object returned is an `Array` object all keys will be
		 * written to it.  This means that if you have a key such as `k[forEach]`
		 * it will overwrite the `forEach` function on that array.  Also note that
		 * string properties always take precedence over array properties,
		 * irrespective of where they are in the query string.
		 *
		 *   url.get("array[1]=test&array[foo]=bar",{array:true}).array[1]  === "test"
		 *   url.get("array[1]=test&array[foo]=bar",{array:true}).array.foo === "bar"
		 *   url.get("array=notanarray&array[0]=1",{array:true}).array      === "notanarray"
		 *
		 * If array parsing is enabled keys in the form of `name[]` will
		 * automatically be given the next available index.  Note that this can be
		 * overwritten with later values in the query string.  For this reason is
		 * is best not to mix the two formats, although it is safe (and often
		 * useful) to add an automatic index argument to the end of a query string.
		 *
		 *   url.get("a[]=0&a[]=1&a[0]=2", {array:true})  -> {a:["2","1"]};
		 *   url.get("a[0]=0&a[1]=1&a[]=2", {array:true}) -> {a:["0","1","2"]};
		 *
		 * @param{string} q The query string (the part after the '?').
		 * @param{{full:boolean,array:boolean}=} opt Options.
		 *
		 * - full: If set `q` will be treated as a full url and `q` will be built.
		 *   by calling #parse to retrieve the query portion.
		 * - array: If set keys in the form of `key[i]` will be treated
		 *   as arrays/maps.
		 *
		 * @return{!Object.<string, string|Array>} The parsed result.
		 */
		"get": function(q, opt){
			q = q || "";
			if ( typeof opt          == "undefined" ) opt = {};
			if ( typeof opt["full"]  == "undefined" ) opt["full"] = false;
			if ( typeof opt["array"] == "undefined" ) opt["array"] = false;
			
			if ( opt["full"] === true )
			{
				q = self["parse"](q, {"get":false})["query"] || "";
			}
			
			var o = {};
			
			var c = q.split("&");
			for (var i = 0; i < c.length; i++)
			{
				if (!c[i].length) continue;
				
				var d = c[i].indexOf("=");
				var k = c[i], v = true;
				if ( d >= 0 )
				{
					k = c[i].substr(0, d);
					v = c[i].substr(d+1);
					
					v = decodeURIComponent(v);
				}
				
				if (opt["array"])
				{
					var inds = [];
					var ind;
					var curo = o;
					var curk = k;
					while (ind = curk.match(array)) // Array!
					{
						curk = curk.substr(0, ind.index);
						inds.unshift(decodeURIComponent(ind[1]));
					}
					curk = decodeURIComponent(curk);
					if (inds.some(function(i)
					{
						if ( typeof curo[curk] == "undefined" ) curo[curk] = [];
						if (!Array.isArray(curo[curk]))
						{
							//console.log("url.get: Array property "+curk+" already exists as string!");
							return true;
						}
						
						curo = curo[curk];
						
						if ( i === "" ) i = curo.length;
						
						curk = i;
					})) continue;
					curo[curk] = v;
					continue;
				}
				
				k = decodeURIComponent(k);
				
				//typeof o[k] == "undefined" || console.log("Property "+k+" already exists!");
				o[k] = v;
			}
			
			return o;
		},
		
		/** Build a get query from an object.
		 *
		 * This constructs a query string from the kv pairs in `data`.  Calling
		 * #get on the string returned should return an object identical to the one
		 * passed in except all non-boolean scalar types become strings and all
		 * object types become arrays (non-integer keys are still present, see
		 * #get's documentation for more details).
		 *
		 * This always uses array syntax for describing arrays.  If you want to
		 * serialize them differently (like having the value be a JSON array and
		 * have a plain key) you will need to do that before passing it in.
		 *
		 * All keys and values are supported (binary data anyone?) as they are
		 * properly URL-encoded and #get properly decodes.
		 *
		 * @param{Object} data The kv pairs.
		 * @param{string} prefix The properly encoded array key to put the
		 *   properties.  Mainly intended for internal use.
		 * @return{string} A URL-safe string.
		 */
		"buildget": function(data, prefix){
			var itms = [];
			for ( var k in data )
			{
				var ek = encodeURIComponent(k);
				if ( typeof prefix != "undefined" )
					ek = prefix+"["+ek+"]";
				
				var v = data[k];
				
				switch (typeof v)
				{
					case 'boolean':
						if(v) itms.push(ek);
						break;
					case 'number':
						v = v.toString();
					case 'string':
						itms.push(ek+"="+encodeURIComponent(v));
						break;
					case 'object':
						itms.push(self["buildget"](v, ek));
						break;
				}
			}
			return itms.join("&");
		},
		
		/** Parse a URL
		 * 
		 * This breaks up a URL into components.  It attempts to be very liberal
		 * and returns the best result in most cases.  This means that you can
		 * often pass in part of a URL and get correct categories back.  Notably,
		 * this works for emails and Jabber IDs, as well as adding a '?' to the
		 * beginning of a string will parse the whole thing as a query string.  If
		 * an item is not found the property will be undefined.  In some cases an
		 * empty string will be returned if the surrounding syntax but the actual
		 * value is empty (example: "://example.com" will give a empty string for
		 * scheme.)  Notably the host name will always be set to something.
		 * 
		 * Returned properties.
		 * 
		 * - **scheme:** The url scheme. (ex: "mailto" or "https")
		 * - **user:** The username.
		 * - **pass:** The password.
		 * - **host:** The hostname. (ex: "localhost", "123.456.7.8" or "example.com")
		 * - **port:** The port, as a number. (ex: 1337)
		 * - **path:** The path. (ex: "/" or "/about.html")
		 * - **query:** "The query string. (ex: "foo=bar&v=17&format=json")
		 * - **get:** The query string parsed with get.  If `opt.get` is `false` this
		 *   will be absent
		 * - **hash:** The value after the hash. (ex: "myanchor")
		 *   be undefined even if `query` is set.
		 *
		 * @param{string} url The URL to parse.
		 * @param{{get:Object}=} opt Options:
		 *
		 * - get: An options argument to be passed to #get or false to not call #get.
		 *    **DO NOT** set `full`.
		 *
		 * @return{!Object} An object with the parsed values.
		 */
		"parse": function(url, opt) {
			
			if ( typeof opt == "undefined" ) opt = {};
			
			var md = url.match(regex) || [];
			
			var r = {
				"url":    url,
				
				"scheme": md[1],
				"user":   md[2],
				"pass":   md[3],
				"host":   md[4],
				"port":   md[5] && +md[5],
				"path":   md[6],
				"query":  md[7],
				"hash":   md[8],
			};
			
			if ( opt.get !== false )
				r["get"] = r["query"] && self["get"](r["query"], opt.get);
			
			return r;
		},
		
		/** Build a URL from components.
		 * 
		 * This pieces together a url from the properties of the passed in object.
		 * In general passing the result of `parse()` should return the URL.  There
		 * may differences in the get string as the keys and values might be more
		 * encoded then they were originally were.  However, calling `get()` on the
		 * two values should yield the same result.
		 * 
		 * Here is how the parameters are used.
		 * 
		 *  - url: Used only if no other values are provided.  If that is the case
		 *     `url` will be returned verbatim.
		 *  - scheme: Used if defined.
		 *  - user: Used if defined.
		 *  - pass: Used if defined.
		 *  - host: Used if defined.
		 *  - path: Used if defined.
		 *  - query: Used only if `get` is not provided and non-empty.
		 *  - get: Used if non-empty.  Passed to #buildget and the result is used
		 *    as the query string.
		 *  - hash: Used if defined.
		 * 
		 * These are the options that are valid on the options object.
		 * 
		 *  - useemptyget: If truthy, a question mark will be appended for empty get
		 *    strings.  This notably makes `build()` and `parse()` fully symmetric.
		 *
		 * @param{Object} data The pieces of the URL.
		 * @param{Object} opt Options for building the url.
		 * @return{string} The URL.
		 */
		"build": function(data, opt){
			opt = opt || {};
			
			var r = "";
			
			if ( typeof data["scheme"] != "undefined" )
			{
				r += data["scheme"];
				r += (noslash.indexOf(data["scheme"])>=0)?":":"://";
			}
			if ( typeof data["user"] != "undefined" )
			{
				r += data["user"];
				if ( typeof data["pass"] == "undefined" )
				{
					r += "@";
				}
			}
			if ( typeof data["pass"] != "undefined" ) r += ":" + data["pass"] + "@";
			if ( typeof data["host"] != "undefined" ) r += data["host"];
			if ( typeof data["port"] != "undefined" ) r += ":" + data["port"];
			if ( typeof data["path"] != "undefined" ) r += data["path"];
			
			if (opt["useemptyget"])
			{
				if      ( typeof data["get"]   != "undefined" ) r += "?" + self["buildget"](data["get"]);
				else if ( typeof data["query"] != "undefined" ) r += "?" + data["query"];
			}
			else
			{
				// If .get use it.  If .get leads to empty, use .query.
				var q = data["get"] && self["buildget"](data["get"]) || data["query"];
				if (q) r += "?" + q;
			}
			
			if ( typeof data["hash"] != "undefined" ) r += "#" + data["hash"];
			
			return r || data["url"] || "";
		},
	};
	
	if ( "function" != "undefined" && __webpack_require__(4)["amd"] ) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (self), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	else if ( true ) module['exports'] = self;
	else window["url"] = self;
	
	}();
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	/**
	 * Module for managing modal prompt instances.
	 * NOTE: This module is currently limited in a number
	 *       of ways. For one, it only allows radio
	 *       input options. Additionally, it hard-codes in
	 *       a number of other behaviors which are specific
	 *       to the image import style prompt (for which
	 *       this module was written).
	 *       If desired, this module may be made more
	 *       general-purpose in the future, but, for now,
	 *       be aware of these limitations.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Q) {
	
	  function autoHighlightBox(text) {
	    var textBox = $("<input type='text'>").addClass("auto-highlight");
	    textBox.attr("size", text.length);
	    textBox.attr("editable", false);
	    textBox.on("focus", function () {
	      $(this).select();
	    });
	    textBox.on("mouseup", function () {
	      $(this).select();
	    });
	    textBox.val(text);
	    return textBox;
	  }
	
	  // Allows asynchronous requesting of prompts
	  var promptQueue = Q();
	  var styles = ["radio", "tiles", "text", "copyText", "confirm"];
	
	  window.modals = [];
	
	  /**
	   * Represents an option to present the user
	   * @typedef {Object} ModalOption
	   * @property {string} message - The message to show the user which
	               describes this option
	   * @property {string} value - The value to return if this option is chosen
	   * @property {string} [example] - A code snippet to show with this option
	   */
	
	  /**
	   * Constructor for modal prompts.
	   * @param {ModalOption[]} options - The options to present the user
	   */
	  function Prompt(options) {
	    window.modals.push(this);
	    if (!options || styles.indexOf(options.style) === -1 || !options.options || typeof options.options.length !== "number" || options.options.length === 0) {
	      throw new Error("Invalid Prompt Options", options);
	    }
	    this.options = options;
	    this.modal = $("#promptModal");
	    if (this.options.style === "radio") {
	      this.elts = $($.parseHTML("<table></table>")).addClass("choiceContainer");
	    } else if (this.options.style === "text") {
	      this.elts = $("<div>").addClass("choiceContainer");
	    } else if (this.options.style === "copyText") {
	      this.elts = $("<div>").addClass("choiceContainer");
	    } else if (this.options.style === "confirm") {
	      this.elts = $("<div>").addClass("choiceContainer");
	    } else {
	      this.elts = $($.parseHTML("<div></div>")).addClass("choiceContainer");
	    }
	    this.title = $(".modal-header > h3", this.modal);
	    this.closeButton = $(".close", this.modal);
	    this.submitButton = $(".submit", this.modal);
	    if (this.options.submitText) {
	      this.submitButton.text(this.options.submitText);
	    } else {
	      this.submitButton.text("Submit");
	    }
	    this.isCompiled = false;
	    this.deferred = Q.defer();
	    this.promise = this.deferred.promise;
	  }
	
	  /**
	   * Type for handlers of responses from modal prompts
	   * @callback promptCallback
	   * @param {string} resp - The response from the user
	   */
	
	  /**
	   * Shows this prompt to the user (will wait until any active
	   * prompts have finished)
	   * @param {promptCallback} [callback] - Optional callback which is passed the
	   *        result of the prompt
	   * @returns A promise resolving to either the result of `callback`, if provided,
	   *          or the result of the prompt, otherwise.
	   */
	  Prompt.prototype.show = function (callback) {
	    // Use the promise queue to make sure there's no other
	    // prompt being shown currently
	    if (this.options.hideSubmit) {
	      this.submitButton.hide();
	    } else {
	      this.submitButton.show();
	    }
	    this.closeButton.click(this.onClose.bind(this));
	    this.submitButton.click(this.onSubmit.bind(this));
	    var docClick = function (e) {
	      // If the prompt is active and the background is clicked,
	      // then close.
	      if ($(e.target).is(this.modal) && this.deferred) {
	        this.onClose(e);
	        $(document).off("click", docClick);
	      }
	    }.bind(this);
	    $(document).click(docClick);
	    var docKeydown = function (e) {
	      if (e.key === "Escape") {
	        this.onClose(e);
	        $(document).off("keydown", docKeydown);
	      }
	    }.bind(this);
	    $(document).keydown(docKeydown);
	    this.title.text(this.options.title);
	    this.populateModal();
	    this.modal.css('display', 'block');
	
	    if (callback) {
	      return this.promise.then(callback);
	    } else {
	      return this.promise;
	    }
	  };
	
	  /**
	   * Clears the contents of the modal prompt.
	   */
	  Prompt.prototype.clearModal = function () {
	    this.submitButton.off();
	    this.closeButton.off();
	    this.elts.empty();
	  };
	
	  /**
	   * Populates the contents of the modal prompt with the
	   * options in this prompt.
	   */
	  Prompt.prototype.populateModal = function () {
	    function createRadioElt(option, idx) {
	      var elt = $($.parseHTML("<input name=\"pyret-modal\" type=\"radio\">"));
	      var id = "r" + idx.toString();
	      var label = $($.parseHTML("<label for=\"" + id + "\"></label>"));
	      elt.attr("id", id);
	      elt.attr("value", option.value);
	      label.text(option.message);
	      var eltContainer = $($.parseHTML("<td class=\"pyret-modal-option-radio\"></td>"));
	      eltContainer.append(elt);
	      var labelContainer = $($.parseHTML("<td class=\"pyret-modal-option-message\"></td>"));
	      labelContainer.append(label);
	      var container = $($.parseHTML("<tr class=\"pyret-modal-option\"></tr>"));
	      container.append(eltContainer);
	      container.append(labelContainer);
	      if (option.example) {
	        var example = $($.parseHTML("<div></div>"));
	        var cm = CodeMirror(example[0], {
	          value: option.example,
	          mode: 'pyret',
	          lineNumbers: false,
	          readOnly: true
	        });
	        setTimeout(function () {
	          cm.refresh();
	        }, 1);
	        var exampleContainer = $($.parseHTML("<td class=\"pyret-modal-option-example\"></td>"));
	        exampleContainer.append(example);
	        container.append(exampleContainer);
	      }
	
	      return container;
	    }
	    function createTileElt(option, idx) {
	      var elt = $($.parseHTML("<button name=\"pyret-modal\" class=\"tile\"></button>"));
	      elt.attr("id", "t" + idx.toString());
	      elt.append($("<b>").text(option.message)).append($("<p>").text(option.details));
	      for (var evt in option.on) {
	        elt.on(evt, option.on[evt]);
	      }return elt;
	    }
	
	    function createTextElt(option) {
	      var elt = $("<div>");
	      elt.append($("<span>").addClass("textLabel").text(option.message));
	      //      elt.append($("<span>").text("(" + option.details + ")"));
	      elt.append($("<input type='text'>").val(option.defaultValue));
	      return elt;
	    }
	
	    function createCopyTextElt(option) {
	      var elt = $("<div>");
	      elt.append($("<p>").addClass("textLabel").text(option.message));
	      if (option.text) {
	        var box = autoHighlightBox(option.text);
	        //      elt.append($("<span>").text("(" + option.details + ")"));
	        elt.append(box);
	        box.focus();
	      }
	      return elt;
	    }
	
	    function createConfirmElt(option) {
	      return $("<p>").text(option.message);
	    }
	
	    var that = this;
	
	    function createElt(option, i) {
	      if (that.options.style === "radio") {
	        return createRadioElt(option, i);
	      } else if (that.options.style === "tiles") {
	        return createTileElt(option, i);
	      } else if (that.options.style === "text") {
	        return createTextElt(option);
	      } else if (that.options.style === "copyText") {
	        return createCopyTextElt(option);
	      } else if (that.options.style === "confirm") {
	        return createConfirmElt(option);
	      }
	    }
	
	    var optionElts;
	    // Cache results
	    //    if (true) {
	    optionElts = this.options.options.map(createElt);
	    //      this.compiledElts = optionElts;
	    //      this.isCompiled = true;
	    //    } else {
	    //      optionElts = this.compiledElts;
	    //    }
	    $("input[type='radio']", optionElts[0]).attr('checked', true);
	    this.elts.append(optionElts);
	    $(".modal-body", this.modal).empty().append(this.elts);
	    optionElts[0].focus();
	  };
	
	  /**
	   * Handler which is called when the user does not select anything
	   */
	  Prompt.prototype.onClose = function (e) {
	    this.modal.css('display', 'none');
	    this.clearModal();
	    this.deferred.resolve(null);
	    delete this.deferred;
	    delete this.promise;
	  };
	
	  /**
	   * Handler which is called when the user presses "submit"
	   */
	  Prompt.prototype.onSubmit = function (e) {
	    if (this.options.style === "radio") {
	      var retval = $("input[type='radio']:checked", this.modal).val();
	    } else if (this.options.style === "text") {
	      var retval = $("input[type='text']", this.modal).val();
	    } else if (this.options.style === "copyText") {
	      var retval = true;
	    } else if (this.options.style === "confirm") {
	      var retval = true;
	    } else {
	      var retval = true; // Just return true if they clicked submit
	    }
	    this.modal.css('display', 'none');
	    this.clearModal();
	    this.deferred.resolve(retval);
	    delete this.deferred;
	    delete this.promise;
	  };
	
	  return Prompt;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, setImmediate) {// vim:ts=4:sts=4:sw=4:
	/*!
	 *
	 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
	 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
	 *
	 * With parts by Tyler Close
	 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
	 * at http://www.opensource.org/licenses/mit-license.html
	 * Forked at ref_send.js version: 2009-05-11
	 *
	 * With parts by Mark Miller
	 * Copyright (C) 2011 Google Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */
	
	(function (definition) {
	    "use strict";
	
	    // This file will function properly as a <script> tag, or a module
	    // using CommonJS and NodeJS or RequireJS module formats.  In
	    // Common/Node/RequireJS, the module exports the Q API and when
	    // executed as a simple <script>, it creates a Q global instead.
	
	    // Montage Require
	    if (typeof bootstrap === "function") {
	        bootstrap("promise", definition);
	
	    // CommonJS
	    } else if (true) {
	        module.exports = definition();
	
	    // RequireJS
	    } else if (typeof define === "function" && define.amd) {
	        define(definition);
	
	    // SES (Secure EcmaScript)
	    } else if (typeof ses !== "undefined") {
	        if (!ses.ok()) {
	            return;
	        } else {
	            ses.makeQ = definition;
	        }
	
	    // <script>
	    } else if (typeof window !== "undefined" || typeof self !== "undefined") {
	        // Prefer window over self for add-on scripts. Use self for
	        // non-windowed contexts.
	        var global = typeof window !== "undefined" ? window : self;
	
	        // Get the `window` object, save the previous Q global
	        // and initialize Q as a global.
	        var previousQ = global.Q;
	        global.Q = definition();
	
	        // Add a noConflict function so Q can be removed from the
	        // global namespace.
	        global.Q.noConflict = function () {
	            global.Q = previousQ;
	            return this;
	        };
	
	    } else {
	        throw new Error("This environment was not anticipated by Q. Please file a bug.");
	    }
	
	})(function () {
	"use strict";
	
	var hasStacks = false;
	try {
	    throw new Error();
	} catch (e) {
	    hasStacks = !!e.stack;
	}
	
	// All code after this point will be filtered from stack traces reported
	// by Q.
	var qStartingLine = captureLine();
	var qFileName;
	
	// shims
	
	// used for fallback in "allResolved"
	var noop = function () {};
	
	// Use the fastest possible means to execute a task in a future turn
	// of the event loop.
	var nextTick =(function () {
	    // linked list of tasks (single, with head node)
	    var head = {task: void 0, next: null};
	    var tail = head;
	    var flushing = false;
	    var requestTick = void 0;
	    var isNodeJS = false;
	    // queue for late tasks, used by unhandled rejection tracking
	    var laterQueue = [];
	
	    function flush() {
	        /* jshint loopfunc: true */
	        var task, domain;
	
	        while (head.next) {
	            head = head.next;
	            task = head.task;
	            head.task = void 0;
	            domain = head.domain;
	
	            if (domain) {
	                head.domain = void 0;
	                domain.enter();
	            }
	            runSingle(task, domain);
	
	        }
	        while (laterQueue.length) {
	            task = laterQueue.pop();
	            runSingle(task);
	        }
	        flushing = false;
	    }
	    // runs a single function in the async queue
	    function runSingle(task, domain) {
	        try {
	            task();
	
	        } catch (e) {
	            if (isNodeJS) {
	                // In node, uncaught exceptions are considered fatal errors.
	                // Re-throw them synchronously to interrupt flushing!
	
	                // Ensure continuation if the uncaught exception is suppressed
	                // listening "uncaughtException" events (as domains does).
	                // Continue in next event to avoid tick recursion.
	                if (domain) {
	                    domain.exit();
	                }
	                setTimeout(flush, 0);
	                if (domain) {
	                    domain.enter();
	                }
	
	                throw e;
	
	            } else {
	                // In browsers, uncaught exceptions are not fatal.
	                // Re-throw them asynchronously to avoid slow-downs.
	                setTimeout(function () {
	                    throw e;
	                }, 0);
	            }
	        }
	
	        if (domain) {
	            domain.exit();
	        }
	    }
	
	    nextTick = function (task) {
	        tail = tail.next = {
	            task: task,
	            domain: isNodeJS && process.domain,
	            next: null
	        };
	
	        if (!flushing) {
	            flushing = true;
	            requestTick();
	        }
	    };
	
	    if (typeof process === "object" &&
	        process.toString() === "[object process]" && process.nextTick) {
	        // Ensure Q is in a real Node environment, with a `process.nextTick`.
	        // To see through fake Node environments:
	        // * Mocha test runner - exposes a `process` global without a `nextTick`
	        // * Browserify - exposes a `process.nexTick` function that uses
	        //   `setTimeout`. In this case `setImmediate` is preferred because
	        //    it is faster. Browserify's `process.toString()` yields
	        //   "[object Object]", while in a real Node environment
	        //   `process.nextTick()` yields "[object process]".
	        isNodeJS = true;
	
	        requestTick = function () {
	            process.nextTick(flush);
	        };
	
	    } else if (typeof setImmediate === "function") {
	        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
	        if (typeof window !== "undefined") {
	            requestTick = setImmediate.bind(window, flush);
	        } else {
	            requestTick = function () {
	                setImmediate(flush);
	            };
	        }
	
	    } else if (typeof MessageChannel !== "undefined") {
	        // modern browsers
	        // http://www.nonblocking.io/2011/06/windownexttick.html
	        var channel = new MessageChannel();
	        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
	        // working message ports the first time a page loads.
	        channel.port1.onmessage = function () {
	            requestTick = requestPortTick;
	            channel.port1.onmessage = flush;
	            flush();
	        };
	        var requestPortTick = function () {
	            // Opera requires us to provide a message payload, regardless of
	            // whether we use it.
	            channel.port2.postMessage(0);
	        };
	        requestTick = function () {
	            setTimeout(flush, 0);
	            requestPortTick();
	        };
	
	    } else {
	        // old browsers
	        requestTick = function () {
	            setTimeout(flush, 0);
	        };
	    }
	    // runs a task after all other tasks have been run
	    // this is useful for unhandled rejection tracking that needs to happen
	    // after all `then`d tasks have been run.
	    nextTick.runAfter = function (task) {
	        laterQueue.push(task);
	        if (!flushing) {
	            flushing = true;
	            requestTick();
	        }
	    };
	    return nextTick;
	})();
	
	// Attempt to make generics safe in the face of downstream
	// modifications.
	// There is no situation where this is necessary.
	// If you need a security guarantee, these primordials need to be
	// deeply frozen anyway, and if you don’t need a security guarantee,
	// this is just plain paranoid.
	// However, this **might** have the nice side-effect of reducing the size of
	// the minified code by reducing x.call() to merely x()
	// See Mark Miller’s explanation of what this does.
	// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
	var call = Function.call;
	function uncurryThis(f) {
	    return function () {
	        return call.apply(f, arguments);
	    };
	}
	// This is equivalent, but slower:
	// uncurryThis = Function_bind.bind(Function_bind.call);
	// http://jsperf.com/uncurrythis
	
	var array_slice = uncurryThis(Array.prototype.slice);
	
	var array_reduce = uncurryThis(
	    Array.prototype.reduce || function (callback, basis) {
	        var index = 0,
	            length = this.length;
	        // concerning the initial value, if one is not provided
	        if (arguments.length === 1) {
	            // seek to the first value in the array, accounting
	            // for the possibility that is is a sparse array
	            do {
	                if (index in this) {
	                    basis = this[index++];
	                    break;
	                }
	                if (++index >= length) {
	                    throw new TypeError();
	                }
	            } while (1);
	        }
	        // reduce
	        for (; index < length; index++) {
	            // account for the possibility that the array is sparse
	            if (index in this) {
	                basis = callback(basis, this[index], index);
	            }
	        }
	        return basis;
	    }
	);
	
	var array_indexOf = uncurryThis(
	    Array.prototype.indexOf || function (value) {
	        // not a very good shim, but good enough for our one use of it
	        for (var i = 0; i < this.length; i++) {
	            if (this[i] === value) {
	                return i;
	            }
	        }
	        return -1;
	    }
	);
	
	var array_map = uncurryThis(
	    Array.prototype.map || function (callback, thisp) {
	        var self = this;
	        var collect = [];
	        array_reduce(self, function (undefined, value, index) {
	            collect.push(callback.call(thisp, value, index, self));
	        }, void 0);
	        return collect;
	    }
	);
	
	var object_create = Object.create || function (prototype) {
	    function Type() { }
	    Type.prototype = prototype;
	    return new Type();
	};
	
	var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
	
	var object_keys = Object.keys || function (object) {
	    var keys = [];
	    for (var key in object) {
	        if (object_hasOwnProperty(object, key)) {
	            keys.push(key);
	        }
	    }
	    return keys;
	};
	
	var object_toString = uncurryThis(Object.prototype.toString);
	
	function isObject(value) {
	    return value === Object(value);
	}
	
	// generator related shims
	
	// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
	function isStopIteration(exception) {
	    return (
	        object_toString(exception) === "[object StopIteration]" ||
	        exception instanceof QReturnValue
	    );
	}
	
	// FIXME: Remove this helper and Q.return once ES6 generators are in
	// SpiderMonkey.
	var QReturnValue;
	if (typeof ReturnValue !== "undefined") {
	    QReturnValue = ReturnValue;
	} else {
	    QReturnValue = function (value) {
	        this.value = value;
	    };
	}
	
	// long stack traces
	
	var STACK_JUMP_SEPARATOR = "From previous event:";
	
	function makeStackTraceLong(error, promise) {
	    // If possible, transform the error stack trace by removing Node and Q
	    // cruft, then concatenating with the stack trace of `promise`. See #57.
	    if (hasStacks &&
	        promise.stack &&
	        typeof error === "object" &&
	        error !== null &&
	        error.stack &&
	        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
	    ) {
	        var stacks = [];
	        for (var p = promise; !!p; p = p.source) {
	            if (p.stack) {
	                stacks.unshift(p.stack);
	            }
	        }
	        stacks.unshift(error.stack);
	
	        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
	        error.stack = filterStackString(concatedStacks);
	    }
	}
	
	function filterStackString(stackString) {
	    var lines = stackString.split("\n");
	    var desiredLines = [];
	    for (var i = 0; i < lines.length; ++i) {
	        var line = lines[i];
	
	        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
	            desiredLines.push(line);
	        }
	    }
	    return desiredLines.join("\n");
	}
	
	function isNodeFrame(stackLine) {
	    return stackLine.indexOf("(module.js:") !== -1 ||
	           stackLine.indexOf("(node.js:") !== -1;
	}
	
	function getFileNameAndLineNumber(stackLine) {
	    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
	    // In IE10 function name can have spaces ("Anonymous function") O_o
	    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
	    if (attempt1) {
	        return [attempt1[1], Number(attempt1[2])];
	    }
	
	    // Anonymous functions: "at filename:lineNumber:columnNumber"
	    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
	    if (attempt2) {
	        return [attempt2[1], Number(attempt2[2])];
	    }
	
	    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
	    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
	    if (attempt3) {
	        return [attempt3[1], Number(attempt3[2])];
	    }
	}
	
	function isInternalFrame(stackLine) {
	    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
	
	    if (!fileNameAndLineNumber) {
	        return false;
	    }
	
	    var fileName = fileNameAndLineNumber[0];
	    var lineNumber = fileNameAndLineNumber[1];
	
	    return fileName === qFileName &&
	        lineNumber >= qStartingLine &&
	        lineNumber <= qEndingLine;
	}
	
	// discover own file name and line number range for filtering stack
	// traces
	function captureLine() {
	    if (!hasStacks) {
	        return;
	    }
	
	    try {
	        throw new Error();
	    } catch (e) {
	        var lines = e.stack.split("\n");
	        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
	        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
	        if (!fileNameAndLineNumber) {
	            return;
	        }
	
	        qFileName = fileNameAndLineNumber[0];
	        return fileNameAndLineNumber[1];
	    }
	}
	
	function deprecate(callback, name, alternative) {
	    return function () {
	        if (typeof console !== "undefined" &&
	            typeof console.warn === "function") {
	            console.warn(name + " is deprecated, use " + alternative +
	                         " instead.", new Error("").stack);
	        }
	        return callback.apply(callback, arguments);
	    };
	}
	
	// end of shims
	// beginning of real work
	
	/**
	 * Constructs a promise for an immediate reference, passes promises through, or
	 * coerces promises from different systems.
	 * @param value immediate reference or promise
	 */
	function Q(value) {
	    // If the object is already a Promise, return it directly.  This enables
	    // the resolve function to both be used to created references from objects,
	    // but to tolerably coerce non-promises to promises.
	    if (value instanceof Promise) {
	        return value;
	    }
	
	    // assimilate thenables
	    if (isPromiseAlike(value)) {
	        return coerce(value);
	    } else {
	        return fulfill(value);
	    }
	}
	Q.resolve = Q;
	
	/**
	 * Performs a task in a future turn of the event loop.
	 * @param {Function} task
	 */
	Q.nextTick = nextTick;
	
	/**
	 * Controls whether or not long stack traces will be on
	 */
	Q.longStackSupport = false;
	
	// enable long stacks if Q_DEBUG is set
	if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
	    Q.longStackSupport = true;
	}
	
	/**
	 * Constructs a {promise, resolve, reject} object.
	 *
	 * `resolve` is a callback to invoke with a more resolved value for the
	 * promise. To fulfill the promise, invoke `resolve` with any value that is
	 * not a thenable. To reject the promise, invoke `resolve` with a rejected
	 * thenable, or invoke `reject` with the reason directly. To resolve the
	 * promise to another thenable, thus putting it in the same state, invoke
	 * `resolve` with that other thenable.
	 */
	Q.defer = defer;
	function defer() {
	    // if "messages" is an "Array", that indicates that the promise has not yet
	    // been resolved.  If it is "undefined", it has been resolved.  Each
	    // element of the messages array is itself an array of complete arguments to
	    // forward to the resolved promise.  We coerce the resolution value to a
	    // promise using the `resolve` function because it handles both fully
	    // non-thenable values and other thenables gracefully.
	    var messages = [], progressListeners = [], resolvedPromise;
	
	    var deferred = object_create(defer.prototype);
	    var promise = object_create(Promise.prototype);
	
	    promise.promiseDispatch = function (resolve, op, operands) {
	        var args = array_slice(arguments);
	        if (messages) {
	            messages.push(args);
	            if (op === "when" && operands[1]) { // progress operand
	                progressListeners.push(operands[1]);
	            }
	        } else {
	            Q.nextTick(function () {
	                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
	            });
	        }
	    };
	
	    // XXX deprecated
	    promise.valueOf = function () {
	        if (messages) {
	            return promise;
	        }
	        var nearerValue = nearer(resolvedPromise);
	        if (isPromise(nearerValue)) {
	            resolvedPromise = nearerValue; // shorten chain
	        }
	        return nearerValue;
	    };
	
	    promise.inspect = function () {
	        if (!resolvedPromise) {
	            return { state: "pending" };
	        }
	        return resolvedPromise.inspect();
	    };
	
	    if (Q.longStackSupport && hasStacks) {
	        try {
	            throw new Error();
	        } catch (e) {
	            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
	            // accessor around; that causes memory leaks as per GH-111. Just
	            // reify the stack trace as a string ASAP.
	            //
	            // At the same time, cut off the first line; it's always just
	            // "[object Promise]\n", as per the `toString`.
	            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
	        }
	    }
	
	    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
	    // consolidating them into `become`, since otherwise we'd create new
	    // promises with the lines `become(whatever(value))`. See e.g. GH-252.
	
	    function become(newPromise) {
	        resolvedPromise = newPromise;
	        promise.source = newPromise;
	
	        array_reduce(messages, function (undefined, message) {
	            Q.nextTick(function () {
	                newPromise.promiseDispatch.apply(newPromise, message);
	            });
	        }, void 0);
	
	        messages = void 0;
	        progressListeners = void 0;
	    }
	
	    deferred.promise = promise;
	    deferred.resolve = function (value) {
	        if (resolvedPromise) {
	            return;
	        }
	
	        become(Q(value));
	    };
	
	    deferred.fulfill = function (value) {
	        if (resolvedPromise) {
	            return;
	        }
	
	        become(fulfill(value));
	    };
	    deferred.reject = function (reason) {
	        if (resolvedPromise) {
	            return;
	        }
	
	        become(reject(reason));
	    };
	    deferred.notify = function (progress) {
	        if (resolvedPromise) {
	            return;
	        }
	
	        array_reduce(progressListeners, function (undefined, progressListener) {
	            Q.nextTick(function () {
	                progressListener(progress);
	            });
	        }, void 0);
	    };
	
	    return deferred;
	}
	
	/**
	 * Creates a Node-style callback that will resolve or reject the deferred
	 * promise.
	 * @returns a nodeback
	 */
	defer.prototype.makeNodeResolver = function () {
	    var self = this;
	    return function (error, value) {
	        if (error) {
	            self.reject(error);
	        } else if (arguments.length > 2) {
	            self.resolve(array_slice(arguments, 1));
	        } else {
	            self.resolve(value);
	        }
	    };
	};
	
	/**
	 * @param resolver {Function} a function that returns nothing and accepts
	 * the resolve, reject, and notify functions for a deferred.
	 * @returns a promise that may be resolved with the given resolve and reject
	 * functions, or rejected by a thrown exception in resolver
	 */
	Q.Promise = promise; // ES6
	Q.promise = promise;
	function promise(resolver) {
	    if (typeof resolver !== "function") {
	        throw new TypeError("resolver must be a function.");
	    }
	    var deferred = defer();
	    try {
	        resolver(deferred.resolve, deferred.reject, deferred.notify);
	    } catch (reason) {
	        deferred.reject(reason);
	    }
	    return deferred.promise;
	}
	
	promise.race = race; // ES6
	promise.all = all; // ES6
	promise.reject = reject; // ES6
	promise.resolve = Q; // ES6
	
	// XXX experimental.  This method is a way to denote that a local value is
	// serializable and should be immediately dispatched to a remote upon request,
	// instead of passing a reference.
	Q.passByCopy = function (object) {
	    //freeze(object);
	    //passByCopies.set(object, true);
	    return object;
	};
	
	Promise.prototype.passByCopy = function () {
	    //freeze(object);
	    //passByCopies.set(object, true);
	    return this;
	};
	
	/**
	 * If two promises eventually fulfill to the same value, promises that value,
	 * but otherwise rejects.
	 * @param x {Any*}
	 * @param y {Any*}
	 * @returns {Any*} a promise for x and y if they are the same, but a rejection
	 * otherwise.
	 *
	 */
	Q.join = function (x, y) {
	    return Q(x).join(y);
	};
	
	Promise.prototype.join = function (that) {
	    return Q([this, that]).spread(function (x, y) {
	        if (x === y) {
	            // TODO: "===" should be Object.is or equiv
	            return x;
	        } else {
	            throw new Error("Can't join: not the same: " + x + " " + y);
	        }
	    });
	};
	
	/**
	 * Returns a promise for the first of an array of promises to become settled.
	 * @param answers {Array[Any*]} promises to race
	 * @returns {Any*} the first promise to be settled
	 */
	Q.race = race;
	function race(answerPs) {
	    return promise(function (resolve, reject) {
	        // Switch to this once we can assume at least ES5
	        // answerPs.forEach(function (answerP) {
	        //     Q(answerP).then(resolve, reject);
	        // });
	        // Use this in the meantime
	        for (var i = 0, len = answerPs.length; i < len; i++) {
	            Q(answerPs[i]).then(resolve, reject);
	        }
	    });
	}
	
	Promise.prototype.race = function () {
	    return this.then(Q.race);
	};
	
	/**
	 * Constructs a Promise with a promise descriptor object and optional fallback
	 * function.  The descriptor contains methods like when(rejected), get(name),
	 * set(name, value), post(name, args), and delete(name), which all
	 * return either a value, a promise for a value, or a rejection.  The fallback
	 * accepts the operation name, a resolver, and any further arguments that would
	 * have been forwarded to the appropriate method above had a method been
	 * provided with the proper name.  The API makes no guarantees about the nature
	 * of the returned object, apart from that it is usable whereever promises are
	 * bought and sold.
	 */
	Q.makePromise = Promise;
	function Promise(descriptor, fallback, inspect) {
	    if (fallback === void 0) {
	        fallback = function (op) {
	            return reject(new Error(
	                "Promise does not support operation: " + op
	            ));
	        };
	    }
	    if (inspect === void 0) {
	        inspect = function () {
	            return {state: "unknown"};
	        };
	    }
	
	    var promise = object_create(Promise.prototype);
	
	    promise.promiseDispatch = function (resolve, op, args) {
	        var result;
	        try {
	            if (descriptor[op]) {
	                result = descriptor[op].apply(promise, args);
	            } else {
	                result = fallback.call(promise, op, args);
	            }
	        } catch (exception) {
	            result = reject(exception);
	        }
	        if (resolve) {
	            resolve(result);
	        }
	    };
	
	    promise.inspect = inspect;
	
	    // XXX deprecated `valueOf` and `exception` support
	    if (inspect) {
	        var inspected = inspect();
	        if (inspected.state === "rejected") {
	            promise.exception = inspected.reason;
	        }
	
	        promise.valueOf = function () {
	            var inspected = inspect();
	            if (inspected.state === "pending" ||
	                inspected.state === "rejected") {
	                return promise;
	            }
	            return inspected.value;
	        };
	    }
	
	    return promise;
	}
	
	Promise.prototype.toString = function () {
	    return "[object Promise]";
	};
	
	Promise.prototype.then = function (fulfilled, rejected, progressed) {
	    var self = this;
	    var deferred = defer();
	    var done = false;   // ensure the untrusted promise makes at most a
	                        // single call to one of the callbacks
	
	    function _fulfilled(value) {
	        try {
	            return typeof fulfilled === "function" ? fulfilled(value) : value;
	        } catch (exception) {
	            return reject(exception);
	        }
	    }
	
	    function _rejected(exception) {
	        if (typeof rejected === "function") {
	            makeStackTraceLong(exception, self);
	            try {
	                return rejected(exception);
	            } catch (newException) {
	                return reject(newException);
	            }
	        }
	        return reject(exception);
	    }
	
	    function _progressed(value) {
	        return typeof progressed === "function" ? progressed(value) : value;
	    }
	
	    Q.nextTick(function () {
	        self.promiseDispatch(function (value) {
	            if (done) {
	                return;
	            }
	            done = true;
	
	            deferred.resolve(_fulfilled(value));
	        }, "when", [function (exception) {
	            if (done) {
	                return;
	            }
	            done = true;
	
	            deferred.resolve(_rejected(exception));
	        }]);
	    });
	
	    // Progress propagator need to be attached in the current tick.
	    self.promiseDispatch(void 0, "when", [void 0, function (value) {
	        var newValue;
	        var threw = false;
	        try {
	            newValue = _progressed(value);
	        } catch (e) {
	            threw = true;
	            if (Q.onerror) {
	                Q.onerror(e);
	            } else {
	                throw e;
	            }
	        }
	
	        if (!threw) {
	            deferred.notify(newValue);
	        }
	    }]);
	
	    return deferred.promise;
	};
	
	Q.tap = function (promise, callback) {
	    return Q(promise).tap(callback);
	};
	
	/**
	 * Works almost like "finally", but not called for rejections.
	 * Original resolution value is passed through callback unaffected.
	 * Callback may return a promise that will be awaited for.
	 * @param {Function} callback
	 * @returns {Q.Promise}
	 * @example
	 * doSomething()
	 *   .then(...)
	 *   .tap(console.log)
	 *   .then(...);
	 */
	Promise.prototype.tap = function (callback) {
	    callback = Q(callback);
	
	    return this.then(function (value) {
	        return callback.fcall(value).thenResolve(value);
	    });
	};
	
	/**
	 * Registers an observer on a promise.
	 *
	 * Guarantees:
	 *
	 * 1. that fulfilled and rejected will be called only once.
	 * 2. that either the fulfilled callback or the rejected callback will be
	 *    called, but not both.
	 * 3. that fulfilled and rejected will not be called in this turn.
	 *
	 * @param value      promise or immediate reference to observe
	 * @param fulfilled  function to be called with the fulfilled value
	 * @param rejected   function to be called with the rejection exception
	 * @param progressed function to be called on any progress notifications
	 * @return promise for the return value from the invoked callback
	 */
	Q.when = when;
	function when(value, fulfilled, rejected, progressed) {
	    return Q(value).then(fulfilled, rejected, progressed);
	}
	
	Promise.prototype.thenResolve = function (value) {
	    return this.then(function () { return value; });
	};
	
	Q.thenResolve = function (promise, value) {
	    return Q(promise).thenResolve(value);
	};
	
	Promise.prototype.thenReject = function (reason) {
	    return this.then(function () { throw reason; });
	};
	
	Q.thenReject = function (promise, reason) {
	    return Q(promise).thenReject(reason);
	};
	
	/**
	 * If an object is not a promise, it is as "near" as possible.
	 * If a promise is rejected, it is as "near" as possible too.
	 * If it’s a fulfilled promise, the fulfillment value is nearer.
	 * If it’s a deferred promise and the deferred has been resolved, the
	 * resolution is "nearer".
	 * @param object
	 * @returns most resolved (nearest) form of the object
	 */
	
	// XXX should we re-do this?
	Q.nearer = nearer;
	function nearer(value) {
	    if (isPromise(value)) {
	        var inspected = value.inspect();
	        if (inspected.state === "fulfilled") {
	            return inspected.value;
	        }
	    }
	    return value;
	}
	
	/**
	 * @returns whether the given object is a promise.
	 * Otherwise it is a fulfilled value.
	 */
	Q.isPromise = isPromise;
	function isPromise(object) {
	    return object instanceof Promise;
	}
	
	Q.isPromiseAlike = isPromiseAlike;
	function isPromiseAlike(object) {
	    return isObject(object) && typeof object.then === "function";
	}
	
	/**
	 * @returns whether the given object is a pending promise, meaning not
	 * fulfilled or rejected.
	 */
	Q.isPending = isPending;
	function isPending(object) {
	    return isPromise(object) && object.inspect().state === "pending";
	}
	
	Promise.prototype.isPending = function () {
	    return this.inspect().state === "pending";
	};
	
	/**
	 * @returns whether the given object is a value or fulfilled
	 * promise.
	 */
	Q.isFulfilled = isFulfilled;
	function isFulfilled(object) {
	    return !isPromise(object) || object.inspect().state === "fulfilled";
	}
	
	Promise.prototype.isFulfilled = function () {
	    return this.inspect().state === "fulfilled";
	};
	
	/**
	 * @returns whether the given object is a rejected promise.
	 */
	Q.isRejected = isRejected;
	function isRejected(object) {
	    return isPromise(object) && object.inspect().state === "rejected";
	}
	
	Promise.prototype.isRejected = function () {
	    return this.inspect().state === "rejected";
	};
	
	//// BEGIN UNHANDLED REJECTION TRACKING
	
	// This promise library consumes exceptions thrown in handlers so they can be
	// handled by a subsequent promise.  The exceptions get added to this array when
	// they are created, and removed when they are handled.  Note that in ES6 or
	// shimmed environments, this would naturally be a `Set`.
	var unhandledReasons = [];
	var unhandledRejections = [];
	var reportedUnhandledRejections = [];
	var trackUnhandledRejections = true;
	
	function resetUnhandledRejections() {
	    unhandledReasons.length = 0;
	    unhandledRejections.length = 0;
	
	    if (!trackUnhandledRejections) {
	        trackUnhandledRejections = true;
	    }
	}
	
	function trackRejection(promise, reason) {
	    if (!trackUnhandledRejections) {
	        return;
	    }
	    if (typeof process === "object" && typeof process.emit === "function") {
	        Q.nextTick.runAfter(function () {
	            if (array_indexOf(unhandledRejections, promise) !== -1) {
	                process.emit("unhandledRejection", reason, promise);
	                reportedUnhandledRejections.push(promise);
	            }
	        });
	    }
	
	    unhandledRejections.push(promise);
	    if (reason && typeof reason.stack !== "undefined") {
	        unhandledReasons.push(reason.stack);
	    } else {
	        unhandledReasons.push("(no stack) " + reason);
	    }
	}
	
	function untrackRejection(promise) {
	    if (!trackUnhandledRejections) {
	        return;
	    }
	
	    var at = array_indexOf(unhandledRejections, promise);
	    if (at !== -1) {
	        if (typeof process === "object" && typeof process.emit === "function") {
	            Q.nextTick.runAfter(function () {
	                var atReport = array_indexOf(reportedUnhandledRejections, promise);
	                if (atReport !== -1) {
	                    process.emit("rejectionHandled", unhandledReasons[at], promise);
	                    reportedUnhandledRejections.splice(atReport, 1);
	                }
	            });
	        }
	        unhandledRejections.splice(at, 1);
	        unhandledReasons.splice(at, 1);
	    }
	}
	
	Q.resetUnhandledRejections = resetUnhandledRejections;
	
	Q.getUnhandledReasons = function () {
	    // Make a copy so that consumers can't interfere with our internal state.
	    return unhandledReasons.slice();
	};
	
	Q.stopUnhandledRejectionTracking = function () {
	    resetUnhandledRejections();
	    trackUnhandledRejections = false;
	};
	
	resetUnhandledRejections();
	
	//// END UNHANDLED REJECTION TRACKING
	
	/**
	 * Constructs a rejected promise.
	 * @param reason value describing the failure
	 */
	Q.reject = reject;
	function reject(reason) {
	    var rejection = Promise({
	        "when": function (rejected) {
	            // note that the error has been handled
	            if (rejected) {
	                untrackRejection(this);
	            }
	            return rejected ? rejected(reason) : this;
	        }
	    }, function fallback() {
	        return this;
	    }, function inspect() {
	        return { state: "rejected", reason: reason };
	    });
	
	    // Note that the reason has not been handled.
	    trackRejection(rejection, reason);
	
	    return rejection;
	}
	
	/**
	 * Constructs a fulfilled promise for an immediate reference.
	 * @param value immediate reference
	 */
	Q.fulfill = fulfill;
	function fulfill(value) {
	    return Promise({
	        "when": function () {
	            return value;
	        },
	        "get": function (name) {
	            return value[name];
	        },
	        "set": function (name, rhs) {
	            value[name] = rhs;
	        },
	        "delete": function (name) {
	            delete value[name];
	        },
	        "post": function (name, args) {
	            // Mark Miller proposes that post with no name should apply a
	            // promised function.
	            if (name === null || name === void 0) {
	                return value.apply(void 0, args);
	            } else {
	                return value[name].apply(value, args);
	            }
	        },
	        "apply": function (thisp, args) {
	            return value.apply(thisp, args);
	        },
	        "keys": function () {
	            return object_keys(value);
	        }
	    }, void 0, function inspect() {
	        return { state: "fulfilled", value: value };
	    });
	}
	
	/**
	 * Converts thenables to Q promises.
	 * @param promise thenable promise
	 * @returns a Q promise
	 */
	function coerce(promise) {
	    var deferred = defer();
	    Q.nextTick(function () {
	        try {
	            promise.then(deferred.resolve, deferred.reject, deferred.notify);
	        } catch (exception) {
	            deferred.reject(exception);
	        }
	    });
	    return deferred.promise;
	}
	
	/**
	 * Annotates an object such that it will never be
	 * transferred away from this process over any promise
	 * communication channel.
	 * @param object
	 * @returns promise a wrapping of that object that
	 * additionally responds to the "isDef" message
	 * without a rejection.
	 */
	Q.master = master;
	function master(object) {
	    return Promise({
	        "isDef": function () {}
	    }, function fallback(op, args) {
	        return dispatch(object, op, args);
	    }, function () {
	        return Q(object).inspect();
	    });
	}
	
	/**
	 * Spreads the values of a promised array of arguments into the
	 * fulfillment callback.
	 * @param fulfilled callback that receives variadic arguments from the
	 * promised array
	 * @param rejected callback that receives the exception if the promise
	 * is rejected.
	 * @returns a promise for the return value or thrown exception of
	 * either callback.
	 */
	Q.spread = spread;
	function spread(value, fulfilled, rejected) {
	    return Q(value).spread(fulfilled, rejected);
	}
	
	Promise.prototype.spread = function (fulfilled, rejected) {
	    return this.all().then(function (array) {
	        return fulfilled.apply(void 0, array);
	    }, rejected);
	};
	
	/**
	 * The async function is a decorator for generator functions, turning
	 * them into asynchronous generators.  Although generators are only part
	 * of the newest ECMAScript 6 drafts, this code does not cause syntax
	 * errors in older engines.  This code should continue to work and will
	 * in fact improve over time as the language improves.
	 *
	 * ES6 generators are currently part of V8 version 3.19 with the
	 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
	 * for longer, but under an older Python-inspired form.  This function
	 * works on both kinds of generators.
	 *
	 * Decorates a generator function such that:
	 *  - it may yield promises
	 *  - execution will continue when that promise is fulfilled
	 *  - the value of the yield expression will be the fulfilled value
	 *  - it returns a promise for the return value (when the generator
	 *    stops iterating)
	 *  - the decorated function returns a promise for the return value
	 *    of the generator or the first rejected promise among those
	 *    yielded.
	 *  - if an error is thrown in the generator, it propagates through
	 *    every following yield until it is caught, or until it escapes
	 *    the generator function altogether, and is translated into a
	 *    rejection for the promise returned by the decorated generator.
	 */
	Q.async = async;
	function async(makeGenerator) {
	    return function () {
	        // when verb is "send", arg is a value
	        // when verb is "throw", arg is an exception
	        function continuer(verb, arg) {
	            var result;
	
	            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
	            // engine that has a deployed base of browsers that support generators.
	            // However, SM's generators use the Python-inspired semantics of
	            // outdated ES6 drafts.  We would like to support ES6, but we'd also
	            // like to make it possible to use generators in deployed browsers, so
	            // we also support Python-style generators.  At some point we can remove
	            // this block.
	
	            if (typeof StopIteration === "undefined") {
	                // ES6 Generators
	                try {
	                    result = generator[verb](arg);
	                } catch (exception) {
	                    return reject(exception);
	                }
	                if (result.done) {
	                    return Q(result.value);
	                } else {
	                    return when(result.value, callback, errback);
	                }
	            } else {
	                // SpiderMonkey Generators
	                // FIXME: Remove this case when SM does ES6 generators.
	                try {
	                    result = generator[verb](arg);
	                } catch (exception) {
	                    if (isStopIteration(exception)) {
	                        return Q(exception.value);
	                    } else {
	                        return reject(exception);
	                    }
	                }
	                return when(result, callback, errback);
	            }
	        }
	        var generator = makeGenerator.apply(this, arguments);
	        var callback = continuer.bind(continuer, "next");
	        var errback = continuer.bind(continuer, "throw");
	        return callback();
	    };
	}
	
	/**
	 * The spawn function is a small wrapper around async that immediately
	 * calls the generator and also ends the promise chain, so that any
	 * unhandled errors are thrown instead of forwarded to the error
	 * handler. This is useful because it's extremely common to run
	 * generators at the top-level to work with libraries.
	 */
	Q.spawn = spawn;
	function spawn(makeGenerator) {
	    Q.done(Q.async(makeGenerator)());
	}
	
	// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
	/**
	 * Throws a ReturnValue exception to stop an asynchronous generator.
	 *
	 * This interface is a stop-gap measure to support generator return
	 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
	 * generators like Chromium 29, just use "return" in your generator
	 * functions.
	 *
	 * @param value the return value for the surrounding generator
	 * @throws ReturnValue exception with the value.
	 * @example
	 * // ES6 style
	 * Q.async(function* () {
	 *      var foo = yield getFooPromise();
	 *      var bar = yield getBarPromise();
	 *      return foo + bar;
	 * })
	 * // Older SpiderMonkey style
	 * Q.async(function () {
	 *      var foo = yield getFooPromise();
	 *      var bar = yield getBarPromise();
	 *      Q.return(foo + bar);
	 * })
	 */
	Q["return"] = _return;
	function _return(value) {
	    throw new QReturnValue(value);
	}
	
	/**
	 * The promised function decorator ensures that any promise arguments
	 * are settled and passed as values (`this` is also settled and passed
	 * as a value).  It will also ensure that the result of a function is
	 * always a promise.
	 *
	 * @example
	 * var add = Q.promised(function (a, b) {
	 *     return a + b;
	 * });
	 * add(Q(a), Q(B));
	 *
	 * @param {function} callback The function to decorate
	 * @returns {function} a function that has been decorated.
	 */
	Q.promised = promised;
	function promised(callback) {
	    return function () {
	        return spread([this, all(arguments)], function (self, args) {
	            return callback.apply(self, args);
	        });
	    };
	}
	
	/**
	 * sends a message to a value in a future turn
	 * @param object* the recipient
	 * @param op the name of the message operation, e.g., "when",
	 * @param args further arguments to be forwarded to the operation
	 * @returns result {Promise} a promise for the result of the operation
	 */
	Q.dispatch = dispatch;
	function dispatch(object, op, args) {
	    return Q(object).dispatch(op, args);
	}
	
	Promise.prototype.dispatch = function (op, args) {
	    var self = this;
	    var deferred = defer();
	    Q.nextTick(function () {
	        self.promiseDispatch(deferred.resolve, op, args);
	    });
	    return deferred.promise;
	};
	
	/**
	 * Gets the value of a property in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of property to get
	 * @return promise for the property value
	 */
	Q.get = function (object, key) {
	    return Q(object).dispatch("get", [key]);
	};
	
	Promise.prototype.get = function (key) {
	    return this.dispatch("get", [key]);
	};
	
	/**
	 * Sets the value of a property in a future turn.
	 * @param object    promise or immediate reference for object object
	 * @param name      name of property to set
	 * @param value     new value of property
	 * @return promise for the return value
	 */
	Q.set = function (object, key, value) {
	    return Q(object).dispatch("set", [key, value]);
	};
	
	Promise.prototype.set = function (key, value) {
	    return this.dispatch("set", [key, value]);
	};
	
	/**
	 * Deletes a property in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of property to delete
	 * @return promise for the return value
	 */
	Q.del = // XXX legacy
	Q["delete"] = function (object, key) {
	    return Q(object).dispatch("delete", [key]);
	};
	
	Promise.prototype.del = // XXX legacy
	Promise.prototype["delete"] = function (key) {
	    return this.dispatch("delete", [key]);
	};
	
	/**
	 * Invokes a method in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of method to invoke
	 * @param value     a value to post, typically an array of
	 *                  invocation arguments for promises that
	 *                  are ultimately backed with `resolve` values,
	 *                  as opposed to those backed with URLs
	 *                  wherein the posted value can be any
	 *                  JSON serializable object.
	 * @return promise for the return value
	 */
	// bound locally because it is used by other methods
	Q.mapply = // XXX As proposed by "Redsandro"
	Q.post = function (object, name, args) {
	    return Q(object).dispatch("post", [name, args]);
	};
	
	Promise.prototype.mapply = // XXX As proposed by "Redsandro"
	Promise.prototype.post = function (name, args) {
	    return this.dispatch("post", [name, args]);
	};
	
	/**
	 * Invokes a method in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of method to invoke
	 * @param ...args   array of invocation arguments
	 * @return promise for the return value
	 */
	Q.send = // XXX Mark Miller's proposed parlance
	Q.mcall = // XXX As proposed by "Redsandro"
	Q.invoke = function (object, name /*...args*/) {
	    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
	};
	
	Promise.prototype.send = // XXX Mark Miller's proposed parlance
	Promise.prototype.mcall = // XXX As proposed by "Redsandro"
	Promise.prototype.invoke = function (name /*...args*/) {
	    return this.dispatch("post", [name, array_slice(arguments, 1)]);
	};
	
	/**
	 * Applies the promised function in a future turn.
	 * @param object    promise or immediate reference for target function
	 * @param args      array of application arguments
	 */
	Q.fapply = function (object, args) {
	    return Q(object).dispatch("apply", [void 0, args]);
	};
	
	Promise.prototype.fapply = function (args) {
	    return this.dispatch("apply", [void 0, args]);
	};
	
	/**
	 * Calls the promised function in a future turn.
	 * @param object    promise or immediate reference for target function
	 * @param ...args   array of application arguments
	 */
	Q["try"] =
	Q.fcall = function (object /* ...args*/) {
	    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
	};
	
	Promise.prototype.fcall = function (/*...args*/) {
	    return this.dispatch("apply", [void 0, array_slice(arguments)]);
	};
	
	/**
	 * Binds the promised function, transforming return values into a fulfilled
	 * promise and thrown errors into a rejected one.
	 * @param object    promise or immediate reference for target function
	 * @param ...args   array of application arguments
	 */
	Q.fbind = function (object /*...args*/) {
	    var promise = Q(object);
	    var args = array_slice(arguments, 1);
	    return function fbound() {
	        return promise.dispatch("apply", [
	            this,
	            args.concat(array_slice(arguments))
	        ]);
	    };
	};
	Promise.prototype.fbind = function (/*...args*/) {
	    var promise = this;
	    var args = array_slice(arguments);
	    return function fbound() {
	        return promise.dispatch("apply", [
	            this,
	            args.concat(array_slice(arguments))
	        ]);
	    };
	};
	
	/**
	 * Requests the names of the owned properties of a promised
	 * object in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @return promise for the keys of the eventually settled object
	 */
	Q.keys = function (object) {
	    return Q(object).dispatch("keys", []);
	};
	
	Promise.prototype.keys = function () {
	    return this.dispatch("keys", []);
	};
	
	/**
	 * Turns an array of promises into a promise for an array.  If any of
	 * the promises gets rejected, the whole array is rejected immediately.
	 * @param {Array*} an array (or promise for an array) of values (or
	 * promises for values)
	 * @returns a promise for an array of the corresponding values
	 */
	// By Mark Miller
	// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
	Q.all = all;
	function all(promises) {
	    return when(promises, function (promises) {
	        var pendingCount = 0;
	        var deferred = defer();
	        array_reduce(promises, function (undefined, promise, index) {
	            var snapshot;
	            if (
	                isPromise(promise) &&
	                (snapshot = promise.inspect()).state === "fulfilled"
	            ) {
	                promises[index] = snapshot.value;
	            } else {
	                ++pendingCount;
	                when(
	                    promise,
	                    function (value) {
	                        promises[index] = value;
	                        if (--pendingCount === 0) {
	                            deferred.resolve(promises);
	                        }
	                    },
	                    deferred.reject,
	                    function (progress) {
	                        deferred.notify({ index: index, value: progress });
	                    }
	                );
	            }
	        }, void 0);
	        if (pendingCount === 0) {
	            deferred.resolve(promises);
	        }
	        return deferred.promise;
	    });
	}
	
	Promise.prototype.all = function () {
	    return all(this);
	};
	
	/**
	 * Returns the first resolved promise of an array. Prior rejected promises are
	 * ignored.  Rejects only if all promises are rejected.
	 * @param {Array*} an array containing values or promises for values
	 * @returns a promise fulfilled with the value of the first resolved promise,
	 * or a rejected promise if all promises are rejected.
	 */
	Q.any = any;
	
	function any(promises) {
	    if (promises.length === 0) {
	        return Q.resolve();
	    }
	
	    var deferred = Q.defer();
	    var pendingCount = 0;
	    array_reduce(promises, function (prev, current, index) {
	        var promise = promises[index];
	
	        pendingCount++;
	
	        when(promise, onFulfilled, onRejected, onProgress);
	        function onFulfilled(result) {
	            deferred.resolve(result);
	        }
	        function onRejected() {
	            pendingCount--;
	            if (pendingCount === 0) {
	                deferred.reject(new Error(
	                    "Can't get fulfillment value from any promise, all " +
	                    "promises were rejected."
	                ));
	            }
	        }
	        function onProgress(progress) {
	            deferred.notify({
	                index: index,
	                value: progress
	            });
	        }
	    }, undefined);
	
	    return deferred.promise;
	}
	
	Promise.prototype.any = function () {
	    return any(this);
	};
	
	/**
	 * Waits for all promises to be settled, either fulfilled or
	 * rejected.  This is distinct from `all` since that would stop
	 * waiting at the first rejection.  The promise returned by
	 * `allResolved` will never be rejected.
	 * @param promises a promise for an array (or an array) of promises
	 * (or values)
	 * @return a promise for an array of promises
	 */
	Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
	function allResolved(promises) {
	    return when(promises, function (promises) {
	        promises = array_map(promises, Q);
	        return when(all(array_map(promises, function (promise) {
	            return when(promise, noop, noop);
	        })), function () {
	            return promises;
	        });
	    });
	}
	
	Promise.prototype.allResolved = function () {
	    return allResolved(this);
	};
	
	/**
	 * @see Promise#allSettled
	 */
	Q.allSettled = allSettled;
	function allSettled(promises) {
	    return Q(promises).allSettled();
	}
	
	/**
	 * Turns an array of promises into a promise for an array of their states (as
	 * returned by `inspect`) when they have all settled.
	 * @param {Array[Any*]} values an array (or promise for an array) of values (or
	 * promises for values)
	 * @returns {Array[State]} an array of states for the respective values.
	 */
	Promise.prototype.allSettled = function () {
	    return this.then(function (promises) {
	        return all(array_map(promises, function (promise) {
	            promise = Q(promise);
	            function regardless() {
	                return promise.inspect();
	            }
	            return promise.then(regardless, regardless);
	        }));
	    });
	};
	
	/**
	 * Captures the failure of a promise, giving an oportunity to recover
	 * with a callback.  If the given promise is fulfilled, the returned
	 * promise is fulfilled.
	 * @param {Any*} promise for something
	 * @param {Function} callback to fulfill the returned promise if the
	 * given promise is rejected
	 * @returns a promise for the return value of the callback
	 */
	Q.fail = // XXX legacy
	Q["catch"] = function (object, rejected) {
	    return Q(object).then(void 0, rejected);
	};
	
	Promise.prototype.fail = // XXX legacy
	Promise.prototype["catch"] = function (rejected) {
	    return this.then(void 0, rejected);
	};
	
	/**
	 * Attaches a listener that can respond to progress notifications from a
	 * promise's originating deferred. This listener receives the exact arguments
	 * passed to ``deferred.notify``.
	 * @param {Any*} promise for something
	 * @param {Function} callback to receive any progress notifications
	 * @returns the given promise, unchanged
	 */
	Q.progress = progress;
	function progress(object, progressed) {
	    return Q(object).then(void 0, void 0, progressed);
	}
	
	Promise.prototype.progress = function (progressed) {
	    return this.then(void 0, void 0, progressed);
	};
	
	/**
	 * Provides an opportunity to observe the settling of a promise,
	 * regardless of whether the promise is fulfilled or rejected.  Forwards
	 * the resolution to the returned promise when the callback is done.
	 * The callback can return a promise to defer completion.
	 * @param {Any*} promise
	 * @param {Function} callback to observe the resolution of the given
	 * promise, takes no arguments.
	 * @returns a promise for the resolution of the given promise when
	 * ``fin`` is done.
	 */
	Q.fin = // XXX legacy
	Q["finally"] = function (object, callback) {
	    return Q(object)["finally"](callback);
	};
	
	Promise.prototype.fin = // XXX legacy
	Promise.prototype["finally"] = function (callback) {
	    callback = Q(callback);
	    return this.then(function (value) {
	        return callback.fcall().then(function () {
	            return value;
	        });
	    }, function (reason) {
	        // TODO attempt to recycle the rejection with "this".
	        return callback.fcall().then(function () {
	            throw reason;
	        });
	    });
	};
	
	/**
	 * Terminates a chain of promises, forcing rejections to be
	 * thrown as exceptions.
	 * @param {Any*} promise at the end of a chain of promises
	 * @returns nothing
	 */
	Q.done = function (object, fulfilled, rejected, progress) {
	    return Q(object).done(fulfilled, rejected, progress);
	};
	
	Promise.prototype.done = function (fulfilled, rejected, progress) {
	    var onUnhandledError = function (error) {
	        // forward to a future turn so that ``when``
	        // does not catch it and turn it into a rejection.
	        Q.nextTick(function () {
	            makeStackTraceLong(error, promise);
	            if (Q.onerror) {
	                Q.onerror(error);
	            } else {
	                throw error;
	            }
	        });
	    };
	
	    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
	    var promise = fulfilled || rejected || progress ?
	        this.then(fulfilled, rejected, progress) :
	        this;
	
	    if (typeof process === "object" && process && process.domain) {
	        onUnhandledError = process.domain.bind(onUnhandledError);
	    }
	
	    promise.then(void 0, onUnhandledError);
	};
	
	/**
	 * Causes a promise to be rejected if it does not get fulfilled before
	 * some milliseconds time out.
	 * @param {Any*} promise
	 * @param {Number} milliseconds timeout
	 * @param {Any*} custom error message or Error object (optional)
	 * @returns a promise for the resolution of the given promise if it is
	 * fulfilled before the timeout, otherwise rejected.
	 */
	Q.timeout = function (object, ms, error) {
	    return Q(object).timeout(ms, error);
	};
	
	Promise.prototype.timeout = function (ms, error) {
	    var deferred = defer();
	    var timeoutId = setTimeout(function () {
	        if (!error || "string" === typeof error) {
	            error = new Error(error || "Timed out after " + ms + " ms");
	            error.code = "ETIMEDOUT";
	        }
	        deferred.reject(error);
	    }, ms);
	
	    this.then(function (value) {
	        clearTimeout(timeoutId);
	        deferred.resolve(value);
	    }, function (exception) {
	        clearTimeout(timeoutId);
	        deferred.reject(exception);
	    }, deferred.notify);
	
	    return deferred.promise;
	};
	
	/**
	 * Returns a promise for the given value (or promised value), some
	 * milliseconds after it resolved. Passes rejections immediately.
	 * @param {Any*} promise
	 * @param {Number} milliseconds
	 * @returns a promise for the resolution of the given promise after milliseconds
	 * time has elapsed since the resolution of the given promise.
	 * If the given promise rejects, that is passed immediately.
	 */
	Q.delay = function (object, timeout) {
	    if (timeout === void 0) {
	        timeout = object;
	        object = void 0;
	    }
	    return Q(object).delay(timeout);
	};
	
	Promise.prototype.delay = function (timeout) {
	    return this.then(function (value) {
	        var deferred = defer();
	        setTimeout(function () {
	            deferred.resolve(value);
	        }, timeout);
	        return deferred.promise;
	    });
	};
	
	/**
	 * Passes a continuation to a Node function, which is called with the given
	 * arguments provided as an array, and returns a promise.
	 *
	 *      Q.nfapply(FS.readFile, [__filename])
	 *      .then(function (content) {
	 *      })
	 *
	 */
	Q.nfapply = function (callback, args) {
	    return Q(callback).nfapply(args);
	};
	
	Promise.prototype.nfapply = function (args) {
	    var deferred = defer();
	    var nodeArgs = array_slice(args);
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.fapply(nodeArgs).fail(deferred.reject);
	    return deferred.promise;
	};
	
	/**
	 * Passes a continuation to a Node function, which is called with the given
	 * arguments provided individually, and returns a promise.
	 * @example
	 * Q.nfcall(FS.readFile, __filename)
	 * .then(function (content) {
	 * })
	 *
	 */
	Q.nfcall = function (callback /*...args*/) {
	    var args = array_slice(arguments, 1);
	    return Q(callback).nfapply(args);
	};
	
	Promise.prototype.nfcall = function (/*...args*/) {
	    var nodeArgs = array_slice(arguments);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.fapply(nodeArgs).fail(deferred.reject);
	    return deferred.promise;
	};
	
	/**
	 * Wraps a NodeJS continuation passing function and returns an equivalent
	 * version that returns a promise.
	 * @example
	 * Q.nfbind(FS.readFile, __filename)("utf-8")
	 * .then(console.log)
	 * .done()
	 */
	Q.nfbind =
	Q.denodeify = function (callback /*...args*/) {
	    var baseArgs = array_slice(arguments, 1);
	    return function () {
	        var nodeArgs = baseArgs.concat(array_slice(arguments));
	        var deferred = defer();
	        nodeArgs.push(deferred.makeNodeResolver());
	        Q(callback).fapply(nodeArgs).fail(deferred.reject);
	        return deferred.promise;
	    };
	};
	
	Promise.prototype.nfbind =
	Promise.prototype.denodeify = function (/*...args*/) {
	    var args = array_slice(arguments);
	    args.unshift(this);
	    return Q.denodeify.apply(void 0, args);
	};
	
	Q.nbind = function (callback, thisp /*...args*/) {
	    var baseArgs = array_slice(arguments, 2);
	    return function () {
	        var nodeArgs = baseArgs.concat(array_slice(arguments));
	        var deferred = defer();
	        nodeArgs.push(deferred.makeNodeResolver());
	        function bound() {
	            return callback.apply(thisp, arguments);
	        }
	        Q(bound).fapply(nodeArgs).fail(deferred.reject);
	        return deferred.promise;
	    };
	};
	
	Promise.prototype.nbind = function (/*thisp, ...args*/) {
	    var args = array_slice(arguments, 0);
	    args.unshift(this);
	    return Q.nbind.apply(void 0, args);
	};
	
	/**
	 * Calls a method of a Node-style object that accepts a Node-style
	 * callback with a given array of arguments, plus a provided callback.
	 * @param object an object that has the named method
	 * @param {String} name name of the method of object
	 * @param {Array} args arguments to pass to the method; the callback
	 * will be provided by Q and appended to these arguments.
	 * @returns a promise for the value or error
	 */
	Q.nmapply = // XXX As proposed by "Redsandro"
	Q.npost = function (object, name, args) {
	    return Q(object).npost(name, args);
	};
	
	Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
	Promise.prototype.npost = function (name, args) {
	    var nodeArgs = array_slice(args || []);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
	    return deferred.promise;
	};
	
	/**
	 * Calls a method of a Node-style object that accepts a Node-style
	 * callback, forwarding the given variadic arguments, plus a provided
	 * callback argument.
	 * @param object an object that has the named method
	 * @param {String} name name of the method of object
	 * @param ...args arguments to pass to the method; the callback will
	 * be provided by Q and appended to these arguments.
	 * @returns a promise for the value or error
	 */
	Q.nsend = // XXX Based on Mark Miller's proposed "send"
	Q.nmcall = // XXX Based on "Redsandro's" proposal
	Q.ninvoke = function (object, name /*...args*/) {
	    var nodeArgs = array_slice(arguments, 2);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
	    return deferred.promise;
	};
	
	Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
	Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
	Promise.prototype.ninvoke = function (name /*...args*/) {
	    var nodeArgs = array_slice(arguments, 1);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
	    return deferred.promise;
	};
	
	/**
	 * If a function would like to support both Node continuation-passing-style and
	 * promise-returning-style, it can end its internal promise chain with
	 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
	 * elects to use a nodeback, the result will be sent there.  If they do not
	 * pass a nodeback, they will receive the result promise.
	 * @param object a result (or a promise for a result)
	 * @param {Function} nodeback a Node.js-style callback
	 * @returns either the promise or nothing
	 */
	Q.nodeify = nodeify;
	function nodeify(object, nodeback) {
	    return Q(object).nodeify(nodeback);
	}
	
	Promise.prototype.nodeify = function (nodeback) {
	    if (nodeback) {
	        this.then(function (value) {
	            Q.nextTick(function () {
	                nodeback(null, value);
	            });
	        }, function (error) {
	            Q.nextTick(function () {
	                nodeback(error);
	            });
	        });
	    } else {
	        return this;
	    }
	};
	
	Q.noConflict = function() {
	    throw new Error("Q.noConflict only works when Q is used as a global");
	};
	
	// All code before this point will be filtered from stack traces.
	var qEndingLine = captureLine();
	
	return Q;
	
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(7).setImmediate))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
	            (typeof self !== "undefined" && self) ||
	            window;
	var apply = Function.prototype.apply;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(scope, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// setimmediate attaches itself to the global object
	__webpack_require__(8);
	// On some exotic environments, it's not clear which object `setimmediate` was
	// able to install onto.  Search each possibility in the same order as the
	// `setimmediate` library.
	exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
	                       (typeof global !== "undefined" && global.setImmediate) ||
	                       (this && this.setImmediate);
	exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
	                         (typeof global !== "undefined" && global.clearImmediate) ||
	                         (this && this.clearImmediate);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";
	
	    if (global.setImmediate) {
	        return;
	    }
	
	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;
	
	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }
	
	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }
	
	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }
	
	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }
	
	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }
	
	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }
	
	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
	
	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };
	
	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }
	
	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }
	
	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };
	
	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }
	
	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }
	
	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }
	
	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
	
	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();
	
	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();
	
	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();
	
	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();
	
	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }
	
	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1)))

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTY2MDU5ZjQ5YmU5NTk4ZjQ3MzEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9qcy9iZWZvcmVQeXJldC5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3VybC5qcy91cmwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2pzL21vZGFsLXByb21wdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3EvcS5qcyIsIndlYnBhY2s6Ly8vLi9+L25vZGUtbGlicy1icm93c2VyL34vdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiXSwibmFtZXMiOlsic2hhcmVBUEkiLCJtYWtlU2hhcmVBUEkiLCJ1cmwiLCJyZXF1aXJlIiwibW9kYWxQcm9tcHQiLCJ3aW5kb3ciLCJMT0ciLCJjdF9sb2ciLCJjb25zb2xlIiwibG9nIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJjdF9lcnJvciIsImVycm9yIiwiaW5pdGlhbFBhcmFtcyIsInBhcnNlIiwiZG9jdW1lbnQiLCJsb2NhdGlvbiIsImhyZWYiLCJwYXJhbXMiLCJoaWdobGlnaHRNb2RlIiwiY2xlYXJGbGFzaCIsIiQiLCJlbXB0eSIsInN0aWNrRXJyb3IiLCJtZXNzYWdlIiwibW9yZSIsIkNQTyIsInNheUFuZEZvcmdldCIsImVyciIsImFkZENsYXNzIiwidGV4dCIsImF0dHIiLCJ0b29sdGlwIiwicHJlcGVuZCIsImZsYXNoRXJyb3IiLCJmYWRlT3V0IiwiZmxhc2hNZXNzYWdlIiwibXNnIiwic3RpY2tNZXNzYWdlIiwibWtXYXJuaW5nVXBwZXIiLCJta1dhcm5pbmdMb3dlciIsImJpbmQiLCJEb2N1bWVudHMiLCJkb2N1bWVudHMiLCJNYXAiLCJwcm90b3R5cGUiLCJoYXMiLCJuYW1lIiwiZ2V0Iiwic2V0IiwiZG9jIiwibG9nZ2VyIiwiaXNEZXRhaWxlZCIsInZhbHVlIiwiZ2V0VmFsdWUiLCJkZWxldGUiLCJmb3JFYWNoIiwiZiIsIlZFUlNJT05fQ0hFQ0tfSU5URVJWQUwiLCJNYXRoIiwicmFuZG9tIiwiY2hlY2tWZXJzaW9uIiwidGhlbiIsInJlc3AiLCJKU09OIiwidmVyc2lvbiIsInNldEludGVydmFsIiwic2F2ZSIsImF1dG9TYXZlIiwibWVyZ2UiLCJvYmoiLCJleHRlbnNpb24iLCJuZXdvYmoiLCJPYmplY3QiLCJrZXlzIiwiayIsImFuaW1hdGlvbkRpdiIsImNsb3NlQW5pbWF0aW9uSWZPcGVuIiwiZGlhbG9nIiwibWFrZUVkaXRvciIsImNvbnRhaW5lciIsIm9wdGlvbnMiLCJpbml0aWFsIiwiaGFzT3duUHJvcGVydHkiLCJ0ZXh0YXJlYSIsImpRdWVyeSIsInZhbCIsImFwcGVuZCIsInJ1bkZ1biIsImNvZGUiLCJyZXBsT3B0aW9ucyIsInJ1biIsImNtIiwiQ00iLCJ1c2VMaW5lTnVtYmVycyIsInNpbXBsZUVkaXRvciIsInVzZUZvbGRpbmciLCJndXR0ZXJzIiwicmVpbmRlbnRBbGxMaW5lcyIsImxhc3QiLCJsaW5lQ291bnQiLCJvcGVyYXRpb24iLCJpIiwiaW5kZW50TGluZSIsIkNPREVfTElORV9XSURUSCIsInJ1bGVycyIsInJ1bGVyc01pbkNvbCIsImNvbG9yIiwiY29sdW1uIiwibGluZVN0eWxlIiwiY2xhc3NOYW1lIiwiY21PcHRpb25zIiwiZXh0cmFLZXlzIiwiQ29kZU1pcnJvciIsIm5vcm1hbGl6ZUtleU1hcCIsImluZGVudFVuaXQiLCJ0YWJTaXplIiwidmlld3BvcnRNYXJnaW4iLCJJbmZpbml0eSIsImxpbmVOdW1iZXJzIiwibWF0Y2hLZXl3b3JkcyIsIm1hdGNoQnJhY2tldHMiLCJzdHlsZVNlbGVjdGVkVGV4dCIsImZvbGRHdXR0ZXIiLCJsaW5lV3JhcHBpbmciLCJsb2dnaW5nIiwiZnJvbVRleHRBcmVhIiwiZGlzcGxheSIsIndyYXBwZXIiLCJhcHBlbmRDaGlsZCIsImdldFRvcFRpZXJNZW51aXRlbXMiLCJyZWZyZXNoIiwiZm9jdXMiLCJmb2N1c0Nhcm91c2VsIiwiUlVOX0NPREUiLCJzZXRVc2VybmFtZSIsInRhcmdldCIsImd3cmFwIiwibG9hZCIsImFwaSIsInBlb3BsZSIsInVzZXJJZCIsInVzZXIiLCJkaXNwbGF5TmFtZSIsImVtYWlscyIsInN0b3JhZ2VBUEkiLCJjb2xsZWN0aW9uIiwic2hvdyIsImhpZGUiLCJmYWlsIiwiY2xpY2siLCJjcmVhdGVQcm9ncmFtQ29sbGVjdGlvbkFQSSIsImFjdGl2ZUVsZW1lbnQiLCJibHVyIiwidG9Mb2FkIiwiZ2V0RmlsZUJ5SWQiLCJsb2FkUHJvZ3JhbSIsInByb2dyYW1Ub1NhdmUiLCJRIiwiZmNhbGwiLCJpbml0aWFsUHJvZ3JhbSIsInByb2dyYW1Mb2FkIiwiZW5hYmxlRmlsZU9wdGlvbnMiLCJwIiwic2hvd1NoYXJlQ29udGFpbmVyIiwiaWQiLCJnZXRTaGFyZWRGaWxlQnlJZCIsImZpbGUiLCJnZXRPcmlnaW5hbCIsInJlc3BvbnNlIiwib3JpZ2luYWwiLCJvZmYiLCJyZXN1bHQiLCJyZW1vdmVDbGFzcyIsIm9wZW4iLCJBUFBfQkFTRV9VUkwiLCJzZXRUaXRsZSIsInByb2dOYW1lIiwidGl0bGUiLCJmaWxlbmFtZSIsImRvd25sb2FkRWx0IiwiY29udGVudHMiLCJlZGl0b3IiLCJkb3dubG9hZEJsb2IiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwidHlwZSIsImluZGV4T2YiLCJsZW5ndGgiLCJkb3dubG9hZCIsIlRSVU5DQVRFX0xFTkdUSCIsInRydW5jYXRlTmFtZSIsInNsaWNlIiwidXBkYXRlTmFtZSIsImdldE5hbWUiLCJwcm9nIiwic2hhcmVkIiwiZ2V0Q29udGVudHMiLCJzYXkiLCJmb3JnZXQiLCJhbm5vdW5jZW1lbnRzIiwiZ2V0RWxlbWVudEJ5SWQiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJjcmVhdGVUZXh0Tm9kZSIsImluc2VydEJlZm9yZSIsImZpcnN0Q2hpbGQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2hpbGQiLCJjeWNsZUFkdmFuY2UiLCJjdXJySW5kZXgiLCJtYXhJbmRleCIsInJldmVyc2VQIiwibmV4dEluZGV4IiwicG9wdWxhdGVGb2N1c0Nhcm91c2VsIiwiZmMiLCJkb2NtYWluIiwidG9vbGJhciIsImRvY3JlcGxNYWluIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImRvY3JlcGxNYWluMCIsInVuZGVmaW5lZCIsImlubmVyVGV4dCIsImRvY3JlcGwiLCJkb2NyZXBsY29kZSIsImN5Y2xlRm9jdXMiLCJmQ2Fyb3VzZWwiLCJjdXJyZW50Rm9jdXNlZEVsdCIsImZpbmQiLCJub2RlIiwiY29udGFpbnMiLCJjdXJyZW50Rm9jdXNJbmRleCIsIm5leHRGb2N1c0luZGV4IiwiZm9jdXNFbHQiLCJmb2N1c0VsdDAiLCJjbGFzc0xpc3QiLCJ0ZXh0YXJlYXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInJlbW92ZUF0dHJpYnV0ZSIsInByb2dyYW1Mb2FkZWQiLCJtYWtlU2hhcmVMaW5rIiwibmFtZU9yVW50aXRsZWQiLCJtZW51SXRlbURpc2FibGVkIiwiaGFzQ2xhc3MiLCJuZXdFdmVudCIsImUiLCJzYXZlRXZlbnQiLCJuZXdGaWxlbmFtZSIsInVzZU5hbWUiLCJjcmVhdGUiLCJzYXZlZFByb2dyYW0iLCJjcmVhdGVGaWxlIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImdldFVuaXF1ZUlkIiwic2F2ZUFzIiwic2F2ZUFzUHJvbXB0Iiwic3R5bGUiLCJkZWZhdWx0VmFsdWUiLCJuZXdOYW1lIiwicmVuYW1lIiwicmVuYW1lUHJvbXB0IiwiZm9jdXNhYmxlRWx0cyIsInRoZVRvb2xiYXIiLCJ0b3BUaWVyTWVudWl0ZW1zIiwidG9BcnJheSIsImZpbHRlciIsImVsdCIsImdldEF0dHJpYnV0ZSIsIm51bVRvcFRpZXJNZW51aXRlbXMiLCJpdGhUb3BUaWVyTWVudWl0ZW0iLCJpQ2hpbGQiLCJjaGlsZHJlbiIsImZpcnN0IiwidG9TdHJpbmciLCJ1cGRhdGVFZGl0b3JIZWlnaHQiLCJ0b29sYmFySGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwicGFkZGluZ1RvcCIsImRvY01haW4iLCJkb2NSZXBsTWFpbiIsIm9uIiwiaW5zZXJ0QXJpYVBvcyIsInN1Ym1lbnUiLCJhcnIiLCJsZW4iLCJzZXRBdHRyaWJ1dGUiLCJhZGRFdmVudExpc3RlbmVyIiwiaGlkZUFsbFRvcE1lbnVpdGVtcyIsInN0b3BQcm9wYWdhdGlvbiIsImtleWRvd24iLCJrYyIsImtleUNvZGUiLCJjbGlja1RvcE1lbnVpdGVtIiwidGhpc0VsdCIsInRvcFRpZXJVbCIsImNsb3Nlc3QiLCJoYXNBdHRyaWJ1dGUiLCJ0aGlzVG9wTWVudWl0ZW0iLCJ0MSIsInN1Ym1lbnVPcGVuIiwiZXhwYW5kYWJsZUVsdHMiLCJub25leHBhbmRhYmxlRWx0cyIsInN3aXRjaFRvcE1lbnVpdGVtIiwiZGVzdFRvcE1lbnVpdGVtIiwiZGVzdEVsdCIsImVsdElkIiwic2hvd2luZ0hlbHBLZXlzIiwic2hvd0hlbHBLZXlzIiwiZmFkZUluIiwicmVjaXRlSGVscCIsIndpdGhpblNlY29uZFRpZXJVbCIsInNlY29uZFRpZXJVbCIsInBvc3NFbHRzIiwic3JjVG9wTWVudWl0ZW0iLCJ0dG1pTiIsImoiLCJuZWFyU2licyIsIm15SWQiLCJ0aGlzRW5jb3VudGVyZWQiLCJhZGQiLCJmYXJTaWJzIiwicHJldkFsbCIsInN1Ym1lbnVEaXZzIiwibmV4dEFsbCIsInByZXZlbnREZWZhdWx0Iiwic2hpZnRLZXkiLCJjdHJsS2V5IiwiY29kZUNvbnRhaW5lciIsInJ1bkJ1dHRvbiIsImluaXRpYWxHYXMiLCJzZXRPcHRpb24iLCJyZW1vdmVTaG9ydGVuZWRMaW5lIiwibGluZUhhbmRsZSIsImdldE9wdGlvbiIsImxvbmdMaW5lcyIsInJ1bGVyTGlzdGVuZXJzIiwiZXZ0IiwicmVmcmVzaFJ1bGVycyIsImRlbGV0ZUxpbmUiLCJtaW5MZW5ndGgiLCJzaXplIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwibGluZU5vIiwiaW5zdGFuY2UiLCJjaGFuZ2VPYmpzIiwibWluTGluZSIsImxhc3RMaW5lIiwibWF4TGluZSIsImNoYW5nZSIsImZyb20iLCJsaW5lIiwiY2hhbmdlZCIsImVhY2hMaW5lIiwiYyIsImdldERvYyIsImNsZWFySGlzdG9yeSIsInNldFZhbHVlIiwicHlyZXRMb2FkIiwic3JjIiwiYm9keSIsInB5cmV0TG9hZDIiLCJsb2dGYWlsdXJlQW5kTWFudWFsRmV0Y2giLCJldmVudCIsInRpbWVTdGFtcCIsIm1hbnVhbEZldGNoIiwiYWpheCIsInJlcyIsImNvbnRlbnRzUHJlZml4Iiwic3RhdHVzIiwic3RhdHVzVGV4dCIsInJlc3BvbnNlVGV4dCIsInBhdGgiLCJwcm9jZXNzIiwiZW52IiwiZmluIiwiYXV0b0hpZ2hsaWdodEJveCIsInRleHRCb3giLCJzZWxlY3QiLCJwcm9tcHRRdWV1ZSIsInN0eWxlcyIsIm1vZGFscyIsIlByb21wdCIsInB1c2giLCJFcnJvciIsIm1vZGFsIiwiZWx0cyIsInBhcnNlSFRNTCIsImNsb3NlQnV0dG9uIiwic3VibWl0QnV0dG9uIiwic3VibWl0VGV4dCIsImlzQ29tcGlsZWQiLCJkZWZlcnJlZCIsImRlZmVyIiwicHJvbWlzZSIsImNhbGxiYWNrIiwiaGlkZVN1Ym1pdCIsIm9uQ2xvc2UiLCJvblN1Ym1pdCIsImRvY0NsaWNrIiwiaXMiLCJkb2NLZXlkb3duIiwia2V5IiwicG9wdWxhdGVNb2RhbCIsImNzcyIsImNsZWFyTW9kYWwiLCJjcmVhdGVSYWRpb0VsdCIsIm9wdGlvbiIsImlkeCIsImxhYmVsIiwiZWx0Q29udGFpbmVyIiwibGFiZWxDb250YWluZXIiLCJleGFtcGxlIiwibW9kZSIsInJlYWRPbmx5IiwiZXhhbXBsZUNvbnRhaW5lciIsImNyZWF0ZVRpbGVFbHQiLCJkZXRhaWxzIiwiY3JlYXRlVGV4dEVsdCIsImNyZWF0ZUNvcHlUZXh0RWx0IiwiYm94IiwiY3JlYXRlQ29uZmlybUVsdCIsInRoYXQi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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixZQUFXLE9BQU87QUFDbEI7QUFDQSxhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixhQUFZLFdBQVcsRUFBRTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixZQUFXLE9BQU87QUFDbEIs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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUs7QUFDTDtBQUNBOztBQUVBLEVBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxlQUFjLGdCQUFnQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBNkIsS0FBSztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQSwrQ0FBOEMsU0FBUztBQUN2RDtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQjtBQUNwQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7QUFDVCxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLFNBQVM7QUFDcEIsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQWtDLGNBQWMsRUFBRTtBQUNsRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBa0MsY0FBYyxFQUFFO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0wsaUJBQWdCO0FBQ2hCLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsaUJBQWdCO0FBQ2hCLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLFlBQVcsU0FBUztBQUNwQixjQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsMENBQXlDLGdDQUFnQztBQUN6RTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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WUFBVyxPQUFPO0FBQ2xCLFlBQVcsTUFBTSxzQ0FBc0M7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLG1EQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7QUFDVDtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEVBQUM7Ozs7Ozs7O0FDLy9ERDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDOURBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsbUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJDQUEwQyxzQkFBc0IsRUFBRTtBQUNsRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7O0FBRUEsTUFBSztBQUNMO0FBQ0E7O0FBRUEsTUFBSztBQUNMO0FBQ0E7O0FBRUEsTUFBSztBQUNMO0FBQ0E7O0FBRUEsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBQyIsImZpbGUiOiJqcy9iZWZvcmVQeXJldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0dGhpc1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSBcclxuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XHJcbiBcdFx0aWYocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuIFx0XHRzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XHJcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XHJcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcclxuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QoY2FsbGJhY2spIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdGlmKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xyXG4gXHRcdHRyeSB7XHJcbiBcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gXHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XHJcbiBcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xyXG4gXHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gMTAwMDA7XHJcbiBcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XHJcbiBcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdHJldHVybiBjYWxsYmFjayhlcnIpO1xyXG4gXHRcdH1cclxuIFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0aWYocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XHJcbiBcdFx0XHRpZihyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xyXG4gXHRcdFx0XHQvLyB0aW1lb3V0XHJcbiBcdFx0XHRcdGNhbGxiYWNrKG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIikpO1xyXG4gXHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcclxuIFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxyXG4gXHRcdFx0XHRjYWxsYmFjaygpO1xyXG4gXHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xyXG4gXHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXHJcbiBcdFx0XHRcdGNhbGxiYWNrKG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xyXG4gXHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0Ly8gc3VjY2Vzc1xyXG4gXHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcclxuIFx0XHRcdFx0fSBjYXRjaChlKSB7XHJcbiBcdFx0XHRcdFx0Y2FsbGJhY2soZSk7XHJcbiBcdFx0XHRcdFx0cmV0dXJuO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGNhbGxiYWNrKG51bGwsIHVwZGF0ZSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fTtcclxuIFx0fVxyXG5cbiBcdFxyXG4gXHRcclxuIFx0Ly8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2Jsb2IvYmVmNDViMC9zcmMvc2hhcmVkL3V0aWxzL2NhbkRlZmluZVByb3BlcnR5LmpzXHJcbiBcdHZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xyXG4gXHR0cnkge1xyXG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgXCJ4XCIsIHtcclxuIFx0XHRcdGdldDogZnVuY3Rpb24oKSB7fVxyXG4gXHRcdH0pO1xyXG4gXHRcdGNhbkRlZmluZVByb3BlcnR5ID0gdHJ1ZTtcclxuIFx0fSBjYXRjaCh4KSB7XHJcbiBcdFx0Ly8gSUUgd2lsbCBmYWlsIG9uIGRlZmluZVByb3BlcnR5XHJcbiBcdH1cclxuIFx0XHJcbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcclxuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJhNjYwNTlmNDliZTk1OThmNDczMVwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xyXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0aWYoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcclxuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XHJcbiBcdFx0XHRpZihtZS5ob3QuYWN0aXZlKSB7XHJcbiBcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcclxuIFx0XHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPCAwKVxyXG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRcdGlmKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPCAwKVxyXG4gXHRcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcclxuIFx0XHRcdFx0fSBlbHNlIGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcclxuIFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlcXVlc3QgKyBcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgKyBtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcclxuIFx0XHR9O1xyXG4gXHRcdGZvcih2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkpIHtcclxuIFx0XHRcdFx0aWYoY2FuRGVmaW5lUHJvcGVydHkpIHtcclxuIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIChmdW5jdGlvbihuYW1lKSB7XHJcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XHJcbiBcdFx0XHRcdFx0XHRcdH0sXHJcbiBcdFx0XHRcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuIFx0XHRcdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XHJcbiBcdFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdFx0fShuYW1lKSkpO1xyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGZuW25hbWVdID0gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gZW5zdXJlKGNodW5rSWQsIGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicmVhZHlcIilcclxuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcclxuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcclxuIFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkLCBmdW5jdGlvbigpIHtcclxuIFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKG51bGwsIGZuKTtcclxuIFx0XHRcdFx0fSBmaW5hbGx5IHtcclxuIFx0XHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcclxuIFx0XHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xyXG4gXHRcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcclxuIFx0XHRcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdFx0aWYoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcclxuIFx0XHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fSk7XHJcbiBcdFx0fVxyXG4gXHRcdGlmKGNhbkRlZmluZVByb3BlcnR5KSB7XHJcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIFwiZVwiLCB7XHJcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcbiBcdFx0XHRcdHZhbHVlOiBlbnN1cmVcclxuIFx0XHRcdH0pO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRmbi5lID0gZW5zdXJlO1xyXG4gXHRcdH1cclxuIFx0XHRyZXR1cm4gZm47XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIGhvdCA9IHtcclxuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcclxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXHJcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxyXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXHJcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcclxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxyXG4gXHRcclxuIFx0XHRcdC8vIE1vZHVsZSBBUElcclxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcclxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcclxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2s7XHJcbiBcdFx0XHRcdGVsc2VcclxuIFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjaztcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJudW1iZXJcIilcclxuIFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlXHJcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdH0sXHJcbiBcdFxyXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcclxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcclxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcclxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHRpZighbCkgcmV0dXJuIGhvdFN0YXR1cztcclxuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHJcbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcclxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxyXG4gXHRcdH07XHJcbiBcdFx0cmV0dXJuIGhvdDtcclxuIFx0fVxyXG4gXHRcclxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XHJcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcclxuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XHJcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xyXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcclxuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xyXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90QXZhaWxpYmxlRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdENhbGxiYWNrO1xyXG4gXHRcclxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXHJcbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XHJcbiBcdFx0dmFyIGlzTnVtYmVyID0gKCtpZCkgKyBcIlwiID09PSBpZDtcclxuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHksIGNhbGxiYWNrKSB7XHJcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcImlkbGVcIikgdGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XHJcbiBcdFx0aWYodHlwZW9mIGFwcGx5ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuIFx0XHRcdGhvdEFwcGx5T25VcGRhdGUgPSBmYWxzZTtcclxuIFx0XHRcdGNhbGxiYWNrID0gYXBwbHk7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcclxuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xyXG4gXHRcdFx0fTtcclxuIFx0XHR9XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XHJcbiBcdFx0aG90RG93bmxvYWRNYW5pZmVzdChmdW5jdGlvbihlcnIsIHVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcclxuIFx0XHRcdGlmKCF1cGRhdGUpIHtcclxuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcclxuIFx0XHRcdFx0Y2FsbGJhY2sobnVsbCwgbnVsbCk7XHJcbiBcdFx0XHRcdHJldHVybjtcclxuIFx0XHRcdH1cclxuIFx0XHJcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xyXG4gXHRcdFx0aG90QXZhaWxpYmxlRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IHVwZGF0ZS5jLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0XHRob3RBdmFpbGlibGVGaWxlc01hcFt1cGRhdGUuY1tpXV0gPSB0cnVlO1xyXG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xyXG4gXHRcclxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XHJcbiBcdFx0XHRob3RDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gXHRcdFx0aG90VXBkYXRlID0ge307XHJcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IDA7XHJcbiBcdFx0XHR7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcclxuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cclxuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9KTtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdGlmKCFob3RBdmFpbGlibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXHJcbiBcdFx0XHRyZXR1cm47XHJcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHRpZigtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XHJcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XHJcbiBcdFx0aWYoIWhvdEF2YWlsaWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcclxuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xyXG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xyXG4gXHRcdHZhciBjYWxsYmFjayA9IGhvdENhbGxiYWNrO1xyXG4gXHRcdGhvdENhbGxiYWNrID0gbnVsbDtcclxuIFx0XHRpZighY2FsbGJhY2spIHJldHVybjtcclxuIFx0XHRpZihob3RBcHBseU9uVXBkYXRlKSB7XHJcbiBcdFx0XHRob3RBcHBseShob3RBcHBseU9uVXBkYXRlLCBjYWxsYmFjayk7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xyXG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdFx0Y2FsbGJhY2sobnVsbCwgb3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMsIGNhbGxiYWNrKSB7XHJcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpIHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcclxuIFx0XHRpZih0eXBlb2Ygb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiBcdFx0XHRjYWxsYmFjayA9IG9wdGlvbnM7XHJcbiBcdFx0XHRvcHRpb25zID0ge307XHJcbiBcdFx0fSBlbHNlIGlmKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMgPT09IFwib2JqZWN0XCIpIHtcclxuIFx0XHRcdGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGlmKGVycikgdGhyb3cgZXJyO1xyXG4gXHRcdFx0fTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0b3B0aW9ucyA9IHt9O1xyXG4gXHRcdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlcnIpIHtcclxuIFx0XHRcdFx0aWYoZXJyKSB0aHJvdyBlcnI7XHJcbiBcdFx0XHR9O1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGUpIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbbW9kdWxlXTtcclxuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xyXG4gXHRcclxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xyXG4gXHRcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRpZighbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZClcclxuIFx0XHRcdFx0XHRjb250aW51ZTtcclxuIFx0XHRcdFx0aWYobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICsgbW9kdWxlSWQpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKG1vZHVsZUlkID09PSAwKSB7XHJcbiBcdFx0XHRcdFx0cmV0dXJuO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcclxuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcclxuIFx0XHRcdFx0XHRcdHJldHVybiBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgKyBtb2R1bGVJZCArIFwiIGluIFwiICsgcGFyZW50SWQpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRpZihvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgPj0gMCkgY29udGludWU7XHJcbiBcdFx0XHRcdFx0aWYocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxyXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcclxuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XHJcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcclxuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XHJcbiBcdFx0XHRcdFx0cXVldWUucHVzaChwYXJlbnRJZCk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHJcbiBcdFx0XHRyZXR1cm4gW291dGRhdGVkTW9kdWxlcywgb3V0ZGF0ZWREZXBlbmRlbmNpZXNdO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xyXG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xyXG4gXHRcdFx0XHRpZihhLmluZGV4T2YoaXRlbSkgPCAwKVxyXG4gXHRcdFx0XHRcdGEucHVzaChpdGVtKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXHJcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxyXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xyXG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xyXG4gXHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XHJcbiBcdFx0XHRcdHZhciByZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0aWYoIXJlc3VsdCkge1xyXG4gXHRcdFx0XHRcdGlmKG9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcclxuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xyXG4gXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiKSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYocmVzdWx0IGluc3RhbmNlb2YgRXJyb3IpIHtcclxuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcclxuIFx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2socmVzdWx0KTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0WzBdKTtcclxuIFx0XHRcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiByZXN1bHRbMV0pIHtcclxuIFx0XHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0WzFdLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXHJcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xyXG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLCByZXN1bHRbMV1bbW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cclxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0dmFyIG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xyXG4gXHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiYgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcclxuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcclxuIFx0XHRcdFx0fSk7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xyXG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xyXG4gXHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xyXG4gXHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0aWYoIW1vZHVsZSkgY29udGludWU7XHJcbiBcdFxyXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcclxuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XHJcbiBcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdHZhciBjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcclxuIFx0XHRcdFx0Y2IoZGF0YSk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xyXG4gXHRcclxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXHJcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xyXG4gXHRcclxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxyXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcclxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXHJcbiBcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcclxuIFx0XHRcdFx0aWYoIWNoaWxkKSBjb250aW51ZTtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSB7XHJcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcclxuIFx0XHRcdFx0XHR2YXIgaWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XHJcbiBcdFx0XHRcdFx0aWYoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xyXG4gXHRcclxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxyXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcclxuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xyXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XHJcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XHJcbiBcdFx0XHRcdFx0dmFyIGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XHJcbiBcdFx0XHRcdFx0aWYoY2FsbGJhY2tzLmluZGV4T2YoY2IpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0dmFyIGNiID0gY2FsbGJhY2tzW2ldO1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRjYihvdXRkYXRlZERlcGVuZGVuY2llcyk7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xyXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xyXG4gXHRcdFx0dmFyIG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XHJcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcclxuIFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiBcdFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9IGVsc2UgaWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcclxuIFx0XHRpZihlcnJvcikge1xyXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcclxuIFx0XHRcdHJldHVybiBjYWxsYmFjayhlcnJvcik7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4gXHRcdGNhbGxiYWNrKG51bGwsIG91dGRhdGVkTW9kdWxlcyk7XHJcbiBcdH1cclxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2UsXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IGhvdEN1cnJlbnRQYXJlbnRzLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJodHRwOi8vbG9jYWxob3N0OjUwMDEvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMCkoMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTY2MDU5ZjQ5YmU5NTk4ZjQ3MzEiLCIvKiBnbG9iYWwgJCBqUXVlcnkgQ1BPIENvZGVNaXJyb3Igc3RvcmFnZUFQSSBRIGNyZWF0ZVByb2dyYW1Db2xsZWN0aW9uQVBJIG1ha2VTaGFyZUFQSSAqL1xuXG52YXIgc2hhcmVBUEkgPSBtYWtlU2hhcmVBUEkocHJvY2Vzcy5lbnYuQ1VSUkVOVF9QWVJFVF9SRUxFQVNFKTtcblxudmFyIHVybCA9IHJlcXVpcmUoJ3VybC5qcycpO1xudmFyIG1vZGFsUHJvbXB0ID0gcmVxdWlyZSgnLi9tb2RhbC1wcm9tcHQuanMnKTtcbndpbmRvdy5tb2RhbFByb21wdCA9IG1vZGFsUHJvbXB0O1xuXG5jb25zdCBMT0cgPSB0cnVlO1xud2luZG93LmN0X2xvZyA9IGZ1bmN0aW9uKC8qIHZhcmFyZ3MgKi8pIHtcbiAgaWYgKHdpbmRvdy5jb25zb2xlICYmIExPRykge1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gIH1cbn07XG5cbndpbmRvdy5jdF9lcnJvciA9IGZ1bmN0aW9uKC8qIHZhcmFyZ3MgKi8pIHtcbiAgaWYgKHdpbmRvdy5jb25zb2xlICYmIExPRykge1xuICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgfVxufTtcbnZhciBpbml0aWFsUGFyYW1zID0gdXJsLnBhcnNlKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYpO1xudmFyIHBhcmFtcyA9IHVybC5wYXJzZShcIi8/XCIgKyBpbml0aWFsUGFyYW1zW1wiaGFzaFwiXSk7XG53aW5kb3cuaGlnaGxpZ2h0TW9kZSA9IFwibWNtaFwiOyAvLyB3aGF0IGlzIHRoaXMgZm9yP1xud2luZG93LmNsZWFyRmxhc2ggPSBmdW5jdGlvbigpIHtcbiAgJChcIi5ub3RpZmljYXRpb25BcmVhXCIpLmVtcHR5KCk7XG59XG53aW5kb3cuc3RpY2tFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG1vcmUpIHtcbiAgQ1BPLnNheUFuZEZvcmdldChtZXNzYWdlKTtcbiAgY2xlYXJGbGFzaCgpO1xuICB2YXIgZXJyID0gJChcIjxkaXY+XCIpLmFkZENsYXNzKFwiZXJyb3JcIikudGV4dChtZXNzYWdlKTtcbiAgaWYobW9yZSkge1xuICAgIGVyci5hdHRyKFwidGl0bGVcIiwgbW9yZSk7XG4gIH1cbiAgZXJyLnRvb2x0aXAoKTtcbiAgJChcIi5ub3RpZmljYXRpb25BcmVhXCIpLnByZXBlbmQoZXJyKTtcbn07XG53aW5kb3cuZmxhc2hFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgQ1BPLnNheUFuZEZvcmdldChtZXNzYWdlKTtcbiAgY2xlYXJGbGFzaCgpO1xuICB2YXIgZXJyID0gJChcIjxkaXY+XCIpLmFkZENsYXNzKFwiZXJyb3JcIikudGV4dChtZXNzYWdlKTtcbiAgJChcIi5ub3RpZmljYXRpb25BcmVhXCIpLnByZXBlbmQoZXJyKTtcbiAgZXJyLmZhZGVPdXQoNzAwMCk7XG59O1xud2luZG93LmZsYXNoTWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgQ1BPLnNheUFuZEZvcmdldChtZXNzYWdlKTtcbiAgY2xlYXJGbGFzaCgpO1xuICB2YXIgbXNnID0gJChcIjxkaXY+XCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpLnRleHQobWVzc2FnZSk7XG4gICQoXCIubm90aWZpY2F0aW9uQXJlYVwiKS5wcmVwZW5kKG1zZyk7XG4gIG1zZy5mYWRlT3V0KDcwMDApO1xufTtcbndpbmRvdy5zdGlja01lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gIENQTy5zYXlBbmRGb3JnZXQobWVzc2FnZSk7XG4gIGNsZWFyRmxhc2goKTtcbiAgdmFyIGVyciA9ICQoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKS50ZXh0KG1lc3NhZ2UpO1xuICAkKFwiLm5vdGlmaWNhdGlvbkFyZWFcIikucHJlcGVuZChlcnIpO1xufTtcbndpbmRvdy5ta1dhcm5pbmdVcHBlciA9IGZ1bmN0aW9uKCl7cmV0dXJuICQoXCI8ZGl2IGNsYXNzPSd3YXJuaW5nLXVwcGVyJz5cIik7fVxud2luZG93Lm1rV2FybmluZ0xvd2VyID0gZnVuY3Rpb24oKXtyZXR1cm4gJChcIjxkaXYgY2xhc3M9J3dhcm5pbmctbG93ZXInPlwiKTt9XG5cbiQod2luZG93KS5iaW5kKFwiYmVmb3JldW5sb2FkXCIsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4gXCJCZWNhdXNlIHRoaXMgcGFnZSBjYW4gbG9hZCBzbG93bHksIGFuZCB5b3UgbWF5IGhhdmUgb3V0c3RhbmRpbmcgY2hhbmdlcywgd2UgYXNrIHRoYXQgeW91IGNvbmZpcm0gYmVmb3JlIGxlYXZpbmcgdGhlIGVkaXRvciBpbiBjYXNlIGNsb3Npbmcgd2FzIGFuIGFjY2lkZW50LlwiO1xufSk7XG5cbnZhciBEb2N1bWVudHMgPSBmdW5jdGlvbigpIHtcblxuICBmdW5jdGlvbiBEb2N1bWVudHMoKSB7XG4gICAgdGhpcy5kb2N1bWVudHMgPSBuZXcgTWFwKCk7XG4gIH1cblxuICBEb2N1bWVudHMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRzLmhhcyhuYW1lKTtcbiAgfTtcblxuICBEb2N1bWVudHMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRzLmdldChuYW1lKTtcbiAgfTtcblxuICBEb2N1bWVudHMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChuYW1lLCBkb2MpIHtcbiAgICBpZihsb2dnZXIuaXNEZXRhaWxlZClcbiAgICAgIGxvZ2dlci5sb2coXCJkb2Muc2V0XCIsIHtuYW1lOiBuYW1lLCB2YWx1ZTogZG9jLmdldFZhbHVlKCl9KTtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudHMuc2V0KG5hbWUsIGRvYyk7XG4gIH07XG5cbiAgRG9jdW1lbnRzLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmKGxvZ2dlci5pc0RldGFpbGVkKVxuICAgICAgbG9nZ2VyLmxvZyhcImRvYy5kZWxcIiwge25hbWU6IG5hbWV9KTtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudHMuZGVsZXRlKG5hbWUpO1xuICB9O1xuXG4gIERvY3VtZW50cy5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRzLmZvckVhY2goZik7XG4gIH07XG5cbiAgcmV0dXJuIERvY3VtZW50cztcbn0oKTtcblxudmFyIFZFUlNJT05fQ0hFQ0tfSU5URVJWQUwgPSAxMjAwMDAgKyAoMzAwMDAgKiBNYXRoLnJhbmRvbSgpKTtcblxuZnVuY3Rpb24gY2hlY2tWZXJzaW9uKCkge1xuICAkLmdldChcIi9jdXJyZW50LXZlcnNpb25cIikudGhlbihmdW5jdGlvbihyZXNwKSB7XG4gICAgcmVzcCA9IEpTT04ucGFyc2UocmVzcCk7XG4gICAgaWYocmVzcC52ZXJzaW9uICYmIHJlc3AudmVyc2lvbiAhPT0gcHJvY2Vzcy5lbnYuQ1VSUkVOVF9QWVJFVF9SRUxFQVNFKSB7XG4gICAgICB3aW5kb3cuZmxhc2hNZXNzYWdlKFwiQSBuZXcgdmVyc2lvbiBvZiBQeXJldCBpcyBhdmFpbGFibGUuIFNhdmUgYW5kIHJlbG9hZCB0aGUgcGFnZSB0byBnZXQgdGhlIG5ld2VzdCB2ZXJzaW9uLlwiKTtcbiAgICB9XG4gIH0pO1xufVxud2luZG93LnNldEludGVydmFsKGNoZWNrVmVyc2lvbiwgVkVSU0lPTl9DSEVDS19JTlRFUlZBTCk7XG5cbndpbmRvdy5DUE8gPSB7XG4gIHNhdmU6IGZ1bmN0aW9uKCkge30sXG4gIGF1dG9TYXZlOiBmdW5jdGlvbigpIHt9LFxuICBkb2N1bWVudHMgOiBuZXcgRG9jdW1lbnRzKClcbn07XG4kKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBtZXJnZShvYmosIGV4dGVuc2lvbikge1xuICAgIHZhciBuZXdvYmogPSB7fTtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24oaykge1xuICAgICAgbmV3b2JqW2tdID0gb2JqW2tdO1xuICAgIH0pO1xuICAgIE9iamVjdC5rZXlzKGV4dGVuc2lvbikuZm9yRWFjaChmdW5jdGlvbihrKSB7XG4gICAgICBuZXdvYmpba10gPSBleHRlbnNpb25ba107XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ld29iajtcbiAgfVxuICB2YXIgYW5pbWF0aW9uRGl2ID0gbnVsbDtcbiAgZnVuY3Rpb24gY2xvc2VBbmltYXRpb25JZk9wZW4oKSB7XG4gICAgaWYoYW5pbWF0aW9uRGl2KSB7XG4gICAgICBhbmltYXRpb25EaXYuZW1wdHkoKTtcbiAgICAgIGFuaW1hdGlvbkRpdi5kaWFsb2coXCJkZXN0cm95XCIpO1xuICAgICAgYW5pbWF0aW9uRGl2ID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgQ1BPLm1ha2VFZGl0b3IgPSBmdW5jdGlvbihjb250YWluZXIsIG9wdGlvbnMpIHtcbiAgICB2YXIgaW5pdGlhbCA9IFwiXCI7XG4gICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJpbml0aWFsXCIpKSB7XG4gICAgICBpbml0aWFsID0gb3B0aW9ucy5pbml0aWFsO1xuICAgIH1cblxuICAgIHZhciB0ZXh0YXJlYSA9IGpRdWVyeShcIjx0ZXh0YXJlYSBhcmlhLWhpZGRlbj0ndHJ1ZSc+XCIpO1xuICAgIHRleHRhcmVhLnZhbChpbml0aWFsKTtcbiAgICBjb250YWluZXIuYXBwZW5kKHRleHRhcmVhKTtcblxuICAgIHZhciBydW5GdW4gPSBmdW5jdGlvbiAoY29kZSwgcmVwbE9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMucnVuKGNvZGUsIHtjbTogQ019LCByZXBsT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHZhciB1c2VMaW5lTnVtYmVycyA9ICFvcHRpb25zLnNpbXBsZUVkaXRvcjtcbiAgICB2YXIgdXNlRm9sZGluZyA9ICFvcHRpb25zLnNpbXBsZUVkaXRvcjtcblxuICAgIHZhciBndXR0ZXJzID0gIW9wdGlvbnMuc2ltcGxlRWRpdG9yID9cbiAgICAgIFtcIkNvZGVNaXJyb3ItbGluZW51bWJlcnNcIiwgXCJDb2RlTWlycm9yLWZvbGRndXR0ZXJcIl0gOlxuICAgICAgW107XG5cbiAgICBmdW5jdGlvbiByZWluZGVudEFsbExpbmVzKGNtKSB7XG4gICAgICB2YXIgbGFzdCA9IGNtLmxpbmVDb3VudCgpO1xuICAgICAgY20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3Q7ICsraSkgY20uaW5kZW50TGluZShpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHBsYWNlIGEgdmVydGljYWwgbGluZSBhdCBjaGFyYWN0ZXIgODAgaW4gY29kZSBlZGl0b3IsIGFuZCBub3QgcmVwbFxuICAgIHZhciBDT0RFX0xJTkVfV0lEVEggPSAxMDA7XG5cbiAgICB2YXIgcnVsZXJzLCBydWxlcnNNaW5Db2w7XG4gICAgaWYgKG9wdGlvbnMuc2ltcGxlRWRpdG9yKSB7XG4gICAgICBydWxlcnMgPSBbXTtcbiAgICB9IGVsc2V7XG4gICAgICBydWxlcnMgPSBbe2NvbG9yOiBcIiMzMTdCQ0ZcIiwgY29sdW1uOiBDT0RFX0xJTkVfV0lEVEgsIGxpbmVTdHlsZTogXCJkYXNoZWRcIiwgY2xhc3NOYW1lOiBcImhpZGRlblwifV07XG4gICAgICBydWxlcnNNaW5Db2wgPSBDT0RFX0xJTkVfV0lEVEg7XG4gICAgfVxuXG4gICAgdmFyIGNtT3B0aW9ucyA9IHtcbiAgICAgIGV4dHJhS2V5czogQ29kZU1pcnJvci5ub3JtYWxpemVLZXlNYXAoe1xuICAgICAgICBcIlNoaWZ0LUVudGVyXCI6IGZ1bmN0aW9uKGNtKSB7IHJ1bkZ1bihjbS5nZXRWYWx1ZSgpKTsgfSxcbiAgICAgICAgXCJTaGlmdC1DdHJsLUVudGVyXCI6IGZ1bmN0aW9uKGNtKSB7IHJ1bkZ1bihjbS5nZXRWYWx1ZSgpKTsgfSxcbiAgICAgICAgXCJUYWJcIjogXCJpbmRlbnRBdXRvXCIsXG4gICAgICAgIFwiQ3RybC1JXCI6IHJlaW5kZW50QWxsTGluZXMsXG4gICAgICAgIFwiRXNjIExlZnRcIjogXCJnb0JhY2t3YXJkU2V4cFwiLFxuICAgICAgICBcIkFsdC1MZWZ0XCI6IFwiZ29CYWNrd2FyZFNleHBcIixcbiAgICAgICAgXCJFc2MgUmlnaHRcIjogXCJnb0ZvcndhcmRTZXhwXCIsXG4gICAgICAgIFwiQWx0LVJpZ2h0XCI6IFwiZ29Gb3J3YXJkU2V4cFwiLFxuICAgICAgICBcIkN0cmwtTGVmdFwiOiBcImdvQmFja3dhcmRUb2tlblwiLFxuICAgICAgICBcIkN0cmwtUmlnaHRcIjogXCJnb0ZvcndhcmRUb2tlblwiXG4gICAgICB9KSxcbiAgICAgIGluZGVudFVuaXQ6IDIsXG4gICAgICB0YWJTaXplOiAyLFxuICAgICAgdmlld3BvcnRNYXJnaW46IEluZmluaXR5LFxuICAgICAgbGluZU51bWJlcnM6IHVzZUxpbmVOdW1iZXJzLFxuICAgICAgbWF0Y2hLZXl3b3JkczogdHJ1ZSxcbiAgICAgIG1hdGNoQnJhY2tldHM6IHRydWUsXG4gICAgICBzdHlsZVNlbGVjdGVkVGV4dDogdHJ1ZSxcbiAgICAgIGZvbGRHdXR0ZXI6IHVzZUZvbGRpbmcsXG4gICAgICBndXR0ZXJzOiBndXR0ZXJzLFxuICAgICAgbGluZVdyYXBwaW5nOiB0cnVlLFxuICAgICAgbG9nZ2luZzogdHJ1ZSxcbiAgICAgIHJ1bGVyczogcnVsZXJzLFxuICAgICAgcnVsZXJzTWluQ29sOiBydWxlcnNNaW5Db2xcbiAgICB9O1xuXG4gICAgY21PcHRpb25zID0gbWVyZ2UoY21PcHRpb25zLCBvcHRpb25zLmNtT3B0aW9ucyB8fCB7fSk7XG5cbiAgICB2YXIgQ00gPSBDb2RlTWlycm9yLmZyb21UZXh0QXJlYSh0ZXh0YXJlYVswXSwgY21PcHRpb25zKTtcblxuICAgIGlmICh1c2VMaW5lTnVtYmVycykge1xuICAgICAgQ00uZGlzcGxheS53cmFwcGVyLmFwcGVuZENoaWxkKG1rV2FybmluZ1VwcGVyKClbMF0pO1xuICAgICAgQ00uZGlzcGxheS53cmFwcGVyLmFwcGVuZENoaWxkKG1rV2FybmluZ0xvd2VyKClbMF0pO1xuICAgIH1cblxuICAgIGdldFRvcFRpZXJNZW51aXRlbXMoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBjbTogQ00sXG4gICAgICByZWZyZXNoOiBmdW5jdGlvbigpIHsgQ00ucmVmcmVzaCgpOyB9LFxuICAgICAgcnVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcnVuRnVuKENNLmdldFZhbHVlKCkpO1xuICAgICAgfSxcbiAgICAgIGZvY3VzOiBmdW5jdGlvbigpIHsgQ00uZm9jdXMoKTsgfSxcbiAgICAgIGZvY3VzQ2Fyb3VzZWw6IG51bGwgLy9pbml0Rm9jdXNDYXJvdXNlbFxuICAgIH07XG4gIH07XG4gIENQTy5SVU5fQ09ERSA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiUnVubmluZyBiZWZvcmUgcmVhZHlcIiwgYXJndW1lbnRzKTtcbiAgfTtcblxuICBmdW5jdGlvbiBzZXRVc2VybmFtZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gZ3dyYXAubG9hZCh7bmFtZTogJ3BsdXMnLFxuICAgICAgdmVyc2lvbjogJ3YxJyxcbiAgICB9KS50aGVuKChhcGkpID0+IHtcbiAgICAgIGFwaS5wZW9wbGUuZ2V0KHsgdXNlcklkOiBcIm1lXCIgfSkudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgIHZhciBuYW1lID0gdXNlci5kaXNwbGF5TmFtZTtcbiAgICAgICAgaWYgKHVzZXIuZW1haWxzICYmIHVzZXIuZW1haWxzWzBdICYmIHVzZXIuZW1haWxzWzBdLnZhbHVlKSB7XG4gICAgICAgICAgbmFtZSA9IHVzZXIuZW1haWxzWzBdLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldC50ZXh0KG5hbWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdG9yYWdlQVBJLnRoZW4oZnVuY3Rpb24oYXBpKSB7XG4gICAgYXBpLmNvbGxlY3Rpb24udGhlbihmdW5jdGlvbigpIHtcbiAgICAgICQoXCIubG9naW5Pbmx5XCIpLnNob3coKTtcbiAgICAgICQoXCIubG9nb3V0T25seVwiKS5oaWRlKCk7XG4gICAgICBzZXRVc2VybmFtZSgkKFwiI3VzZXJuYW1lXCIpKTtcbiAgICB9KTtcbiAgICBhcGkuY29sbGVjdGlvbi5mYWlsKGZ1bmN0aW9uKCkge1xuICAgICAgJChcIi5sb2dpbk9ubHlcIikuaGlkZSgpO1xuICAgICAgJChcIi5sb2dvdXRPbmx5XCIpLnNob3coKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgc3RvcmFnZUFQSSA9IHN0b3JhZ2VBUEkudGhlbihmdW5jdGlvbihhcGkpIHsgcmV0dXJuIGFwaS5hcGk7IH0pO1xuICAkKFwiI2Nvbm5lY3RCdXR0b25cIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgJChcIiNjb25uZWN0QnV0dG9uXCIpLnRleHQoXCJDb25uZWN0aW5nLi4uXCIpO1xuICAgICQoXCIjY29ubmVjdEJ1dHRvblwiKS5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAkKCcjY29ubmVjdEJ1dHRvbmxpJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAkKFwiI2Nvbm5lY3RCdXR0b25cIikuYXR0cihcInRhYkluZGV4XCIsIFwiLTFcIik7XG4gICAgLy8kKFwiI3RvcFRpZXJVbFwiKS5hdHRyKFwidGFiSW5kZXhcIiwgXCIwXCIpO1xuICAgIGdldFRvcFRpZXJNZW51aXRlbXMoKTtcbiAgICBzdG9yYWdlQVBJID0gY3JlYXRlUHJvZ3JhbUNvbGxlY3Rpb25BUEkoXCJjb2RlLnB5cmV0Lm9yZ1wiLCBmYWxzZSk7XG4gICAgc3RvcmFnZUFQSS50aGVuKGZ1bmN0aW9uKGFwaSkge1xuICAgICAgYXBpLmNvbGxlY3Rpb24udGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgJChcIi5sb2dpbk9ubHlcIikuc2hvdygpO1xuICAgICAgICAkKFwiLmxvZ291dE9ubHlcIikuaGlkZSgpO1xuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgICAgJChcIiNib25uaWVtZW51YnV0dG9uXCIpLmZvY3VzKCk7XG4gICAgICAgIHNldFVzZXJuYW1lKCQoXCIjdXNlcm5hbWVcIikpO1xuICAgICAgICBpZihwYXJhbXNbXCJnZXRcIl0gJiYgcGFyYW1zW1wiZ2V0XCJdW1wicHJvZ3JhbVwiXSkge1xuICAgICAgICAgIHZhciB0b0xvYWQgPSBhcGkuYXBpLmdldEZpbGVCeUlkKHBhcmFtc1tcImdldFwiXVtcInByb2dyYW1cIl0pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2VkIGluIGFuZCBoYXMgcHJvZ3JhbSB0byBsb2FkOiBcIiwgdG9Mb2FkKTtcbiAgICAgICAgICBsb2FkUHJvZ3JhbSh0b0xvYWQpO1xuICAgICAgICAgIHByb2dyYW1Ub1NhdmUgPSB0b0xvYWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvZ3JhbVRvU2F2ZSA9IFEuZmNhbGwoZnVuY3Rpb24oKSB7IHJldHVybiBudWxsOyB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBhcGkuY29sbGVjdGlvbi5mYWlsKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKFwiI2Nvbm5lY3RCdXR0b25cIikudGV4dChcIkNvbm5lY3QgdG8gR29vZ2xlIERyaXZlXCIpO1xuICAgICAgICAkKFwiI2Nvbm5lY3RCdXR0b25cIikuYXR0cihcImRpc2FibGVkXCIsIGZhbHNlKTtcbiAgICAgICAgJCgnI2Nvbm5lY3RCdXR0b25saScpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAvLyQoXCIjY29ubmVjdEJ1dHRvblwiKS5hdHRyKFwidGFiSW5kZXhcIiwgXCIwXCIpO1xuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgICAgJChcIiNjb25uZWN0QnV0dG9uXCIpLmZvY3VzKCk7XG4gICAgICAgIC8vJChcIiN0b3BUaWVyVWxcIikuYXR0cihcInRhYkluZGV4XCIsIFwiLTFcIik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBzdG9yYWdlQVBJID0gc3RvcmFnZUFQSS50aGVuKGZ1bmN0aW9uKGFwaSkgeyByZXR1cm4gYXBpLmFwaTsgfSk7XG4gIH0pO1xuXG4gIC8qXG4gICAgaW5pdGlhbFByb2dyYW0gaG9sZHMgYSBwcm9taXNlIGZvciBhIERyaXZlIEZpbGUgb2JqZWN0IG9yIG51bGxcblxuICAgIEl0J3MgbnVsbCBpZiB0aGUgcGFnZSBkb2Vzbid0IGhhdmUgYSAjc2hhcmUgb3IgI3Byb2dyYW0gdXJsXG5cbiAgICBJZiB0aGUgdXJsIGRvZXMgaGF2ZSBhICNwcm9ncmFtIG9yICNzaGFyZSwgdGhlIHByb21pc2UgaXMgZm9yIHRoZVxuICAgIGNvcnJlc3BvbmRpbmcgb2JqZWN0LlxuICAqL1xuICB2YXIgaW5pdGlhbFByb2dyYW0gPSBzdG9yYWdlQVBJLnRoZW4oZnVuY3Rpb24oYXBpKSB7XG4gICAgdmFyIHByb2dyYW1Mb2FkID0gbnVsbDtcbiAgICBpZihwYXJhbXNbXCJnZXRcIl0gJiYgcGFyYW1zW1wiZ2V0XCJdW1wicHJvZ3JhbVwiXSkge1xuICAgICAgZW5hYmxlRmlsZU9wdGlvbnMoKTtcbiAgICAgIHByb2dyYW1Mb2FkID0gYXBpLmdldEZpbGVCeUlkKHBhcmFtc1tcImdldFwiXVtcInByb2dyYW1cIl0pO1xuICAgICAgcHJvZ3JhbUxvYWQudGhlbihmdW5jdGlvbihwKSB7IHNob3dTaGFyZUNvbnRhaW5lcihwKTsgfSk7XG4gICAgfVxuICAgIGlmKHBhcmFtc1tcImdldFwiXSAmJiBwYXJhbXNbXCJnZXRcIl1bXCJzaGFyZVwiXSkge1xuICAgICAgbG9nZ2VyLmxvZygnc2hhcmVkLXByb2dyYW0tbG9hZCcsXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogcGFyYW1zW1wiZ2V0XCJdW1wic2hhcmVcIl1cbiAgICAgICAgfSk7XG4gICAgICBwcm9ncmFtTG9hZCA9IGFwaS5nZXRTaGFyZWRGaWxlQnlJZChwYXJhbXNbXCJnZXRcIl1bXCJzaGFyZVwiXSk7XG4gICAgICBwcm9ncmFtTG9hZC50aGVuKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgLy8gTk9URShqb2UpOiBJZiB0aGUgY3VycmVudCB1c2VyIGRvZXNuJ3Qgb3duIG9yIGhhdmUgYWNjZXNzIHRvIHRoaXMgZmlsZVxuICAgICAgICAvLyAob3IgaXNuJ3QgbG9nZ2VkIGluKSB0aGlzIHdpbGwgc2ltcGx5IGZhaWwgd2l0aCBhIDQwMSwgc28gd2UgZG9uJ3QgZG9cbiAgICAgICAgLy8gYW55IGZ1cnRoZXIgcGVybWlzc2lvbiBjaGVja2luZyBiZWZvcmUgc2hvd2luZyB0aGUgbGluay5cbiAgICAgICAgZmlsZS5nZXRPcmlnaW5hbCgpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNlIGZvciBvcmlnaW5hbDogXCIsIHJlc3BvbnNlKTtcbiAgICAgICAgICB2YXIgb3JpZ2luYWwgPSAkKFwiI29wZW4tb3JpZ2luYWxcIikuc2hvdygpLm9mZihcImNsaWNrXCIpO1xuICAgICAgICAgIHZhciBpZCA9IHJlc3BvbnNlLnJlc3VsdC52YWx1ZTtcbiAgICAgICAgICBvcmlnaW5hbC5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgICAgICAgIG9yaWdpbmFsLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd2luZG93Lm9wZW4od2luZG93LkFQUF9CQVNFX1VSTCArIFwiL2VkaXRvciNwcm9ncmFtPVwiICsgaWQsIFwiX2JsYW5rXCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZihwcm9ncmFtTG9hZCkge1xuICAgICAgcHJvZ3JhbUxvYWQuZmFpbChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB3aW5kb3cuc3RpY2tFcnJvcihcIlRoZSBwcm9ncmFtIGZhaWxlZCB0byBsb2FkLlwiKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHByb2dyYW1Mb2FkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNldFRpdGxlKHByb2dOYW1lKSB7XG4gICAgZG9jdW1lbnQudGl0bGUgPSBwcm9nTmFtZSArIFwiIC0gY29kZS5weXJldC5vcmdcIjtcbiAgfVxuICBDUE8uc2V0VGl0bGUgPSBzZXRUaXRsZTtcblxuICB2YXIgZmlsZW5hbWUgPSBmYWxzZTtcblxuICAkKFwiI2Rvd25sb2FkIGFcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRvd25sb2FkRWx0ID0gJChcIiNkb3dubG9hZCBhXCIpO1xuICAgIHZhciBjb250ZW50cyA9IENQTy5lZGl0b3IuY20uZ2V0VmFsdWUoKTtcbiAgICB2YXIgZG93bmxvYWRCbG9iID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW2NvbnRlbnRzXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pKTtcbiAgICBpZighZmlsZW5hbWUpIHsgZmlsZW5hbWUgPSAndW50aXRsZWRfcHJvZ3JhbS5hcnInOyB9XG4gICAgaWYoZmlsZW5hbWUuaW5kZXhPZihcIi5hcnJcIikgIT09IChmaWxlbmFtZS5sZW5ndGggLSA0KSkge1xuICAgICAgZmlsZW5hbWUgKz0gXCIuYXJyXCI7XG4gICAgfVxuICAgIGRvd25sb2FkRWx0LmF0dHIoe1xuICAgICAgZG93bmxvYWQ6IGZpbGVuYW1lLFxuICAgICAgaHJlZjogZG93bmxvYWRCbG9iXG4gICAgfSk7XG4gICAgJChcIiNkb3dubG9hZFwiKS5hcHBlbmQoZG93bmxvYWRFbHQpO1xuICB9KTtcblxuICB2YXIgVFJVTkNBVEVfTEVOR1RIID0gMjA7XG5cbiAgZnVuY3Rpb24gdHJ1bmNhdGVOYW1lKG5hbWUpIHtcbiAgICBpZihuYW1lLmxlbmd0aCA8PSBUUlVOQ0FURV9MRU5HVEggKyAxKSB7IHJldHVybiBuYW1lOyB9XG4gICAgcmV0dXJuIG5hbWUuc2xpY2UoMCwgVFJVTkNBVEVfTEVOR1RIIC8gMikgKyBcIuKAplwiICsgbmFtZS5zbGljZShuYW1lLmxlbmd0aCAtIFRSVU5DQVRFX0xFTkdUSCAvIDIsIG5hbWUubGVuZ3RoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU5hbWUocCkge1xuICAgIGZpbGVuYW1lID0gcC5nZXROYW1lKCk7XG4gICAgJChcIiNmaWxlbmFtZVwiKS50ZXh0KFwiIChcIiArIHRydW5jYXRlTmFtZShmaWxlbmFtZSkgKyBcIilcIik7XG4gICAgc2V0VGl0bGUoZmlsZW5hbWUpO1xuICAgIHNob3dTaGFyZUNvbnRhaW5lcihwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRQcm9ncmFtKHApIHtcbiAgICBwcm9ncmFtVG9TYXZlID0gcDtcbiAgICByZXR1cm4gcC50aGVuKGZ1bmN0aW9uKHByb2cpIHtcbiAgICAgIGlmKHByb2cgIT09IG51bGwpIHtcbiAgICAgICAgdXBkYXRlTmFtZShwcm9nKTtcbiAgICAgICAgaWYocHJvZy5zaGFyZWQpIHtcbiAgICAgICAgICB3aW5kb3cuc3RpY2tNZXNzYWdlKFwiWW91IGFyZSB2aWV3aW5nIGEgc2hhcmVkIHByb2dyYW0uIEFueSBjaGFuZ2VzIHlvdSBtYWtlIHdpbGwgbm90IGJlIHNhdmVkLiBZb3UgY2FuIHVzZSBGaWxlIC0+IFNhdmUgYSBjb3B5IHRvIHNhdmUgeW91ciBvd24gdmVyc2lvbiB3aXRoIGFueSBlZGl0cyB5b3UgbWFrZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb2cuZ2V0Q29udGVudHMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNheShtc2csIGZvcmdldCkge1xuICAgIGlmIChtc2cgPT09IFwiXCIpIHJldHVybjtcbiAgICB2YXIgYW5ub3VuY2VtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5ub3VuY2VtZW50bGlzdFwiKTtcbiAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiTElcIik7XG4gICAgbGkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobXNnKSk7XG4gICAgYW5ub3VuY2VtZW50cy5pbnNlcnRCZWZvcmUobGksIGFubm91bmNlbWVudHMuZmlyc3RDaGlsZCk7XG4gICAgaWYgKGZvcmdldCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgYW5ub3VuY2VtZW50cy5yZW1vdmVDaGlsZChsaSk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzYXlBbmRGb3JnZXQobXNnKSB7XG4gICAgLy9jb25zb2xlLmxvZygnZG9pbmcgc2F5QW5kRm9yZ2V0JywgbXNnKTtcbiAgICBzYXkobXNnLCB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGN5Y2xlQWR2YW5jZShjdXJySW5kZXgsIG1heEluZGV4LCByZXZlcnNlUCkge1xuICAgIHZhciBuZXh0SW5kZXggPSBjdXJySW5kZXggKyAocmV2ZXJzZVA/IC0xIDogKzEpO1xuICAgIG5leHRJbmRleCA9ICgobmV4dEluZGV4ICUgbWF4SW5kZXgpICsgbWF4SW5kZXgpICUgbWF4SW5kZXg7XG4gICAgcmV0dXJuIG5leHRJbmRleDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvcHVsYXRlRm9jdXNDYXJvdXNlbChlZGl0b3IpIHtcbiAgICBpZiAoIWVkaXRvci5mb2N1c0Nhcm91c2VsKSB7XG4gICAgICBlZGl0b3IuZm9jdXNDYXJvdXNlbCA9IFtdO1xuICAgIH1cbiAgICB2YXIgZmMgPSBlZGl0b3IuZm9jdXNDYXJvdXNlbDtcbiAgICB2YXIgZG9jbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblwiKTtcbiAgICBpZiAoIWZjWzBdKSB7XG4gICAgICB2YXIgdG9vbGJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdUb29sYmFyJyk7XG4gICAgICBmY1swXSA9IHRvb2xiYXI7XG4gICAgICAvL2ZjWzBdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZWFkZXJvbmVsZWdlbmRcIik7XG4gICAgICAvL2dldFRvcFRpZXJNZW51aXRlbXMoKTtcbiAgICAgIC8vZmNbMF0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9ubmllbWVudWJ1dHRvbicpO1xuICAgIH1cbiAgICBpZiAoIWZjWzFdKSB7XG4gICAgICB2YXIgZG9jcmVwbE1haW4gPSBkb2NtYWluLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyZXBsTWFpblwiKTtcbiAgICAgIHZhciBkb2NyZXBsTWFpbjA7XG4gICAgICBpZiAoZG9jcmVwbE1haW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGRvY3JlcGxNYWluMCA9IHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSBpZiAoZG9jcmVwbE1haW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGRvY3JlcGxNYWluMCA9IGRvY3JlcGxNYWluWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb2NyZXBsTWFpbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChkb2NyZXBsTWFpbltpXS5pbm5lclRleHQgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGRvY3JlcGxNYWluMCA9IGRvY3JlcGxNYWluW2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZmNbMV0gPSBkb2NyZXBsTWFpbjA7XG4gICAgfVxuICAgIGlmICghZmNbMl0pIHtcbiAgICAgIHZhciBkb2NyZXBsID0gZG9jbWFpbi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicmVwbFwiKTtcbiAgICAgIHZhciBkb2NyZXBsY29kZSA9IGRvY3JlcGxbMF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInByb21wdC1jb250YWluZXJcIilbMF0uXG4gICAgICAgIGdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJDb2RlTWlycm9yXCIpWzBdO1xuICAgICAgZmNbMl0gPSBkb2NyZXBsY29kZTtcbiAgICB9XG4gICAgaWYgKCFmY1szXSkge1xuICAgICAgZmNbM10gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFubm91bmNlbWVudHNcIik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3ljbGVGb2N1cyhyZXZlcnNlUCkge1xuICAgIC8vY29uc29sZS5sb2coJ2RvaW5nIGN5Y2xlRm9jdXMnLCByZXZlcnNlUCk7XG4gICAgdmFyIGVkaXRvciA9IHRoaXMuZWRpdG9yO1xuICAgIHBvcHVsYXRlRm9jdXNDYXJvdXNlbChlZGl0b3IpO1xuICAgIHZhciBmQ2Fyb3VzZWwgPSBlZGl0b3IuZm9jdXNDYXJvdXNlbDtcbiAgICB2YXIgbWF4SW5kZXggPSBmQ2Fyb3VzZWwubGVuZ3RoO1xuICAgIHZhciBjdXJyZW50Rm9jdXNlZEVsdCA9IGZDYXJvdXNlbC5maW5kKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbm9kZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgY3VycmVudEZvY3VzSW5kZXggPSBmQ2Fyb3VzZWwuaW5kZXhPZihjdXJyZW50Rm9jdXNlZEVsdCk7XG4gICAgdmFyIG5leHRGb2N1c0luZGV4ID0gY3VycmVudEZvY3VzSW5kZXg7XG4gICAgdmFyIGZvY3VzRWx0O1xuICAgIGRvIHtcbiAgICAgIG5leHRGb2N1c0luZGV4ID0gY3ljbGVBZHZhbmNlKG5leHRGb2N1c0luZGV4LCBtYXhJbmRleCwgcmV2ZXJzZVApO1xuICAgICAgZm9jdXNFbHQgPSBmQ2Fyb3VzZWxbbmV4dEZvY3VzSW5kZXhdO1xuICAgICAgLy9jb25zb2xlLmxvZygndHJ5aW5nIGZvY3VzRWx0JywgZm9jdXNFbHQpO1xuICAgIH0gd2hpbGUgKCFmb2N1c0VsdCk7XG5cbiAgICB2YXIgZm9jdXNFbHQwO1xuICAgIGlmIChmb2N1c0VsdC5jbGFzc0xpc3QuY29udGFpbnMoJ3Rvb2xiYXJyZWdpb24nKSkge1xuICAgICAgLy9jb25zb2xlLmxvZygnc2V0dGxpbmcgb24gdG9vbGJhciByZWdpb24nKVxuICAgICAgZ2V0VG9wVGllck1lbnVpdGVtcygpO1xuICAgICAgZm9jdXNFbHQwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jvbm5pZW1lbnVidXR0b24nKTtcbiAgICB9IGVsc2UgaWYgKGZvY3VzRWx0LmNsYXNzTGlzdC5jb250YWlucyhcInJlcGxNYWluXCIpIHx8XG4gICAgICBmb2N1c0VsdC5jbGFzc0xpc3QuY29udGFpbnMoXCJDb2RlTWlycm9yXCIpKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKCdzZXR0bGluZyBvbiBkZWZuIHdpbmRvdycpXG4gICAgICB2YXIgdGV4dGFyZWFzID0gZm9jdXNFbHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0ZXh0YXJlYVwiKTtcbiAgICAgIC8vY29uc29sZS5sb2coJ3R4dGFyZWFzPScsIHRleHRhcmVhcylcbiAgICAgIC8vY29uc29sZS5sb2coJ3R4dGFyZWEgbGVuPScsIHRleHRhcmVhcy5sZW5ndGgpXG4gICAgICBpZiAodGV4dGFyZWFzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdJJylcbiAgICAgICAgZm9jdXNFbHQwID0gZm9jdXNFbHQ7XG4gICAgICB9IGVsc2UgaWYgKHRleHRhcmVhcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnc2V0dGxpbmcgb24gaW50ZXIgd2luZG93JylcbiAgICAgICAgZm9jdXNFbHQwID0gdGV4dGFyZWFzWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnc2V0dGxpbmcgb24gZGVmbiB3aW5kb3cnKVxuICAgICAgICAvKlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHRhcmVhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh0ZXh0YXJlYXNbaV0uZ2V0QXR0cmlidXRlKCd0YWJJbmRleCcpKSB7XG4gICAgICAgICAgICBmb2N1c0VsdDAgPSB0ZXh0YXJlYXNbaV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICovXG4gICAgICAgIGZvY3VzRWx0MCA9IHRleHRhcmVhc1t0ZXh0YXJlYXMubGVuZ3RoLTFdO1xuICAgICAgICBmb2N1c0VsdDAucmVtb3ZlQXR0cmlidXRlKCd0YWJJbmRleCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvL2NvbnNvbGUubG9nKCdzZXR0bGluZyBvbiBhbm5vdW5jZW1lbnQgcmVnaW9uJywgZm9jdXNFbHQpXG4gICAgICBmb2N1c0VsdDAgPSBmb2N1c0VsdDtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgICBmb2N1c0VsdDAuY2xpY2soKTtcbiAgICBmb2N1c0VsdDAuZm9jdXMoKTtcbiAgICAvL2NvbnNvbGUubG9nKCcoY2YpZG9jYWN0ZWx0PScsIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgdmFyIHByb2dyYW1Mb2FkZWQgPSBsb2FkUHJvZ3JhbShpbml0aWFsUHJvZ3JhbSk7XG5cbiAgdmFyIHByb2dyYW1Ub1NhdmUgPSBpbml0aWFsUHJvZ3JhbTtcblxuICBmdW5jdGlvbiBzaG93U2hhcmVDb250YWluZXIocCkge1xuICAgIC8vY29uc29sZS5sb2coJ2NhbGxlZCBzaG93U2hhcmVDb250YWluZXInKTtcbiAgICBpZighcC5zaGFyZWQpIHtcbiAgICAgICQoXCIjc2hhcmVDb250YWluZXJcIikuZW1wdHkoKTtcbiAgICAgICQoJyNwdWJsaXNobGknKS5zaG93KCk7XG4gICAgICAkKFwiI3NoYXJlQ29udGFpbmVyXCIpLmFwcGVuZChzaGFyZUFQSS5tYWtlU2hhcmVMaW5rKHApKTtcbiAgICAgIGdldFRvcFRpZXJNZW51aXRlbXMoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBuYW1lT3JVbnRpdGxlZCgpIHtcbiAgICByZXR1cm4gZmlsZW5hbWUgfHwgXCJVbnRpdGxlZFwiO1xuICB9XG4gIGZ1bmN0aW9uIGF1dG9TYXZlKCkge1xuICAgIHByb2dyYW1Ub1NhdmUudGhlbihmdW5jdGlvbihwKSB7XG4gICAgICBpZihwICE9PSBudWxsICYmICFwLnNoYXJlZCkgeyBzYXZlKCk7IH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuYWJsZUZpbGVPcHRpb25zKCkge1xuICAgICQoXCIjZmlsZW1lbnVDb250ZW50cyAqXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG4gIH1cblxuICBmdW5jdGlvbiBtZW51SXRlbURpc2FibGVkKGlkKSB7XG4gICAgcmV0dXJuICQoXCIjXCIgKyBpZCkuaGFzQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5ld0V2ZW50KGUpIHtcbiAgICB3aW5kb3cub3Blbih3aW5kb3cuQVBQX0JBU0VfVVJMICsgXCIvZWRpdG9yXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2F2ZUV2ZW50KGUpIHtcbiAgICBpZihtZW51SXRlbURpc2FibGVkKFwic2F2ZVwiKSkgeyByZXR1cm47IH1cbiAgICByZXR1cm4gc2F2ZSgpO1xuICB9XG5cbiAgLypcbiAgICBzYXZlIDogc3RyaW5nIChvcHRpb25hbCkgLT4gdW5kZWZcblxuICAgIElmIGEgc3RyaW5nIGFyZ3VtZW50IGlzIHByb3ZpZGVkLCBjcmVhdGUgYSBuZXcgZmlsZSB3aXRoIHRoYXQgbmFtZSBhbmQgc2F2ZVxuICAgIHRoZSBlZGl0b3IgY29udGVudHMgaW4gdGhhdCBmaWxlLlxuXG4gICAgSWYgbm8gZmlsZW5hbWUgaXMgcHJvdmlkZWQsIHNhdmUgdGhlIGV4aXN0aW5nIGZpbGUgcmVmZXJlbmNlZCBieSB0aGUgZWRpdG9yXG4gICAgd2l0aCB0aGUgY3VycmVudCBlZGl0b3IgY29udGVudHMuICBJZiBubyBmaWxlbmFtZSBoYXMgYmVlbiBzZXQgeWV0LCBqdXN0XG4gICAgc2V0IHRoZSBuYW1lIHRvIFwiVW50aXRsZWRcIi5cblxuICAqL1xuICBmdW5jdGlvbiBzYXZlKG5ld0ZpbGVuYW1lKSB7XG4gICAgdmFyIHVzZU5hbWUsIGNyZWF0ZTtcbiAgICBpZihuZXdGaWxlbmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB1c2VOYW1lID0gbmV3RmlsZW5hbWU7XG4gICAgICBjcmVhdGUgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmKGZpbGVuYW1lID09PSBmYWxzZSkge1xuICAgICAgZmlsZW5hbWUgPSBcIlVudGl0bGVkXCI7XG4gICAgICBjcmVhdGUgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHVzZU5hbWUgPSBmaWxlbmFtZTsgLy8gQSBjbG9zZWQtb3ZlciB2YXJpYWJsZVxuICAgICAgY3JlYXRlID0gZmFsc2U7XG4gICAgfVxuICAgIHdpbmRvdy5zdGlja01lc3NhZ2UoXCJTYXZpbmcuLi5cIik7XG4gICAgdmFyIHNhdmVkUHJvZ3JhbSA9IHByb2dyYW1Ub1NhdmUudGhlbihmdW5jdGlvbihwKSB7XG4gICAgICBpZihwICE9PSBudWxsICYmIHAuc2hhcmVkICYmICFjcmVhdGUpIHtcbiAgICAgICAgcmV0dXJuIHA7IC8vIERvbid0IHRyeSB0byBzYXZlIHNoYXJlZCBmaWxlc1xuICAgICAgfVxuICAgICAgaWYoY3JlYXRlKSB7XG4gICAgICAgIHByb2dyYW1Ub1NhdmUgPSBzdG9yYWdlQVBJXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oYXBpKSB7IHJldHVybiBhcGkuY3JlYXRlRmlsZSh1c2VOYW1lKTsgfSlcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihwKSB7XG4gICAgICAgICAgICAvLyBzaG93U2hhcmVDb250YWluZXIocCk7IFRPRE8oam9lKTogZmlndXJlIG91dCB3aGVyZSB0byBwdXQgdGhpc1xuICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgXCIjcHJvZ3JhbT1cIiArIHAuZ2V0VW5pcXVlSWQoKSk7XG4gICAgICAgICAgICB1cGRhdGVOYW1lKHApOyAvLyBzZXRzIGZpbGVuYW1lXG4gICAgICAgICAgICBlbmFibGVGaWxlT3B0aW9ucygpO1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9ncmFtVG9TYXZlLnRoZW4oZnVuY3Rpb24ocCkge1xuICAgICAgICAgIHJldHVybiBzYXZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBwcm9ncmFtVG9TYXZlLnRoZW4oZnVuY3Rpb24ocCkge1xuICAgICAgICAgIGlmKHAgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBwLnNhdmUoQ1BPLmVkaXRvci5jbS5nZXRWYWx1ZSgpLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHApIHtcbiAgICAgICAgICBpZihwICE9PSBudWxsKSB7XG4gICAgICAgICAgICB3aW5kb3cuZmxhc2hNZXNzYWdlKFwiUHJvZ3JhbSBzYXZlZCBhcyBcIiArIHAuZ2V0TmFtZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHNhdmVkUHJvZ3JhbS5mYWlsKGZ1bmN0aW9uKGVycikge1xuICAgICAgd2luZG93LnN0aWNrRXJyb3IoXCJVbmFibGUgdG8gc2F2ZVwiLCBcIllvdXIgaW50ZXJuZXQgY29ubmVjdGlvbiBtYXkgYmUgZG93biwgb3Igc29tZXRoaW5nIGVsc2UgbWlnaHQgYmUgd3Jvbmcgd2l0aCB0aGlzIHNpdGUgb3Igc2F2aW5nIHRvIEdvb2dsZS4gIFlvdSBzaG91bGQgYmFjayB1cCBhbnkgY2hhbmdlcyB0byB0aGlzIHByb2dyYW0gc29tZXdoZXJlIGVsc2UuICBZb3UgY2FuIHRyeSBzYXZpbmcgYWdhaW4gdG8gc2VlIGlmIHRoZSBwcm9ibGVtIHdhcyB0ZW1wb3JhcnksIGFzIHdlbGwuXCIpO1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xuICAgIHJldHVybiBzYXZlZFByb2dyYW07XG4gIH1cblxuICBmdW5jdGlvbiBzYXZlQXMoKSB7XG4gICAgaWYobWVudUl0ZW1EaXNhYmxlZChcInNhdmVhc1wiKSkgeyByZXR1cm47IH1cbiAgICBwcm9ncmFtVG9TYXZlLnRoZW4oZnVuY3Rpb24ocCkge1xuICAgICAgdmFyIG5hbWUgPSBwID09PSBudWxsID8gXCJVbnRpdGxlZFwiIDogcC5nZXROYW1lKCk7XG4gICAgICB2YXIgc2F2ZUFzUHJvbXB0ID0gbmV3IG1vZGFsUHJvbXB0KHtcbiAgICAgICAgdGl0bGU6IFwiU2F2ZSBhIGNvcHlcIixcbiAgICAgICAgc3R5bGU6IFwidGV4dFwiLFxuICAgICAgICBvcHRpb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWVzc2FnZTogXCJUaGUgbmFtZSBmb3IgdGhlIGNvcHk6XCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IG5hbWVcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHNhdmVBc1Byb21wdC5zaG93KCkudGhlbihmdW5jdGlvbihuZXdOYW1lKSB7XG4gICAgICAgIGlmKG5ld05hbWUgPT09IG51bGwpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgICAgd2luZG93LnN0aWNrTWVzc2FnZShcIlNhdmluZy4uLlwiKTtcbiAgICAgICAgcmV0dXJuIHNhdmUobmV3TmFtZSk7XG4gICAgICB9KS5cbiAgICAgIGZhaWwoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcmVuYW1lOiBcIiwgZXJyKTtcbiAgICAgICAgd2luZG93LmZsYXNoRXJyb3IoXCJGYWlsZWQgdG8gcmVuYW1lIGZpbGVcIik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmFtZSgpIHtcbiAgICBwcm9ncmFtVG9TYXZlLnRoZW4oZnVuY3Rpb24ocCkge1xuICAgICAgdmFyIHJlbmFtZVByb21wdCA9IG5ldyBtb2RhbFByb21wdCh7XG4gICAgICAgIHRpdGxlOiBcIlJlbmFtZSB0aGlzIGZpbGVcIixcbiAgICAgICAgc3R5bGU6IFwidGV4dFwiLFxuICAgICAgICBvcHRpb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWVzc2FnZTogXCJUaGUgbmV3IG5hbWUgZm9yIHRoZSBmaWxlOlwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBwLmdldE5hbWUoKVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSk7XG4gICAgICAvLyBudWxsIHJldHVybiB2YWx1ZXMgYXJlIGZvciB0aGUgXCJjYW5jZWxcIiBwYXRoXG4gICAgICByZXR1cm4gcmVuYW1lUHJvbXB0LnNob3coKS50aGVuKGZ1bmN0aW9uKG5ld05hbWUpIHtcbiAgICAgICAgaWYobmV3TmFtZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5zdGlja01lc3NhZ2UoXCJSZW5hbWluZy4uLlwiKTtcbiAgICAgICAgcHJvZ3JhbVRvU2F2ZSA9IHAucmVuYW1lKG5ld05hbWUpO1xuICAgICAgICByZXR1cm4gcHJvZ3JhbVRvU2F2ZTtcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbihwKSB7XG4gICAgICAgIGlmKHAgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVOYW1lKHApO1xuICAgICAgICB3aW5kb3cuZmxhc2hNZXNzYWdlKFwiUHJvZ3JhbSBzYXZlZCBhcyBcIiArIHAuZ2V0TmFtZSgpKTtcbiAgICAgIH0pXG4gICAgICAuZmFpbChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZW5hbWU6IFwiLCBlcnIpO1xuICAgICAgICB3aW5kb3cuZmxhc2hFcnJvcihcIkZhaWxlZCB0byByZW5hbWUgZmlsZVwiKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmZhaWwoZnVuY3Rpb24oZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIHJlbmFtZTogXCIsIGVycik7XG4gICAgfSk7XG4gIH1cblxuICAkKFwiI3J1bkJ1dHRvblwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICBDUE8uYXV0b1NhdmUoKTtcbiAgfSk7XG5cbiAgJChcIiNuZXdcIikuY2xpY2sobmV3RXZlbnQpO1xuICAkKFwiI3NhdmVcIikuY2xpY2soc2F2ZUV2ZW50KTtcbiAgJChcIiNyZW5hbWVcIikuY2xpY2socmVuYW1lKTtcbiAgJChcIiNzYXZlYXNcIikuY2xpY2soc2F2ZUFzKTtcblxuICB2YXIgZm9jdXNhYmxlRWx0cyA9ICQoZG9jdW1lbnQpLmZpbmQoJyNoZWFkZXIgLmZvY3VzYWJsZScpO1xuICAvL2NvbnNvbGUubG9nKCdmb2N1c2FibGVFbHRzPScsIGZvY3VzYWJsZUVsdHMpXG4gIHZhciB0aGVUb29sYmFyID0gJChkb2N1bWVudCkuZmluZCgnI1Rvb2xiYXInKTtcblxuICBmdW5jdGlvbiBnZXRUb3BUaWVyTWVudWl0ZW1zKCkge1xuICAgIC8vY29uc29sZS5sb2coJ2RvaW5nIGdldFRvcFRpZXJNZW51aXRlbXMnKVxuICAgIHZhciB0b3BUaWVyTWVudWl0ZW1zID0gJChkb2N1bWVudCkuZmluZCgnI2hlYWRlciB1bCBsaS50b3BUaWVyJykudG9BcnJheSgpO1xuICAgIHRvcFRpZXJNZW51aXRlbXMgPSB0b3BUaWVyTWVudWl0ZW1zLlxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKGVsdCA9PiAhKGVsdC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHQuZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpID09PSAnZGlzYWJsZWQnKSk7XG4gICAgdmFyIG51bVRvcFRpZXJNZW51aXRlbXMgPSB0b3BUaWVyTWVudWl0ZW1zLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVRvcFRpZXJNZW51aXRlbXM7IGkrKykge1xuICAgICAgdmFyIGl0aFRvcFRpZXJNZW51aXRlbSA9IHRvcFRpZXJNZW51aXRlbXNbaV07XG4gICAgICB2YXIgaUNoaWxkID0gJChpdGhUb3BUaWVyTWVudWl0ZW0pLmNoaWxkcmVuKCkuZmlyc3QoKTtcbiAgICAgIC8vY29uc29sZS5sb2coJ2lDaGlsZD0nLCBpQ2hpbGQpO1xuICAgICAgaUNoaWxkLmZpbmQoJy5mb2N1c2FibGUnKS5cbiAgICAgICAgYXR0cignYXJpYS1zZXRzaXplJywgbnVtVG9wVGllck1lbnVpdGVtcy50b1N0cmluZygpKS5cbiAgICAgICAgYXR0cignYXJpYS1wb3NpbnNldCcsIChpKzEpLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdG9wVGllck1lbnVpdGVtcztcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUVkaXRvckhlaWdodCgpIHtcbiAgICB2YXIgdG9vbGJhckhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3BUaWVyVWwnKS5zY3JvbGxIZWlnaHQ7XG4gICAgLy8gZ2V0cyBidW1wZWQgdG8gNjcgb24gaW5pdGlhbCByZXNpemUgcGVydHVyYmF0aW9uLCBidXQgYWN0dWFsIHZhbHVlIGlzIGluZGVlZCA0MFxuICAgIGlmICh0b29sYmFySGVpZ2h0IDwgODApIHRvb2xiYXJIZWlnaHQgPSA0MDtcbiAgICB0b29sYmFySGVpZ2h0ICs9ICdweCc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1JFUEwnKS5zdHlsZS5wYWRkaW5nVG9wID0gdG9vbGJhckhlaWdodDtcbiAgICB2YXIgZG9jTWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyk7XG4gICAgdmFyIGRvY1JlcGxNYWluID0gZG9jTWFpbi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyZXBsTWFpbicpO1xuICAgIGlmIChkb2NSZXBsTWFpbi5sZW5ndGggIT09IDApIHtcbiAgICAgIGRvY1JlcGxNYWluWzBdLnN0eWxlLnBhZGRpbmdUb3AgPSB0b29sYmFySGVpZ2h0O1xuICAgIH1cbiAgfVxuXG4gICQod2luZG93KS5vbigncmVzaXplJywgdXBkYXRlRWRpdG9ySGVpZ2h0KTtcblxuICBmdW5jdGlvbiBpbnNlcnRBcmlhUG9zKHN1Ym1lbnUpIHtcbiAgICAvL2NvbnNvbGUubG9nKCdkb2luZyBpbnNlcnRBcmlhUG9zJywgc3VibWVudSlcbiAgICB2YXIgYXJyID0gc3VibWVudS50b0FycmF5KCk7XG4gICAgLy9jb25zb2xlLmxvZygnYXJyPScsIGFycik7XG4gICAgdmFyIGxlbiA9IGFyci5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdmFyIGVsdCA9IGFycltpXTtcbiAgICAgIC8vY29uc29sZS5sb2coJ2VsdCcsIGksICc9JywgZWx0KTtcbiAgICAgIGVsdC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2V0c2l6ZScsIGxlbi50b1N0cmluZygpKTtcbiAgICAgIGVsdC5zZXRBdHRyaWJ1dGUoJ2FyaWEtcG9zaW5zZXQnLCAoaSsxKS50b1N0cmluZygpKTtcbiAgICB9XG4gIH1cblxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGhpZGVBbGxUb3BNZW51aXRlbXMoKTtcbiAgfSk7XG5cbiAgdGhlVG9vbGJhci5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIHRoZVRvb2xiYXIua2V5ZG93bihmdW5jdGlvbiAoZSkge1xuICAgIC8vY29uc29sZS5sb2coJ3Rvb2xiYXIga2V5ZG93bicsIGUpO1xuICAgIC8vbW9zdCBhbnkga2V5IGF0IGFsbFxuICAgIHZhciBrYyA9IGUua2V5Q29kZTtcbiAgICBpZiAoa2MgPT09IDI3KSB7XG4gICAgICAvLyBlc2NhcGVcbiAgICAgIGhpZGVBbGxUb3BNZW51aXRlbXMoKTtcbiAgICAgIC8vY29uc29sZS5sb2coJ2NhbGxpbmcgY3ljbGVGb2N1cyBmcm9tIHRvb2xiYXInKVxuICAgICAgQ1BPLmN5Y2xlRm9jdXMoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSBlbHNlIGlmIChrYyA9PT0gOSB8fCBrYyA9PT0gMzcgfHwga2MgPT09IDM4IHx8IGtjID09PSAzOSB8fCBrYyA9PT0gNDApIHtcbiAgICAgIC8vIGFuIGFycm93XG4gICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzKS5maW5kKCdbdGFiSW5kZXg9LTFdJyk7XG4gICAgICBnZXRUb3BUaWVyTWVudWl0ZW1zKCk7XG4gICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTsgLy9uZWVkZWQ/XG4gICAgICB0YXJnZXQuZmlyc3QoKS5mb2N1cygpOyAvL25lZWRlZD9cbiAgICAgIC8vY29uc29sZS5sb2coJ2RvY2FjdGVsdD0nLCBkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhpZGVBbGxUb3BNZW51aXRlbXMoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGNsaWNrVG9wTWVudWl0ZW0oZSkge1xuICAgIGhpZGVBbGxUb3BNZW51aXRlbXMoKTtcbiAgICB2YXIgdGhpc0VsdCA9ICQodGhpcyk7XG4gICAgLy9jb25zb2xlLmxvZygnZG9pbmcgY2xpY2tUb3BNZW51aXRlbSBvbicsIHRoaXNFbHQpO1xuICAgIHZhciB0b3BUaWVyVWwgPSB0aGlzRWx0LmNsb3Nlc3QoJ3VsW2lkPXRvcFRpZXJVbF0nKTtcbiAgICBpZiAodGhpc0VsdFswXS5oYXNBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXNFbHRbMF0uZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpID09PSAnZGlzYWJsZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vdmFyIGhpZGRlblAgPSAodGhpc0VsdFswXS5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ2ZhbHNlJyk7XG4gICAgLy9oaWRkZW5QIGFsd2F5cyBmYWxzZT9cbiAgICB2YXIgdGhpc1RvcE1lbnVpdGVtID0gdGhpc0VsdC5jbG9zZXN0KCdsaS50b3BUaWVyJyk7XG4gICAgLy9jb25zb2xlLmxvZygndGhpc1RvcE1lbnVpdGVtPScsIHRoaXNUb3BNZW51aXRlbSk7XG4gICAgdmFyIHQxID0gdGhpc1RvcE1lbnVpdGVtWzBdO1xuICAgIHZhciBzdWJtZW51T3BlbiA9ICh0aGlzRWx0WzBdLmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAndHJ1ZScpO1xuICAgIGlmICghc3VibWVudU9wZW4pIHtcbiAgICAgIC8vY29uc29sZS5sb2coJ2hpZGRlbnAgdHJ1ZSBicmFuY2gnKTtcbiAgICAgIGhpZGVBbGxUb3BNZW51aXRlbXMoKTtcbiAgICAgIHRoaXNUb3BNZW51aXRlbS5jaGlsZHJlbigndWwuc3VibWVudScpLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJykuc2hvdygpO1xuICAgICAgdGhpc1RvcE1lbnVpdGVtLmNoaWxkcmVuKCkuZmlyc3QoKS5maW5kKCdbYXJpYS1leHBhbmRlZF0nKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9jb25zb2xlLmxvZygnaGlkZGVucCBmYWxzZSBicmFuY2gnKTtcbiAgICAgIHRoaXNUb3BNZW51aXRlbS5jaGlsZHJlbigndWwuc3VibWVudScpLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKS5oaWRlKCk7XG4gICAgICB0aGlzVG9wTWVudWl0ZW0uY2hpbGRyZW4oKS5maXJzdCgpLmZpbmQoJ1thcmlhLWV4cGFuZGVkXScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICB9XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHZhciBleHBhbmRhYmxlRWx0cyA9ICQoZG9jdW1lbnQpLmZpbmQoJyNoZWFkZXIgW2FyaWEtZXhwYW5kZWRdJyk7XG4gIGV4cGFuZGFibGVFbHRzLmNsaWNrKGNsaWNrVG9wTWVudWl0ZW0pO1xuXG4gIGZ1bmN0aW9uIGhpZGVBbGxUb3BNZW51aXRlbXMoKSB7XG4gICAgLy9jb25zb2xlLmxvZygnZG9pbmcgaGlkZUFsbFRvcE1lbnVpdGVtcycpO1xuICAgIHZhciB0b3BUaWVyVWwgPSAkKGRvY3VtZW50KS5maW5kKCcjaGVhZGVyIHVsW2lkPXRvcFRpZXJVbF0nKTtcbiAgICB0b3BUaWVyVWwuZmluZCgnW2FyaWEtZXhwYW5kZWRdJykuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgIHRvcFRpZXJVbC5maW5kKCd1bC5zdWJtZW51JykuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpLmhpZGUoKTtcbiAgfVxuXG4gIHZhciBub25leHBhbmRhYmxlRWx0cyA9ICQoZG9jdW1lbnQpLmZpbmQoJyNoZWFkZXIgLnRvcFRpZXIgPiBkaXYgPiBidXR0b246bm90KFthcmlhLWV4cGFuZGVkXSknKTtcbiAgbm9uZXhwYW5kYWJsZUVsdHMuY2xpY2soaGlkZUFsbFRvcE1lbnVpdGVtcyk7XG5cbiAgZnVuY3Rpb24gc3dpdGNoVG9wTWVudWl0ZW0oZGVzdFRvcE1lbnVpdGVtLCBkZXN0RWx0KSB7XG4gICAgLy9jb25zb2xlLmxvZygnZG9pbmcgc3dpdGNoVG9wTWVudWl0ZW0nLCBkZXN0VG9wTWVudWl0ZW0sIGRlc3RFbHQpO1xuICAgIC8vY29uc29sZS5sb2coJ2R0bWlsPScsIGRlc3RUb3BNZW51aXRlbS5sZW5ndGgpO1xuICAgIGhpZGVBbGxUb3BNZW51aXRlbXMoKTtcbiAgICBpZiAoZGVzdFRvcE1lbnVpdGVtICYmIGRlc3RUb3BNZW51aXRlbS5sZW5ndGggIT09IDApIHtcbiAgICAgIHZhciBlbHQgPSBkZXN0VG9wTWVudWl0ZW1bMF07XG4gICAgICB2YXIgZWx0SWQgPSBlbHQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgZGVzdFRvcE1lbnVpdGVtLmNoaWxkcmVuKCd1bC5zdWJtZW51JykuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKS5zaG93KCk7XG4gICAgICBkZXN0VG9wTWVudWl0ZW0uY2hpbGRyZW4oKS5maXJzdCgpLmZpbmQoJ1thcmlhLWV4cGFuZGVkXScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgIH1cbiAgICBpZiAoZGVzdEVsdCkge1xuICAgICAgLy9kZXN0RWx0LmF0dHIoJ3RhYkluZGV4JywgJzAnKS5mb2N1cygpO1xuICAgICAgZGVzdEVsdC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBzaG93aW5nSGVscEtleXMgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBzaG93SGVscEtleXMoKSB7XG4gICAgc2hvd2luZ0hlbHBLZXlzID0gdHJ1ZTtcbiAgICAkKCcjaGVscC1rZXlzJykuZmFkZUluKDEwMCk7XG4gICAgcmVjaXRlSGVscCgpO1xuICB9XG5cbiAgZm9jdXNhYmxlRWx0cy5rZXlkb3duKGZ1bmN0aW9uIChlKSB7XG4gICAgLy9jb25zb2xlLmxvZygnZm9jdXNhYmxlIGVsdCBrZXlkb3duJywgZSk7XG4gICAgdmFyIGtjID0gZS5rZXlDb2RlO1xuICAgIC8vJCh0aGlzKS5ibHVyKCk7IC8vIERlbGV0ZT9cbiAgICB2YXIgd2l0aGluU2Vjb25kVGllclVsID0gdHJ1ZTtcbiAgICB2YXIgdG9wVGllclVsID0gJCh0aGlzKS5jbG9zZXN0KCd1bFtpZD10b3BUaWVyVWxdJyk7XG4gICAgdmFyIHNlY29uZFRpZXJVbCA9ICQodGhpcykuY2xvc2VzdCgndWwuc3VibWVudScpO1xuICAgIGlmIChzZWNvbmRUaWVyVWwubGVuZ3RoID09PSAwKSB7XG4gICAgICB3aXRoaW5TZWNvbmRUaWVyVWwgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGtjID09PSAyNykge1xuICAgICAgLy9jb25zb2xlLmxvZygnZXNjYXBlIHByZXNzZWQgaScpXG4gICAgICAkKCcjaGVscC1rZXlzJykuZmFkZU91dCg1MDApO1xuICAgIH1cbiAgICBpZiAoa2MgPT09IDI3ICYmIHdpdGhpblNlY29uZFRpZXJVbCkgeyAvLyBlc2NhcGVcbiAgICAgIHZhciBkZXN0VG9wTWVudWl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJ2xpLnRvcFRpZXInKTtcbiAgICAgIHZhciBwb3NzRWx0cyA9IGRlc3RUb3BNZW51aXRlbS5maW5kKCcuZm9jdXNhYmxlOm5vdChbZGlzYWJsZWRdKScpLmZpbHRlcignOnZpc2libGUnKTtcbiAgICAgIHN3aXRjaFRvcE1lbnVpdGVtKGRlc3RUb3BNZW51aXRlbSwgcG9zc0VsdHMuZmlyc3QoKSk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0gZWxzZSBpZiAoa2MgPT09IDM5KSB7IC8vIHJpZ2h0YXJyb3dcbiAgICAgIC8vY29uc29sZS5sb2coJ3JpZ2h0YXJyb3cgcHJlc3NlZCcpO1xuICAgICAgdmFyIHNyY1RvcE1lbnVpdGVtID0gJCh0aGlzKS5jbG9zZXN0KCdsaS50b3BUaWVyJyk7XG4gICAgICAvL2NvbnNvbGUubG9nKCdzcmNUb3BNZW51aXRlbT0nLCBzcmNUb3BNZW51aXRlbSk7XG4gICAgICBzcmNUb3BNZW51aXRlbS5jaGlsZHJlbigpLmZpcnN0KCkuZmluZCgnLmZvY3VzYWJsZScpLmF0dHIoJ3RhYkluZGV4JywgJy0xJyk7XG4gICAgICB2YXIgdG9wVGllck1lbnVpdGVtcyA9IGdldFRvcFRpZXJNZW51aXRlbXMoKTtcbiAgICAgIC8vY29uc29sZS5sb2coJ3R0bWkqID0nLCB0b3BUaWVyTWVudWl0ZW1zKTtcbiAgICAgIHZhciB0dG1pTiA9IHRvcFRpZXJNZW51aXRlbXMubGVuZ3RoO1xuICAgICAgdmFyIGogPSB0b3BUaWVyTWVudWl0ZW1zLmluZGV4T2Yoc3JjVG9wTWVudWl0ZW1bMF0pO1xuICAgICAgLy9jb25zb2xlLmxvZygnaiBpbml0aWFsPScsIGopO1xuICAgICAgZm9yICh2YXIgaSA9IChqICsgMSkgJSB0dG1pTjsgaSAhPT0gajsgaSA9IChpICsgMSkgJSB0dG1pTikge1xuICAgICAgICB2YXIgZGVzdFRvcE1lbnVpdGVtID0gJCh0b3BUaWVyTWVudWl0ZW1zW2ldKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZGVzdFRvcE1lbnVpdGVtKGEpPScsIGRlc3RUb3BNZW51aXRlbSk7XG4gICAgICAgIHZhciBwb3NzRWx0cyA9IGRlc3RUb3BNZW51aXRlbS5maW5kKCcuZm9jdXNhYmxlOm5vdChbZGlzYWJsZWRdKScpLmZpbHRlcignOnZpc2libGUnKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygncG9zc0VsdHM9JywgcG9zc0VsdHMpXG4gICAgICAgIGlmIChwb3NzRWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZygnZmluYWwgaT0nLCBpKTtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKCdsYW5kaW5nIG9uJywgcG9zc0VsdHMuZmlyc3QoKSk7XG4gICAgICAgICAgc3dpdGNoVG9wTWVudWl0ZW0oZGVzdFRvcE1lbnVpdGVtLCBwb3NzRWx0cy5maXJzdCgpKTtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChrYyA9PT0gMzcpIHsgLy8gbGVmdGFycm93XG4gICAgICAvL2NvbnNvbGUubG9nKCdsZWZ0YXJyb3cgcHJlc3NlZCcpO1xuICAgICAgdmFyIHNyY1RvcE1lbnVpdGVtID0gJCh0aGlzKS5jbG9zZXN0KCdsaS50b3BUaWVyJyk7XG4gICAgICAvL2NvbnNvbGUubG9nKCdzcmNUb3BNZW51aXRlbT0nLCBzcmNUb3BNZW51aXRlbSk7XG4gICAgICBzcmNUb3BNZW51aXRlbS5jaGlsZHJlbigpLmZpcnN0KCkuZmluZCgnLmZvY3VzYWJsZScpLmF0dHIoJ3RhYkluZGV4JywgJy0xJyk7XG4gICAgICB2YXIgdG9wVGllck1lbnVpdGVtcyA9IGdldFRvcFRpZXJNZW51aXRlbXMoKTtcbiAgICAgIC8vY29uc29sZS5sb2coJ3R0bWkqID0nLCB0b3BUaWVyTWVudWl0ZW1zKTtcbiAgICAgIHZhciB0dG1pTiA9IHRvcFRpZXJNZW51aXRlbXMubGVuZ3RoO1xuICAgICAgdmFyIGogPSB0b3BUaWVyTWVudWl0ZW1zLmluZGV4T2Yoc3JjVG9wTWVudWl0ZW1bMF0pO1xuICAgICAgLy9jb25zb2xlLmxvZygnaiBpbml0aWFsPScsIGopO1xuICAgICAgZm9yICh2YXIgaSA9IChqICsgdHRtaU4gLSAxKSAlIHR0bWlOOyBpICE9PSBqOyBpID0gKGkgKyB0dG1pTiAtIDEpICUgdHRtaU4pIHtcbiAgICAgICAgdmFyIGRlc3RUb3BNZW51aXRlbSA9ICQodG9wVGllck1lbnVpdGVtc1tpXSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2Rlc3RUb3BNZW51aXRlbShiKT0nLCBkZXN0VG9wTWVudWl0ZW0pO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdpPScsIGkpXG4gICAgICAgIHZhciBwb3NzRWx0cyA9IGRlc3RUb3BNZW51aXRlbS5maW5kKCcuZm9jdXNhYmxlOm5vdChbZGlzYWJsZWRdKScpLmZpbHRlcignOnZpc2libGUnKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygncG9zc0VsdHM9JywgcG9zc0VsdHMpXG4gICAgICAgIGlmIChwb3NzRWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZygnZmluYWwgaT0nLCBpKTtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKCdsYW5kaW5nIG9uJywgcG9zc0VsdHMuZmlyc3QoKSk7XG4gICAgICAgICAgc3dpdGNoVG9wTWVudWl0ZW0oZGVzdFRvcE1lbnVpdGVtLCBwb3NzRWx0cy5maXJzdCgpKTtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChrYyA9PT0gMzgpIHsgLy8gdXBhcnJvd1xuICAgICAgLy9jb25zb2xlLmxvZygndXBhcnJvdyBwcmVzc2VkJyk7XG4gICAgICB2YXIgc3VibWVudTtcbiAgICAgIGlmICh3aXRoaW5TZWNvbmRUaWVyVWwpIHtcbiAgICAgICAgdmFyIG5lYXJTaWJzID0gJCh0aGlzKS5jbG9zZXN0KCdkaXYnKS5maW5kKCcuZm9jdXNhYmxlJykuZmlsdGVyKCc6dmlzaWJsZScpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCduZWFyU2licz0nLCBuZWFyU2licyk7XG4gICAgICAgIHZhciBteUlkID0gJCh0aGlzKVswXS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ215SWQ9JywgbXlJZCk7XG4gICAgICAgIHN1Ym1lbnUgPSAkKFtdKTtcbiAgICAgICAgdmFyIHRoaXNFbmNvdW50ZXJlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gbmVhclNpYnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAodGhpc0VuY291bnRlcmVkKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhZGRpbmcnLCBuZWFyU2lic1tpXSk7XG4gICAgICAgICAgICBzdWJtZW51ID0gc3VibWVudS5hZGQoJChuZWFyU2lic1tpXSkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAobmVhclNpYnNbaV0uZ2V0QXR0cmlidXRlKCdpZCcpID09PSBteUlkKSB7XG4gICAgICAgICAgICB0aGlzRW5jb3VudGVyZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKCdzdWJtZW51IHNvIGZhcj0nLCBzdWJtZW51KTtcbiAgICAgICAgdmFyIGZhclNpYnMgPSAkKHRoaXMpLmNsb3Nlc3QoJ2xpJykucHJldkFsbCgpLmZpbmQoJ2Rpdjpub3QoLmRpc2FibGVkKScpXG4gICAgICAgICAgLmZpbmQoJy5mb2N1c2FibGUnKS5maWx0ZXIoJzp2aXNpYmxlJyk7XG4gICAgICAgIHN1Ym1lbnUgPSBzdWJtZW51LmFkZChmYXJTaWJzKTtcbiAgICAgICAgaWYgKHN1Ym1lbnUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgc3VibWVudSA9ICQodGhpcykuY2xvc2VzdCgnbGknKS5jbG9zZXN0KCd1bCcpLmZpbmQoJ2Rpdjpub3QoLmRpc2FibGVkKScpXG4gICAgICAgICAgLmZpbmQoJy5mb2N1c2FibGUnKS5maWx0ZXIoJzp2aXNpYmxlJykubGFzdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdWJtZW51Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzdWJtZW51Lmxhc3QoKS5mb2N1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qXG4gICAgICAgICAgLy9jb25zb2xlLmxvZygnbm8gYWN0aW9uYWJsZSBzdWJtZW51IGZvdW5kJylcbiAgICAgICAgICB2YXIgdG9wbWVudUl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJ3VsLnN1Ym1lbnUnKS5jbG9zZXN0KCdsaScpXG4gICAgICAgICAgLmNoaWxkcmVuKCkuZmlyc3QoKS5maW5kKCcuZm9jdXNhYmxlOm5vdChbZGlzYWJsZWRdKScpLmZpbHRlcignOnZpc2libGUnKTtcbiAgICAgICAgICBpZiAodG9wbWVudUl0ZW0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdG9wbWVudUl0ZW0uZmlyc3QoKS5mb2N1cygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdubyBhY3Rpb25hYmxlIHRvcG1lbnVpdGVtIGZvdW5kIGVpdGhlcicpXG4gICAgICAgICAgfVxuICAgICAgICAgICovXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSBlbHNlIGlmIChrYyA9PT0gNDApIHsgLy8gZG93bmFycm93XG4gICAgICAvL2NvbnNvbGUubG9nKCdkb3duYXJyb3cgcHJlc3NlZCcpO1xuICAgICAgdmFyIHN1Ym1lbnVEaXZzO1xuICAgICAgdmFyIHN1Ym1lbnU7XG4gICAgICBpZiAoIXdpdGhpblNlY29uZFRpZXJVbCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCcxc3QgdGllcicpXG4gICAgICAgIHN1Ym1lbnVEaXZzID0gJCh0aGlzKS5jbG9zZXN0KCdsaScpLmNoaWxkcmVuKCd1bCcpLmZpbmQoJ2Rpdjpub3QoLmRpc2FibGVkKScpO1xuICAgICAgICBzdWJtZW51ID0gc3VibWVudURpdnMuZmluZCgnLmZvY3VzYWJsZScpLmZpbHRlcignOnZpc2libGUnKTtcbiAgICAgICAgaW5zZXJ0QXJpYVBvcyhzdWJtZW51KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJzJuZCB0aWVyJylcbiAgICAgICAgdmFyIG5lYXJTaWJzID0gJCh0aGlzKS5jbG9zZXN0KCdkaXYnKS5maW5kKCcuZm9jdXNhYmxlJykuZmlsdGVyKCc6dmlzaWJsZScpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCduZWFyU2licz0nLCBuZWFyU2licyk7XG4gICAgICAgIHZhciBteUlkID0gJCh0aGlzKVswXS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ215SWQ9JywgbXlJZCk7XG4gICAgICAgIHN1Ym1lbnUgPSAkKFtdKTtcbiAgICAgICAgdmFyIHRoaXNFbmNvdW50ZXJlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5lYXJTaWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXNFbmNvdW50ZXJlZCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYWRkaW5nJywgbmVhclNpYnNbaV0pO1xuICAgICAgICAgICAgc3VibWVudSA9IHN1Ym1lbnUuYWRkKCQobmVhclNpYnNbaV0pKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG5lYXJTaWJzW2ldLmdldEF0dHJpYnV0ZSgnaWQnKSA9PT0gbXlJZCkge1xuICAgICAgICAgICAgdGhpc0VuY291bnRlcmVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZygnc3VibWVudSBzbyBmYXI9Jywgc3VibWVudSk7XG4gICAgICAgIHZhciBmYXJTaWJzID0gJCh0aGlzKS5jbG9zZXN0KCdsaScpLm5leHRBbGwoKS5maW5kKCdkaXY6bm90KC5kaXNhYmxlZCknKVxuICAgICAgICAgIC5maW5kKCcuZm9jdXNhYmxlJykuZmlsdGVyKCc6dmlzaWJsZScpO1xuICAgICAgICBzdWJtZW51ID0gc3VibWVudS5hZGQoZmFyU2licyk7XG4gICAgICAgIGlmIChzdWJtZW51Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHN1Ym1lbnUgPSAkKHRoaXMpLmNsb3Nlc3QoJ2xpJykuY2xvc2VzdCgndWwnKS5maW5kKCdkaXY6bm90KC5kaXNhYmxlZCknKVxuICAgICAgICAgICAgLmZpbmQoJy5mb2N1c2FibGUnKS5maWx0ZXIoJzp2aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vY29uc29sZS5sb2coJ3N1Ym1lbnU9Jywgc3VibWVudSlcbiAgICAgIGlmIChzdWJtZW51Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgc3VibWVudS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdubyBhY3Rpb25hYmxlIHN1Ym1lbnUgZm91bmQnKVxuICAgICAgfVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9IGVsc2UgaWYgKGtjID09PSAyNykge1xuICAgICAgLy9jb25zb2xlLmxvZygnZXNjIHByZXNzZWQnKTtcbiAgICAgIGhpZGVBbGxUb3BNZW51aXRlbXMoKTtcbiAgICAgIGlmIChzaG93aW5nSGVscEtleXMpIHtcbiAgICAgICAgc2hvd2luZ0hlbHBLZXlzID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdjYWxsaW5nIGN5Y2xlRm9jdXMgaWknKVxuICAgICAgICBDUE8uY3ljbGVGb2N1cygpO1xuICAgICAgfVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vJCh0aGlzKS5jbG9zZXN0KCduYXYnKS5jbG9zZXN0KCdtYWluJykuZm9jdXMoKTtcbiAgICB9IGVsc2UgaWYgKGtjID09PSA5ICkge1xuICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgaGlkZUFsbFRvcE1lbnVpdGVtcygpO1xuICAgICAgICBDUE8uY3ljbGVGb2N1cyh0cnVlKTtcbiAgICAgIH1cbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSBlbHNlIGlmIChrYyA9PT0gMTMgfHwga2MgPT09IDE3IHx8IGtjID09PSAyMCB8fCBrYyA9PT0gMzIpIHtcbiAgICAgIC8vIDEzPWVudGVyIDE3PWN0cmwgMjA9Y2Fwc2xvY2sgMzI9c3BhY2VcbiAgICAgIC8vY29uc29sZS5sb2coJ3N0b3Bwcm9wIDEnKVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9IGVsc2UgaWYgKGtjID49IDExMiAmJiBrYyA8PSAxMjMpIHtcbiAgICAgIC8vY29uc29sZS5sb2coJ2RvcHJvcCAxJylcbiAgICAgIC8vIGZuIGtleXNcbiAgICAgIC8vIGdvIGFoZWFkLCBwcm9wYWdhdGVcbiAgICB9IGVsc2UgaWYgKGUuY3RybEtleSAmJiBrYyA9PT0gMTkxKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKCdDLT8gcHJlc3NlZCcpXG4gICAgICBzaG93SGVscEtleXMoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vY29uc29sZS5sb2coJ3N0b3Bwcm9wIDInKVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gICAgLy9lLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBzaGFyZUFQSS5tYWtlSG92ZXJNZW51KCQoXCIjZmlsZW1lbnVcIiksICQoXCIjZmlsZW1lbnVDb250ZW50c1wiKSwgZmFsc2UsIGZ1bmN0aW9uKCl7fSk7XG4gIC8vIHNoYXJlQVBJLm1ha2VIb3Zlck1lbnUoJChcIiNib25uaWVtZW51XCIpLCAkKFwiI2Jvbm5pZW1lbnVDb250ZW50c1wiKSwgZmFsc2UsIGZ1bmN0aW9uKCl7fSk7XG5cblxuICB2YXIgY29kZUNvbnRhaW5lciA9ICQoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcInJlcGxNYWluXCIpO1xuICBjb2RlQ29udGFpbmVyLmF0dHIoXCJyb2xlXCIsIFwicmVnaW9uXCIpLlxuICAgIGF0dHIoXCJhcmlhLWxhYmVsXCIsIFwiRGVmaW5pdGlvbnNcIik7XG4gICAgLy9hdHRyKFwidGFiSW5kZXhcIiwgXCItMVwiKTtcbiAgJChcIiNtYWluXCIpLnByZXBlbmQoY29kZUNvbnRhaW5lcik7XG5cbiAgQ1BPLmVkaXRvciA9IENQTy5tYWtlRWRpdG9yKGNvZGVDb250YWluZXIsIHtcbiAgICBydW5CdXR0b246ICQoXCIjcnVuQnV0dG9uXCIpLFxuICAgIHNpbXBsZUVkaXRvcjogZmFsc2UsXG4gICAgcnVuOiBDUE8uUlVOX0NPREUsXG4gICAgaW5pdGlhbEdhczogMTAwXG4gIH0pO1xuICBDUE8uZWRpdG9yLmNtLnNldE9wdGlvbihcInJlYWRPbmx5XCIsIFwibm9jdXJzb3JcIik7XG4gIENQTy5lZGl0b3IuY20uc2V0T3B0aW9uKFwibG9uZ0xpbmVzXCIsIG5ldyBNYXAoKSk7XG4gIGZ1bmN0aW9uIHJlbW92ZVNob3J0ZW5lZExpbmUobGluZUhhbmRsZSkge1xuICAgIHZhciBydWxlcnMgPSBDUE8uZWRpdG9yLmNtLmdldE9wdGlvbihcInJ1bGVyc1wiKTtcbiAgICB2YXIgcnVsZXJzTWluQ29sID0gQ1BPLmVkaXRvci5jbS5nZXRPcHRpb24oXCJydWxlcnNNaW5Db2xcIik7XG4gICAgdmFyIGxvbmdMaW5lcyA9IENQTy5lZGl0b3IuY20uZ2V0T3B0aW9uKFwibG9uZ0xpbmVzXCIpO1xuICAgIGlmIChsaW5lSGFuZGxlLnRleHQubGVuZ3RoIDw9IHJ1bGVyc01pbkNvbCkge1xuICAgICAgbGluZUhhbmRsZS5ydWxlckxpc3RlbmVycy5mb3JFYWNoKChmLCBldnQpID0+IGxpbmVIYW5kbGUub2ZmKGV2dCwgZikpO1xuICAgICAgbG9uZ0xpbmVzLmRlbGV0ZShsaW5lSGFuZGxlKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiUmVtb3ZlZCBcIiwgbGluZUhhbmRsZSk7XG4gICAgICByZWZyZXNoUnVsZXJzKCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGRlbGV0ZUxpbmUobGluZUhhbmRsZSkge1xuICAgIHZhciBsb25nTGluZXMgPSBDUE8uZWRpdG9yLmNtLmdldE9wdGlvbihcImxvbmdMaW5lc1wiKTtcbiAgICBsaW5lSGFuZGxlLnJ1bGVyTGlzdGVuZXJzLmZvckVhY2goKGYsIGV2dCkgPT4gbGluZUhhbmRsZS5vZmYoZXZ0LCBmKSk7XG4gICAgbG9uZ0xpbmVzLmRlbGV0ZShsaW5lSGFuZGxlKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlJlbW92ZWQgXCIsIGxpbmVIYW5kbGUpO1xuICAgIHJlZnJlc2hSdWxlcnMoKTtcbiAgfVxuICBmdW5jdGlvbiByZWZyZXNoUnVsZXJzKCkge1xuICAgIHZhciBydWxlcnMgPSBDUE8uZWRpdG9yLmNtLmdldE9wdGlvbihcInJ1bGVyc1wiKTtcbiAgICB2YXIgbG9uZ0xpbmVzID0gQ1BPLmVkaXRvci5jbS5nZXRPcHRpb24oXCJsb25nTGluZXNcIik7XG4gICAgdmFyIG1pbkxlbmd0aDtcbiAgICBpZiAobG9uZ0xpbmVzLnNpemUgPT09IDApIHtcbiAgICAgIG1pbkxlbmd0aCA9IDA7IC8vIGlmIHRoZXJlIGFyZSBubyBsb25nIGxpbmVzLCB0aGVuIHdlIGRvbid0IGNhcmUgYWJvdXQgc2hvd2luZyBhbnkgcnVsZXJzXG4gICAgfSBlbHNlIHtcbiAgICAgIG1pbkxlbmd0aCA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICBsb25nTGluZXMuZm9yRWFjaChmdW5jdGlvbihsaW5lTm8sIGxpbmVIYW5kbGUpIHtcbiAgICAgICAgaWYgKGxpbmVIYW5kbGUudGV4dC5sZW5ndGggPCBtaW5MZW5ndGgpIHsgbWluTGVuZ3RoID0gbGluZUhhbmRsZS50ZXh0Lmxlbmd0aDsgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocnVsZXJzW2ldLmNvbHVtbiA+PSBtaW5MZW5ndGgpIHtcbiAgICAgICAgcnVsZXJzW2ldLmNsYXNzTmFtZSA9IFwiaGlkZGVuXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBydWxlcnNbaV0uY2xhc3NOYW1lID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBnb3R0YSBzZXQgdGhlIG9wdGlvbiB0d2ljZSwgb3IgZWxzZSBDTSBzaG9ydC1jaXJjdWl0cyBhbmQgaWdub3JlcyBpdFxuICAgIENQTy5lZGl0b3IuY20uc2V0T3B0aW9uKFwicnVsZXJzXCIsIHVuZGVmaW5lZCk7XG4gICAgQ1BPLmVkaXRvci5jbS5zZXRPcHRpb24oXCJydWxlcnNcIiwgcnVsZXJzKTtcbiAgfVxuICBDUE8uZWRpdG9yLmNtLm9uKCdjaGFuZ2VzJywgZnVuY3Rpb24oaW5zdGFuY2UsIGNoYW5nZU9ianMpIHtcbiAgICB2YXIgbWluTGluZSA9IGluc3RhbmNlLmxhc3RMaW5lKCksIG1heExpbmUgPSAwO1xuICAgIHZhciBydWxlcnNNaW5Db2wgPSBpbnN0YW5jZS5nZXRPcHRpb24oXCJydWxlcnNNaW5Db2xcIik7XG4gICAgdmFyIGxvbmdMaW5lcyA9IGluc3RhbmNlLmdldE9wdGlvbihcImxvbmdMaW5lc1wiKTtcbiAgICBjaGFuZ2VPYmpzLmZvckVhY2goZnVuY3Rpb24oY2hhbmdlKSB7XG4gICAgICBpZiAobWluTGluZSA+IGNoYW5nZS5mcm9tLmxpbmUpIHsgbWluTGluZSA9IGNoYW5nZS5mcm9tLmxpbmU7IH1cbiAgICAgIGlmIChtYXhMaW5lIDwgY2hhbmdlLmZyb20ubGluZSArIGNoYW5nZS50ZXh0Lmxlbmd0aCkgeyBtYXhMaW5lID0gY2hhbmdlLmZyb20ubGluZSArIGNoYW5nZS50ZXh0Lmxlbmd0aDsgfVxuICAgIH0pO1xuICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgaW5zdGFuY2UuZWFjaExpbmUobWluTGluZSwgbWF4TGluZSwgZnVuY3Rpb24obGluZUhhbmRsZSkge1xuICAgICAgaWYgKGxpbmVIYW5kbGUudGV4dC5sZW5ndGggPiBydWxlcnNNaW5Db2wpIHtcbiAgICAgICAgaWYgKCFsb25nTGluZXMuaGFzKGxpbmVIYW5kbGUpKSB7XG4gICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgbG9uZ0xpbmVzLnNldChsaW5lSGFuZGxlLCBsaW5lSGFuZGxlLmxpbmVObygpKTtcbiAgICAgICAgICBsaW5lSGFuZGxlLnJ1bGVyTGlzdGVuZXJzID0gbmV3IE1hcChbXG4gICAgICAgICAgICBbXCJjaGFuZ2VcIiwgcmVtb3ZlU2hvcnRlbmVkTGluZV0sXG4gICAgICAgICAgICBbXCJkZWxldGVcIiwgZnVuY3Rpb24oKSB7IC8vIG5lZWRlZCBiZWNhdXNlIHRoZSBkZWxldGUgaGFuZGxlciBnZXRzIG5vIGFyZ3VtZW50cyBhdCBhbGxcbiAgICAgICAgICAgICAgZGVsZXRlTGluZShsaW5lSGFuZGxlKTtcbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgbGluZUhhbmRsZS5ydWxlckxpc3RlbmVycy5mb3JFYWNoKChmLCBldnQpID0+IGxpbmVIYW5kbGUub24oZXZ0LCBmKSk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJBZGRlZCBcIiwgbGluZUhhbmRsZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsb25nTGluZXMuaGFzKGxpbmVIYW5kbGUpKSB7XG4gICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgbG9uZ0xpbmVzLmRlbGV0ZShsaW5lSGFuZGxlKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlJlbW92ZWQgXCIsIGxpbmVIYW5kbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgIHJlZnJlc2hSdWxlcnMoKTtcbiAgICB9XG4gIH0pO1xuXG4gIHByb2dyYW1Mb2FkZWQudGhlbihmdW5jdGlvbihjKSB7XG4gICAgQ1BPLmRvY3VtZW50cy5zZXQoXCJkZWZpbml0aW9uczovL1wiLCBDUE8uZWRpdG9yLmNtLmdldERvYygpKTtcblxuICAgIC8vIE5PVEUoam9lKTogQ2xlYXJpbmcgaGlzdG9yeSB0byBhZGRyZXNzIGh0dHBzOi8vZ2l0aHViLmNvbS9icm93bnBsdC9weXJldC1sYW5nL2lzc3Vlcy8zODYsXG4gICAgLy8gaW4gd2hpY2ggdW5kbyBjYW4gcmV2ZXJ0IHRoZSBwcm9ncmFtIGJhY2sgdG8gZW1wdHlcbiAgICBDUE8uZWRpdG9yLmNtLmNsZWFySGlzdG9yeSgpO1xuICAgIENQTy5lZGl0b3IuY20uc2V0VmFsdWUoYyk7XG4gIH0pO1xuXG4gIHByb2dyYW1Mb2FkZWQuZmFpbChmdW5jdGlvbigpIHtcbiAgICBDUE8uZG9jdW1lbnRzLnNldChcImRlZmluaXRpb25zOi8vXCIsIENQTy5lZGl0b3IuY20uZ2V0RG9jKCkpO1xuICB9KTtcblxuICB2YXIgcHlyZXRMb2FkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gIGNvbnNvbGUubG9nKHByb2Nlc3MuZW52LlBZUkVUKTtcbiAgcHlyZXRMb2FkLnNyYyA9IHByb2Nlc3MuZW52LlBZUkVUO1xuICBweXJldExvYWQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocHlyZXRMb2FkKTtcblxuICB2YXIgcHlyZXRMb2FkMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gIGZ1bmN0aW9uIGxvZ0ZhaWx1cmVBbmRNYW51YWxGZXRjaCh1cmwsIGUpIHtcblxuICAgIC8vIE5PVEUoam9lKTogVGhlIGVycm9yIHJlcG9ydGVkIGJ5IHRoZSBcImVycm9yXCIgZXZlbnQgaGFzIGVzc2VudGlhbGx5IG5vXG4gICAgLy8gaW5mb3JtYXRpb24gb24gaXQ7IGl0J3MganVzdCBhIG5vdGlmaWNhdGlvbiB0aGF0IF9zb21ldGhpbmdfIHdlbnQgd3JvbmcuXG4gICAgLy8gU28sIHdlIGxvZyB0aGF0IHNvbWV0aGluZyBoYXBwZW5lZCwgdGhlbiBpbW1lZGlhdGVseSBkbyBhbiBBSkFYIHJlcXVlc3RcbiAgICAvLyBjYWxsIGZvciB0aGUgc2FtZSBVUkwsIHRvIHNlZSBpZiB3ZSBjYW4gZ2V0IG1vcmUgaW5mb3JtYXRpb24uIFRoaXNcbiAgICAvLyBkb2Vzbid0IHBlcmZlY3RseSB0ZWxsIHVzIGFib3V0IHRoZSBvcmlnaW5hbCBmYWlsdXJlLCBidXQgaXQnc1xuICAgIC8vIHNvbWV0aGluZy5cblxuICAgIC8vIEluIGFkZGl0aW9uLCBpZiBzb21lb25lIGlzIHNlZWluZyB0aGUgUHlyZXQgZmFpbGVkIHRvIGxvYWQgZXJyb3IsIGJ1dCB3ZVxuICAgIC8vIGRvbid0IGdldCB0aGVzZSBsb2dnaW5nIGV2ZW50cywgd2UgaGF2ZSBhIHN0cm9uZyBoaW50IHRoYXQgc29tZXRoaW5nIGlzXG4gICAgLy8gdXAgd2l0aCB0aGVpciBuZXR3b3JrLlxuICAgIGxvZ2dlci5sb2coJ3B5cmV0LWxvYWQtZmFpbHVyZScsXG4gICAgICB7XG4gICAgICAgIGV2ZW50IDogJ2luaXRpYWwtZmFpbHVyZScsXG4gICAgICAgIHVybCA6IHVybCxcblxuICAgICAgICAvLyBUaGUgdGltZXN0YW1wIGFwcGVhcnMgdG8gY291bnQgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHBhZ2UgbG9hZCxcbiAgICAgICAgLy8gd2hpY2ggbWF5IGFwcHJveGltYXRlIGRvd25sb2FkIHRpbWUgaWYsIHNheSwgcmVxdWVzdHMgYXJlIHRpbWluZyBvdXRcbiAgICAgICAgLy8gb3IgZ2V0dGluZyBjdXQgb2ZmLlxuXG4gICAgICAgIHRpbWVTdGFtcCA6IGUudGltZVN0YW1wXG4gICAgICB9KTtcblxuICAgIHZhciBtYW51YWxGZXRjaCA9ICQuYWpheCh1cmwpO1xuICAgIG1hbnVhbEZldGNoLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAvLyBIZXJlLCB3ZSBsb2cgdGhlIGZpcnN0IDEwMCBjaGFyYWN0ZXJzIG9mIHRoZSByZXNwb25zZSB0byBtYWtlIHN1cmVcbiAgICAgIC8vIHRoZXkgcmVzZW1ibGUgdGhlIFB5cmV0IGJsb2JcbiAgICAgIGxvZ2dlci5sb2coJ3B5cmV0LWxvYWQtZmFpbHVyZScsIHtcbiAgICAgICAgZXZlbnQgOiAnc3VjY2Vzcy13aXRoLWFqYXgnLFxuICAgICAgICBjb250ZW50c1ByZWZpeCA6IHJlcy5zbGljZSgwLCAxMDApXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBtYW51YWxGZXRjaC5mYWlsKGZ1bmN0aW9uKHJlcykge1xuICAgICAgbG9nZ2VyLmxvZygncHlyZXQtbG9hZC1mYWlsdXJlJywge1xuICAgICAgICBldmVudCA6ICdmYWlsdXJlLXdpdGgtYWpheCcsXG4gICAgICAgIHN0YXR1czogcmVzLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVzLnN0YXR1c1RleHQsXG4gICAgICAgIC8vIFNpbmNlIHJlc3BvbnNlVGV4dCBjb3VsZCBiZSBhIGxvbmcgZXJyb3IgcGFnZSwgYW5kIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gbG9nIGh1Z2UgcGFnZXMsIHdlIHNsaWNlIGl0IHRvIDEwMCBjaGFyYWN0ZXJzLCB3aGljaCBpcyBlbm91Z2ggdG9cbiAgICAgICAgLy8gdGVsbCB1cyB3aGF0J3MgZ29pbmcgb24gKGUuZy4gQVdTIGZhaWx1cmUsIG5ldHdvcmsgb3V0YWdlKS5cbiAgICAgICAgcmVzcG9uc2VUZXh0OiByZXMucmVzcG9uc2VUZXh0LnNsaWNlKDAsIDEwMClcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgJChweXJldExvYWQpLm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24oZSkge1xuICAgIGxvZ0ZhaWx1cmVBbmRNYW51YWxGZXRjaChwYXRoLCBlKTtcbiAgICBjb25zb2xlLmxvZyhwcm9jZXNzLmVudik7XG4gICAgcHlyZXRMb2FkMi5zcmMgPSBwcm9jZXNzLmVudi5QWVJFVF9CQUNLVVA7XG4gICAgcHlyZXRMb2FkMi50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHB5cmV0TG9hZDIpO1xuICB9KTtcblxuICAkKHB5cmV0TG9hZDIpLm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24oZSkge1xuICAgICQoXCIjbG9hZGVyXCIpLmhpZGUoKTtcbiAgICAkKFwiI3J1blBhcnRcIikuaGlkZSgpO1xuICAgICQoXCIjYnJlYWtCdXR0b25cIikuaGlkZSgpO1xuICAgIHdpbmRvdy5zdGlja0Vycm9yKFwiUHlyZXQgZmFpbGVkIHRvIGxvYWQ7IGNoZWNrIHlvdXIgY29ubmVjdGlvbiBvciB0cnkgcmVmcmVzaGluZyB0aGUgcGFnZS4gIElmIHRoaXMgaGFwcGVucyByZXBlYXRlZGx5LCBwbGVhc2UgcmVwb3J0IGl0IGFzIGEgYnVnLlwiKTtcbiAgICBsb2dGYWlsdXJlQW5kTWFudWFsRmV0Y2gocHJvY2Vzcy5lbnYuUFlSRVRfQkFDS1VQLCBlKTtcblxuICB9KTtcblxuICBwcm9ncmFtTG9hZGVkLmZpbihmdW5jdGlvbigpIHtcbiAgICBDUE8uZWRpdG9yLmZvY3VzKCk7XG4gICAgQ1BPLmVkaXRvci5jbS5zZXRPcHRpb24oXCJyZWFkT25seVwiLCBmYWxzZSk7XG4gIH0pO1xuXG4gIENQTy5hdXRvU2F2ZSA9IGF1dG9TYXZlO1xuICBDUE8uc2F2ZSA9IHNhdmU7XG4gIENQTy51cGRhdGVOYW1lID0gdXBkYXRlTmFtZTtcbiAgQ1BPLnNob3dTaGFyZUNvbnRhaW5lciA9IHNob3dTaGFyZUNvbnRhaW5lcjtcbiAgQ1BPLmxvYWRQcm9ncmFtID0gbG9hZFByb2dyYW07XG4gIENQTy5jeWNsZUZvY3VzID0gY3ljbGVGb2N1cztcbiAgQ1BPLnNheSA9IHNheTtcbiAgQ1BPLnNheUFuZEZvcmdldCA9IHNheUFuZEZvcmdldDtcblxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvd2ViL2pzL2JlZm9yZVB5cmV0LmpzIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBDb3B5cmlnaHQgMjAxMy0yMDE0IEtldmluIENveFxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiogIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkICAgICAgICAgICAqXG4qICB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXMgICAgICAgKlxuKiAgYXJpc2luZyBmcm9tIHRoZSB1c2Ugb2YgdGhpcyBzb2Z0d2FyZS4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4qICBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gYW55b25lIHRvIHVzZSB0aGlzIHNvZnR3YXJlIGZvciBhbnkgcHVycG9zZSwgICAgICAgKlxuKiAgaW5jbHVkaW5nIGNvbW1lcmNpYWwgYXBwbGljYXRpb25zLCBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdCAgICAgICpcbiogIGZyZWVseSwgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIHJlc3RyaWN0aW9uczogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuKiAgMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3QgICAgICpcbiogICAgIGNsYWltIHRoYXQgeW91IHdyb3RlIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS4gSWYgeW91IHVzZSB0aGlzIHNvZnR3YXJlIGluICAqXG4qICAgICBhIHByb2R1Y3QsIGFuIGFja25vd2xlZGdtZW50IGluIHRoZSBwcm9kdWN0IGRvY3VtZW50YXRpb24gd291bGQgYmUgICAgICAgKlxuKiAgICAgYXBwcmVjaWF0ZWQgYnV0IGlzIG5vdCByZXF1aXJlZC4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4qICAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZSAgKlxuKiAgICAgbWlzcmVwcmVzZW50ZWQgYXMgYmVpbmcgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4qICAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLiAgKlxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbitmdW5jdGlvbigpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhcnJheSA9IC9cXFsoW15cXFtdKilcXF0kLztcblxuLy8vIFVSTCBSZWdleC5cbi8qKlxuICogVGhpcyByZWdleCBzcGxpdHMgdGhlIFVSTCBpbnRvIHBhcnRzLiAgVGhlIGNhcHR1cmUgZ3JvdXBzIGNhdGNoIHRoZSBpbXBvcnRhbnRcbiAqIGJpdHMuXG4gKiBcbiAqIEVhY2ggc2VjdGlvbiBpcyBvcHRpb25hbCwgc28gdG8gd29yayBvbiBhbnkgcGFydCBmaW5kIHRoZSBjb3JyZWN0IHRvcCBsZXZlbFxuICogYCguLi4pP2AgYW5kIG1lc3MgYXJvdW5kIHdpdGggaXQuXG4gKi9cbnZhciByZWdleCA9IC9eKD86KFthLXpdKik6KT8oPzpcXC9cXC8pPyg/OihbXjpAXSopKD86OihbXkBdKikpP0ApPyhbYS16LS5fXSspPyg/OjooWzAtOV0qKSk/KFxcL1tePyNdKik/KD86XFw/KFteI10qKSk/KD86IyguKikpPyQvaTtcbi8vICAgICAgICAgICAgICAgMSAtIHNjaGVtZSAgICAgICAgICAgICAgICAyIC0gdXNlciAgICAzID0gcGFzcyA0IC0gaG9zdCAgICAgICAgNSAtIHBvcnQgIDYgLSBwYXRoICAgICAgICA3IC0gcXVlcnkgICAgOCAtIGhhc2hcblxudmFyIG5vc2xhc2ggPSBbXCJtYWlsdG9cIixcImJpdGNvaW5cIl07XG5cbnZhciBzZWxmID0ge1xuXHQvKiogUGFyc2UgYSBxdWVyeSBzdHJpbmcuXG5cdCAqXG5cdCAqIFRoaXMgZnVuY3Rpb24gcGFyc2VzIGEgcXVlcnkgc3RyaW5nIChzb21ldGltZXMgY2FsbGVkIHRoZSBzZWFyY2hcblx0ICogc3RyaW5nKS4gIEl0IHRha2VzIGEgcXVlcnkgc3RyaW5nIGFuZCByZXR1cm5zIGEgbWFwIG9mIHRoZSByZXN1bHRzLlxuXHQgKlxuXHQgKiBLZXlzIGFyZSBjb25zaWRlcmVkIHRvIGJlIGV2ZXJ5dGhpbmcgdXAgdG8gdGhlIGZpcnN0ICc9JyBhbmQgdmFsdWVzIGFyZVxuXHQgKiBldmVyeXRoaW5nIGFmdGVyd29yZHMuICBTaW5jZSBVUkwtZGVjb2RpbmcgaXMgZG9uZSBhZnRlciBwYXJzaW5nLCBrZXlzXG5cdCAqIGFuZCB2YWx1ZXMgY2FuIGhhdmUgYW55IHZhbHVlcywgaG93ZXZlciwgJz0nIGhhdmUgdG8gYmUgZW5jb2RlZCBpbiBrZXlzXG5cdCAqIHdoaWxlICc/JyBhbmQgJyYnIGhhdmUgdG8gYmUgZW5jb2RlZCBhbnl3aGVyZSAoYXMgdGhleSBkZWxpbWl0IHRoZVxuXHQgKiBrdi1wYWlycykuXG5cdCAqXG5cdCAqIEtleXMgYW5kIHZhbHVlcyB3aWxsIGFsd2F5cyBiZSBzdHJpbmdzLCBleGNlcHQgaWYgdGhlcmUgaXMgYSBrZXkgd2l0aCBub1xuXHQgKiAnPScgaW4gd2hpY2ggY2FzZSBpdCB3aWxsIGJlIGNvbnNpZGVyZWQgYSBmbGFnIGFuZCB3aWxsIGJlIHNldCB0byB0cnVlLlxuXHQgKiBMYXRlciB2YWx1ZXMgd2lsbCBvdmVycmlkZSBlYXJsaWVyIHZhbHVlcy5cblx0ICpcblx0ICogQXJyYXkga2V5cyBhcmUgYWxzbyBzdXBwb3J0ZWQuICBCeSBkZWZhdWx0IGtleXMgaW4gdGhlIGZvcm0gb2YgYG5hbWVbaV1gXG5cdCAqIHdpbGwgYmUgcmV0dXJuZWQgbGlrZSB0aGF0IGFzIHN0cmluZ3MuICBIb3dldmVyLCBpZiB5b3Ugc2V0IHRoZSBgYXJyYXlgXG5cdCAqIGZsYWcgaW4gdGhlIG9wdGlvbnMgb2JqZWN0IHRoZXkgd2lsbCBiZSBwYXJzZWQgaW50byBhcnJheXMuICBOb3RlIHRoYXRcblx0ICogYWx0aG91Z2ggdGhlIG9iamVjdCByZXR1cm5lZCBpcyBhbiBgQXJyYXlgIG9iamVjdCBhbGwga2V5cyB3aWxsIGJlXG5cdCAqIHdyaXR0ZW4gdG8gaXQuICBUaGlzIG1lYW5zIHRoYXQgaWYgeW91IGhhdmUgYSBrZXkgc3VjaCBhcyBga1tmb3JFYWNoXWBcblx0ICogaXQgd2lsbCBvdmVyd3JpdGUgdGhlIGBmb3JFYWNoYCBmdW5jdGlvbiBvbiB0aGF0IGFycmF5LiAgQWxzbyBub3RlIHRoYXRcblx0ICogc3RyaW5nIHByb3BlcnRpZXMgYWx3YXlzIHRha2UgcHJlY2VkZW5jZSBvdmVyIGFycmF5IHByb3BlcnRpZXMsXG5cdCAqIGlycmVzcGVjdGl2ZSBvZiB3aGVyZSB0aGV5IGFyZSBpbiB0aGUgcXVlcnkgc3RyaW5nLlxuXHQgKlxuXHQgKiAgIHVybC5nZXQoXCJhcnJheVsxXT10ZXN0JmFycmF5W2Zvb109YmFyXCIse2FycmF5OnRydWV9KS5hcnJheVsxXSAgPT09IFwidGVzdFwiXG5cdCAqICAgdXJsLmdldChcImFycmF5WzFdPXRlc3QmYXJyYXlbZm9vXT1iYXJcIix7YXJyYXk6dHJ1ZX0pLmFycmF5LmZvbyA9PT0gXCJiYXJcIlxuXHQgKiAgIHVybC5nZXQoXCJhcnJheT1ub3RhbmFycmF5JmFycmF5WzBdPTFcIix7YXJyYXk6dHJ1ZX0pLmFycmF5ICAgICAgPT09IFwibm90YW5hcnJheVwiXG5cdCAqXG5cdCAqIElmIGFycmF5IHBhcnNpbmcgaXMgZW5hYmxlZCBrZXlzIGluIHRoZSBmb3JtIG9mIGBuYW1lW11gIHdpbGxcblx0ICogYXV0b21hdGljYWxseSBiZSBnaXZlbiB0aGUgbmV4dCBhdmFpbGFibGUgaW5kZXguICBOb3RlIHRoYXQgdGhpcyBjYW4gYmVcblx0ICogb3ZlcndyaXR0ZW4gd2l0aCBsYXRlciB2YWx1ZXMgaW4gdGhlIHF1ZXJ5IHN0cmluZy4gIEZvciB0aGlzIHJlYXNvbiBpc1xuXHQgKiBpcyBiZXN0IG5vdCB0byBtaXggdGhlIHR3byBmb3JtYXRzLCBhbHRob3VnaCBpdCBpcyBzYWZlIChhbmQgb2Z0ZW5cblx0ICogdXNlZnVsKSB0byBhZGQgYW4gYXV0b21hdGljIGluZGV4IGFyZ3VtZW50IHRvIHRoZSBlbmQgb2YgYSBxdWVyeSBzdHJpbmcuXG5cdCAqXG5cdCAqICAgdXJsLmdldChcImFbXT0wJmFbXT0xJmFbMF09MlwiLCB7YXJyYXk6dHJ1ZX0pICAtPiB7YTpbXCIyXCIsXCIxXCJdfTtcblx0ICogICB1cmwuZ2V0KFwiYVswXT0wJmFbMV09MSZhW109MlwiLCB7YXJyYXk6dHJ1ZX0pIC0+IHthOltcIjBcIixcIjFcIixcIjJcIl19O1xuXHQgKlxuXHQgKiBAcGFyYW17c3RyaW5nfSBxIFRoZSBxdWVyeSBzdHJpbmcgKHRoZSBwYXJ0IGFmdGVyIHRoZSAnPycpLlxuXHQgKiBAcGFyYW17e2Z1bGw6Ym9vbGVhbixhcnJheTpib29sZWFufT19IG9wdCBPcHRpb25zLlxuXHQgKlxuXHQgKiAtIGZ1bGw6IElmIHNldCBgcWAgd2lsbCBiZSB0cmVhdGVkIGFzIGEgZnVsbCB1cmwgYW5kIGBxYCB3aWxsIGJlIGJ1aWx0LlxuXHQgKiAgIGJ5IGNhbGxpbmcgI3BhcnNlIHRvIHJldHJpZXZlIHRoZSBxdWVyeSBwb3J0aW9uLlxuXHQgKiAtIGFycmF5OiBJZiBzZXQga2V5cyBpbiB0aGUgZm9ybSBvZiBga2V5W2ldYCB3aWxsIGJlIHRyZWF0ZWRcblx0ICogICBhcyBhcnJheXMvbWFwcy5cblx0ICpcblx0ICogQHJldHVybnshT2JqZWN0LjxzdHJpbmcsIHN0cmluZ3xBcnJheT59IFRoZSBwYXJzZWQgcmVzdWx0LlxuXHQgKi9cblx0XCJnZXRcIjogZnVuY3Rpb24ocSwgb3B0KXtcblx0XHRxID0gcSB8fCBcIlwiO1xuXHRcdGlmICggdHlwZW9mIG9wdCAgICAgICAgICA9PSBcInVuZGVmaW5lZFwiICkgb3B0ID0ge307XG5cdFx0aWYgKCB0eXBlb2Ygb3B0W1wiZnVsbFwiXSAgPT0gXCJ1bmRlZmluZWRcIiApIG9wdFtcImZ1bGxcIl0gPSBmYWxzZTtcblx0XHRpZiAoIHR5cGVvZiBvcHRbXCJhcnJheVwiXSA9PSBcInVuZGVmaW5lZFwiICkgb3B0W1wiYXJyYXlcIl0gPSBmYWxzZTtcblx0XHRcblx0XHRpZiAoIG9wdFtcImZ1bGxcIl0gPT09IHRydWUgKVxuXHRcdHtcblx0XHRcdHEgPSBzZWxmW1wicGFyc2VcIl0ocSwge1wiZ2V0XCI6ZmFsc2V9KVtcInF1ZXJ5XCJdIHx8IFwiXCI7XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBvID0ge307XG5cdFx0XG5cdFx0dmFyIGMgPSBxLnNwbGl0KFwiJlwiKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGMubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0aWYgKCFjW2ldLmxlbmd0aCkgY29udGludWU7XG5cdFx0XHRcblx0XHRcdHZhciBkID0gY1tpXS5pbmRleE9mKFwiPVwiKTtcblx0XHRcdHZhciBrID0gY1tpXSwgdiA9IHRydWU7XG5cdFx0XHRpZiAoIGQgPj0gMCApXG5cdFx0XHR7XG5cdFx0XHRcdGsgPSBjW2ldLnN1YnN0cigwLCBkKTtcblx0XHRcdFx0diA9IGNbaV0uc3Vic3RyKGQrMSk7XG5cdFx0XHRcdFxuXHRcdFx0XHR2ID0gZGVjb2RlVVJJQ29tcG9uZW50KHYpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZiAob3B0W1wiYXJyYXlcIl0pXG5cdFx0XHR7XG5cdFx0XHRcdHZhciBpbmRzID0gW107XG5cdFx0XHRcdHZhciBpbmQ7XG5cdFx0XHRcdHZhciBjdXJvID0gbztcblx0XHRcdFx0dmFyIGN1cmsgPSBrO1xuXHRcdFx0XHR3aGlsZSAoaW5kID0gY3Vyay5tYXRjaChhcnJheSkpIC8vIEFycmF5IVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y3VyayA9IGN1cmsuc3Vic3RyKDAsIGluZC5pbmRleCk7XG5cdFx0XHRcdFx0aW5kcy51bnNoaWZ0KGRlY29kZVVSSUNvbXBvbmVudChpbmRbMV0pKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjdXJrID0gZGVjb2RlVVJJQ29tcG9uZW50KGN1cmspO1xuXHRcdFx0XHRpZiAoaW5kcy5zb21lKGZ1bmN0aW9uKGkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAoIHR5cGVvZiBjdXJvW2N1cmtdID09IFwidW5kZWZpbmVkXCIgKSBjdXJvW2N1cmtdID0gW107XG5cdFx0XHRcdFx0aWYgKCFBcnJheS5pc0FycmF5KGN1cm9bY3Vya10pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coXCJ1cmwuZ2V0OiBBcnJheSBwcm9wZXJ0eSBcIitjdXJrK1wiIGFscmVhZHkgZXhpc3RzIGFzIHN0cmluZyFcIik7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Y3VybyA9IGN1cm9bY3Vya107XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYgKCBpID09PSBcIlwiICkgaSA9IGN1cm8ubGVuZ3RoO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGN1cmsgPSBpO1xuXHRcdFx0XHR9KSkgY29udGludWU7XG5cdFx0XHRcdGN1cm9bY3Vya10gPSB2O1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0ayA9IGRlY29kZVVSSUNvbXBvbmVudChrKTtcblx0XHRcdFxuXHRcdFx0Ly90eXBlb2Ygb1trXSA9PSBcInVuZGVmaW5lZFwiIHx8IGNvbnNvbGUubG9nKFwiUHJvcGVydHkgXCIraytcIiBhbHJlYWR5IGV4aXN0cyFcIik7XG5cdFx0XHRvW2tdID0gdjtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIG87XG5cdH0sXG5cdFxuXHQvKiogQnVpbGQgYSBnZXQgcXVlcnkgZnJvbSBhbiBvYmplY3QuXG5cdCAqXG5cdCAqIFRoaXMgY29uc3RydWN0cyBhIHF1ZXJ5IHN0cmluZyBmcm9tIHRoZSBrdiBwYWlycyBpbiBgZGF0YWAuICBDYWxsaW5nXG5cdCAqICNnZXQgb24gdGhlIHN0cmluZyByZXR1cm5lZCBzaG91bGQgcmV0dXJuIGFuIG9iamVjdCBpZGVudGljYWwgdG8gdGhlIG9uZVxuXHQgKiBwYXNzZWQgaW4gZXhjZXB0IGFsbCBub24tYm9vbGVhbiBzY2FsYXIgdHlwZXMgYmVjb21lIHN0cmluZ3MgYW5kIGFsbFxuXHQgKiBvYmplY3QgdHlwZXMgYmVjb21lIGFycmF5cyAobm9uLWludGVnZXIga2V5cyBhcmUgc3RpbGwgcHJlc2VudCwgc2VlXG5cdCAqICNnZXQncyBkb2N1bWVudGF0aW9uIGZvciBtb3JlIGRldGFpbHMpLlxuXHQgKlxuXHQgKiBUaGlzIGFsd2F5cyB1c2VzIGFycmF5IHN5bnRheCBmb3IgZGVzY3JpYmluZyBhcnJheXMuICBJZiB5b3Ugd2FudCB0b1xuXHQgKiBzZXJpYWxpemUgdGhlbSBkaWZmZXJlbnRseSAobGlrZSBoYXZpbmcgdGhlIHZhbHVlIGJlIGEgSlNPTiBhcnJheSBhbmRcblx0ICogaGF2ZSBhIHBsYWluIGtleSkgeW91IHdpbGwgbmVlZCB0byBkbyB0aGF0IGJlZm9yZSBwYXNzaW5nIGl0IGluLlxuXHQgKlxuXHQgKiBBbGwga2V5cyBhbmQgdmFsdWVzIGFyZSBzdXBwb3J0ZWQgKGJpbmFyeSBkYXRhIGFueW9uZT8pIGFzIHRoZXkgYXJlXG5cdCAqIHByb3Blcmx5IFVSTC1lbmNvZGVkIGFuZCAjZ2V0IHByb3Blcmx5IGRlY29kZXMuXG5cdCAqXG5cdCAqIEBwYXJhbXtPYmplY3R9IGRhdGEgVGhlIGt2IHBhaXJzLlxuXHQgKiBAcGFyYW17c3RyaW5nfSBwcmVmaXggVGhlIHByb3Blcmx5IGVuY29kZWQgYXJyYXkga2V5IHRvIHB1dCB0aGVcblx0ICogICBwcm9wZXJ0aWVzLiAgTWFpbmx5IGludGVuZGVkIGZvciBpbnRlcm5hbCB1c2UuXG5cdCAqIEByZXR1cm57c3RyaW5nfSBBIFVSTC1zYWZlIHN0cmluZy5cblx0ICovXG5cdFwiYnVpbGRnZXRcIjogZnVuY3Rpb24oZGF0YSwgcHJlZml4KXtcblx0XHR2YXIgaXRtcyA9IFtdO1xuXHRcdGZvciAoIHZhciBrIGluIGRhdGEgKVxuXHRcdHtcblx0XHRcdHZhciBlayA9IGVuY29kZVVSSUNvbXBvbmVudChrKTtcblx0XHRcdGlmICggdHlwZW9mIHByZWZpeCAhPSBcInVuZGVmaW5lZFwiIClcblx0XHRcdFx0ZWsgPSBwcmVmaXgrXCJbXCIrZWsrXCJdXCI7XG5cdFx0XHRcblx0XHRcdHZhciB2ID0gZGF0YVtrXTtcblx0XHRcdFxuXHRcdFx0c3dpdGNoICh0eXBlb2Ygdilcblx0XHRcdHtcblx0XHRcdFx0Y2FzZSAnYm9vbGVhbic6XG5cdFx0XHRcdFx0aWYodikgaXRtcy5wdXNoKGVrKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnbnVtYmVyJzpcblx0XHRcdFx0XHR2ID0gdi50b1N0cmluZygpO1xuXHRcdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRcdGl0bXMucHVzaChlaytcIj1cIitlbmNvZGVVUklDb21wb25lbnQodikpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdGl0bXMucHVzaChzZWxmW1wiYnVpbGRnZXRcIl0odiwgZWspKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGl0bXMuam9pbihcIiZcIik7XG5cdH0sXG5cdFxuXHQvKiogUGFyc2UgYSBVUkxcblx0ICogXG5cdCAqIFRoaXMgYnJlYWtzIHVwIGEgVVJMIGludG8gY29tcG9uZW50cy4gIEl0IGF0dGVtcHRzIHRvIGJlIHZlcnkgbGliZXJhbFxuXHQgKiBhbmQgcmV0dXJucyB0aGUgYmVzdCByZXN1bHQgaW4gbW9zdCBjYXNlcy4gIFRoaXMgbWVhbnMgdGhhdCB5b3UgY2FuXG5cdCAqIG9mdGVuIHBhc3MgaW4gcGFydCBvZiBhIFVSTCBhbmQgZ2V0IGNvcnJlY3QgY2F0ZWdvcmllcyBiYWNrLiAgTm90YWJseSxcblx0ICogdGhpcyB3b3JrcyBmb3IgZW1haWxzIGFuZCBKYWJiZXIgSURzLCBhcyB3ZWxsIGFzIGFkZGluZyBhICc/JyB0byB0aGVcblx0ICogYmVnaW5uaW5nIG9mIGEgc3RyaW5nIHdpbGwgcGFyc2UgdGhlIHdob2xlIHRoaW5nIGFzIGEgcXVlcnkgc3RyaW5nLiAgSWZcblx0ICogYW4gaXRlbSBpcyBub3QgZm91bmQgdGhlIHByb3BlcnR5IHdpbGwgYmUgdW5kZWZpbmVkLiAgSW4gc29tZSBjYXNlcyBhblxuXHQgKiBlbXB0eSBzdHJpbmcgd2lsbCBiZSByZXR1cm5lZCBpZiB0aGUgc3Vycm91bmRpbmcgc3ludGF4IGJ1dCB0aGUgYWN0dWFsXG5cdCAqIHZhbHVlIGlzIGVtcHR5IChleGFtcGxlOiBcIjovL2V4YW1wbGUuY29tXCIgd2lsbCBnaXZlIGEgZW1wdHkgc3RyaW5nIGZvclxuXHQgKiBzY2hlbWUuKSAgTm90YWJseSB0aGUgaG9zdCBuYW1lIHdpbGwgYWx3YXlzIGJlIHNldCB0byBzb21ldGhpbmcuXG5cdCAqIFxuXHQgKiBSZXR1cm5lZCBwcm9wZXJ0aWVzLlxuXHQgKiBcblx0ICogLSAqKnNjaGVtZToqKiBUaGUgdXJsIHNjaGVtZS4gKGV4OiBcIm1haWx0b1wiIG9yIFwiaHR0cHNcIilcblx0ICogLSAqKnVzZXI6KiogVGhlIHVzZXJuYW1lLlxuXHQgKiAtICoqcGFzczoqKiBUaGUgcGFzc3dvcmQuXG5cdCAqIC0gKipob3N0OioqIFRoZSBob3N0bmFtZS4gKGV4OiBcImxvY2FsaG9zdFwiLCBcIjEyMy40NTYuNy44XCIgb3IgXCJleGFtcGxlLmNvbVwiKVxuXHQgKiAtICoqcG9ydDoqKiBUaGUgcG9ydCwgYXMgYSBudW1iZXIuIChleDogMTMzNylcblx0ICogLSAqKnBhdGg6KiogVGhlIHBhdGguIChleDogXCIvXCIgb3IgXCIvYWJvdXQuaHRtbFwiKVxuXHQgKiAtICoqcXVlcnk6KiogXCJUaGUgcXVlcnkgc3RyaW5nLiAoZXg6IFwiZm9vPWJhciZ2PTE3JmZvcm1hdD1qc29uXCIpXG5cdCAqIC0gKipnZXQ6KiogVGhlIHF1ZXJ5IHN0cmluZyBwYXJzZWQgd2l0aCBnZXQuICBJZiBgb3B0LmdldGAgaXMgYGZhbHNlYCB0aGlzXG5cdCAqICAgd2lsbCBiZSBhYnNlbnRcblx0ICogLSAqKmhhc2g6KiogVGhlIHZhbHVlIGFmdGVyIHRoZSBoYXNoLiAoZXg6IFwibXlhbmNob3JcIilcblx0ICogICBiZSB1bmRlZmluZWQgZXZlbiBpZiBgcXVlcnlgIGlzIHNldC5cblx0ICpcblx0ICogQHBhcmFte3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gcGFyc2UuXG5cdCAqIEBwYXJhbXt7Z2V0Ok9iamVjdH09fSBvcHQgT3B0aW9uczpcblx0ICpcblx0ICogLSBnZXQ6IEFuIG9wdGlvbnMgYXJndW1lbnQgdG8gYmUgcGFzc2VkIHRvICNnZXQgb3IgZmFsc2UgdG8gbm90IGNhbGwgI2dldC5cblx0ICogICAgKipETyBOT1QqKiBzZXQgYGZ1bGxgLlxuXHQgKlxuXHQgKiBAcmV0dXJueyFPYmplY3R9IEFuIG9iamVjdCB3aXRoIHRoZSBwYXJzZWQgdmFsdWVzLlxuXHQgKi9cblx0XCJwYXJzZVwiOiBmdW5jdGlvbih1cmwsIG9wdCkge1xuXHRcdFxuXHRcdGlmICggdHlwZW9mIG9wdCA9PSBcInVuZGVmaW5lZFwiICkgb3B0ID0ge307XG5cdFx0XG5cdFx0dmFyIG1kID0gdXJsLm1hdGNoKHJlZ2V4KSB8fCBbXTtcblx0XHRcblx0XHR2YXIgciA9IHtcblx0XHRcdFwidXJsXCI6ICAgIHVybCxcblx0XHRcdFxuXHRcdFx0XCJzY2hlbWVcIjogbWRbMV0sXG5cdFx0XHRcInVzZXJcIjogICBtZFsyXSxcblx0XHRcdFwicGFzc1wiOiAgIG1kWzNdLFxuXHRcdFx0XCJob3N0XCI6ICAgbWRbNF0sXG5cdFx0XHRcInBvcnRcIjogICBtZFs1XSAmJiArbWRbNV0sXG5cdFx0XHRcInBhdGhcIjogICBtZFs2XSxcblx0XHRcdFwicXVlcnlcIjogIG1kWzddLFxuXHRcdFx0XCJoYXNoXCI6ICAgbWRbOF0sXG5cdFx0fTtcblx0XHRcblx0XHRpZiAoIG9wdC5nZXQgIT09IGZhbHNlIClcblx0XHRcdHJbXCJnZXRcIl0gPSByW1wicXVlcnlcIl0gJiYgc2VsZltcImdldFwiXShyW1wicXVlcnlcIl0sIG9wdC5nZXQpO1xuXHRcdFxuXHRcdHJldHVybiByO1xuXHR9LFxuXHRcblx0LyoqIEJ1aWxkIGEgVVJMIGZyb20gY29tcG9uZW50cy5cblx0ICogXG5cdCAqIFRoaXMgcGllY2VzIHRvZ2V0aGVyIGEgdXJsIGZyb20gdGhlIHByb3BlcnRpZXMgb2YgdGhlIHBhc3NlZCBpbiBvYmplY3QuXG5cdCAqIEluIGdlbmVyYWwgcGFzc2luZyB0aGUgcmVzdWx0IG9mIGBwYXJzZSgpYCBzaG91bGQgcmV0dXJuIHRoZSBVUkwuICBUaGVyZVxuXHQgKiBtYXkgZGlmZmVyZW5jZXMgaW4gdGhlIGdldCBzdHJpbmcgYXMgdGhlIGtleXMgYW5kIHZhbHVlcyBtaWdodCBiZSBtb3JlXG5cdCAqIGVuY29kZWQgdGhlbiB0aGV5IHdlcmUgb3JpZ2luYWxseSB3ZXJlLiAgSG93ZXZlciwgY2FsbGluZyBgZ2V0KClgIG9uIHRoZVxuXHQgKiB0d28gdmFsdWVzIHNob3VsZCB5aWVsZCB0aGUgc2FtZSByZXN1bHQuXG5cdCAqIFxuXHQgKiBIZXJlIGlzIGhvdyB0aGUgcGFyYW1ldGVycyBhcmUgdXNlZC5cblx0ICogXG5cdCAqICAtIHVybDogVXNlZCBvbmx5IGlmIG5vIG90aGVyIHZhbHVlcyBhcmUgcHJvdmlkZWQuICBJZiB0aGF0IGlzIHRoZSBjYXNlXG5cdCAqICAgICBgdXJsYCB3aWxsIGJlIHJldHVybmVkIHZlcmJhdGltLlxuXHQgKiAgLSBzY2hlbWU6IFVzZWQgaWYgZGVmaW5lZC5cblx0ICogIC0gdXNlcjogVXNlZCBpZiBkZWZpbmVkLlxuXHQgKiAgLSBwYXNzOiBVc2VkIGlmIGRlZmluZWQuXG5cdCAqICAtIGhvc3Q6IFVzZWQgaWYgZGVmaW5lZC5cblx0ICogIC0gcGF0aDogVXNlZCBpZiBkZWZpbmVkLlxuXHQgKiAgLSBxdWVyeTogVXNlZCBvbmx5IGlmIGBnZXRgIGlzIG5vdCBwcm92aWRlZCBhbmQgbm9uLWVtcHR5LlxuXHQgKiAgLSBnZXQ6IFVzZWQgaWYgbm9uLWVtcHR5LiAgUGFzc2VkIHRvICNidWlsZGdldCBhbmQgdGhlIHJlc3VsdCBpcyB1c2VkXG5cdCAqICAgIGFzIHRoZSBxdWVyeSBzdHJpbmcuXG5cdCAqICAtIGhhc2g6IFVzZWQgaWYgZGVmaW5lZC5cblx0ICogXG5cdCAqIFRoZXNlIGFyZSB0aGUgb3B0aW9ucyB0aGF0IGFyZSB2YWxpZCBvbiB0aGUgb3B0aW9ucyBvYmplY3QuXG5cdCAqIFxuXHQgKiAgLSB1c2VlbXB0eWdldDogSWYgdHJ1dGh5LCBhIHF1ZXN0aW9uIG1hcmsgd2lsbCBiZSBhcHBlbmRlZCBmb3IgZW1wdHkgZ2V0XG5cdCAqICAgIHN0cmluZ3MuICBUaGlzIG5vdGFibHkgbWFrZXMgYGJ1aWxkKClgIGFuZCBgcGFyc2UoKWAgZnVsbHkgc3ltbWV0cmljLlxuXHQgKlxuXHQgKiBAcGFyYW17T2JqZWN0fSBkYXRhIFRoZSBwaWVjZXMgb2YgdGhlIFVSTC5cblx0ICogQHBhcmFte09iamVjdH0gb3B0IE9wdGlvbnMgZm9yIGJ1aWxkaW5nIHRoZSB1cmwuXG5cdCAqIEByZXR1cm57c3RyaW5nfSBUaGUgVVJMLlxuXHQgKi9cblx0XCJidWlsZFwiOiBmdW5jdGlvbihkYXRhLCBvcHQpe1xuXHRcdG9wdCA9IG9wdCB8fCB7fTtcblx0XHRcblx0XHR2YXIgciA9IFwiXCI7XG5cdFx0XG5cdFx0aWYgKCB0eXBlb2YgZGF0YVtcInNjaGVtZVwiXSAhPSBcInVuZGVmaW5lZFwiIClcblx0XHR7XG5cdFx0XHRyICs9IGRhdGFbXCJzY2hlbWVcIl07XG5cdFx0XHRyICs9IChub3NsYXNoLmluZGV4T2YoZGF0YVtcInNjaGVtZVwiXSk+PTApP1wiOlwiOlwiOi8vXCI7XG5cdFx0fVxuXHRcdGlmICggdHlwZW9mIGRhdGFbXCJ1c2VyXCJdICE9IFwidW5kZWZpbmVkXCIgKVxuXHRcdHtcblx0XHRcdHIgKz0gZGF0YVtcInVzZXJcIl07XG5cdFx0XHRpZiAoIHR5cGVvZiBkYXRhW1wicGFzc1wiXSA9PSBcInVuZGVmaW5lZFwiIClcblx0XHRcdHtcblx0XHRcdFx0ciArPSBcIkBcIjtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCB0eXBlb2YgZGF0YVtcInBhc3NcIl0gIT0gXCJ1bmRlZmluZWRcIiApIHIgKz0gXCI6XCIgKyBkYXRhW1wicGFzc1wiXSArIFwiQFwiO1xuXHRcdGlmICggdHlwZW9mIGRhdGFbXCJob3N0XCJdICE9IFwidW5kZWZpbmVkXCIgKSByICs9IGRhdGFbXCJob3N0XCJdO1xuXHRcdGlmICggdHlwZW9mIGRhdGFbXCJwb3J0XCJdICE9IFwidW5kZWZpbmVkXCIgKSByICs9IFwiOlwiICsgZGF0YVtcInBvcnRcIl07XG5cdFx0aWYgKCB0eXBlb2YgZGF0YVtcInBhdGhcIl0gIT0gXCJ1bmRlZmluZWRcIiApIHIgKz0gZGF0YVtcInBhdGhcIl07XG5cdFx0XG5cdFx0aWYgKG9wdFtcInVzZWVtcHR5Z2V0XCJdKVxuXHRcdHtcblx0XHRcdGlmICAgICAgKCB0eXBlb2YgZGF0YVtcImdldFwiXSAgICE9IFwidW5kZWZpbmVkXCIgKSByICs9IFwiP1wiICsgc2VsZltcImJ1aWxkZ2V0XCJdKGRhdGFbXCJnZXRcIl0pO1xuXHRcdFx0ZWxzZSBpZiAoIHR5cGVvZiBkYXRhW1wicXVlcnlcIl0gIT0gXCJ1bmRlZmluZWRcIiApIHIgKz0gXCI/XCIgKyBkYXRhW1wicXVlcnlcIl07XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQvLyBJZiAuZ2V0IHVzZSBpdC4gIElmIC5nZXQgbGVhZHMgdG8gZW1wdHksIHVzZSAucXVlcnkuXG5cdFx0XHR2YXIgcSA9IGRhdGFbXCJnZXRcIl0gJiYgc2VsZltcImJ1aWxkZ2V0XCJdKGRhdGFbXCJnZXRcIl0pIHx8IGRhdGFbXCJxdWVyeVwiXTtcblx0XHRcdGlmIChxKSByICs9IFwiP1wiICsgcTtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKCB0eXBlb2YgZGF0YVtcImhhc2hcIl0gIT0gXCJ1bmRlZmluZWRcIiApIHIgKz0gXCIjXCIgKyBkYXRhW1wiaGFzaFwiXTtcblx0XHRcblx0XHRyZXR1cm4gciB8fCBkYXRhW1widXJsXCJdIHx8IFwiXCI7XG5cdH0sXG59O1xuXG5pZiAoIHR5cGVvZiBkZWZpbmUgIT0gXCJ1bmRlZmluZWRcIiAmJiBkZWZpbmVbXCJhbWRcIl0gKSBkZWZpbmUoc2VsZik7XG5lbHNlIGlmICggdHlwZW9mIG1vZHVsZSAhPSBcInVuZGVmaW5lZFwiICkgbW9kdWxlWydleHBvcnRzJ10gPSBzZWxmO1xuZWxzZSB3aW5kb3dbXCJ1cmxcIl0gPSBzZWxmO1xuXG59KCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdXJsLmpzL3VybC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJkZWZpbmUgY2Fubm90IGJlIHVzZWQgaW5kaXJlY3RcIik7IH07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2FtZC1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBNb2R1bGUgZm9yIG1hbmFnaW5nIG1vZGFsIHByb21wdCBpbnN0YW5jZXMuXG4gKiBOT1RFOiBUaGlzIG1vZHVsZSBpcyBjdXJyZW50bHkgbGltaXRlZCBpbiBhIG51bWJlclxuICogICAgICAgb2Ygd2F5cy4gRm9yIG9uZSwgaXQgb25seSBhbGxvd3MgcmFkaW9cbiAqICAgICAgIGlucHV0IG9wdGlvbnMuIEFkZGl0aW9uYWxseSwgaXQgaGFyZC1jb2RlcyBpblxuICogICAgICAgYSBudW1iZXIgb2Ygb3RoZXIgYmVoYXZpb3JzIHdoaWNoIGFyZSBzcGVjaWZpY1xuICogICAgICAgdG8gdGhlIGltYWdlIGltcG9ydCBzdHlsZSBwcm9tcHQgKGZvciB3aGljaFxuICogICAgICAgdGhpcyBtb2R1bGUgd2FzIHdyaXR0ZW4pLlxuICogICAgICAgSWYgZGVzaXJlZCwgdGhpcyBtb2R1bGUgbWF5IGJlIG1hZGUgbW9yZVxuICogICAgICAgZ2VuZXJhbC1wdXJwb3NlIGluIHRoZSBmdXR1cmUsIGJ1dCwgZm9yIG5vdyxcbiAqICAgICAgIGJlIGF3YXJlIG9mIHRoZXNlIGxpbWl0YXRpb25zLlxuICovXG5kZWZpbmUoXCJjcG8vbW9kYWwtcHJvbXB0XCIsIFtcInFcIl0sIGZ1bmN0aW9uKFEpIHtcblxuICBmdW5jdGlvbiBhdXRvSGlnaGxpZ2h0Qm94KHRleHQpIHtcbiAgICB2YXIgdGV4dEJveCA9ICQoXCI8aW5wdXQgdHlwZT0ndGV4dCc+XCIpLmFkZENsYXNzKFwiYXV0by1oaWdobGlnaHRcIik7XG4gICAgdGV4dEJveC5hdHRyKFwic2l6ZVwiLCB0ZXh0Lmxlbmd0aCk7XG4gICAgdGV4dEJveC5hdHRyKFwiZWRpdGFibGVcIiwgZmFsc2UpO1xuICAgIHRleHRCb3gub24oXCJmb2N1c1wiLCBmdW5jdGlvbigpIHsgJCh0aGlzKS5zZWxlY3QoKTsgfSk7XG4gICAgdGV4dEJveC5vbihcIm1vdXNldXBcIiwgZnVuY3Rpb24oKSB7ICQodGhpcykuc2VsZWN0KCk7IH0pO1xuICAgIHRleHRCb3gudmFsKHRleHQpO1xuICAgIHJldHVybiB0ZXh0Qm94O1xuICB9XG5cbiAgLy8gQWxsb3dzIGFzeW5jaHJvbm91cyByZXF1ZXN0aW5nIG9mIHByb21wdHNcbiAgdmFyIHByb21wdFF1ZXVlID0gUSgpO1xuICB2YXIgc3R5bGVzID0gW1xuICAgIFwicmFkaW9cIiwgXCJ0aWxlc1wiLCBcInRleHRcIiwgXCJjb3B5VGV4dFwiLCBcImNvbmZpcm1cIlxuICBdO1xuXG4gIHdpbmRvdy5tb2RhbHMgPSBbXTtcblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhbiBvcHRpb24gdG8gcHJlc2VudCB0aGUgdXNlclxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBNb2RhbE9wdGlvblxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBtZXNzYWdlIHRvIHNob3cgdGhlIHVzZXIgd2hpY2hcbiAgICAgICAgICAgICAgIGRlc2NyaWJlcyB0aGlzIG9wdGlvblxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gdmFsdWUgLSBUaGUgdmFsdWUgdG8gcmV0dXJuIGlmIHRoaXMgb3B0aW9uIGlzIGNob3NlblxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gW2V4YW1wbGVdIC0gQSBjb2RlIHNuaXBwZXQgdG8gc2hvdyB3aXRoIHRoaXMgb3B0aW9uXG4gICAqL1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgbW9kYWwgcHJvbXB0cy5cbiAgICogQHBhcmFtIHtNb2RhbE9wdGlvbltdfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgdG8gcHJlc2VudCB0aGUgdXNlclxuICAgKi9cbiAgZnVuY3Rpb24gUHJvbXB0KG9wdGlvbnMpIHtcbiAgICB3aW5kb3cubW9kYWxzLnB1c2godGhpcyk7XG4gICAgaWYgKCFvcHRpb25zIHx8XG4gICAgICAgIChzdHlsZXMuaW5kZXhPZihvcHRpb25zLnN0eWxlKSA9PT0gLTEpIHx8XG4gICAgICAgICFvcHRpb25zLm9wdGlvbnMgfHxcbiAgICAgICAgKHR5cGVvZiBvcHRpb25zLm9wdGlvbnMubGVuZ3RoICE9PSBcIm51bWJlclwiKSB8fCAob3B0aW9ucy5vcHRpb25zLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgUHJvbXB0IE9wdGlvbnNcIiwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5tb2RhbCA9ICQoXCIjcHJvbXB0TW9kYWxcIik7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdHlsZSA9PT0gXCJyYWRpb1wiKSB7XG4gICAgICB0aGlzLmVsdHMgPSAkKCQucGFyc2VIVE1MKFwiPHRhYmxlPjwvdGFibGU+XCIpKS5hZGRDbGFzcyhcImNob2ljZUNvbnRhaW5lclwiKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5zdHlsZSA9PT0gXCJ0ZXh0XCIpIHtcbiAgICAgIHRoaXMuZWx0cyA9ICQoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcImNob2ljZUNvbnRhaW5lclwiKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5zdHlsZSA9PT0gXCJjb3B5VGV4dFwiKSB7XG4gICAgICB0aGlzLmVsdHMgPSAkKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJjaG9pY2VDb250YWluZXJcIik7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuc3R5bGUgPT09IFwiY29uZmlybVwiKSB7XG4gICAgICB0aGlzLmVsdHMgPSAkKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJjaG9pY2VDb250YWluZXJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWx0cyA9ICQoJC5wYXJzZUhUTUwoXCI8ZGl2PjwvZGl2PlwiKSkuYWRkQ2xhc3MoXCJjaG9pY2VDb250YWluZXJcIik7XG4gICAgfVxuICAgIHRoaXMudGl0bGUgPSAkKFwiLm1vZGFsLWhlYWRlciA+IGgzXCIsIHRoaXMubW9kYWwpO1xuICAgIHRoaXMuY2xvc2VCdXR0b24gPSAkKFwiLmNsb3NlXCIsIHRoaXMubW9kYWwpO1xuICAgIHRoaXMuc3VibWl0QnV0dG9uID0gJChcIi5zdWJtaXRcIiwgdGhpcy5tb2RhbCk7XG4gICAgaWYodGhpcy5vcHRpb25zLnN1Ym1pdFRleHQpIHtcbiAgICAgIHRoaXMuc3VibWl0QnV0dG9uLnRleHQodGhpcy5vcHRpb25zLnN1Ym1pdFRleHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuc3VibWl0QnV0dG9uLnRleHQoXCJTdWJtaXRcIik7XG4gICAgfVxuICAgIHRoaXMuaXNDb21waWxlZCA9IGZhbHNlO1xuICAgIHRoaXMuZGVmZXJyZWQgPSBRLmRlZmVyKCk7XG4gICAgdGhpcy5wcm9taXNlID0gdGhpcy5kZWZlcnJlZC5wcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFR5cGUgZm9yIGhhbmRsZXJzIG9mIHJlc3BvbnNlcyBmcm9tIG1vZGFsIHByb21wdHNcbiAgICogQGNhbGxiYWNrIHByb21wdENhbGxiYWNrXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZXNwIC0gVGhlIHJlc3BvbnNlIGZyb20gdGhlIHVzZXJcbiAgICovXG5cbiAgLyoqXG4gICAqIFNob3dzIHRoaXMgcHJvbXB0IHRvIHRoZSB1c2VyICh3aWxsIHdhaXQgdW50aWwgYW55IGFjdGl2ZVxuICAgKiBwcm9tcHRzIGhhdmUgZmluaXNoZWQpXG4gICAqIEBwYXJhbSB7cHJvbXB0Q2FsbGJhY2t9IFtjYWxsYmFja10gLSBPcHRpb25hbCBjYWxsYmFjayB3aGljaCBpcyBwYXNzZWQgdGhlXG4gICAqICAgICAgICByZXN1bHQgb2YgdGhlIHByb21wdFxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgcmVzb2x2aW5nIHRvIGVpdGhlciB0aGUgcmVzdWx0IG9mIGBjYWxsYmFja2AsIGlmIHByb3ZpZGVkLFxuICAgKiAgICAgICAgICBvciB0aGUgcmVzdWx0IG9mIHRoZSBwcm9tcHQsIG90aGVyd2lzZS5cbiAgICovXG4gIFByb21wdC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgLy8gVXNlIHRoZSBwcm9taXNlIHF1ZXVlIHRvIG1ha2Ugc3VyZSB0aGVyZSdzIG5vIG90aGVyXG4gICAgLy8gcHJvbXB0IGJlaW5nIHNob3duIGN1cnJlbnRseVxuICAgIGlmICh0aGlzLm9wdGlvbnMuaGlkZVN1Ym1pdCkge1xuICAgICAgdGhpcy5zdWJtaXRCdXR0b24uaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN1Ym1pdEJ1dHRvbi5zaG93KCk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VCdXR0b24uY2xpY2sodGhpcy5vbkNsb3NlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc3VibWl0QnV0dG9uLmNsaWNrKHRoaXMub25TdWJtaXQuYmluZCh0aGlzKSk7XG4gICAgdmFyIGRvY0NsaWNrID0gKGZ1bmN0aW9uKGUpIHtcbiAgICAgIC8vIElmIHRoZSBwcm9tcHQgaXMgYWN0aXZlIGFuZCB0aGUgYmFja2dyb3VuZCBpcyBjbGlja2VkLFxuICAgICAgLy8gdGhlbiBjbG9zZS5cbiAgICAgIGlmICgkKGUudGFyZ2V0KS5pcyh0aGlzLm1vZGFsKSAmJiB0aGlzLmRlZmVycmVkKSB7XG4gICAgICAgIHRoaXMub25DbG9zZShlKTtcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKFwiY2xpY2tcIiwgZG9jQ2xpY2spO1xuICAgICAgfVxuICAgIH0pLmJpbmQodGhpcyk7XG4gICAgJChkb2N1bWVudCkuY2xpY2soZG9jQ2xpY2spO1xuICAgIHZhciBkb2NLZXlkb3duID0gKGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICB0aGlzLm9uQ2xvc2UoZSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9mZihcImtleWRvd25cIiwgZG9jS2V5ZG93bik7XG4gICAgICB9XG4gICAgfSkuYmluZCh0aGlzKTtcbiAgICAkKGRvY3VtZW50KS5rZXlkb3duKGRvY0tleWRvd24pO1xuICAgIHRoaXMudGl0bGUudGV4dCh0aGlzLm9wdGlvbnMudGl0bGUpO1xuICAgIHRoaXMucG9wdWxhdGVNb2RhbCgpO1xuICAgIHRoaXMubW9kYWwuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiB0aGlzLnByb21pc2UudGhlbihjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnByb21pc2U7XG4gICAgfVxuICB9O1xuXG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgY29udGVudHMgb2YgdGhlIG1vZGFsIHByb21wdC5cbiAgICovXG4gIFByb21wdC5wcm90b3R5cGUuY2xlYXJNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3VibWl0QnV0dG9uLm9mZigpO1xuICAgIHRoaXMuY2xvc2VCdXR0b24ub2ZmKCk7XG4gICAgdGhpcy5lbHRzLmVtcHR5KCk7XG4gIH07XG4gIFxuICAvKipcbiAgICogUG9wdWxhdGVzIHRoZSBjb250ZW50cyBvZiB0aGUgbW9kYWwgcHJvbXB0IHdpdGggdGhlXG4gICAqIG9wdGlvbnMgaW4gdGhpcyBwcm9tcHQuXG4gICAqL1xuICBQcm9tcHQucHJvdG90eXBlLnBvcHVsYXRlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGVSYWRpb0VsdChvcHRpb24sIGlkeCkge1xuICAgICAgdmFyIGVsdCA9ICQoJC5wYXJzZUhUTUwoXCI8aW5wdXQgbmFtZT1cXFwicHlyZXQtbW9kYWxcXFwiIHR5cGU9XFxcInJhZGlvXFxcIj5cIikpO1xuICAgICAgdmFyIGlkID0gXCJyXCIgKyBpZHgudG9TdHJpbmcoKTtcbiAgICAgIHZhciBsYWJlbCA9ICQoJC5wYXJzZUhUTUwoXCI8bGFiZWwgZm9yPVxcXCJcIiArIGlkICsgXCJcXFwiPjwvbGFiZWw+XCIpKTtcbiAgICAgIGVsdC5hdHRyKFwiaWRcIiwgaWQpO1xuICAgICAgZWx0LmF0dHIoXCJ2YWx1ZVwiLCBvcHRpb24udmFsdWUpO1xuICAgICAgbGFiZWwudGV4dChvcHRpb24ubWVzc2FnZSk7XG4gICAgICB2YXIgZWx0Q29udGFpbmVyID0gJCgkLnBhcnNlSFRNTChcIjx0ZCBjbGFzcz1cXFwicHlyZXQtbW9kYWwtb3B0aW9uLXJhZGlvXFxcIj48L3RkPlwiKSk7XG4gICAgICBlbHRDb250YWluZXIuYXBwZW5kKGVsdCk7XG4gICAgICB2YXIgbGFiZWxDb250YWluZXIgPSAkKCQucGFyc2VIVE1MKFwiPHRkIGNsYXNzPVxcXCJweXJldC1tb2RhbC1vcHRpb24tbWVzc2FnZVxcXCI+PC90ZD5cIikpO1xuICAgICAgbGFiZWxDb250YWluZXIuYXBwZW5kKGxhYmVsKTtcbiAgICAgIHZhciBjb250YWluZXIgPSAkKCQucGFyc2VIVE1MKFwiPHRyIGNsYXNzPVxcXCJweXJldC1tb2RhbC1vcHRpb25cXFwiPjwvdHI+XCIpKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmQoZWx0Q29udGFpbmVyKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmQobGFiZWxDb250YWluZXIpO1xuICAgICAgaWYgKG9wdGlvbi5leGFtcGxlKSB7XG4gICAgICAgIHZhciBleGFtcGxlID0gJCgkLnBhcnNlSFRNTChcIjxkaXY+PC9kaXY+XCIpKTtcbiAgICAgICAgdmFyIGNtID0gQ29kZU1pcnJvcihleGFtcGxlWzBdLCB7XG4gICAgICAgICAgdmFsdWU6IG9wdGlvbi5leGFtcGxlLFxuICAgICAgICAgIG1vZGU6ICdweXJldCcsXG4gICAgICAgICAgbGluZU51bWJlcnM6IGZhbHNlLFxuICAgICAgICAgIHJlYWRPbmx5OiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgY20ucmVmcmVzaCgpO1xuICAgICAgICB9LCAxKTtcbiAgICAgICAgdmFyIGV4YW1wbGVDb250YWluZXIgPSAkKCQucGFyc2VIVE1MKFwiPHRkIGNsYXNzPVxcXCJweXJldC1tb2RhbC1vcHRpb24tZXhhbXBsZVxcXCI+PC90ZD5cIikpO1xuICAgICAgICBleGFtcGxlQ29udGFpbmVyLmFwcGVuZChleGFtcGxlKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZChleGFtcGxlQ29udGFpbmVyKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlVGlsZUVsdChvcHRpb24sIGlkeCkge1xuICAgICAgdmFyIGVsdCA9ICQoJC5wYXJzZUhUTUwoXCI8YnV0dG9uIG5hbWU9XFxcInB5cmV0LW1vZGFsXFxcIiBjbGFzcz1cXFwidGlsZVxcXCI+PC9idXR0b24+XCIpKTtcbiAgICAgIGVsdC5hdHRyKFwiaWRcIiwgXCJ0XCIgKyBpZHgudG9TdHJpbmcoKSk7XG4gICAgICBlbHQuYXBwZW5kKCQoXCI8Yj5cIikudGV4dChvcHRpb24ubWVzc2FnZSkpXG4gICAgICAgIC5hcHBlbmQoJChcIjxwPlwiKS50ZXh0KG9wdGlvbi5kZXRhaWxzKSk7XG4gICAgICBmb3IgKHZhciBldnQgaW4gb3B0aW9uLm9uKVxuICAgICAgICBlbHQub24oZXZ0LCBvcHRpb24ub25bZXZ0XSk7XG4gICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRleHRFbHQob3B0aW9uKSB7XG4gICAgICB2YXIgZWx0ID0gJChcIjxkaXY+XCIpO1xuICAgICAgZWx0LmFwcGVuZCgkKFwiPHNwYW4+XCIpLmFkZENsYXNzKFwidGV4dExhYmVsXCIpLnRleHQob3B0aW9uLm1lc3NhZ2UpKTtcbi8vICAgICAgZWx0LmFwcGVuZCgkKFwiPHNwYW4+XCIpLnRleHQoXCIoXCIgKyBvcHRpb24uZGV0YWlscyArIFwiKVwiKSk7XG4gICAgICBlbHQuYXBwZW5kKCQoXCI8aW5wdXQgdHlwZT0ndGV4dCc+XCIpLnZhbChvcHRpb24uZGVmYXVsdFZhbHVlKSk7XG4gICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvcHlUZXh0RWx0KG9wdGlvbikge1xuICAgICAgdmFyIGVsdCA9ICQoXCI8ZGl2PlwiKTtcbiAgICAgIGVsdC5hcHBlbmQoJChcIjxwPlwiKS5hZGRDbGFzcyhcInRleHRMYWJlbFwiKS50ZXh0KG9wdGlvbi5tZXNzYWdlKSk7XG4gICAgICBpZihvcHRpb24udGV4dCkge1xuICAgICAgICB2YXIgYm94ID0gYXV0b0hpZ2hsaWdodEJveChvcHRpb24udGV4dCk7XG4gIC8vICAgICAgZWx0LmFwcGVuZCgkKFwiPHNwYW4+XCIpLnRleHQoXCIoXCIgKyBvcHRpb24uZGV0YWlscyArIFwiKVwiKSk7XG4gICAgICAgIGVsdC5hcHBlbmQoYm94KTtcbiAgICAgICAgYm94LmZvY3VzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbmZpcm1FbHQob3B0aW9uKSB7XG4gICAgICByZXR1cm4gJChcIjxwPlwiKS50ZXh0KG9wdGlvbi5tZXNzYWdlKTtcbiAgICB9XG5cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbHQob3B0aW9uLCBpKSB7XG4gICAgICBpZih0aGF0Lm9wdGlvbnMuc3R5bGUgPT09IFwicmFkaW9cIikge1xuICAgICAgICByZXR1cm4gY3JlYXRlUmFkaW9FbHQob3B0aW9uLCBpKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYodGhhdC5vcHRpb25zLnN0eWxlID09PSBcInRpbGVzXCIpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVRpbGVFbHQob3B0aW9uLCBpKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYodGhhdC5vcHRpb25zLnN0eWxlID09PSBcInRleHRcIikge1xuICAgICAgICByZXR1cm4gY3JlYXRlVGV4dEVsdChvcHRpb24pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZih0aGF0Lm9wdGlvbnMuc3R5bGUgPT09IFwiY29weVRleHRcIikge1xuICAgICAgICByZXR1cm4gY3JlYXRlQ29weVRleHRFbHQob3B0aW9uKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYodGhhdC5vcHRpb25zLnN0eWxlID09PSBcImNvbmZpcm1cIikge1xuICAgICAgICByZXR1cm4gY3JlYXRlQ29uZmlybUVsdChvcHRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBvcHRpb25FbHRzO1xuICAgIC8vIENhY2hlIHJlc3VsdHNcbi8vICAgIGlmICh0cnVlKSB7XG4gICAgICBvcHRpb25FbHRzID0gdGhpcy5vcHRpb25zLm9wdGlvbnMubWFwKGNyZWF0ZUVsdCk7XG4vLyAgICAgIHRoaXMuY29tcGlsZWRFbHRzID0gb3B0aW9uRWx0cztcbi8vICAgICAgdGhpcy5pc0NvbXBpbGVkID0gdHJ1ZTtcbi8vICAgIH0gZWxzZSB7XG4vLyAgICAgIG9wdGlvbkVsdHMgPSB0aGlzLmNvbXBpbGVkRWx0cztcbi8vICAgIH1cbiAgICAkKFwiaW5wdXRbdHlwZT0ncmFkaW8nXVwiLCBvcHRpb25FbHRzWzBdKS5hdHRyKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgdGhpcy5lbHRzLmFwcGVuZChvcHRpb25FbHRzKTtcbiAgICAkKFwiLm1vZGFsLWJvZHlcIiwgdGhpcy5tb2RhbCkuZW1wdHkoKS5hcHBlbmQodGhpcy5lbHRzKTtcbiAgICBvcHRpb25FbHRzWzBdLmZvY3VzKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgd2hpY2ggaXMgY2FsbGVkIHdoZW4gdGhlIHVzZXIgZG9lcyBub3Qgc2VsZWN0IGFueXRoaW5nXG4gICAqL1xuICBQcm9tcHQucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5tb2RhbC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIHRoaXMuY2xlYXJNb2RhbCgpO1xuICAgIHRoaXMuZGVmZXJyZWQucmVzb2x2ZShudWxsKTtcbiAgICBkZWxldGUgdGhpcy5kZWZlcnJlZDtcbiAgICBkZWxldGUgdGhpcy5wcm9taXNlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHdoaWNoIGlzIGNhbGxlZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgXCJzdWJtaXRcIlxuICAgKi9cbiAgUHJvbXB0LnByb3RvdHlwZS5vblN1Ym1pdCA9IGZ1bmN0aW9uKGUpIHtcbiAgICBpZih0aGlzLm9wdGlvbnMuc3R5bGUgPT09IFwicmFkaW9cIikge1xuICAgICAgdmFyIHJldHZhbCA9ICQoXCJpbnB1dFt0eXBlPSdyYWRpbyddOmNoZWNrZWRcIiwgdGhpcy5tb2RhbCkudmFsKCk7XG4gICAgfVxuICAgIGVsc2UgaWYodGhpcy5vcHRpb25zLnN0eWxlID09PSBcInRleHRcIikge1xuICAgICAgdmFyIHJldHZhbCA9ICQoXCJpbnB1dFt0eXBlPSd0ZXh0J11cIiwgdGhpcy5tb2RhbCkudmFsKCk7XG4gICAgfVxuICAgIGVsc2UgaWYodGhpcy5vcHRpb25zLnN0eWxlID09PSBcImNvcHlUZXh0XCIpIHtcbiAgICAgIHZhciByZXR2YWwgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmKHRoaXMub3B0aW9ucy5zdHlsZSA9PT0gXCJjb25maXJtXCIpIHtcbiAgICAgIHZhciByZXR2YWwgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciByZXR2YWwgPSB0cnVlOyAvLyBKdXN0IHJldHVybiB0cnVlIGlmIHRoZXkgY2xpY2tlZCBzdWJtaXRcbiAgICB9XG4gICAgdGhpcy5tb2RhbC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIHRoaXMuY2xlYXJNb2RhbCgpO1xuICAgIHRoaXMuZGVmZXJyZWQucmVzb2x2ZShyZXR2YWwpO1xuICAgIGRlbGV0ZSB0aGlzLmRlZmVycmVkO1xuICAgIGRlbGV0ZSB0aGlzLnByb21pc2U7XG4gIH07XG5cbiAgcmV0dXJuIFByb21wdDtcblxufSk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93ZWIvanMvbW9kYWwtcHJvbXB0LmpzIiwiLy8gdmltOnRzPTQ6c3RzPTQ6c3c9NDpcbi8qIVxuICpcbiAqIENvcHlyaWdodCAyMDA5LTIwMTIgS3JpcyBLb3dhbCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1JVFxuICogbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vZ2l0aHViLmNvbS9rcmlza293YWwvcS9yYXcvbWFzdGVyL0xJQ0VOU0VcbiAqXG4gKiBXaXRoIHBhcnRzIGJ5IFR5bGVyIENsb3NlXG4gKiBDb3B5cmlnaHQgMjAwNy0yMDA5IFR5bGVyIENsb3NlIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTUlUIFggbGljZW5zZSBmb3VuZFxuICogYXQgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5odG1sXG4gKiBGb3JrZWQgYXQgcmVmX3NlbmQuanMgdmVyc2lvbjogMjAwOS0wNS0xMVxuICpcbiAqIFdpdGggcGFydHMgYnkgTWFyayBNaWxsZXJcbiAqIENvcHlyaWdodCAoQykgMjAxMSBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG4oZnVuY3Rpb24gKGRlZmluaXRpb24pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIFRoaXMgZmlsZSB3aWxsIGZ1bmN0aW9uIHByb3Blcmx5IGFzIGEgPHNjcmlwdD4gdGFnLCBvciBhIG1vZHVsZVxuICAgIC8vIHVzaW5nIENvbW1vbkpTIGFuZCBOb2RlSlMgb3IgUmVxdWlyZUpTIG1vZHVsZSBmb3JtYXRzLiAgSW5cbiAgICAvLyBDb21tb24vTm9kZS9SZXF1aXJlSlMsIHRoZSBtb2R1bGUgZXhwb3J0cyB0aGUgUSBBUEkgYW5kIHdoZW5cbiAgICAvLyBleGVjdXRlZCBhcyBhIHNpbXBsZSA8c2NyaXB0PiwgaXQgY3JlYXRlcyBhIFEgZ2xvYmFsIGluc3RlYWQuXG5cbiAgICAvLyBNb250YWdlIFJlcXVpcmVcbiAgICBpZiAodHlwZW9mIGJvb3RzdHJhcCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGJvb3RzdHJhcChcInByb21pc2VcIiwgZGVmaW5pdGlvbik7XG5cbiAgICAvLyBDb21tb25KU1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKTtcblxuICAgIC8vIFJlcXVpcmVKU1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGRlZmluaXRpb24pO1xuXG4gICAgLy8gU0VTIChTZWN1cmUgRWNtYVNjcmlwdClcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZXMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKCFzZXMub2soKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VzLm1ha2VRID0gZGVmaW5pdGlvbjtcbiAgICAgICAgfVxuXG4gICAgLy8gPHNjcmlwdD5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgLy8gUHJlZmVyIHdpbmRvdyBvdmVyIHNlbGYgZm9yIGFkZC1vbiBzY3JpcHRzLiBVc2Ugc2VsZiBmb3JcbiAgICAgICAgLy8gbm9uLXdpbmRvd2VkIGNvbnRleHRzLlxuICAgICAgICB2YXIgZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHNlbGY7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBgd2luZG93YCBvYmplY3QsIHNhdmUgdGhlIHByZXZpb3VzIFEgZ2xvYmFsXG4gICAgICAgIC8vIGFuZCBpbml0aWFsaXplIFEgYXMgYSBnbG9iYWwuXG4gICAgICAgIHZhciBwcmV2aW91c1EgPSBnbG9iYWwuUTtcbiAgICAgICAgZ2xvYmFsLlEgPSBkZWZpbml0aW9uKCk7XG5cbiAgICAgICAgLy8gQWRkIGEgbm9Db25mbGljdCBmdW5jdGlvbiBzbyBRIGNhbiBiZSByZW1vdmVkIGZyb20gdGhlXG4gICAgICAgIC8vIGdsb2JhbCBuYW1lc3BhY2UuXG4gICAgICAgIGdsb2JhbC5RLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBnbG9iYWwuUSA9IHByZXZpb3VzUTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBlbnZpcm9ubWVudCB3YXMgbm90IGFudGljaXBhdGVkIGJ5IFEuIFBsZWFzZSBmaWxlIGEgYnVnLlwiKTtcbiAgICB9XG5cbn0pKGZ1bmN0aW9uICgpIHtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgaGFzU3RhY2tzID0gZmFsc2U7XG50cnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xufSBjYXRjaCAoZSkge1xuICAgIGhhc1N0YWNrcyA9ICEhZS5zdGFjaztcbn1cblxuLy8gQWxsIGNvZGUgYWZ0ZXIgdGhpcyBwb2ludCB3aWxsIGJlIGZpbHRlcmVkIGZyb20gc3RhY2sgdHJhY2VzIHJlcG9ydGVkXG4vLyBieSBRLlxudmFyIHFTdGFydGluZ0xpbmUgPSBjYXB0dXJlTGluZSgpO1xudmFyIHFGaWxlTmFtZTtcblxuLy8gc2hpbXNcblxuLy8gdXNlZCBmb3IgZmFsbGJhY2sgaW4gXCJhbGxSZXNvbHZlZFwiXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9O1xuXG4vLyBVc2UgdGhlIGZhc3Rlc3QgcG9zc2libGUgbWVhbnMgdG8gZXhlY3V0ZSBhIHRhc2sgaW4gYSBmdXR1cmUgdHVyblxuLy8gb2YgdGhlIGV2ZW50IGxvb3AuXG52YXIgbmV4dFRpY2sgPShmdW5jdGlvbiAoKSB7XG4gICAgLy8gbGlua2VkIGxpc3Qgb2YgdGFza3MgKHNpbmdsZSwgd2l0aCBoZWFkIG5vZGUpXG4gICAgdmFyIGhlYWQgPSB7dGFzazogdm9pZCAwLCBuZXh0OiBudWxsfTtcbiAgICB2YXIgdGFpbCA9IGhlYWQ7XG4gICAgdmFyIGZsdXNoaW5nID0gZmFsc2U7XG4gICAgdmFyIHJlcXVlc3RUaWNrID0gdm9pZCAwO1xuICAgIHZhciBpc05vZGVKUyA9IGZhbHNlO1xuICAgIC8vIHF1ZXVlIGZvciBsYXRlIHRhc2tzLCB1c2VkIGJ5IHVuaGFuZGxlZCByZWplY3Rpb24gdHJhY2tpbmdcbiAgICB2YXIgbGF0ZXJRdWV1ZSA9IFtdO1xuXG4gICAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgICAgIC8qIGpzaGludCBsb29wZnVuYzogdHJ1ZSAqL1xuICAgICAgICB2YXIgdGFzaywgZG9tYWluO1xuXG4gICAgICAgIHdoaWxlIChoZWFkLm5leHQpIHtcbiAgICAgICAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICAgICAgICB0YXNrID0gaGVhZC50YXNrO1xuICAgICAgICAgICAgaGVhZC50YXNrID0gdm9pZCAwO1xuICAgICAgICAgICAgZG9tYWluID0gaGVhZC5kb21haW47XG5cbiAgICAgICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICAgICAgICBoZWFkLmRvbWFpbiA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJ1blNpbmdsZSh0YXNrLCBkb21haW4pO1xuXG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGxhdGVyUXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICB0YXNrID0gbGF0ZXJRdWV1ZS5wb3AoKTtcbiAgICAgICAgICAgIHJ1blNpbmdsZSh0YXNrKTtcbiAgICAgICAgfVxuICAgICAgICBmbHVzaGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBydW5zIGEgc2luZ2xlIGZ1bmN0aW9uIGluIHRoZSBhc3luYyBxdWV1ZVxuICAgIGZ1bmN0aW9uIHJ1blNpbmdsZSh0YXNrLCBkb21haW4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRhc2soKTtcblxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoaXNOb2RlSlMpIHtcbiAgICAgICAgICAgICAgICAvLyBJbiBub2RlLCB1bmNhdWdodCBleGNlcHRpb25zIGFyZSBjb25zaWRlcmVkIGZhdGFsIGVycm9ycy5cbiAgICAgICAgICAgICAgICAvLyBSZS10aHJvdyB0aGVtIHN5bmNocm9ub3VzbHkgdG8gaW50ZXJydXB0IGZsdXNoaW5nIVxuXG4gICAgICAgICAgICAgICAgLy8gRW5zdXJlIGNvbnRpbnVhdGlvbiBpZiB0aGUgdW5jYXVnaHQgZXhjZXB0aW9uIGlzIHN1cHByZXNzZWRcbiAgICAgICAgICAgICAgICAvLyBsaXN0ZW5pbmcgXCJ1bmNhdWdodEV4Y2VwdGlvblwiIGV2ZW50cyAoYXMgZG9tYWlucyBkb2VzKS5cbiAgICAgICAgICAgICAgICAvLyBDb250aW51ZSBpbiBuZXh0IGV2ZW50IHRvIGF2b2lkIHRpY2sgcmVjdXJzaW9uLlxuICAgICAgICAgICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmbHVzaCwgMCk7XG4gICAgICAgICAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgICAgICAgICAgICBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEluIGJyb3dzZXJzLCB1bmNhdWdodCBleGNlcHRpb25zIGFyZSBub3QgZmF0YWwuXG4gICAgICAgICAgICAgICAgLy8gUmUtdGhyb3cgdGhlbSBhc3luY2hyb25vdXNseSB0byBhdm9pZCBzbG93LWRvd25zLlxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgICAgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5leHRUaWNrID0gZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgdGFpbCA9IHRhaWwubmV4dCA9IHtcbiAgICAgICAgICAgIHRhc2s6IHRhc2ssXG4gICAgICAgICAgICBkb21haW46IGlzTm9kZUpTICYmIHByb2Nlc3MuZG9tYWluLFxuICAgICAgICAgICAgbmV4dDogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghZmx1c2hpbmcpIHtcbiAgICAgICAgICAgIGZsdXNoaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlcXVlc3RUaWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgIHByb2Nlc3MudG9TdHJpbmcoKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIgJiYgcHJvY2Vzcy5uZXh0VGljaykge1xuICAgICAgICAvLyBFbnN1cmUgUSBpcyBpbiBhIHJlYWwgTm9kZSBlbnZpcm9ubWVudCwgd2l0aCBhIGBwcm9jZXNzLm5leHRUaWNrYC5cbiAgICAgICAgLy8gVG8gc2VlIHRocm91Z2ggZmFrZSBOb2RlIGVudmlyb25tZW50czpcbiAgICAgICAgLy8gKiBNb2NoYSB0ZXN0IHJ1bm5lciAtIGV4cG9zZXMgYSBgcHJvY2Vzc2AgZ2xvYmFsIHdpdGhvdXQgYSBgbmV4dFRpY2tgXG4gICAgICAgIC8vICogQnJvd3NlcmlmeSAtIGV4cG9zZXMgYSBgcHJvY2Vzcy5uZXhUaWNrYCBmdW5jdGlvbiB0aGF0IHVzZXNcbiAgICAgICAgLy8gICBgc2V0VGltZW91dGAuIEluIHRoaXMgY2FzZSBgc2V0SW1tZWRpYXRlYCBpcyBwcmVmZXJyZWQgYmVjYXVzZVxuICAgICAgICAvLyAgICBpdCBpcyBmYXN0ZXIuIEJyb3dzZXJpZnkncyBgcHJvY2Vzcy50b1N0cmluZygpYCB5aWVsZHNcbiAgICAgICAgLy8gICBcIltvYmplY3QgT2JqZWN0XVwiLCB3aGlsZSBpbiBhIHJlYWwgTm9kZSBlbnZpcm9ubWVudFxuICAgICAgICAvLyAgIGBwcm9jZXNzLm5leHRUaWNrKClgIHlpZWxkcyBcIltvYmplY3QgcHJvY2Vzc11cIi5cbiAgICAgICAgaXNOb2RlSlMgPSB0cnVlO1xuXG4gICAgICAgIHJlcXVlc3RUaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgICAgIH07XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAvLyBJbiBJRTEwLCBOb2RlLmpzIDAuOSssIG9yIGh0dHBzOi8vZ2l0aHViLmNvbS9Ob2JsZUpTL3NldEltbWVkaWF0ZVxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcmVxdWVzdFRpY2sgPSBzZXRJbW1lZGlhdGUuYmluZCh3aW5kb3csIGZsdXNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcXVlc3RUaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNldEltbWVkaWF0ZShmbHVzaCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAvLyBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgLy8gaHR0cDovL3d3dy5ub25ibG9ja2luZy5pby8yMDExLzA2L3dpbmRvd25leHR0aWNrLmh0bWxcbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgLy8gQXQgbGVhc3QgU2FmYXJpIFZlcnNpb24gNi4wLjUgKDg1MzYuMzAuMSkgaW50ZXJtaXR0ZW50bHkgY2Fubm90IGNyZWF0ZVxuICAgICAgICAvLyB3b3JraW5nIG1lc3NhZ2UgcG9ydHMgdGhlIGZpcnN0IHRpbWUgYSBwYWdlIGxvYWRzLlxuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlcXVlc3RUaWNrID0gcmVxdWVzdFBvcnRUaWNrO1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmbHVzaDtcbiAgICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciByZXF1ZXN0UG9ydFRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBPcGVyYSByZXF1aXJlcyB1cyB0byBwcm92aWRlIGEgbWVzc2FnZSBwYXlsb2FkLCByZWdhcmRsZXNzIG9mXG4gICAgICAgICAgICAvLyB3aGV0aGVyIHdlIHVzZSBpdC5cbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3RUaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmbHVzaCwgMCk7XG4gICAgICAgICAgICByZXF1ZXN0UG9ydFRpY2soKTtcbiAgICAgICAgfTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG9sZCBicm93c2Vyc1xuICAgICAgICByZXF1ZXN0VGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZmx1c2gsIDApO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyBydW5zIGEgdGFzayBhZnRlciBhbGwgb3RoZXIgdGFza3MgaGF2ZSBiZWVuIHJ1blxuICAgIC8vIHRoaXMgaXMgdXNlZnVsIGZvciB1bmhhbmRsZWQgcmVqZWN0aW9uIHRyYWNraW5nIHRoYXQgbmVlZHMgdG8gaGFwcGVuXG4gICAgLy8gYWZ0ZXIgYWxsIGB0aGVuYGQgdGFza3MgaGF2ZSBiZWVuIHJ1bi5cbiAgICBuZXh0VGljay5ydW5BZnRlciA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgIGxhdGVyUXVldWUucHVzaCh0YXNrKTtcbiAgICAgICAgaWYgKCFmbHVzaGluZykge1xuICAgICAgICAgICAgZmx1c2hpbmcgPSB0cnVlO1xuICAgICAgICAgICAgcmVxdWVzdFRpY2soKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIG5leHRUaWNrO1xufSkoKTtcblxuLy8gQXR0ZW1wdCB0byBtYWtlIGdlbmVyaWNzIHNhZmUgaW4gdGhlIGZhY2Ugb2YgZG93bnN0cmVhbVxuLy8gbW9kaWZpY2F0aW9ucy5cbi8vIFRoZXJlIGlzIG5vIHNpdHVhdGlvbiB3aGVyZSB0aGlzIGlzIG5lY2Vzc2FyeS5cbi8vIElmIHlvdSBuZWVkIGEgc2VjdXJpdHkgZ3VhcmFudGVlLCB0aGVzZSBwcmltb3JkaWFscyBuZWVkIHRvIGJlXG4vLyBkZWVwbHkgZnJvemVuIGFueXdheSwgYW5kIGlmIHlvdSBkb27igJl0IG5lZWQgYSBzZWN1cml0eSBndWFyYW50ZWUsXG4vLyB0aGlzIGlzIGp1c3QgcGxhaW4gcGFyYW5vaWQuXG4vLyBIb3dldmVyLCB0aGlzICoqbWlnaHQqKiBoYXZlIHRoZSBuaWNlIHNpZGUtZWZmZWN0IG9mIHJlZHVjaW5nIHRoZSBzaXplIG9mXG4vLyB0aGUgbWluaWZpZWQgY29kZSBieSByZWR1Y2luZyB4LmNhbGwoKSB0byBtZXJlbHkgeCgpXG4vLyBTZWUgTWFyayBNaWxsZXLigJlzIGV4cGxhbmF0aW9uIG9mIHdoYXQgdGhpcyBkb2VzLlxuLy8gaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9Y29udmVudGlvbnM6c2FmZV9tZXRhX3Byb2dyYW1taW5nXG52YXIgY2FsbCA9IEZ1bmN0aW9uLmNhbGw7XG5mdW5jdGlvbiB1bmN1cnJ5VGhpcyhmKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNhbGwuYXBwbHkoZiwgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuLy8gVGhpcyBpcyBlcXVpdmFsZW50LCBidXQgc2xvd2VyOlxuLy8gdW5jdXJyeVRoaXMgPSBGdW5jdGlvbl9iaW5kLmJpbmQoRnVuY3Rpb25fYmluZC5jYWxsKTtcbi8vIGh0dHA6Ly9qc3BlcmYuY29tL3VuY3Vycnl0aGlzXG5cbnZhciBhcnJheV9zbGljZSA9IHVuY3VycnlUaGlzKEFycmF5LnByb3RvdHlwZS5zbGljZSk7XG5cbnZhciBhcnJheV9yZWR1Y2UgPSB1bmN1cnJ5VGhpcyhcbiAgICBBcnJheS5wcm90b3R5cGUucmVkdWNlIHx8IGZ1bmN0aW9uIChjYWxsYmFjaywgYmFzaXMpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMCxcbiAgICAgICAgICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICAgICAgICAvLyBjb25jZXJuaW5nIHRoZSBpbml0aWFsIHZhbHVlLCBpZiBvbmUgaXMgbm90IHByb3ZpZGVkXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAvLyBzZWVrIHRvIHRoZSBmaXJzdCB2YWx1ZSBpbiB0aGUgYXJyYXksIGFjY291bnRpbmdcbiAgICAgICAgICAgIC8vIGZvciB0aGUgcG9zc2liaWxpdHkgdGhhdCBpcyBpcyBhIHNwYXJzZSBhcnJheVxuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCBpbiB0aGlzKSB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2lzID0gdGhpc1tpbmRleCsrXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgrK2luZGV4ID49IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSAoMSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVkdWNlXG4gICAgICAgIGZvciAoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgLy8gYWNjb3VudCBmb3IgdGhlIHBvc3NpYmlsaXR5IHRoYXQgdGhlIGFycmF5IGlzIHNwYXJzZVxuICAgICAgICAgICAgaWYgKGluZGV4IGluIHRoaXMpIHtcbiAgICAgICAgICAgICAgICBiYXNpcyA9IGNhbGxiYWNrKGJhc2lzLCB0aGlzW2luZGV4XSwgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiYXNpcztcbiAgICB9XG4pO1xuXG52YXIgYXJyYXlfaW5kZXhPZiA9IHVuY3VycnlUaGlzKFxuICAgIEFycmF5LnByb3RvdHlwZS5pbmRleE9mIHx8IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAvLyBub3QgYSB2ZXJ5IGdvb2Qgc2hpbSwgYnV0IGdvb2QgZW5vdWdoIGZvciBvdXIgb25lIHVzZSBvZiBpdFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzW2ldID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4pO1xuXG52YXIgYXJyYXlfbWFwID0gdW5jdXJyeVRoaXMoXG4gICAgQXJyYXkucHJvdG90eXBlLm1hcCB8fCBmdW5jdGlvbiAoY2FsbGJhY2ssIHRoaXNwKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNvbGxlY3QgPSBbXTtcbiAgICAgICAgYXJyYXlfcmVkdWNlKHNlbGYsIGZ1bmN0aW9uICh1bmRlZmluZWQsIHZhbHVlLCBpbmRleCkge1xuICAgICAgICAgICAgY29sbGVjdC5wdXNoKGNhbGxiYWNrLmNhbGwodGhpc3AsIHZhbHVlLCBpbmRleCwgc2VsZikpO1xuICAgICAgICB9LCB2b2lkIDApO1xuICAgICAgICByZXR1cm4gY29sbGVjdDtcbiAgICB9XG4pO1xuXG52YXIgb2JqZWN0X2NyZWF0ZSA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gKHByb3RvdHlwZSkge1xuICAgIGZ1bmN0aW9uIFR5cGUoKSB7IH1cbiAgICBUeXBlLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbiAgICByZXR1cm4gbmV3IFR5cGUoKTtcbn07XG5cbnZhciBvYmplY3RfaGFzT3duUHJvcGVydHkgPSB1bmN1cnJ5VGhpcyhPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcblxudmFyIG9iamVjdF9rZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0X2hhc093blByb3BlcnR5KG9iamVjdCwga2V5KSkge1xuICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGtleXM7XG59O1xuXG52YXIgb2JqZWN0X3RvU3RyaW5nID0gdW5jdXJyeVRoaXMoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyk7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBPYmplY3QodmFsdWUpO1xufVxuXG4vLyBnZW5lcmF0b3IgcmVsYXRlZCBzaGltc1xuXG4vLyBGSVhNRTogUmVtb3ZlIHRoaXMgZnVuY3Rpb24gb25jZSBFUzYgZ2VuZXJhdG9ycyBhcmUgaW4gU3BpZGVyTW9ua2V5LlxuZnVuY3Rpb24gaXNTdG9wSXRlcmF0aW9uKGV4Y2VwdGlvbikge1xuICAgIHJldHVybiAoXG4gICAgICAgIG9iamVjdF90b1N0cmluZyhleGNlcHRpb24pID09PSBcIltvYmplY3QgU3RvcEl0ZXJhdGlvbl1cIiB8fFxuICAgICAgICBleGNlcHRpb24gaW5zdGFuY2VvZiBRUmV0dXJuVmFsdWVcbiAgICApO1xufVxuXG4vLyBGSVhNRTogUmVtb3ZlIHRoaXMgaGVscGVyIGFuZCBRLnJldHVybiBvbmNlIEVTNiBnZW5lcmF0b3JzIGFyZSBpblxuLy8gU3BpZGVyTW9ua2V5LlxudmFyIFFSZXR1cm5WYWx1ZTtcbmlmICh0eXBlb2YgUmV0dXJuVmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBRUmV0dXJuVmFsdWUgPSBSZXR1cm5WYWx1ZTtcbn0gZWxzZSB7XG4gICAgUVJldHVyblZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9O1xufVxuXG4vLyBsb25nIHN0YWNrIHRyYWNlc1xuXG52YXIgU1RBQ0tfSlVNUF9TRVBBUkFUT1IgPSBcIkZyb20gcHJldmlvdXMgZXZlbnQ6XCI7XG5cbmZ1bmN0aW9uIG1ha2VTdGFja1RyYWNlTG9uZyhlcnJvciwgcHJvbWlzZSkge1xuICAgIC8vIElmIHBvc3NpYmxlLCB0cmFuc2Zvcm0gdGhlIGVycm9yIHN0YWNrIHRyYWNlIGJ5IHJlbW92aW5nIE5vZGUgYW5kIFFcbiAgICAvLyBjcnVmdCwgdGhlbiBjb25jYXRlbmF0aW5nIHdpdGggdGhlIHN0YWNrIHRyYWNlIG9mIGBwcm9taXNlYC4gU2VlICM1Ny5cbiAgICBpZiAoaGFzU3RhY2tzICYmXG4gICAgICAgIHByb21pc2Uuc3RhY2sgJiZcbiAgICAgICAgdHlwZW9mIGVycm9yID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgIGVycm9yICE9PSBudWxsICYmXG4gICAgICAgIGVycm9yLnN0YWNrICYmXG4gICAgICAgIGVycm9yLnN0YWNrLmluZGV4T2YoU1RBQ0tfSlVNUF9TRVBBUkFUT1IpID09PSAtMVxuICAgICkge1xuICAgICAgICB2YXIgc3RhY2tzID0gW107XG4gICAgICAgIGZvciAodmFyIHAgPSBwcm9taXNlOyAhIXA7IHAgPSBwLnNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKHAuc3RhY2spIHtcbiAgICAgICAgICAgICAgICBzdGFja3MudW5zaGlmdChwLnN0YWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdGFja3MudW5zaGlmdChlcnJvci5zdGFjayk7XG5cbiAgICAgICAgdmFyIGNvbmNhdGVkU3RhY2tzID0gc3RhY2tzLmpvaW4oXCJcXG5cIiArIFNUQUNLX0pVTVBfU0VQQVJBVE9SICsgXCJcXG5cIik7XG4gICAgICAgIGVycm9yLnN0YWNrID0gZmlsdGVyU3RhY2tTdHJpbmcoY29uY2F0ZWRTdGFja3MpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZmlsdGVyU3RhY2tTdHJpbmcoc3RhY2tTdHJpbmcpIHtcbiAgICB2YXIgbGluZXMgPSBzdGFja1N0cmluZy5zcGxpdChcIlxcblwiKTtcbiAgICB2YXIgZGVzaXJlZExpbmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgbGluZSA9IGxpbmVzW2ldO1xuXG4gICAgICAgIGlmICghaXNJbnRlcm5hbEZyYW1lKGxpbmUpICYmICFpc05vZGVGcmFtZShsaW5lKSAmJiBsaW5lKSB7XG4gICAgICAgICAgICBkZXNpcmVkTGluZXMucHVzaChsaW5lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVzaXJlZExpbmVzLmpvaW4oXCJcXG5cIik7XG59XG5cbmZ1bmN0aW9uIGlzTm9kZUZyYW1lKHN0YWNrTGluZSkge1xuICAgIHJldHVybiBzdGFja0xpbmUuaW5kZXhPZihcIihtb2R1bGUuanM6XCIpICE9PSAtMSB8fFxuICAgICAgICAgICBzdGFja0xpbmUuaW5kZXhPZihcIihub2RlLmpzOlwiKSAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIGdldEZpbGVOYW1lQW5kTGluZU51bWJlcihzdGFja0xpbmUpIHtcbiAgICAvLyBOYW1lZCBmdW5jdGlvbnM6IFwiYXQgZnVuY3Rpb25OYW1lIChmaWxlbmFtZTpsaW5lTnVtYmVyOmNvbHVtbk51bWJlcilcIlxuICAgIC8vIEluIElFMTAgZnVuY3Rpb24gbmFtZSBjYW4gaGF2ZSBzcGFjZXMgKFwiQW5vbnltb3VzIGZ1bmN0aW9uXCIpIE9fb1xuICAgIHZhciBhdHRlbXB0MSA9IC9hdCAuKyBcXCgoLispOihcXGQrKTooPzpcXGQrKVxcKSQvLmV4ZWMoc3RhY2tMaW5lKTtcbiAgICBpZiAoYXR0ZW1wdDEpIHtcbiAgICAgICAgcmV0dXJuIFthdHRlbXB0MVsxXSwgTnVtYmVyKGF0dGVtcHQxWzJdKV07XG4gICAgfVxuXG4gICAgLy8gQW5vbnltb3VzIGZ1bmN0aW9uczogXCJhdCBmaWxlbmFtZTpsaW5lTnVtYmVyOmNvbHVtbk51bWJlclwiXG4gICAgdmFyIGF0dGVtcHQyID0gL2F0IChbXiBdKyk6KFxcZCspOig/OlxcZCspJC8uZXhlYyhzdGFja0xpbmUpO1xuICAgIGlmIChhdHRlbXB0Mikge1xuICAgICAgICByZXR1cm4gW2F0dGVtcHQyWzFdLCBOdW1iZXIoYXR0ZW1wdDJbMl0pXTtcbiAgICB9XG5cbiAgICAvLyBGaXJlZm94IHN0eWxlOiBcImZ1bmN0aW9uQGZpbGVuYW1lOmxpbmVOdW1iZXIgb3IgQGZpbGVuYW1lOmxpbmVOdW1iZXJcIlxuICAgIHZhciBhdHRlbXB0MyA9IC8uKkAoLispOihcXGQrKSQvLmV4ZWMoc3RhY2tMaW5lKTtcbiAgICBpZiAoYXR0ZW1wdDMpIHtcbiAgICAgICAgcmV0dXJuIFthdHRlbXB0M1sxXSwgTnVtYmVyKGF0dGVtcHQzWzJdKV07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0ludGVybmFsRnJhbWUoc3RhY2tMaW5lKSB7XG4gICAgdmFyIGZpbGVOYW1lQW5kTGluZU51bWJlciA9IGdldEZpbGVOYW1lQW5kTGluZU51bWJlcihzdGFja0xpbmUpO1xuXG4gICAgaWYgKCFmaWxlTmFtZUFuZExpbmVOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBmaWxlTmFtZSA9IGZpbGVOYW1lQW5kTGluZU51bWJlclswXTtcbiAgICB2YXIgbGluZU51bWJlciA9IGZpbGVOYW1lQW5kTGluZU51bWJlclsxXTtcblxuICAgIHJldHVybiBmaWxlTmFtZSA9PT0gcUZpbGVOYW1lICYmXG4gICAgICAgIGxpbmVOdW1iZXIgPj0gcVN0YXJ0aW5nTGluZSAmJlxuICAgICAgICBsaW5lTnVtYmVyIDw9IHFFbmRpbmdMaW5lO1xufVxuXG4vLyBkaXNjb3ZlciBvd24gZmlsZSBuYW1lIGFuZCBsaW5lIG51bWJlciByYW5nZSBmb3IgZmlsdGVyaW5nIHN0YWNrXG4vLyB0cmFjZXNcbmZ1bmN0aW9uIGNhcHR1cmVMaW5lKCkge1xuICAgIGlmICghaGFzU3RhY2tzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IGUuc3RhY2suc3BsaXQoXCJcXG5cIik7XG4gICAgICAgIHZhciBmaXJzdExpbmUgPSBsaW5lc1swXS5pbmRleE9mKFwiQFwiKSA+IDAgPyBsaW5lc1sxXSA6IGxpbmVzWzJdO1xuICAgICAgICB2YXIgZmlsZU5hbWVBbmRMaW5lTnVtYmVyID0gZ2V0RmlsZU5hbWVBbmRMaW5lTnVtYmVyKGZpcnN0TGluZSk7XG4gICAgICAgIGlmICghZmlsZU5hbWVBbmRMaW5lTnVtYmVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBxRmlsZU5hbWUgPSBmaWxlTmFtZUFuZExpbmVOdW1iZXJbMF07XG4gICAgICAgIHJldHVybiBmaWxlTmFtZUFuZExpbmVOdW1iZXJbMV07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZXByZWNhdGUoY2FsbGJhY2ssIG5hbWUsIGFsdGVybmF0aXZlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihuYW1lICsgXCIgaXMgZGVwcmVjYXRlZCwgdXNlIFwiICsgYWx0ZXJuYXRpdmUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwiIGluc3RlYWQuXCIsIG5ldyBFcnJvcihcIlwiKS5zdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbi8vIGVuZCBvZiBzaGltc1xuLy8gYmVnaW5uaW5nIG9mIHJlYWwgd29ya1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBwcm9taXNlIGZvciBhbiBpbW1lZGlhdGUgcmVmZXJlbmNlLCBwYXNzZXMgcHJvbWlzZXMgdGhyb3VnaCwgb3JcbiAqIGNvZXJjZXMgcHJvbWlzZXMgZnJvbSBkaWZmZXJlbnQgc3lzdGVtcy5cbiAqIEBwYXJhbSB2YWx1ZSBpbW1lZGlhdGUgcmVmZXJlbmNlIG9yIHByb21pc2VcbiAqL1xuZnVuY3Rpb24gUSh2YWx1ZSkge1xuICAgIC8vIElmIHRoZSBvYmplY3QgaXMgYWxyZWFkeSBhIFByb21pc2UsIHJldHVybiBpdCBkaXJlY3RseS4gIFRoaXMgZW5hYmxlc1xuICAgIC8vIHRoZSByZXNvbHZlIGZ1bmN0aW9uIHRvIGJvdGggYmUgdXNlZCB0byBjcmVhdGVkIHJlZmVyZW5jZXMgZnJvbSBvYmplY3RzLFxuICAgIC8vIGJ1dCB0byB0b2xlcmFibHkgY29lcmNlIG5vbi1wcm9taXNlcyB0byBwcm9taXNlcy5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBhc3NpbWlsYXRlIHRoZW5hYmxlc1xuICAgIGlmIChpc1Byb21pc2VBbGlrZSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGNvZXJjZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bGZpbGwodmFsdWUpO1xuICAgIH1cbn1cblEucmVzb2x2ZSA9IFE7XG5cbi8qKlxuICogUGVyZm9ybXMgYSB0YXNrIGluIGEgZnV0dXJlIHR1cm4gb2YgdGhlIGV2ZW50IGxvb3AuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0YXNrXG4gKi9cblEubmV4dFRpY2sgPSBuZXh0VGljaztcblxuLyoqXG4gKiBDb250cm9scyB3aGV0aGVyIG9yIG5vdCBsb25nIHN0YWNrIHRyYWNlcyB3aWxsIGJlIG9uXG4gKi9cblEubG9uZ1N0YWNrU3VwcG9ydCA9IGZhbHNlO1xuXG4vLyBlbmFibGUgbG9uZyBzdGFja3MgaWYgUV9ERUJVRyBpcyBzZXRcbmlmICh0eXBlb2YgcHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJiBwcm9jZXNzICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52LlFfREVCVUcpIHtcbiAgICBRLmxvbmdTdGFja1N1cHBvcnQgPSB0cnVlO1xufVxuXG4vKipcbiAqIENvbnN0cnVjdHMgYSB7cHJvbWlzZSwgcmVzb2x2ZSwgcmVqZWN0fSBvYmplY3QuXG4gKlxuICogYHJlc29sdmVgIGlzIGEgY2FsbGJhY2sgdG8gaW52b2tlIHdpdGggYSBtb3JlIHJlc29sdmVkIHZhbHVlIGZvciB0aGVcbiAqIHByb21pc2UuIFRvIGZ1bGZpbGwgdGhlIHByb21pc2UsIGludm9rZSBgcmVzb2x2ZWAgd2l0aCBhbnkgdmFsdWUgdGhhdCBpc1xuICogbm90IGEgdGhlbmFibGUuIFRvIHJlamVjdCB0aGUgcHJvbWlzZSwgaW52b2tlIGByZXNvbHZlYCB3aXRoIGEgcmVqZWN0ZWRcbiAqIHRoZW5hYmxlLCBvciBpbnZva2UgYHJlamVjdGAgd2l0aCB0aGUgcmVhc29uIGRpcmVjdGx5LiBUbyByZXNvbHZlIHRoZVxuICogcHJvbWlzZSB0byBhbm90aGVyIHRoZW5hYmxlLCB0aHVzIHB1dHRpbmcgaXQgaW4gdGhlIHNhbWUgc3RhdGUsIGludm9rZVxuICogYHJlc29sdmVgIHdpdGggdGhhdCBvdGhlciB0aGVuYWJsZS5cbiAqL1xuUS5kZWZlciA9IGRlZmVyO1xuZnVuY3Rpb24gZGVmZXIoKSB7XG4gICAgLy8gaWYgXCJtZXNzYWdlc1wiIGlzIGFuIFwiQXJyYXlcIiwgdGhhdCBpbmRpY2F0ZXMgdGhhdCB0aGUgcHJvbWlzZSBoYXMgbm90IHlldFxuICAgIC8vIGJlZW4gcmVzb2x2ZWQuICBJZiBpdCBpcyBcInVuZGVmaW5lZFwiLCBpdCBoYXMgYmVlbiByZXNvbHZlZC4gIEVhY2hcbiAgICAvLyBlbGVtZW50IG9mIHRoZSBtZXNzYWdlcyBhcnJheSBpcyBpdHNlbGYgYW4gYXJyYXkgb2YgY29tcGxldGUgYXJndW1lbnRzIHRvXG4gICAgLy8gZm9yd2FyZCB0byB0aGUgcmVzb2x2ZWQgcHJvbWlzZS4gIFdlIGNvZXJjZSB0aGUgcmVzb2x1dGlvbiB2YWx1ZSB0byBhXG4gICAgLy8gcHJvbWlzZSB1c2luZyB0aGUgYHJlc29sdmVgIGZ1bmN0aW9uIGJlY2F1c2UgaXQgaGFuZGxlcyBib3RoIGZ1bGx5XG4gICAgLy8gbm9uLXRoZW5hYmxlIHZhbHVlcyBhbmQgb3RoZXIgdGhlbmFibGVzIGdyYWNlZnVsbHkuXG4gICAgdmFyIG1lc3NhZ2VzID0gW10sIHByb2dyZXNzTGlzdGVuZXJzID0gW10sIHJlc29sdmVkUHJvbWlzZTtcblxuICAgIHZhciBkZWZlcnJlZCA9IG9iamVjdF9jcmVhdGUoZGVmZXIucHJvdG90eXBlKTtcbiAgICB2YXIgcHJvbWlzZSA9IG9iamVjdF9jcmVhdGUoUHJvbWlzZS5wcm90b3R5cGUpO1xuXG4gICAgcHJvbWlzZS5wcm9taXNlRGlzcGF0Y2ggPSBmdW5jdGlvbiAocmVzb2x2ZSwgb3AsIG9wZXJhbmRzKSB7XG4gICAgICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzKTtcbiAgICAgICAgaWYgKG1lc3NhZ2VzKSB7XG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKGFyZ3MpO1xuICAgICAgICAgICAgaWYgKG9wID09PSBcIndoZW5cIiAmJiBvcGVyYW5kc1sxXSkgeyAvLyBwcm9ncmVzcyBvcGVyYW5kXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NMaXN0ZW5lcnMucHVzaChvcGVyYW5kc1sxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBRLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlZFByb21pc2UucHJvbWlzZURpc3BhdGNoLmFwcGx5KHJlc29sdmVkUHJvbWlzZSwgYXJncyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBYWFggZGVwcmVjYXRlZFxuICAgIHByb21pc2UudmFsdWVPZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmVhcmVyVmFsdWUgPSBuZWFyZXIocmVzb2x2ZWRQcm9taXNlKTtcbiAgICAgICAgaWYgKGlzUHJvbWlzZShuZWFyZXJWYWx1ZSkpIHtcbiAgICAgICAgICAgIHJlc29sdmVkUHJvbWlzZSA9IG5lYXJlclZhbHVlOyAvLyBzaG9ydGVuIGNoYWluXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5lYXJlclZhbHVlO1xuICAgIH07XG5cbiAgICBwcm9taXNlLmluc3BlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghcmVzb2x2ZWRQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdGF0ZTogXCJwZW5kaW5nXCIgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzb2x2ZWRQcm9taXNlLmluc3BlY3QoKTtcbiAgICB9O1xuXG4gICAgaWYgKFEubG9uZ1N0YWNrU3VwcG9ydCAmJiBoYXNTdGFja3MpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBOT1RFOiBkb24ndCB0cnkgdG8gdXNlIGBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZWAgb3IgdHJhbnNmZXIgdGhlXG4gICAgICAgICAgICAvLyBhY2Nlc3NvciBhcm91bmQ7IHRoYXQgY2F1c2VzIG1lbW9yeSBsZWFrcyBhcyBwZXIgR0gtMTExLiBKdXN0XG4gICAgICAgICAgICAvLyByZWlmeSB0aGUgc3RhY2sgdHJhY2UgYXMgYSBzdHJpbmcgQVNBUC5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBBdCB0aGUgc2FtZSB0aW1lLCBjdXQgb2ZmIHRoZSBmaXJzdCBsaW5lOyBpdCdzIGFsd2F5cyBqdXN0XG4gICAgICAgICAgICAvLyBcIltvYmplY3QgUHJvbWlzZV1cXG5cIiwgYXMgcGVyIHRoZSBgdG9TdHJpbmdgLlxuICAgICAgICAgICAgcHJvbWlzZS5zdGFjayA9IGUuc3RhY2suc3Vic3RyaW5nKGUuc3RhY2suaW5kZXhPZihcIlxcblwiKSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTk9URTogd2UgZG8gdGhlIGNoZWNrcyBmb3IgYHJlc29sdmVkUHJvbWlzZWAgaW4gZWFjaCBtZXRob2QsIGluc3RlYWQgb2ZcbiAgICAvLyBjb25zb2xpZGF0aW5nIHRoZW0gaW50byBgYmVjb21lYCwgc2luY2Ugb3RoZXJ3aXNlIHdlJ2QgY3JlYXRlIG5ld1xuICAgIC8vIHByb21pc2VzIHdpdGggdGhlIGxpbmVzIGBiZWNvbWUod2hhdGV2ZXIodmFsdWUpKWAuIFNlZSBlLmcuIEdILTI1Mi5cblxuICAgIGZ1bmN0aW9uIGJlY29tZShuZXdQcm9taXNlKSB7XG4gICAgICAgIHJlc29sdmVkUHJvbWlzZSA9IG5ld1Byb21pc2U7XG4gICAgICAgIHByb21pc2Uuc291cmNlID0gbmV3UHJvbWlzZTtcblxuICAgICAgICBhcnJheV9yZWR1Y2UobWVzc2FnZXMsIGZ1bmN0aW9uICh1bmRlZmluZWQsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIFEubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5ld1Byb21pc2UucHJvbWlzZURpc3BhdGNoLmFwcGx5KG5ld1Byb21pc2UsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHZvaWQgMCk7XG5cbiAgICAgICAgbWVzc2FnZXMgPSB2b2lkIDA7XG4gICAgICAgIHByb2dyZXNzTGlzdGVuZXJzID0gdm9pZCAwO1xuICAgIH1cblxuICAgIGRlZmVycmVkLnByb21pc2UgPSBwcm9taXNlO1xuICAgIGRlZmVycmVkLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHJlc29sdmVkUHJvbWlzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYmVjb21lKFEodmFsdWUpKTtcbiAgICB9O1xuXG4gICAgZGVmZXJyZWQuZnVsZmlsbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAocmVzb2x2ZWRQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBiZWNvbWUoZnVsZmlsbCh2YWx1ZSkpO1xuICAgIH07XG4gICAgZGVmZXJyZWQucmVqZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICBpZiAocmVzb2x2ZWRQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBiZWNvbWUocmVqZWN0KHJlYXNvbikpO1xuICAgIH07XG4gICAgZGVmZXJyZWQubm90aWZ5ID0gZnVuY3Rpb24gKHByb2dyZXNzKSB7XG4gICAgICAgIGlmIChyZXNvbHZlZFByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFycmF5X3JlZHVjZShwcm9ncmVzc0xpc3RlbmVycywgZnVuY3Rpb24gKHVuZGVmaW5lZCwgcHJvZ3Jlc3NMaXN0ZW5lcikge1xuICAgICAgICAgICAgUS5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NMaXN0ZW5lcihwcm9ncmVzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdm9pZCAwKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRlZmVycmVkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBOb2RlLXN0eWxlIGNhbGxiYWNrIHRoYXQgd2lsbCByZXNvbHZlIG9yIHJlamVjdCB0aGUgZGVmZXJyZWRcbiAqIHByb21pc2UuXG4gKiBAcmV0dXJucyBhIG5vZGViYWNrXG4gKi9cbmRlZmVyLnByb3RvdHlwZS5tYWtlTm9kZVJlc29sdmVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gKGVycm9yLCB2YWx1ZSkge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNlbGYucmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgc2VsZi5yZXNvbHZlKGFycmF5X3NsaWNlKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5yZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG4vKipcbiAqIEBwYXJhbSByZXNvbHZlciB7RnVuY3Rpb259IGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIG5vdGhpbmcgYW5kIGFjY2VwdHNcbiAqIHRoZSByZXNvbHZlLCByZWplY3QsIGFuZCBub3RpZnkgZnVuY3Rpb25zIGZvciBhIGRlZmVycmVkLlxuICogQHJldHVybnMgYSBwcm9taXNlIHRoYXQgbWF5IGJlIHJlc29sdmVkIHdpdGggdGhlIGdpdmVuIHJlc29sdmUgYW5kIHJlamVjdFxuICogZnVuY3Rpb25zLCBvciByZWplY3RlZCBieSBhIHRocm93biBleGNlcHRpb24gaW4gcmVzb2x2ZXJcbiAqL1xuUS5Qcm9taXNlID0gcHJvbWlzZTsgLy8gRVM2XG5RLnByb21pc2UgPSBwcm9taXNlO1xuZnVuY3Rpb24gcHJvbWlzZShyZXNvbHZlcikge1xuICAgIGlmICh0eXBlb2YgcmVzb2x2ZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwicmVzb2x2ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uLlwiKTtcbiAgICB9XG4gICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICB0cnkge1xuICAgICAgICByZXNvbHZlcihkZWZlcnJlZC5yZXNvbHZlLCBkZWZlcnJlZC5yZWplY3QsIGRlZmVycmVkLm5vdGlmeSk7XG4gICAgfSBjYXRjaCAocmVhc29uKSB7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdChyZWFzb24pO1xuICAgIH1cbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn1cblxucHJvbWlzZS5yYWNlID0gcmFjZTsgLy8gRVM2XG5wcm9taXNlLmFsbCA9IGFsbDsgLy8gRVM2XG5wcm9taXNlLnJlamVjdCA9IHJlamVjdDsgLy8gRVM2XG5wcm9taXNlLnJlc29sdmUgPSBROyAvLyBFUzZcblxuLy8gWFhYIGV4cGVyaW1lbnRhbC4gIFRoaXMgbWV0aG9kIGlzIGEgd2F5IHRvIGRlbm90ZSB0aGF0IGEgbG9jYWwgdmFsdWUgaXNcbi8vIHNlcmlhbGl6YWJsZSBhbmQgc2hvdWxkIGJlIGltbWVkaWF0ZWx5IGRpc3BhdGNoZWQgdG8gYSByZW1vdGUgdXBvbiByZXF1ZXN0LFxuLy8gaW5zdGVhZCBvZiBwYXNzaW5nIGEgcmVmZXJlbmNlLlxuUS5wYXNzQnlDb3B5ID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIC8vZnJlZXplKG9iamVjdCk7XG4gICAgLy9wYXNzQnlDb3BpZXMuc2V0KG9iamVjdCwgdHJ1ZSk7XG4gICAgcmV0dXJuIG9iamVjdDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnBhc3NCeUNvcHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy9mcmVlemUob2JqZWN0KTtcbiAgICAvL3Bhc3NCeUNvcGllcy5zZXQob2JqZWN0LCB0cnVlKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogSWYgdHdvIHByb21pc2VzIGV2ZW50dWFsbHkgZnVsZmlsbCB0byB0aGUgc2FtZSB2YWx1ZSwgcHJvbWlzZXMgdGhhdCB2YWx1ZSxcbiAqIGJ1dCBvdGhlcndpc2UgcmVqZWN0cy5cbiAqIEBwYXJhbSB4IHtBbnkqfVxuICogQHBhcmFtIHkge0FueSp9XG4gKiBAcmV0dXJucyB7QW55Kn0gYSBwcm9taXNlIGZvciB4IGFuZCB5IGlmIHRoZXkgYXJlIHRoZSBzYW1lLCBidXQgYSByZWplY3Rpb25cbiAqIG90aGVyd2lzZS5cbiAqXG4gKi9cblEuam9pbiA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgcmV0dXJuIFEoeCkuam9pbih5KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmpvaW4gPSBmdW5jdGlvbiAodGhhdCkge1xuICAgIHJldHVybiBRKFt0aGlzLCB0aGF0XSkuc3ByZWFkKGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBcIj09PVwiIHNob3VsZCBiZSBPYmplY3QuaXMgb3IgZXF1aXZcbiAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3Qgam9pbjogbm90IHRoZSBzYW1lOiBcIiArIHggKyBcIiBcIiArIHkpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwcm9taXNlIGZvciB0aGUgZmlyc3Qgb2YgYW4gYXJyYXkgb2YgcHJvbWlzZXMgdG8gYmVjb21lIHNldHRsZWQuXG4gKiBAcGFyYW0gYW5zd2VycyB7QXJyYXlbQW55Kl19IHByb21pc2VzIHRvIHJhY2VcbiAqIEByZXR1cm5zIHtBbnkqfSB0aGUgZmlyc3QgcHJvbWlzZSB0byBiZSBzZXR0bGVkXG4gKi9cblEucmFjZSA9IHJhY2U7XG5mdW5jdGlvbiByYWNlKGFuc3dlclBzKSB7XG4gICAgcmV0dXJuIHByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAvLyBTd2l0Y2ggdG8gdGhpcyBvbmNlIHdlIGNhbiBhc3N1bWUgYXQgbGVhc3QgRVM1XG4gICAgICAgIC8vIGFuc3dlclBzLmZvckVhY2goZnVuY3Rpb24gKGFuc3dlclApIHtcbiAgICAgICAgLy8gICAgIFEoYW5zd2VyUCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gVXNlIHRoaXMgaW4gdGhlIG1lYW50aW1lXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhbnN3ZXJQcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgUShhbnN3ZXJQc1tpXSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cblByb21pc2UucHJvdG90eXBlLnJhY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbihRLnJhY2UpO1xufTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgUHJvbWlzZSB3aXRoIGEgcHJvbWlzZSBkZXNjcmlwdG9yIG9iamVjdCBhbmQgb3B0aW9uYWwgZmFsbGJhY2tcbiAqIGZ1bmN0aW9uLiAgVGhlIGRlc2NyaXB0b3IgY29udGFpbnMgbWV0aG9kcyBsaWtlIHdoZW4ocmVqZWN0ZWQpLCBnZXQobmFtZSksXG4gKiBzZXQobmFtZSwgdmFsdWUpLCBwb3N0KG5hbWUsIGFyZ3MpLCBhbmQgZGVsZXRlKG5hbWUpLCB3aGljaCBhbGxcbiAqIHJldHVybiBlaXRoZXIgYSB2YWx1ZSwgYSBwcm9taXNlIGZvciBhIHZhbHVlLCBvciBhIHJlamVjdGlvbi4gIFRoZSBmYWxsYmFja1xuICogYWNjZXB0cyB0aGUgb3BlcmF0aW9uIG5hbWUsIGEgcmVzb2x2ZXIsIGFuZCBhbnkgZnVydGhlciBhcmd1bWVudHMgdGhhdCB3b3VsZFxuICogaGF2ZSBiZWVuIGZvcndhcmRlZCB0byB0aGUgYXBwcm9wcmlhdGUgbWV0aG9kIGFib3ZlIGhhZCBhIG1ldGhvZCBiZWVuXG4gKiBwcm92aWRlZCB3aXRoIHRoZSBwcm9wZXIgbmFtZS4gIFRoZSBBUEkgbWFrZXMgbm8gZ3VhcmFudGVlcyBhYm91dCB0aGUgbmF0dXJlXG4gKiBvZiB0aGUgcmV0dXJuZWQgb2JqZWN0LCBhcGFydCBmcm9tIHRoYXQgaXQgaXMgdXNhYmxlIHdoZXJlZXZlciBwcm9taXNlcyBhcmVcbiAqIGJvdWdodCBhbmQgc29sZC5cbiAqL1xuUS5tYWtlUHJvbWlzZSA9IFByb21pc2U7XG5mdW5jdGlvbiBQcm9taXNlKGRlc2NyaXB0b3IsIGZhbGxiYWNrLCBpbnNwZWN0KSB7XG4gICAgaWYgKGZhbGxiYWNrID09PSB2b2lkIDApIHtcbiAgICAgICAgZmFsbGJhY2sgPSBmdW5jdGlvbiAob3ApIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIFwiUHJvbWlzZSBkb2VzIG5vdCBzdXBwb3J0IG9wZXJhdGlvbjogXCIgKyBvcFxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChpbnNwZWN0ID09PSB2b2lkIDApIHtcbiAgICAgICAgaW5zcGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB7c3RhdGU6IFwidW5rbm93blwifTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgcHJvbWlzZSA9IG9iamVjdF9jcmVhdGUoUHJvbWlzZS5wcm90b3R5cGUpO1xuXG4gICAgcHJvbWlzZS5wcm9taXNlRGlzcGF0Y2ggPSBmdW5jdGlvbiAocmVzb2x2ZSwgb3AsIGFyZ3MpIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yW29wXSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRlc2NyaXB0b3Jbb3BdLmFwcGx5KHByb21pc2UsIGFyZ3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxsYmFjay5jYWxsKHByb21pc2UsIG9wLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICByZXN1bHQgPSByZWplY3QoZXhjZXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByb21pc2UuaW5zcGVjdCA9IGluc3BlY3Q7XG5cbiAgICAvLyBYWFggZGVwcmVjYXRlZCBgdmFsdWVPZmAgYW5kIGBleGNlcHRpb25gIHN1cHBvcnRcbiAgICBpZiAoaW5zcGVjdCkge1xuICAgICAgICB2YXIgaW5zcGVjdGVkID0gaW5zcGVjdCgpO1xuICAgICAgICBpZiAoaW5zcGVjdGVkLnN0YXRlID09PSBcInJlamVjdGVkXCIpIHtcbiAgICAgICAgICAgIHByb21pc2UuZXhjZXB0aW9uID0gaW5zcGVjdGVkLnJlYXNvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb21pc2UudmFsdWVPZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbnNwZWN0ZWQgPSBpbnNwZWN0KCk7XG4gICAgICAgICAgICBpZiAoaW5zcGVjdGVkLnN0YXRlID09PSBcInBlbmRpbmdcIiB8fFxuICAgICAgICAgICAgICAgIGluc3BlY3RlZC5zdGF0ZSA9PT0gXCJyZWplY3RlZFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5zcGVjdGVkLnZhbHVlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IFByb21pc2VdXCI7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIHByb2dyZXNzZWQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICB2YXIgZG9uZSA9IGZhbHNlOyAgIC8vIGVuc3VyZSB0aGUgdW50cnVzdGVkIHByb21pc2UgbWFrZXMgYXQgbW9zdCBhXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzaW5nbGUgY2FsbCB0byBvbmUgb2YgdGhlIGNhbGxiYWNrc1xuXG4gICAgZnVuY3Rpb24gX2Z1bGZpbGxlZCh2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBmdWxmaWxsZWQgPT09IFwiZnVuY3Rpb25cIiA/IGZ1bGZpbGxlZCh2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGV4Y2VwdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfcmVqZWN0ZWQoZXhjZXB0aW9uKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVqZWN0ZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgbWFrZVN0YWNrVHJhY2VMb25nKGV4Y2VwdGlvbiwgc2VsZik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3RlZChleGNlcHRpb24pO1xuICAgICAgICAgICAgfSBjYXRjaCAobmV3RXhjZXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXdFeGNlcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWplY3QoZXhjZXB0aW9uKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfcHJvZ3Jlc3NlZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHByb2dyZXNzZWQgPT09IFwiZnVuY3Rpb25cIiA/IHByb2dyZXNzZWQodmFsdWUpIDogdmFsdWU7XG4gICAgfVxuXG4gICAgUS5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYucHJvbWlzZURpc3BhdGNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb25lID0gdHJ1ZTtcblxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfZnVsZmlsbGVkKHZhbHVlKSk7XG4gICAgICAgIH0sIFwid2hlblwiLCBbZnVuY3Rpb24gKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb25lID0gdHJ1ZTtcblxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfcmVqZWN0ZWQoZXhjZXB0aW9uKSk7XG4gICAgICAgIH1dKTtcbiAgICB9KTtcblxuICAgIC8vIFByb2dyZXNzIHByb3BhZ2F0b3IgbmVlZCB0byBiZSBhdHRhY2hlZCBpbiB0aGUgY3VycmVudCB0aWNrLlxuICAgIHNlbGYucHJvbWlzZURpc3BhdGNoKHZvaWQgMCwgXCJ3aGVuXCIsIFt2b2lkIDAsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgbmV3VmFsdWU7XG4gICAgICAgIHZhciB0aHJldyA9IGZhbHNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSBfcHJvZ3Jlc3NlZCh2YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocmV3ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChRLm9uZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBRLm9uZXJyb3IoZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRocmV3KSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5ub3RpZnkobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59O1xuXG5RLnRhcCA9IGZ1bmN0aW9uIChwcm9taXNlLCBjYWxsYmFjaykge1xuICAgIHJldHVybiBRKHByb21pc2UpLnRhcChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIFdvcmtzIGFsbW9zdCBsaWtlIFwiZmluYWxseVwiLCBidXQgbm90IGNhbGxlZCBmb3IgcmVqZWN0aW9ucy5cbiAqIE9yaWdpbmFsIHJlc29sdXRpb24gdmFsdWUgaXMgcGFzc2VkIHRocm91Z2ggY2FsbGJhY2sgdW5hZmZlY3RlZC5cbiAqIENhbGxiYWNrIG1heSByZXR1cm4gYSBwcm9taXNlIHRoYXQgd2lsbCBiZSBhd2FpdGVkIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7US5Qcm9taXNlfVxuICogQGV4YW1wbGVcbiAqIGRvU29tZXRoaW5nKClcbiAqICAgLnRoZW4oLi4uKVxuICogICAudGFwKGNvbnNvbGUubG9nKVxuICogICAudGhlbiguLi4pO1xuICovXG5Qcm9taXNlLnByb3RvdHlwZS50YXAgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayA9IFEoY2FsbGJhY2spO1xuXG4gICAgcmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmZjYWxsKHZhbHVlKS50aGVuUmVzb2x2ZSh2YWx1ZSk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFJlZ2lzdGVycyBhbiBvYnNlcnZlciBvbiBhIHByb21pc2UuXG4gKlxuICogR3VhcmFudGVlczpcbiAqXG4gKiAxLiB0aGF0IGZ1bGZpbGxlZCBhbmQgcmVqZWN0ZWQgd2lsbCBiZSBjYWxsZWQgb25seSBvbmNlLlxuICogMi4gdGhhdCBlaXRoZXIgdGhlIGZ1bGZpbGxlZCBjYWxsYmFjayBvciB0aGUgcmVqZWN0ZWQgY2FsbGJhY2sgd2lsbCBiZVxuICogICAgY2FsbGVkLCBidXQgbm90IGJvdGguXG4gKiAzLiB0aGF0IGZ1bGZpbGxlZCBhbmQgcmVqZWN0ZWQgd2lsbCBub3QgYmUgY2FsbGVkIGluIHRoaXMgdHVybi5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgICAgICBwcm9taXNlIG9yIGltbWVkaWF0ZSByZWZlcmVuY2UgdG8gb2JzZXJ2ZVxuICogQHBhcmFtIGZ1bGZpbGxlZCAgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdpdGggdGhlIGZ1bGZpbGxlZCB2YWx1ZVxuICogQHBhcmFtIHJlamVjdGVkICAgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdpdGggdGhlIHJlamVjdGlvbiBleGNlcHRpb25cbiAqIEBwYXJhbSBwcm9ncmVzc2VkIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBhbnkgcHJvZ3Jlc3Mgbm90aWZpY2F0aW9uc1xuICogQHJldHVybiBwcm9taXNlIGZvciB0aGUgcmV0dXJuIHZhbHVlIGZyb20gdGhlIGludm9rZWQgY2FsbGJhY2tcbiAqL1xuUS53aGVuID0gd2hlbjtcbmZ1bmN0aW9uIHdoZW4odmFsdWUsIGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIHByb2dyZXNzZWQpIHtcbiAgICByZXR1cm4gUSh2YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkLCBwcm9ncmVzc2VkKTtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUudGhlblJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbHVlOyB9KTtcbn07XG5cblEudGhlblJlc29sdmUgPSBmdW5jdGlvbiAocHJvbWlzZSwgdmFsdWUpIHtcbiAgICByZXR1cm4gUShwcm9taXNlKS50aGVuUmVzb2x2ZSh2YWx1ZSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS50aGVuUmVqZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIHJldHVybiB0aGlzLnRoZW4oZnVuY3Rpb24gKCkgeyB0aHJvdyByZWFzb247IH0pO1xufTtcblxuUS50aGVuUmVqZWN0ID0gZnVuY3Rpb24gKHByb21pc2UsIHJlYXNvbikge1xuICAgIHJldHVybiBRKHByb21pc2UpLnRoZW5SZWplY3QocmVhc29uKTtcbn07XG5cbi8qKlxuICogSWYgYW4gb2JqZWN0IGlzIG5vdCBhIHByb21pc2UsIGl0IGlzIGFzIFwibmVhclwiIGFzIHBvc3NpYmxlLlxuICogSWYgYSBwcm9taXNlIGlzIHJlamVjdGVkLCBpdCBpcyBhcyBcIm5lYXJcIiBhcyBwb3NzaWJsZSB0b28uXG4gKiBJZiBpdOKAmXMgYSBmdWxmaWxsZWQgcHJvbWlzZSwgdGhlIGZ1bGZpbGxtZW50IHZhbHVlIGlzIG5lYXJlci5cbiAqIElmIGl04oCZcyBhIGRlZmVycmVkIHByb21pc2UgYW5kIHRoZSBkZWZlcnJlZCBoYXMgYmVlbiByZXNvbHZlZCwgdGhlXG4gKiByZXNvbHV0aW9uIGlzIFwibmVhcmVyXCIuXG4gKiBAcGFyYW0gb2JqZWN0XG4gKiBAcmV0dXJucyBtb3N0IHJlc29sdmVkIChuZWFyZXN0KSBmb3JtIG9mIHRoZSBvYmplY3RcbiAqL1xuXG4vLyBYWFggc2hvdWxkIHdlIHJlLWRvIHRoaXM/XG5RLm5lYXJlciA9IG5lYXJlcjtcbmZ1bmN0aW9uIG5lYXJlcih2YWx1ZSkge1xuICAgIGlmIChpc1Byb21pc2UodmFsdWUpKSB7XG4gICAgICAgIHZhciBpbnNwZWN0ZWQgPSB2YWx1ZS5pbnNwZWN0KCk7XG4gICAgICAgIGlmIChpbnNwZWN0ZWQuc3RhdGUgPT09IFwiZnVsZmlsbGVkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnNwZWN0ZWQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBhIHByb21pc2UuXG4gKiBPdGhlcndpc2UgaXQgaXMgYSBmdWxmaWxsZWQgdmFsdWUuXG4gKi9cblEuaXNQcm9taXNlID0gaXNQcm9taXNlO1xuZnVuY3Rpb24gaXNQcm9taXNlKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiBQcm9taXNlO1xufVxuXG5RLmlzUHJvbWlzZUFsaWtlID0gaXNQcm9taXNlQWxpa2U7XG5mdW5jdGlvbiBpc1Byb21pc2VBbGlrZShvYmplY3QpIHtcbiAgICByZXR1cm4gaXNPYmplY3Qob2JqZWN0KSAmJiB0eXBlb2Ygb2JqZWN0LnRoZW4gPT09IFwiZnVuY3Rpb25cIjtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaXMgYSBwZW5kaW5nIHByb21pc2UsIG1lYW5pbmcgbm90XG4gKiBmdWxmaWxsZWQgb3IgcmVqZWN0ZWQuXG4gKi9cblEuaXNQZW5kaW5nID0gaXNQZW5kaW5nO1xuZnVuY3Rpb24gaXNQZW5kaW5nKG9iamVjdCkge1xuICAgIHJldHVybiBpc1Byb21pc2Uob2JqZWN0KSAmJiBvYmplY3QuaW5zcGVjdCgpLnN0YXRlID09PSBcInBlbmRpbmdcIjtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUuaXNQZW5kaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmluc3BlY3QoKS5zdGF0ZSA9PT0gXCJwZW5kaW5nXCI7XG59O1xuXG4vKipcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBhIHZhbHVlIG9yIGZ1bGZpbGxlZFxuICogcHJvbWlzZS5cbiAqL1xuUS5pc0Z1bGZpbGxlZCA9IGlzRnVsZmlsbGVkO1xuZnVuY3Rpb24gaXNGdWxmaWxsZWQob2JqZWN0KSB7XG4gICAgcmV0dXJuICFpc1Byb21pc2Uob2JqZWN0KSB8fCBvYmplY3QuaW5zcGVjdCgpLnN0YXRlID09PSBcImZ1bGZpbGxlZFwiO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5pc0Z1bGZpbGxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnNwZWN0KCkuc3RhdGUgPT09IFwiZnVsZmlsbGVkXCI7XG59O1xuXG4vKipcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBhIHJlamVjdGVkIHByb21pc2UuXG4gKi9cblEuaXNSZWplY3RlZCA9IGlzUmVqZWN0ZWQ7XG5mdW5jdGlvbiBpc1JlamVjdGVkKG9iamVjdCkge1xuICAgIHJldHVybiBpc1Byb21pc2Uob2JqZWN0KSAmJiBvYmplY3QuaW5zcGVjdCgpLnN0YXRlID09PSBcInJlamVjdGVkXCI7XG59XG5cblByb21pc2UucHJvdG90eXBlLmlzUmVqZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zcGVjdCgpLnN0YXRlID09PSBcInJlamVjdGVkXCI7XG59O1xuXG4vLy8vIEJFR0lOIFVOSEFORExFRCBSRUpFQ1RJT04gVFJBQ0tJTkdcblxuLy8gVGhpcyBwcm9taXNlIGxpYnJhcnkgY29uc3VtZXMgZXhjZXB0aW9ucyB0aHJvd24gaW4gaGFuZGxlcnMgc28gdGhleSBjYW4gYmVcbi8vIGhhbmRsZWQgYnkgYSBzdWJzZXF1ZW50IHByb21pc2UuICBUaGUgZXhjZXB0aW9ucyBnZXQgYWRkZWQgdG8gdGhpcyBhcnJheSB3aGVuXG4vLyB0aGV5IGFyZSBjcmVhdGVkLCBhbmQgcmVtb3ZlZCB3aGVuIHRoZXkgYXJlIGhhbmRsZWQuICBOb3RlIHRoYXQgaW4gRVM2IG9yXG4vLyBzaGltbWVkIGVudmlyb25tZW50cywgdGhpcyB3b3VsZCBuYXR1cmFsbHkgYmUgYSBgU2V0YC5cbnZhciB1bmhhbmRsZWRSZWFzb25zID0gW107XG52YXIgdW5oYW5kbGVkUmVqZWN0aW9ucyA9IFtdO1xudmFyIHJlcG9ydGVkVW5oYW5kbGVkUmVqZWN0aW9ucyA9IFtdO1xudmFyIHRyYWNrVW5oYW5kbGVkUmVqZWN0aW9ucyA9IHRydWU7XG5cbmZ1bmN0aW9uIHJlc2V0VW5oYW5kbGVkUmVqZWN0aW9ucygpIHtcbiAgICB1bmhhbmRsZWRSZWFzb25zLmxlbmd0aCA9IDA7XG4gICAgdW5oYW5kbGVkUmVqZWN0aW9ucy5sZW5ndGggPSAwO1xuXG4gICAgaWYgKCF0cmFja1VuaGFuZGxlZFJlamVjdGlvbnMpIHtcbiAgICAgICAgdHJhY2tVbmhhbmRsZWRSZWplY3Rpb25zID0gdHJ1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRyYWNrUmVqZWN0aW9uKHByb21pc2UsIHJlYXNvbikge1xuICAgIGlmICghdHJhY2tVbmhhbmRsZWRSZWplY3Rpb25zKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBwcm9jZXNzLmVtaXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBRLm5leHRUaWNrLnJ1bkFmdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChhcnJheV9pbmRleE9mKHVuaGFuZGxlZFJlamVjdGlvbnMsIHByb21pc2UpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3MuZW1pdChcInVuaGFuZGxlZFJlamVjdGlvblwiLCByZWFzb24sIHByb21pc2UpO1xuICAgICAgICAgICAgICAgIHJlcG9ydGVkVW5oYW5kbGVkUmVqZWN0aW9ucy5wdXNoKHByb21pc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1bmhhbmRsZWRSZWplY3Rpb25zLnB1c2gocHJvbWlzZSk7XG4gICAgaWYgKHJlYXNvbiAmJiB0eXBlb2YgcmVhc29uLnN0YWNrICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHVuaGFuZGxlZFJlYXNvbnMucHVzaChyZWFzb24uc3RhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHVuaGFuZGxlZFJlYXNvbnMucHVzaChcIihubyBzdGFjaykgXCIgKyByZWFzb24pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdW50cmFja1JlamVjdGlvbihwcm9taXNlKSB7XG4gICAgaWYgKCF0cmFja1VuaGFuZGxlZFJlamVjdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBhdCA9IGFycmF5X2luZGV4T2YodW5oYW5kbGVkUmVqZWN0aW9ucywgcHJvbWlzZSk7XG4gICAgaWYgKGF0ICE9PSAtMSkge1xuICAgICAgICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHByb2Nlc3MuZW1pdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBRLm5leHRUaWNrLnJ1bkFmdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXRSZXBvcnQgPSBhcnJheV9pbmRleE9mKHJlcG9ydGVkVW5oYW5kbGVkUmVqZWN0aW9ucywgcHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgaWYgKGF0UmVwb3J0ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLmVtaXQoXCJyZWplY3Rpb25IYW5kbGVkXCIsIHVuaGFuZGxlZFJlYXNvbnNbYXRdLCBwcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0ZWRVbmhhbmRsZWRSZWplY3Rpb25zLnNwbGljZShhdFJlcG9ydCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdW5oYW5kbGVkUmVqZWN0aW9ucy5zcGxpY2UoYXQsIDEpO1xuICAgICAgICB1bmhhbmRsZWRSZWFzb25zLnNwbGljZShhdCwgMSk7XG4gICAgfVxufVxuXG5RLnJlc2V0VW5oYW5kbGVkUmVqZWN0aW9ucyA9IHJlc2V0VW5oYW5kbGVkUmVqZWN0aW9ucztcblxuUS5nZXRVbmhhbmRsZWRSZWFzb25zID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIE1ha2UgYSBjb3B5IHNvIHRoYXQgY29uc3VtZXJzIGNhbid0IGludGVyZmVyZSB3aXRoIG91ciBpbnRlcm5hbCBzdGF0ZS5cbiAgICByZXR1cm4gdW5oYW5kbGVkUmVhc29ucy5zbGljZSgpO1xufTtcblxuUS5zdG9wVW5oYW5kbGVkUmVqZWN0aW9uVHJhY2tpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmVzZXRVbmhhbmRsZWRSZWplY3Rpb25zKCk7XG4gICAgdHJhY2tVbmhhbmRsZWRSZWplY3Rpb25zID0gZmFsc2U7XG59O1xuXG5yZXNldFVuaGFuZGxlZFJlamVjdGlvbnMoKTtcblxuLy8vLyBFTkQgVU5IQU5ETEVEIFJFSkVDVElPTiBUUkFDS0lOR1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSByZWplY3RlZCBwcm9taXNlLlxuICogQHBhcmFtIHJlYXNvbiB2YWx1ZSBkZXNjcmliaW5nIHRoZSBmYWlsdXJlXG4gKi9cblEucmVqZWN0ID0gcmVqZWN0O1xuZnVuY3Rpb24gcmVqZWN0KHJlYXNvbikge1xuICAgIHZhciByZWplY3Rpb24gPSBQcm9taXNlKHtcbiAgICAgICAgXCJ3aGVuXCI6IGZ1bmN0aW9uIChyZWplY3RlZCkge1xuICAgICAgICAgICAgLy8gbm90ZSB0aGF0IHRoZSBlcnJvciBoYXMgYmVlbiBoYW5kbGVkXG4gICAgICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB1bnRyYWNrUmVqZWN0aW9uKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlamVjdGVkID8gcmVqZWN0ZWQocmVhc29uKSA6IHRoaXM7XG4gICAgICAgIH1cbiAgICB9LCBmdW5jdGlvbiBmYWxsYmFjaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgZnVuY3Rpb24gaW5zcGVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhdGU6IFwicmVqZWN0ZWRcIiwgcmVhc29uOiByZWFzb24gfTtcbiAgICB9KTtcblxuICAgIC8vIE5vdGUgdGhhdCB0aGUgcmVhc29uIGhhcyBub3QgYmVlbiBoYW5kbGVkLlxuICAgIHRyYWNrUmVqZWN0aW9uKHJlamVjdGlvbiwgcmVhc29uKTtcblxuICAgIHJldHVybiByZWplY3Rpb247XG59XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIGZ1bGZpbGxlZCBwcm9taXNlIGZvciBhbiBpbW1lZGlhdGUgcmVmZXJlbmNlLlxuICogQHBhcmFtIHZhbHVlIGltbWVkaWF0ZSByZWZlcmVuY2VcbiAqL1xuUS5mdWxmaWxsID0gZnVsZmlsbDtcbmZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHtcbiAgICByZXR1cm4gUHJvbWlzZSh7XG4gICAgICAgIFwid2hlblwiOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0XCI6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVbbmFtZV07XG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0XCI6IGZ1bmN0aW9uIChuYW1lLCByaHMpIHtcbiAgICAgICAgICAgIHZhbHVlW25hbWVdID0gcmhzO1xuICAgICAgICB9LFxuICAgICAgICBcImRlbGV0ZVwiOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgZGVsZXRlIHZhbHVlW25hbWVdO1xuICAgICAgICB9LFxuICAgICAgICBcInBvc3RcIjogZnVuY3Rpb24gKG5hbWUsIGFyZ3MpIHtcbiAgICAgICAgICAgIC8vIE1hcmsgTWlsbGVyIHByb3Bvc2VzIHRoYXQgcG9zdCB3aXRoIG5vIG5hbWUgc2hvdWxkIGFwcGx5IGFcbiAgICAgICAgICAgIC8vIHByb21pc2VkIGZ1bmN0aW9uLlxuICAgICAgICAgICAgaWYgKG5hbWUgPT09IG51bGwgfHwgbmFtZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmFwcGx5KHZvaWQgMCwgYXJncyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVtuYW1lXS5hcHBseSh2YWx1ZSwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYXBwbHlcIjogZnVuY3Rpb24gKHRoaXNwLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuYXBwbHkodGhpc3AsIGFyZ3MpO1xuICAgICAgICB9LFxuICAgICAgICBcImtleXNcIjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdF9rZXlzKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0sIHZvaWQgMCwgZnVuY3Rpb24gaW5zcGVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhdGU6IFwiZnVsZmlsbGVkXCIsIHZhbHVlOiB2YWx1ZSB9O1xuICAgIH0pO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoZW5hYmxlcyB0byBRIHByb21pc2VzLlxuICogQHBhcmFtIHByb21pc2UgdGhlbmFibGUgcHJvbWlzZVxuICogQHJldHVybnMgYSBRIHByb21pc2VcbiAqL1xuZnVuY3Rpb24gY29lcmNlKHByb21pc2UpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgIFEubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGRlZmVycmVkLnJlc29sdmUsIGRlZmVycmVkLnJlamVjdCwgZGVmZXJyZWQubm90aWZ5KTtcbiAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXhjZXB0aW9uKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufVxuXG4vKipcbiAqIEFubm90YXRlcyBhbiBvYmplY3Qgc3VjaCB0aGF0IGl0IHdpbGwgbmV2ZXIgYmVcbiAqIHRyYW5zZmVycmVkIGF3YXkgZnJvbSB0aGlzIHByb2Nlc3Mgb3ZlciBhbnkgcHJvbWlzZVxuICogY29tbXVuaWNhdGlvbiBjaGFubmVsLlxuICogQHBhcmFtIG9iamVjdFxuICogQHJldHVybnMgcHJvbWlzZSBhIHdyYXBwaW5nIG9mIHRoYXQgb2JqZWN0IHRoYXRcbiAqIGFkZGl0aW9uYWxseSByZXNwb25kcyB0byB0aGUgXCJpc0RlZlwiIG1lc3NhZ2VcbiAqIHdpdGhvdXQgYSByZWplY3Rpb24uXG4gKi9cblEubWFzdGVyID0gbWFzdGVyO1xuZnVuY3Rpb24gbWFzdGVyKG9iamVjdCkge1xuICAgIHJldHVybiBQcm9taXNlKHtcbiAgICAgICAgXCJpc0RlZlwiOiBmdW5jdGlvbiAoKSB7fVxuICAgIH0sIGZ1bmN0aW9uIGZhbGxiYWNrKG9wLCBhcmdzKSB7XG4gICAgICAgIHJldHVybiBkaXNwYXRjaChvYmplY3QsIG9wLCBhcmdzKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBRKG9iamVjdCkuaW5zcGVjdCgpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIFNwcmVhZHMgdGhlIHZhbHVlcyBvZiBhIHByb21pc2VkIGFycmF5IG9mIGFyZ3VtZW50cyBpbnRvIHRoZVxuICogZnVsZmlsbG1lbnQgY2FsbGJhY2suXG4gKiBAcGFyYW0gZnVsZmlsbGVkIGNhbGxiYWNrIHRoYXQgcmVjZWl2ZXMgdmFyaWFkaWMgYXJndW1lbnRzIGZyb20gdGhlXG4gKiBwcm9taXNlZCBhcnJheVxuICogQHBhcmFtIHJlamVjdGVkIGNhbGxiYWNrIHRoYXQgcmVjZWl2ZXMgdGhlIGV4Y2VwdGlvbiBpZiB0aGUgcHJvbWlzZVxuICogaXMgcmVqZWN0ZWQuXG4gKiBAcmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSByZXR1cm4gdmFsdWUgb3IgdGhyb3duIGV4Y2VwdGlvbiBvZlxuICogZWl0aGVyIGNhbGxiYWNrLlxuICovXG5RLnNwcmVhZCA9IHNwcmVhZDtcbmZ1bmN0aW9uIHNwcmVhZCh2YWx1ZSwgZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICAgIHJldHVybiBRKHZhbHVlKS5zcHJlYWQoZnVsZmlsbGVkLCByZWplY3RlZCk7XG59XG5cblByb21pc2UucHJvdG90eXBlLnNwcmVhZCA9IGZ1bmN0aW9uIChmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxsKCkudGhlbihmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGZ1bGZpbGxlZC5hcHBseSh2b2lkIDAsIGFycmF5KTtcbiAgICB9LCByZWplY3RlZCk7XG59O1xuXG4vKipcbiAqIFRoZSBhc3luYyBmdW5jdGlvbiBpcyBhIGRlY29yYXRvciBmb3IgZ2VuZXJhdG9yIGZ1bmN0aW9ucywgdHVybmluZ1xuICogdGhlbSBpbnRvIGFzeW5jaHJvbm91cyBnZW5lcmF0b3JzLiAgQWx0aG91Z2ggZ2VuZXJhdG9ycyBhcmUgb25seSBwYXJ0XG4gKiBvZiB0aGUgbmV3ZXN0IEVDTUFTY3JpcHQgNiBkcmFmdHMsIHRoaXMgY29kZSBkb2VzIG5vdCBjYXVzZSBzeW50YXhcbiAqIGVycm9ycyBpbiBvbGRlciBlbmdpbmVzLiAgVGhpcyBjb2RlIHNob3VsZCBjb250aW51ZSB0byB3b3JrIGFuZCB3aWxsXG4gKiBpbiBmYWN0IGltcHJvdmUgb3ZlciB0aW1lIGFzIHRoZSBsYW5ndWFnZSBpbXByb3Zlcy5cbiAqXG4gKiBFUzYgZ2VuZXJhdG9ycyBhcmUgY3VycmVudGx5IHBhcnQgb2YgVjggdmVyc2lvbiAzLjE5IHdpdGggdGhlXG4gKiAtLWhhcm1vbnktZ2VuZXJhdG9ycyBydW50aW1lIGZsYWcgZW5hYmxlZC4gIFNwaWRlck1vbmtleSBoYXMgaGFkIHRoZW1cbiAqIGZvciBsb25nZXIsIGJ1dCB1bmRlciBhbiBvbGRlciBQeXRob24taW5zcGlyZWQgZm9ybS4gIFRoaXMgZnVuY3Rpb25cbiAqIHdvcmtzIG9uIGJvdGgga2luZHMgb2YgZ2VuZXJhdG9ycy5cbiAqXG4gKiBEZWNvcmF0ZXMgYSBnZW5lcmF0b3IgZnVuY3Rpb24gc3VjaCB0aGF0OlxuICogIC0gaXQgbWF5IHlpZWxkIHByb21pc2VzXG4gKiAgLSBleGVjdXRpb24gd2lsbCBjb250aW51ZSB3aGVuIHRoYXQgcHJvbWlzZSBpcyBmdWxmaWxsZWRcbiAqICAtIHRoZSB2YWx1ZSBvZiB0aGUgeWllbGQgZXhwcmVzc2lvbiB3aWxsIGJlIHRoZSBmdWxmaWxsZWQgdmFsdWVcbiAqICAtIGl0IHJldHVybnMgYSBwcm9taXNlIGZvciB0aGUgcmV0dXJuIHZhbHVlICh3aGVuIHRoZSBnZW5lcmF0b3JcbiAqICAgIHN0b3BzIGl0ZXJhdGluZylcbiAqICAtIHRoZSBkZWNvcmF0ZWQgZnVuY3Rpb24gcmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSByZXR1cm4gdmFsdWVcbiAqICAgIG9mIHRoZSBnZW5lcmF0b3Igb3IgdGhlIGZpcnN0IHJlamVjdGVkIHByb21pc2UgYW1vbmcgdGhvc2VcbiAqICAgIHlpZWxkZWQuXG4gKiAgLSBpZiBhbiBlcnJvciBpcyB0aHJvd24gaW4gdGhlIGdlbmVyYXRvciwgaXQgcHJvcGFnYXRlcyB0aHJvdWdoXG4gKiAgICBldmVyeSBmb2xsb3dpbmcgeWllbGQgdW50aWwgaXQgaXMgY2F1Z2h0LCBvciB1bnRpbCBpdCBlc2NhcGVzXG4gKiAgICB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGFsdG9nZXRoZXIsIGFuZCBpcyB0cmFuc2xhdGVkIGludG8gYVxuICogICAgcmVqZWN0aW9uIGZvciB0aGUgcHJvbWlzZSByZXR1cm5lZCBieSB0aGUgZGVjb3JhdGVkIGdlbmVyYXRvci5cbiAqL1xuUS5hc3luYyA9IGFzeW5jO1xuZnVuY3Rpb24gYXN5bmMobWFrZUdlbmVyYXRvcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHdoZW4gdmVyYiBpcyBcInNlbmRcIiwgYXJnIGlzIGEgdmFsdWVcbiAgICAgICAgLy8gd2hlbiB2ZXJiIGlzIFwidGhyb3dcIiwgYXJnIGlzIGFuIGV4Y2VwdGlvblxuICAgICAgICBmdW5jdGlvbiBjb250aW51ZXIodmVyYiwgYXJnKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICAgICAgICAvLyBVbnRpbCBWOCAzLjE5IC8gQ2hyb21pdW0gMjkgaXMgcmVsZWFzZWQsIFNwaWRlck1vbmtleSBpcyB0aGUgb25seVxuICAgICAgICAgICAgLy8gZW5naW5lIHRoYXQgaGFzIGEgZGVwbG95ZWQgYmFzZSBvZiBicm93c2VycyB0aGF0IHN1cHBvcnQgZ2VuZXJhdG9ycy5cbiAgICAgICAgICAgIC8vIEhvd2V2ZXIsIFNNJ3MgZ2VuZXJhdG9ycyB1c2UgdGhlIFB5dGhvbi1pbnNwaXJlZCBzZW1hbnRpY3Mgb2ZcbiAgICAgICAgICAgIC8vIG91dGRhdGVkIEVTNiBkcmFmdHMuICBXZSB3b3VsZCBsaWtlIHRvIHN1cHBvcnQgRVM2LCBidXQgd2UnZCBhbHNvXG4gICAgICAgICAgICAvLyBsaWtlIHRvIG1ha2UgaXQgcG9zc2libGUgdG8gdXNlIGdlbmVyYXRvcnMgaW4gZGVwbG95ZWQgYnJvd3NlcnMsIHNvXG4gICAgICAgICAgICAvLyB3ZSBhbHNvIHN1cHBvcnQgUHl0aG9uLXN0eWxlIGdlbmVyYXRvcnMuICBBdCBzb21lIHBvaW50IHdlIGNhbiByZW1vdmVcbiAgICAgICAgICAgIC8vIHRoaXMgYmxvY2suXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgU3RvcEl0ZXJhdGlvbiA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIC8vIEVTNiBHZW5lcmF0b3JzXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZ2VuZXJhdG9yW3ZlcmJdKGFyZyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXhjZXB0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBRKHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdoZW4ocmVzdWx0LnZhbHVlLCBjYWxsYmFjaywgZXJyYmFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBTcGlkZXJNb25rZXkgR2VuZXJhdG9yc1xuICAgICAgICAgICAgICAgIC8vIEZJWE1FOiBSZW1vdmUgdGhpcyBjYXNlIHdoZW4gU00gZG9lcyBFUzYgZ2VuZXJhdG9ycy5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0oYXJnKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzU3RvcEl0ZXJhdGlvbihleGNlcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUShleGNlcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChleGNlcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB3aGVuKHJlc3VsdCwgY2FsbGJhY2ssIGVycmJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBnZW5lcmF0b3IgPSBtYWtlR2VuZXJhdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGNvbnRpbnVlci5iaW5kKGNvbnRpbnVlciwgXCJuZXh0XCIpO1xuICAgICAgICB2YXIgZXJyYmFjayA9IGNvbnRpbnVlci5iaW5kKGNvbnRpbnVlciwgXCJ0aHJvd1wiKTtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBUaGUgc3Bhd24gZnVuY3Rpb24gaXMgYSBzbWFsbCB3cmFwcGVyIGFyb3VuZCBhc3luYyB0aGF0IGltbWVkaWF0ZWx5XG4gKiBjYWxscyB0aGUgZ2VuZXJhdG9yIGFuZCBhbHNvIGVuZHMgdGhlIHByb21pc2UgY2hhaW4sIHNvIHRoYXQgYW55XG4gKiB1bmhhbmRsZWQgZXJyb3JzIGFyZSB0aHJvd24gaW5zdGVhZCBvZiBmb3J3YXJkZWQgdG8gdGhlIGVycm9yXG4gKiBoYW5kbGVyLiBUaGlzIGlzIHVzZWZ1bCBiZWNhdXNlIGl0J3MgZXh0cmVtZWx5IGNvbW1vbiB0byBydW5cbiAqIGdlbmVyYXRvcnMgYXQgdGhlIHRvcC1sZXZlbCB0byB3b3JrIHdpdGggbGlicmFyaWVzLlxuICovXG5RLnNwYXduID0gc3Bhd247XG5mdW5jdGlvbiBzcGF3bihtYWtlR2VuZXJhdG9yKSB7XG4gICAgUS5kb25lKFEuYXN5bmMobWFrZUdlbmVyYXRvcikoKSk7XG59XG5cbi8vIEZJWE1FOiBSZW1vdmUgdGhpcyBpbnRlcmZhY2Ugb25jZSBFUzYgZ2VuZXJhdG9ycyBhcmUgaW4gU3BpZGVyTW9ua2V5LlxuLyoqXG4gKiBUaHJvd3MgYSBSZXR1cm5WYWx1ZSBleGNlcHRpb24gdG8gc3RvcCBhbiBhc3luY2hyb25vdXMgZ2VuZXJhdG9yLlxuICpcbiAqIFRoaXMgaW50ZXJmYWNlIGlzIGEgc3RvcC1nYXAgbWVhc3VyZSB0byBzdXBwb3J0IGdlbmVyYXRvciByZXR1cm5cbiAqIHZhbHVlcyBpbiBvbGRlciBGaXJlZm94L1NwaWRlck1vbmtleS4gIEluIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBFUzZcbiAqIGdlbmVyYXRvcnMgbGlrZSBDaHJvbWl1bSAyOSwganVzdCB1c2UgXCJyZXR1cm5cIiBpbiB5b3VyIGdlbmVyYXRvclxuICogZnVuY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSB0aGUgcmV0dXJuIHZhbHVlIGZvciB0aGUgc3Vycm91bmRpbmcgZ2VuZXJhdG9yXG4gKiBAdGhyb3dzIFJldHVyblZhbHVlIGV4Y2VwdGlvbiB3aXRoIHRoZSB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKiAvLyBFUzYgc3R5bGVcbiAqIFEuYXN5bmMoZnVuY3Rpb24qICgpIHtcbiAqICAgICAgdmFyIGZvbyA9IHlpZWxkIGdldEZvb1Byb21pc2UoKTtcbiAqICAgICAgdmFyIGJhciA9IHlpZWxkIGdldEJhclByb21pc2UoKTtcbiAqICAgICAgcmV0dXJuIGZvbyArIGJhcjtcbiAqIH0pXG4gKiAvLyBPbGRlciBTcGlkZXJNb25rZXkgc3R5bGVcbiAqIFEuYXN5bmMoZnVuY3Rpb24gKCkge1xuICogICAgICB2YXIgZm9vID0geWllbGQgZ2V0Rm9vUHJvbWlzZSgpO1xuICogICAgICB2YXIgYmFyID0geWllbGQgZ2V0QmFyUHJvbWlzZSgpO1xuICogICAgICBRLnJldHVybihmb28gKyBiYXIpO1xuICogfSlcbiAqL1xuUVtcInJldHVyblwiXSA9IF9yZXR1cm47XG5mdW5jdGlvbiBfcmV0dXJuKHZhbHVlKSB7XG4gICAgdGhyb3cgbmV3IFFSZXR1cm5WYWx1ZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIHByb21pc2VkIGZ1bmN0aW9uIGRlY29yYXRvciBlbnN1cmVzIHRoYXQgYW55IHByb21pc2UgYXJndW1lbnRzXG4gKiBhcmUgc2V0dGxlZCBhbmQgcGFzc2VkIGFzIHZhbHVlcyAoYHRoaXNgIGlzIGFsc28gc2V0dGxlZCBhbmQgcGFzc2VkXG4gKiBhcyBhIHZhbHVlKS4gIEl0IHdpbGwgYWxzbyBlbnN1cmUgdGhhdCB0aGUgcmVzdWx0IG9mIGEgZnVuY3Rpb24gaXNcbiAqIGFsd2F5cyBhIHByb21pc2UuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBhZGQgPSBRLnByb21pc2VkKGZ1bmN0aW9uIChhLCBiKSB7XG4gKiAgICAgcmV0dXJuIGEgKyBiO1xuICogfSk7XG4gKiBhZGQoUShhKSwgUShCKSk7XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGRlY29yYXRlXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259IGEgZnVuY3Rpb24gdGhhdCBoYXMgYmVlbiBkZWNvcmF0ZWQuXG4gKi9cblEucHJvbWlzZWQgPSBwcm9taXNlZDtcbmZ1bmN0aW9uIHByb21pc2VkKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNwcmVhZChbdGhpcywgYWxsKGFyZ3VtZW50cyldLCBmdW5jdGlvbiAoc2VsZiwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG4vKipcbiAqIHNlbmRzIGEgbWVzc2FnZSB0byBhIHZhbHVlIGluIGEgZnV0dXJlIHR1cm5cbiAqIEBwYXJhbSBvYmplY3QqIHRoZSByZWNpcGllbnRcbiAqIEBwYXJhbSBvcCB0aGUgbmFtZSBvZiB0aGUgbWVzc2FnZSBvcGVyYXRpb24sIGUuZy4sIFwid2hlblwiLFxuICogQHBhcmFtIGFyZ3MgZnVydGhlciBhcmd1bWVudHMgdG8gYmUgZm9yd2FyZGVkIHRvIHRoZSBvcGVyYXRpb25cbiAqIEByZXR1cm5zIHJlc3VsdCB7UHJvbWlzZX0gYSBwcm9taXNlIGZvciB0aGUgcmVzdWx0IG9mIHRoZSBvcGVyYXRpb25cbiAqL1xuUS5kaXNwYXRjaCA9IGRpc3BhdGNoO1xuZnVuY3Rpb24gZGlzcGF0Y2gob2JqZWN0LCBvcCwgYXJncykge1xuICAgIHJldHVybiBRKG9iamVjdCkuZGlzcGF0Y2gob3AsIGFyZ3MpO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uIChvcCwgYXJncykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgIFEubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLnByb21pc2VEaXNwYXRjaChkZWZlcnJlZC5yZXNvbHZlLCBvcCwgYXJncyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIG9mIGEgcHJvcGVydHkgaW4gYSBmdXR1cmUgdHVybi5cbiAqIEBwYXJhbSBvYmplY3QgICAgcHJvbWlzZSBvciBpbW1lZGlhdGUgcmVmZXJlbmNlIGZvciB0YXJnZXQgb2JqZWN0XG4gKiBAcGFyYW0gbmFtZSAgICAgIG5hbWUgb2YgcHJvcGVydHkgdG8gZ2V0XG4gKiBAcmV0dXJuIHByb21pc2UgZm9yIHRoZSBwcm9wZXJ0eSB2YWx1ZVxuICovXG5RLmdldCA9IGZ1bmN0aW9uIChvYmplY3QsIGtleSkge1xuICAgIHJldHVybiBRKG9iamVjdCkuZGlzcGF0Y2goXCJnZXRcIiwgW2tleV0pO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiB0aGlzLmRpc3BhdGNoKFwiZ2V0XCIsIFtrZXldKTtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgdmFsdWUgb2YgYSBwcm9wZXJ0eSBpbiBhIGZ1dHVyZSB0dXJuLlxuICogQHBhcmFtIG9iamVjdCAgICBwcm9taXNlIG9yIGltbWVkaWF0ZSByZWZlcmVuY2UgZm9yIG9iamVjdCBvYmplY3RcbiAqIEBwYXJhbSBuYW1lICAgICAgbmFtZSBvZiBwcm9wZXJ0eSB0byBzZXRcbiAqIEBwYXJhbSB2YWx1ZSAgICAgbmV3IHZhbHVlIG9mIHByb3BlcnR5XG4gKiBAcmV0dXJuIHByb21pc2UgZm9yIHRoZSByZXR1cm4gdmFsdWVcbiAqL1xuUS5zZXQgPSBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIFEob2JqZWN0KS5kaXNwYXRjaChcInNldFwiLCBba2V5LCB2YWx1ZV0pO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaChcInNldFwiLCBba2V5LCB2YWx1ZV0pO1xufTtcblxuLyoqXG4gKiBEZWxldGVzIGEgcHJvcGVydHkgaW4gYSBmdXR1cmUgdHVybi5cbiAqIEBwYXJhbSBvYmplY3QgICAgcHJvbWlzZSBvciBpbW1lZGlhdGUgcmVmZXJlbmNlIGZvciB0YXJnZXQgb2JqZWN0XG4gKiBAcGFyYW0gbmFtZSAgICAgIG5hbWUgb2YgcHJvcGVydHkgdG8gZGVsZXRlXG4gKiBAcmV0dXJuIHByb21pc2UgZm9yIHRoZSByZXR1cm4gdmFsdWVcbiAqL1xuUS5kZWwgPSAvLyBYWFggbGVnYWN5XG5RW1wiZGVsZXRlXCJdID0gZnVuY3Rpb24gKG9iamVjdCwga2V5KSB7XG4gICAgcmV0dXJuIFEob2JqZWN0KS5kaXNwYXRjaChcImRlbGV0ZVwiLCBba2V5XSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5kZWwgPSAvLyBYWFggbGVnYWN5XG5Qcm9taXNlLnByb3RvdHlwZVtcImRlbGV0ZVwiXSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaChcImRlbGV0ZVwiLCBba2V5XSk7XG59O1xuXG4vKipcbiAqIEludm9rZXMgYSBtZXRob2QgaW4gYSBmdXR1cmUgdHVybi5cbiAqIEBwYXJhbSBvYmplY3QgICAgcHJvbWlzZSBvciBpbW1lZGlhdGUgcmVmZXJlbmNlIGZvciB0YXJnZXQgb2JqZWN0XG4gKiBAcGFyYW0gbmFtZSAgICAgIG5hbWUgb2YgbWV0aG9kIHRvIGludm9rZVxuICogQHBhcmFtIHZhbHVlICAgICBhIHZhbHVlIHRvIHBvc3QsIHR5cGljYWxseSBhbiBhcnJheSBvZlxuICogICAgICAgICAgICAgICAgICBpbnZvY2F0aW9uIGFyZ3VtZW50cyBmb3IgcHJvbWlzZXMgdGhhdFxuICogICAgICAgICAgICAgICAgICBhcmUgdWx0aW1hdGVseSBiYWNrZWQgd2l0aCBgcmVzb2x2ZWAgdmFsdWVzLFxuICogICAgICAgICAgICAgICAgICBhcyBvcHBvc2VkIHRvIHRob3NlIGJhY2tlZCB3aXRoIFVSTHNcbiAqICAgICAgICAgICAgICAgICAgd2hlcmVpbiB0aGUgcG9zdGVkIHZhbHVlIGNhbiBiZSBhbnlcbiAqICAgICAgICAgICAgICAgICAgSlNPTiBzZXJpYWxpemFibGUgb2JqZWN0LlxuICogQHJldHVybiBwcm9taXNlIGZvciB0aGUgcmV0dXJuIHZhbHVlXG4gKi9cbi8vIGJvdW5kIGxvY2FsbHkgYmVjYXVzZSBpdCBpcyB1c2VkIGJ5IG90aGVyIG1ldGhvZHNcblEubWFwcGx5ID0gLy8gWFhYIEFzIHByb3Bvc2VkIGJ5IFwiUmVkc2FuZHJvXCJcblEucG9zdCA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWUsIGFyZ3MpIHtcbiAgICByZXR1cm4gUShvYmplY3QpLmRpc3BhdGNoKFwicG9zdFwiLCBbbmFtZSwgYXJnc10pO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUubWFwcGx5ID0gLy8gWFhYIEFzIHByb3Bvc2VkIGJ5IFwiUmVkc2FuZHJvXCJcblByb21pc2UucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbiAobmFtZSwgYXJncykge1xuICAgIHJldHVybiB0aGlzLmRpc3BhdGNoKFwicG9zdFwiLCBbbmFtZSwgYXJnc10pO1xufTtcblxuLyoqXG4gKiBJbnZva2VzIGEgbWV0aG9kIGluIGEgZnV0dXJlIHR1cm4uXG4gKiBAcGFyYW0gb2JqZWN0ICAgIHByb21pc2Ugb3IgaW1tZWRpYXRlIHJlZmVyZW5jZSBmb3IgdGFyZ2V0IG9iamVjdFxuICogQHBhcmFtIG5hbWUgICAgICBuYW1lIG9mIG1ldGhvZCB0byBpbnZva2VcbiAqIEBwYXJhbSAuLi5hcmdzICAgYXJyYXkgb2YgaW52b2NhdGlvbiBhcmd1bWVudHNcbiAqIEByZXR1cm4gcHJvbWlzZSBmb3IgdGhlIHJldHVybiB2YWx1ZVxuICovXG5RLnNlbmQgPSAvLyBYWFggTWFyayBNaWxsZXIncyBwcm9wb3NlZCBwYXJsYW5jZVxuUS5tY2FsbCA9IC8vIFhYWCBBcyBwcm9wb3NlZCBieSBcIlJlZHNhbmRyb1wiXG5RLmludm9rZSA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWUgLyouLi5hcmdzKi8pIHtcbiAgICByZXR1cm4gUShvYmplY3QpLmRpc3BhdGNoKFwicG9zdFwiLCBbbmFtZSwgYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAyKV0pO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuc2VuZCA9IC8vIFhYWCBNYXJrIE1pbGxlcidzIHByb3Bvc2VkIHBhcmxhbmNlXG5Qcm9taXNlLnByb3RvdHlwZS5tY2FsbCA9IC8vIFhYWCBBcyBwcm9wb3NlZCBieSBcIlJlZHNhbmRyb1wiXG5Qcm9taXNlLnByb3RvdHlwZS5pbnZva2UgPSBmdW5jdGlvbiAobmFtZSAvKi4uLmFyZ3MqLykge1xuICAgIHJldHVybiB0aGlzLmRpc3BhdGNoKFwicG9zdFwiLCBbbmFtZSwgYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAxKV0pO1xufTtcblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBwcm9taXNlZCBmdW5jdGlvbiBpbiBhIGZ1dHVyZSB0dXJuLlxuICogQHBhcmFtIG9iamVjdCAgICBwcm9taXNlIG9yIGltbWVkaWF0ZSByZWZlcmVuY2UgZm9yIHRhcmdldCBmdW5jdGlvblxuICogQHBhcmFtIGFyZ3MgICAgICBhcnJheSBvZiBhcHBsaWNhdGlvbiBhcmd1bWVudHNcbiAqL1xuUS5mYXBwbHkgPSBmdW5jdGlvbiAob2JqZWN0LCBhcmdzKSB7XG4gICAgcmV0dXJuIFEob2JqZWN0KS5kaXNwYXRjaChcImFwcGx5XCIsIFt2b2lkIDAsIGFyZ3NdKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmZhcHBseSA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2goXCJhcHBseVwiLCBbdm9pZCAwLCBhcmdzXSk7XG59O1xuXG4vKipcbiAqIENhbGxzIHRoZSBwcm9taXNlZCBmdW5jdGlvbiBpbiBhIGZ1dHVyZSB0dXJuLlxuICogQHBhcmFtIG9iamVjdCAgICBwcm9taXNlIG9yIGltbWVkaWF0ZSByZWZlcmVuY2UgZm9yIHRhcmdldCBmdW5jdGlvblxuICogQHBhcmFtIC4uLmFyZ3MgICBhcnJheSBvZiBhcHBsaWNhdGlvbiBhcmd1bWVudHNcbiAqL1xuUVtcInRyeVwiXSA9XG5RLmZjYWxsID0gZnVuY3Rpb24gKG9iamVjdCAvKiAuLi5hcmdzKi8pIHtcbiAgICByZXR1cm4gUShvYmplY3QpLmRpc3BhdGNoKFwiYXBwbHlcIiwgW3ZvaWQgMCwgYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAxKV0pO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuZmNhbGwgPSBmdW5jdGlvbiAoLyouLi5hcmdzKi8pIHtcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaChcImFwcGx5XCIsIFt2b2lkIDAsIGFycmF5X3NsaWNlKGFyZ3VtZW50cyldKTtcbn07XG5cbi8qKlxuICogQmluZHMgdGhlIHByb21pc2VkIGZ1bmN0aW9uLCB0cmFuc2Zvcm1pbmcgcmV0dXJuIHZhbHVlcyBpbnRvIGEgZnVsZmlsbGVkXG4gKiBwcm9taXNlIGFuZCB0aHJvd24gZXJyb3JzIGludG8gYSByZWplY3RlZCBvbmUuXG4gKiBAcGFyYW0gb2JqZWN0ICAgIHByb21pc2Ugb3IgaW1tZWRpYXRlIHJlZmVyZW5jZSBmb3IgdGFyZ2V0IGZ1bmN0aW9uXG4gKiBAcGFyYW0gLi4uYXJncyAgIGFycmF5IG9mIGFwcGxpY2F0aW9uIGFyZ3VtZW50c1xuICovXG5RLmZiaW5kID0gZnVuY3Rpb24gKG9iamVjdCAvKi4uLmFyZ3MqLykge1xuICAgIHZhciBwcm9taXNlID0gUShvYmplY3QpO1xuICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAxKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gZmJvdW5kKCkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZS5kaXNwYXRjaChcImFwcGx5XCIsIFtcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICBhcmdzLmNvbmNhdChhcnJheV9zbGljZShhcmd1bWVudHMpKVxuICAgICAgICBdKTtcbiAgICB9O1xufTtcblByb21pc2UucHJvdG90eXBlLmZiaW5kID0gZnVuY3Rpb24gKC8qLi4uYXJncyovKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gZmJvdW5kKCkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZS5kaXNwYXRjaChcImFwcGx5XCIsIFtcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICBhcmdzLmNvbmNhdChhcnJheV9zbGljZShhcmd1bWVudHMpKVxuICAgICAgICBdKTtcbiAgICB9O1xufTtcblxuLyoqXG4gKiBSZXF1ZXN0cyB0aGUgbmFtZXMgb2YgdGhlIG93bmVkIHByb3BlcnRpZXMgb2YgYSBwcm9taXNlZFxuICogb2JqZWN0IGluIGEgZnV0dXJlIHR1cm4uXG4gKiBAcGFyYW0gb2JqZWN0ICAgIHByb21pc2Ugb3IgaW1tZWRpYXRlIHJlZmVyZW5jZSBmb3IgdGFyZ2V0IG9iamVjdFxuICogQHJldHVybiBwcm9taXNlIGZvciB0aGUga2V5cyBvZiB0aGUgZXZlbnR1YWxseSBzZXR0bGVkIG9iamVjdFxuICovXG5RLmtleXMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgcmV0dXJuIFEob2JqZWN0KS5kaXNwYXRjaChcImtleXNcIiwgW10pO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaChcImtleXNcIiwgW10pO1xufTtcblxuLyoqXG4gKiBUdXJucyBhbiBhcnJheSBvZiBwcm9taXNlcyBpbnRvIGEgcHJvbWlzZSBmb3IgYW4gYXJyYXkuICBJZiBhbnkgb2ZcbiAqIHRoZSBwcm9taXNlcyBnZXRzIHJlamVjdGVkLCB0aGUgd2hvbGUgYXJyYXkgaXMgcmVqZWN0ZWQgaW1tZWRpYXRlbHkuXG4gKiBAcGFyYW0ge0FycmF5Kn0gYW4gYXJyYXkgKG9yIHByb21pc2UgZm9yIGFuIGFycmF5KSBvZiB2YWx1ZXMgKG9yXG4gKiBwcm9taXNlcyBmb3IgdmFsdWVzKVxuICogQHJldHVybnMgYSBwcm9taXNlIGZvciBhbiBhcnJheSBvZiB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZXNcbiAqL1xuLy8gQnkgTWFyayBNaWxsZXJcbi8vIGh0dHA6Ly93aWtpLmVjbWFzY3JpcHQub3JnL2Rva3UucGhwP2lkPXN0cmF3bWFuOmNvbmN1cnJlbmN5JnJldj0xMzA4Nzc2NTIxI2FsbGZ1bGZpbGxlZFxuUS5hbGwgPSBhbGw7XG5mdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgICByZXR1cm4gd2hlbihwcm9taXNlcywgZnVuY3Rpb24gKHByb21pc2VzKSB7XG4gICAgICAgIHZhciBwZW5kaW5nQ291bnQgPSAwO1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgICAgICBhcnJheV9yZWR1Y2UocHJvbWlzZXMsIGZ1bmN0aW9uICh1bmRlZmluZWQsIHByb21pc2UsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgc25hcHNob3Q7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaXNQcm9taXNlKHByb21pc2UpICYmXG4gICAgICAgICAgICAgICAgKHNuYXBzaG90ID0gcHJvbWlzZS5pbnNwZWN0KCkpLnN0YXRlID09PSBcImZ1bGZpbGxlZFwiXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlc1tpbmRleF0gPSBzbmFwc2hvdC52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgKytwZW5kaW5nQ291bnQ7XG4gICAgICAgICAgICAgICAgd2hlbihcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtLXBlbmRpbmdDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocHJvbWlzZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChwcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQubm90aWZ5KHsgaW5kZXg6IGluZGV4LCB2YWx1ZTogcHJvZ3Jlc3MgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB2b2lkIDApO1xuICAgICAgICBpZiAocGVuZGluZ0NvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHByb21pc2VzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9KTtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUuYWxsID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhbGwodGhpcyk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IHJlc29sdmVkIHByb21pc2Ugb2YgYW4gYXJyYXkuIFByaW9yIHJlamVjdGVkIHByb21pc2VzIGFyZVxuICogaWdub3JlZC4gIFJlamVjdHMgb25seSBpZiBhbGwgcHJvbWlzZXMgYXJlIHJlamVjdGVkLlxuICogQHBhcmFtIHtBcnJheSp9IGFuIGFycmF5IGNvbnRhaW5pbmcgdmFsdWVzIG9yIHByb21pc2VzIGZvciB2YWx1ZXNcbiAqIEByZXR1cm5zIGEgcHJvbWlzZSBmdWxmaWxsZWQgd2l0aCB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IHJlc29sdmVkIHByb21pc2UsXG4gKiBvciBhIHJlamVjdGVkIHByb21pc2UgaWYgYWxsIHByb21pc2VzIGFyZSByZWplY3RlZC5cbiAqL1xuUS5hbnkgPSBhbnk7XG5cbmZ1bmN0aW9uIGFueShwcm9taXNlcykge1xuICAgIGlmIChwcm9taXNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHZhciBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcbiAgICB2YXIgcGVuZGluZ0NvdW50ID0gMDtcbiAgICBhcnJheV9yZWR1Y2UocHJvbWlzZXMsIGZ1bmN0aW9uIChwcmV2LCBjdXJyZW50LCBpbmRleCkge1xuICAgICAgICB2YXIgcHJvbWlzZSA9IHByb21pc2VzW2luZGV4XTtcblxuICAgICAgICBwZW5kaW5nQ291bnQrKztcblxuICAgICAgICB3aGVuKHByb21pc2UsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBvblByb2dyZXNzKTtcbiAgICAgICAgZnVuY3Rpb24gb25GdWxmaWxsZWQocmVzdWx0KSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25SZWplY3RlZCgpIHtcbiAgICAgICAgICAgIHBlbmRpbmdDb3VudC0tO1xuICAgICAgICAgICAgaWYgKHBlbmRpbmdDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIFwiQ2FuJ3QgZ2V0IGZ1bGZpbGxtZW50IHZhbHVlIGZyb20gYW55IHByb21pc2UsIGFsbCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwicHJvbWlzZXMgd2VyZSByZWplY3RlZC5cIlxuICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uUHJvZ3Jlc3MocHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLm5vdGlmeSh7XG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9ncmVzc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCB1bmRlZmluZWQpO1xuXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59XG5cblByb21pc2UucHJvdG90eXBlLmFueSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYW55KHRoaXMpO1xufTtcblxuLyoqXG4gKiBXYWl0cyBmb3IgYWxsIHByb21pc2VzIHRvIGJlIHNldHRsZWQsIGVpdGhlciBmdWxmaWxsZWQgb3JcbiAqIHJlamVjdGVkLiAgVGhpcyBpcyBkaXN0aW5jdCBmcm9tIGBhbGxgIHNpbmNlIHRoYXQgd291bGQgc3RvcFxuICogd2FpdGluZyBhdCB0aGUgZmlyc3QgcmVqZWN0aW9uLiAgVGhlIHByb21pc2UgcmV0dXJuZWQgYnlcbiAqIGBhbGxSZXNvbHZlZGAgd2lsbCBuZXZlciBiZSByZWplY3RlZC5cbiAqIEBwYXJhbSBwcm9taXNlcyBhIHByb21pc2UgZm9yIGFuIGFycmF5IChvciBhbiBhcnJheSkgb2YgcHJvbWlzZXNcbiAqIChvciB2YWx1ZXMpXG4gKiBAcmV0dXJuIGEgcHJvbWlzZSBmb3IgYW4gYXJyYXkgb2YgcHJvbWlzZXNcbiAqL1xuUS5hbGxSZXNvbHZlZCA9IGRlcHJlY2F0ZShhbGxSZXNvbHZlZCwgXCJhbGxSZXNvbHZlZFwiLCBcImFsbFNldHRsZWRcIik7XG5mdW5jdGlvbiBhbGxSZXNvbHZlZChwcm9taXNlcykge1xuICAgIHJldHVybiB3aGVuKHByb21pc2VzLCBmdW5jdGlvbiAocHJvbWlzZXMpIHtcbiAgICAgICAgcHJvbWlzZXMgPSBhcnJheV9tYXAocHJvbWlzZXMsIFEpO1xuICAgICAgICByZXR1cm4gd2hlbihhbGwoYXJyYXlfbWFwKHByb21pc2VzLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdoZW4ocHJvbWlzZSwgbm9vcCwgbm9vcCk7XG4gICAgICAgIH0pKSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VzO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUuYWxsUmVzb2x2ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFsbFJlc29sdmVkKHRoaXMpO1xufTtcblxuLyoqXG4gKiBAc2VlIFByb21pc2UjYWxsU2V0dGxlZFxuICovXG5RLmFsbFNldHRsZWQgPSBhbGxTZXR0bGVkO1xuZnVuY3Rpb24gYWxsU2V0dGxlZChwcm9taXNlcykge1xuICAgIHJldHVybiBRKHByb21pc2VzKS5hbGxTZXR0bGVkKCk7XG59XG5cbi8qKlxuICogVHVybnMgYW4gYXJyYXkgb2YgcHJvbWlzZXMgaW50byBhIHByb21pc2UgZm9yIGFuIGFycmF5IG9mIHRoZWlyIHN0YXRlcyAoYXNcbiAqIHJldHVybmVkIGJ5IGBpbnNwZWN0YCkgd2hlbiB0aGV5IGhhdmUgYWxsIHNldHRsZWQuXG4gKiBAcGFyYW0ge0FycmF5W0FueSpdfSB2YWx1ZXMgYW4gYXJyYXkgKG9yIHByb21pc2UgZm9yIGFuIGFycmF5KSBvZiB2YWx1ZXMgKG9yXG4gKiBwcm9taXNlcyBmb3IgdmFsdWVzKVxuICogQHJldHVybnMge0FycmF5W1N0YXRlXX0gYW4gYXJyYXkgb2Ygc3RhdGVzIGZvciB0aGUgcmVzcGVjdGl2ZSB2YWx1ZXMuXG4gKi9cblByb21pc2UucHJvdG90eXBlLmFsbFNldHRsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbiAocHJvbWlzZXMpIHtcbiAgICAgICAgcmV0dXJuIGFsbChhcnJheV9tYXAocHJvbWlzZXMsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICBwcm9taXNlID0gUShwcm9taXNlKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlZ2FyZGxlc3MoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UuaW5zcGVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihyZWdhcmRsZXNzLCByZWdhcmRsZXNzKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBDYXB0dXJlcyB0aGUgZmFpbHVyZSBvZiBhIHByb21pc2UsIGdpdmluZyBhbiBvcG9ydHVuaXR5IHRvIHJlY292ZXJcbiAqIHdpdGggYSBjYWxsYmFjay4gIElmIHRoZSBnaXZlbiBwcm9taXNlIGlzIGZ1bGZpbGxlZCwgdGhlIHJldHVybmVkXG4gKiBwcm9taXNlIGlzIGZ1bGZpbGxlZC5cbiAqIEBwYXJhbSB7QW55Kn0gcHJvbWlzZSBmb3Igc29tZXRoaW5nXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayB0byBmdWxmaWxsIHRoZSByZXR1cm5lZCBwcm9taXNlIGlmIHRoZVxuICogZ2l2ZW4gcHJvbWlzZSBpcyByZWplY3RlZFxuICogQHJldHVybnMgYSBwcm9taXNlIGZvciB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBjYWxsYmFja1xuICovXG5RLmZhaWwgPSAvLyBYWFggbGVnYWN5XG5RW1wiY2F0Y2hcIl0gPSBmdW5jdGlvbiAob2JqZWN0LCByZWplY3RlZCkge1xuICAgIHJldHVybiBRKG9iamVjdCkudGhlbih2b2lkIDAsIHJlamVjdGVkKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmZhaWwgPSAvLyBYWFggbGVnYWN5XG5Qcm9taXNlLnByb3RvdHlwZVtcImNhdGNoXCJdID0gZnVuY3Rpb24gKHJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbih2b2lkIDAsIHJlamVjdGVkKTtcbn07XG5cbi8qKlxuICogQXR0YWNoZXMgYSBsaXN0ZW5lciB0aGF0IGNhbiByZXNwb25kIHRvIHByb2dyZXNzIG5vdGlmaWNhdGlvbnMgZnJvbSBhXG4gKiBwcm9taXNlJ3Mgb3JpZ2luYXRpbmcgZGVmZXJyZWQuIFRoaXMgbGlzdGVuZXIgcmVjZWl2ZXMgdGhlIGV4YWN0IGFyZ3VtZW50c1xuICogcGFzc2VkIHRvIGBgZGVmZXJyZWQubm90aWZ5YGAuXG4gKiBAcGFyYW0ge0FueSp9IHByb21pc2UgZm9yIHNvbWV0aGluZ1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgdG8gcmVjZWl2ZSBhbnkgcHJvZ3Jlc3Mgbm90aWZpY2F0aW9uc1xuICogQHJldHVybnMgdGhlIGdpdmVuIHByb21pc2UsIHVuY2hhbmdlZFxuICovXG5RLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG5mdW5jdGlvbiBwcm9ncmVzcyhvYmplY3QsIHByb2dyZXNzZWQpIHtcbiAgICByZXR1cm4gUShvYmplY3QpLnRoZW4odm9pZCAwLCB2b2lkIDAsIHByb2dyZXNzZWQpO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5wcm9ncmVzcyA9IGZ1bmN0aW9uIChwcm9ncmVzc2VkKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbih2b2lkIDAsIHZvaWQgMCwgcHJvZ3Jlc3NlZCk7XG59O1xuXG4vKipcbiAqIFByb3ZpZGVzIGFuIG9wcG9ydHVuaXR5IHRvIG9ic2VydmUgdGhlIHNldHRsaW5nIG9mIGEgcHJvbWlzZSxcbiAqIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGUgcHJvbWlzZSBpcyBmdWxmaWxsZWQgb3IgcmVqZWN0ZWQuICBGb3J3YXJkc1xuICogdGhlIHJlc29sdXRpb24gdG8gdGhlIHJldHVybmVkIHByb21pc2Ugd2hlbiB0aGUgY2FsbGJhY2sgaXMgZG9uZS5cbiAqIFRoZSBjYWxsYmFjayBjYW4gcmV0dXJuIGEgcHJvbWlzZSB0byBkZWZlciBjb21wbGV0aW9uLlxuICogQHBhcmFtIHtBbnkqfSBwcm9taXNlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayB0byBvYnNlcnZlIHRoZSByZXNvbHV0aW9uIG9mIHRoZSBnaXZlblxuICogcHJvbWlzZSwgdGFrZXMgbm8gYXJndW1lbnRzLlxuICogQHJldHVybnMgYSBwcm9taXNlIGZvciB0aGUgcmVzb2x1dGlvbiBvZiB0aGUgZ2l2ZW4gcHJvbWlzZSB3aGVuXG4gKiBgYGZpbmBgIGlzIGRvbmUuXG4gKi9cblEuZmluID0gLy8gWFhYIGxlZ2FjeVxuUVtcImZpbmFsbHlcIl0gPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiBRKG9iamVjdClbXCJmaW5hbGx5XCJdKGNhbGxiYWNrKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmZpbiA9IC8vIFhYWCBsZWdhY3lcblByb21pc2UucHJvdG90eXBlW1wiZmluYWxseVwiXSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrID0gUShjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmZjYWxsKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgLy8gVE9ETyBhdHRlbXB0IHRvIHJlY3ljbGUgdGhlIHJlamVjdGlvbiB3aXRoIFwidGhpc1wiLlxuICAgICAgICByZXR1cm4gY2FsbGJhY2suZmNhbGwoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRocm93IHJlYXNvbjtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFRlcm1pbmF0ZXMgYSBjaGFpbiBvZiBwcm9taXNlcywgZm9yY2luZyByZWplY3Rpb25zIHRvIGJlXG4gKiB0aHJvd24gYXMgZXhjZXB0aW9ucy5cbiAqIEBwYXJhbSB7QW55Kn0gcHJvbWlzZSBhdCB0aGUgZW5kIG9mIGEgY2hhaW4gb2YgcHJvbWlzZXNcbiAqIEByZXR1cm5zIG5vdGhpbmdcbiAqL1xuUS5kb25lID0gZnVuY3Rpb24gKG9iamVjdCwgZnVsZmlsbGVkLCByZWplY3RlZCwgcHJvZ3Jlc3MpIHtcbiAgICByZXR1cm4gUShvYmplY3QpLmRvbmUoZnVsZmlsbGVkLCByZWplY3RlZCwgcHJvZ3Jlc3MpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuZG9uZSA9IGZ1bmN0aW9uIChmdWxmaWxsZWQsIHJlamVjdGVkLCBwcm9ncmVzcykge1xuICAgIHZhciBvblVuaGFuZGxlZEVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIC8vIGZvcndhcmQgdG8gYSBmdXR1cmUgdHVybiBzbyB0aGF0IGBgd2hlbmBgXG4gICAgICAgIC8vIGRvZXMgbm90IGNhdGNoIGl0IGFuZCB0dXJuIGl0IGludG8gYSByZWplY3Rpb24uXG4gICAgICAgIFEubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbWFrZVN0YWNrVHJhY2VMb25nKGVycm9yLCBwcm9taXNlKTtcbiAgICAgICAgICAgIGlmIChRLm9uZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBRLm9uZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIEF2b2lkIHVubmVjZXNzYXJ5IGBuZXh0VGlja2BpbmcgdmlhIGFuIHVubmVjZXNzYXJ5IGB3aGVuYC5cbiAgICB2YXIgcHJvbWlzZSA9IGZ1bGZpbGxlZCB8fCByZWplY3RlZCB8fCBwcm9ncmVzcyA/XG4gICAgICAgIHRoaXMudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkLCBwcm9ncmVzcykgOlxuICAgICAgICB0aGlzO1xuXG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmIHByb2Nlc3MgJiYgcHJvY2Vzcy5kb21haW4pIHtcbiAgICAgICAgb25VbmhhbmRsZWRFcnJvciA9IHByb2Nlc3MuZG9tYWluLmJpbmQob25VbmhhbmRsZWRFcnJvcik7XG4gICAgfVxuXG4gICAgcHJvbWlzZS50aGVuKHZvaWQgMCwgb25VbmhhbmRsZWRFcnJvcik7XG59O1xuXG4vKipcbiAqIENhdXNlcyBhIHByb21pc2UgdG8gYmUgcmVqZWN0ZWQgaWYgaXQgZG9lcyBub3QgZ2V0IGZ1bGZpbGxlZCBiZWZvcmVcbiAqIHNvbWUgbWlsbGlzZWNvbmRzIHRpbWUgb3V0LlxuICogQHBhcmFtIHtBbnkqfSBwcm9taXNlXG4gKiBAcGFyYW0ge051bWJlcn0gbWlsbGlzZWNvbmRzIHRpbWVvdXRcbiAqIEBwYXJhbSB7QW55Kn0gY3VzdG9tIGVycm9yIG1lc3NhZ2Ugb3IgRXJyb3Igb2JqZWN0IChvcHRpb25hbClcbiAqIEByZXR1cm5zIGEgcHJvbWlzZSBmb3IgdGhlIHJlc29sdXRpb24gb2YgdGhlIGdpdmVuIHByb21pc2UgaWYgaXQgaXNcbiAqIGZ1bGZpbGxlZCBiZWZvcmUgdGhlIHRpbWVvdXQsIG90aGVyd2lzZSByZWplY3RlZC5cbiAqL1xuUS50aW1lb3V0ID0gZnVuY3Rpb24gKG9iamVjdCwgbXMsIGVycm9yKSB7XG4gICAgcmV0dXJuIFEob2JqZWN0KS50aW1lb3V0KG1zLCBlcnJvcik7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gKG1zLCBlcnJvcikge1xuICAgIHZhciBkZWZlcnJlZCA9IGRlZmVyKCk7XG4gICAgdmFyIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWVycm9yIHx8IFwic3RyaW5nXCIgPT09IHR5cGVvZiBlcnJvcikge1xuICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3IgfHwgXCJUaW1lZCBvdXQgYWZ0ZXIgXCIgKyBtcyArIFwiIG1zXCIpO1xuICAgICAgICAgICAgZXJyb3IuY29kZSA9IFwiRVRJTUVET1VUXCI7XG4gICAgICAgIH1cbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycm9yKTtcbiAgICB9LCBtcyk7XG5cbiAgICB0aGlzLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHZhbHVlKTtcbiAgICB9LCBmdW5jdGlvbiAoZXhjZXB0aW9uKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXhjZXB0aW9uKTtcbiAgICB9LCBkZWZlcnJlZC5ub3RpZnkpO1xuXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwcm9taXNlIGZvciB0aGUgZ2l2ZW4gdmFsdWUgKG9yIHByb21pc2VkIHZhbHVlKSwgc29tZVxuICogbWlsbGlzZWNvbmRzIGFmdGVyIGl0IHJlc29sdmVkLiBQYXNzZXMgcmVqZWN0aW9ucyBpbW1lZGlhdGVseS5cbiAqIEBwYXJhbSB7QW55Kn0gcHJvbWlzZVxuICogQHBhcmFtIHtOdW1iZXJ9IG1pbGxpc2Vjb25kc1xuICogQHJldHVybnMgYSBwcm9taXNlIGZvciB0aGUgcmVzb2x1dGlvbiBvZiB0aGUgZ2l2ZW4gcHJvbWlzZSBhZnRlciBtaWxsaXNlY29uZHNcbiAqIHRpbWUgaGFzIGVsYXBzZWQgc2luY2UgdGhlIHJlc29sdXRpb24gb2YgdGhlIGdpdmVuIHByb21pc2UuXG4gKiBJZiB0aGUgZ2l2ZW4gcHJvbWlzZSByZWplY3RzLCB0aGF0IGlzIHBhc3NlZCBpbW1lZGlhdGVseS5cbiAqL1xuUS5kZWxheSA9IGZ1bmN0aW9uIChvYmplY3QsIHRpbWVvdXQpIHtcbiAgICBpZiAodGltZW91dCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRpbWVvdXQgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHZvaWQgMDtcbiAgICB9XG4gICAgcmV0dXJuIFEob2JqZWN0KS5kZWxheSh0aW1lb3V0KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24gKHRpbWVvdXQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodmFsdWUpO1xuICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFBhc3NlcyBhIGNvbnRpbnVhdGlvbiB0byBhIE5vZGUgZnVuY3Rpb24sIHdoaWNoIGlzIGNhbGxlZCB3aXRoIHRoZSBnaXZlblxuICogYXJndW1lbnRzIHByb3ZpZGVkIGFzIGFuIGFycmF5LCBhbmQgcmV0dXJucyBhIHByb21pc2UuXG4gKlxuICogICAgICBRLm5mYXBwbHkoRlMucmVhZEZpbGUsIFtfX2ZpbGVuYW1lXSlcbiAqICAgICAgLnRoZW4oZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAqICAgICAgfSlcbiAqXG4gKi9cblEubmZhcHBseSA9IGZ1bmN0aW9uIChjYWxsYmFjaywgYXJncykge1xuICAgIHJldHVybiBRKGNhbGxiYWNrKS5uZmFwcGx5KGFyZ3MpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUubmZhcHBseSA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICB2YXIgbm9kZUFyZ3MgPSBhcnJheV9zbGljZShhcmdzKTtcbiAgICBub2RlQXJncy5wdXNoKGRlZmVycmVkLm1ha2VOb2RlUmVzb2x2ZXIoKSk7XG4gICAgdGhpcy5mYXBwbHkobm9kZUFyZ3MpLmZhaWwoZGVmZXJyZWQucmVqZWN0KTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn07XG5cbi8qKlxuICogUGFzc2VzIGEgY29udGludWF0aW9uIHRvIGEgTm9kZSBmdW5jdGlvbiwgd2hpY2ggaXMgY2FsbGVkIHdpdGggdGhlIGdpdmVuXG4gKiBhcmd1bWVudHMgcHJvdmlkZWQgaW5kaXZpZHVhbGx5LCBhbmQgcmV0dXJucyBhIHByb21pc2UuXG4gKiBAZXhhbXBsZVxuICogUS5uZmNhbGwoRlMucmVhZEZpbGUsIF9fZmlsZW5hbWUpXG4gKiAudGhlbihmdW5jdGlvbiAoY29udGVudCkge1xuICogfSlcbiAqXG4gKi9cblEubmZjYWxsID0gZnVuY3Rpb24gKGNhbGxiYWNrIC8qLi4uYXJncyovKSB7XG4gICAgdmFyIGFyZ3MgPSBhcnJheV9zbGljZShhcmd1bWVudHMsIDEpO1xuICAgIHJldHVybiBRKGNhbGxiYWNrKS5uZmFwcGx5KGFyZ3MpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUubmZjYWxsID0gZnVuY3Rpb24gKC8qLi4uYXJncyovKSB7XG4gICAgdmFyIG5vZGVBcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzKTtcbiAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgIG5vZGVBcmdzLnB1c2goZGVmZXJyZWQubWFrZU5vZGVSZXNvbHZlcigpKTtcbiAgICB0aGlzLmZhcHBseShub2RlQXJncykuZmFpbChkZWZlcnJlZC5yZWplY3QpO1xuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufTtcblxuLyoqXG4gKiBXcmFwcyBhIE5vZGVKUyBjb250aW51YXRpb24gcGFzc2luZyBmdW5jdGlvbiBhbmQgcmV0dXJucyBhbiBlcXVpdmFsZW50XG4gKiB2ZXJzaW9uIHRoYXQgcmV0dXJucyBhIHByb21pc2UuXG4gKiBAZXhhbXBsZVxuICogUS5uZmJpbmQoRlMucmVhZEZpbGUsIF9fZmlsZW5hbWUpKFwidXRmLThcIilcbiAqIC50aGVuKGNvbnNvbGUubG9nKVxuICogLmRvbmUoKVxuICovXG5RLm5mYmluZCA9XG5RLmRlbm9kZWlmeSA9IGZ1bmN0aW9uIChjYWxsYmFjayAvKi4uLmFyZ3MqLykge1xuICAgIHZhciBiYXNlQXJncyA9IGFycmF5X3NsaWNlKGFyZ3VtZW50cywgMSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5vZGVBcmdzID0gYmFzZUFyZ3MuY29uY2F0KGFycmF5X3NsaWNlKGFyZ3VtZW50cykpO1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgICAgICBub2RlQXJncy5wdXNoKGRlZmVycmVkLm1ha2VOb2RlUmVzb2x2ZXIoKSk7XG4gICAgICAgIFEoY2FsbGJhY2spLmZhcHBseShub2RlQXJncykuZmFpbChkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUubmZiaW5kID1cblByb21pc2UucHJvdG90eXBlLmRlbm9kZWlmeSA9IGZ1bmN0aW9uICgvKi4uLmFyZ3MqLykge1xuICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzKTtcbiAgICBhcmdzLnVuc2hpZnQodGhpcyk7XG4gICAgcmV0dXJuIFEuZGVub2RlaWZ5LmFwcGx5KHZvaWQgMCwgYXJncyk7XG59O1xuXG5RLm5iaW5kID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzcCAvKi4uLmFyZ3MqLykge1xuICAgIHZhciBiYXNlQXJncyA9IGFycmF5X3NsaWNlKGFyZ3VtZW50cywgMik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5vZGVBcmdzID0gYmFzZUFyZ3MuY29uY2F0KGFycmF5X3NsaWNlKGFyZ3VtZW50cykpO1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgICAgICBub2RlQXJncy5wdXNoKGRlZmVycmVkLm1ha2VOb2RlUmVzb2x2ZXIoKSk7XG4gICAgICAgIGZ1bmN0aW9uIGJvdW5kKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KHRoaXNwLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIFEoYm91bmQpLmZhcHBseShub2RlQXJncykuZmFpbChkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUubmJpbmQgPSBmdW5jdGlvbiAoLyp0aGlzcCwgLi4uYXJncyovKSB7XG4gICAgdmFyIGFyZ3MgPSBhcnJheV9zbGljZShhcmd1bWVudHMsIDApO1xuICAgIGFyZ3MudW5zaGlmdCh0aGlzKTtcbiAgICByZXR1cm4gUS5uYmluZC5hcHBseSh2b2lkIDAsIGFyZ3MpO1xufTtcblxuLyoqXG4gKiBDYWxscyBhIG1ldGhvZCBvZiBhIE5vZGUtc3R5bGUgb2JqZWN0IHRoYXQgYWNjZXB0cyBhIE5vZGUtc3R5bGVcbiAqIGNhbGxiYWNrIHdpdGggYSBnaXZlbiBhcnJheSBvZiBhcmd1bWVudHMsIHBsdXMgYSBwcm92aWRlZCBjYWxsYmFjay5cbiAqIEBwYXJhbSBvYmplY3QgYW4gb2JqZWN0IHRoYXQgaGFzIHRoZSBuYW1lZCBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG5hbWUgb2YgdGhlIG1ldGhvZCBvZiBvYmplY3RcbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIG1ldGhvZDsgdGhlIGNhbGxiYWNrXG4gKiB3aWxsIGJlIHByb3ZpZGVkIGJ5IFEgYW5kIGFwcGVuZGVkIHRvIHRoZXNlIGFyZ3VtZW50cy5cbiAqIEByZXR1cm5zIGEgcHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9yIGVycm9yXG4gKi9cblEubm1hcHBseSA9IC8vIFhYWCBBcyBwcm9wb3NlZCBieSBcIlJlZHNhbmRyb1wiXG5RLm5wb3N0ID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSwgYXJncykge1xuICAgIHJldHVybiBRKG9iamVjdCkubnBvc3QobmFtZSwgYXJncyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5ubWFwcGx5ID0gLy8gWFhYIEFzIHByb3Bvc2VkIGJ5IFwiUmVkc2FuZHJvXCJcblByb21pc2UucHJvdG90eXBlLm5wb3N0ID0gZnVuY3Rpb24gKG5hbWUsIGFyZ3MpIHtcbiAgICB2YXIgbm9kZUFyZ3MgPSBhcnJheV9zbGljZShhcmdzIHx8IFtdKTtcbiAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgIG5vZGVBcmdzLnB1c2goZGVmZXJyZWQubWFrZU5vZGVSZXNvbHZlcigpKTtcbiAgICB0aGlzLmRpc3BhdGNoKFwicG9zdFwiLCBbbmFtZSwgbm9kZUFyZ3NdKS5mYWlsKGRlZmVycmVkLnJlamVjdCk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59O1xuXG4vKipcbiAqIENhbGxzIGEgbWV0aG9kIG9mIGEgTm9kZS1zdHlsZSBvYmplY3QgdGhhdCBhY2NlcHRzIGEgTm9kZS1zdHlsZVxuICogY2FsbGJhY2ssIGZvcndhcmRpbmcgdGhlIGdpdmVuIHZhcmlhZGljIGFyZ3VtZW50cywgcGx1cyBhIHByb3ZpZGVkXG4gKiBjYWxsYmFjayBhcmd1bWVudC5cbiAqIEBwYXJhbSBvYmplY3QgYW4gb2JqZWN0IHRoYXQgaGFzIHRoZSBuYW1lZCBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG5hbWUgb2YgdGhlIG1ldGhvZCBvZiBvYmplY3RcbiAqIEBwYXJhbSAuLi5hcmdzIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBtZXRob2Q7IHRoZSBjYWxsYmFjayB3aWxsXG4gKiBiZSBwcm92aWRlZCBieSBRIGFuZCBhcHBlbmRlZCB0byB0aGVzZSBhcmd1bWVudHMuXG4gKiBAcmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSB2YWx1ZSBvciBlcnJvclxuICovXG5RLm5zZW5kID0gLy8gWFhYIEJhc2VkIG9uIE1hcmsgTWlsbGVyJ3MgcHJvcG9zZWQgXCJzZW5kXCJcblEubm1jYWxsID0gLy8gWFhYIEJhc2VkIG9uIFwiUmVkc2FuZHJvJ3NcIiBwcm9wb3NhbFxuUS5uaW52b2tlID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSAvKi4uLmFyZ3MqLykge1xuICAgIHZhciBub2RlQXJncyA9IGFycmF5X3NsaWNlKGFyZ3VtZW50cywgMik7XG4gICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICBub2RlQXJncy5wdXNoKGRlZmVycmVkLm1ha2VOb2RlUmVzb2x2ZXIoKSk7XG4gICAgUShvYmplY3QpLmRpc3BhdGNoKFwicG9zdFwiLCBbbmFtZSwgbm9kZUFyZ3NdKS5mYWlsKGRlZmVycmVkLnJlamVjdCk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5uc2VuZCA9IC8vIFhYWCBCYXNlZCBvbiBNYXJrIE1pbGxlcidzIHByb3Bvc2VkIFwic2VuZFwiXG5Qcm9taXNlLnByb3RvdHlwZS5ubWNhbGwgPSAvLyBYWFggQmFzZWQgb24gXCJSZWRzYW5kcm8nc1wiIHByb3Bvc2FsXG5Qcm9taXNlLnByb3RvdHlwZS5uaW52b2tlID0gZnVuY3Rpb24gKG5hbWUgLyouLi5hcmdzKi8pIHtcbiAgICB2YXIgbm9kZUFyZ3MgPSBhcnJheV9zbGljZShhcmd1bWVudHMsIDEpO1xuICAgIHZhciBkZWZlcnJlZCA9IGRlZmVyKCk7XG4gICAgbm9kZUFyZ3MucHVzaChkZWZlcnJlZC5tYWtlTm9kZVJlc29sdmVyKCkpO1xuICAgIHRoaXMuZGlzcGF0Y2goXCJwb3N0XCIsIFtuYW1lLCBub2RlQXJnc10pLmZhaWwoZGVmZXJyZWQucmVqZWN0KTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn07XG5cbi8qKlxuICogSWYgYSBmdW5jdGlvbiB3b3VsZCBsaWtlIHRvIHN1cHBvcnQgYm90aCBOb2RlIGNvbnRpbnVhdGlvbi1wYXNzaW5nLXN0eWxlIGFuZFxuICogcHJvbWlzZS1yZXR1cm5pbmctc3R5bGUsIGl0IGNhbiBlbmQgaXRzIGludGVybmFsIHByb21pc2UgY2hhaW4gd2l0aFxuICogYG5vZGVpZnkobm9kZWJhY2spYCwgZm9yd2FyZGluZyB0aGUgb3B0aW9uYWwgbm9kZWJhY2sgYXJndW1lbnQuICBJZiB0aGUgdXNlclxuICogZWxlY3RzIHRvIHVzZSBhIG5vZGViYWNrLCB0aGUgcmVzdWx0IHdpbGwgYmUgc2VudCB0aGVyZS4gIElmIHRoZXkgZG8gbm90XG4gKiBwYXNzIGEgbm9kZWJhY2ssIHRoZXkgd2lsbCByZWNlaXZlIHRoZSByZXN1bHQgcHJvbWlzZS5cbiAqIEBwYXJhbSBvYmplY3QgYSByZXN1bHQgKG9yIGEgcHJvbWlzZSBmb3IgYSByZXN1bHQpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBub2RlYmFjayBhIE5vZGUuanMtc3R5bGUgY2FsbGJhY2tcbiAqIEByZXR1cm5zIGVpdGhlciB0aGUgcHJvbWlzZSBvciBub3RoaW5nXG4gKi9cblEubm9kZWlmeSA9IG5vZGVpZnk7XG5mdW5jdGlvbiBub2RlaWZ5KG9iamVjdCwgbm9kZWJhY2spIHtcbiAgICByZXR1cm4gUShvYmplY3QpLm5vZGVpZnkobm9kZWJhY2spO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5ub2RlaWZ5ID0gZnVuY3Rpb24gKG5vZGViYWNrKSB7XG4gICAgaWYgKG5vZGViYWNrKSB7XG4gICAgICAgIHRoaXMudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIFEubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5vZGViYWNrKG51bGwsIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIFEubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5vZGViYWNrKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59O1xuXG5RLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJRLm5vQ29uZmxpY3Qgb25seSB3b3JrcyB3aGVuIFEgaXMgdXNlZCBhcyBhIGdsb2JhbFwiKTtcbn07XG5cbi8vIEFsbCBjb2RlIGJlZm9yZSB0aGlzIHBvaW50IHdpbGwgYmUgZmlsdGVyZWQgZnJvbSBzdGFjayB0cmFjZXMuXG52YXIgcUVuZGluZ0xpbmUgPSBjYXB0dXJlTGluZSgpO1xuXG5yZXR1cm4gUTtcblxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcS9xLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzY29wZSA9ICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbCkgfHxcbiAgICAgICAgICAgICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmKSB8fFxuICAgICAgICAgICAgd2luZG93O1xudmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwoc2NvcGUsIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBzZXRpbW1lZGlhdGUgYXR0YWNoZXMgaXRzZWxmIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG5yZXF1aXJlKFwic2V0aW1tZWRpYXRlXCIpO1xuLy8gT24gc29tZSBleG90aWMgZW52aXJvbm1lbnRzLCBpdCdzIG5vdCBjbGVhciB3aGljaCBvYmplY3QgYHNldGltbWVkaWF0ZWAgd2FzXG4vLyBhYmxlIHRvIGluc3RhbGwgb250by4gIFNlYXJjaCBlYWNoIHBvc3NpYmlsaXR5IGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZVxuLy8gYHNldGltbWVkaWF0ZWAgbGlicmFyeS5cbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLnNldEltbWVkaWF0ZSk7XG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuY2xlYXJJbW1lZGlhdGUpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L25vZGUtbGlicy1icm93c2VyL34vdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5leHRIYW5kbGUgPSAxOyAvLyBTcGVjIHNheXMgZ3JlYXRlciB0aGFuIHplcm9cbiAgICB2YXIgdGFza3NCeUhhbmRsZSA9IHt9O1xuICAgIHZhciBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICB2YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuICAgIHZhciByZWdpc3RlckltbWVkaWF0ZTtcblxuICAgIGZ1bmN0aW9uIHNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuICAgICAgLy8gQ2FsbGJhY2sgY2FuIGVpdGhlciBiZSBhIGZ1bmN0aW9uIG9yIGEgc3RyaW5nXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuZXcgRnVuY3Rpb24oXCJcIiArIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIC8vIENvcHkgZnVuY3Rpb24gYXJndW1lbnRzXG4gICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAxXTtcbiAgICAgIH1cbiAgICAgIC8vIFN0b3JlIGFuZCByZWdpc3RlciB0aGUgdGFza1xuICAgICAgdmFyIHRhc2sgPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgYXJnczogYXJncyB9O1xuICAgICAgdGFza3NCeUhhbmRsZVtuZXh0SGFuZGxlXSA9IHRhc2s7XG4gICAgICByZWdpc3RlckltbWVkaWF0ZShuZXh0SGFuZGxlKTtcbiAgICAgIHJldHVybiBuZXh0SGFuZGxlKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaGFuZGxlKSB7XG4gICAgICAgIGRlbGV0ZSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuKHRhc2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGFzay5jYWxsYmFjaztcbiAgICAgICAgdmFyIGFyZ3MgPSB0YXNrLmFyZ3M7XG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuSWZQcmVzZW50KGhhbmRsZSkge1xuICAgICAgICAvLyBGcm9tIHRoZSBzcGVjOiBcIldhaXQgdW50aWwgYW55IGludm9jYXRpb25zIG9mIHRoaXMgYWxnb3JpdGhtIHN0YXJ0ZWQgYmVmb3JlIHRoaXMgb25lIGhhdmUgY29tcGxldGVkLlwiXG4gICAgICAgIC8vIFNvIGlmIHdlJ3JlIGN1cnJlbnRseSBydW5uaW5nIGEgdGFzaywgd2UnbGwgbmVlZCB0byBkZWxheSB0aGlzIGludm9jYXRpb24uXG4gICAgICAgIGlmIChjdXJyZW50bHlSdW5uaW5nQVRhc2spIHtcbiAgICAgICAgICAgIC8vIERlbGF5IGJ5IGRvaW5nIGEgc2V0VGltZW91dC4gc2V0SW1tZWRpYXRlIHdhcyB0cmllZCBpbnN0ZWFkLCBidXQgaW4gRmlyZWZveCA3IGl0IGdlbmVyYXRlZCBhXG4gICAgICAgICAgICAvLyBcInRvbyBtdWNoIHJlY3Vyc2lvblwiIGVycm9yLlxuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGFzayA9IHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBydW4odGFzayk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbW1lZGlhdGUoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHsgcnVuSWZQcmVzZW50KGhhbmRsZSk7IH0pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhblVzZVBvc3RNZXNzYWdlKCkge1xuICAgICAgICAvLyBUaGUgdGVzdCBhZ2FpbnN0IGBpbXBvcnRTY3JpcHRzYCBwcmV2ZW50cyB0aGlzIGltcGxlbWVudGF0aW9uIGZyb20gYmVpbmcgaW5zdGFsbGVkIGluc2lkZSBhIHdlYiB3b3JrZXIsXG4gICAgICAgIC8vIHdoZXJlIGBnbG9iYWwucG9zdE1lc3NhZ2VgIG1lYW5zIHNvbWV0aGluZyBjb21wbGV0ZWx5IGRpZmZlcmVudCBhbmQgY2FuJ3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlLlxuICAgICAgICBpZiAoZ2xvYmFsLnBvc3RNZXNzYWdlICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgICAgICAgICAgdmFyIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG9sZE9uTWVzc2FnZSA9IGdsb2JhbC5vbm1lc3NhZ2U7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShcIlwiLCBcIipcIik7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gb2xkT25NZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgLy8gSW5zdGFsbHMgYW4gZXZlbnQgaGFuZGxlciBvbiBgZ2xvYmFsYCBmb3IgdGhlIGBtZXNzYWdlYCBldmVudDogc2VlXG4gICAgICAgIC8vICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL3dpbmRvdy5wb3N0TWVzc2FnZVxuICAgICAgICAvLyAqIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL2NvbW1zLmh0bWwjY3Jvc3NEb2N1bWVudE1lc3NhZ2VzXG5cbiAgICAgICAgdmFyIG1lc3NhZ2VQcmVmaXggPSBcInNldEltbWVkaWF0ZSRcIiArIE1hdGgucmFuZG9tKCkgKyBcIiRcIjtcbiAgICAgICAgdmFyIG9uR2xvYmFsTWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBnbG9iYWwgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgZXZlbnQuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuaW5kZXhPZihtZXNzYWdlUHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudCgrZXZlbnQuZGF0YS5zbGljZShtZXNzYWdlUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KFwib25tZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKG1lc3NhZ2VQcmVmaXggKyBoYW5kbGUsIFwiKlwiKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZShoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIDxzY3JpcHQ+IGVsZW1lbnQ7IGl0cyByZWFkeXN0YXRlY2hhbmdlIGV2ZW50IHdpbGwgYmUgZmlyZWQgYXN5bmNocm9ub3VzbHkgb25jZSBpdCBpcyBpbnNlcnRlZFxuICAgICAgICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQuIERvIHNvLCB0aHVzIHF1ZXVpbmcgdXAgdGhlIHRhc2suIFJlbWVtYmVyIHRvIGNsZWFuIHVwIG9uY2UgaXQncyBiZWVuIGNhbGxlZC5cbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaHRtbC5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgICAgIHNjcmlwdCA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaHRtbC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJZiBzdXBwb3J0ZWQsIHdlIHNob3VsZCBhdHRhY2ggdG8gdGhlIHByb3RvdHlwZSBvZiBnbG9iYWwsIHNpbmNlIHRoYXQgaXMgd2hlcmUgc2V0VGltZW91dCBldCBhbC4gbGl2ZS5cbiAgICB2YXIgYXR0YWNoVG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbCk7XG4gICAgYXR0YWNoVG8gPSBhdHRhY2hUbyAmJiBhdHRhY2hUby5zZXRUaW1lb3V0ID8gYXR0YWNoVG8gOiBnbG9iYWw7XG5cbiAgICAvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IGUuZy4gYnJvd3NlcmlmeSBlbnZpcm9ubWVudHMuXG4gICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoZ2xvYmFsLnByb2Nlc3MpID09PSBcIltvYmplY3QgcHJvY2Vzc11cIikge1xuICAgICAgICAvLyBGb3IgTm9kZS5qcyBiZWZvcmUgMC45XG4gICAgICAgIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGNhblVzZVBvc3RNZXNzYWdlKCkpIHtcbiAgICAgICAgLy8gRm9yIG5vbi1JRTEwIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChnbG9iYWwuTWVzc2FnZUNoYW5uZWwpIHtcbiAgICAgICAgLy8gRm9yIHdlYiB3b3JrZXJzLCB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgICAgaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZG9jICYmIFwib25yZWFkeXN0YXRlY2hhbmdlXCIgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIikpIHtcbiAgICAgICAgLy8gRm9yIElFIDbigJM4XG4gICAgICAgIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciBvbGRlciBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCk7XG4gICAgfVxuXG4gICAgYXR0YWNoVG8uc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuICAgIGF0dGFjaFRvLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGU7XG59KHR5cGVvZiBzZWxmID09PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIGdsb2JhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IHRoaXMgOiBnbG9iYWwgOiBzZWxmKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9