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
/******/ 	var hotCurrentHash = "7b861154041b6e8c33ee"; // eslint-disable-line no-unused-vars
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
	    logFailureAndManualFetch(("../js/cpo-main.jarr"), e);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2I4NjExNTQwNDFiNmU4YzMzZWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYi9qcy9iZWZvcmVQeXJldC5qcyIsIndlYnBhY2s6Ly8vLi9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3VybC5qcy91cmwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViL2pzL21vZGFsLXByb21wdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3EvcS5qcyIsIndlYnBhY2s6Ly8vLi9+L25vZGUtbGlicy1icm93c2VyL34vdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiXSwibmFtZXMiOlsic2hhcmVBUEkiLCJtYWtlU2hhcmVBUEkiLCJ1cmwiLCJyZXF1aXJlIiwibW9kYWxQcm9tcHQiLCJ3aW5kb3ciLCJMT0ciLCJjdF9sb2ciLCJjb25zb2xlIiwibG9nIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJjdF9lcnJvciIsImVycm9yIiwiaW5pdGlhbFBhcmFtcyIsInBhcnNlIiwiZG9jdW1lbnQiLCJsb2NhdGlvbiIsImhyZWYiLCJwYXJhbXMiLCJoaWdobGlnaHRNb2RlIiwiY2xlYXJGbGFzaCIsIiQiLCJlbXB0eSIsInN0aWNrRXJyb3IiLCJtZXNzYWdlIiwibW9yZSIsIkNQTyIsInNheUFuZEZvcmdldCIsImVyciIsImFkZENsYXNzIiwidGV4dCIsImF0dHIiLCJ0b29sdGlwIiwicHJlcGVuZCIsImZsYXNoRXJyb3IiLCJmYWRlT3V0IiwiZmxhc2hNZXNzYWdlIiwibXNnIiwic3RpY2tNZXNzYWdlIiwibWtXYXJuaW5nVXBwZXIiLCJta1dhcm5pbmdMb3dlciIsImJpbmQiLCJEb2N1bWVudHMiLCJkb2N1bWVudHMiLCJNYXAiLCJwcm90b3R5cGUiLCJoYXMiLCJuYW1lIiwiZ2V0Iiwic2V0IiwiZG9jIiwibG9nZ2VyIiwiaXNEZXRhaWxlZCIsInZhbHVlIiwiZ2V0VmFsdWUiLCJkZWxldGUiLCJmb3JFYWNoIiwiZiIsIlZFUlNJT05fQ0hFQ0tfSU5URVJWQUwiLCJNYXRoIiwicmFuZG9tIiwiY2hlY2tWZXJzaW9uIiwidGhlbiIsInJlc3AiLCJKU09OIiwidmVyc2lvbiIsInNldEludGVydmFsIiwic2F2ZSIsImF1dG9TYXZlIiwibWVyZ2UiLCJvYmoiLCJleHRlbnNpb24iLCJuZXdvYmoiLCJPYmplY3QiLCJrZXlzIiwiayIsImFuaW1hdGlvbkRpdiIsImNsb3NlQW5pbWF0aW9uSWZPcGVuIiwiZGlhbG9nIiwibWFrZUVkaXRvciIsImNvbnRhaW5lciIsIm9wdGlvbnMiLCJpbml0aWFsIiwiaGFzT3duUHJvcGVydHkiLCJ0ZXh0YXJlYSIsImpRdWVyeSIsInZhbCIsImFwcGVuZCIsInJ1bkZ1biIsImNvZGUiLCJyZXBsT3B0aW9ucyIsInJ1biIsImNtIiwiQ00iLCJ1c2VMaW5lTnVtYmVycyIsInNpbXBsZUVkaXRvciIsInVzZUZvbGRpbmciLCJndXR0ZXJzIiwicmVpbmRlbnRBbGxMaW5lcyIsImxhc3QiLCJsaW5lQ291bnQiLCJvcGVyYXRpb24iLCJpIiwiaW5kZW50TGluZSIsIkNPREVfTElORV9XSURUSCIsInJ1bGVycyIsInJ1bGVyc01pbkNvbCIsImNvbG9yIiwiY29sdW1uIiwibGluZVN0eWxlIiwiY2xhc3NOYW1lIiwiY21PcHRpb25zIiwiZXh0cmFLZXlzIiwiQ29kZU1pcnJvciIsIm5vcm1hbGl6ZUtleU1hcCIsImluZGVudFVuaXQiLCJ0YWJTaXplIiwidmlld3BvcnRNYXJnaW4iLCJJbmZpbml0eSIsImxpbmVOdW1iZXJzIiwibWF0Y2hLZXl3b3JkcyIsIm1hdGNoQnJhY2tldHMiLCJzdHlsZVNlbGVjdGVkVGV4dCIsImZvbGRHdXR0ZXIiLCJsaW5lV3JhcHBpbmciLCJsb2dnaW5nIiwiZnJvbVRleHRBcmVhIiwiZGlzcGxheSIsIndyYXBwZXIiLCJhcHBlbmRDaGlsZCIsImdldFRvcFRpZXJNZW51aXRlbXMiLCJyZWZyZXNoIiwiZm9jdXMiLCJmb2N1c0Nhcm91c2VsIiwiUlVOX0NPREUiLCJzZXRVc2VybmFtZSIsInRhcmdldCIsImd3cmFwIiwibG9hZCIsImFwaSIsInBlb3BsZSIsInVzZXJJZCIsInVzZXIiLCJkaXNwbGF5TmFtZSIsImVtYWlscyIsInN0b3JhZ2VBUEkiLCJjb2xsZWN0aW9uIiwic2hvdyIsImhpZGUiLCJmYWlsIiwiY2xpY2siLCJjcmVhdGVQcm9ncmFtQ29sbGVjdGlvbkFQSSIsImFjdGl2ZUVsZW1lbnQiLCJibHVyIiwidG9Mb2FkIiwiZ2V0RmlsZUJ5SWQiLCJsb2FkUHJvZ3JhbSIsInByb2dyYW1Ub1NhdmUiLCJRIiwiZmNhbGwiLCJpbml0aWFsUHJvZ3JhbSIsInByb2dyYW1Mb2FkIiwiZW5hYmxlRmlsZU9wdGlvbnMiLCJwIiwic2hvd1NoYXJlQ29udGFpbmVyIiwiaWQiLCJnZXRTaGFyZWRGaWxlQnlJZCIsImZpbGUiLCJnZXRPcmlnaW5hbCIsInJlc3BvbnNlIiwib3JpZ2luYWwiLCJvZmYiLCJyZXN1bHQiLCJyZW1vdmVDbGFzcyIsIm9wZW4iLCJBUFBfQkFTRV9VUkwiLCJzZXRUaXRsZSIsInByb2dOYW1lIiwidGl0bGUiLCJmaWxlbmFtZSIsImRvd25sb2FkRWx0IiwiY29udGVudHMiLCJlZGl0b3IiLCJkb3dubG9hZEJsb2IiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwidHlwZSIsImluZGV4T2YiLCJsZW5ndGgiLCJkb3dubG9hZCIsIlRSVU5DQVRFX0xFTkdUSCIsInRydW5jYXRlTmFtZSIsInNsaWNlIiwidXBkYXRlTmFtZSIsImdldE5hbWUiLCJwcm9nIiwic2hhcmVkIiwiZ2V0Q29udGVudHMiLCJzYXkiLCJmb3JnZXQiLCJhbm5vdW5jZW1lbnRzIiwiZ2V0RWxlbWVudEJ5SWQiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJjcmVhdGVUZXh0Tm9kZSIsImluc2VydEJlZm9yZSIsImZpcnN0Q2hpbGQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQ2hpbGQiLCJjeWNsZUFkdmFuY2UiLCJjdXJySW5kZXgiLCJtYXhJbmRleCIsInJldmVyc2VQIiwibmV4dEluZGV4IiwicG9wdWxhdGVGb2N1c0Nhcm91c2VsIiwiZmMiLCJkb2NtYWluIiwidG9vbGJhciIsImRvY3JlcGxNYWluIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImRvY3JlcGxNYWluMCIsInVuZGVmaW5lZCIsImlubmVyVGV4dCIsImRvY3JlcGwiLCJkb2NyZXBsY29kZSIsImN5Y2xlRm9jdXMiLCJmQ2Fyb3VzZWwiLCJjdXJyZW50Rm9jdXNlZEVsdCIsImZpbmQiLCJub2RlIiwiY29udGFpbnMiLCJjdXJyZW50Rm9jdXNJbmRleCIsIm5leHRGb2N1c0luZGV4IiwiZm9jdXNFbHQiLCJmb2N1c0VsdDAiLCJjbGFzc0xpc3QiLCJ0ZXh0YXJlYXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInJlbW92ZUF0dHJpYnV0ZSIsInByb2dyYW1Mb2FkZWQiLCJtYWtlU2hhcmVMaW5rIiwibmFtZU9yVW50aXRsZWQiLCJtZW51SXRlbURpc2FibGVkIiwiaGFzQ2xhc3MiLCJuZXdFdmVudCIsImUiLCJzYXZlRXZlbnQiLCJuZXdGaWxlbmFtZSIsInVzZU5hbWUiLCJjcmVhdGUiLCJzYXZlZFByb2dyYW0iLCJjcmVhdGVGaWxlIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImdldFVuaXF1ZUlkIiwic2F2ZUFzIiwic2F2ZUFzUHJvbXB0Iiwic3R5bGUiLCJkZWZhdWx0VmFsdWUiLCJuZXdOYW1lIiwicmVuYW1lIiwicmVuYW1lUHJvbXB0IiwiZm9jdXNhYmxlRWx0cyIsInRoZVRvb2xiYXIiLCJ0b3BUaWVyTWVudWl0ZW1zIiwidG9BcnJheSIsImZpbHRlciIsImVsdCIsImdldEF0dHJpYnV0ZSIsIm51bVRvcFRpZXJNZW51aXRlbXMiLCJpdGhUb3BUaWVyTWVudWl0ZW0iLCJpQ2hpbGQiLCJjaGlsZHJlbiIsImZpcnN0IiwidG9TdHJpbmciLCJ1cGRhdGVFZGl0b3JIZWlnaHQiLCJ0b29sYmFySGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwicGFkZGluZ1RvcCIsImRvY01haW4iLCJkb2NSZXBsTWFpbiIsIm9uIiwiaW5zZXJ0QXJpYVBvcyIsInN1Ym1lbnUiLCJhcnIiLCJsZW4iLCJzZXRBdHRyaWJ1dGUiLCJhZGRFdmVudExpc3RlbmVyIiwiaGlkZUFsbFRvcE1lbnVpdGVtcyIsInN0b3BQcm9wYWdhdGlvbiIsImtleWRvd24iLCJrYyIsImtleUNvZGUiLCJjbGlja1RvcE1lbnVpdGVtIiwidGhpc0VsdCIsInRvcFRpZXJVbCIsImNsb3Nlc3QiLCJoYXNBdHRyaWJ1dGUiLCJ0aGlzVG9wTWVudWl0ZW0iLCJ0MSIsInN1Ym1lbnVPcGVuIiwiZXhwYW5kYWJsZUVsdHMiLCJub25leHBhbmRhYmxlRWx0cyIsInN3aXRjaFRvcE1lbnVpdGVtIiwiZGVzdFRvcE1lbnVpdGVtIiwiZGVzdEVsdCIsImVsdElkIiwic2hvd2luZ0hlbHBLZXlzIiwic2hvd0hlbHBLZXlzIiwiZmFkZUluIiwicmVjaXRlSGVscCIsIndpdGhpblNlY29uZFRpZXJVbCIsInNlY29uZFRpZXJVbCIsInBvc3NFbHRzIiwic3JjVG9wTWVudWl0ZW0iLCJ0dG1pTiIsImoiLCJuZWFyU2licyIsIm15SWQiLCJ0aGlzRW5jb3VudGVyZWQiLCJhZGQiLCJmYXJTaWJzIiwicHJldkFsbCIsInN1Ym1lbnVEaXZzIiwibmV4dEFsbCIsInByZXZlbnREZWZhdWx0Iiwic2hpZnRLZXkiLCJjdHJsS2V5IiwiY29kZUNvbnRhaW5lciIsInJ1bkJ1dHRvbiIsImluaXRpYWxHYXMiLCJzZXRPcHRpb24iLCJyZW1vdmVTaG9ydGVuZWRMaW5lIiwibGluZUhhbmRsZSIsImdldE9wdGlvbiIsImxvbmdMaW5lcyIsInJ1bGVyTGlzdGVuZXJzIiwiZXZ0IiwicmVmcmVzaFJ1bGVycyIsImRlbGV0ZUxpbmUiLCJtaW5MZW5ndGgiLCJzaXplIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwibGluZU5vIiwiaW5zdGFuY2UiLCJjaGFuZ2VPYmpzIiwibWluTGluZSIsImxhc3RMaW5lIiwibWF4TGluZSIsImNoYW5nZSIsImZyb20iLCJsaW5lIiwiY2hhbmdlZCIsImVhY2hMaW5lIiwiYyIsImdldERvYyIsImNsZWFySGlzdG9yeSIsInNldFZhbHVlIiwicHlyZXRMb2FkIiwic3JjIiwiYm9keSIsInB5cmV0TG9hZDIiLCJsb2dGYWlsdXJlQW5kTWFudWFsRmV0Y2giLCJldmVudCIsInRpbWVTdGFtcCIsIm1hbnVhbEZldGNoIiwiYWpheCIsInJlcyIsImNvbnRlbnRzUHJlZml4Iiwic3RhdHVzIiwic3RhdHVzVGV4dCIsInJlc3BvbnNlVGV4dCIsInByb2Nlc3MiLCJlbnYiLCJmaW4iLCJhdXRvSGlnaGxpZ2h0Qm94IiwidGV4dEJveCIsInNlbGVjdCIsInByb21wdFF1ZXVlIiwic3R5bGVzIiwibW9kYWxzIiwiUHJvbXB0IiwicHVzaCIsIkVycm9yIiwibW9kYWwiLCJlbHRzIiwicGFyc2VIVE1MIiwiY2xvc2VCdXR0b24iLCJzdWJtaXRCdXR0b24iLCJzdWJtaXRUZXh0IiwiaXNDb21waWxlZCIsImRlZmVycmVkIiwiZGVmZXIiLCJwcm9taXNlIiwiY2FsbGJhY2siLCJoaWRlU3VibWl0Iiwib25DbG9zZSIsIm9uU3VibWl0IiwiZG9jQ2xpY2siLCJpcyIsImRvY0tleWRvd24iLCJrZXkiLCJwb3B1bGF0ZU1vZGFsIiwiY3NzIiwiY2xlYXJNb2RhbCIsImNyZWF0ZVJhZGlvRWx0Iiwib3B0aW9uIiwiaWR4IiwibGFiZWwiLCJlbHRDb250YWluZXIiLCJsYWJlbENvbnRhaW5lciIsImV4YW1wbGUiLCJtb2RlIiwicmVhZE9ubHkiLCJleGFtcGxlQ29udGFpbmVyIiwiY3JlYXRlVGlsZUVsdCIsImRldGFpbHMiLCJjcmVhdGVUZXh0RWx0IiwiY3JlYXRlQ29weVRleHRFbHQiLCJib3giLCJjcmVhdGVDb25maXJtRWx0IiwidGhhdCIsImNyZWF0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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsT0FBTztBQUNsQjtBQUNBLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksV0FBVyxFQUFFO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsT0FBTztBQUNsQixhQUFZLE9B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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSztBQUNMO0FBQ0E7O0FBRUEsRUFBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLGVBQWMsZ0JBQWdCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE2QixLQUFLO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBa0MsY0FBYyxFQUFFO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFrQyxjQUFjLEVBQUU7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTCxpQkFBZ0I7QUFDaEIsTUFBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxpQkFBZ0I7QUFDaEIsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsWUFBVyxTQUFTO0FBQ3BCLGNBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQSwwQ0FBeUMsZ0NBQWdDO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsWUFBWTtBQUN2QjtBQUNBLGNBQWEsYUFBYTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxLQUFLO0FBQ2hCLFlBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsS0FBSztBQUNoQixZQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxLQUFLO0FBQ2hCLFlBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLEtBQUs7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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dEhvdFVwZGF0ZUNhbGxiYWNrID0gdGhpc1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR0aGlzW1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IFxyXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcclxuIFx0XHRpZihwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gXHRcdHNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcclxuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcclxuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xyXG4gXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChjYWxsYmFjaykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0aWYodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0cmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XHJcbiBcdFx0dHJ5IHtcclxuIFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiBcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcclxuIFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XHJcbiBcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSAxMDAwMDtcclxuIFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcclxuIFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0cmV0dXJuIGNhbGxiYWNrKGVycik7XHJcbiBcdFx0fVxyXG4gXHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRpZihyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcclxuIFx0XHRcdGlmKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XHJcbiBcdFx0XHRcdC8vIHRpbWVvdXRcclxuIFx0XHRcdFx0Y2FsbGJhY2sobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKSk7XHJcbiBcdFx0XHR9IGVsc2UgaWYocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xyXG4gXHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXHJcbiBcdFx0XHRcdGNhbGxiYWNrKCk7XHJcbiBcdFx0XHR9IGVsc2UgaWYocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XHJcbiBcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcclxuIFx0XHRcdFx0Y2FsbGJhY2sobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XHJcbiBcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHQvLyBzdWNjZXNzXHJcbiBcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xyXG4gXHRcdFx0XHR9IGNhdGNoKGUpIHtcclxuIFx0XHRcdFx0XHRjYWxsYmFjayhlKTtcclxuIFx0XHRcdFx0XHRyZXR1cm47XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0Y2FsbGJhY2sobnVsbCwgdXBkYXRlKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9O1xyXG4gXHR9XHJcblxuIFx0XHJcbiBcdFxyXG4gXHQvLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi9iZWY0NWIwL3NyYy9zaGFyZWQvdXRpbHMvY2FuRGVmaW5lUHJvcGVydHkuanNcclxuIFx0dmFyIGNhbkRlZmluZVByb3BlcnR5ID0gZmFsc2U7XHJcbiBcdHRyeSB7XHJcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCBcInhcIiwge1xyXG4gXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHt9XHJcbiBcdFx0fSk7XHJcbiBcdFx0Y2FuRGVmaW5lUHJvcGVydHkgPSB0cnVlO1xyXG4gXHR9IGNhdGNoKHgpIHtcclxuIFx0XHQvLyBJRSB3aWxsIGZhaWwgb24gZGVmaW5lUHJvcGVydHlcclxuIFx0fVxyXG4gXHRcclxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xyXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjdiODYxMTU0MDQxYjZlOGMzM2VlXCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XHJcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRpZighbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xyXG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcclxuIFx0XHRcdGlmKG1lLmhvdC5hY3RpdmUpIHtcclxuIFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xyXG4gXHRcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA8IDApXHJcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdFx0aWYobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA8IDApXHJcbiBcdFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xyXG4gXHRcdFx0XHR9IGVsc2UgaG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xyXG4gXHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0Y29uc29sZS53YXJuKFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVxdWVzdCArIFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArIG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xyXG4gXHRcdH07XHJcbiBcdFx0Zm9yKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSkge1xyXG4gXHRcdFx0XHRpZihjYW5EZWZpbmVQcm9wZXJ0eSkge1xyXG4gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgKGZ1bmN0aW9uKG5hbWUpIHtcclxuIFx0XHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuIFx0XHRcdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuIFx0XHRcdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuIFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcclxuIFx0XHRcdFx0XHRcdFx0fSxcclxuIFx0XHRcdFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gXHRcdFx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcclxuIFx0XHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdFx0fTtcclxuIFx0XHRcdFx0XHR9KG5hbWUpKSk7XHJcbiBcdFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdFx0Zm5bbmFtZV0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRmdW5jdGlvbiBlbnN1cmUoY2h1bmtJZCwgY2FsbGJhY2spIHtcclxuIFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKVxyXG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xyXG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xyXG4gXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQsIGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwobnVsbCwgZm4pO1xyXG4gXHRcdFx0XHR9IGZpbmFsbHkge1xyXG4gXHRcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFxyXG4gXHRcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XHJcbiBcdFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xyXG4gXHRcdFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcclxuIFx0XHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHRpZihob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xyXG4gXHRcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9KTtcclxuIFx0XHR9XHJcbiBcdFx0aWYoY2FuRGVmaW5lUHJvcGVydHkpIHtcclxuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgXCJlXCIsIHtcclxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuIFx0XHRcdFx0dmFsdWU6IGVuc3VyZVxyXG4gXHRcdFx0fSk7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdGZuLmUgPSBlbnN1cmU7XHJcbiBcdFx0fVxyXG4gXHRcdHJldHVybiBmbjtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgaG90ID0ge1xyXG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxyXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcclxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXHJcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcclxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxyXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXHJcbiBcdFxyXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxyXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxyXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxyXG4gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjaztcclxuIFx0XHRcdFx0ZWxzZVxyXG4gXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm51bWJlclwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2VcclxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHJcbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxyXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxyXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxyXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdGlmKCFsKSByZXR1cm4gaG90U3RhdHVzO1xyXG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcclxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxyXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXHJcbiBcdFx0fTtcclxuIFx0XHRyZXR1cm4gaG90O1xyXG4gXHR9XHJcbiBcdFxyXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcclxuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xyXG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcclxuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXHJcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xyXG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XHJcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RBdmFpbGlibGVGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90Q2FsbGJhY2s7XHJcbiBcdFxyXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cclxuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcclxuIFx0XHR2YXIgaXNOdW1iZXIgPSAoK2lkKSArIFwiXCIgPT09IGlkO1xyXG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSwgY2FsbGJhY2spIHtcclxuIFx0XHRpZihob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcclxuIFx0XHRpZih0eXBlb2YgYXBwbHkgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gXHRcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGZhbHNlO1xyXG4gXHRcdFx0Y2FsbGJhY2sgPSBhcHBseTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xyXG4gXHRcdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlcnIpIHtcclxuIFx0XHRcdFx0aWYoZXJyKSB0aHJvdyBlcnI7XHJcbiBcdFx0XHR9O1xyXG4gXHRcdH1cclxuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcclxuIFx0XHRob3REb3dubG9hZE1hbmlmZXN0KGZ1bmN0aW9uKGVyciwgdXBkYXRlKSB7XHJcbiBcdFx0XHRpZihlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xyXG4gXHRcdFx0aWYoIXVwZGF0ZSkge1xyXG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4gXHRcdFx0XHRjYWxsYmFjayhudWxsLCBudWxsKTtcclxuIFx0XHRcdFx0cmV0dXJuO1xyXG4gXHRcdFx0fVxyXG4gXHRcclxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XHJcbiBcdFx0XHRob3RBdmFpbGlibGVGaWxlc01hcCA9IHt9O1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XHJcbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdXBkYXRlLmMubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRcdGhvdEF2YWlsaWJsZUZpbGVzTWFwW3VwZGF0ZS5jW2ldXSA9IHRydWU7XHJcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XHJcbiBcdFxyXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcclxuIFx0XHRcdGhvdENhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcclxuIFx0XHRcdHZhciBjaHVua0lkID0gMDtcclxuIFx0XHRcdHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sb25lLWJsb2Nrc1xyXG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xyXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcclxuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH0pO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0aWYoIWhvdEF2YWlsaWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcclxuIFx0XHRcdHJldHVybjtcclxuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xyXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcdGlmKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcclxuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcclxuIFx0XHRpZighaG90QXZhaWxpYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xyXG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XHJcbiBcdFx0dmFyIGNhbGxiYWNrID0gaG90Q2FsbGJhY2s7XHJcbiBcdFx0aG90Q2FsbGJhY2sgPSBudWxsO1xyXG4gXHRcdGlmKCFjYWxsYmFjaykgcmV0dXJuO1xyXG4gXHRcdGlmKGhvdEFwcGx5T25VcGRhdGUpIHtcclxuIFx0XHRcdGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUsIGNhbGxiYWNrKTtcclxuIFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xyXG4gXHRcdFx0Zm9yKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcclxuIFx0XHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XHJcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRjYWxsYmFjayhudWxsLCBvdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucywgY2FsbGJhY2spIHtcclxuIFx0XHRpZihob3RTdGF0dXMgIT09IFwicmVhZHlcIikgdGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xyXG4gXHRcdGlmKHR5cGVvZiBvcHRpb25zID09PSBcImZ1bmN0aW9uXCIpIHtcclxuIFx0XHRcdGNhbGxiYWNrID0gb3B0aW9ucztcclxuIFx0XHRcdG9wdGlvbnMgPSB7fTtcclxuIFx0XHR9IGVsc2UgaWYob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucyA9PT0gXCJvYmplY3RcIikge1xyXG4gXHRcdFx0Y2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbihlcnIpIHtcclxuIFx0XHRcdFx0aWYoZXJyKSB0aHJvdyBlcnI7XHJcbiBcdFx0XHR9O1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRvcHRpb25zID0ge307XHJcbiBcdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRpZihlcnIpIHRocm93IGVycjtcclxuIFx0XHRcdH07XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZSkge1xyXG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFttb2R1bGVdO1xyXG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XHJcbiBcdFxyXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XHJcbiBcdFx0XHR3aGlsZShxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGlmKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcclxuIFx0XHRcdFx0XHRyZXR1cm4gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgKyBtb2R1bGVJZCk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYobW9kdWxlSWQgPT09IDApIHtcclxuIFx0XHRcdFx0XHRyZXR1cm47XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XHJcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0cmV0dXJuIG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArIG1vZHVsZUlkICsgXCIgaW4gXCIgKyBwYXJlbnRJZCk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGlmKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSA+PSAwKSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXHJcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xyXG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xyXG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcclxuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHBhcmVudElkKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcclxuIFx0XHRcdHJldHVybiBbb3V0ZGF0ZWRNb2R1bGVzLCBvdXRkYXRlZERlcGVuZGVuY2llc107XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XHJcbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XHJcbiBcdFx0XHRcdGlmKGEuaW5kZXhPZihpdGVtKSA8IDApXHJcbiBcdFx0XHRcdFx0YS5wdXNoKGl0ZW0pO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcclxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXHJcbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XHJcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xyXG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XHJcbiBcdFx0Zm9yKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcclxuIFx0XHRcdFx0dmFyIHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRpZighcmVzdWx0KSB7XHJcbiBcdFx0XHRcdFx0aWYob3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIpKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihyZXN1bHQgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xyXG4gXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhyZXN1bHQpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHRbMF0pO1xyXG4gXHRcdFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIHJlc3VsdFsxXSkge1xyXG4gXHRcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHRbMV0sIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcclxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XHJcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sIHJlc3VsdFsxXVttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxyXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHR2YXIgbW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XHJcbiBcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZClcclxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xyXG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxyXG4gXHRcdFx0XHR9KTtcclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XHJcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XHJcbiBcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRpZighbW9kdWxlKSBjb250aW51ZTtcclxuIFx0XHJcbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xyXG4gXHRcclxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xyXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcclxuIFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcclxuIFx0XHRcdFx0dmFyIGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xyXG4gXHRcdFx0XHRjYihkYXRhKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XHJcbiBcdFxyXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcclxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XHJcbiBcdFxyXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXHJcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFxyXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cclxuIFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcclxuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xyXG4gXHRcdFx0XHRpZighY2hpbGQpIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHR2YXIgaWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIHtcclxuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxyXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcclxuIFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xyXG4gXHRcdFx0XHRcdHZhciBpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcclxuIFx0XHRcdFx0XHRpZihpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XHJcbiBcdFxyXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcclxuIFx0XHJcbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXHJcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xyXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XHJcbiBcdFx0Zm9yKHZhciBtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcclxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcclxuIFx0XHRcdFx0XHR2YXIgY2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcclxuIFx0XHRcdFx0XHRpZihjYWxsYmFja3MuaW5kZXhPZihjYikgPj0gMCkgY29udGludWU7XHJcbiBcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHR2YXIgY2IgPSBjYWxsYmFja3NbaV07XHJcbiBcdFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHRcdGNiKG91dGRhdGVkRGVwZW5kZW5jaWVzKTtcclxuIFx0XHRcdFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXHJcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XHJcbiBcdFx0XHR2YXIgbW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcclxuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcclxuIFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xyXG4gXHRcdFx0fSBjYXRjaChlcnIpIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuIFx0XHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcclxuIFx0XHRcdFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH0gZWxzZSBpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxyXG4gXHRcdGlmKGVycm9yKSB7XHJcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xyXG4gXHRcdFx0cmV0dXJuIGNhbGxiYWNrKGVycm9yKTtcclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XHJcbiBcdFx0Y2FsbGJhY2sobnVsbCwgb3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0fVxyXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogaG90Q3VycmVudFBhcmVudHMsXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMS9cIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgwKSgwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3Yjg2MTE1NDA0MWI2ZThjMzNlZSIsIi8qIGdsb2JhbCAkIGpRdWVyeSBDUE8gQ29kZU1pcnJvciBzdG9yYWdlQVBJIFEgY3JlYXRlUHJvZ3JhbUNvbGxlY3Rpb25BUEkgbWFrZVNoYXJlQVBJICovXG5cbnZhciBzaGFyZUFQSSA9IG1ha2VTaGFyZUFQSShwcm9jZXNzLmVudi5DVVJSRU5UX1BZUkVUX1JFTEVBU0UpO1xuXG52YXIgdXJsID0gcmVxdWlyZSgndXJsLmpzJyk7XG52YXIgbW9kYWxQcm9tcHQgPSByZXF1aXJlKCcuL21vZGFsLXByb21wdC5qcycpO1xud2luZG93Lm1vZGFsUHJvbXB0ID0gbW9kYWxQcm9tcHQ7XG5cbmNvbnN0IExPRyA9IHRydWU7XG53aW5kb3cuY3RfbG9nID0gZnVuY3Rpb24oLyogdmFyYXJncyAqLykge1xuICBpZiAod2luZG93LmNvbnNvbGUgJiYgTE9HKSB7XG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgfVxufTtcblxud2luZG93LmN0X2Vycm9yID0gZnVuY3Rpb24oLyogdmFyYXJncyAqLykge1xuICBpZiAod2luZG93LmNvbnNvbGUgJiYgTE9HKSB7XG4gICAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICB9XG59O1xudmFyIGluaXRpYWxQYXJhbXMgPSB1cmwucGFyc2UoZG9jdW1lbnQubG9jYXRpb24uaHJlZik7XG52YXIgcGFyYW1zID0gdXJsLnBhcnNlKFwiLz9cIiArIGluaXRpYWxQYXJhbXNbXCJoYXNoXCJdKTtcbndpbmRvdy5oaWdobGlnaHRNb2RlID0gXCJtY21oXCI7IC8vIHdoYXQgaXMgdGhpcyBmb3I/XG53aW5kb3cuY2xlYXJGbGFzaCA9IGZ1bmN0aW9uKCkge1xuICAkKFwiLm5vdGlmaWNhdGlvbkFyZWFcIikuZW1wdHkoKTtcbn1cbndpbmRvdy5zdGlja0Vycm9yID0gZnVuY3Rpb24obWVzc2FnZSwgbW9yZSkge1xuICBDUE8uc2F5QW5kRm9yZ2V0KG1lc3NhZ2UpO1xuICBjbGVhckZsYXNoKCk7XG4gIHZhciBlcnIgPSAkKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJlcnJvclwiKS50ZXh0KG1lc3NhZ2UpO1xuICBpZihtb3JlKSB7XG4gICAgZXJyLmF0dHIoXCJ0aXRsZVwiLCBtb3JlKTtcbiAgfVxuICBlcnIudG9vbHRpcCgpO1xuICAkKFwiLm5vdGlmaWNhdGlvbkFyZWFcIikucHJlcGVuZChlcnIpO1xufTtcbndpbmRvdy5mbGFzaEVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICBDUE8uc2F5QW5kRm9yZ2V0KG1lc3NhZ2UpO1xuICBjbGVhckZsYXNoKCk7XG4gIHZhciBlcnIgPSAkKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJlcnJvclwiKS50ZXh0KG1lc3NhZ2UpO1xuICAkKFwiLm5vdGlmaWNhdGlvbkFyZWFcIikucHJlcGVuZChlcnIpO1xuICBlcnIuZmFkZU91dCg3MDAwKTtcbn07XG53aW5kb3cuZmxhc2hNZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICBDUE8uc2F5QW5kRm9yZ2V0KG1lc3NhZ2UpO1xuICBjbGVhckZsYXNoKCk7XG4gIHZhciBtc2cgPSAkKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJhY3RpdmVcIikudGV4dChtZXNzYWdlKTtcbiAgJChcIi5ub3RpZmljYXRpb25BcmVhXCIpLnByZXBlbmQobXNnKTtcbiAgbXNnLmZhZGVPdXQoNzAwMCk7XG59O1xud2luZG93LnN0aWNrTWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgQ1BPLnNheUFuZEZvcmdldChtZXNzYWdlKTtcbiAgY2xlYXJGbGFzaCgpO1xuICB2YXIgZXJyID0gJChcIjxkaXY+XCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpLnRleHQobWVzc2FnZSk7XG4gICQoXCIubm90aWZpY2F0aW9uQXJlYVwiKS5wcmVwZW5kKGVycik7XG59O1xud2luZG93Lm1rV2FybmluZ1VwcGVyID0gZnVuY3Rpb24oKXtyZXR1cm4gJChcIjxkaXYgY2xhc3M9J3dhcm5pbmctdXBwZXInPlwiKTt9XG53aW5kb3cubWtXYXJuaW5nTG93ZXIgPSBmdW5jdGlvbigpe3JldHVybiAkKFwiPGRpdiBjbGFzcz0nd2FybmluZy1sb3dlcic+XCIpO31cblxuJCh3aW5kb3cpLmJpbmQoXCJiZWZvcmV1bmxvYWRcIiwgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBcIkJlY2F1c2UgdGhpcyBwYWdlIGNhbiBsb2FkIHNsb3dseSwgYW5kIHlvdSBtYXkgaGF2ZSBvdXRzdGFuZGluZyBjaGFuZ2VzLCB3ZSBhc2sgdGhhdCB5b3UgY29uZmlybSBiZWZvcmUgbGVhdmluZyB0aGUgZWRpdG9yIGluIGNhc2UgY2xvc2luZyB3YXMgYW4gYWNjaWRlbnQuXCI7XG59KTtcblxudmFyIERvY3VtZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gIGZ1bmN0aW9uIERvY3VtZW50cygpIHtcbiAgICB0aGlzLmRvY3VtZW50cyA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIERvY3VtZW50cy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudHMuaGFzKG5hbWUpO1xuICB9O1xuXG4gIERvY3VtZW50cy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudHMuZ2V0KG5hbWUpO1xuICB9O1xuXG4gIERvY3VtZW50cy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKG5hbWUsIGRvYykge1xuICAgIGlmKGxvZ2dlci5pc0RldGFpbGVkKVxuICAgICAgbG9nZ2VyLmxvZyhcImRvYy5zZXRcIiwge25hbWU6IG5hbWUsIHZhbHVlOiBkb2MuZ2V0VmFsdWUoKX0pO1xuICAgIHJldHVybiB0aGlzLmRvY3VtZW50cy5zZXQobmFtZSwgZG9jKTtcbiAgfTtcblxuICBEb2N1bWVudHMucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYobG9nZ2VyLmlzRGV0YWlsZWQpXG4gICAgICBsb2dnZXIubG9nKFwiZG9jLmRlbFwiLCB7bmFtZTogbmFtZX0pO1xuICAgIHJldHVybiB0aGlzLmRvY3VtZW50cy5kZWxldGUobmFtZSk7XG4gIH07XG5cbiAgRG9jdW1lbnRzLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGYpIHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudHMuZm9yRWFjaChmKTtcbiAgfTtcblxuICByZXR1cm4gRG9jdW1lbnRzO1xufSgpO1xuXG52YXIgVkVSU0lPTl9DSEVDS19JTlRFUlZBTCA9IDEyMDAwMCArICgzMDAwMCAqIE1hdGgucmFuZG9tKCkpO1xuXG5mdW5jdGlvbiBjaGVja1ZlcnNpb24oKSB7XG4gICQuZ2V0KFwiL2N1cnJlbnQtdmVyc2lvblwiKS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICByZXNwID0gSlNPTi5wYXJzZShyZXNwKTtcbiAgICBpZihyZXNwLnZlcnNpb24gJiYgcmVzcC52ZXJzaW9uICE9PSBwcm9jZXNzLmVudi5DVVJSRU5UX1BZUkVUX1JFTEVBU0UpIHtcbiAgICAgIHdpbmRvdy5mbGFzaE1lc3NhZ2UoXCJBIG5ldyB2ZXJzaW9uIG9mIFB5cmV0IGlzIGF2YWlsYWJsZS4gU2F2ZSBhbmQgcmVsb2FkIHRoZSBwYWdlIHRvIGdldCB0aGUgbmV3ZXN0IHZlcnNpb24uXCIpO1xuICAgIH1cbiAgfSk7XG59XG53aW5kb3cuc2V0SW50ZXJ2YWwoY2hlY2tWZXJzaW9uLCBWRVJTSU9OX0NIRUNLX0lOVEVSVkFMKTtcblxud2luZG93LkNQTyA9IHtcbiAgc2F2ZTogZnVuY3Rpb24oKSB7fSxcbiAgYXV0b1NhdmU6IGZ1bmN0aW9uKCkge30sXG4gIGRvY3VtZW50cyA6IG5ldyBEb2N1bWVudHMoKVxufTtcbiQoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIG1lcmdlKG9iaiwgZXh0ZW5zaW9uKSB7XG4gICAgdmFyIG5ld29iaiA9IHt9O1xuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbihrKSB7XG4gICAgICBuZXdvYmpba10gPSBvYmpba107XG4gICAgfSk7XG4gICAgT2JqZWN0LmtleXMoZXh0ZW5zaW9uKS5mb3JFYWNoKGZ1bmN0aW9uKGspIHtcbiAgICAgIG5ld29ialtrXSA9IGV4dGVuc2lvbltrXTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3b2JqO1xuICB9XG4gIHZhciBhbmltYXRpb25EaXYgPSBudWxsO1xuICBmdW5jdGlvbiBjbG9zZUFuaW1hdGlvbklmT3BlbigpIHtcbiAgICBpZihhbmltYXRpb25EaXYpIHtcbiAgICAgIGFuaW1hdGlvbkRpdi5lbXB0eSgpO1xuICAgICAgYW5pbWF0aW9uRGl2LmRpYWxvZyhcImRlc3Ryb3lcIik7XG4gICAgICBhbmltYXRpb25EaXYgPSBudWxsO1xuICAgIH1cbiAgfVxuICBDUE8ubWFrZUVkaXRvciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIHZhciBpbml0aWFsID0gXCJcIjtcbiAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShcImluaXRpYWxcIikpIHtcbiAgICAgIGluaXRpYWwgPSBvcHRpb25zLmluaXRpYWw7XG4gICAgfVxuXG4gICAgdmFyIHRleHRhcmVhID0galF1ZXJ5KFwiPHRleHRhcmVhIGFyaWEtaGlkZGVuPSd0cnVlJz5cIik7XG4gICAgdGV4dGFyZWEudmFsKGluaXRpYWwpO1xuICAgIGNvbnRhaW5lci5hcHBlbmQodGV4dGFyZWEpO1xuXG4gICAgdmFyIHJ1bkZ1biA9IGZ1bmN0aW9uIChjb2RlLCByZXBsT3B0aW9ucykge1xuICAgICAgb3B0aW9ucy5ydW4oY29kZSwge2NtOiBDTX0sIHJlcGxPcHRpb25zKTtcbiAgICB9O1xuXG4gICAgdmFyIHVzZUxpbmVOdW1iZXJzID0gIW9wdGlvbnMuc2ltcGxlRWRpdG9yO1xuICAgIHZhciB1c2VGb2xkaW5nID0gIW9wdGlvbnMuc2ltcGxlRWRpdG9yO1xuXG4gICAgdmFyIGd1dHRlcnMgPSAhb3B0aW9ucy5zaW1wbGVFZGl0b3IgP1xuICAgICAgW1wiQ29kZU1pcnJvci1saW5lbnVtYmVyc1wiLCBcIkNvZGVNaXJyb3ItZm9sZGd1dHRlclwiXSA6XG4gICAgICBbXTtcblxuICAgIGZ1bmN0aW9uIHJlaW5kZW50QWxsTGluZXMoY20pIHtcbiAgICAgIHZhciBsYXN0ID0gY20ubGluZUNvdW50KCk7XG4gICAgICBjbS5vcGVyYXRpb24oZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdDsgKytpKSBjbS5pbmRlbnRMaW5lKGkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gcGxhY2UgYSB2ZXJ0aWNhbCBsaW5lIGF0IGNoYXJhY3RlciA4MCBpbiBjb2RlIGVkaXRvciwgYW5kIG5vdCByZXBsXG4gICAgdmFyIENPREVfTElORV9XSURUSCA9IDEwMDtcblxuICAgIHZhciBydWxlcnMsIHJ1bGVyc01pbkNvbDtcbiAgICBpZiAob3B0aW9ucy5zaW1wbGVFZGl0b3IpIHtcbiAgICAgIHJ1bGVycyA9IFtdO1xuICAgIH0gZWxzZXtcbiAgICAgIHJ1bGVycyA9IFt7Y29sb3I6IFwiIzMxN0JDRlwiLCBjb2x1bW46IENPREVfTElORV9XSURUSCwgbGluZVN0eWxlOiBcImRhc2hlZFwiLCBjbGFzc05hbWU6IFwiaGlkZGVuXCJ9XTtcbiAgICAgIHJ1bGVyc01pbkNvbCA9IENPREVfTElORV9XSURUSDtcbiAgICB9XG5cbiAgICB2YXIgY21PcHRpb25zID0ge1xuICAgICAgZXh0cmFLZXlzOiBDb2RlTWlycm9yLm5vcm1hbGl6ZUtleU1hcCh7XG4gICAgICAgIFwiU2hpZnQtRW50ZXJcIjogZnVuY3Rpb24oY20pIHsgcnVuRnVuKGNtLmdldFZhbHVlKCkpOyB9LFxuICAgICAgICBcIlNoaWZ0LUN0cmwtRW50ZXJcIjogZnVuY3Rpb24oY20pIHsgcnVuRnVuKGNtLmdldFZhbHVlKCkpOyB9LFxuICAgICAgICBcIlRhYlwiOiBcImluZGVudEF1dG9cIixcbiAgICAgICAgXCJDdHJsLUlcIjogcmVpbmRlbnRBbGxMaW5lcyxcbiAgICAgICAgXCJFc2MgTGVmdFwiOiBcImdvQmFja3dhcmRTZXhwXCIsXG4gICAgICAgIFwiQWx0LUxlZnRcIjogXCJnb0JhY2t3YXJkU2V4cFwiLFxuICAgICAgICBcIkVzYyBSaWdodFwiOiBcImdvRm9yd2FyZFNleHBcIixcbiAgICAgICAgXCJBbHQtUmlnaHRcIjogXCJnb0ZvcndhcmRTZXhwXCIsXG4gICAgICAgIFwiQ3RybC1MZWZ0XCI6IFwiZ29CYWNrd2FyZFRva2VuXCIsXG4gICAgICAgIFwiQ3RybC1SaWdodFwiOiBcImdvRm9yd2FyZFRva2VuXCJcbiAgICAgIH0pLFxuICAgICAgaW5kZW50VW5pdDogMixcbiAgICAgIHRhYlNpemU6IDIsXG4gICAgICB2aWV3cG9ydE1hcmdpbjogSW5maW5pdHksXG4gICAgICBsaW5lTnVtYmVyczogdXNlTGluZU51bWJlcnMsXG4gICAgICBtYXRjaEtleXdvcmRzOiB0cnVlLFxuICAgICAgbWF0Y2hCcmFja2V0czogdHJ1ZSxcbiAgICAgIHN0eWxlU2VsZWN0ZWRUZXh0OiB0cnVlLFxuICAgICAgZm9sZEd1dHRlcjogdXNlRm9sZGluZyxcbiAgICAgIGd1dHRlcnM6IGd1dHRlcnMsXG4gICAgICBsaW5lV3JhcHBpbmc6IHRydWUsXG4gICAgICBsb2dnaW5nOiB0cnVlLFxuICAgICAgcnVsZXJzOiBydWxlcnMsXG4gICAgICBydWxlcnNNaW5Db2w6IHJ1bGVyc01pbkNvbFxuICAgIH07XG5cbiAgICBjbU9wdGlvbnMgPSBtZXJnZShjbU9wdGlvbnMsIG9wdGlvbnMuY21PcHRpb25zIHx8IHt9KTtcblxuICAgIHZhciBDTSA9IENvZGVNaXJyb3IuZnJvbVRleHRBcmVhKHRleHRhcmVhWzBdLCBjbU9wdGlvbnMpO1xuXG4gICAgaWYgKHVzZUxpbmVOdW1iZXJzKSB7XG4gICAgICBDTS5kaXNwbGF5LndyYXBwZXIuYXBwZW5kQ2hpbGQobWtXYXJuaW5nVXBwZXIoKVswXSk7XG4gICAgICBDTS5kaXNwbGF5LndyYXBwZXIuYXBwZW5kQ2hpbGQobWtXYXJuaW5nTG93ZXIoKVswXSk7XG4gICAgfVxuXG4gICAgZ2V0VG9wVGllck1lbnVpdGVtcygpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNtOiBDTSxcbiAgICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkgeyBDTS5yZWZyZXNoKCk7IH0sXG4gICAgICBydW46IGZ1bmN0aW9uKCkge1xuICAgICAgICBydW5GdW4oQ00uZ2V0VmFsdWUoKSk7XG4gICAgICB9LFxuICAgICAgZm9jdXM6IGZ1bmN0aW9uKCkgeyBDTS5mb2N1cygpOyB9LFxuICAgICAgZm9jdXNDYXJvdXNlbDogbnVsbCAvL2luaXRGb2N1c0Nhcm91c2VsXG4gICAgfTtcbiAgfTtcbiAgQ1BPLlJVTl9DT0RFID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coXCJSdW5uaW5nIGJlZm9yZSByZWFkeVwiLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHNldFVzZXJuYW1lKHRhcmdldCkge1xuICAgIHJldHVybiBnd3JhcC5sb2FkKHtuYW1lOiAncGx1cycsXG4gICAgICB2ZXJzaW9uOiAndjEnLFxuICAgIH0pLnRoZW4oKGFwaSkgPT4ge1xuICAgICAgYXBpLnBlb3BsZS5nZXQoeyB1c2VySWQ6IFwibWVcIiB9KS50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgdmFyIG5hbWUgPSB1c2VyLmRpc3BsYXlOYW1lO1xuICAgICAgICBpZiAodXNlci5lbWFpbHMgJiYgdXNlci5lbWFpbHNbMF0gJiYgdXNlci5lbWFpbHNbMF0udmFsdWUpIHtcbiAgICAgICAgICBuYW1lID0gdXNlci5lbWFpbHNbMF0udmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0LnRleHQobmFtZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0b3JhZ2VBUEkudGhlbihmdW5jdGlvbihhcGkpIHtcbiAgICBhcGkuY29sbGVjdGlvbi50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgJChcIi5sb2dpbk9ubHlcIikuc2hvdygpO1xuICAgICAgJChcIi5sb2dvdXRPbmx5XCIpLmhpZGUoKTtcbiAgICAgIHNldFVzZXJuYW1lKCQoXCIjdXNlcm5hbWVcIikpO1xuICAgIH0pO1xuICAgIGFwaS5jb2xsZWN0aW9uLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICAkKFwiLmxvZ2luT25seVwiKS5oaWRlKCk7XG4gICAgICAkKFwiLmxvZ291dE9ubHlcIikuc2hvdygpO1xuICAgIH0pO1xuICB9KTtcblxuICBzdG9yYWdlQVBJID0gc3RvcmFnZUFQSS50aGVuKGZ1bmN0aW9uKGFwaSkgeyByZXR1cm4gYXBpLmFwaTsgfSk7XG4gICQoXCIjY29ubmVjdEJ1dHRvblwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKFwiI2Nvbm5lY3RCdXR0b25cIikudGV4dChcIkNvbm5lY3RpbmcuLi5cIik7XG4gICAgJChcIiNjb25uZWN0QnV0dG9uXCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xuICAgICQoJyNjb25uZWN0QnV0dG9ubGknKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICQoXCIjY29ubmVjdEJ1dHRvblwiKS5hdHRyKFwidGFiSW5kZXhcIiwgXCItMVwiKTtcbiAgICAvLyQoXCIjdG9wVGllclVsXCIpLmF0dHIoXCJ0YWJJbmRleFwiLCBcIjBcIik7XG4gICAgZ2V0VG9wVGllck1lbnVpdGVtcygpO1xuICAgIHN0b3JhZ2VBUEkgPSBjcmVhdGVQcm9ncmFtQ29sbGVjdGlvbkFQSShcImNvZGUucHlyZXQub3JnXCIsIGZhbHNlKTtcbiAgICBzdG9yYWdlQVBJLnRoZW4oZnVuY3Rpb24oYXBpKSB7XG4gICAgICBhcGkuY29sbGVjdGlvbi50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKFwiLmxvZ2luT25seVwiKS5zaG93KCk7XG4gICAgICAgICQoXCIubG9nb3V0T25seVwiKS5oaWRlKCk7XG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgICAgICAkKFwiI2Jvbm5pZW1lbnVidXR0b25cIikuZm9jdXMoKTtcbiAgICAgICAgc2V0VXNlcm5hbWUoJChcIiN1c2VybmFtZVwiKSk7XG4gICAgICAgIGlmKHBhcmFtc1tcImdldFwiXSAmJiBwYXJhbXNbXCJnZXRcIl1bXCJwcm9ncmFtXCJdKSB7XG4gICAgICAgICAgdmFyIHRvTG9hZCA9IGFwaS5hcGkuZ2V0RmlsZUJ5SWQocGFyYW1zW1wiZ2V0XCJdW1wicHJvZ3JhbVwiXSk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnZWQgaW4gYW5kIGhhcyBwcm9ncmFtIHRvIGxvYWQ6IFwiLCB0b0xvYWQpO1xuICAgICAgICAgIGxvYWRQcm9ncmFtKHRvTG9hZCk7XG4gICAgICAgICAgcHJvZ3JhbVRvU2F2ZSA9IHRvTG9hZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9ncmFtVG9TYXZlID0gUS5mY2FsbChmdW5jdGlvbigpIHsgcmV0dXJuIG51bGw7IH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGFwaS5jb2xsZWN0aW9uLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoXCIjY29ubmVjdEJ1dHRvblwiKS50ZXh0KFwiQ29ubmVjdCB0byBHb29nbGUgRHJpdmVcIik7XG4gICAgICAgICQoXCIjY29ubmVjdEJ1dHRvblwiKS5hdHRyKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xuICAgICAgICAkKCcjY29ubmVjdEJ1dHRvbmxpJykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgIC8vJChcIiNjb25uZWN0QnV0dG9uXCIpLmF0dHIoXCJ0YWJJbmRleFwiLCBcIjBcIik7XG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgICAgICAkKFwiI2Nvbm5lY3RCdXR0b25cIikuZm9jdXMoKTtcbiAgICAgICAgLy8kKFwiI3RvcFRpZXJVbFwiKS5hdHRyKFwidGFiSW5kZXhcIiwgXCItMVwiKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHN0b3JhZ2VBUEkgPSBzdG9yYWdlQVBJLnRoZW4oZnVuY3Rpb24oYXBpKSB7IHJldHVybiBhcGkuYXBpOyB9KTtcbiAgfSk7XG5cbiAgLypcbiAgICBpbml0aWFsUHJvZ3JhbSBob2xkcyBhIHByb21pc2UgZm9yIGEgRHJpdmUgRmlsZSBvYmplY3Qgb3IgbnVsbFxuXG4gICAgSXQncyBudWxsIGlmIHRoZSBwYWdlIGRvZXNuJ3QgaGF2ZSBhICNzaGFyZSBvciAjcHJvZ3JhbSB1cmxcblxuICAgIElmIHRoZSB1cmwgZG9lcyBoYXZlIGEgI3Byb2dyYW0gb3IgI3NoYXJlLCB0aGUgcHJvbWlzZSBpcyBmb3IgdGhlXG4gICAgY29ycmVzcG9uZGluZyBvYmplY3QuXG4gICovXG4gIHZhciBpbml0aWFsUHJvZ3JhbSA9IHN0b3JhZ2VBUEkudGhlbihmdW5jdGlvbihhcGkpIHtcbiAgICB2YXIgcHJvZ3JhbUxvYWQgPSBudWxsO1xuICAgIGlmKHBhcmFtc1tcImdldFwiXSAmJiBwYXJhbXNbXCJnZXRcIl1bXCJwcm9ncmFtXCJdKSB7XG4gICAgICBlbmFibGVGaWxlT3B0aW9ucygpO1xuICAgICAgcHJvZ3JhbUxvYWQgPSBhcGkuZ2V0RmlsZUJ5SWQocGFyYW1zW1wiZ2V0XCJdW1wicHJvZ3JhbVwiXSk7XG4gICAgICBwcm9ncmFtTG9hZC50aGVuKGZ1bmN0aW9uKHApIHsgc2hvd1NoYXJlQ29udGFpbmVyKHApOyB9KTtcbiAgICB9XG4gICAgaWYocGFyYW1zW1wiZ2V0XCJdICYmIHBhcmFtc1tcImdldFwiXVtcInNoYXJlXCJdKSB7XG4gICAgICBsb2dnZXIubG9nKCdzaGFyZWQtcHJvZ3JhbS1sb2FkJyxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiBwYXJhbXNbXCJnZXRcIl1bXCJzaGFyZVwiXVxuICAgICAgICB9KTtcbiAgICAgIHByb2dyYW1Mb2FkID0gYXBpLmdldFNoYXJlZEZpbGVCeUlkKHBhcmFtc1tcImdldFwiXVtcInNoYXJlXCJdKTtcbiAgICAgIHByb2dyYW1Mb2FkLnRoZW4oZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAvLyBOT1RFKGpvZSk6IElmIHRoZSBjdXJyZW50IHVzZXIgZG9lc24ndCBvd24gb3IgaGF2ZSBhY2Nlc3MgdG8gdGhpcyBmaWxlXG4gICAgICAgIC8vIChvciBpc24ndCBsb2dnZWQgaW4pIHRoaXMgd2lsbCBzaW1wbHkgZmFpbCB3aXRoIGEgNDAxLCBzbyB3ZSBkb24ndCBkb1xuICAgICAgICAvLyBhbnkgZnVydGhlciBwZXJtaXNzaW9uIGNoZWNraW5nIGJlZm9yZSBzaG93aW5nIHRoZSBsaW5rLlxuICAgICAgICBmaWxlLmdldE9yaWdpbmFsKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2UgZm9yIG9yaWdpbmFsOiBcIiwgcmVzcG9uc2UpO1xuICAgICAgICAgIHZhciBvcmlnaW5hbCA9ICQoXCIjb3Blbi1vcmlnaW5hbFwiKS5zaG93KCkub2ZmKFwiY2xpY2tcIik7XG4gICAgICAgICAgdmFyIGlkID0gcmVzcG9uc2UucmVzdWx0LnZhbHVlO1xuICAgICAgICAgIG9yaWdpbmFsLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgb3JpZ2luYWwuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3aW5kb3cub3Blbih3aW5kb3cuQVBQX0JBU0VfVVJMICsgXCIvZWRpdG9yI3Byb2dyYW09XCIgKyBpZCwgXCJfYmxhbmtcIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmKHByb2dyYW1Mb2FkKSB7XG4gICAgICBwcm9ncmFtTG9hZC5mYWlsKGZ1bmN0aW9uKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIHdpbmRvdy5zdGlja0Vycm9yKFwiVGhlIHByb2dyYW0gZmFpbGVkIHRvIGxvYWQuXCIpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcHJvZ3JhbUxvYWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2V0VGl0bGUocHJvZ05hbWUpIHtcbiAgICBkb2N1bWVudC50aXRsZSA9IHByb2dOYW1lICsgXCIgLSBjb2RlLnB5cmV0Lm9yZ1wiO1xuICB9XG4gIENQTy5zZXRUaXRsZSA9IHNldFRpdGxlO1xuXG4gIHZhciBmaWxlbmFtZSA9IGZhbHNlO1xuXG4gICQoXCIjZG93bmxvYWQgYVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICB2YXIgZG93bmxvYWRFbHQgPSAkKFwiI2Rvd25sb2FkIGFcIik7XG4gICAgdmFyIGNvbnRlbnRzID0gQ1BPLmVkaXRvci5jbS5nZXRWYWx1ZSgpO1xuICAgIHZhciBkb3dubG9hZEJsb2IgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbY29udGVudHNdLCB7dHlwZTogJ3RleHQvcGxhaW4nfSkpO1xuICAgIGlmKCFmaWxlbmFtZSkgeyBmaWxlbmFtZSA9ICd1bnRpdGxlZF9wcm9ncmFtLmFycic7IH1cbiAgICBpZihmaWxlbmFtZS5pbmRleE9mKFwiLmFyclwiKSAhPT0gKGZpbGVuYW1lLmxlbmd0aCAtIDQpKSB7XG4gICAgICBmaWxlbmFtZSArPSBcIi5hcnJcIjtcbiAgICB9XG4gICAgZG93bmxvYWRFbHQuYXR0cih7XG4gICAgICBkb3dubG9hZDogZmlsZW5hbWUsXG4gICAgICBocmVmOiBkb3dubG9hZEJsb2JcbiAgICB9KTtcbiAgICAkKFwiI2Rvd25sb2FkXCIpLmFwcGVuZChkb3dubG9hZEVsdCk7XG4gIH0pO1xuXG4gIHZhciBUUlVOQ0FURV9MRU5HVEggPSAyMDtcblxuICBmdW5jdGlvbiB0cnVuY2F0ZU5hbWUobmFtZSkge1xuICAgIGlmKG5hbWUubGVuZ3RoIDw9IFRSVU5DQVRFX0xFTkdUSCArIDEpIHsgcmV0dXJuIG5hbWU7IH1cbiAgICByZXR1cm4gbmFtZS5zbGljZSgwLCBUUlVOQ0FURV9MRU5HVEggLyAyKSArIFwi4oCmXCIgKyBuYW1lLnNsaWNlKG5hbWUubGVuZ3RoIC0gVFJVTkNBVEVfTEVOR1RIIC8gMiwgbmFtZS5sZW5ndGgpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTmFtZShwKSB7XG4gICAgZmlsZW5hbWUgPSBwLmdldE5hbWUoKTtcbiAgICAkKFwiI2ZpbGVuYW1lXCIpLnRleHQoXCIgKFwiICsgdHJ1bmNhdGVOYW1lKGZpbGVuYW1lKSArIFwiKVwiKTtcbiAgICBzZXRUaXRsZShmaWxlbmFtZSk7XG4gICAgc2hvd1NoYXJlQ29udGFpbmVyKHApO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9hZFByb2dyYW0ocCkge1xuICAgIHByb2dyYW1Ub1NhdmUgPSBwO1xuICAgIHJldHVybiBwLnRoZW4oZnVuY3Rpb24ocHJvZykge1xuICAgICAgaWYocHJvZyAhPT0gbnVsbCkge1xuICAgICAgICB1cGRhdGVOYW1lKHByb2cpO1xuICAgICAgICBpZihwcm9nLnNoYXJlZCkge1xuICAgICAgICAgIHdpbmRvdy5zdGlja01lc3NhZ2UoXCJZb3UgYXJlIHZpZXdpbmcgYSBzaGFyZWQgcHJvZ3JhbS4gQW55IGNoYW5nZXMgeW91IG1ha2Ugd2lsbCBub3QgYmUgc2F2ZWQuIFlvdSBjYW4gdXNlIEZpbGUgLT4gU2F2ZSBhIGNvcHkgdG8gc2F2ZSB5b3VyIG93biB2ZXJzaW9uIHdpdGggYW55IGVkaXRzIHlvdSBtYWtlLlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvZy5nZXRDb250ZW50cygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2F5KG1zZywgZm9yZ2V0KSB7XG4gICAgaWYgKG1zZyA9PT0gXCJcIikgcmV0dXJuO1xuICAgIHZhciBhbm5vdW5jZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbm5vdW5jZW1lbnRsaXN0XCIpO1xuICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJMSVwiKTtcbiAgICBsaS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtc2cpKTtcbiAgICBhbm5vdW5jZW1lbnRzLmluc2VydEJlZm9yZShsaSwgYW5ub3VuY2VtZW50cy5maXJzdENoaWxkKTtcbiAgICBpZiAoZm9yZ2V0KSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBhbm5vdW5jZW1lbnRzLnJlbW92ZUNoaWxkKGxpKTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNheUFuZEZvcmdldChtc2cpIHtcbiAgICAvL2NvbnNvbGUubG9nKCdkb2luZyBzYXlBbmRGb3JnZXQnLCBtc2cpO1xuICAgIHNheShtc2csIHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3ljbGVBZHZhbmNlKGN1cnJJbmRleCwgbWF4SW5kZXgsIHJldmVyc2VQKSB7XG4gICAgdmFyIG5leHRJbmRleCA9IGN1cnJJbmRleCArIChyZXZlcnNlUD8gLTEgOiArMSk7XG4gICAgbmV4dEluZGV4ID0gKChuZXh0SW5kZXggJSBtYXhJbmRleCkgKyBtYXhJbmRleCkgJSBtYXhJbmRleDtcbiAgICByZXR1cm4gbmV4dEluZGV4O1xuICB9XG5cbiAgZnVuY3Rpb24gcG9wdWxhdGVGb2N1c0Nhcm91c2VsKGVkaXRvcikge1xuICAgIGlmICghZWRpdG9yLmZvY3VzQ2Fyb3VzZWwpIHtcbiAgICAgIGVkaXRvci5mb2N1c0Nhcm91c2VsID0gW107XG4gICAgfVxuICAgIHZhciBmYyA9IGVkaXRvci5mb2N1c0Nhcm91c2VsO1xuICAgIHZhciBkb2NtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpO1xuICAgIGlmICghZmNbMF0pIHtcbiAgICAgIHZhciB0b29sYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1Rvb2xiYXInKTtcbiAgICAgIGZjWzBdID0gdG9vbGJhcjtcbiAgICAgIC8vZmNbMF0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlYWRlcm9uZWxlZ2VuZFwiKTtcbiAgICAgIC8vZ2V0VG9wVGllck1lbnVpdGVtcygpO1xuICAgICAgLy9mY1swXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib25uaWVtZW51YnV0dG9uJyk7XG4gICAgfVxuICAgIGlmICghZmNbMV0pIHtcbiAgICAgIHZhciBkb2NyZXBsTWFpbiA9IGRvY21haW4uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInJlcGxNYWluXCIpO1xuICAgICAgdmFyIGRvY3JlcGxNYWluMDtcbiAgICAgIGlmIChkb2NyZXBsTWFpbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZG9jcmVwbE1haW4wID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIGlmIChkb2NyZXBsTWFpbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgZG9jcmVwbE1haW4wID0gZG9jcmVwbE1haW5bMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvY3JlcGxNYWluLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGRvY3JlcGxNYWluW2ldLmlubmVyVGV4dCAhPT0gXCJcIikge1xuICAgICAgICAgICAgZG9jcmVwbE1haW4wID0gZG9jcmVwbE1haW5baV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmY1sxXSA9IGRvY3JlcGxNYWluMDtcbiAgICB9XG4gICAgaWYgKCFmY1syXSkge1xuICAgICAgdmFyIGRvY3JlcGwgPSBkb2NtYWluLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyZXBsXCIpO1xuICAgICAgdmFyIGRvY3JlcGxjb2RlID0gZG9jcmVwbFswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvbXB0LWNvbnRhaW5lclwiKVswXS5cbiAgICAgICAgZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIkNvZGVNaXJyb3JcIilbMF07XG4gICAgICBmY1syXSA9IGRvY3JlcGxjb2RlO1xuICAgIH1cbiAgICBpZiAoIWZjWzNdKSB7XG4gICAgICBmY1szXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5ub3VuY2VtZW50c1wiKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjeWNsZUZvY3VzKHJldmVyc2VQKSB7XG4gICAgLy9jb25zb2xlLmxvZygnZG9pbmcgY3ljbGVGb2N1cycsIHJldmVyc2VQKTtcbiAgICB2YXIgZWRpdG9yID0gdGhpcy5lZGl0b3I7XG4gICAgcG9wdWxhdGVGb2N1c0Nhcm91c2VsKGVkaXRvcik7XG4gICAgdmFyIGZDYXJvdXNlbCA9IGVkaXRvci5mb2N1c0Nhcm91c2VsO1xuICAgIHZhciBtYXhJbmRleCA9IGZDYXJvdXNlbC5sZW5ndGg7XG4gICAgdmFyIGN1cnJlbnRGb2N1c2VkRWx0ID0gZkNhcm91c2VsLmZpbmQoZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBub2RlLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHZhciBjdXJyZW50Rm9jdXNJbmRleCA9IGZDYXJvdXNlbC5pbmRleE9mKGN1cnJlbnRGb2N1c2VkRWx0KTtcbiAgICB2YXIgbmV4dEZvY3VzSW5kZXggPSBjdXJyZW50Rm9jdXNJbmRleDtcbiAgICB2YXIgZm9jdXNFbHQ7XG4gICAgZG8ge1xuICAgICAgbmV4dEZvY3VzSW5kZXggPSBjeWNsZUFkdmFuY2UobmV4dEZvY3VzSW5kZXgsIG1heEluZGV4LCByZXZlcnNlUCk7XG4gICAgICBmb2N1c0VsdCA9IGZDYXJvdXNlbFtuZXh0Rm9jdXNJbmRleF07XG4gICAgICAvL2NvbnNvbGUubG9nKCd0cnlpbmcgZm9jdXNFbHQnLCBmb2N1c0VsdCk7XG4gICAgfSB3aGlsZSAoIWZvY3VzRWx0KTtcblxuICAgIHZhciBmb2N1c0VsdDA7XG4gICAgaWYgKGZvY3VzRWx0LmNsYXNzTGlzdC5jb250YWlucygndG9vbGJhcnJlZ2lvbicpKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKCdzZXR0bGluZyBvbiB0b29sYmFyIHJlZ2lvbicpXG4gICAgICBnZXRUb3BUaWVyTWVudWl0ZW1zKCk7XG4gICAgICBmb2N1c0VsdDAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9ubmllbWVudWJ1dHRvbicpO1xuICAgIH0gZWxzZSBpZiAoZm9jdXNFbHQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmVwbE1haW5cIikgfHxcbiAgICAgIGZvY3VzRWx0LmNsYXNzTGlzdC5jb250YWlucyhcIkNvZGVNaXJyb3JcIikpIHtcbiAgICAgIC8vY29uc29sZS5sb2coJ3NldHRsaW5nIG9uIGRlZm4gd2luZG93JylcbiAgICAgIHZhciB0ZXh0YXJlYXMgPSBmb2N1c0VsdC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRleHRhcmVhXCIpO1xuICAgICAgLy9jb25zb2xlLmxvZygndHh0YXJlYXM9JywgdGV4dGFyZWFzKVxuICAgICAgLy9jb25zb2xlLmxvZygndHh0YXJlYSBsZW49JywgdGV4dGFyZWFzLmxlbmd0aClcbiAgICAgIGlmICh0ZXh0YXJlYXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ0knKVxuICAgICAgICBmb2N1c0VsdDAgPSBmb2N1c0VsdDtcbiAgICAgIH0gZWxzZSBpZiAodGV4dGFyZWFzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdzZXR0bGluZyBvbiBpbnRlciB3aW5kb3cnKVxuICAgICAgICBmb2N1c0VsdDAgPSB0ZXh0YXJlYXNbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdzZXR0bGluZyBvbiBkZWZuIHdpbmRvdycpXG4gICAgICAgIC8qXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dGFyZWFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRleHRhcmVhc1tpXS5nZXRBdHRyaWJ1dGUoJ3RhYkluZGV4JykpIHtcbiAgICAgICAgICAgIGZvY3VzRWx0MCA9IHRleHRhcmVhc1tpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKi9cbiAgICAgICAgZm9jdXNFbHQwID0gdGV4dGFyZWFzW3RleHRhcmVhcy5sZW5ndGgtMV07XG4gICAgICAgIGZvY3VzRWx0MC5yZW1vdmVBdHRyaWJ1dGUoJ3RhYkluZGV4Jyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vY29uc29sZS5sb2coJ3NldHRsaW5nIG9uIGFubm91bmNlbWVudCByZWdpb24nLCBmb2N1c0VsdClcbiAgICAgIGZvY3VzRWx0MCA9IGZvY3VzRWx0O1xuICAgIH1cblxuICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgIGZvY3VzRWx0MC5jbGljaygpO1xuICAgIGZvY3VzRWx0MC5mb2N1cygpO1xuICAgIC8vY29uc29sZS5sb2coJyhjZilkb2NhY3RlbHQ9JywgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG4gIH1cblxuICB2YXIgcHJvZ3JhbUxvYWRlZCA9IGxvYWRQcm9ncmFtKGluaXRpYWxQcm9ncmFtKTtcblxuICB2YXIgcHJvZ3JhbVRvU2F2ZSA9IGluaXRpYWxQcm9ncmFtO1xuXG4gIGZ1bmN0aW9uIHNob3dTaGFyZUNvbnRhaW5lcihwKSB7XG4gICAgLy9jb25zb2xlLmxvZygnY2FsbGVkIHNob3dTaGFyZUNvbnRhaW5lcicpO1xuICAgIGlmKCFwLnNoYXJlZCkge1xuICAgICAgJChcIiNzaGFyZUNvbnRhaW5lclwiKS5lbXB0eSgpO1xuICAgICAgJCgnI3B1Ymxpc2hsaScpLnNob3coKTtcbiAgICAgICQoXCIjc2hhcmVDb250YWluZXJcIikuYXBwZW5kKHNoYXJlQVBJLm1ha2VTaGFyZUxpbmsocCkpO1xuICAgICAgZ2V0VG9wVGllck1lbnVpdGVtcygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5hbWVPclVudGl0bGVkKCkge1xuICAgIHJldHVybiBmaWxlbmFtZSB8fCBcIlVudGl0bGVkXCI7XG4gIH1cbiAgZnVuY3Rpb24gYXV0b1NhdmUoKSB7XG4gICAgcHJvZ3JhbVRvU2F2ZS50aGVuKGZ1bmN0aW9uKHApIHtcbiAgICAgIGlmKHAgIT09IG51bGwgJiYgIXAuc2hhcmVkKSB7IHNhdmUoKTsgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZW5hYmxlRmlsZU9wdGlvbnMoKSB7XG4gICAgJChcIiNmaWxlbWVudUNvbnRlbnRzICpcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lbnVJdGVtRGlzYWJsZWQoaWQpIHtcbiAgICByZXR1cm4gJChcIiNcIiArIGlkKS5oYXNDbGFzcyhcImRpc2FibGVkXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gbmV3RXZlbnQoZSkge1xuICAgIHdpbmRvdy5vcGVuKHdpbmRvdy5BUFBfQkFTRV9VUkwgKyBcIi9lZGl0b3JcIik7XG4gIH1cblxuICBmdW5jdGlvbiBzYXZlRXZlbnQoZSkge1xuICAgIGlmKG1lbnVJdGVtRGlzYWJsZWQoXCJzYXZlXCIpKSB7IHJldHVybjsgfVxuICAgIHJldHVybiBzYXZlKCk7XG4gIH1cblxuICAvKlxuICAgIHNhdmUgOiBzdHJpbmcgKG9wdGlvbmFsKSAtPiB1bmRlZlxuXG4gICAgSWYgYSBzdHJpbmcgYXJndW1lbnQgaXMgcHJvdmlkZWQsIGNyZWF0ZSBhIG5ldyBmaWxlIHdpdGggdGhhdCBuYW1lIGFuZCBzYXZlXG4gICAgdGhlIGVkaXRvciBjb250ZW50cyBpbiB0aGF0IGZpbGUuXG5cbiAgICBJZiBubyBmaWxlbmFtZSBpcyBwcm92aWRlZCwgc2F2ZSB0aGUgZXhpc3RpbmcgZmlsZSByZWZlcmVuY2VkIGJ5IHRoZSBlZGl0b3JcbiAgICB3aXRoIHRoZSBjdXJyZW50IGVkaXRvciBjb250ZW50cy4gIElmIG5vIGZpbGVuYW1lIGhhcyBiZWVuIHNldCB5ZXQsIGp1c3RcbiAgICBzZXQgdGhlIG5hbWUgdG8gXCJVbnRpdGxlZFwiLlxuXG4gICovXG4gIGZ1bmN0aW9uIHNhdmUobmV3RmlsZW5hbWUpIHtcbiAgICB2YXIgdXNlTmFtZSwgY3JlYXRlO1xuICAgIGlmKG5ld0ZpbGVuYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHVzZU5hbWUgPSBuZXdGaWxlbmFtZTtcbiAgICAgIGNyZWF0ZSA9IHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYoZmlsZW5hbWUgPT09IGZhbHNlKSB7XG4gICAgICBmaWxlbmFtZSA9IFwiVW50aXRsZWRcIjtcbiAgICAgIGNyZWF0ZSA9IHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdXNlTmFtZSA9IGZpbGVuYW1lOyAvLyBBIGNsb3NlZC1vdmVyIHZhcmlhYmxlXG4gICAgICBjcmVhdGUgPSBmYWxzZTtcbiAgICB9XG4gICAgd2luZG93LnN0aWNrTWVzc2FnZShcIlNhdmluZy4uLlwiKTtcbiAgICB2YXIgc2F2ZWRQcm9ncmFtID0gcHJvZ3JhbVRvU2F2ZS50aGVuKGZ1bmN0aW9uKHApIHtcbiAgICAgIGlmKHAgIT09IG51bGwgJiYgcC5zaGFyZWQgJiYgIWNyZWF0ZSkge1xuICAgICAgICByZXR1cm4gcDsgLy8gRG9uJ3QgdHJ5IHRvIHNhdmUgc2hhcmVkIGZpbGVzXG4gICAgICB9XG4gICAgICBpZihjcmVhdGUpIHtcbiAgICAgICAgcHJvZ3JhbVRvU2F2ZSA9IHN0b3JhZ2VBUElcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihhcGkpIHsgcmV0dXJuIGFwaS5jcmVhdGVGaWxlKHVzZU5hbWUpOyB9KVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHApIHtcbiAgICAgICAgICAgIC8vIHNob3dTaGFyZUNvbnRhaW5lcihwKTsgVE9ETyhqb2UpOiBmaWd1cmUgb3V0IHdoZXJlIHRvIHB1dCB0aGlzXG4gICAgICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCBcIiNwcm9ncmFtPVwiICsgcC5nZXRVbmlxdWVJZCgpKTtcbiAgICAgICAgICAgIHVwZGF0ZU5hbWUocCk7IC8vIHNldHMgZmlsZW5hbWVcbiAgICAgICAgICAgIGVuYWJsZUZpbGVPcHRpb25zKCk7XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb2dyYW1Ub1NhdmUudGhlbihmdW5jdGlvbihwKSB7XG4gICAgICAgICAgcmV0dXJuIHNhdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHByb2dyYW1Ub1NhdmUudGhlbihmdW5jdGlvbihwKSB7XG4gICAgICAgICAgaWYocCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHAuc2F2ZShDUE8uZWRpdG9yLmNtLmdldFZhbHVlKCksIGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocCkge1xuICAgICAgICAgIGlmKHAgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHdpbmRvdy5mbGFzaE1lc3NhZ2UoXCJQcm9ncmFtIHNhdmVkIGFzIFwiICsgcC5nZXROYW1lKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgc2F2ZWRQcm9ncmFtLmZhaWwoZnVuY3Rpb24oZXJyKSB7XG4gICAgICB3aW5kb3cuc3RpY2tFcnJvcihcIlVuYWJsZSB0byBzYXZlXCIsIFwiWW91ciBpbnRlcm5ldCBjb25uZWN0aW9uIG1heSBiZSBkb3duLCBvciBzb21ldGhpbmcgZWxzZSBtaWdodCBiZSB3cm9uZyB3aXRoIHRoaXMgc2l0ZSBvciBzYXZpbmcgdG8gR29vZ2xlLiAgWW91IHNob3VsZCBiYWNrIHVwIGFueSBjaGFuZ2VzIHRvIHRoaXMgcHJvZ3JhbSBzb21ld2hlcmUgZWxzZS4gIFlvdSBjYW4gdHJ5IHNhdmluZyBhZ2FpbiB0byBzZWUgaWYgdGhlIHByb2JsZW0gd2FzIHRlbXBvcmFyeSwgYXMgd2VsbC5cIik7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNhdmVkUHJvZ3JhbTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhdmVBcygpIHtcbiAgICBpZihtZW51SXRlbURpc2FibGVkKFwic2F2ZWFzXCIpKSB7IHJldHVybjsgfVxuICAgIHByb2dyYW1Ub1NhdmUudGhlbihmdW5jdGlvbihwKSB7XG4gICAgICB2YXIgbmFtZSA9IHAgPT09IG51bGwgPyBcIlVudGl0bGVkXCIgOiBwLmdldE5hbWUoKTtcbiAgICAgIHZhciBzYXZlQXNQcm9tcHQgPSBuZXcgbW9kYWxQcm9tcHQoe1xuICAgICAgICB0aXRsZTogXCJTYXZlIGEgY29weVwiLFxuICAgICAgICBzdHlsZTogXCJ0ZXh0XCIsXG4gICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtZXNzYWdlOiBcIlRoZSBuYW1lIGZvciB0aGUgY29weTpcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogbmFtZVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gc2F2ZUFzUHJvbXB0LnNob3coKS50aGVuKGZ1bmN0aW9uKG5ld05hbWUpIHtcbiAgICAgICAgaWYobmV3TmFtZSA9PT0gbnVsbCkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgICB3aW5kb3cuc3RpY2tNZXNzYWdlKFwiU2F2aW5nLi4uXCIpO1xuICAgICAgICByZXR1cm4gc2F2ZShuZXdOYW1lKTtcbiAgICAgIH0pLlxuICAgICAgZmFpbChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZW5hbWU6IFwiLCBlcnIpO1xuICAgICAgICB3aW5kb3cuZmxhc2hFcnJvcihcIkZhaWxlZCB0byByZW5hbWUgZmlsZVwiKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuYW1lKCkge1xuICAgIHByb2dyYW1Ub1NhdmUudGhlbihmdW5jdGlvbihwKSB7XG4gICAgICB2YXIgcmVuYW1lUHJvbXB0ID0gbmV3IG1vZGFsUHJvbXB0KHtcbiAgICAgICAgdGl0bGU6IFwiUmVuYW1lIHRoaXMgZmlsZVwiLFxuICAgICAgICBzdHlsZTogXCJ0ZXh0XCIsXG4gICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtZXNzYWdlOiBcIlRoZSBuZXcgbmFtZSBmb3IgdGhlIGZpbGU6XCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHAuZ2V0TmFtZSgpXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KTtcbiAgICAgIC8vIG51bGwgcmV0dXJuIHZhbHVlcyBhcmUgZm9yIHRoZSBcImNhbmNlbFwiIHBhdGhcbiAgICAgIHJldHVybiByZW5hbWVQcm9tcHQuc2hvdygpLnRoZW4oZnVuY3Rpb24obmV3TmFtZSkge1xuICAgICAgICBpZihuZXdOYW1lID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LnN0aWNrTWVzc2FnZShcIlJlbmFtaW5nLi4uXCIpO1xuICAgICAgICBwcm9ncmFtVG9TYXZlID0gcC5yZW5hbWUobmV3TmFtZSk7XG4gICAgICAgIHJldHVybiBwcm9ncmFtVG9TYXZlO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHApIHtcbiAgICAgICAgaWYocCA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZU5hbWUocCk7XG4gICAgICAgIHdpbmRvdy5mbGFzaE1lc3NhZ2UoXCJQcm9ncmFtIHNhdmVkIGFzIFwiICsgcC5nZXROYW1lKCkpO1xuICAgICAgfSlcbiAgICAgIC5mYWlsKGZ1bmN0aW9uKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHJlbmFtZTogXCIsIGVycik7XG4gICAgICAgIHdpbmRvdy5mbGFzaEVycm9yKFwiRmFpbGVkIHRvIHJlbmFtZSBmaWxlXCIpO1xuICAgICAgfSk7XG4gICAgfSlcbiAgICAuZmFpbChmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gcmVuYW1lOiBcIiwgZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gICQoXCIjcnVuQnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIENQTy5hdXRvU2F2ZSgpO1xuICB9KTtcblxuICAkKFwiI25ld1wiKS5jbGljayhuZXdFdmVudCk7XG4gICQoXCIjc2F2ZVwiKS5jbGljayhzYXZlRXZlbnQpO1xuICAkKFwiI3JlbmFtZVwiKS5jbGljayhyZW5hbWUpO1xuICAkKFwiI3NhdmVhc1wiKS5jbGljayhzYXZlQXMpO1xuXG4gIHZhciBmb2N1c2FibGVFbHRzID0gJChkb2N1bWVudCkuZmluZCgnI2hlYWRlciAuZm9jdXNhYmxlJyk7XG4gIC8vY29uc29sZS5sb2coJ2ZvY3VzYWJsZUVsdHM9JywgZm9jdXNhYmxlRWx0cylcbiAgdmFyIHRoZVRvb2xiYXIgPSAkKGRvY3VtZW50KS5maW5kKCcjVG9vbGJhcicpO1xuXG4gIGZ1bmN0aW9uIGdldFRvcFRpZXJNZW51aXRlbXMoKSB7XG4gICAgLy9jb25zb2xlLmxvZygnZG9pbmcgZ2V0VG9wVGllck1lbnVpdGVtcycpXG4gICAgdmFyIHRvcFRpZXJNZW51aXRlbXMgPSAkKGRvY3VtZW50KS5maW5kKCcjaGVhZGVyIHVsIGxpLnRvcFRpZXInKS50b0FycmF5KCk7XG4gICAgdG9wVGllck1lbnVpdGVtcyA9IHRvcFRpZXJNZW51aXRlbXMuXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoZWx0ID0+ICEoZWx0LnN0eWxlLmRpc3BsYXkgPT09ICdub25lJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsdC5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgPT09ICdkaXNhYmxlZCcpKTtcbiAgICB2YXIgbnVtVG9wVGllck1lbnVpdGVtcyA9IHRvcFRpZXJNZW51aXRlbXMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtVG9wVGllck1lbnVpdGVtczsgaSsrKSB7XG4gICAgICB2YXIgaXRoVG9wVGllck1lbnVpdGVtID0gdG9wVGllck1lbnVpdGVtc1tpXTtcbiAgICAgIHZhciBpQ2hpbGQgPSAkKGl0aFRvcFRpZXJNZW51aXRlbSkuY2hpbGRyZW4oKS5maXJzdCgpO1xuICAgICAgLy9jb25zb2xlLmxvZygnaUNoaWxkPScsIGlDaGlsZCk7XG4gICAgICBpQ2hpbGQuZmluZCgnLmZvY3VzYWJsZScpLlxuICAgICAgICBhdHRyKCdhcmlhLXNldHNpemUnLCBudW1Ub3BUaWVyTWVudWl0ZW1zLnRvU3RyaW5nKCkpLlxuICAgICAgICBhdHRyKCdhcmlhLXBvc2luc2V0JywgKGkrMSkudG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIHJldHVybiB0b3BUaWVyTWVudWl0ZW1zO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlRWRpdG9ySGVpZ2h0KCkge1xuICAgIHZhciB0b29sYmFySGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcFRpZXJVbCcpLnNjcm9sbEhlaWdodDtcbiAgICAvLyBnZXRzIGJ1bXBlZCB0byA2NyBvbiBpbml0aWFsIHJlc2l6ZSBwZXJ0dXJiYXRpb24sIGJ1dCBhY3R1YWwgdmFsdWUgaXMgaW5kZWVkIDQwXG4gICAgaWYgKHRvb2xiYXJIZWlnaHQgPCA4MCkgdG9vbGJhckhlaWdodCA9IDQwO1xuICAgIHRvb2xiYXJIZWlnaHQgKz0gJ3B4JztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnUkVQTCcpLnN0eWxlLnBhZGRpbmdUb3AgPSB0b29sYmFySGVpZ2h0O1xuICAgIHZhciBkb2NNYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKTtcbiAgICB2YXIgZG9jUmVwbE1haW4gPSBkb2NNYWluLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JlcGxNYWluJyk7XG4gICAgaWYgKGRvY1JlcGxNYWluLmxlbmd0aCAhPT0gMCkge1xuICAgICAgZG9jUmVwbE1haW5bMF0uc3R5bGUucGFkZGluZ1RvcCA9IHRvb2xiYXJIZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCB1cGRhdGVFZGl0b3JIZWlnaHQpO1xuXG4gIGZ1bmN0aW9uIGluc2VydEFyaWFQb3Moc3VibWVudSkge1xuICAgIC8vY29uc29sZS5sb2coJ2RvaW5nIGluc2VydEFyaWFQb3MnLCBzdWJtZW51KVxuICAgIHZhciBhcnIgPSBzdWJtZW51LnRvQXJyYXkoKTtcbiAgICAvL2NvbnNvbGUubG9nKCdhcnI9JywgYXJyKTtcbiAgICB2YXIgbGVuID0gYXJyLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgZWx0ID0gYXJyW2ldO1xuICAgICAgLy9jb25zb2xlLmxvZygnZWx0JywgaSwgJz0nLCBlbHQpO1xuICAgICAgZWx0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZXRzaXplJywgbGVuLnRvU3RyaW5nKCkpO1xuICAgICAgZWx0LnNldEF0dHJpYnV0ZSgnYXJpYS1wb3NpbnNldCcsIChpKzEpLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgfVxuXG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgaGlkZUFsbFRvcE1lbnVpdGVtcygpO1xuICB9KTtcblxuICB0aGVUb29sYmFyLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgdGhlVG9vbGJhci5rZXlkb3duKGZ1bmN0aW9uIChlKSB7XG4gICAgLy9jb25zb2xlLmxvZygndG9vbGJhciBrZXlkb3duJywgZSk7XG4gICAgLy9tb3N0IGFueSBrZXkgYXQgYWxsXG4gICAgdmFyIGtjID0gZS5rZXlDb2RlO1xuICAgIGlmIChrYyA9PT0gMjcpIHtcbiAgICAgIC8vIGVzY2FwZVxuICAgICAgaGlkZUFsbFRvcE1lbnVpdGVtcygpO1xuICAgICAgLy9jb25zb2xlLmxvZygnY2FsbGluZyBjeWNsZUZvY3VzIGZyb20gdG9vbGJhcicpXG4gICAgICBDUE8uY3ljbGVGb2N1cygpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9IGVsc2UgaWYgKGtjID09PSA5IHx8IGtjID09PSAzNyB8fCBrYyA9PT0gMzggfHwga2MgPT09IDM5IHx8IGtjID09PSA0MCkge1xuICAgICAgLy8gYW4gYXJyb3dcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmZpbmQoJ1t0YWJJbmRleD0tMV0nKTtcbiAgICAgIGdldFRvcFRpZXJNZW51aXRlbXMoKTtcbiAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpOyAvL25lZWRlZD9cbiAgICAgIHRhcmdldC5maXJzdCgpLmZvY3VzKCk7IC8vbmVlZGVkP1xuICAgICAgLy9jb25zb2xlLmxvZygnZG9jYWN0ZWx0PScsIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZUFsbFRvcE1lbnVpdGVtcygpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gY2xpY2tUb3BNZW51aXRlbShlKSB7XG4gICAgaGlkZUFsbFRvcE1lbnVpdGVtcygpO1xuICAgIHZhciB0aGlzRWx0ID0gJCh0aGlzKTtcbiAgICAvL2NvbnNvbGUubG9nKCdkb2luZyBjbGlja1RvcE1lbnVpdGVtIG9uJywgdGhpc0VsdCk7XG4gICAgdmFyIHRvcFRpZXJVbCA9IHRoaXNFbHQuY2xvc2VzdCgndWxbaWQ9dG9wVGllclVsXScpO1xuICAgIGlmICh0aGlzRWx0WzBdLmhhc0F0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpc0VsdFswXS5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgPT09ICdkaXNhYmxlZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy92YXIgaGlkZGVuUCA9ICh0aGlzRWx0WzBdLmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAnZmFsc2UnKTtcbiAgICAvL2hpZGRlblAgYWx3YXlzIGZhbHNlP1xuICAgIHZhciB0aGlzVG9wTWVudWl0ZW0gPSB0aGlzRWx0LmNsb3Nlc3QoJ2xpLnRvcFRpZXInKTtcbiAgICAvL2NvbnNvbGUubG9nKCd0aGlzVG9wTWVudWl0ZW09JywgdGhpc1RvcE1lbnVpdGVtKTtcbiAgICB2YXIgdDEgPSB0aGlzVG9wTWVudWl0ZW1bMF07XG4gICAgdmFyIHN1Ym1lbnVPcGVuID0gKHRoaXNFbHRbMF0uZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykgPT09ICd0cnVlJyk7XG4gICAgaWYgKCFzdWJtZW51T3Blbikge1xuICAgICAgLy9jb25zb2xlLmxvZygnaGlkZGVucCB0cnVlIGJyYW5jaCcpO1xuICAgICAgaGlkZUFsbFRvcE1lbnVpdGVtcygpO1xuICAgICAgdGhpc1RvcE1lbnVpdGVtLmNoaWxkcmVuKCd1bC5zdWJtZW51JykuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKS5zaG93KCk7XG4gICAgICB0aGlzVG9wTWVudWl0ZW0uY2hpbGRyZW4oKS5maXJzdCgpLmZpbmQoJ1thcmlhLWV4cGFuZGVkXScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL2NvbnNvbGUubG9nKCdoaWRkZW5wIGZhbHNlIGJyYW5jaCcpO1xuICAgICAgdGhpc1RvcE1lbnVpdGVtLmNoaWxkcmVuKCd1bC5zdWJtZW51JykuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpLmhpZGUoKTtcbiAgICAgIHRoaXNUb3BNZW51aXRlbS5jaGlsZHJlbigpLmZpcnN0KCkuZmluZCgnW2FyaWEtZXhwYW5kZWRdJykuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgIH1cbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgdmFyIGV4cGFuZGFibGVFbHRzID0gJChkb2N1bWVudCkuZmluZCgnI2hlYWRlciBbYXJpYS1leHBhbmRlZF0nKTtcbiAgZXhwYW5kYWJsZUVsdHMuY2xpY2soY2xpY2tUb3BNZW51aXRlbSk7XG5cbiAgZnVuY3Rpb24gaGlkZUFsbFRvcE1lbnVpdGVtcygpIHtcbiAgICAvL2NvbnNvbGUubG9nKCdkb2luZyBoaWRlQWxsVG9wTWVudWl0ZW1zJyk7XG4gICAgdmFyIHRvcFRpZXJVbCA9ICQoZG9jdW1lbnQpLmZpbmQoJyNoZWFkZXIgdWxbaWQ9dG9wVGllclVsXScpO1xuICAgIHRvcFRpZXJVbC5maW5kKCdbYXJpYS1leHBhbmRlZF0nKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgdG9wVGllclVsLmZpbmQoJ3VsLnN1Ym1lbnUnKS5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJykuaGlkZSgpO1xuICB9XG5cbiAgdmFyIG5vbmV4cGFuZGFibGVFbHRzID0gJChkb2N1bWVudCkuZmluZCgnI2hlYWRlciAudG9wVGllciA+IGRpdiA+IGJ1dHRvbjpub3QoW2FyaWEtZXhwYW5kZWRdKScpO1xuICBub25leHBhbmRhYmxlRWx0cy5jbGljayhoaWRlQWxsVG9wTWVudWl0ZW1zKTtcblxuICBmdW5jdGlvbiBzd2l0Y2hUb3BNZW51aXRlbShkZXN0VG9wTWVudWl0ZW0sIGRlc3RFbHQpIHtcbiAgICAvL2NvbnNvbGUubG9nKCdkb2luZyBzd2l0Y2hUb3BNZW51aXRlbScsIGRlc3RUb3BNZW51aXRlbSwgZGVzdEVsdCk7XG4gICAgLy9jb25zb2xlLmxvZygnZHRtaWw9JywgZGVzdFRvcE1lbnVpdGVtLmxlbmd0aCk7XG4gICAgaGlkZUFsbFRvcE1lbnVpdGVtcygpO1xuICAgIGlmIChkZXN0VG9wTWVudWl0ZW0gJiYgZGVzdFRvcE1lbnVpdGVtLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdmFyIGVsdCA9IGRlc3RUb3BNZW51aXRlbVswXTtcbiAgICAgIHZhciBlbHRJZCA9IGVsdC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgICBkZXN0VG9wTWVudWl0ZW0uY2hpbGRyZW4oJ3VsLnN1Ym1lbnUnKS5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpLnNob3coKTtcbiAgICAgIGRlc3RUb3BNZW51aXRlbS5jaGlsZHJlbigpLmZpcnN0KCkuZmluZCgnW2FyaWEtZXhwYW5kZWRdJykuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgfVxuICAgIGlmIChkZXN0RWx0KSB7XG4gICAgICAvL2Rlc3RFbHQuYXR0cigndGFiSW5kZXgnLCAnMCcpLmZvY3VzKCk7XG4gICAgICBkZXN0RWx0LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHNob3dpbmdIZWxwS2V5cyA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIHNob3dIZWxwS2V5cygpIHtcbiAgICBzaG93aW5nSGVscEtleXMgPSB0cnVlO1xuICAgICQoJyNoZWxwLWtleXMnKS5mYWRlSW4oMTAwKTtcbiAgICByZWNpdGVIZWxwKCk7XG4gIH1cblxuICBmb2N1c2FibGVFbHRzLmtleWRvd24oZnVuY3Rpb24gKGUpIHtcbiAgICAvL2NvbnNvbGUubG9nKCdmb2N1c2FibGUgZWx0IGtleWRvd24nLCBlKTtcbiAgICB2YXIga2MgPSBlLmtleUNvZGU7XG4gICAgLy8kKHRoaXMpLmJsdXIoKTsgLy8gRGVsZXRlP1xuICAgIHZhciB3aXRoaW5TZWNvbmRUaWVyVWwgPSB0cnVlO1xuICAgIHZhciB0b3BUaWVyVWwgPSAkKHRoaXMpLmNsb3Nlc3QoJ3VsW2lkPXRvcFRpZXJVbF0nKTtcbiAgICB2YXIgc2Vjb25kVGllclVsID0gJCh0aGlzKS5jbG9zZXN0KCd1bC5zdWJtZW51Jyk7XG4gICAgaWYgKHNlY29uZFRpZXJVbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHdpdGhpblNlY29uZFRpZXJVbCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoa2MgPT09IDI3KSB7XG4gICAgICAvL2NvbnNvbGUubG9nKCdlc2NhcGUgcHJlc3NlZCBpJylcbiAgICAgICQoJyNoZWxwLWtleXMnKS5mYWRlT3V0KDUwMCk7XG4gICAgfVxuICAgIGlmIChrYyA9PT0gMjcgJiYgd2l0aGluU2Vjb25kVGllclVsKSB7IC8vIGVzY2FwZVxuICAgICAgdmFyIGRlc3RUb3BNZW51aXRlbSA9ICQodGhpcykuY2xvc2VzdCgnbGkudG9wVGllcicpO1xuICAgICAgdmFyIHBvc3NFbHRzID0gZGVzdFRvcE1lbnVpdGVtLmZpbmQoJy5mb2N1c2FibGU6bm90KFtkaXNhYmxlZF0pJykuZmlsdGVyKCc6dmlzaWJsZScpO1xuICAgICAgc3dpdGNoVG9wTWVudWl0ZW0oZGVzdFRvcE1lbnVpdGVtLCBwb3NzRWx0cy5maXJzdCgpKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSBlbHNlIGlmIChrYyA9PT0gMzkpIHsgLy8gcmlnaHRhcnJvd1xuICAgICAgLy9jb25zb2xlLmxvZygncmlnaHRhcnJvdyBwcmVzc2VkJyk7XG4gICAgICB2YXIgc3JjVG9wTWVudWl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJ2xpLnRvcFRpZXInKTtcbiAgICAgIC8vY29uc29sZS5sb2coJ3NyY1RvcE1lbnVpdGVtPScsIHNyY1RvcE1lbnVpdGVtKTtcbiAgICAgIHNyY1RvcE1lbnVpdGVtLmNoaWxkcmVuKCkuZmlyc3QoKS5maW5kKCcuZm9jdXNhYmxlJykuYXR0cigndGFiSW5kZXgnLCAnLTEnKTtcbiAgICAgIHZhciB0b3BUaWVyTWVudWl0ZW1zID0gZ2V0VG9wVGllck1lbnVpdGVtcygpO1xuICAgICAgLy9jb25zb2xlLmxvZygndHRtaSogPScsIHRvcFRpZXJNZW51aXRlbXMpO1xuICAgICAgdmFyIHR0bWlOID0gdG9wVGllck1lbnVpdGVtcy5sZW5ndGg7XG4gICAgICB2YXIgaiA9IHRvcFRpZXJNZW51aXRlbXMuaW5kZXhPZihzcmNUb3BNZW51aXRlbVswXSk7XG4gICAgICAvL2NvbnNvbGUubG9nKCdqIGluaXRpYWw9Jywgaik7XG4gICAgICBmb3IgKHZhciBpID0gKGogKyAxKSAlIHR0bWlOOyBpICE9PSBqOyBpID0gKGkgKyAxKSAlIHR0bWlOKSB7XG4gICAgICAgIHZhciBkZXN0VG9wTWVudWl0ZW0gPSAkKHRvcFRpZXJNZW51aXRlbXNbaV0pO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdkZXN0VG9wTWVudWl0ZW0oYSk9JywgZGVzdFRvcE1lbnVpdGVtKTtcbiAgICAgICAgdmFyIHBvc3NFbHRzID0gZGVzdFRvcE1lbnVpdGVtLmZpbmQoJy5mb2N1c2FibGU6bm90KFtkaXNhYmxlZF0pJykuZmlsdGVyKCc6dmlzaWJsZScpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdwb3NzRWx0cz0nLCBwb3NzRWx0cylcbiAgICAgICAgaWYgKHBvc3NFbHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKCdmaW5hbCBpPScsIGkpO1xuICAgICAgICAgIC8vY29uc29sZS5sb2coJ2xhbmRpbmcgb24nLCBwb3NzRWx0cy5maXJzdCgpKTtcbiAgICAgICAgICBzd2l0Y2hUb3BNZW51aXRlbShkZXN0VG9wTWVudWl0ZW0sIHBvc3NFbHRzLmZpcnN0KCkpO1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGtjID09PSAzNykgeyAvLyBsZWZ0YXJyb3dcbiAgICAgIC8vY29uc29sZS5sb2coJ2xlZnRhcnJvdyBwcmVzc2VkJyk7XG4gICAgICB2YXIgc3JjVG9wTWVudWl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJ2xpLnRvcFRpZXInKTtcbiAgICAgIC8vY29uc29sZS5sb2coJ3NyY1RvcE1lbnVpdGVtPScsIHNyY1RvcE1lbnVpdGVtKTtcbiAgICAgIHNyY1RvcE1lbnVpdGVtLmNoaWxkcmVuKCkuZmlyc3QoKS5maW5kKCcuZm9jdXNhYmxlJykuYXR0cigndGFiSW5kZXgnLCAnLTEnKTtcbiAgICAgIHZhciB0b3BUaWVyTWVudWl0ZW1zID0gZ2V0VG9wVGllck1lbnVpdGVtcygpO1xuICAgICAgLy9jb25zb2xlLmxvZygndHRtaSogPScsIHRvcFRpZXJNZW51aXRlbXMpO1xuICAgICAgdmFyIHR0bWlOID0gdG9wVGllck1lbnVpdGVtcy5sZW5ndGg7XG4gICAgICB2YXIgaiA9IHRvcFRpZXJNZW51aXRlbXMuaW5kZXhPZihzcmNUb3BNZW51aXRlbVswXSk7XG4gICAgICAvL2NvbnNvbGUubG9nKCdqIGluaXRpYWw9Jywgaik7XG4gICAgICBmb3IgKHZhciBpID0gKGogKyB0dG1pTiAtIDEpICUgdHRtaU47IGkgIT09IGo7IGkgPSAoaSArIHR0bWlOIC0gMSkgJSB0dG1pTikge1xuICAgICAgICB2YXIgZGVzdFRvcE1lbnVpdGVtID0gJCh0b3BUaWVyTWVudWl0ZW1zW2ldKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZGVzdFRvcE1lbnVpdGVtKGIpPScsIGRlc3RUb3BNZW51aXRlbSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2k9JywgaSlcbiAgICAgICAgdmFyIHBvc3NFbHRzID0gZGVzdFRvcE1lbnVpdGVtLmZpbmQoJy5mb2N1c2FibGU6bm90KFtkaXNhYmxlZF0pJykuZmlsdGVyKCc6dmlzaWJsZScpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdwb3NzRWx0cz0nLCBwb3NzRWx0cylcbiAgICAgICAgaWYgKHBvc3NFbHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKCdmaW5hbCBpPScsIGkpO1xuICAgICAgICAgIC8vY29uc29sZS5sb2coJ2xhbmRpbmcgb24nLCBwb3NzRWx0cy5maXJzdCgpKTtcbiAgICAgICAgICBzd2l0Y2hUb3BNZW51aXRlbShkZXN0VG9wTWVudWl0ZW0sIHBvc3NFbHRzLmZpcnN0KCkpO1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGtjID09PSAzOCkgeyAvLyB1cGFycm93XG4gICAgICAvL2NvbnNvbGUubG9nKCd1cGFycm93IHByZXNzZWQnKTtcbiAgICAgIHZhciBzdWJtZW51O1xuICAgICAgaWYgKHdpdGhpblNlY29uZFRpZXJVbCkge1xuICAgICAgICB2YXIgbmVhclNpYnMgPSAkKHRoaXMpLmNsb3Nlc3QoJ2RpdicpLmZpbmQoJy5mb2N1c2FibGUnKS5maWx0ZXIoJzp2aXNpYmxlJyk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ25lYXJTaWJzPScsIG5lYXJTaWJzKTtcbiAgICAgICAgdmFyIG15SWQgPSAkKHRoaXMpWzBdLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnbXlJZD0nLCBteUlkKTtcbiAgICAgICAgc3VibWVudSA9ICQoW10pO1xuICAgICAgICB2YXIgdGhpc0VuY291bnRlcmVkID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGkgPSBuZWFyU2licy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmICh0aGlzRW5jb3VudGVyZWQpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2FkZGluZycsIG5lYXJTaWJzW2ldKTtcbiAgICAgICAgICAgIHN1Ym1lbnUgPSBzdWJtZW51LmFkZCgkKG5lYXJTaWJzW2ldKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChuZWFyU2lic1tpXS5nZXRBdHRyaWJ1dGUoJ2lkJykgPT09IG15SWQpIHtcbiAgICAgICAgICAgIHRoaXNFbmNvdW50ZXJlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3N1Ym1lbnUgc28gZmFyPScsIHN1Ym1lbnUpO1xuICAgICAgICB2YXIgZmFyU2licyA9ICQodGhpcykuY2xvc2VzdCgnbGknKS5wcmV2QWxsKCkuZmluZCgnZGl2Om5vdCguZGlzYWJsZWQpJylcbiAgICAgICAgICAuZmluZCgnLmZvY3VzYWJsZScpLmZpbHRlcignOnZpc2libGUnKTtcbiAgICAgICAgc3VibWVudSA9IHN1Ym1lbnUuYWRkKGZhclNpYnMpO1xuICAgICAgICBpZiAoc3VibWVudS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBzdWJtZW51ID0gJCh0aGlzKS5jbG9zZXN0KCdsaScpLmNsb3Nlc3QoJ3VsJykuZmluZCgnZGl2Om5vdCguZGlzYWJsZWQpJylcbiAgICAgICAgICAuZmluZCgnLmZvY3VzYWJsZScpLmZpbHRlcignOnZpc2libGUnKS5sYXN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN1Ym1lbnUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHN1Ym1lbnUubGFzdCgpLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLypcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKCdubyBhY3Rpb25hYmxlIHN1Ym1lbnUgZm91bmQnKVxuICAgICAgICAgIHZhciB0b3BtZW51SXRlbSA9ICQodGhpcykuY2xvc2VzdCgndWwuc3VibWVudScpLmNsb3Nlc3QoJ2xpJylcbiAgICAgICAgICAuY2hpbGRyZW4oKS5maXJzdCgpLmZpbmQoJy5mb2N1c2FibGU6bm90KFtkaXNhYmxlZF0pJykuZmlsdGVyKCc6dmlzaWJsZScpO1xuICAgICAgICAgIGlmICh0b3BtZW51SXRlbS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0b3BtZW51SXRlbS5maXJzdCgpLmZvY3VzKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ25vIGFjdGlvbmFibGUgdG9wbWVudWl0ZW0gZm91bmQgZWl0aGVyJylcbiAgICAgICAgICB9XG4gICAgICAgICAgKi9cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9IGVsc2UgaWYgKGtjID09PSA0MCkgeyAvLyBkb3duYXJyb3dcbiAgICAgIC8vY29uc29sZS5sb2coJ2Rvd25hcnJvdyBwcmVzc2VkJyk7XG4gICAgICB2YXIgc3VibWVudURpdnM7XG4gICAgICB2YXIgc3VibWVudTtcbiAgICAgIGlmICghd2l0aGluU2Vjb25kVGllclVsKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJzFzdCB0aWVyJylcbiAgICAgICAgc3VibWVudURpdnMgPSAkKHRoaXMpLmNsb3Nlc3QoJ2xpJykuY2hpbGRyZW4oJ3VsJykuZmluZCgnZGl2Om5vdCguZGlzYWJsZWQpJyk7XG4gICAgICAgIHN1Ym1lbnUgPSBzdWJtZW51RGl2cy5maW5kKCcuZm9jdXNhYmxlJykuZmlsdGVyKCc6dmlzaWJsZScpO1xuICAgICAgICBpbnNlcnRBcmlhUG9zKHN1Ym1lbnUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnMm5kIHRpZXInKVxuICAgICAgICB2YXIgbmVhclNpYnMgPSAkKHRoaXMpLmNsb3Nlc3QoJ2RpdicpLmZpbmQoJy5mb2N1c2FibGUnKS5maWx0ZXIoJzp2aXNpYmxlJyk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ25lYXJTaWJzPScsIG5lYXJTaWJzKTtcbiAgICAgICAgdmFyIG15SWQgPSAkKHRoaXMpWzBdLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnbXlJZD0nLCBteUlkKTtcbiAgICAgICAgc3VibWVudSA9ICQoW10pO1xuICAgICAgICB2YXIgdGhpc0VuY291bnRlcmVkID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVhclNpYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpc0VuY291bnRlcmVkKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdhZGRpbmcnLCBuZWFyU2lic1tpXSk7XG4gICAgICAgICAgICBzdWJtZW51ID0gc3VibWVudS5hZGQoJChuZWFyU2lic1tpXSkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAobmVhclNpYnNbaV0uZ2V0QXR0cmlidXRlKCdpZCcpID09PSBteUlkKSB7XG4gICAgICAgICAgICB0aGlzRW5jb3VudGVyZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKCdzdWJtZW51IHNvIGZhcj0nLCBzdWJtZW51KTtcbiAgICAgICAgdmFyIGZhclNpYnMgPSAkKHRoaXMpLmNsb3Nlc3QoJ2xpJykubmV4dEFsbCgpLmZpbmQoJ2Rpdjpub3QoLmRpc2FibGVkKScpXG4gICAgICAgICAgLmZpbmQoJy5mb2N1c2FibGUnKS5maWx0ZXIoJzp2aXNpYmxlJyk7XG4gICAgICAgIHN1Ym1lbnUgPSBzdWJtZW51LmFkZChmYXJTaWJzKTtcbiAgICAgICAgaWYgKHN1Ym1lbnUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgc3VibWVudSA9ICQodGhpcykuY2xvc2VzdCgnbGknKS5jbG9zZXN0KCd1bCcpLmZpbmQoJ2Rpdjpub3QoLmRpc2FibGVkKScpXG4gICAgICAgICAgICAuZmluZCgnLmZvY3VzYWJsZScpLmZpbHRlcignOnZpc2libGUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy9jb25zb2xlLmxvZygnc3VibWVudT0nLCBzdWJtZW51KVxuICAgICAgaWYgKHN1Ym1lbnUubGVuZ3RoID4gMCkge1xuICAgICAgICBzdWJtZW51LmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ25vIGFjdGlvbmFibGUgc3VibWVudSBmb3VuZCcpXG4gICAgICB9XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0gZWxzZSBpZiAoa2MgPT09IDI3KSB7XG4gICAgICAvL2NvbnNvbGUubG9nKCdlc2MgcHJlc3NlZCcpO1xuICAgICAgaGlkZUFsbFRvcE1lbnVpdGVtcygpO1xuICAgICAgaWYgKHNob3dpbmdIZWxwS2V5cykge1xuICAgICAgICBzaG93aW5nSGVscEtleXMgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2NhbGxpbmcgY3ljbGVGb2N1cyBpaScpXG4gICAgICAgIENQTy5jeWNsZUZvY3VzKCk7XG4gICAgICB9XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8kKHRoaXMpLmNsb3Nlc3QoJ25hdicpLmNsb3Nlc3QoJ21haW4nKS5mb2N1cygpO1xuICAgIH0gZWxzZSBpZiAoa2MgPT09IDkgKSB7XG4gICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICBoaWRlQWxsVG9wTWVudWl0ZW1zKCk7XG4gICAgICAgIENQTy5jeWNsZUZvY3VzKHRydWUpO1xuICAgICAgfVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2UgaWYgKGtjID09PSAxMyB8fCBrYyA9PT0gMTcgfHwga2MgPT09IDIwIHx8IGtjID09PSAzMikge1xuICAgICAgLy8gMTM9ZW50ZXIgMTc9Y3RybCAyMD1jYXBzbG9jayAzMj1zcGFjZVxuICAgICAgLy9jb25zb2xlLmxvZygnc3RvcHByb3AgMScpXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0gZWxzZSBpZiAoa2MgPj0gMTEyICYmIGtjIDw9IDEyMykge1xuICAgICAgLy9jb25zb2xlLmxvZygnZG9wcm9wIDEnKVxuICAgICAgLy8gZm4ga2V5c1xuICAgICAgLy8gZ28gYWhlYWQsIHByb3BhZ2F0ZVxuICAgIH0gZWxzZSBpZiAoZS5jdHJsS2V5ICYmIGtjID09PSAxOTEpIHtcbiAgICAgIC8vY29uc29sZS5sb2coJ0MtPyBwcmVzc2VkJylcbiAgICAgIHNob3dIZWxwS2V5cygpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9jb25zb2xlLmxvZygnc3RvcHByb3AgMicpXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICAvL2Uuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIC8vIHNoYXJlQVBJLm1ha2VIb3Zlck1lbnUoJChcIiNmaWxlbWVudVwiKSwgJChcIiNmaWxlbWVudUNvbnRlbnRzXCIpLCBmYWxzZSwgZnVuY3Rpb24oKXt9KTtcbiAgLy8gc2hhcmVBUEkubWFrZUhvdmVyTWVudSgkKFwiI2Jvbm5pZW1lbnVcIiksICQoXCIjYm9ubmllbWVudUNvbnRlbnRzXCIpLCBmYWxzZSwgZnVuY3Rpb24oKXt9KTtcblxuXG4gIHZhciBjb2RlQ29udGFpbmVyID0gJChcIjxkaXY+XCIpLmFkZENsYXNzKFwicmVwbE1haW5cIik7XG4gIGNvZGVDb250YWluZXIuYXR0cihcInJvbGVcIiwgXCJyZWdpb25cIikuXG4gICAgYXR0cihcImFyaWEtbGFiZWxcIiwgXCJEZWZpbml0aW9uc1wiKTtcbiAgICAvL2F0dHIoXCJ0YWJJbmRleFwiLCBcIi0xXCIpO1xuICAkKFwiI21haW5cIikucHJlcGVuZChjb2RlQ29udGFpbmVyKTtcblxuICBDUE8uZWRpdG9yID0gQ1BPLm1ha2VFZGl0b3IoY29kZUNvbnRhaW5lciwge1xuICAgIHJ1bkJ1dHRvbjogJChcIiNydW5CdXR0b25cIiksXG4gICAgc2ltcGxlRWRpdG9yOiBmYWxzZSxcbiAgICBydW46IENQTy5SVU5fQ09ERSxcbiAgICBpbml0aWFsR2FzOiAxMDBcbiAgfSk7XG4gIENQTy5lZGl0b3IuY20uc2V0T3B0aW9uKFwicmVhZE9ubHlcIiwgXCJub2N1cnNvclwiKTtcbiAgQ1BPLmVkaXRvci5jbS5zZXRPcHRpb24oXCJsb25nTGluZXNcIiwgbmV3IE1hcCgpKTtcbiAgZnVuY3Rpb24gcmVtb3ZlU2hvcnRlbmVkTGluZShsaW5lSGFuZGxlKSB7XG4gICAgdmFyIHJ1bGVycyA9IENQTy5lZGl0b3IuY20uZ2V0T3B0aW9uKFwicnVsZXJzXCIpO1xuICAgIHZhciBydWxlcnNNaW5Db2wgPSBDUE8uZWRpdG9yLmNtLmdldE9wdGlvbihcInJ1bGVyc01pbkNvbFwiKTtcbiAgICB2YXIgbG9uZ0xpbmVzID0gQ1BPLmVkaXRvci5jbS5nZXRPcHRpb24oXCJsb25nTGluZXNcIik7XG4gICAgaWYgKGxpbmVIYW5kbGUudGV4dC5sZW5ndGggPD0gcnVsZXJzTWluQ29sKSB7XG4gICAgICBsaW5lSGFuZGxlLnJ1bGVyTGlzdGVuZXJzLmZvckVhY2goKGYsIGV2dCkgPT4gbGluZUhhbmRsZS5vZmYoZXZ0LCBmKSk7XG4gICAgICBsb25nTGluZXMuZGVsZXRlKGxpbmVIYW5kbGUpO1xuICAgICAgLy8gY29uc29sZS5sb2coXCJSZW1vdmVkIFwiLCBsaW5lSGFuZGxlKTtcbiAgICAgIHJlZnJlc2hSdWxlcnMoKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZGVsZXRlTGluZShsaW5lSGFuZGxlKSB7XG4gICAgdmFyIGxvbmdMaW5lcyA9IENQTy5lZGl0b3IuY20uZ2V0T3B0aW9uKFwibG9uZ0xpbmVzXCIpO1xuICAgIGxpbmVIYW5kbGUucnVsZXJMaXN0ZW5lcnMuZm9yRWFjaCgoZiwgZXZ0KSA9PiBsaW5lSGFuZGxlLm9mZihldnQsIGYpKTtcbiAgICBsb25nTGluZXMuZGVsZXRlKGxpbmVIYW5kbGUpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiUmVtb3ZlZCBcIiwgbGluZUhhbmRsZSk7XG4gICAgcmVmcmVzaFJ1bGVycygpO1xuICB9XG4gIGZ1bmN0aW9uIHJlZnJlc2hSdWxlcnMoKSB7XG4gICAgdmFyIHJ1bGVycyA9IENQTy5lZGl0b3IuY20uZ2V0T3B0aW9uKFwicnVsZXJzXCIpO1xuICAgIHZhciBsb25nTGluZXMgPSBDUE8uZWRpdG9yLmNtLmdldE9wdGlvbihcImxvbmdMaW5lc1wiKTtcbiAgICB2YXIgbWluTGVuZ3RoO1xuICAgIGlmIChsb25nTGluZXMuc2l6ZSA9PT0gMCkge1xuICAgICAgbWluTGVuZ3RoID0gMDsgLy8gaWYgdGhlcmUgYXJlIG5vIGxvbmcgbGluZXMsIHRoZW4gd2UgZG9uJ3QgY2FyZSBhYm91dCBzaG93aW5nIGFueSBydWxlcnNcbiAgICB9IGVsc2Uge1xuICAgICAgbWluTGVuZ3RoID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgIGxvbmdMaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmVObywgbGluZUhhbmRsZSkge1xuICAgICAgICBpZiAobGluZUhhbmRsZS50ZXh0Lmxlbmd0aCA8IG1pbkxlbmd0aCkgeyBtaW5MZW5ndGggPSBsaW5lSGFuZGxlLnRleHQubGVuZ3RoOyB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBydWxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChydWxlcnNbaV0uY29sdW1uID49IG1pbkxlbmd0aCkge1xuICAgICAgICBydWxlcnNbaV0uY2xhc3NOYW1lID0gXCJoaWRkZW5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJ1bGVyc1tpXS5jbGFzc05hbWUgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGdvdHRhIHNldCB0aGUgb3B0aW9uIHR3aWNlLCBvciBlbHNlIENNIHNob3J0LWNpcmN1aXRzIGFuZCBpZ25vcmVzIGl0XG4gICAgQ1BPLmVkaXRvci5jbS5zZXRPcHRpb24oXCJydWxlcnNcIiwgdW5kZWZpbmVkKTtcbiAgICBDUE8uZWRpdG9yLmNtLnNldE9wdGlvbihcInJ1bGVyc1wiLCBydWxlcnMpO1xuICB9XG4gIENQTy5lZGl0b3IuY20ub24oJ2NoYW5nZXMnLCBmdW5jdGlvbihpbnN0YW5jZSwgY2hhbmdlT2Jqcykge1xuICAgIHZhciBtaW5MaW5lID0gaW5zdGFuY2UubGFzdExpbmUoKSwgbWF4TGluZSA9IDA7XG4gICAgdmFyIHJ1bGVyc01pbkNvbCA9IGluc3RhbmNlLmdldE9wdGlvbihcInJ1bGVyc01pbkNvbFwiKTtcbiAgICB2YXIgbG9uZ0xpbmVzID0gaW5zdGFuY2UuZ2V0T3B0aW9uKFwibG9uZ0xpbmVzXCIpO1xuICAgIGNoYW5nZU9ianMuZm9yRWFjaChmdW5jdGlvbihjaGFuZ2UpIHtcbiAgICAgIGlmIChtaW5MaW5lID4gY2hhbmdlLmZyb20ubGluZSkgeyBtaW5MaW5lID0gY2hhbmdlLmZyb20ubGluZTsgfVxuICAgICAgaWYgKG1heExpbmUgPCBjaGFuZ2UuZnJvbS5saW5lICsgY2hhbmdlLnRleHQubGVuZ3RoKSB7IG1heExpbmUgPSBjaGFuZ2UuZnJvbS5saW5lICsgY2hhbmdlLnRleHQubGVuZ3RoOyB9XG4gICAgfSk7XG4gICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICBpbnN0YW5jZS5lYWNoTGluZShtaW5MaW5lLCBtYXhMaW5lLCBmdW5jdGlvbihsaW5lSGFuZGxlKSB7XG4gICAgICBpZiAobGluZUhhbmRsZS50ZXh0Lmxlbmd0aCA+IHJ1bGVyc01pbkNvbCkge1xuICAgICAgICBpZiAoIWxvbmdMaW5lcy5oYXMobGluZUhhbmRsZSkpIHtcbiAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICBsb25nTGluZXMuc2V0KGxpbmVIYW5kbGUsIGxpbmVIYW5kbGUubGluZU5vKCkpO1xuICAgICAgICAgIGxpbmVIYW5kbGUucnVsZXJMaXN0ZW5lcnMgPSBuZXcgTWFwKFtcbiAgICAgICAgICAgIFtcImNoYW5nZVwiLCByZW1vdmVTaG9ydGVuZWRMaW5lXSxcbiAgICAgICAgICAgIFtcImRlbGV0ZVwiLCBmdW5jdGlvbigpIHsgLy8gbmVlZGVkIGJlY2F1c2UgdGhlIGRlbGV0ZSBoYW5kbGVyIGdldHMgbm8gYXJndW1lbnRzIGF0IGFsbFxuICAgICAgICAgICAgICBkZWxldGVMaW5lKGxpbmVIYW5kbGUpO1xuICAgICAgICAgICAgfV1cbiAgICAgICAgICBdKTtcbiAgICAgICAgICBsaW5lSGFuZGxlLnJ1bGVyTGlzdGVuZXJzLmZvckVhY2goKGYsIGV2dCkgPT4gbGluZUhhbmRsZS5vbihldnQsIGYpKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFkZGVkIFwiLCBsaW5lSGFuZGxlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGxvbmdMaW5lcy5oYXMobGluZUhhbmRsZSkpIHtcbiAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICBsb25nTGluZXMuZGVsZXRlKGxpbmVIYW5kbGUpO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUmVtb3ZlZCBcIiwgbGluZUhhbmRsZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgcmVmcmVzaFJ1bGVycygpO1xuICAgIH1cbiAgfSk7XG5cbiAgcHJvZ3JhbUxvYWRlZC50aGVuKGZ1bmN0aW9uKGMpIHtcbiAgICBDUE8uZG9jdW1lbnRzLnNldChcImRlZmluaXRpb25zOi8vXCIsIENQTy5lZGl0b3IuY20uZ2V0RG9jKCkpO1xuXG4gICAgLy8gTk9URShqb2UpOiBDbGVhcmluZyBoaXN0b3J5IHRvIGFkZHJlc3MgaHR0cHM6Ly9naXRodWIuY29tL2Jyb3ducGx0L3B5cmV0LWxhbmcvaXNzdWVzLzM4NixcbiAgICAvLyBpbiB3aGljaCB1bmRvIGNhbiByZXZlcnQgdGhlIHByb2dyYW0gYmFjayB0byBlbXB0eVxuICAgIENQTy5lZGl0b3IuY20uY2xlYXJIaXN0b3J5KCk7XG4gICAgQ1BPLmVkaXRvci5jbS5zZXRWYWx1ZShjKTtcbiAgfSk7XG5cbiAgcHJvZ3JhbUxvYWRlZC5mYWlsKGZ1bmN0aW9uKCkge1xuICAgIENQTy5kb2N1bWVudHMuc2V0KFwiZGVmaW5pdGlvbnM6Ly9cIiwgQ1BPLmVkaXRvci5jbS5nZXREb2MoKSk7XG4gIH0pO1xuXG4gIHZhciBweXJldExvYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgY29uc29sZS5sb2cocHJvY2Vzcy5lbnYuUFlSRVQpO1xuICBweXJldExvYWQuc3JjID0gcHJvY2Vzcy5lbnYuUFlSRVQ7XG4gIHB5cmV0TG9hZC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChweXJldExvYWQpO1xuXG4gIHZhciBweXJldExvYWQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgZnVuY3Rpb24gbG9nRmFpbHVyZUFuZE1hbnVhbEZldGNoKHVybCwgZSkge1xuXG4gICAgLy8gTk9URShqb2UpOiBUaGUgZXJyb3IgcmVwb3J0ZWQgYnkgdGhlIFwiZXJyb3JcIiBldmVudCBoYXMgZXNzZW50aWFsbHkgbm9cbiAgICAvLyBpbmZvcm1hdGlvbiBvbiBpdDsgaXQncyBqdXN0IGEgbm90aWZpY2F0aW9uIHRoYXQgX3NvbWV0aGluZ18gd2VudCB3cm9uZy5cbiAgICAvLyBTbywgd2UgbG9nIHRoYXQgc29tZXRoaW5nIGhhcHBlbmVkLCB0aGVuIGltbWVkaWF0ZWx5IGRvIGFuIEFKQVggcmVxdWVzdFxuICAgIC8vIGNhbGwgZm9yIHRoZSBzYW1lIFVSTCwgdG8gc2VlIGlmIHdlIGNhbiBnZXQgbW9yZSBpbmZvcm1hdGlvbi4gVGhpc1xuICAgIC8vIGRvZXNuJ3QgcGVyZmVjdGx5IHRlbGwgdXMgYWJvdXQgdGhlIG9yaWdpbmFsIGZhaWx1cmUsIGJ1dCBpdCdzXG4gICAgLy8gc29tZXRoaW5nLlxuXG4gICAgLy8gSW4gYWRkaXRpb24sIGlmIHNvbWVvbmUgaXMgc2VlaW5nIHRoZSBQeXJldCBmYWlsZWQgdG8gbG9hZCBlcnJvciwgYnV0IHdlXG4gICAgLy8gZG9uJ3QgZ2V0IHRoZXNlIGxvZ2dpbmcgZXZlbnRzLCB3ZSBoYXZlIGEgc3Ryb25nIGhpbnQgdGhhdCBzb21ldGhpbmcgaXNcbiAgICAvLyB1cCB3aXRoIHRoZWlyIG5ldHdvcmsuXG4gICAgbG9nZ2VyLmxvZygncHlyZXQtbG9hZC1mYWlsdXJlJyxcbiAgICAgIHtcbiAgICAgICAgZXZlbnQgOiAnaW5pdGlhbC1mYWlsdXJlJyxcbiAgICAgICAgdXJsIDogdXJsLFxuXG4gICAgICAgIC8vIFRoZSB0aW1lc3RhbXAgYXBwZWFycyB0byBjb3VudCBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgcGFnZSBsb2FkLFxuICAgICAgICAvLyB3aGljaCBtYXkgYXBwcm94aW1hdGUgZG93bmxvYWQgdGltZSBpZiwgc2F5LCByZXF1ZXN0cyBhcmUgdGltaW5nIG91dFxuICAgICAgICAvLyBvciBnZXR0aW5nIGN1dCBvZmYuXG5cbiAgICAgICAgdGltZVN0YW1wIDogZS50aW1lU3RhbXBcbiAgICAgIH0pO1xuXG4gICAgdmFyIG1hbnVhbEZldGNoID0gJC5hamF4KHVybCk7XG4gICAgbWFudWFsRmV0Y2gudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIC8vIEhlcmUsIHdlIGxvZyB0aGUgZmlyc3QgMTAwIGNoYXJhY3RlcnMgb2YgdGhlIHJlc3BvbnNlIHRvIG1ha2Ugc3VyZVxuICAgICAgLy8gdGhleSByZXNlbWJsZSB0aGUgUHlyZXQgYmxvYlxuICAgICAgbG9nZ2VyLmxvZygncHlyZXQtbG9hZC1mYWlsdXJlJywge1xuICAgICAgICBldmVudCA6ICdzdWNjZXNzLXdpdGgtYWpheCcsXG4gICAgICAgIGNvbnRlbnRzUHJlZml4IDogcmVzLnNsaWNlKDAsIDEwMClcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIG1hbnVhbEZldGNoLmZhaWwoZnVuY3Rpb24ocmVzKSB7XG4gICAgICBsb2dnZXIubG9nKCdweXJldC1sb2FkLWZhaWx1cmUnLCB7XG4gICAgICAgIGV2ZW50IDogJ2ZhaWx1cmUtd2l0aC1hamF4JyxcbiAgICAgICAgc3RhdHVzOiByZXMuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXMuc3RhdHVzVGV4dCxcbiAgICAgICAgLy8gU2luY2UgcmVzcG9uc2VUZXh0IGNvdWxkIGJlIGEgbG9uZyBlcnJvciBwYWdlLCBhbmQgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBsb2cgaHVnZSBwYWdlcywgd2Ugc2xpY2UgaXQgdG8gMTAwIGNoYXJhY3RlcnMsIHdoaWNoIGlzIGVub3VnaCB0b1xuICAgICAgICAvLyB0ZWxsIHVzIHdoYXQncyBnb2luZyBvbiAoZS5nLiBBV1MgZmFpbHVyZSwgbmV0d29yayBvdXRhZ2UpLlxuICAgICAgICByZXNwb25zZVRleHQ6IHJlcy5yZXNwb25zZVRleHQuc2xpY2UoMCwgMTAwKVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAkKHB5cmV0TG9hZCkub24oXCJlcnJvclwiLCBmdW5jdGlvbihlKSB7XG4gICAgbG9nRmFpbHVyZUFuZE1hbnVhbEZldGNoKHByb2Nlc3MuZW52LlBZUkVULCBlKTtcbiAgICBjb25zb2xlLmxvZyhwcm9jZXNzLmVudik7XG4gICAgcHlyZXRMb2FkMi5zcmMgPSBwcm9jZXNzLmVudi5QWVJFVF9CQUNLVVA7XG4gICAgcHlyZXRMb2FkMi50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHB5cmV0TG9hZDIpO1xuICB9KTtcblxuICAkKHB5cmV0TG9hZDIpLm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24oZSkge1xuICAgICQoXCIjbG9hZGVyXCIpLmhpZGUoKTtcbiAgICAkKFwiI3J1blBhcnRcIikuaGlkZSgpO1xuICAgICQoXCIjYnJlYWtCdXR0b25cIikuaGlkZSgpO1xuICAgIHdpbmRvdy5zdGlja0Vycm9yKFwiUHlyZXQgZmFpbGVkIHRvIGxvYWQ7IGNoZWNrIHlvdXIgY29ubmVjdGlvbiBvciB0cnkgcmVmcmVzaGluZyB0aGUgcGFnZS4gIElmIHRoaXMgaGFwcGVucyByZXBlYXRlZGx5LCBwbGVhc2UgcmVwb3J0IGl0IGFzIGEgYnVnLlwiKTtcbiAgICBsb2dGYWlsdXJlQW5kTWFudWFsRmV0Y2gocHJvY2Vzcy5lbnYuUFlSRVRfQkFDS1VQLCBlKTtcblxuICB9KTtcblxuICBwcm9ncmFtTG9hZGVkLmZpbihmdW5jdGlvbigpIHtcbiAgICBDUE8uZWRpdG9yLmZvY3VzKCk7XG4gICAgQ1BPLmVkaXRvci5jbS5zZXRPcHRpb24oXCJyZWFkT25seVwiLCBmYWxzZSk7XG4gIH0pO1xuXG4gIENQTy5hdXRvU2F2ZSA9IGF1dG9TYXZlO1xuICBDUE8uc2F2ZSA9IHNhdmU7XG4gIENQTy51cGRhdGVOYW1lID0gdXBkYXRlTmFtZTtcbiAgQ1BPLnNob3dTaGFyZUNvbnRhaW5lciA9IHNob3dTaGFyZUNvbnRhaW5lcjtcbiAgQ1BPLmxvYWRQcm9ncmFtID0gbG9hZFByb2dyYW07XG4gIENQTy5jeWNsZUZvY3VzID0gY3ljbGVGb2N1cztcbiAgQ1BPLnNheSA9IHNheTtcbiAgQ1BPLnNheUFuZEZvcmdldCA9IHNheUFuZEZvcmdldDtcblxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvd2ViL2pzL2JlZm9yZVB5cmV0LmpzIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBDb3B5cmlnaHQgMjAxMy0yMDE0IEtldmluIENveFxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiogIFRoaXMgc29mdHdhcmUgaXMgcHJvdmlkZWQgJ2FzLWlzJywgd2l0aG91dCBhbnkgZXhwcmVzcyBvciBpbXBsaWVkICAgICAgICAgICAqXG4qICB3YXJyYW50eS4gSW4gbm8gZXZlbnQgd2lsbCB0aGUgYXV0aG9ycyBiZSBoZWxkIGxpYWJsZSBmb3IgYW55IGRhbWFnZXMgICAgICAgKlxuKiAgYXJpc2luZyBmcm9tIHRoZSB1c2Ugb2YgdGhpcyBzb2Z0d2FyZS4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4qICBQZXJtaXNzaW9uIGlzIGdyYW50ZWQgdG8gYW55b25lIHRvIHVzZSB0aGlzIHNvZnR3YXJlIGZvciBhbnkgcHVycG9zZSwgICAgICAgKlxuKiAgaW5jbHVkaW5nIGNvbW1lcmNpYWwgYXBwbGljYXRpb25zLCBhbmQgdG8gYWx0ZXIgaXQgYW5kIHJlZGlzdHJpYnV0ZSBpdCAgICAgICpcbiogIGZyZWVseSwgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIHJlc3RyaWN0aW9uczogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuKiAgMS4gVGhlIG9yaWdpbiBvZiB0aGlzIHNvZnR3YXJlIG11c3Qgbm90IGJlIG1pc3JlcHJlc2VudGVkOyB5b3UgbXVzdCBub3QgICAgICpcbiogICAgIGNsYWltIHRoYXQgeW91IHdyb3RlIHRoZSBvcmlnaW5hbCBzb2Z0d2FyZS4gSWYgeW91IHVzZSB0aGlzIHNvZnR3YXJlIGluICAqXG4qICAgICBhIHByb2R1Y3QsIGFuIGFja25vd2xlZGdtZW50IGluIHRoZSBwcm9kdWN0IGRvY3VtZW50YXRpb24gd291bGQgYmUgICAgICAgKlxuKiAgICAgYXBwcmVjaWF0ZWQgYnV0IGlzIG5vdCByZXF1aXJlZC4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4qICAyLiBBbHRlcmVkIHNvdXJjZSB2ZXJzaW9ucyBtdXN0IGJlIHBsYWlubHkgbWFya2VkIGFzIHN1Y2gsIGFuZCBtdXN0IG5vdCBiZSAgKlxuKiAgICAgbWlzcmVwcmVzZW50ZWQgYXMgYmVpbmcgdGhlIG9yaWdpbmFsIHNvZnR3YXJlLiAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4qICAzLiBUaGlzIG5vdGljZSBtYXkgbm90IGJlIHJlbW92ZWQgb3IgYWx0ZXJlZCBmcm9tIGFueSBzb3VyY2UgZGlzdHJpYnV0aW9uLiAgKlxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbitmdW5jdGlvbigpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhcnJheSA9IC9cXFsoW15cXFtdKilcXF0kLztcblxuLy8vIFVSTCBSZWdleC5cbi8qKlxuICogVGhpcyByZWdleCBzcGxpdHMgdGhlIFVSTCBpbnRvIHBhcnRzLiAgVGhlIGNhcHR1cmUgZ3JvdXBzIGNhdGNoIHRoZSBpbXBvcnRhbnRcbiAqIGJpdHMuXG4gKiBcbiAqIEVhY2ggc2VjdGlvbiBpcyBvcHRpb25hbCwgc28gdG8gd29yayBvbiBhbnkgcGFydCBmaW5kIHRoZSBjb3JyZWN0IHRvcCBsZXZlbFxuICogYCguLi4pP2AgYW5kIG1lc3MgYXJvdW5kIHdpdGggaXQuXG4gKi9cbnZhciByZWdleCA9IC9eKD86KFthLXpdKik6KT8oPzpcXC9cXC8pPyg/OihbXjpAXSopKD86OihbXkBdKikpP0ApPyhbYS16LS5fXSspPyg/OjooWzAtOV0qKSk/KFxcL1tePyNdKik/KD86XFw/KFteI10qKSk/KD86IyguKikpPyQvaTtcbi8vICAgICAgICAgICAgICAgMSAtIHNjaGVtZSAgICAgICAgICAgICAgICAyIC0gdXNlciAgICAzID0gcGFzcyA0IC0gaG9zdCAgICAgICAgNSAtIHBvcnQgIDYgLSBwYXRoICAgICAgICA3IC0gcXVlcnkgICAgOCAtIGhhc2hcblxudmFyIG5vc2xhc2ggPSBbXCJtYWlsdG9cIixcImJpdGNvaW5cIl07XG5cbnZhciBzZWxmID0ge1xuXHQvKiogUGFyc2UgYSBxdWVyeSBzdHJpbmcuXG5cdCAqXG5cdCAqIFRoaXMgZnVuY3Rpb24gcGFyc2VzIGEgcXVlcnkgc3RyaW5nIChzb21ldGltZXMgY2FsbGVkIHRoZSBzZWFyY2hcblx0ICogc3RyaW5nKS4gIEl0IHRha2VzIGEgcXVlcnkgc3RyaW5nIGFuZCByZXR1cm5zIGEgbWFwIG9mIHRoZSByZXN1bHRzLlxuXHQgKlxuXHQgKiBLZXlzIGFyZSBjb25zaWRlcmVkIHRvIGJlIGV2ZXJ5dGhpbmcgdXAgdG8gdGhlIGZpcnN0ICc9JyBhbmQgdmFsdWVzIGFyZVxuXHQgKiBldmVyeXRoaW5nIGFmdGVyd29yZHMuICBTaW5jZSBVUkwtZGVjb2RpbmcgaXMgZG9uZSBhZnRlciBwYXJzaW5nLCBrZXlzXG5cdCAqIGFuZCB2YWx1ZXMgY2FuIGhhdmUgYW55IHZhbHVlcywgaG93ZXZlciwgJz0nIGhhdmUgdG8gYmUgZW5jb2RlZCBpbiBrZXlzXG5cdCAqIHdoaWxlICc/JyBhbmQgJyYnIGhhdmUgdG8gYmUgZW5jb2RlZCBhbnl3aGVyZSAoYXMgdGhleSBkZWxpbWl0IHRoZVxuXHQgKiBrdi1wYWlycykuXG5cdCAqXG5cdCAqIEtleXMgYW5kIHZhbHVlcyB3aWxsIGFsd2F5cyBiZSBzdHJpbmdzLCBleGNlcHQgaWYgdGhlcmUgaXMgYSBrZXkgd2l0aCBub1xuXHQgKiAnPScgaW4gd2hpY2ggY2FzZSBpdCB3aWxsIGJlIGNvbnNpZGVyZWQgYSBmbGFnIGFuZCB3aWxsIGJlIHNldCB0byB0cnVlLlxuXHQgKiBMYXRlciB2YWx1ZXMgd2lsbCBvdmVycmlkZSBlYXJsaWVyIHZhbHVlcy5cblx0ICpcblx0ICogQXJyYXkga2V5cyBhcmUgYWxzbyBzdXBwb3J0ZWQuICBCeSBkZWZhdWx0IGtleXMgaW4gdGhlIGZvcm0gb2YgYG5hbWVbaV1gXG5cdCAqIHdpbGwgYmUgcmV0dXJuZWQgbGlrZSB0aGF0IGFzIHN0cmluZ3MuICBIb3dldmVyLCBpZiB5b3Ugc2V0IHRoZSBgYXJyYXlgXG5cdCAqIGZsYWcgaW4gdGhlIG9wdGlvbnMgb2JqZWN0IHRoZXkgd2lsbCBiZSBwYXJzZWQgaW50byBhcnJheXMuICBOb3RlIHRoYXRcblx0ICogYWx0aG91Z2ggdGhlIG9iamVjdCByZXR1cm5lZCBpcyBhbiBgQXJyYXlgIG9iamVjdCBhbGwga2V5cyB3aWxsIGJlXG5cdCAqIHdyaXR0ZW4gdG8gaXQuICBUaGlzIG1lYW5zIHRoYXQgaWYgeW91IGhhdmUgYSBrZXkgc3VjaCBhcyBga1tmb3JFYWNoXWBcblx0ICogaXQgd2lsbCBvdmVyd3JpdGUgdGhlIGBmb3JFYWNoYCBmdW5jdGlvbiBvbiB0aGF0IGFycmF5LiAgQWxzbyBub3RlIHRoYXRcblx0ICogc3RyaW5nIHByb3BlcnRpZXMgYWx3YXlzIHRha2UgcHJlY2VkZW5jZSBvdmVyIGFycmF5IHByb3BlcnRpZXMsXG5cdCAqIGlycmVzcGVjdGl2ZSBvZiB3aGVyZSB0aGV5IGFyZSBpbiB0aGUgcXVlcnkgc3RyaW5nLlxuXHQgKlxuXHQgKiAgIHVybC5nZXQoXCJhcnJheVsxXT10ZXN0JmFycmF5W2Zvb109YmFyXCIse2FycmF5OnRydWV9KS5hcnJheVsxXSAgPT09IFwidGVzdFwiXG5cdCAqICAgdXJsLmdldChcImFycmF5WzFdPXRlc3QmYXJyYXlbZm9vXT1iYXJcIix7YXJyYXk6dHJ1ZX0pLmFycmF5LmZvbyA9PT0gXCJiYXJcIlxuXHQgKiAgIHVybC5nZXQoXCJhcnJheT1ub3RhbmFycmF5JmFycmF5WzBdPTFcIix7YXJyYXk6dHJ1ZX0pLmFycmF5ICAgICAgPT09IFwibm90YW5hcnJheVwiXG5cdCAqXG5cdCAqIElmIGFycmF5IHBhcnNpbmcgaXMgZW5hYmxlZCBrZXlzIGluIHRoZSBmb3JtIG9mIGBuYW1lW11gIHdpbGxcblx0ICogYXV0b21hdGljYWxseSBiZSBnaXZlbiB0aGUgbmV4dCBhdmFpbGFibGUgaW5kZXguICBOb3RlIHRoYXQgdGhpcyBjYW4gYmVcblx0ICogb3ZlcndyaXR0ZW4gd2l0aCBsYXRlciB2YWx1ZXMgaW4gdGhlIHF1ZXJ5IHN0cmluZy4gIEZvciB0aGlzIHJlYXNvbiBpc1xuXHQgKiBpcyBiZXN0IG5vdCB0byBtaXggdGhlIHR3byBmb3JtYXRzLCBhbHRob3VnaCBpdCBpcyBzYWZlIChhbmQgb2Z0ZW5cblx0ICogdXNlZnVsKSB0byBhZGQgYW4gYXV0b21hdGljIGluZGV4IGFyZ3VtZW50IHRvIHRoZSBlbmQgb2YgYSBxdWVyeSBzdHJpbmcuXG5cdCAqXG5cdCAqICAgdXJsLmdldChcImFbXT0wJmFbXT0xJmFbMF09MlwiLCB7YXJyYXk6dHJ1ZX0pICAtPiB7YTpbXCIyXCIsXCIxXCJdfTtcblx0ICogICB1cmwuZ2V0KFwiYVswXT0wJmFbMV09MSZhW109MlwiLCB7YXJyYXk6dHJ1ZX0pIC0+IHthOltcIjBcIixcIjFcIixcIjJcIl19O1xuXHQgKlxuXHQgKiBAcGFyYW17c3RyaW5nfSBxIFRoZSBxdWVyeSBzdHJpbmcgKHRoZSBwYXJ0IGFmdGVyIHRoZSAnPycpLlxuXHQgKiBAcGFyYW17e2Z1bGw6Ym9vbGVhbixhcnJheTpib29sZWFufT19IG9wdCBPcHRpb25zLlxuXHQgKlxuXHQgKiAtIGZ1bGw6IElmIHNldCBgcWAgd2lsbCBiZSB0cmVhdGVkIGFzIGEgZnVsbCB1cmwgYW5kIGBxYCB3aWxsIGJlIGJ1aWx0LlxuXHQgKiAgIGJ5IGNhbGxpbmcgI3BhcnNlIHRvIHJldHJpZXZlIHRoZSBxdWVyeSBwb3J0aW9uLlxuXHQgKiAtIGFycmF5OiBJZiBzZXQga2V5cyBpbiB0aGUgZm9ybSBvZiBga2V5W2ldYCB3aWxsIGJlIHRyZWF0ZWRcblx0ICogICBhcyBhcnJheXMvbWFwcy5cblx0ICpcblx0ICogQHJldHVybnshT2JqZWN0LjxzdHJpbmcsIHN0cmluZ3xBcnJheT59IFRoZSBwYXJzZWQgcmVzdWx0LlxuXHQgKi9cblx0XCJnZXRcIjogZnVuY3Rpb24ocSwgb3B0KXtcblx0XHRxID0gcSB8fCBcIlwiO1xuXHRcdGlmICggdHlwZW9mIG9wdCAgICAgICAgICA9PSBcInVuZGVmaW5lZFwiICkgb3B0ID0ge307XG5cdFx0aWYgKCB0eXBlb2Ygb3B0W1wiZnVsbFwiXSAgPT0gXCJ1bmRlZmluZWRcIiApIG9wdFtcImZ1bGxcIl0gPSBmYWxzZTtcblx0XHRpZiAoIHR5cGVvZiBvcHRbXCJhcnJheVwiXSA9PSBcInVuZGVmaW5lZFwiICkgb3B0W1wiYXJyYXlcIl0gPSBmYWxzZTtcblx0XHRcblx0XHRpZiAoIG9wdFtcImZ1bGxcIl0gPT09IHRydWUgKVxuXHRcdHtcblx0XHRcdHEgPSBzZWxmW1wicGFyc2VcIl0ocSwge1wiZ2V0XCI6ZmFsc2V9KVtcInF1ZXJ5XCJdIHx8IFwiXCI7XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBvID0ge307XG5cdFx0XG5cdFx0dmFyIGMgPSBxLnNwbGl0KFwiJlwiKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGMubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0aWYgKCFjW2ldLmxlbmd0aCkgY29udGludWU7XG5cdFx0XHRcblx0XHRcdHZhciBkID0gY1tpXS5pbmRleE9mKFwiPVwiKTtcblx0XHRcdHZhciBrID0gY1tpXSwgdiA9IHRydWU7XG5cdFx0XHRpZiAoIGQgPj0gMCApXG5cdFx0XHR7XG5cdFx0XHRcdGsgPSBjW2ldLnN1YnN0cigwLCBkKTtcblx0XHRcdFx0diA9IGNbaV0uc3Vic3RyKGQrMSk7XG5cdFx0XHRcdFxuXHRcdFx0XHR2ID0gZGVjb2RlVVJJQ29tcG9uZW50KHYpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZiAob3B0W1wiYXJyYXlcIl0pXG5cdFx0XHR7XG5cdFx0XHRcdHZhciBpbmRzID0gW107XG5cdFx0XHRcdHZhciBpbmQ7XG5cdFx0XHRcdHZhciBjdXJvID0gbztcblx0XHRcdFx0dmFyIGN1cmsgPSBrO1xuXHRcdFx0XHR3aGlsZSAoaW5kID0gY3Vyay5tYXRjaChhcnJheSkpIC8vIEFycmF5IVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y3VyayA9IGN1cmsuc3Vic3RyKDAsIGluZC5pbmRleCk7XG5cdFx0XHRcdFx0aW5kcy51bnNoaWZ0KGRlY29kZVVSSUNvbXBvbmVudChpbmRbMV0pKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjdXJrID0gZGVjb2RlVVJJQ29tcG9uZW50KGN1cmspO1xuXHRcdFx0XHRpZiAoaW5kcy5zb21lKGZ1bmN0aW9uKGkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAoIHR5cGVvZiBjdXJvW2N1cmtdID09IFwidW5kZWZpbmVkXCIgKSBjdXJvW2N1cmtdID0gW107XG5cdFx0XHRcdFx0aWYgKCFBcnJheS5pc0FycmF5KGN1cm9bY3Vya10pKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coXCJ1cmwuZ2V0OiBBcnJheSBwcm9wZXJ0eSBcIitjdXJrK1wiIGFscmVhZHkgZXhpc3RzIGFzIHN0cmluZyFcIik7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Y3VybyA9IGN1cm9bY3Vya107XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYgKCBpID09PSBcIlwiICkgaSA9IGN1cm8ubGVuZ3RoO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGN1cmsgPSBpO1xuXHRcdFx0XHR9KSkgY29udGludWU7XG5cdFx0XHRcdGN1cm9bY3Vya10gPSB2O1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0ayA9IGRlY29kZVVSSUNvbXBvbmVudChrKTtcblx0XHRcdFxuXHRcdFx0Ly90eXBlb2Ygb1trXSA9PSBcInVuZGVmaW5lZFwiIHx8IGNvbnNvbGUubG9nKFwiUHJvcGVydHkgXCIraytcIiBhbHJlYWR5IGV4aXN0cyFcIik7XG5cdFx0XHRvW2tdID0gdjtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIG87XG5cdH0sXG5cdFxuXHQvKiogQnVpbGQgYSBnZXQgcXVlcnkgZnJvbSBhbiBvYmplY3QuXG5cdCAqXG5cdCAqIFRoaXMgY29uc3RydWN0cyBhIHF1ZXJ5IHN0cmluZyBmcm9tIHRoZSBrdiBwYWlycyBpbiBgZGF0YWAuICBDYWxsaW5nXG5cdCAqICNnZXQgb24gdGhlIHN0cmluZyByZXR1cm5lZCBzaG91bGQgcmV0dXJuIGFuIG9iamVjdCBpZGVudGljYWwgdG8gdGhlIG9uZVxuXHQgKiBwYXNzZWQgaW4gZXhjZXB0IGFsbCBub24tYm9vbGVhbiBzY2FsYXIgdHlwZXMgYmVjb21lIHN0cmluZ3MgYW5kIGFsbFxuXHQgKiBvYmplY3QgdHlwZXMgYmVjb21lIGFycmF5cyAobm9uLWludGVnZXIga2V5cyBhcmUgc3RpbGwgcHJlc2VudCwgc2VlXG5cdCAqICNnZXQncyBkb2N1bWVudGF0aW9uIGZvciBtb3JlIGRldGFpbHMpLlxuXHQgKlxuXHQgKiBUaGlzIGFsd2F5cyB1c2VzIGFycmF5IHN5bnRheCBmb3IgZGVzY3JpYmluZyBhcnJheXMuICBJZiB5b3Ugd2FudCB0b1xuXHQgKiBzZXJpYWxpemUgdGhlbSBkaWZmZXJlbnRseSAobGlrZSBoYXZpbmcgdGhlIHZhbHVlIGJlIGEgSlNPTiBhcnJheSBhbmRcblx0ICogaGF2ZSBhIHBsYWluIGtleSkgeW91IHdpbGwgbmVlZCB0byBkbyB0aGF0IGJlZm9yZSBwYXNzaW5nIGl0IGluLlxuXHQgKlxuXHQgKiBBbGwga2V5cyBhbmQgdmFsdWVzIGFyZSBzdXBwb3J0ZWQgKGJpbmFyeSBkYXRhIGFueW9uZT8pIGFzIHRoZXkgYXJlXG5cdCAqIHByb3Blcmx5IFVSTC1lbmNvZGVkIGFuZCAjZ2V0IHByb3Blcmx5IGRlY29kZXMuXG5cdCAqXG5cdCAqIEBwYXJhbXtPYmplY3R9IGRhdGEgVGhlIGt2IHBhaXJzLlxuXHQgKiBAcGFyYW17c3RyaW5nfSBwcmVmaXggVGhlIHByb3Blcmx5IGVuY29kZWQgYXJyYXkga2V5IHRvIHB1dCB0aGVcblx0ICogICBwcm9wZXJ0aWVzLiAgTWFpbmx5IGludGVuZGVkIGZvciBpbnRlcm5hbCB1c2UuXG5cdCAqIEByZXR1cm57c3RyaW5nfSBBIFVSTC1zYWZlIHN0cmluZy5cblx0ICovXG5cdFwiYnVpbGRnZXRcIjogZnVuY3Rpb24oZGF0YSwgcHJlZml4KXtcblx0XHR2YXIgaXRtcyA9IFtdO1xuXHRcdGZvciAoIHZhciBrIGluIGRhdGEgKVxuXHRcdHtcblx0XHRcdHZhciBlayA9IGVuY29kZVVSSUNvbXBvbmVudChrKTtcblx0XHRcdGlmICggdHlwZW9mIHByZWZpeCAhPSBcInVuZGVmaW5lZFwiIClcblx0XHRcdFx0ZWsgPSBwcmVmaXgrXCJbXCIrZWsrXCJdXCI7XG5cdFx0XHRcblx0XHRcdHZhciB2ID0gZGF0YVtrXTtcblx0XHRcdFxuXHRcdFx0c3dpdGNoICh0eXBlb2Ygdilcblx0XHRcdHtcblx0XHRcdFx0Y2FzZSAnYm9vbGVhbic6XG5cdFx0XHRcdFx0aWYodikgaXRtcy5wdXNoKGVrKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnbnVtYmVyJzpcblx0XHRcdFx0XHR2ID0gdi50b1N0cmluZygpO1xuXHRcdFx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0XHRcdGl0bXMucHVzaChlaytcIj1cIitlbmNvZGVVUklDb21wb25lbnQodikpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdGl0bXMucHVzaChzZWxmW1wiYnVpbGRnZXRcIl0odiwgZWspKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGl0bXMuam9pbihcIiZcIik7XG5cdH0sXG5cdFxuXHQvKiogUGFyc2UgYSBVUkxcblx0ICogXG5cdCAqIFRoaXMgYnJlYWtzIHVwIGEgVVJMIGludG8gY29tcG9uZW50cy4gIEl0IGF0dGVtcHRzIHRvIGJlIHZlcnkgbGliZXJhbFxuXHQgKiBhbmQgcmV0dXJucyB0aGUgYmVzdCByZXN1bHQgaW4gbW9zdCBjYXNlcy4gIFRoaXMgbWVhbnMgdGhhdCB5b3UgY2FuXG5cdCAqIG9mdGVuIHBhc3MgaW4gcGFydCBvZiBhIFVSTCBhbmQgZ2V0IGNvcnJlY3QgY2F0ZWdvcmllcyBiYWNrLiAgTm90YWJseSxcblx0ICogdGhpcyB3b3JrcyBmb3IgZW1haWxzIGFuZCBKYWJiZXIgSURzLCBhcyB3ZWxsIGFzIGFkZGluZyBhICc/JyB0byB0aGVcblx0ICogYmVnaW5uaW5nIG9mIGEgc3RyaW5nIHdpbGwgcGFyc2UgdGhlIHdob2xlIHRoaW5nIGFzIGEgcXVlcnkgc3RyaW5nLiAgSWZcblx0ICogYW4gaXRlbSBpcyBub3QgZm91bmQgdGhlIHByb3BlcnR5IHdpbGwgYmUgdW5kZWZpbmVkLiAgSW4gc29tZSBjYXNlcyBhblxuXHQgKiBlbXB0eSBzdHJpbmcgd2lsbCBiZSByZXR1cm5lZCBpZiB0aGUgc3Vycm91bmRpbmcgc3ludGF4IGJ1dCB0aGUgYWN0dWFsXG5cdCAqIHZhbHVlIGlzIGVtcHR5IChleGFtcGxlOiBcIjovL2V4YW1wbGUuY29tXCIgd2lsbCBnaXZlIGEgZW1wdHkgc3RyaW5nIGZvclxuXHQgKiBzY2hlbWUuKSAgTm90YWJseSB0aGUgaG9zdCBuYW1lIHdpbGwgYWx3YXlzIGJlIHNldCB0byBzb21ldGhpbmcuXG5cdCAqIFxuXHQgKiBSZXR1cm5lZCBwcm9wZXJ0aWVzLlxuXHQgKiBcblx0ICogLSAqKnNjaGVtZToqKiBUaGUgdXJsIHNjaGVtZS4gKGV4OiBcIm1haWx0b1wiIG9yIFwiaHR0cHNcIilcblx0ICogLSAqKnVzZXI6KiogVGhlIHVzZXJuYW1lLlxuXHQgKiAtICoqcGFzczoqKiBUaGUgcGFzc3dvcmQuXG5cdCAqIC0gKipob3N0OioqIFRoZSBob3N0bmFtZS4gKGV4OiBcImxvY2FsaG9zdFwiLCBcIjEyMy40NTYuNy44XCIgb3IgXCJleGFtcGxlLmNvbVwiKVxuXHQgKiAtICoqcG9ydDoqKiBUaGUgcG9ydCwgYXMgYSBudW1iZXIuIChleDogMTMzNylcblx0ICogLSAqKnBhdGg6KiogVGhlIHBhdGguIChleDogXCIvXCIgb3IgXCIvYWJvdXQuaHRtbFwiKVxuXHQgKiAtICoqcXVlcnk6KiogXCJUaGUgcXVlcnkgc3RyaW5nLiAoZXg6IFwiZm9vPWJhciZ2PTE3JmZvcm1hdD1qc29uXCIpXG5cdCAqIC0gKipnZXQ6KiogVGhlIHF1ZXJ5IHN0cmluZyBwYXJzZWQgd2l0aCBnZXQuICBJZiBgb3B0LmdldGAgaXMgYGZhbHNlYCB0aGlzXG5cdCAqICAgd2lsbCBiZSBhYnNlbnRcblx0ICogLSAqKmhhc2g6KiogVGhlIHZhbHVlIGFmdGVyIHRoZSBoYXNoLiAoZXg6IFwibXlhbmNob3JcIilcblx0ICogICBiZSB1bmRlZmluZWQgZXZlbiBpZiBgcXVlcnlgIGlzIHNldC5cblx0ICpcblx0ICogQHBhcmFte3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gcGFyc2UuXG5cdCAqIEBwYXJhbXt7Z2V0Ok9iamVjdH09fSBvcHQgT3B0aW9uczpcblx0ICpcblx0ICogLSBnZXQ6IEFuIG9wdGlvbnMgYXJndW1lbnQgdG8gYmUgcGFzc2VkIHRvICNnZXQgb3IgZmFsc2UgdG8gbm90IGNhbGwgI2dldC5cblx0ICogICAgKipETyBOT1QqKiBzZXQgYGZ1bGxgLlxuXHQgKlxuXHQgKiBAcmV0dXJueyFPYmplY3R9IEFuIG9iamVjdCB3aXRoIHRoZSBwYXJzZWQgdmFsdWVzLlxuXHQgKi9cblx0XCJwYXJzZVwiOiBmdW5jdGlvbih1cmwsIG9wdCkge1xuXHRcdFxuXHRcdGlmICggdHlwZW9mIG9wdCA9PSBcInVuZGVmaW5lZFwiICkgb3B0ID0ge307XG5cdFx0XG5cdFx0dmFyIG1kID0gdXJsLm1hdGNoKHJlZ2V4KSB8fCBbXTtcblx0XHRcblx0XHR2YXIgciA9IHtcblx0XHRcdFwidXJsXCI6ICAgIHVybCxcblx0XHRcdFxuXHRcdFx0XCJzY2hlbWVcIjogbWRbMV0sXG5cdFx0XHRcInVzZXJcIjogICBtZFsyXSxcblx0XHRcdFwicGFzc1wiOiAgIG1kWzNdLFxuXHRcdFx0XCJob3N0XCI6ICAgbWRbNF0sXG5cdFx0XHRcInBvcnRcIjogICBtZFs1XSAmJiArbWRbNV0sXG5cdFx0XHRcInBhdGhcIjogICBtZFs2XSxcblx0XHRcdFwicXVlcnlcIjogIG1kWzddLFxuXHRcdFx0XCJoYXNoXCI6ICAgbWRbOF0sXG5cdFx0fTtcblx0XHRcblx0XHRpZiAoIG9wdC5nZXQgIT09IGZhbHNlIClcblx0XHRcdHJbXCJnZXRcIl0gPSByW1wicXVlcnlcIl0gJiYgc2VsZltcImdldFwiXShyW1wicXVlcnlcIl0sIG9wdC5nZXQpO1xuXHRcdFxuXHRcdHJldHVybiByO1xuXHR9LFxuXHRcblx0LyoqIEJ1aWxkIGEgVVJMIGZyb20gY29tcG9uZW50cy5cblx0ICogXG5cdCAqIFRoaXMgcGllY2VzIHRvZ2V0aGVyIGEgdXJsIGZyb20gdGhlIHByb3BlcnRpZXMgb2YgdGhlIHBhc3NlZCBpbiBvYmplY3QuXG5cdCAqIEluIGdlbmVyYWwgcGFzc2luZyB0aGUgcmVzdWx0IG9mIGBwYXJzZSgpYCBzaG91bGQgcmV0dXJuIHRoZSBVUkwuICBUaGVyZVxuXHQgKiBtYXkgZGlmZmVyZW5jZXMgaW4gdGhlIGdldCBzdHJpbmcgYXMgdGhlIGtleXMgYW5kIHZhbHVlcyBtaWdodCBiZSBtb3JlXG5cdCAqIGVuY29kZWQgdGhlbiB0aGV5IHdlcmUgb3JpZ2luYWxseSB3ZXJlLiAgSG93ZXZlciwgY2FsbGluZyBgZ2V0KClgIG9uIHRoZVxuXHQgKiB0d28gdmFsdWVzIHNob3VsZCB5aWVsZCB0aGUgc2FtZSByZXN1bHQuXG5cdCAqIFxuXHQgKiBIZXJlIGlzIGhvdyB0aGUgcGFyYW1ldGVycyBhcmUgdXNlZC5cblx0ICogXG5cdCAqICAtIHVybDogVXNlZCBvbmx5IGlmIG5vIG90aGVyIHZhbHVlcyBhcmUgcHJvdmlkZWQuICBJZiB0aGF0IGlzIHRoZSBjYXNlXG5cdCAqICAgICBgdXJsYCB3aWxsIGJlIHJldHVybmVkIHZlcmJhdGltLlxuXHQgKiAgLSBzY2hlbWU6IFVzZWQgaWYgZGVmaW5lZC5cblx0ICogIC0gdXNlcjogVXNlZCBpZiBkZWZpbmVkLlxuXHQgKiAgLSBwYXNzOiBVc2VkIGlmIGRlZmluZWQuXG5cdCAqICAtIGhvc3Q6IFVzZWQgaWYgZGVmaW5lZC5cblx0ICogIC0gcGF0aDogVXNlZCBpZiBkZWZpbmVkLlxuXHQgKiAgLSBxdWVyeTogVXNlZCBvbmx5IGlmIGBnZXRgIGlzIG5vdCBwcm92aWRlZCBhbmQgbm9uLWVtcHR5LlxuXHQgKiAgLSBnZXQ6IFVzZWQgaWYgbm9uLWVtcHR5LiAgUGFzc2VkIHRvICNidWlsZGdldCBhbmQgdGhlIHJlc3VsdCBpcyB1c2VkXG5cdCAqICAgIGFzIHRoZSBxdWVyeSBzdHJpbmcuXG5cdCAqICAtIGhhc2g6IFVzZWQgaWYgZGVmaW5lZC5cblx0ICogXG5cdCAqIFRoZXNlIGFyZSB0aGUgb3B0aW9ucyB0aGF0IGFyZSB2YWxpZCBvbiB0aGUgb3B0aW9ucyBvYmplY3QuXG5cdCAqIFxuXHQgKiAgLSB1c2VlbXB0eWdldDogSWYgdHJ1dGh5LCBhIHF1ZXN0aW9uIG1hcmsgd2lsbCBiZSBhcHBlbmRlZCBmb3IgZW1wdHkgZ2V0XG5cdCAqICAgIHN0cmluZ3MuICBUaGlzIG5vdGFibHkgbWFrZXMgYGJ1aWxkKClgIGFuZCBgcGFyc2UoKWAgZnVsbHkgc3ltbWV0cmljLlxuXHQgKlxuXHQgKiBAcGFyYW17T2JqZWN0fSBkYXRhIFRoZSBwaWVjZXMgb2YgdGhlIFVSTC5cblx0ICogQHBhcmFte09iamVjdH0gb3B0IE9wdGlvbnMgZm9yIGJ1aWxkaW5nIHRoZSB1cmwuXG5cdCAqIEByZXR1cm57c3RyaW5nfSBUaGUgVVJMLlxuXHQgKi9cblx0XCJidWlsZFwiOiBmdW5jdGlvbihkYXRhLCBvcHQpe1xuXHRcdG9wdCA9IG9wdCB8fCB7fTtcblx0XHRcblx0XHR2YXIgciA9IFwiXCI7XG5cdFx0XG5cdFx0aWYgKCB0eXBlb2YgZGF0YVtcInNjaGVtZVwiXSAhPSBcInVuZGVmaW5lZFwiIClcblx0XHR7XG5cdFx0XHRyICs9IGRhdGFbXCJzY2hlbWVcIl07XG5cdFx0XHRyICs9IChub3NsYXNoLmluZGV4T2YoZGF0YVtcInNjaGVtZVwiXSk+PTApP1wiOlwiOlwiOi8vXCI7XG5cdFx0fVxuXHRcdGlmICggdHlwZW9mIGRhdGFbXCJ1c2VyXCJdICE9IFwidW5kZWZpbmVkXCIgKVxuXHRcdHtcblx0XHRcdHIgKz0gZGF0YVtcInVzZXJcIl07XG5cdFx0XHRpZiAoIHR5cGVvZiBkYXRhW1wicGFzc1wiXSA9PSBcInVuZGVmaW5lZFwiIClcblx0XHRcdHtcblx0XHRcdFx0ciArPSBcIkBcIjtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCB0eXBlb2YgZGF0YVtcInBhc3NcIl0gIT0gXCJ1bmRlZmluZWRcIiApIHIgKz0gXCI6XCIgKyBkYXRhW1wicGFzc1wiXSArIFwiQFwiO1xuXHRcdGlmICggdHlwZW9mIGRhdGFbXCJob3N0XCJdICE9IFwidW5kZWZpbmVkXCIgKSByICs9IGRhdGFbXCJob3N0XCJdO1xuXHRcdGlmICggdHlwZW9mIGRhdGFbXCJwb3J0XCJdICE9IFwidW5kZWZpbmVkXCIgKSByICs9IFwiOlwiICsgZGF0YVtcInBvcnRcIl07XG5cdFx0aWYgKCB0eXBlb2YgZGF0YVtcInBhdGhcIl0gIT0gXCJ1bmRlZmluZWRcIiApIHIgKz0gZGF0YVtcInBhdGhcIl07XG5cdFx0XG5cdFx0aWYgKG9wdFtcInVzZWVtcHR5Z2V0XCJdKVxuXHRcdHtcblx0XHRcdGlmICAgICAgKCB0eXBlb2YgZGF0YVtcImdldFwiXSAgICE9IFwidW5kZWZpbmVkXCIgKSByICs9IFwiP1wiICsgc2VsZltcImJ1aWxkZ2V0XCJdKGRhdGFbXCJnZXRcIl0pO1xuXHRcdFx0ZWxzZSBpZiAoIHR5cGVvZiBkYXRhW1wicXVlcnlcIl0gIT0gXCJ1bmRlZmluZWRcIiApIHIgKz0gXCI/XCIgKyBkYXRhW1wicXVlcnlcIl07XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQvLyBJZiAuZ2V0IHVzZSBpdC4gIElmIC5nZXQgbGVhZHMgdG8gZW1wdHksIHVzZSAucXVlcnkuXG5cdFx0XHR2YXIgcSA9IGRhdGFbXCJnZXRcIl0gJiYgc2VsZltcImJ1aWxkZ2V0XCJdKGRhdGFbXCJnZXRcIl0pIHx8IGRhdGFbXCJxdWVyeVwiXTtcblx0XHRcdGlmIChxKSByICs9IFwiP1wiICsgcTtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKCB0eXBlb2YgZGF0YVtcImhhc2hcIl0gIT0gXCJ1bmRlZmluZWRcIiApIHIgKz0gXCIjXCIgKyBkYXRhW1wiaGFzaFwiXTtcblx0XHRcblx0XHRyZXR1cm4gciB8fCBkYXRhW1widXJsXCJdIHx8IFwiXCI7XG5cdH0sXG59O1xuXG5pZiAoIHR5cGVvZiBkZWZpbmUgIT0gXCJ1bmRlZmluZWRcIiAmJiBkZWZpbmVbXCJhbWRcIl0gKSBkZWZpbmUoc2VsZik7XG5lbHNlIGlmICggdHlwZW9mIG1vZHVsZSAhPSBcInVuZGVmaW5lZFwiICkgbW9kdWxlWydleHBvcnRzJ10gPSBzZWxmO1xuZWxzZSB3aW5kb3dbXCJ1cmxcIl0gPSBzZWxmO1xuXG59KCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdXJsLmpzL3VybC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJkZWZpbmUgY2Fubm90IGJlIHVzZWQgaW5kaXJlY3RcIik7IH07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2FtZC1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBNb2R1bGUgZm9yIG1hbmFnaW5nIG1vZGFsIHByb21wdCBpbnN0YW5jZXMuXG4gKiBOT1RFOiBUaGlzIG1vZHVsZSBpcyBjdXJyZW50bHkgbGltaXRlZCBpbiBhIG51bWJlclxuICogICAgICAgb2Ygd2F5cy4gRm9yIG9uZSwgaXQgb25seSBhbGxvd3MgcmFkaW9cbiAqICAgICAgIGlucHV0IG9wdGlvbnMuIEFkZGl0aW9uYWxseSwgaXQgaGFyZC1jb2RlcyBpblxuICogICAgICAgYSBudW1iZXIgb2Ygb3RoZXIgYmVoYXZpb3JzIHdoaWNoIGFyZSBzcGVjaWZpY1xuICogICAgICAgdG8gdGhlIGltYWdlIGltcG9ydCBzdHlsZSBwcm9tcHQgKGZvciB3aGljaFxuICogICAgICAgdGhpcyBtb2R1bGUgd2FzIHdyaXR0ZW4pLlxuICogICAgICAgSWYgZGVzaXJlZCwgdGhpcyBtb2R1bGUgbWF5IGJlIG1hZGUgbW9yZVxuICogICAgICAgZ2VuZXJhbC1wdXJwb3NlIGluIHRoZSBmdXR1cmUsIGJ1dCwgZm9yIG5vdyxcbiAqICAgICAgIGJlIGF3YXJlIG9mIHRoZXNlIGxpbWl0YXRpb25zLlxuICovXG5kZWZpbmUoXCJjcG8vbW9kYWwtcHJvbXB0XCIsIFtcInFcIl0sIGZ1bmN0aW9uKFEpIHtcblxuICBmdW5jdGlvbiBhdXRvSGlnaGxpZ2h0Qm94KHRleHQpIHtcbiAgICB2YXIgdGV4dEJveCA9ICQoXCI8aW5wdXQgdHlwZT0ndGV4dCc+XCIpLmFkZENsYXNzKFwiYXV0by1oaWdobGlnaHRcIik7XG4gICAgdGV4dEJveC5hdHRyKFwic2l6ZVwiLCB0ZXh0Lmxlbmd0aCk7XG4gICAgdGV4dEJveC5hdHRyKFwiZWRpdGFibGVcIiwgZmFsc2UpO1xuICAgIHRleHRCb3gub24oXCJmb2N1c1wiLCBmdW5jdGlvbigpIHsgJCh0aGlzKS5zZWxlY3QoKTsgfSk7XG4gICAgdGV4dEJveC5vbihcIm1vdXNldXBcIiwgZnVuY3Rpb24oKSB7ICQodGhpcykuc2VsZWN0KCk7IH0pO1xuICAgIHRleHRCb3gudmFsKHRleHQpO1xuICAgIHJldHVybiB0ZXh0Qm94O1xuICB9XG5cbiAgLy8gQWxsb3dzIGFzeW5jaHJvbm91cyByZXF1ZXN0aW5nIG9mIHByb21wdHNcbiAgdmFyIHByb21wdFF1ZXVlID0gUSgpO1xuICB2YXIgc3R5bGVzID0gW1xuICAgIFwicmFkaW9cIiwgXCJ0aWxlc1wiLCBcInRleHRcIiwgXCJjb3B5VGV4dFwiLCBcImNvbmZpcm1cIlxuICBdO1xuXG4gIHdpbmRvdy5tb2RhbHMgPSBbXTtcblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhbiBvcHRpb24gdG8gcHJlc2VudCB0aGUgdXNlclxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBNb2RhbE9wdGlvblxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBtZXNzYWdlIHRvIHNob3cgdGhlIHVzZXIgd2hpY2hcbiAgICAgICAgICAgICAgIGRlc2NyaWJlcyB0aGlzIG9wdGlvblxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gdmFsdWUgLSBUaGUgdmFsdWUgdG8gcmV0dXJuIGlmIHRoaXMgb3B0aW9uIGlzIGNob3NlblxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gW2V4YW1wbGVdIC0gQSBjb2RlIHNuaXBwZXQgdG8gc2hvdyB3aXRoIHRoaXMgb3B0aW9uXG4gICAqL1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgbW9kYWwgcHJvbXB0cy5cbiAgICogQHBhcmFtIHtNb2RhbE9wdGlvbltdfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgdG8gcHJlc2VudCB0aGUgdXNlclxuICAgKi9cbiAgZnVuY3Rpb24gUHJvbXB0KG9wdGlvbnMpIHtcbiAgICB3aW5kb3cubW9kYWxzLnB1c2godGhpcyk7XG4gICAgaWYgKCFvcHRpb25zIHx8XG4gICAgICAgIChzdHlsZXMuaW5kZXhPZihvcHRpb25zLnN0eWxlKSA9PT0gLTEpIHx8XG4gICAgICAgICFvcHRpb25zLm9wdGlvbnMgfHxcbiAgICAgICAgKHR5cGVvZiBvcHRpb25zLm9wdGlvbnMubGVuZ3RoICE9PSBcIm51bWJlclwiKSB8fCAob3B0aW9ucy5vcHRpb25zLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgUHJvbXB0IE9wdGlvbnNcIiwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5tb2RhbCA9ICQoXCIjcHJvbXB0TW9kYWxcIik7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdHlsZSA9PT0gXCJyYWRpb1wiKSB7XG4gICAgICB0aGlzLmVsdHMgPSAkKCQucGFyc2VIVE1MKFwiPHRhYmxlPjwvdGFibGU+XCIpKS5hZGRDbGFzcyhcImNob2ljZUNvbnRhaW5lclwiKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5zdHlsZSA9PT0gXCJ0ZXh0XCIpIHtcbiAgICAgIHRoaXMuZWx0cyA9ICQoXCI8ZGl2PlwiKS5hZGRDbGFzcyhcImNob2ljZUNvbnRhaW5lclwiKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5zdHlsZSA9PT0gXCJjb3B5VGV4dFwiKSB7XG4gICAgICB0aGlzLmVsdHMgPSAkKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJjaG9pY2VDb250YWluZXJcIik7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuc3R5bGUgPT09IFwiY29uZmlybVwiKSB7XG4gICAgICB0aGlzLmVsdHMgPSAkKFwiPGRpdj5cIikuYWRkQ2xhc3MoXCJjaG9pY2VDb250YWluZXJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWx0cyA9ICQoJC5wYXJzZUhUTUwoXCI8ZGl2PjwvZGl2PlwiKSkuYWRkQ2xhc3MoXCJjaG9pY2VDb250YWluZXJcIik7XG4gICAgfVxuICAgIHRoaXMudGl0bGUgPSAkKFwiLm1vZGFsLWhlYWRlciA+IGgzXCIsIHRoaXMubW9kYWwpO1xuICAgIHRoaXMuY2xvc2VCdXR0b24gPSAkKFwiLmNsb3NlXCIsIHRoaXMubW9kYWwpO1xuICAgIHRoaXMuc3VibWl0QnV0dG9uID0gJChcIi5zdWJtaXRcIiwgdGhpcy5tb2RhbCk7XG4gICAgaWYodGhpcy5vcHRpb25zLnN1Ym1pdFRleHQpIHtcbiAgICAgIHRoaXMuc3VibWl0QnV0dG9uLnRleHQodGhpcy5vcHRpb25zLnN1Ym1pdFRleHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuc3VibWl0QnV0dG9uLnRleHQoXCJTdWJtaXRcIik7XG4gICAgfVxuICAgIHRoaXMuaXNDb21waWxlZCA9IGZhbHNlO1xuICAgIHRoaXMuZGVmZXJyZWQgPSBRLmRlZmVyKCk7XG4gICAgdGhpcy5wcm9taXNlID0gdGhpcy5kZWZlcnJlZC5wcm9taXNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFR5cGUgZm9yIGhhbmRsZXJzIG9mIHJlc3BvbnNlcyBmcm9tIG1vZGFsIHByb21wdHNcbiAgICogQGNhbGxiYWNrIHByb21wdENhbGxiYWNrXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZXNwIC0gVGhlIHJlc3BvbnNlIGZyb20gdGhlIHVzZXJcbiAgICovXG5cbiAgLyoqXG4gICAqIFNob3dzIHRoaXMgcHJvbXB0IHRvIHRoZSB1c2VyICh3aWxsIHdhaXQgdW50aWwgYW55IGFjdGl2ZVxuICAgKiBwcm9tcHRzIGhhdmUgZmluaXNoZWQpXG4gICAqIEBwYXJhbSB7cHJvbXB0Q2FsbGJhY2t9IFtjYWxsYmFja10gLSBPcHRpb25hbCBjYWxsYmFjayB3aGljaCBpcyBwYXNzZWQgdGhlXG4gICAqICAgICAgICByZXN1bHQgb2YgdGhlIHByb21wdFxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgcmVzb2x2aW5nIHRvIGVpdGhlciB0aGUgcmVzdWx0IG9mIGBjYWxsYmFja2AsIGlmIHByb3ZpZGVkLFxuICAgKiAgICAgICAgICBvciB0aGUgcmVzdWx0IG9mIHRoZSBwcm9tcHQsIG90aGVyd2lzZS5cbiAgICovXG4gIFByb21wdC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgLy8gVXNlIHRoZSBwcm9taXNlIHF1ZXVlIHRvIG1ha2Ugc3VyZSB0aGVyZSdzIG5vIG90aGVyXG4gICAgLy8gcHJvbXB0IGJlaW5nIHNob3duIGN1cnJlbnRseVxuICAgIGlmICh0aGlzLm9wdGlvbnMuaGlkZVN1Ym1pdCkge1xuICAgICAgdGhpcy5zdWJtaXRCdXR0b24uaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN1Ym1pdEJ1dHRvbi5zaG93KCk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VCdXR0b24uY2xpY2sodGhpcy5vbkNsb3NlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc3VibWl0QnV0dG9uLmNsaWNrKHRoaXMub25TdWJtaXQuYmluZCh0aGlzKSk7XG4gICAgdmFyIGRvY0NsaWNrID0gKGZ1bmN0aW9uKGUpIHtcbiAgICAgIC8vIElmIHRoZSBwcm9tcHQgaXMgYWN0aXZlIGFuZCB0aGUgYmFja2dyb3VuZCBpcyBjbGlja2VkLFxuICAgICAgLy8gdGhlbiBjbG9zZS5cbiAgICAgIGlmICgkKGUudGFyZ2V0KS5pcyh0aGlzLm1vZGFsKSAmJiB0aGlzLmRlZmVycmVkKSB7XG4gICAgICAgIHRoaXMub25DbG9zZShlKTtcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKFwiY2xpY2tcIiwgZG9jQ2xpY2spO1xuICAgICAgfVxuICAgIH0pLmJpbmQodGhpcyk7XG4gICAgJChkb2N1bWVudCkuY2xpY2soZG9jQ2xpY2spO1xuICAgIHZhciBkb2NLZXlkb3duID0gKGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICB0aGlzLm9uQ2xvc2UoZSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9mZihcImtleWRvd25cIiwgZG9jS2V5ZG93bik7XG4gICAgICB9XG4gICAgfSkuYmluZCh0aGlzKTtcbiAgICAkKGRvY3VtZW50KS5rZXlkb3duKGRvY0tleWRvd24pO1xuICAgIHRoaXMudGl0bGUudGV4dCh0aGlzLm9wdGlvbnMudGl0bGUpO1xuICAgIHRoaXMucG9wdWxhdGVNb2RhbCgpO1xuICAgIHRoaXMubW9kYWwuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiB0aGlzLnByb21pc2UudGhlbihjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnByb21pc2U7XG4gICAgfVxuICB9O1xuXG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgY29udGVudHMgb2YgdGhlIG1vZGFsIHByb21wdC5cbiAgICovXG4gIFByb21wdC5wcm90b3R5cGUuY2xlYXJNb2RhbCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3VibWl0QnV0dG9uLm9mZigpO1xuICAgIHRoaXMuY2xvc2VCdXR0b24ub2ZmKCk7XG4gICAgdGhpcy5lbHRzLmVtcHR5KCk7XG4gIH07XG4gIFxuICAvKipcbiAgICogUG9wdWxhdGVzIHRoZSBjb250ZW50cyBvZiB0aGUgbW9kYWwgcHJvbXB0IHdpdGggdGhlXG4gICAqIG9wdGlvbnMgaW4gdGhpcyBwcm9tcHQuXG4gICAqL1xuICBQcm9tcHQucHJvdG90eXBlLnBvcHVsYXRlTW9kYWwgPSBmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGVSYWRpb0VsdChvcHRpb24sIGlkeCkge1xuICAgICAgdmFyIGVsdCA9ICQoJC5wYXJzZUhUTUwoXCI8aW5wdXQgbmFtZT1cXFwicHlyZXQtbW9kYWxcXFwiIHR5cGU9XFxcInJhZGlvXFxcIj5cIikpO1xuICAgICAgdmFyIGlkID0gXCJyXCIgKyBpZHgudG9TdHJpbmcoKTtcbiAgICAgIHZhciBsYWJlbCA9ICQoJC5wYXJzZUhUTUwoXCI8bGFiZWwgZm9yPVxcXCJcIiArIGlkICsgXCJcXFwiPjwvbGFiZWw+XCIpKTtcbiAgICAgIGVsdC5hdHRyKFwiaWRcIiwgaWQpO1xuICAgICAgZWx0LmF0dHIoXCJ2YWx1ZVwiLCBvcHRpb24udmFsdWUpO1xuICAgICAgbGFiZWwudGV4dChvcHRpb24ubWVzc2FnZSk7XG4gICAgICB2YXIgZWx0Q29udGFpbmVyID0gJCgkLnBhcnNlSFRNTChcIjx0ZCBjbGFzcz1cXFwicHlyZXQtbW9kYWwtb3B0aW9uLXJhZGlvXFxcIj48L3RkPlwiKSk7XG4gICAgICBlbHRDb250YWluZXIuYXBwZW5kKGVsdCk7XG4gICAgICB2YXIgbGFiZWxDb250YWluZXIgPSAkKCQucGFyc2VIVE1MKFwiPHRkIGNsYXNzPVxcXCJweXJldC1tb2RhbC1vcHRpb24tbWVzc2FnZVxcXCI+PC90ZD5cIikpO1xuICAgICAgbGFiZWxDb250YWluZXIuYXBwZW5kKGxhYmVsKTtcbiAgICAgIHZhciBjb250YWluZXIgPSAkKCQucGFyc2VIVE1MKFwiPHRyIGNsYXNzPVxcXCJweXJldC1tb2RhbC1vcHRpb25cXFwiPjwvdHI+XCIpKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmQoZWx0Q29udGFpbmVyKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmQobGFiZWxDb250YWluZXIpO1xuICAgICAgaWYgKG9wdGlvbi5leGFtcGxlKSB7XG4gICAgICAgIHZhciBleGFtcGxlID0gJCgkLnBhcnNlSFRNTChcIjxkaXY+PC9kaXY+XCIpKTtcbiAgICAgICAgdmFyIGNtID0gQ29kZU1pcnJvcihleGFtcGxlWzBdLCB7XG4gICAgICAgICAgdmFsdWU6IG9wdGlvbi5leGFtcGxlLFxuICAgICAgICAgIG1vZGU6ICdweXJldCcsXG4gICAgICAgICAgbGluZU51bWJlcnM6IGZhbHNlLFxuICAgICAgICAgIHJlYWRPbmx5OiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgY20ucmVmcmVzaCgpO1xuICAgICAgICB9LCAxKTtcbiAgICAgICAgdmFyIGV4YW1wbGVDb250YWluZXIgPSAkKCQucGFyc2VIVE1MKFwiPHRkIGNsYXNzPVxcXCJweXJldC1tb2RhbC1vcHRpb24tZXhhbXBsZVxcXCI+PC90ZD5cIikpO1xuICAgICAgICBleGFtcGxlQ29udGFpbmVyLmFwcGVuZChleGFtcGxlKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZChleGFtcGxlQ29udGFpbmVyKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlVGlsZUVsdChvcHRpb24sIGlkeCkge1xuICAgICAgdmFyIGVsdCA9ICQoJC5wYXJzZUhUTUwoXCI8YnV0dG9uIG5hbWU9XFxcInB5cmV0LW1vZGFsXFxcIiBjbGFzcz1cXFwidGlsZVxcXCI+PC9idXR0b24+XCIpKTtcbiAgICAgIGVsdC5hdHRyKFwiaWRcIiwgXCJ0XCIgKyBpZHgudG9TdHJpbmcoKSk7XG4gICAgICBlbHQuYXBwZW5kKCQoXCI8Yj5cIikudGV4dChvcHRpb24ubWVzc2FnZSkpXG4gICAgICAgIC5hcHBlbmQoJChcIjxwPlwiKS50ZXh0KG9wdGlvbi5kZXRhaWxzKSk7XG4gICAgICBmb3IgKHZhciBldnQgaW4gb3B0aW9uLm9uKVxuICAgICAgICBlbHQub24oZXZ0LCBvcHRpb24ub25bZXZ0XSk7XG4gICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRleHRFbHQob3B0aW9uKSB7XG4gICAgICB2YXIgZWx0ID0gJChcIjxkaXY+XCIpO1xuICAgICAgZWx0LmFwcGVuZCgkKFwiPHNwYW4+XCIpLmFkZENsYXNzKFwidGV4dExhYmVsXCIpLnRleHQob3B0aW9uLm1lc3NhZ2UpKTtcbi8vICAgICAgZWx0LmFwcGVuZCgkKFwiPHNwYW4+XCIpLnRleHQoXCIoXCIgKyBvcHRpb24uZGV0YWlscyArIFwiKVwiKSk7XG4gICAgICBlbHQuYXBwZW5kKCQoXCI8aW5wdXQgdHlwZT0ndGV4dCc+XCIpLnZhbChvcHRpb24uZGVmYXVsdFZhbHVlKSk7XG4gICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvcHlUZXh0RWx0KG9wdGlvbikge1xuICAgICAgdmFyIGVsdCA9ICQoXCI8ZGl2PlwiKTtcbiAgICAgIGVsdC5hcHBlbmQoJChcIjxwPlwiKS5hZGRDbGFzcyhcInRleHRMYWJlbFwiKS50ZXh0KG9wdGlvbi5tZXNzYWdlKSk7XG4gICAgICBpZihvcHRpb24udGV4dCkge1xuICAgICAgICB2YXIgYm94ID0gYXV0b0hpZ2hsaWdodEJveChvcHRpb24udGV4dCk7XG4gIC8vICAgICAgZWx0LmFwcGVuZCgkKFwiPHNwYW4+XCIpLnRleHQoXCIoXCIgKyBvcHRpb24uZGV0YWlscyArIFwiKVwiKSk7XG4gICAgICAgIGVsdC5hcHBlbmQoYm94KTtcbiAgICAgICAgYm94LmZvY3VzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbmZpcm1FbHQob3B0aW9uKSB7XG4gICAgICByZXR1cm4gJChcIjxwPlwiKS50ZXh0KG9wdGlvbi5tZXNzYWdlKTtcbiAgICB9XG5cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbHQob3B0aW9uLCBpKSB7XG4gICAgICBpZih0aGF0Lm9wdGlvbnMuc3R5bGUgPT09IFwicmFkaW9cIikge1xuICAgICAgICByZXR1cm4gY3JlYXRlUmFkaW9FbHQob3B0aW9uLCBpKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYodGhhdC5vcHRpb25zLnN0eWxlID09PSBcInRpbGVzXCIpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVRpbGVFbHQob3B0aW9uLCBpKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYodGhhdC5vcHRpb25zLnN0eWxlID09PSBcInRleHRcIikge1xuICAgICAgICByZXR1cm4gY3JlYXRlVGV4dEVsdChvcHRpb24pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZih0aGF0Lm9wdGlvbnMuc3R5bGUgPT09IFwiY29weVRleHRcIikge1xuICAgICAgICByZXR1cm4gY3JlYXRlQ29weVRleHRFbHQob3B0aW9uKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYodGhhdC5vcHRpb25zLnN0eWxlID09PSBcImNvbmZpcm1cIikge1xuICAgICAgICByZXR1cm4gY3JlYXRlQ29uZmlybUVsdChvcHRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBvcHRpb25FbHRzO1xuICAgIC8vIENhY2hlIHJlc3VsdHNcbi8vICAgIGlmICh0cnVlKSB7XG4gICAgICBvcHRpb25FbHRzID0gdGhpcy5vcHRpb25zLm9wdGlvbnMubWFwKGNyZWF0ZUVsdCk7XG4vLyAgICAgIHRoaXMuY29tcGlsZWRFbHRzID0gb3B0aW9uRWx0cztcbi8vICAgICAgdGhpcy5pc0NvbXBpbGVkID0gdHJ1ZTtcbi8vICAgIH0gZWxzZSB7XG4vLyAgICAgIG9wdGlvbkVsdHMgPSB0aGlzLmNvbXBpbGVkRWx0cztcbi8vICAgIH1cbiAgICAkKFwiaW5wdXRbdHlwZT0ncmFkaW8nXVwiLCBvcHRpb25FbHRzWzBdKS5hdHRyKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgdGhpcy5lbHRzLmFwcGVuZChvcHRpb25FbHRzKTtcbiAgICAkKFwiLm1vZGFsLWJvZHlcIiwgdGhpcy5tb2RhbCkuZW1wdHkoKS5hcHBlbmQodGhpcy5lbHRzKTtcbiAgICBvcHRpb25FbHRzWzBdLmZvY3VzKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgd2hpY2ggaXMgY2FsbGVkIHdoZW4gdGhlIHVzZXIgZG9lcyBub3Qgc2VsZWN0IGFueXRoaW5nXG4gICAqL1xuICBQcm9tcHQucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5tb2RhbC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIHRoaXMuY2xlYXJNb2RhbCgpO1xuICAgIHRoaXMuZGVmZXJyZWQucmVzb2x2ZShudWxsKTtcbiAgICBkZWxldGUgdGhpcy5kZWZlcnJlZDtcbiAgICBkZWxldGUgdGhpcy5wcm9taXNlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHdoaWNoIGlzIGNhbGxlZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgXCJzdWJtaXRcIlxuICAgKi9cbiAgUHJvbXB0LnByb3RvdHlwZS5vblN1Ym1pdCA9IGZ1bmN0aW9uKGUpIHtcbiAgICBpZih0aGlzLm9wdGlvbnMuc3R5bGUgPT09IFwicmFkaW9cIikge1xuICAgICAgdmFyIHJldHZhbCA9ICQoXCJpbnB1dFt0eXBlPSdyYWRpbyddOmNoZWNrZWRcIiwgdGhpcy5tb2RhbCkudmFsKCk7XG4gICAgfVxuICAgIGVsc2UgaWYodGhpcy5vcHRpb25zLnN0eWxlID09PSBcInRleHRcIikge1xuICAgICAgdmFyIHJldHZhbCA9ICQoXCJpbnB1dFt0eXBlPSd0ZXh0J11cIiwgdGhpcy5tb2RhbCkudmFsKCk7XG4gICAgfVxuICAgIGVsc2UgaWYodGhpcy5vcHRpb25zLnN0eWxlID09PSBcImNvcHlUZXh0XCIpIHtcbiAgICAgIHZhciByZXR2YWwgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmKHRoaXMub3B0aW9ucy5zdHlsZSA9PT0gXCJjb25maXJtXCIpIHtcbiAgICAgIHZhciByZXR2YWwgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciByZXR2YWwgPSB0cnVlOyAvLyBKdXN0IHJldHVybiB0cnVlIGlmIHRoZXkgY2xpY2tlZCBzdWJtaXRcbiAgICB9XG4gICAgdGhpcy5tb2RhbC5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIHRoaXMuY2xlYXJNb2RhbCgpO1xuICAgIHRoaXMuZGVmZXJyZWQucmVzb2x2ZShyZXR2YWwpO1xuICAgIGRlbGV0ZSB0aGlzLmRlZmVycmVkO1xuICAgIGRlbGV0ZSB0aGlzLnByb21pc2U7XG4gIH07XG5cbiAgcmV0dXJuIFByb21wdDtcblxufSk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93ZWIvanMvbW9kYWwtcHJvbXB0LmpzIiwiLy8gdmltOnRzPTQ6c3RzPTQ6c3c9NDpcbi8qIVxuICpcbiAqIENvcHlyaWdodCAyMDA5LTIwMTIgS3JpcyBLb3dhbCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1JVFxuICogbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vZ2l0aHViLmNvbS9rcmlza293YWwvcS9yYXcvbWFzdGVyL0xJQ0VOU0VcbiAqXG4gKiBXaXRoIHBhcnRzIGJ5IFR5bGVyIENsb3NlXG4gKiBDb3B5cmlnaHQgMjAwNy0yMDA5IFR5bGVyIENsb3NlIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTUlUIFggbGljZW5zZSBmb3VuZFxuICogYXQgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5odG1sXG4gKiBGb3JrZWQgYXQgcmVmX3NlbmQuanMgdmVyc2lvbjogMjAwOS0wNS0xMVxuICpcbiAqIFdpdGggcGFydHMgYnkgTWFyayBNaWxsZXJcbiAqIENvcHlyaWdodCAoQykgMjAxMSBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG4oZnVuY3Rpb24gKGRlZmluaXRpb24pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIFRoaXMgZmlsZSB3aWxsIGZ1bmN0aW9uIHByb3Blcmx5IGFzIGEgPHNjcmlwdD4gdGFnLCBvciBhIG1vZHVsZVxuICAgIC8vIHVzaW5nIENvbW1vbkpTIGFuZCBOb2RlSlMgb3IgUmVxdWlyZUpTIG1vZHVsZSBmb3JtYXRzLiAgSW5cbiAgICAvLyBDb21tb24vTm9kZS9SZXF1aXJlSlMsIHRoZSBtb2R1bGUgZXhwb3J0cyB0aGUgUSBBUEkgYW5kIHdoZW5cbiAgICAvLyBleGVjdXRlZCBhcyBhIHNpbXBsZSA8c2NyaXB0PiwgaXQgY3JlYXRlcyBhIFEgZ2xvYmFsIGluc3RlYWQuXG5cbiAgICAvLyBNb250YWdlIFJlcXVpcmVcbiAgICBpZiAodHlwZW9mIGJvb3RzdHJhcCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGJvb3RzdHJhcChcInByb21pc2VcIiwgZGVmaW5pdGlvbik7XG5cbiAgICAvLyBDb21tb25KU1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKTtcblxuICAgIC8vIFJlcXVpcmVKU1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGRlZmluaXRpb24pO1xuXG4gICAgLy8gU0VTIChTZWN1cmUgRWNtYVNjcmlwdClcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZXMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKCFzZXMub2soKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VzLm1ha2VRID0gZGVmaW5pdGlvbjtcbiAgICAgICAgfVxuXG4gICAgLy8gPHNjcmlwdD5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgLy8gUHJlZmVyIHdpbmRvdyBvdmVyIHNlbGYgZm9yIGFkZC1vbiBzY3JpcHRzLiBVc2Ugc2VsZiBmb3JcbiAgICAgICAgLy8gbm9uLXdpbmRvd2VkIGNvbnRleHRzLlxuICAgICAgICB2YXIgZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHNlbGY7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBgd2luZG93YCBvYmplY3QsIHNhdmUgdGhlIHByZXZpb3VzIFEgZ2xvYmFsXG4gICAgICAgIC8vIGFuZCBpbml0aWFsaXplIFEgYXMgYSBnbG9iYWwuXG4gICAgICAgIHZhciBwcmV2aW91c1EgPSBnbG9iYWwuUTtcbiAgICAgICAgZ2xvYmFsLlEgPSBkZWZpbml0aW9uKCk7XG5cbiAgICAgICAgLy8gQWRkIGEgbm9Db25mbGljdCBmdW5jdGlvbiBzbyBRIGNhbiBiZSByZW1vdmVkIGZyb20gdGhlXG4gICAgICAgIC8vIGdsb2JhbCBuYW1lc3BhY2UuXG4gICAgICAgIGdsb2JhbC5RLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBnbG9iYWwuUSA9IHByZXZpb3VzUTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBlbnZpcm9ubWVudCB3YXMgbm90IGFudGljaXBhdGVkIGJ5IFEuIFBsZWFzZSBmaWxlIGEgYnVnLlwiKTtcbiAgICB9XG5cbn0pKGZ1bmN0aW9uICgpIHtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgaGFzU3RhY2tzID0gZmFsc2U7XG50cnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xufSBjYXRjaCAoZSkge1xuICAgIGhhc1N0YWNrcyA9ICEhZS5zdGFjaztcbn1cblxuLy8gQWxsIGNvZGUgYWZ0ZXIgdGhpcyBwb2ludCB3aWxsIGJlIGZpbHRlcmVkIGZyb20gc3RhY2sgdHJhY2VzIHJlcG9ydGVkXG4vLyBieSBRLlxudmFyIHFTdGFydGluZ0xpbmUgPSBjYXB0dXJlTGluZSgpO1xudmFyIHFGaWxlTmFtZTtcblxuLy8gc2hpbXNcblxuLy8gdXNlZCBmb3IgZmFsbGJhY2sgaW4gXCJhbGxSZXNvbHZlZFwiXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9O1xuXG4vLyBVc2UgdGhlIGZhc3Rlc3QgcG9zc2libGUgbWVhbnMgdG8gZXhlY3V0ZSBhIHRhc2sgaW4gYSBmdXR1cmUgdHVyblxuLy8gb2YgdGhlIGV2ZW50IGxvb3AuXG52YXIgbmV4dFRpY2sgPShmdW5jdGlvbiAoKSB7XG4gICAgLy8gbGlua2VkIGxpc3Qgb2YgdGFza3MgKHNpbmdsZSwgd2l0aCBoZWFkIG5vZGUpXG4gICAgdmFyIGhlYWQgPSB7dGFzazogdm9pZCAwLCBuZXh0OiBudWxsfTtcbiAgICB2YXIgdGFpbCA9IGhlYWQ7XG4gICAgdmFyIGZsdXNoaW5nID0gZmFsc2U7XG4gICAgdmFyIHJlcXVlc3RUaWNrID0gdm9pZCAwO1xuICAgIHZhciBpc05vZGVKUyA9IGZhbHNlO1xuICAgIC8vIHF1ZXVlIGZvciBsYXRlIHRhc2tzLCB1c2VkIGJ5IHVuaGFuZGxlZCByZWplY3Rpb24gdHJhY2tpbmdcbiAgICB2YXIgbGF0ZXJRdWV1ZSA9IFtdO1xuXG4gICAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgICAgIC8qIGpzaGludCBsb29wZnVuYzogdHJ1ZSAqL1xuICAgICAgICB2YXIgdGFzaywgZG9tYWluO1xuXG4gICAgICAgIHdoaWxlIChoZWFkLm5leHQpIHtcbiAgICAgICAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICAgICAgICB0YXNrID0gaGVhZC50YXNrO1xuICAgICAgICAgICAgaGVhZC50YXNrID0gdm9pZCAwO1xuICAgICAgICAgICAgZG9tYWluID0gaGVhZC5kb21haW47XG5cbiAgICAgICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICAgICAgICBoZWFkLmRvbWFpbiA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJ1blNpbmdsZSh0YXNrLCBkb21haW4pO1xuXG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGxhdGVyUXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICB0YXNrID0gbGF0ZXJRdWV1ZS5wb3AoKTtcbiAgICAgICAgICAgIHJ1blNpbmdsZSh0YXNrKTtcbiAgICAgICAgfVxuICAgICAgICBmbHVzaGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBydW5zIGEgc2luZ2xlIGZ1bmN0aW9uIGluIHRoZSBhc3luYyBxdWV1ZVxuICAgIGZ1bmN0aW9uIHJ1blNpbmdsZSh0YXNrLCBkb21haW4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRhc2soKTtcblxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoaXNOb2RlSlMpIHtcbiAgICAgICAgICAgICAgICAvLyBJbiBub2RlLCB1bmNhdWdodCBleGNlcHRpb25zIGFyZSBjb25zaWRlcmVkIGZhdGFsIGVycm9ycy5cbiAgICAgICAgICAgICAgICAvLyBSZS10aHJvdyB0aGVtIHN5bmNocm9ub3VzbHkgdG8gaW50ZXJydXB0IGZsdXNoaW5nIVxuXG4gICAgICAgICAgICAgICAgLy8gRW5zdXJlIGNvbnRpbnVhdGlvbiBpZiB0aGUgdW5jYXVnaHQgZXhjZXB0aW9uIGlzIHN1cHByZXNzZWRcbiAgICAgICAgICAgICAgICAvLyBsaXN0ZW5pbmcgXCJ1bmNhdWdodEV4Y2VwdGlvblwiIGV2ZW50cyAoYXMgZG9tYWlucyBkb2VzKS5cbiAgICAgICAgICAgICAgICAvLyBDb250aW51ZSBpbiBuZXh0IGV2ZW50IHRvIGF2b2lkIHRpY2sgcmVjdXJzaW9uLlxuICAgICAgICAgICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmbHVzaCwgMCk7XG4gICAgICAgICAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgICAgICAgICAgICBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEluIGJyb3dzZXJzLCB1bmNhdWdodCBleGNlcHRpb25zIGFyZSBub3QgZmF0YWwuXG4gICAgICAgICAgICAgICAgLy8gUmUtdGhyb3cgdGhlbSBhc3luY2hyb25vdXNseSB0byBhdm9pZCBzbG93LWRvd25zLlxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgICAgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5leHRUaWNrID0gZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgdGFpbCA9IHRhaWwubmV4dCA9IHtcbiAgICAgICAgICAgIHRhc2s6IHRhc2ssXG4gICAgICAgICAgICBkb21haW46IGlzTm9kZUpTICYmIHByb2Nlc3MuZG9tYWluLFxuICAgICAgICAgICAgbmV4dDogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICghZmx1c2hpbmcpIHtcbiAgICAgICAgICAgIGZsdXNoaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlcXVlc3RUaWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgIHByb2Nlc3MudG9TdHJpbmcoKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIgJiYgcHJvY2Vzcy5uZXh0VGljaykge1xuICAgICAgICAvLyBFbnN1cmUgUSBpcyBpbiBhIHJlYWwgTm9kZSBlbnZpcm9ubWVudCwgd2l0aCBhIGBwcm9jZXNzLm5leHRUaWNrYC5cbiAgICAgICAgLy8gVG8gc2VlIHRocm91Z2ggZmFrZSBOb2RlIGVudmlyb25tZW50czpcbiAgICAgICAgLy8gKiBNb2NoYSB0ZXN0IHJ1bm5lciAtIGV4cG9zZXMgYSBgcHJvY2Vzc2AgZ2xvYmFsIHdpdGhvdXQgYSBgbmV4dFRpY2tgXG4gICAgICAgIC8vICogQnJvd3NlcmlmeSAtIGV4cG9zZXMgYSBgcHJvY2Vzcy5uZXhUaWNrYCBmdW5jdGlvbiB0aGF0IHVzZXNcbiAgICAgICAgLy8gICBgc2V0VGltZW91dGAuIEluIHRoaXMgY2FzZSBgc2V0SW1tZWRpYXRlYCBpcyBwcmVmZXJyZWQgYmVjYXVzZVxuICAgICAgICAvLyAgICBpdCBpcyBmYXN0ZXIuIEJyb3dzZXJpZnkncyBgcHJvY2Vzcy50b1N0cmluZygpYCB5aWVsZHNcbiAgICAgICAgLy8gICBcIltvYmplY3QgT2JqZWN0XVwiLCB3aGlsZSBpbiBhIHJlYWwgTm9kZSBlbnZpcm9ubWVudFxuICAgICAgICAvLyAgIGBwcm9jZXNzLm5leHRUaWNrKClgIHlpZWxkcyBcIltvYmplY3QgcHJvY2Vzc11cIi5cbiAgICAgICAgaXNOb2RlSlMgPSB0cnVlO1xuXG4gICAgICAgIHJlcXVlc3RUaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgICAgIH07XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAvLyBJbiBJRTEwLCBOb2RlLmpzIDAuOSssIG9yIGh0dHBzOi8vZ2l0aHViLmNvbS9Ob2JsZUpTL3NldEltbWVkaWF0ZVxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcmVxdWVzdFRpY2sgPSBzZXRJbW1lZGlhdGUuYmluZCh3aW5kb3csIGZsdXNoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcXVlc3RUaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNldEltbWVkaWF0ZShmbHVzaCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAvLyBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgLy8gaHR0cDovL3d3dy5ub25ibG9ja2luZy5pby8yMDExLzA2L3dpbmRvd25leHR0aWNrLmh0bWxcbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgLy8gQXQgbGVhc3QgU2FmYXJpIFZlcnNpb24gNi4wLjUgKDg1MzYuMzAuMSkgaW50ZXJtaXR0ZW50bHkgY2Fubm90IGNyZWF0ZVxuICAgICAgICAvLyB3b3JraW5nIG1lc3NhZ2UgcG9ydHMgdGhlIGZpcnN0IHRpbWUgYSBwYWdlIGxvYWRzLlxuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlcXVlc3RUaWNrID0gcmVxdWVzdFBvcnRUaWNrO1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmbHVzaDtcbiAgICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciByZXF1ZXN0UG9ydFRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBPcGVyYSByZXF1aXJlcyB1cyB0byBwcm92aWRlIGEgbWVzc2FnZSBwYXlsb2FkLCByZWdhcmRsZXNzIG9mXG4gICAgICAgICAgICAvLyB3aGV0aGVyIHdlIHVzZSBpdC5cbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3RUaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmbHVzaCwgMCk7XG4gICAgICAgICAgICByZXF1ZXN0UG9ydFRpY2soKTtcbiAgICAgICAgfTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG9sZCBicm93c2Vyc1xuICAgICAgICByZXF1ZXN0VGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZmx1c2gsIDApO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyBydW5zIGEgdGFzayBhZnRlciBhbGwgb3RoZXIgdGFza3MgaGF2ZSBiZWVuIHJ1blxuICAgIC8vIHRoaXMgaXMgdXNlZnVsIGZvciB1bmhhbmRsZWQgcmVqZWN0aW9uIHRyYWNraW5nIHRoYXQgbmVlZHMgdG8gaGFwcGVuXG4gICAgLy8gYWZ0ZXIgYWxsIGB0aGVuYGQgdGFza3MgaGF2ZSBiZWVuIHJ1bi5cbiAgICBuZXh0VGljay5ydW5BZnRlciA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgIGxhdGVyUXVldWUucHVzaCh0YXNrKTtcbiAgICAgICAgaWYgKCFmbHVzaGluZykge1xuICAgICAgICAgICAgZmx1c2hpbmcgPSB0cnVlO1xuICAgICAgICAgICAgcmVxdWVzdFRpY2soKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIG5leHRUaWNrO1xufSkoKTtcblxuLy8gQXR0ZW1wdCB0byBtYWtlIGdlbmVyaWNzIHNhZmUgaW4gdGhlIGZhY2Ugb2YgZG93bnN0cmVhbVxuLy8gbW9kaWZpY2F0aW9ucy5cbi8vIFRoZXJlIGlzIG5vIHNpdHVhdGlvbiB3aGVyZSB0aGlzIGlzIG5lY2Vzc2FyeS5cbi8vIElmIHlvdSBuZWVkIGEgc2VjdXJpdHkgZ3VhcmFudGVlLCB0aGVzZSBwcmltb3JkaWFscyBuZWVkIHRvIGJlXG4vLyBkZWVwbHkgZnJvemVuIGFueXdheSwgYW5kIGlmIHlvdSBkb27igJl0IG5lZWQgYSBzZWN1cml0eSBndWFyYW50ZWUsXG4vLyB0aGlzIGlzIGp1c3QgcGxhaW4gcGFyYW5vaWQuXG4vLyBIb3dldmVyLCB0aGlzICoqbWlnaHQqKiBoYXZlIHRoZSBuaWNlIHNpZGUtZWZmZWN0IG9mIHJlZHVjaW5nIHRoZSBzaXplIG9mXG4vLyB0aGUgbWluaWZpZWQgY29kZSBieSByZWR1Y2luZyB4LmNhbGwoKSB0byBtZXJlbHkgeCgpXG4vLyBTZWUgTWFyayBNaWxsZXLigJlzIGV4cGxhbmF0aW9uIG9mIHdoYXQgdGhpcyBkb2VzLlxuLy8gaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9Y29udmVudGlvbnM6c2FmZV9tZXRhX3Byb2dyYW1taW5nXG52YXIgY2FsbCA9IEZ1bmN0aW9uLmNhbGw7XG5mdW5jdGlvbiB1bmN1cnJ5VGhpcyhmKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNhbGwuYXBwbHkoZiwgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuLy8gVGhpcyBpcyBlcXVpdmFsZW50LCBidXQgc2xvd2VyOlxuLy8gdW5jdXJyeVRoaXMgPSBGdW5jdGlvbl9iaW5kLmJpbmQoRnVuY3Rpb25fYmluZC5jYWxsKTtcbi8vIGh0dHA6Ly9qc3BlcmYuY29tL3VuY3Vycnl0aGlzXG5cbnZhciBhcnJheV9zbGljZSA9IHVuY3VycnlUaGlzKEFycmF5LnByb3RvdHlwZS5zbGljZSk7XG5cbnZhciBhcnJheV9yZWR1Y2UgPSB1bmN1cnJ5VGhpcyhcbiAgICBBcnJheS5wcm90b3R5cGUucmVkdWNlIHx8IGZ1bmN0aW9uIChjYWxsYmFjaywgYmFzaXMpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMCxcbiAgICAgICAgICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICAgICAgICAvLyBjb25jZXJuaW5nIHRoZSBpbml0aWFsIHZhbHVlLCBpZiBvbmUgaXMgbm90IHByb3ZpZGVkXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAvLyBzZWVrIHRvIHRoZSBmaXJzdCB2YWx1ZSBpbiB0aGUgYXJyYXksIGFjY291bnRpbmdcbiAgICAgICAgICAgIC8vIGZvciB0aGUgcG9zc2liaWxpdHkgdGhhdCBpcyBpcyBhIHNwYXJzZSBhcnJheVxuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCBpbiB0aGlzKSB7XG4gICAgICAgICAgICAgICAgICAgIGJhc2lzID0gdGhpc1tpbmRleCsrXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgrK2luZGV4ID49IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSAoMSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVkdWNlXG4gICAgICAgIGZvciAoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgLy8gYWNjb3VudCBmb3IgdGhlIHBvc3NpYmlsaXR5IHRoYXQgdGhlIGFycmF5IGlzIHNwYXJzZVxuICAgICAgICAgICAgaWYgKGluZGV4IGluIHRoaXMpIHtcbiAgICAgICAgICAgICAgICBiYXNpcyA9IGNhbGxiYWNrKGJhc2lzLCB0aGlzW2luZGV4XSwgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiYXNpcztcbiAgICB9XG4pO1xuXG52YXIgYXJyYXlfaW5kZXhPZiA9IHVuY3VycnlUaGlzKFxuICAgIEFycmF5LnByb3RvdHlwZS5pbmRleE9mIHx8IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAvLyBub3QgYSB2ZXJ5IGdvb2Qgc2hpbSwgYnV0IGdvb2QgZW5vdWdoIGZvciBvdXIgb25lIHVzZSBvZiBpdFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzW2ldID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4pO1xuXG52YXIgYXJyYXlfbWFwID0gdW5jdXJyeVRoaXMoXG4gICAgQXJyYXkucHJvdG90eXBlLm1hcCB8fCBmdW5jdGlvbiAoY2FsbGJhY2ssIHRoaXNwKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNvbGxlY3QgPSBbXTtcbiAgICAgICAgYXJyYXlfcmVkdWNlKHNlbGYsIGZ1bmN0aW9uICh1bmRlZmluZWQsIHZhbHVlLCBpbmRleCkge1xuICAgICAgICAgICAgY29sbGVjdC5wdXNoKGNhbGxiYWNrLmNhbGwodGhpc3AsIHZhbHVlLCBpbmRleCwgc2VsZikpO1xuICAgICAgICB9LCB2b2lkIDApO1xuICAgICAgICByZXR1cm4gY29sbGVjdDtcbiAgICB9XG4pO1xuXG52YXIgb2JqZWN0X2NyZWF0ZSA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gKHByb3RvdHlwZSkge1xuICAgIGZ1bmN0aW9uIFR5cGUoKSB7IH1cbiAgICBUeXBlLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbiAgICByZXR1cm4gbmV3IFR5cGUoKTtcbn07XG5cbnZhciBvYmplY3RfaGFzT3duUHJvcGVydHkgPSB1bmN1cnJ5VGhpcyhPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcblxudmFyIG9iamVjdF9rZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0X2hhc093blByb3BlcnR5KG9iamVjdCwga2V5KSkge1xuICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGtleXM7XG59O1xuXG52YXIgb2JqZWN0X3RvU3RyaW5nID0gdW5jdXJyeVRoaXMoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyk7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBPYmplY3QodmFsdWUpO1xufVxuXG4vLyBnZW5lcmF0b3IgcmVsYXRlZCBzaGltc1xuXG4vLyBGSVhNRTogUmVtb3ZlIHRoaXMgZnVuY3Rpb24gb25jZSBFUzYgZ2VuZXJhdG9ycyBhcmUgaW4gU3BpZGVyTW9ua2V5LlxuZnVuY3Rpb24gaXNTdG9wSXRlcmF0aW9uKGV4Y2VwdGlvbikge1xuICAgIHJldHVybiAoXG4gICAgICAgIG9iamVjdF90b1N0cmluZyhleGNlcHRpb24pID09PSBcIltvYmplY3QgU3RvcEl0ZXJhdGlvbl1cIiB8fFxuICAgICAgICBleGNlcHRpb24gaW5zdGFuY2VvZiBRUmV0dXJuVmFsdWVcbiAgICApO1xufVxuXG4vLyBGSVhNRTogUmVtb3ZlIHRoaXMgaGVscGVyIGFuZCBRLnJldHVybiBvbmNlIEVTNiBnZW5lcmF0b3JzIGFyZSBpblxuLy8gU3BpZGVyTW9ua2V5LlxudmFyIFFSZXR1cm5WYWx1ZTtcbmlmICh0eXBlb2YgUmV0dXJuVmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBRUmV0dXJuVmFsdWUgPSBSZXR1cm5WYWx1ZTtcbn0gZWxzZSB7XG4gICAgUVJldHVyblZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9O1xufVxuXG4vLyBsb25nIHN0YWNrIHRyYWNlc1xuXG52YXIgU1RBQ0tfSlVNUF9TRVBBUkFUT1IgPSBcIkZyb20gcHJldmlvdXMgZXZlbnQ6XCI7XG5cbmZ1bmN0aW9uIG1ha2VTdGFja1RyYWNlTG9uZyhlcnJvciwgcHJvbWlzZSkge1xuICAgIC8vIElmIHBvc3NpYmxlLCB0cmFuc2Zvcm0gdGhlIGVycm9yIHN0YWNrIHRyYWNlIGJ5IHJlbW92aW5nIE5vZGUgYW5kIFFcbiAgICAvLyBjcnVmdCwgdGhlbiBjb25jYXRlbmF0aW5nIHdpdGggdGhlIHN0YWNrIHRyYWNlIG9mIGBwcm9taXNlYC4gU2VlICM1Ny5cbiAgICBpZiAoaGFzU3RhY2tzICYmXG4gICAgICAgIHByb21pc2Uuc3RhY2sgJiZcbiAgICAgICAgdHlwZW9mIGVycm9yID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgIGVycm9yICE9PSBudWxsICYmXG4gICAgICAgIGVycm9yLnN0YWNrICYmXG4gICAgICAgIGVycm9yLnN0YWNrLmluZGV4T2YoU1RBQ0tfSlVNUF9TRVBBUkFUT1IpID09PSAtMVxuICAgICkge1xuICAgICAgICB2YXIgc3RhY2tzID0gW107XG4gICAgICAgIGZvciAodmFyIHAgPSBwcm9taXNlOyAhIXA7IHAgPSBwLnNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKHAuc3RhY2spIHtcbiAgICAgICAgICAgICAgICBzdGFja3MudW5zaGlmdChwLnN0YWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdGFja3MudW5zaGlmdChlcnJvci5zdGFjayk7XG5cbiAgICAgICAgdmFyIGNvbmNhdGVkU3RhY2tzID0gc3RhY2tzLmpvaW4oXCJcXG5cIiArIFNUQUNLX0pVTVBfU0VQQVJBVE9SICsgXCJcXG5cIik7XG4gICAgICAgIGVycm9yLnN0YWNrID0gZmlsdGVyU3RhY2tTdHJpbmcoY29uY2F0ZWRTdGFja3MpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZmlsdGVyU3RhY2tTdHJpbmcoc3RhY2tTdHJpbmcpIHtcbiAgICB2YXIgbGluZXMgPSBzdGFja1N0cmluZy5zcGxpdChcIlxcblwiKTtcbiAgICB2YXIgZGVzaXJlZExpbmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgbGluZSA9IGxpbmVzW2ldO1xuXG4gICAgICAgIGlmICghaXNJbnRlcm5hbEZyYW1lKGxpbmUpICYmICFpc05vZGVGcmFtZShsaW5lKSAmJiBsaW5lKSB7XG4gICAgICAgICAgICBkZXNpcmVkTGluZXMucHVzaChsaW5lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVzaXJlZExpbmVzLmpvaW4oXCJcXG5cIik7XG59XG5cbmZ1bmN0aW9uIGlzTm9kZUZyYW1lKHN0YWNrTGluZSkge1xuICAgIHJldHVybiBzdGFja0xpbmUuaW5kZXhPZihcIihtb2R1bGUuanM6XCIpICE9PSAtMSB8fFxuICAgICAgICAgICBzdGFja0xpbmUuaW5kZXhPZihcIihub2RlLmpzOlwiKSAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIGdldEZpbGVOYW1lQW5kTGluZU51bWJlcihzdGFja0xpbmUpIHtcbiAgICAvLyBOYW1lZCBmdW5jdGlvbnM6IFwiYXQgZnVuY3Rpb25OYW1lIChmaWxlbmFtZTpsaW5lTnVtYmVyOmNvbHVtbk51bWJlcilcIlxuICAgIC8vIEluIElFMTAgZnVuY3Rpb24gbmFtZSBjYW4gaGF2ZSBzcGFjZXMgKFwiQW5vbnltb3VzIGZ1bmN0aW9uXCIpIE9fb1xuICAgIHZhciBhdHRlbXB0MSA9IC9hdCAuKyBcXCgoLispOihcXGQrKTooPzpcXGQrKVxcKSQvLmV4ZWMoc3RhY2tMaW5lKTtcbiAgICBpZiAoYXR0ZW1wdDEpIHtcbiAgICAgICAgcmV0dXJuIFthdHRlbXB0MVsxXSwgTnVtYmVyKGF0dGVtcHQxWzJdKV07XG4gICAgfVxuXG4gICAgLy8gQW5vbnltb3VzIGZ1bmN0aW9uczogXCJhdCBmaWxlbmFtZTpsaW5lTnVtYmVyOmNvbHVtbk51bWJlclwiXG4gICAgdmFyIGF0dGVtcHQyID0gL2F0IChbXiBdKyk6KFxcZCspOig/OlxcZCspJC8uZXhlYyhzdGFja0xpbmUpO1xuICAgIGlmIChhdHRlbXB0Mikge1xuICAgICAgICByZXR1cm4gW2F0dGVtcHQyWzFdLCBOdW1iZXIoYXR0ZW1wdDJbMl0pXTtcbiAgICB9XG5cbiAgICAvLyBGaXJlZm94IHN0eWxlOiBcImZ1bmN0aW9uQGZpbGVuYW1lOmxpbmVOdW1iZXIgb3IgQGZpbGVuYW1lOmxpbmVOdW1iZXJcIlxuICAgIHZhciBhdHRlbXB0MyA9IC8uKkAoLispOihcXGQrKSQvLmV4ZWMoc3RhY2tMaW5lKTtcbiAgICBpZiAoYXR0ZW1wdDMpIHtcbiAgICAgICAgcmV0dXJuIFthdHRlbXB0M1sxXSwgTnVtYmVyKGF0dGVtcHQzWzJdKV07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0ludGVybmFsRnJhbWUoc3RhY2tMaW5lKSB7XG4gICAgdmFyIGZpbGVOYW1lQW5kTGluZU51bWJlciA9IGdldEZpbGVOYW1lQW5kTGluZU51bWJlcihzdGFja0xpbmUpO1xuXG4gICAgaWYgKCFmaWxlTmFtZUFuZExpbmVOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBmaWxlTmFtZSA9IGZpbGVOYW1lQW5kTGluZU51bWJlclswXTtcbiAgICB2YXIgbGluZU51bWJlciA9IGZpbGVOYW1lQW5kTGluZU51bWJlclsxXTtcblxuICAgIHJldHVybiBmaWxlTmFtZSA9PT0gcUZpbGVOYW1lICYmXG4gICAgICAgIGxpbmVOdW1iZXIgPj0gcVN0YXJ0aW5nTGluZSAmJlxuICAgICAgICBsaW5lTnVtYmVyIDw9IHFFbmRpbmdMaW5lO1xufVxuXG4vLyBkaXNjb3ZlciBvd24gZmlsZSBuYW1lIGFuZCBsaW5lIG51bWJlciByYW5nZSBmb3IgZmlsdGVyaW5nIHN0YWNrXG4vLyB0cmFjZXNcbmZ1bmN0aW9uIGNhcHR1cmVMaW5lKCkge1xuICAgIGlmICghaGFzU3RhY2tzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IGUuc3RhY2suc3BsaXQoXCJcXG5cIik7XG4gICAgICAgIHZhciBmaXJzdExpbmUgPSBsaW5lc1swXS5pbmRleE9mKFwiQFwiKSA+IDAgPyBsaW5lc1sxXSA6IGxpbmVzWzJdO1xuICAgICAgICB2YXIgZmlsZU5hbWVBbmRMaW5lTnVtYmVyID0gZ2V0RmlsZU5hbWVBbmRMaW5lTnVtYmVyKGZpcnN0TGluZSk7XG4gICAgICAgIGlmICghZmlsZU5hbWVBbmRMaW5lTnVtYmVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBxRmlsZU5hbWUgPSBmaWxlTmFtZUFuZExpbmVOdW1iZXJbMF07XG4gICAgICAgIHJldHVybiBmaWxlTmFtZUFuZExpbmVOdW1iZXJbMV07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZXByZWNhdGUoY2FsbGJhY2ssIG5hbWUsIGFsdGVybmF0aXZlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihuYW1lICsgXCIgaXMgZGVwcmVjYXRlZCwgdXNlIFwiICsgYWx0ZXJuYXRpdmUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwiIGluc3RlYWQuXCIsIG5ldyBFcnJvcihcIlwiKS5zdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbi8vIGVuZCBvZiBzaGltc1xuLy8gYmVnaW5uaW5nIG9mIHJlYWwgd29ya1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSBwcm9taXNlIGZvciBhbiBpbW1lZGlhdGUgcmVmZXJlbmNlLCBwYXNzZXMgcHJvbWlzZXMgdGhyb3VnaCwgb3JcbiAqIGNvZXJjZXMgcHJvbWlzZXMgZnJvbSBkaWZmZXJlbnQgc3lzdGVtcy5cbiAqIEBwYXJhbSB2YWx1ZSBpbW1lZGlhdGUgcmVmZXJlbmNlIG9yIHByb21pc2VcbiAqL1xuZnVuY3Rpb24gUSh2YWx1ZSkge1xuICAgIC8vIElmIHRoZSBvYmplY3QgaXMgYWxyZWFkeSBhIFByb21pc2UsIHJldHVybiBpdCBkaXJlY3RseS4gIFRoaXMgZW5hYmxlc1xuICAgIC8vIHRoZSByZXNvbHZlIGZ1bmN0aW9uIHRvIGJvdGggYmUgdXNlZCB0byBjcmVhdGVkIHJlZmVyZW5jZXMgZnJvbSBvYmplY3RzLFxuICAgIC8vIGJ1dCB0byB0b2xlcmFibHkgY29lcmNlIG5vbi1wcm9taXNlcyB0byBwcm9taXNlcy5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvLyBhc3NpbWlsYXRlIHRoZW5hYmxlc1xuICAgIGlmIChpc1Byb21pc2VBbGlrZSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGNvZXJjZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bGZpbGwodmFsdWUpO1xuICAgIH1cbn1cblEucmVzb2x2ZSA9IFE7XG5cbi8qKlxuICogUGVyZm9ybXMgYSB0YXNrIGluIGEgZnV0dXJlIHR1cm4gb2YgdGhlIGV2ZW50IGxvb3AuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0YXNrXG4gKi9cblEubmV4dFRpY2sgPSBuZXh0VGljaztcblxuLyoqXG4gKiBDb250cm9scyB3aGV0aGVyIG9yIG5vdCBsb25nIHN0YWNrIHRyYWNlcyB3aWxsIGJlIG9uXG4gKi9cblEubG9uZ1N0YWNrU3VwcG9ydCA9IGZhbHNlO1xuXG4vLyBlbmFibGUgbG9uZyBzdGFja3MgaWYgUV9ERUJVRyBpcyBzZXRcbmlmICh0eXBlb2YgcHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJiBwcm9jZXNzICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52LlFfREVCVUcpIHtcbiAgICBRLmxvbmdTdGFja1N1cHBvcnQgPSB0cnVlO1xufVxuXG4vKipcbiAqIENvbnN0cnVjdHMgYSB7cHJvbWlzZSwgcmVzb2x2ZSwgcmVqZWN0fSBvYmplY3QuXG4gKlxuICogYHJlc29sdmVgIGlzIGEgY2FsbGJhY2sgdG8gaW52b2tlIHdpdGggYSBtb3JlIHJlc29sdmVkIHZhbHVlIGZvciB0aGVcbiAqIHByb21pc2UuIFRvIGZ1bGZpbGwgdGhlIHByb21pc2UsIGludm9rZSBgcmVzb2x2ZWAgd2l0aCBhbnkgdmFsdWUgdGhhdCBpc1xuICogbm90IGEgdGhlbmFibGUuIFRvIHJlamVjdCB0aGUgcHJvbWlzZSwgaW52b2tlIGByZXNvbHZlYCB3aXRoIGEgcmVqZWN0ZWRcbiAqIHRoZW5hYmxlLCBvciBpbnZva2UgYHJlamVjdGAgd2l0aCB0aGUgcmVhc29uIGRpcmVjdGx5LiBUbyByZXNvbHZlIHRoZVxuICogcHJvbWlzZSB0byBhbm90aGVyIHRoZW5hYmxlLCB0aHVzIHB1dHRpbmcgaXQgaW4gdGhlIHNhbWUgc3RhdGUsIGludm9rZVxuICogYHJlc29sdmVgIHdpdGggdGhhdCBvdGhlciB0aGVuYWJsZS5cbiAqL1xuUS5kZWZlciA9IGRlZmVyO1xuZnVuY3Rpb24gZGVmZXIoKSB7XG4gICAgLy8gaWYgXCJtZXNzYWdlc1wiIGlzIGFuIFwiQXJyYXlcIiwgdGhhdCBpbmRpY2F0ZXMgdGhhdCB0aGUgcHJvbWlzZSBoYXMgbm90IHlldFxuICAgIC8vIGJlZW4gcmVzb2x2ZWQuICBJZiBpdCBpcyBcInVuZGVmaW5lZFwiLCBpdCBoYXMgYmVlbiByZXNvbHZlZC4gIEVhY2hcbiAgICAvLyBlbGVtZW50IG9mIHRoZSBtZXNzYWdlcyBhcnJheSBpcyBpdHNlbGYgYW4gYXJyYXkgb2YgY29tcGxldGUgYXJndW1lbnRzIHRvXG4gICAgLy8gZm9yd2FyZCB0byB0aGUgcmVzb2x2ZWQgcHJvbWlzZS4gIFdlIGNvZXJjZSB0aGUgcmVzb2x1dGlvbiB2YWx1ZSB0byBhXG4gICAgLy8gcHJvbWlzZSB1c2luZyB0aGUgYHJlc29sdmVgIGZ1bmN0aW9uIGJlY2F1c2UgaXQgaGFuZGxlcyBib3RoIGZ1bGx5XG4gICAgLy8gbm9uLXRoZW5hYmxlIHZhbHVlcyBhbmQgb3RoZXIgdGhlbmFibGVzIGdyYWNlZnVsbHkuXG4gICAgdmFyIG1lc3NhZ2VzID0gW10sIHByb2dyZXNzTGlzdGVuZXJzID0gW10sIHJlc29sdmVkUHJvbWlzZTtcblxuICAgIHZhciBkZWZlcnJlZCA9IG9iamVjdF9jcmVhdGUoZGVmZXIucHJvdG90eXBlKTtcbiAgICB2YXIgcHJvbWlzZSA9IG9iamVjdF9jcmVhdGUoUHJvbWlzZS5wcm90b3R5cGUpO1xuXG4gICAgcHJvbWlzZS5wcm9taXNlRGlzcGF0Y2ggPSBmdW5jdGlvbiAocmVzb2x2ZSwgb3AsIG9wZXJhbmRzKSB7XG4gICAgICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzKTtcbiAgICAgICAgaWYgKG1lc3NhZ2VzKSB7XG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKGFyZ3MpO1xuICAgICAgICAgICAgaWYgKG9wID09PSBcIndoZW5cIiAmJiBvcGVyYW5kc1sxXSkgeyAvLyBwcm9ncmVzcyBvcGVyYW5kXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NMaXN0ZW5lcnMucHVzaChvcGVyYW5kc1sxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBRLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlZFByb21pc2UucHJvbWlzZURpc3BhdGNoLmFwcGx5KHJlc29sdmVkUHJvbWlzZSwgYXJncyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBYWFggZGVwcmVjYXRlZFxuICAgIHByb21pc2UudmFsdWVPZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmVhcmVyVmFsdWUgPSBuZWFyZXIocmVzb2x2ZWRQcm9taXNlKTtcbiAgICAgICAgaWYgKGlzUHJvbWlzZShuZWFyZXJWYWx1ZSkpIHtcbiAgICAgICAgICAgIHJlc29sdmVkUHJvbWlzZSA9IG5lYXJlclZhbHVlOyAvLyBzaG9ydGVuIGNoYWluXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5lYXJlclZhbHVlO1xuICAgIH07XG5cbiAgICBwcm9taXNlLmluc3BlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghcmVzb2x2ZWRQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4geyBzdGF0ZTogXCJwZW5kaW5nXCIgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzb2x2ZWRQcm9taXNlLmluc3BlY3QoKTtcbiAgICB9O1xuXG4gICAgaWYgKFEubG9uZ1N0YWNrU3VwcG9ydCAmJiBoYXNTdGFja3MpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBOT1RFOiBkb24ndCB0cnkgdG8gdXNlIGBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZWAgb3IgdHJhbnNmZXIgdGhlXG4gICAgICAgICAgICAvLyBhY2Nlc3NvciBhcm91bmQ7IHRoYXQgY2F1c2VzIG1lbW9yeSBsZWFrcyBhcyBwZXIgR0gtMTExLiBKdXN0XG4gICAgICAgICAgICAvLyByZWlmeSB0aGUgc3RhY2sgdHJhY2UgYXMgYSBzdHJpbmcgQVNBUC5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBBdCB0aGUgc2FtZSB0aW1lLCBjdXQgb2ZmIHRoZSBmaXJzdCBsaW5lOyBpdCdzIGFsd2F5cyBqdXN0XG4gICAgICAgICAgICAvLyBcIltvYmplY3QgUHJvbWlzZV1cXG5cIiwgYXMgcGVyIHRoZSBgdG9TdHJpbmdgLlxuICAgICAgICAgICAgcHJvbWlzZS5zdGFjayA9IGUuc3RhY2suc3Vic3RyaW5nKGUuc3RhY2suaW5kZXhPZihcIlxcblwiKSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTk9URTogd2UgZG8gdGhlIGNoZWNrcyBmb3IgYHJlc29sdmVkUHJvbWlzZWAgaW4gZWFjaCBtZXRob2QsIGluc3RlYWQgb2ZcbiAgICAvLyBjb25zb2xpZGF0aW5nIHRoZW0gaW50byBgYmVjb21lYCwgc2luY2Ugb3RoZXJ3aXNlIHdlJ2QgY3JlYXRlIG5ld1xuICAgIC8vIHByb21pc2VzIHdpdGggdGhlIGxpbmVzIGBiZWNvbWUod2hhdGV2ZXIodmFsdWUpKWAuIFNlZSBlLmcuIEdILTI1Mi5cblxuICAgIGZ1bmN0aW9uIGJlY29tZShuZXdQcm9taXNlKSB7XG4gICAgICAgIHJlc29sdmVkUHJvbWlzZSA9IG5ld1Byb21pc2U7XG4gICAgICAgIHByb21pc2Uuc291cmNlID0gbmV3UHJvbWlzZTtcblxuICAgICAgICBhcnJheV9yZWR1Y2UobWVzc2FnZXMsIGZ1bmN0aW9uICh1bmRlZmluZWQsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIFEubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5ld1Byb21pc2UucHJvbWlzZURpc3BhdGNoLmFwcGx5KG5ld1Byb21pc2UsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHZvaWQgMCk7XG5cbiAgICAgICAgbWVzc2FnZXMgPSB2b2lkIDA7XG4gICAgICAgIHByb2dyZXNzTGlzdGVuZXJzID0gdm9pZCAwO1xuICAgIH1cblxuICAgIGRlZmVycmVkLnByb21pc2UgPSBwcm9taXNlO1xuICAgIGRlZmVycmVkLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHJlc29sdmVkUHJvbWlzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYmVjb21lKFEodmFsdWUpKTtcbiAgICB9O1xuXG4gICAgZGVmZXJyZWQuZnVsZmlsbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAocmVzb2x2ZWRQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBiZWNvbWUoZnVsZmlsbCh2YWx1ZSkpO1xuICAgIH07XG4gICAgZGVmZXJyZWQucmVqZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICBpZiAocmVzb2x2ZWRQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBiZWNvbWUocmVqZWN0KHJlYXNvbikpO1xuICAgIH07XG4gICAgZGVmZXJyZWQubm90aWZ5ID0gZnVuY3Rpb24gKHByb2dyZXNzKSB7XG4gICAgICAgIGlmIChyZXNvbHZlZFByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFycmF5X3JlZHVjZShwcm9ncmVzc0xpc3RlbmVycywgZnVuY3Rpb24gKHVuZGVmaW5lZCwgcHJvZ3Jlc3NMaXN0ZW5lcikge1xuICAgICAgICAgICAgUS5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NMaXN0ZW5lcihwcm9ncmVzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdm9pZCAwKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRlZmVycmVkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBOb2RlLXN0eWxlIGNhbGxiYWNrIHRoYXQgd2lsbCByZXNvbHZlIG9yIHJlamVjdCB0aGUgZGVmZXJyZWRcbiAqIHByb21pc2UuXG4gKiBAcmV0dXJucyBhIG5vZGViYWNrXG4gKi9cbmRlZmVyLnByb3RvdHlwZS5tYWtlTm9kZVJlc29sdmVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gKGVycm9yLCB2YWx1ZSkge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNlbGYucmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgc2VsZi5yZXNvbHZlKGFycmF5X3NsaWNlKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5yZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG4vKipcbiAqIEBwYXJhbSByZXNvbHZlciB7RnVuY3Rpb259IGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIG5vdGhpbmcgYW5kIGFjY2VwdHNcbiAqIHRoZSByZXNvbHZlLCByZWplY3QsIGFuZCBub3RpZnkgZnVuY3Rpb25zIGZvciBhIGRlZmVycmVkLlxuICogQHJldHVybnMgYSBwcm9taXNlIHRoYXQgbWF5IGJlIHJlc29sdmVkIHdpdGggdGhlIGdpdmVuIHJlc29sdmUgYW5kIHJlamVjdFxuICogZnVuY3Rpb25zLCBvciByZWplY3RlZCBieSBhIHRocm93biBleGNlcHRpb24gaW4gcmVzb2x2ZXJcbiAqL1xuUS5Qcm9taXNlID0gcHJvbWlzZTsgLy8gRVM2XG5RLnByb21pc2UgPSBwcm9taXNlO1xuZnVuY3Rpb24gcHJvbWlzZShyZXNvbHZlcikge1xuICAgIGlmICh0eXBlb2YgcmVzb2x2ZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwicmVzb2x2ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uLlwiKTtcbiAgICB9XG4gICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICB0cnkge1xuICAgICAgICByZXNvbHZlcihkZWZlcnJlZC5yZXNvbHZlLCBkZWZlcnJlZC5yZWplY3QsIGRlZmVycmVkLm5vdGlmeSk7XG4gICAgfSBjYXRjaCAocmVhc29uKSB7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdChyZWFzb24pO1xuICAgIH1cbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn1cblxucHJvbWlzZS5yYWNlID0gcmFjZTsgLy8gRVM2XG5wcm9taXNlLmFsbCA9IGFsbDsgLy8gRVM2XG5wcm9taXNlLnJlamVjdCA9IHJlamVjdDsgLy8gRVM2XG5wcm9taXNlLnJlc29sdmUgPSBROyAvLyBFUzZcblxuLy8gWFhYIGV4cGVyaW1lbnRhbC4gIFRoaXMgbWV0aG9kIGlzIGEgd2F5IHRvIGRlbm90ZSB0aGF0IGEgbG9jYWwgdmFsdWUgaXNcbi8vIHNlcmlhbGl6YWJsZSBhbmQgc2hvdWxkIGJlIGltbWVkaWF0ZWx5IGRpc3BhdGNoZWQgdG8gYSByZW1vdGUgdXBvbiByZXF1ZXN0LFxuLy8gaW5zdGVhZCBvZiBwYXNzaW5nIGEgcmVmZXJlbmNlLlxuUS5wYXNzQnlDb3B5ID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIC8vZnJlZXplKG9iamVjdCk7XG4gICAgLy9wYXNzQnlDb3BpZXMuc2V0KG9iamVjdCwgdHJ1ZSk7XG4gICAgcmV0dXJuIG9iamVjdDtcbn07XG5cblByb21pc2UucHJvdG90eXBlLnBhc3NCeUNvcHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy9mcmVlemUob2JqZWN0KTtcbiAgICAvL3Bhc3NCeUNvcGllcy5zZXQob2JqZWN0LCB0cnVlKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogSWYgdHdvIHByb21pc2VzIGV2ZW50dWFsbHkgZnVsZmlsbCB0byB0aGUgc2FtZSB2YWx1ZSwgcHJvbWlzZXMgdGhhdCB2YWx1ZSxcbiAqIGJ1dCBvdGhlcndpc2UgcmVqZWN0cy5cbiAqIEBwYXJhbSB4IHtBbnkqfVxuICogQHBhcmFtIHkge0FueSp9XG4gKiBAcmV0dXJucyB7QW55Kn0gYSBwcm9taXNlIGZvciB4IGFuZCB5IGlmIHRoZXkgYXJlIHRoZSBzYW1lLCBidXQgYSByZWplY3Rpb25cbiAqIG90aGVyd2lzZS5cbiAqXG4gKi9cblEuam9pbiA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgcmV0dXJuIFEoeCkuam9pbih5KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmpvaW4gPSBmdW5jdGlvbiAodGhhdCkge1xuICAgIHJldHVybiBRKFt0aGlzLCB0aGF0XSkuc3ByZWFkKGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBcIj09PVwiIHNob3VsZCBiZSBPYmplY3QuaXMgb3IgZXF1aXZcbiAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3Qgam9pbjogbm90IHRoZSBzYW1lOiBcIiArIHggKyBcIiBcIiArIHkpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwcm9taXNlIGZvciB0aGUgZmlyc3Qgb2YgYW4gYXJyYXkgb2YgcHJvbWlzZXMgdG8gYmVjb21lIHNldHRsZWQuXG4gKiBAcGFyYW0gYW5zd2VycyB7QXJyYXlbQW55Kl19IHByb21pc2VzIHRvIHJhY2VcbiAqIEByZXR1cm5zIHtBbnkqfSB0aGUgZmlyc3QgcHJvbWlzZSB0byBiZSBzZXR0bGVkXG4gKi9cblEucmFjZSA9IHJhY2U7XG5mdW5jdGlvbiByYWNlKGFuc3dlclBzKSB7XG4gICAgcmV0dXJuIHByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAvLyBTd2l0Y2ggdG8gdGhpcyBvbmNlIHdlIGNhbiBhc3N1bWUgYXQgbGVhc3QgRVM1XG4gICAgICAgIC8vIGFuc3dlclBzLmZvckVhY2goZnVuY3Rpb24gKGFuc3dlclApIHtcbiAgICAgICAgLy8gICAgIFEoYW5zd2VyUCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gVXNlIHRoaXMgaW4gdGhlIG1lYW50aW1lXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhbnN3ZXJQcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgUShhbnN3ZXJQc1tpXSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cblByb21pc2UucHJvdG90eXBlLnJhY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbihRLnJhY2UpO1xufTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGEgUHJvbWlzZSB3aXRoIGEgcHJvbWlzZSBkZXNjcmlwdG9yIG9iamVjdCBhbmQgb3B0aW9uYWwgZmFsbGJhY2tcbiAqIGZ1bmN0aW9uLiAgVGhlIGRlc2NyaXB0b3IgY29udGFpbnMgbWV0aG9kcyBsaWtlIHdoZW4ocmVqZWN0ZWQpLCBnZXQobmFtZSksXG4gKiBzZXQobmFtZSwgdmFsdWUpLCBwb3N0KG5hbWUsIGFyZ3MpLCBhbmQgZGVsZXRlKG5hbWUpLCB3aGljaCBhbGxcbiAqIHJldHVybiBlaXRoZXIgYSB2YWx1ZSwgYSBwcm9taXNlIGZvciBhIHZhbHVlLCBvciBhIHJlamVjdGlvbi4gIFRoZSBmYWxsYmFja1xuICogYWNjZXB0cyB0aGUgb3BlcmF0aW9uIG5hbWUsIGEgcmVzb2x2ZXIsIGFuZCBhbnkgZnVydGhlciBhcmd1bWVudHMgdGhhdCB3b3VsZFxuICogaGF2ZSBiZWVuIGZvcndhcmRlZCB0byB0aGUgYXBwcm9wcmlhdGUgbWV0aG9kIGFib3ZlIGhhZCBhIG1ldGhvZCBiZWVuXG4gKiBwcm92aWRlZCB3aXRoIHRoZSBwcm9wZXIgbmFtZS4gIFRoZSBBUEkgbWFrZXMgbm8gZ3VhcmFudGVlcyBhYm91dCB0aGUgbmF0dXJlXG4gKiBvZiB0aGUgcmV0dXJuZWQgb2JqZWN0LCBhcGFydCBmcm9tIHRoYXQgaXQgaXMgdXNhYmxlIHdoZXJlZXZlciBwcm9taXNlcyBhcmVcbiAqIGJvdWdodCBhbmQgc29sZC5cbiAqL1xuUS5tYWtlUHJvbWlzZSA9IFByb21pc2U7XG5mdW5jdGlvbiBQcm9taXNlKGRlc2NyaXB0b3IsIGZhbGxiYWNrLCBpbnNwZWN0KSB7XG4gICAgaWYgKGZhbGxiYWNrID09PSB2b2lkIDApIHtcbiAgICAgICAgZmFsbGJhY2sgPSBmdW5jdGlvbiAob3ApIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIFwiUHJvbWlzZSBkb2VzIG5vdCBzdXBwb3J0IG9wZXJhdGlvbjogXCIgKyBvcFxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChpbnNwZWN0ID09PSB2b2lkIDApIHtcbiAgICAgICAgaW5zcGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB7c3RhdGU6IFwidW5rbm93blwifTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgcHJvbWlzZSA9IG9iamVjdF9jcmVhdGUoUHJvbWlzZS5wcm90b3R5cGUpO1xuXG4gICAgcHJvbWlzZS5wcm9taXNlRGlzcGF0Y2ggPSBmdW5jdGlvbiAocmVzb2x2ZSwgb3AsIGFyZ3MpIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yW29wXSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRlc2NyaXB0b3Jbb3BdLmFwcGx5KHByb21pc2UsIGFyZ3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxsYmFjay5jYWxsKHByb21pc2UsIG9wLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICByZXN1bHQgPSByZWplY3QoZXhjZXB0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByb21pc2UuaW5zcGVjdCA9IGluc3BlY3Q7XG5cbiAgICAvLyBYWFggZGVwcmVjYXRlZCBgdmFsdWVPZmAgYW5kIGBleGNlcHRpb25gIHN1cHBvcnRcbiAgICBpZiAoaW5zcGVjdCkge1xuICAgICAgICB2YXIgaW5zcGVjdGVkID0gaW5zcGVjdCgpO1xuICAgICAgICBpZiAoaW5zcGVjdGVkLnN0YXRlID09PSBcInJlamVjdGVkXCIpIHtcbiAgICAgICAgICAgIHByb21pc2UuZXhjZXB0aW9uID0gaW5zcGVjdGVkLnJlYXNvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb21pc2UudmFsdWVPZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbnNwZWN0ZWQgPSBpbnNwZWN0KCk7XG4gICAgICAgICAgICBpZiAoaW5zcGVjdGVkLnN0YXRlID09PSBcInBlbmRpbmdcIiB8fFxuICAgICAgICAgICAgICAgIGluc3BlY3RlZC5zdGF0ZSA9PT0gXCJyZWplY3RlZFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5zcGVjdGVkLnZhbHVlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IFByb21pc2VdXCI7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIHByb2dyZXNzZWQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICB2YXIgZG9uZSA9IGZhbHNlOyAgIC8vIGVuc3VyZSB0aGUgdW50cnVzdGVkIHByb21pc2UgbWFrZXMgYXQgbW9zdCBhXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzaW5nbGUgY2FsbCB0byBvbmUgb2YgdGhlIGNhbGxiYWNrc1xuXG4gICAgZnVuY3Rpb24gX2Z1bGZpbGxlZCh2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBmdWxmaWxsZWQgPT09IFwiZnVuY3Rpb25cIiA/IGZ1bGZpbGxlZCh2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGV4Y2VwdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfcmVqZWN0ZWQoZXhjZXB0aW9uKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVqZWN0ZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgbWFrZVN0YWNrVHJhY2VMb25nKGV4Y2VwdGlvbiwgc2VsZik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3RlZChleGNlcHRpb24pO1xuICAgICAgICAgICAgfSBjYXRjaCAobmV3RXhjZXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXdFeGNlcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWplY3QoZXhjZXB0aW9uKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfcHJvZ3Jlc3NlZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHByb2dyZXNzZWQgPT09IFwiZnVuY3Rpb25cIiA/IHByb2dyZXNzZWQodmFsdWUpIDogdmFsdWU7XG4gICAgfVxuXG4gICAgUS5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYucHJvbWlzZURpc3BhdGNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb25lID0gdHJ1ZTtcblxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfZnVsZmlsbGVkKHZhbHVlKSk7XG4gICAgICAgIH0sIFwid2hlblwiLCBbZnVuY3Rpb24gKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb25lID0gdHJ1ZTtcblxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfcmVqZWN0ZWQoZXhjZXB0aW9uKSk7XG4gICAgICAgIH1dKTtcbiAgICB9KTtcblxuICAgIC8vIFByb2dyZXNzIHByb3BhZ2F0b3IgbmVlZCB0byBiZSBhdHRhY2hlZCBpbiB0aGUgY3VycmVudCB0aWNrLlxuICAgIHNlbGYucHJvbWlzZURpc3BhdGNoKHZvaWQgMCwgXCJ3aGVuXCIsIFt2b2lkIDAsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgbmV3VmFsdWU7XG4gICAgICAgIHZhciB0aHJldyA9IGZhbHNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSBfcHJvZ3Jlc3NlZCh2YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocmV3ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChRLm9uZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBRLm9uZXJyb3IoZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRocmV3KSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5ub3RpZnkobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59O1xuXG5RLnRhcCA9IGZ1bmN0aW9uIChwcm9taXNlLCBjYWxsYmFjaykge1xuICAgIHJldHVybiBRKHByb21pc2UpLnRhcChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIFdvcmtzIGFsbW9zdCBsaWtlIFwiZmluYWxseVwiLCBidXQgbm90IGNhbGxlZCBmb3IgcmVqZWN0aW9ucy5cbiAqIE9yaWdpbmFsIHJlc29sdXRpb24gdmFsdWUgaXMgcGFzc2VkIHRocm91Z2ggY2FsbGJhY2sgdW5hZmZlY3RlZC5cbiAqIENhbGxiYWNrIG1heSByZXR1cm4gYSBwcm9taXNlIHRoYXQgd2lsbCBiZSBhd2FpdGVkIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7US5Qcm9taXNlfVxuICogQGV4YW1wbGVcbiAqIGRvU29tZXRoaW5nKClcbiAqICAgLnRoZW4oLi4uKVxuICogICAudGFwKGNvbnNvbGUubG9nKVxuICogICAudGhlbiguLi4pO1xuICovXG5Qcm9taXNlLnByb3RvdHlwZS50YXAgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayA9IFEoY2FsbGJhY2spO1xuXG4gICAgcmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmZjYWxsKHZhbHVlKS50aGVuUmVzb2x2ZSh2YWx1ZSk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFJlZ2lzdGVycyBhbiBvYnNlcnZlciBvbiBhIHByb21pc2UuXG4gKlxuICogR3VhcmFudGVlczpcbiAqXG4gKiAxLiB0aGF0IGZ1bGZpbGxlZCBhbmQgcmVqZWN0ZWQgd2lsbCBiZSBjYWxsZWQgb25seSBvbmNlLlxuICogMi4gdGhhdCBlaXRoZXIgdGhlIGZ1bGZpbGxlZCBjYWxsYmFjayBvciB0aGUgcmVqZWN0ZWQgY2FsbGJhY2sgd2lsbCBiZVxuICogICAgY2FsbGVkLCBidXQgbm90IGJvdGguXG4gKiAzLiB0aGF0IGZ1bGZpbGxlZCBhbmQgcmVqZWN0ZWQgd2lsbCBub3QgYmUgY2FsbGVkIGluIHRoaXMgdHVybi5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgICAgICBwcm9taXNlIG9yIGltbWVkaWF0ZSByZWZlcmVuY2UgdG8gb2JzZXJ2ZVxuICogQHBhcmFtIGZ1bGZpbGxlZCAgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdpdGggdGhlIGZ1bGZpbGxlZCB2YWx1ZVxuICogQHBhcmFtIHJlamVjdGVkICAgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdpdGggdGhlIHJlamVjdGlvbiBleGNlcHRpb25cbiAqIEBwYXJhbSBwcm9ncmVzc2VkIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBhbnkgcHJvZ3Jlc3Mgbm90aWZpY2F0aW9uc1xuICogQHJldHVybiBwcm9taXNlIGZvciB0aGUgcmV0dXJuIHZhbHVlIGZyb20gdGhlIGludm9rZWQgY2FsbGJhY2tcbiAqL1xuUS53aGVuID0gd2hlbjtcbmZ1bmN0aW9uIHdoZW4odmFsdWUsIGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIHByb2dyZXNzZWQpIHtcbiAgICByZXR1cm4gUSh2YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkLCBwcm9ncmVzc2VkKTtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUudGhlblJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbHVlOyB9KTtcbn07XG5cblEudGhlblJlc29sdmUgPSBmdW5jdGlvbiAocHJvbWlzZSwgdmFsdWUpIHtcbiAgICByZXR1cm4gUShwcm9taXNlKS50aGVuUmVzb2x2ZSh2YWx1ZSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS50aGVuUmVqZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIHJldHVybiB0aGlzLnRoZW4oZnVuY3Rpb24gKCkgeyB0aHJvdyByZWFzb247IH0pO1xufTtcblxuUS50aGVuUmVqZWN0ID0gZnVuY3Rpb24gKHByb21pc2UsIHJlYXNvbikge1xuICAgIHJldHVybiBRKHByb21pc2UpLnRoZW5SZWplY3QocmVhc29uKTtcbn07XG5cbi8qKlxuICogSWYgYW4gb2JqZWN0IGlzIG5vdCBhIHByb21pc2UsIGl0IGlzIGFzIFwibmVhclwiIGFzIHBvc3NpYmxlLlxuICogSWYgYSBwcm9taXNlIGlzIHJlamVjdGVkLCBpdCBpcyBhcyBcIm5lYXJcIiBhcyBwb3NzaWJsZSB0b28uXG4gKiBJZiBpdOKAmXMgYSBmdWxmaWxsZWQgcHJvbWlzZSwgdGhlIGZ1bGZpbGxtZW50IHZhbHVlIGlzIG5lYXJlci5cbiAqIElmIGl04oCZcyBhIGRlZmVycmVkIHByb21pc2UgYW5kIHRoZSBkZWZlcnJlZCBoYXMgYmVlbiByZXNvbHZlZCwgdGhlXG4gKiByZXNvbHV0aW9uIGlzIFwibmVhcmVyXCIuXG4gKiBAcGFyYW0gb2JqZWN0XG4gKiBAcmV0dXJucyBtb3N0IHJlc29sdmVkIChuZWFyZXN0KSBmb3JtIG9mIHRoZSBvYmplY3RcbiAqL1xuXG4vLyBYWFggc2hvdWxkIHdlIHJlLWRvIHRoaXM/XG5RLm5lYXJlciA9IG5lYXJlcjtcbmZ1bmN0aW9uIG5lYXJlcih2YWx1ZSkge1xuICAgIGlmIChpc1Byb21pc2UodmFsdWUpKSB7XG4gICAgICAgIHZhciBpbnNwZWN0ZWQgPSB2YWx1ZS5pbnNwZWN0KCk7XG4gICAgICAgIGlmIChpbnNwZWN0ZWQuc3RhdGUgPT09IFwiZnVsZmlsbGVkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnNwZWN0ZWQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBhIHByb21pc2UuXG4gKiBPdGhlcndpc2UgaXQgaXMgYSBmdWxmaWxsZWQgdmFsdWUuXG4gKi9cblEuaXNQcm9taXNlID0gaXNQcm9taXNlO1xuZnVuY3Rpb24gaXNQcm9taXNlKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiBQcm9taXNlO1xufVxuXG5RLmlzUHJvbWlzZUFsaWtlID0gaXNQcm9taXNlQWxpa2U7XG5mdW5jdGlvbiBpc1Byb21pc2VBbGlrZShvYmplY3QpIHtcbiAgICByZXR1cm4gaXNPYmplY3Qob2JqZWN0KSAmJiB0eXBlb2Ygb2JqZWN0LnRoZW4gPT09IFwiZnVuY3Rpb25cIjtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaXMgYSBwZW5kaW5nIHByb21pc2UsIG1lYW5pbmcgbm90XG4gKiBmdWxmaWxsZWQgb3IgcmVqZWN0ZWQuXG4gKi9cblEuaXNQZW5kaW5nID0gaXNQZW5kaW5nO1xuZnVuY3Rpb24gaXNQZW5kaW5nKG9iamVjdCkge1xuICAgIHJldHVybiBpc1Byb21pc2Uob2JqZWN0KSAmJiBvYmplY3QuaW5zcGVjdCgpLnN0YXRlID09PSBcInBlbmRpbmdcIjtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUuaXNQZW5kaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmluc3BlY3QoKS5zdGF0ZSA9PT0gXCJwZW5kaW5nXCI7XG59O1xuXG4vKipcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBhIHZhbHVlIG9yIGZ1bGZpbGxlZFxuICogcHJvbWlzZS5cbiAqL1xuUS5pc0Z1bGZpbGxlZCA9IGlzRnVsZmlsbGVkO1xuZnVuY3Rpb24gaXNGdWxmaWxsZWQob2JqZWN0KSB7XG4gICAgcmV0dXJuICFpc1Byb21pc2Uob2JqZWN0KSB8fCBvYmplY3QuaW5zcGVjdCgpLnN0YXRlID09PSBcImZ1bGZpbGxlZFwiO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5pc0Z1bGZpbGxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnNwZWN0KCkuc3RhdGUgPT09IFwiZnVsZmlsbGVkXCI7XG59O1xuXG4vKipcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBhIHJlamVjdGVkIHByb21pc2UuXG4gKi9cblEuaXNSZWplY3RlZCA9IGlzUmVqZWN0ZWQ7XG5mdW5jdGlvbiBpc1JlamVjdGVkKG9iamVjdCkge1xuICAgIHJldHVybiBpc1Byb21pc2Uob2JqZWN0KSAmJiBvYmplY3QuaW5zcGVjdCgpLnN0YXRlID09PSBcInJlamVjdGVkXCI7XG59XG5cblByb21pc2UucHJvdG90eXBlLmlzUmVqZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zcGVjdCgpLnN0YXRlID09PSBcInJlamVjdGVkXCI7XG59O1xuXG4vLy8vIEJFR0lOIFVOSEFORExFRCBSRUpFQ1RJT04gVFJBQ0tJTkdcblxuLy8gVGhpcyBwcm9taXNlIGxpYnJhcnkgY29uc3VtZXMgZXhjZXB0aW9ucyB0aHJvd24gaW4gaGFuZGxlcnMgc28gdGhleSBjYW4gYmVcbi8vIGhhbmRsZWQgYnkgYSBzdWJzZXF1ZW50IHByb21pc2UuICBUaGUgZXhjZXB0aW9ucyBnZXQgYWRkZWQgdG8gdGhpcyBhcnJheSB3aGVuXG4vLyB0aGV5IGFyZSBjcmVhdGVkLCBhbmQgcmVtb3ZlZCB3aGVuIHRoZXkgYXJlIGhhbmRsZWQuICBOb3RlIHRoYXQgaW4gRVM2IG9yXG4vLyBzaGltbWVkIGVudmlyb25tZW50cywgdGhpcyB3b3VsZCBuYXR1cmFsbHkgYmUgYSBgU2V0YC5cbnZhciB1bmhhbmRsZWRSZWFzb25zID0gW107XG52YXIgdW5oYW5kbGVkUmVqZWN0aW9ucyA9IFtdO1xudmFyIHJlcG9ydGVkVW5oYW5kbGVkUmVqZWN0aW9ucyA9IFtdO1xudmFyIHRyYWNrVW5oYW5kbGVkUmVqZWN0aW9ucyA9IHRydWU7XG5cbmZ1bmN0aW9uIHJlc2V0VW5oYW5kbGVkUmVqZWN0aW9ucygpIHtcbiAgICB1bmhhbmRsZWRSZWFzb25zLmxlbmd0aCA9IDA7XG4gICAgdW5oYW5kbGVkUmVqZWN0aW9ucy5sZW5ndGggPSAwO1xuXG4gICAgaWYgKCF0cmFja1VuaGFuZGxlZFJlamVjdGlvbnMpIHtcbiAgICAgICAgdHJhY2tVbmhhbmRsZWRSZWplY3Rpb25zID0gdHJ1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRyYWNrUmVqZWN0aW9uKHByb21pc2UsIHJlYXNvbikge1xuICAgIGlmICghdHJhY2tVbmhhbmRsZWRSZWplY3Rpb25zKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBwcm9jZXNzLmVtaXQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBRLm5leHRUaWNrLnJ1bkFmdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChhcnJheV9pbmRleE9mKHVuaGFuZGxlZFJlamVjdGlvbnMsIHByb21pc2UpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3MuZW1pdChcInVuaGFuZGxlZFJlamVjdGlvblwiLCByZWFzb24sIHByb21pc2UpO1xuICAgICAgICAgICAgICAgIHJlcG9ydGVkVW5oYW5kbGVkUmVqZWN0aW9ucy5wdXNoKHByb21pc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1bmhhbmRsZWRSZWplY3Rpb25zLnB1c2gocHJvbWlzZSk7XG4gICAgaWYgKHJlYXNvbiAmJiB0eXBlb2YgcmVhc29uLnN0YWNrICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHVuaGFuZGxlZFJlYXNvbnMucHVzaChyZWFzb24uc3RhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHVuaGFuZGxlZFJlYXNvbnMucHVzaChcIihubyBzdGFjaykgXCIgKyByZWFzb24pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdW50cmFja1JlamVjdGlvbihwcm9taXNlKSB7XG4gICAgaWYgKCF0cmFja1VuaGFuZGxlZFJlamVjdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBhdCA9IGFycmF5X2luZGV4T2YodW5oYW5kbGVkUmVqZWN0aW9ucywgcHJvbWlzZSk7XG4gICAgaWYgKGF0ICE9PSAtMSkge1xuICAgICAgICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHByb2Nlc3MuZW1pdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBRLm5leHRUaWNrLnJ1bkFmdGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXRSZXBvcnQgPSBhcnJheV9pbmRleE9mKHJlcG9ydGVkVW5oYW5kbGVkUmVqZWN0aW9ucywgcHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgaWYgKGF0UmVwb3J0ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLmVtaXQoXCJyZWplY3Rpb25IYW5kbGVkXCIsIHVuaGFuZGxlZFJlYXNvbnNbYXRdLCBwcm9taXNlKTtcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0ZWRVbmhhbmRsZWRSZWplY3Rpb25zLnNwbGljZShhdFJlcG9ydCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdW5oYW5kbGVkUmVqZWN0aW9ucy5zcGxpY2UoYXQsIDEpO1xuICAgICAgICB1bmhhbmRsZWRSZWFzb25zLnNwbGljZShhdCwgMSk7XG4gICAgfVxufVxuXG5RLnJlc2V0VW5oYW5kbGVkUmVqZWN0aW9ucyA9IHJlc2V0VW5oYW5kbGVkUmVqZWN0aW9ucztcblxuUS5nZXRVbmhhbmRsZWRSZWFzb25zID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIE1ha2UgYSBjb3B5IHNvIHRoYXQgY29uc3VtZXJzIGNhbid0IGludGVyZmVyZSB3aXRoIG91ciBpbnRlcm5hbCBzdGF0ZS5cbiAgICByZXR1cm4gdW5oYW5kbGVkUmVhc29ucy5zbGljZSgpO1xufTtcblxuUS5zdG9wVW5oYW5kbGVkUmVqZWN0aW9uVHJhY2tpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmVzZXRVbmhhbmRsZWRSZWplY3Rpb25zKCk7XG4gICAgdHJhY2tVbmhhbmRsZWRSZWplY3Rpb25zID0gZmFsc2U7XG59O1xuXG5yZXNldFVuaGFuZGxlZFJlamVjdGlvbnMoKTtcblxuLy8vLyBFTkQgVU5IQU5ETEVEIFJFSkVDVElPTiBUUkFDS0lOR1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYSByZWplY3RlZCBwcm9taXNlLlxuICogQHBhcmFtIHJlYXNvbiB2YWx1ZSBkZXNjcmliaW5nIHRoZSBmYWlsdXJlXG4gKi9cblEucmVqZWN0ID0gcmVqZWN0O1xuZnVuY3Rpb24gcmVqZWN0KHJlYXNvbikge1xuICAgIHZhciByZWplY3Rpb24gPSBQcm9taXNlKHtcbiAgICAgICAgXCJ3aGVuXCI6IGZ1bmN0aW9uIChyZWplY3RlZCkge1xuICAgICAgICAgICAgLy8gbm90ZSB0aGF0IHRoZSBlcnJvciBoYXMgYmVlbiBoYW5kbGVkXG4gICAgICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB1bnRyYWNrUmVqZWN0aW9uKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlamVjdGVkID8gcmVqZWN0ZWQocmVhc29uKSA6IHRoaXM7XG4gICAgICAgIH1cbiAgICB9LCBmdW5jdGlvbiBmYWxsYmFjaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgZnVuY3Rpb24gaW5zcGVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhdGU6IFwicmVqZWN0ZWRcIiwgcmVhc29uOiByZWFzb24gfTtcbiAgICB9KTtcblxuICAgIC8vIE5vdGUgdGhhdCB0aGUgcmVhc29uIGhhcyBub3QgYmVlbiBoYW5kbGVkLlxuICAgIHRyYWNrUmVqZWN0aW9uKHJlamVjdGlvbiwgcmVhc29uKTtcblxuICAgIHJldHVybiByZWplY3Rpb247XG59XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIGZ1bGZpbGxlZCBwcm9taXNlIGZvciBhbiBpbW1lZGlhdGUgcmVmZXJlbmNlLlxuICogQHBhcmFtIHZhbHVlIGltbWVkaWF0ZSByZWZlcmVuY2VcbiAqL1xuUS5mdWxmaWxsID0gZnVsZmlsbDtcbmZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHtcbiAgICByZXR1cm4gUHJvbWlzZSh7XG4gICAgICAgIFwid2hlblwiOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIFwiZ2V0XCI6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVbbmFtZV07XG4gICAgICAgIH0sXG4gICAgICAgIFwic2V0XCI6IGZ1bmN0aW9uIChuYW1lLCByaHMpIHtcbiAgICAgICAgICAgIHZhbHVlW25hbWVdID0gcmhzO1xuICAgICAgICB9LFxuICAgICAgICBcImRlbGV0ZVwiOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgZGVsZXRlIHZhbHVlW25hbWVdO1xuICAgICAgICB9LFxuICAgICAgICBcInBvc3RcIjogZnVuY3Rpb24gKG5hbWUsIGFyZ3MpIHtcbiAgICAgICAgICAgIC8vIE1hcmsgTWlsbGVyIHByb3Bvc2VzIHRoYXQgcG9zdCB3aXRoIG5vIG5hbWUgc2hvdWxkIGFwcGx5IGFcbiAgICAgICAgICAgIC8vIHByb21pc2VkIGZ1bmN0aW9uLlxuICAgICAgICAgICAgaWYgKG5hbWUgPT09IG51bGwgfHwgbmFtZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmFwcGx5KHZvaWQgMCwgYXJncyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVtuYW1lXS5hcHBseSh2YWx1ZSwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYXBwbHlcIjogZnVuY3Rpb24gKHRoaXNwLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuYXBwbHkodGhpc3AsIGFyZ3MpO1xuICAgICAgICB9LFxuICAgICAgICBcImtleXNcIjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdF9rZXlzKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0sIHZvaWQgMCwgZnVuY3Rpb24gaW5zcGVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhdGU6IFwiZnVsZmlsbGVkXCIsIHZhbHVlOiB2YWx1ZSB9O1xuICAgIH0pO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoZW5hYmxlcyB0byBRIHByb21pc2VzLlxuICogQHBhcmFtIHByb21pc2UgdGhlbmFibGUgcHJvbWlzZVxuICogQHJldHVybnMgYSBRIHByb21pc2VcbiAqL1xuZnVuY3Rpb24gY29lcmNlKHByb21pc2UpIHtcbiAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgIFEubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGRlZmVycmVkLnJlc29sdmUsIGRlZmVycmVkLnJlamVjdCwgZGVmZXJyZWQubm90aWZ5KTtcbiAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXhjZXB0aW9uKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufVxuXG4vKipcbiAqIEFubm90YXRlcyBhbiBvYmplY3Qgc3VjaCB0aGF0IGl0IHdpbGwgbmV2ZXIgYmVcbiAqIHRyYW5zZmVycmVkIGF3YXkgZnJvbSB0aGlzIHByb2Nlc3Mgb3ZlciBhbnkgcHJvbWlzZVxuICogY29tbXVuaWNhdGlvbiBjaGFubmVsLlxuICogQHBhcmFtIG9iamVjdFxuICogQHJldHVybnMgcHJvbWlzZSBhIHdyYXBwaW5nIG9mIHRoYXQgb2JqZWN0IHRoYXRcbiAqIGFkZGl0aW9uYWxseSByZXNwb25kcyB0byB0aGUgXCJpc0RlZlwiIG1lc3NhZ2VcbiAqIHdpdGhvdXQgYSByZWplY3Rpb24uXG4gKi9cblEubWFzdGVyID0gbWFzdGVyO1xuZnVuY3Rpb24gbWFzdGVyKG9iamVjdCkge1xuICAgIHJldHVybiBQcm9taXNlKHtcbiAgICAgICAgXCJpc0RlZlwiOiBmdW5jdGlvbiAoKSB7fVxuICAgIH0sIGZ1bmN0aW9uIGZhbGxiYWNrKG9wLCBhcmdzKSB7XG4gICAgICAgIHJldHVybiBkaXNwYXRjaChvYmplY3QsIG9wLCBhcmdzKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBRKG9iamVjdCkuaW5zcGVjdCgpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIFNwcmVhZHMgdGhlIHZhbHVlcyBvZiBhIHByb21pc2VkIGFycmF5IG9mIGFyZ3VtZW50cyBpbnRvIHRoZVxuICogZnVsZmlsbG1lbnQgY2FsbGJhY2suXG4gKiBAcGFyYW0gZnVsZmlsbGVkIGNhbGxiYWNrIHRoYXQgcmVjZWl2ZXMgdmFyaWFkaWMgYXJndW1lbnRzIGZyb20gdGhlXG4gKiBwcm9taXNlZCBhcnJheVxuICogQHBhcmFtIHJlamVjdGVkIGNhbGxiYWNrIHRoYXQgcmVjZWl2ZXMgdGhlIGV4Y2VwdGlvbiBpZiB0aGUgcHJvbWlzZVxuICogaXMgcmVqZWN0ZWQuXG4gKiBAcmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSByZXR1cm4gdmFsdWUgb3IgdGhyb3duIGV4Y2VwdGlvbiBvZlxuICogZWl0aGVyIGNhbGxiYWNrLlxuICovXG5RLnNwcmVhZCA9IHNwcmVhZDtcbmZ1bmN0aW9uIHNwcmVhZCh2YWx1ZSwgZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICAgIHJldHVybiBRKHZhbHVlKS5zcHJlYWQoZnVsZmlsbGVkLCByZWplY3RlZCk7XG59XG5cblByb21pc2UucHJvdG90eXBlLnNwcmVhZCA9IGZ1bmN0aW9uIChmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxsKCkudGhlbihmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGZ1bGZpbGxlZC5hcHBseSh2b2lkIDAsIGFycmF5KTtcbiAgICB9LCByZWplY3RlZCk7XG59O1xuXG4vKipcbiAqIFRoZSBhc3luYyBmdW5jdGlvbiBpcyBhIGRlY29yYXRvciBmb3IgZ2VuZXJhdG9yIGZ1bmN0aW9ucywgdHVybmluZ1xuICogdGhlbSBpbnRvIGFzeW5jaHJvbm91cyBnZW5lcmF0b3JzLiAgQWx0aG91Z2ggZ2VuZXJhdG9ycyBhcmUgb25seSBwYXJ0XG4gKiBvZiB0aGUgbmV3ZXN0IEVDTUFTY3JpcHQgNiBkcmFmdHMsIHRoaXMgY29kZSBkb2VzIG5vdCBjYXVzZSBzeW50YXhcbiAqIGVycm9ycyBpbiBvbGRlciBlbmdpbmVzLiAgVGhpcyBjb2RlIHNob3VsZCBjb250aW51ZSB0byB3b3JrIGFuZCB3aWxsXG4gKiBpbiBmYWN0IGltcHJvdmUgb3ZlciB0aW1lIGFzIHRoZSBsYW5ndWFnZSBpbXByb3Zlcy5cbiAqXG4gKiBFUzYgZ2VuZXJhdG9ycyBhcmUgY3VycmVudGx5IHBhcnQgb2YgVjggdmVyc2lvbiAzLjE5IHdpdGggdGhlXG4gKiAtLWhhcm1vbnktZ2VuZXJhdG9ycyBydW50aW1lIGZsYWcgZW5hYmxlZC4gIFNwaWRlck1vbmtleSBoYXMgaGFkIHRoZW1cbiAqIGZvciBsb25nZXIsIGJ1dCB1bmRlciBhbiBvbGRlciBQeXRob24taW5zcGlyZWQgZm9ybS4gIFRoaXMgZnVuY3Rpb25cbiAqIHdvcmtzIG9uIGJvdGgga2luZHMgb2YgZ2VuZXJhdG9ycy5cbiAqXG4gKiBEZWNvcmF0ZXMgYSBnZW5lcmF0b3IgZnVuY3Rpb24gc3VjaCB0aGF0OlxuICogIC0gaXQgbWF5IHlpZWxkIHByb21pc2VzXG4gKiAgLSBleGVjdXRpb24gd2lsbCBjb250aW51ZSB3aGVuIHRoYXQgcHJvbWlzZSBpcyBmdWxmaWxsZWRcbiAqICAtIHRoZSB2YWx1ZSBvZiB0aGUgeWllbGQgZXhwcmVzc2lvbiB3aWxsIGJlIHRoZSBmdWxmaWxsZWQgdmFsdWVcbiAqICAtIGl0IHJldHVybnMgYSBwcm9taXNlIGZvciB0aGUgcmV0dXJuIHZhbHVlICh3aGVuIHRoZSBnZW5lcmF0b3JcbiAqICAgIHN0b3BzIGl0ZXJhdGluZylcbiAqICAtIHRoZSBkZWNvcmF0ZWQgZnVuY3Rpb24gcmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSByZXR1cm4gdmFsdWVcbiAqICAgIG9mIHRoZSBnZW5lcmF0b3Igb3IgdGhlIGZpcnN0IHJlamVjdGVkIHByb21pc2UgYW1vbmcgdGhvc2VcbiAqICAgIHlpZWxkZWQuXG4gKiAgLSBpZiBhbiBlcnJvciBpcyB0aHJvd24gaW4gdGhlIGdlbmVyYXRvciwgaXQgcHJvcGFnYXRlcyB0aHJvdWdoXG4gKiAgICBldmVyeSBmb2xsb3dpbmcgeWllbGQgdW50aWwgaXQgaXMgY2F1Z2h0LCBvciB1bnRpbCBpdCBlc2NhcGVzXG4gKiAgICB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGFsdG9nZXRoZXIsIGFuZCBpcyB0cmFuc2xhdGVkIGludG8gYVxuICogICAgcmVqZWN0aW9uIGZvciB0aGUgcHJvbWlzZSByZXR1cm5lZCBieSB0aGUgZGVjb3JhdGVkIGdlbmVyYXRvci5cbiAqL1xuUS5hc3luYyA9IGFzeW5jO1xuZnVuY3Rpb24gYXN5bmMobWFrZUdlbmVyYXRvcikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHdoZW4gdmVyYiBpcyBcInNlbmRcIiwgYXJnIGlzIGEgdmFsdWVcbiAgICAgICAgLy8gd2hlbiB2ZXJiIGlzIFwidGhyb3dcIiwgYXJnIGlzIGFuIGV4Y2VwdGlvblxuICAgICAgICBmdW5jdGlvbiBjb250aW51ZXIodmVyYiwgYXJnKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICAgICAgICAvLyBVbnRpbCBWOCAzLjE5IC8gQ2hyb21pdW0gMjkgaXMgcmVsZWFzZWQsIFNwaWRlck1vbmtleSBpcyB0aGUgb25seVxuICAgICAgICAgICAgLy8gZW5naW5lIHRoYXQgaGFzIGEgZGVwbG95ZWQgYmFzZSBvZiBicm93c2VycyB0aGF0IHN1cHBvcnQgZ2VuZXJhdG9ycy5cbiAgICAgICAgICAgIC8vIEhvd2V2ZXIsIFNNJ3MgZ2VuZXJhdG9ycyB1c2UgdGhlIFB5dGhvbi1pbnNwaXJlZCBzZW1hbnRpY3Mgb2ZcbiAgICAgICAgICAgIC8vIG91dGRhdGVkIEVTNiBkcmFmdHMuICBXZSB3b3VsZCBsaWtlIHRvIHN1cHBvcnQgRVM2LCBidXQgd2UnZCBhbHNvXG4gICAgICAgICAgICAvLyBsaWtlIHRvIG1ha2UgaXQgcG9zc2libGUgdG8gdXNlIGdlbmVyYXRvcnMgaW4gZGVwbG95ZWQgYnJvd3NlcnMsIHNvXG4gICAgICAgICAgICAvLyB3ZSBhbHNvIHN1cHBvcnQgUHl0aG9uLXN0eWxlIGdlbmVyYXRvcnMuICBBdCBzb21lIHBvaW50IHdlIGNhbiByZW1vdmVcbiAgICAgICAgICAgIC8vIHRoaXMgYmxvY2suXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgU3RvcEl0ZXJhdGlvbiA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIC8vIEVTNiBHZW5lcmF0b3JzXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZ2VuZXJhdG9yW3ZlcmJdKGFyZyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXhjZXB0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBRKHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdoZW4ocmVzdWx0LnZhbHVlLCBjYWxsYmFjaywgZXJyYmFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBTcGlkZXJNb25rZXkgR2VuZXJhdG9yc1xuICAgICAgICAgICAgICAgIC8vIEZJWE1FOiBSZW1vdmUgdGhpcyBjYXNlIHdoZW4gU00gZG9lcyBFUzYgZ2VuZXJhdG9ycy5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0oYXJnKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzU3RvcEl0ZXJhdGlvbihleGNlcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUShleGNlcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChleGNlcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB3aGVuKHJlc3VsdCwgY2FsbGJhY2ssIGVycmJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBnZW5lcmF0b3IgPSBtYWtlR2VuZXJhdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGNvbnRpbnVlci5iaW5kKGNvbnRpbnVlciwgXCJuZXh0XCIpO1xuICAgICAgICB2YXIgZXJyYmFjayA9IGNvbnRpbnVlci5iaW5kKGNvbnRpbnVlciwgXCJ0aHJvd1wiKTtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBUaGUgc3Bhd24gZnVuY3Rpb24gaXMgYSBzbWFsbCB3cmFwcGVyIGFyb3VuZCBhc3luYyB0aGF0IGltbWVkaWF0ZWx5XG4gKiBjYWxscyB0aGUgZ2VuZXJhdG9yIGFuZCBhbHNvIGVuZHMgdGhlIHByb21pc2UgY2hhaW4sIHNvIHRoYXQgYW55XG4gKiB1bmhhbmRsZWQgZXJyb3JzIGFyZSB0aHJvd24gaW5zdGVhZCBvZiBmb3J3YXJkZWQgdG8gdGhlIGVycm9yXG4gKiBoYW5kbGVyLiBUaGlzIGlzIHVzZWZ1bCBiZWNhdXNlIGl0J3MgZXh0cmVtZWx5IGNvbW1vbiB0byBydW5cbiAqIGdlbmVyYXRvcnMgYXQgdGhlIHRvcC1sZXZlbCB0byB3b3JrIHdpdGggbGlicmFyaWVzLlxuICovXG5RLnNwYXduID0gc3Bhd247XG5mdW5jdGlvbiBzcGF3bihtYWtlR2VuZXJhdG9yKSB7XG4gICAgUS5kb25lKFEuYXN5bmMobWFrZUdlbmVyYXRvcikoKSk7XG59XG5cbi8vIEZJWE1FOiBSZW1vdmUgdGhpcyBpbnRlcmZhY2Ugb25jZSBFUzYgZ2VuZXJhdG9ycyBhcmUgaW4gU3BpZGVyTW9ua2V5LlxuLyoqXG4gKiBUaHJvd3MgYSBSZXR1cm5WYWx1ZSBleGNlcHRpb24gdG8gc3RvcCBhbiBhc3luY2hyb25vdXMgZ2VuZXJhdG9yLlxuICpcbiAqIFRoaXMgaW50ZXJmYWNlIGlzIGEgc3RvcC1nYXAgbWVhc3VyZSB0byBzdXBwb3J0IGdlbmVyYXRvciByZXR1cm5cbiAqIHZhbHVlcyBpbiBvbGRlciBGaXJlZm94L1NwaWRlck1vbmtleS4gIEluIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBFUzZcbiAqIGdlbmVyYXRvcnMgbGlrZSBDaHJvbWl1bSAyOSwganVzdCB1c2UgXCJyZXR1cm5cIiBpbiB5b3VyIGdlbmVyYXRvclxuICogZnVuY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSB0aGUgcmV0dXJuIHZhbHVlIGZvciB0aGUgc3Vycm91bmRpbmcgZ2VuZXJhdG9yXG4gKiBAdGhyb3dzIFJldHVyblZhbHVlIGV4Y2VwdGlvbiB3aXRoIHRoZSB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKiAvLyBFUzYgc3R5bGVcbiAqIFEuYXN5bmMoZnVuY3Rpb24qICgpIHtcbiAqICAgICAgdmFyIGZvbyA9IHlpZWxkIGdldEZvb1Byb21pc2UoKTtcbiAqICAgICAgdmFyIGJhciA9IHlpZWxkIGdldEJhclByb21pc2UoKTtcbiAqICAgICAgcmV0dXJuIGZvbyArIGJhcjtcbiAqIH0pXG4gKiAvLyBPbGRlciBTcGlkZXJNb25rZXkgc3R5bGVcbiAqIFEuYXN5bmMoZnVuY3Rpb24gKCkge1xuICogICAgICB2YXIgZm9vID0geWllbGQgZ2V0Rm9vUHJvbWlzZSgpO1xuICogICAgICB2YXIgYmFyID0geWllbGQgZ2V0QmFyUHJvbWlzZSgpO1xuICogICAgICBRLnJldHVybihmb28gKyBiYXIpO1xuICogfSlcbiAqL1xuUVtcInJldHVyblwiXSA9IF9yZXR1cm47XG5mdW5jdGlvbiBfcmV0dXJuKHZhbHVlKSB7XG4gICAgdGhyb3cgbmV3IFFSZXR1cm5WYWx1ZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIHByb21pc2VkIGZ1bmN0aW9uIGRlY29yYXRvciBlbnN1cmVzIHRoYXQgYW55IHByb21pc2UgYXJndW1lbnRzXG4gKiBhcmUgc2V0dGxlZCBhbmQgcGFzc2VkIGFzIHZhbHVlcyAoYHRoaXNgIGlzIGFsc28gc2V0dGxlZCBhbmQgcGFzc2VkXG4gKiBhcyBhIHZhbHVlKS4gIEl0IHdpbGwgYWxzbyBlbnN1cmUgdGhhdCB0aGUgcmVzdWx0IG9mIGEgZnVuY3Rpb24gaXNcbiAqIGFsd2F5cyBhIHByb21pc2UuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBhZGQgPSBRLnByb21pc2VkKGZ1bmN0aW9uIChhLCBiKSB7XG4gKiAgICAgcmV0dXJuIGEgKyBiO1xuICogfSk7XG4gKiBhZGQoUShhKSwgUShCKSk7XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGRlY29yYXRlXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259IGEgZnVuY3Rpb24gdGhhdCBoYXMgYmVlbiBkZWNvcmF0ZWQuXG4gKi9cblEucHJvbWlzZWQgPSBwcm9taXNlZDtcbmZ1bmN0aW9uIHByb21pc2VkKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNwcmVhZChbdGhpcywgYWxsKGFyZ3VtZW50cyldLCBmdW5jdGlvbiAoc2VsZiwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG4vKipcbiAqIHNlbmRzIGEgbWVzc2FnZSB0byBhIHZhbHVlIGluIGEgZnV0dXJlIHR1cm5cbiAqIEBwYXJhbSBvYmplY3QqIHRoZSByZWNpcGllbnRcbiAqIEBwYXJhbSBvcCB0aGUgbmFtZSBvZiB0aGUgbWVzc2FnZSBvcGVyYXRpb24sIGUuZy4sIFwid2hlblwiLFxuICogQHBhcmFtIGFyZ3MgZnVydGhlciBhcmd1bWVudHMgdG8gYmUgZm9yd2FyZGVkIHRvIHRoZSBvcGVyYXRpb25cbiAqIEByZXR1cm5zIHJlc3VsdCB7UHJvbWlzZX0gYSBwcm9taXNlIGZvciB0aGUgcmVzdWx0IG9mIHRoZSBvcGVyYXRpb25cbiAqL1xuUS5kaXNwYXRjaCA9IGRpc3BhdGNoO1xuZnVuY3Rpb24gZGlzcGF0Y2gob2JqZWN0LCBvcCwgYXJncykge1xuICAgIHJldHVybiBRKG9iamVjdCkuZGlzcGF0Y2gob3AsIGFyZ3MpO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uIChvcCwgYXJncykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgIFEubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLnByb21pc2VEaXNwYXRjaChkZWZlcnJlZC5yZXNvbHZlLCBvcCwgYXJncyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIG9mIGEgcHJvcGVydHkgaW4gYSBmdXR1cmUgdHVybi5cbiAqIEBwYXJhbSBvYmplY3QgICAgcHJvbWlzZSBvciBpbW1lZGlhdGUgcmVmZXJlbmNlIGZvciB0YXJnZXQgb2JqZWN0XG4gKiBAcGFyYW0gbmFtZSAgICAgIG5hbWUgb2YgcHJvcGVydHkgdG8gZ2V0XG4gKiBAcmV0dXJuIHByb21pc2UgZm9yIHRoZSBwcm9wZXJ0eSB2YWx1ZVxuICovXG5RLmdldCA9IGZ1bmN0aW9uIChvYmplY3QsIGtleSkge1xuICAgIHJldHVybiBRKG9iamVjdCkuZGlzcGF0Y2goXCJnZXRcIiwgW2tleV0pO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiB0aGlzLmRpc3BhdGNoKFwiZ2V0XCIsIFtrZXldKTtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgdmFsdWUgb2YgYSBwcm9wZXJ0eSBpbiBhIGZ1dHVyZSB0dXJuLlxuICogQHBhcmFtIG9iamVjdCAgICBwcm9taXNlIG9yIGltbWVkaWF0ZSByZWZlcmVuY2UgZm9yIG9iamVjdCBvYmplY3RcbiAqIEBwYXJhbSBuYW1lICAgICAgbmFtZSBvZiBwcm9wZXJ0eSB0byBzZXRcbiAqIEBwYXJhbSB2YWx1ZSAgICAgbmV3IHZhbHVlIG9mIHByb3BlcnR5XG4gKiBAcmV0dXJuIHByb21pc2UgZm9yIHRoZSByZXR1cm4gdmFsdWVcbiAqL1xuUS5zZXQgPSBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIFEob2JqZWN0KS5kaXNwYXRjaChcInNldFwiLCBba2V5LCB2YWx1ZV0pO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaChcInNldFwiLCBba2V5LCB2YWx1ZV0pO1xufTtcblxuLyoqXG4gKiBEZWxldGVzIGEgcHJvcGVydHkgaW4gYSBmdXR1cmUgdHVybi5cbiAqIEBwYXJhbSBvYmplY3QgICAgcHJvbWlzZSBvciBpbW1lZGlhdGUgcmVmZXJlbmNlIGZvciB0YXJnZXQgb2JqZWN0XG4gKiBAcGFyYW0gbmFtZSAgICAgIG5hbWUgb2YgcHJvcGVydHkgdG8gZGVsZXRlXG4gKiBAcmV0dXJuIHByb21pc2UgZm9yIHRoZSByZXR1cm4gdmFsdWVcbiAqL1xuUS5kZWwgPSAvLyBYWFggbGVnYWN5XG5RW1wiZGVsZXRlXCJdID0gZnVuY3Rpb24gKG9iamVjdCwga2V5KSB7XG4gICAgcmV0dXJuIFEob2JqZWN0KS5kaXNwYXRjaChcImRlbGV0ZVwiLCBba2V5XSk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5kZWwgPSAvLyBYWFggbGVnYWN5XG5Qcm9taXNlLnByb3RvdHlwZVtcImRlbGV0ZVwiXSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaChcImRlbGV0ZVwiLCBba2V5XSk7XG59O1xuXG4vKipcbiAqIEludm9rZXMgYSBtZXRob2QgaW4gYSBmdXR1cmUgdHVybi5cbiAqIEBwYXJhbSBvYmplY3QgICAgcHJvbWlzZSBvciBpbW1lZGlhdGUgcmVmZXJlbmNlIGZvciB0YXJnZXQgb2JqZWN0XG4gKiBAcGFyYW0gbmFtZSAgICAgIG5hbWUgb2YgbWV0aG9kIHRvIGludm9rZVxuICogQHBhcmFtIHZhbHVlICAgICBhIHZhbHVlIHRvIHBvc3QsIHR5cGljYWxseSBhbiBhcnJheSBvZlxuICogICAgICAgICAgICAgICAgICBpbnZvY2F0aW9uIGFyZ3VtZW50cyBmb3IgcHJvbWlzZXMgdGhhdFxuICogICAgICAgICAgICAgICAgICBhcmUgdWx0aW1hdGVseSBiYWNrZWQgd2l0aCBgcmVzb2x2ZWAgdmFsdWVzLFxuICogICAgICAgICAgICAgICAgICBhcyBvcHBvc2VkIHRvIHRob3NlIGJhY2tlZCB3aXRoIFVSTHNcbiAqICAgICAgICAgICAgICAgICAgd2hlcmVpbiB0aGUgcG9zdGVkIHZhbHVlIGNhbiBiZSBhbnlcbiAqICAgICAgICAgICAgICAgICAgSlNPTiBzZXJpYWxpemFibGUgb2JqZWN0LlxuICogQHJldHVybiBwcm9taXNlIGZvciB0aGUgcmV0dXJuIHZhbHVlXG4gKi9cbi8vIGJvdW5kIGxvY2FsbHkgYmVjYXVzZSBpdCBpcyB1c2VkIGJ5IG90aGVyIG1ldGhvZHNcblEubWFwcGx5ID0gLy8gWFhYIEFzIHByb3Bvc2VkIGJ5IFwiUmVkc2FuZHJvXCJcblEucG9zdCA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWUsIGFyZ3MpIHtcbiAgICByZXR1cm4gUShvYmplY3QpLmRpc3BhdGNoKFwicG9zdFwiLCBbbmFtZSwgYXJnc10pO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUubWFwcGx5ID0gLy8gWFhYIEFzIHByb3Bvc2VkIGJ5IFwiUmVkc2FuZHJvXCJcblByb21pc2UucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbiAobmFtZSwgYXJncykge1xuICAgIHJldHVybiB0aGlzLmRpc3BhdGNoKFwicG9zdFwiLCBbbmFtZSwgYXJnc10pO1xufTtcblxuLyoqXG4gKiBJbnZva2VzIGEgbWV0aG9kIGluIGEgZnV0dXJlIHR1cm4uXG4gKiBAcGFyYW0gb2JqZWN0ICAgIHByb21pc2Ugb3IgaW1tZWRpYXRlIHJlZmVyZW5jZSBmb3IgdGFyZ2V0IG9iamVjdFxuICogQHBhcmFtIG5hbWUgICAgICBuYW1lIG9mIG1ldGhvZCB0byBpbnZva2VcbiAqIEBwYXJhbSAuLi5hcmdzICAgYXJyYXkgb2YgaW52b2NhdGlvbiBhcmd1bWVudHNcbiAqIEByZXR1cm4gcHJvbWlzZSBmb3IgdGhlIHJldHVybiB2YWx1ZVxuICovXG5RLnNlbmQgPSAvLyBYWFggTWFyayBNaWxsZXIncyBwcm9wb3NlZCBwYXJsYW5jZVxuUS5tY2FsbCA9IC8vIFhYWCBBcyBwcm9wb3NlZCBieSBcIlJlZHNhbmRyb1wiXG5RLmludm9rZSA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWUgLyouLi5hcmdzKi8pIHtcbiAgICByZXR1cm4gUShvYmplY3QpLmRpc3BhdGNoKFwicG9zdFwiLCBbbmFtZSwgYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAyKV0pO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuc2VuZCA9IC8vIFhYWCBNYXJrIE1pbGxlcidzIHByb3Bvc2VkIHBhcmxhbmNlXG5Qcm9taXNlLnByb3RvdHlwZS5tY2FsbCA9IC8vIFhYWCBBcyBwcm9wb3NlZCBieSBcIlJlZHNhbmRyb1wiXG5Qcm9taXNlLnByb3RvdHlwZS5pbnZva2UgPSBmdW5jdGlvbiAobmFtZSAvKi4uLmFyZ3MqLykge1xuICAgIHJldHVybiB0aGlzLmRpc3BhdGNoKFwicG9zdFwiLCBbbmFtZSwgYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAxKV0pO1xufTtcblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBwcm9taXNlZCBmdW5jdGlvbiBpbiBhIGZ1dHVyZSB0dXJuLlxuICogQHBhcmFtIG9iamVjdCAgICBwcm9taXNlIG9yIGltbWVkaWF0ZSByZWZlcmVuY2UgZm9yIHRhcmdldCBmdW5jdGlvblxuICogQHBhcmFtIGFyZ3MgICAgICBhcnJheSBvZiBhcHBsaWNhdGlvbiBhcmd1bWVudHNcbiAqL1xuUS5mYXBwbHkgPSBmdW5jdGlvbiAob2JqZWN0LCBhcmdzKSB7XG4gICAgcmV0dXJuIFEob2JqZWN0KS5kaXNwYXRjaChcImFwcGx5XCIsIFt2b2lkIDAsIGFyZ3NdKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmZhcHBseSA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2goXCJhcHBseVwiLCBbdm9pZCAwLCBhcmdzXSk7XG59O1xuXG4vKipcbiAqIENhbGxzIHRoZSBwcm9taXNlZCBmdW5jdGlvbiBpbiBhIGZ1dHVyZSB0dXJuLlxuICogQHBhcmFtIG9iamVjdCAgICBwcm9taXNlIG9yIGltbWVkaWF0ZSByZWZlcmVuY2UgZm9yIHRhcmdldCBmdW5jdGlvblxuICogQHBhcmFtIC4uLmFyZ3MgICBhcnJheSBvZiBhcHBsaWNhdGlvbiBhcmd1bWVudHNcbiAqL1xuUVtcInRyeVwiXSA9XG5RLmZjYWxsID0gZnVuY3Rpb24gKG9iamVjdCAvKiAuLi5hcmdzKi8pIHtcbiAgICByZXR1cm4gUShvYmplY3QpLmRpc3BhdGNoKFwiYXBwbHlcIiwgW3ZvaWQgMCwgYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAxKV0pO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuZmNhbGwgPSBmdW5jdGlvbiAoLyouLi5hcmdzKi8pIHtcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaChcImFwcGx5XCIsIFt2b2lkIDAsIGFycmF5X3NsaWNlKGFyZ3VtZW50cyldKTtcbn07XG5cbi8qKlxuICogQmluZHMgdGhlIHByb21pc2VkIGZ1bmN0aW9uLCB0cmFuc2Zvcm1pbmcgcmV0dXJuIHZhbHVlcyBpbnRvIGEgZnVsZmlsbGVkXG4gKiBwcm9taXNlIGFuZCB0aHJvd24gZXJyb3JzIGludG8gYSByZWplY3RlZCBvbmUuXG4gKiBAcGFyYW0gb2JqZWN0ICAgIHByb21pc2Ugb3IgaW1tZWRpYXRlIHJlZmVyZW5jZSBmb3IgdGFyZ2V0IGZ1bmN0aW9uXG4gKiBAcGFyYW0gLi4uYXJncyAgIGFycmF5IG9mIGFwcGxpY2F0aW9uIGFyZ3VtZW50c1xuICovXG5RLmZiaW5kID0gZnVuY3Rpb24gKG9iamVjdCAvKi4uLmFyZ3MqLykge1xuICAgIHZhciBwcm9taXNlID0gUShvYmplY3QpO1xuICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzLCAxKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gZmJvdW5kKCkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZS5kaXNwYXRjaChcImFwcGx5XCIsIFtcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICBhcmdzLmNvbmNhdChhcnJheV9zbGljZShhcmd1bWVudHMpKVxuICAgICAgICBdKTtcbiAgICB9O1xufTtcblByb21pc2UucHJvdG90eXBlLmZiaW5kID0gZnVuY3Rpb24gKC8qLi4uYXJncyovKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gZmJvdW5kKCkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZS5kaXNwYXRjaChcImFwcGx5XCIsIFtcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICBhcmdzLmNvbmNhdChhcnJheV9zbGljZShhcmd1bWVudHMpKVxuICAgICAgICBdKTtcbiAgICB9O1xufTtcblxuLyoqXG4gKiBSZXF1ZXN0cyB0aGUgbmFtZXMgb2YgdGhlIG93bmVkIHByb3BlcnRpZXMgb2YgYSBwcm9taXNlZFxuICogb2JqZWN0IGluIGEgZnV0dXJlIHR1cm4uXG4gKiBAcGFyYW0gb2JqZWN0ICAgIHByb21pc2Ugb3IgaW1tZWRpYXRlIHJlZmVyZW5jZSBmb3IgdGFyZ2V0IG9iamVjdFxuICogQHJldHVybiBwcm9taXNlIGZvciB0aGUga2V5cyBvZiB0aGUgZXZlbnR1YWxseSBzZXR0bGVkIG9iamVjdFxuICovXG5RLmtleXMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgcmV0dXJuIFEob2JqZWN0KS5kaXNwYXRjaChcImtleXNcIiwgW10pO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaChcImtleXNcIiwgW10pO1xufTtcblxuLyoqXG4gKiBUdXJucyBhbiBhcnJheSBvZiBwcm9taXNlcyBpbnRvIGEgcHJvbWlzZSBmb3IgYW4gYXJyYXkuICBJZiBhbnkgb2ZcbiAqIHRoZSBwcm9taXNlcyBnZXRzIHJlamVjdGVkLCB0aGUgd2hvbGUgYXJyYXkgaXMgcmVqZWN0ZWQgaW1tZWRpYXRlbHkuXG4gKiBAcGFyYW0ge0FycmF5Kn0gYW4gYXJyYXkgKG9yIHByb21pc2UgZm9yIGFuIGFycmF5KSBvZiB2YWx1ZXMgKG9yXG4gKiBwcm9taXNlcyBmb3IgdmFsdWVzKVxuICogQHJldHVybnMgYSBwcm9taXNlIGZvciBhbiBhcnJheSBvZiB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZXNcbiAqL1xuLy8gQnkgTWFyayBNaWxsZXJcbi8vIGh0dHA6Ly93aWtpLmVjbWFzY3JpcHQub3JnL2Rva3UucGhwP2lkPXN0cmF3bWFuOmNvbmN1cnJlbmN5JnJldj0xMzA4Nzc2NTIxI2FsbGZ1bGZpbGxlZFxuUS5hbGwgPSBhbGw7XG5mdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgICByZXR1cm4gd2hlbihwcm9taXNlcywgZnVuY3Rpb24gKHByb21pc2VzKSB7XG4gICAgICAgIHZhciBwZW5kaW5nQ291bnQgPSAwO1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgICAgICBhcnJheV9yZWR1Y2UocHJvbWlzZXMsIGZ1bmN0aW9uICh1bmRlZmluZWQsIHByb21pc2UsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgc25hcHNob3Q7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaXNQcm9taXNlKHByb21pc2UpICYmXG4gICAgICAgICAgICAgICAgKHNuYXBzaG90ID0gcHJvbWlzZS5pbnNwZWN0KCkpLnN0YXRlID09PSBcImZ1bGZpbGxlZFwiXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlc1tpbmRleF0gPSBzbmFwc2hvdC52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgKytwZW5kaW5nQ291bnQ7XG4gICAgICAgICAgICAgICAgd2hlbihcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgtLXBlbmRpbmdDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocHJvbWlzZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChwcm9ncmVzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQubm90aWZ5KHsgaW5kZXg6IGluZGV4LCB2YWx1ZTogcHJvZ3Jlc3MgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB2b2lkIDApO1xuICAgICAgICBpZiAocGVuZGluZ0NvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHByb21pc2VzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9KTtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUuYWxsID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhbGwodGhpcyk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IHJlc29sdmVkIHByb21pc2Ugb2YgYW4gYXJyYXkuIFByaW9yIHJlamVjdGVkIHByb21pc2VzIGFyZVxuICogaWdub3JlZC4gIFJlamVjdHMgb25seSBpZiBhbGwgcHJvbWlzZXMgYXJlIHJlamVjdGVkLlxuICogQHBhcmFtIHtBcnJheSp9IGFuIGFycmF5IGNvbnRhaW5pbmcgdmFsdWVzIG9yIHByb21pc2VzIGZvciB2YWx1ZXNcbiAqIEByZXR1cm5zIGEgcHJvbWlzZSBmdWxmaWxsZWQgd2l0aCB0aGUgdmFsdWUgb2YgdGhlIGZpcnN0IHJlc29sdmVkIHByb21pc2UsXG4gKiBvciBhIHJlamVjdGVkIHByb21pc2UgaWYgYWxsIHByb21pc2VzIGFyZSByZWplY3RlZC5cbiAqL1xuUS5hbnkgPSBhbnk7XG5cbmZ1bmN0aW9uIGFueShwcm9taXNlcykge1xuICAgIGlmIChwcm9taXNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFEucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHZhciBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcbiAgICB2YXIgcGVuZGluZ0NvdW50ID0gMDtcbiAgICBhcnJheV9yZWR1Y2UocHJvbWlzZXMsIGZ1bmN0aW9uIChwcmV2LCBjdXJyZW50LCBpbmRleCkge1xuICAgICAgICB2YXIgcHJvbWlzZSA9IHByb21pc2VzW2luZGV4XTtcblxuICAgICAgICBwZW5kaW5nQ291bnQrKztcblxuICAgICAgICB3aGVuKHByb21pc2UsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBvblByb2dyZXNzKTtcbiAgICAgICAgZnVuY3Rpb24gb25GdWxmaWxsZWQocmVzdWx0KSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25SZWplY3RlZCgpIHtcbiAgICAgICAgICAgIHBlbmRpbmdDb3VudC0tO1xuICAgICAgICAgICAgaWYgKHBlbmRpbmdDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIFwiQ2FuJ3QgZ2V0IGZ1bGZpbGxtZW50IHZhbHVlIGZyb20gYW55IHByb21pc2UsIGFsbCBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwicHJvbWlzZXMgd2VyZSByZWplY3RlZC5cIlxuICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uUHJvZ3Jlc3MocHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLm5vdGlmeSh7XG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9ncmVzc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCB1bmRlZmluZWQpO1xuXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59XG5cblByb21pc2UucHJvdG90eXBlLmFueSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYW55KHRoaXMpO1xufTtcblxuLyoqXG4gKiBXYWl0cyBmb3IgYWxsIHByb21pc2VzIHRvIGJlIHNldHRsZWQsIGVpdGhlciBmdWxmaWxsZWQgb3JcbiAqIHJlamVjdGVkLiAgVGhpcyBpcyBkaXN0aW5jdCBmcm9tIGBhbGxgIHNpbmNlIHRoYXQgd291bGQgc3RvcFxuICogd2FpdGluZyBhdCB0aGUgZmlyc3QgcmVqZWN0aW9uLiAgVGhlIHByb21pc2UgcmV0dXJuZWQgYnlcbiAqIGBhbGxSZXNvbHZlZGAgd2lsbCBuZXZlciBiZSByZWplY3RlZC5cbiAqIEBwYXJhbSBwcm9taXNlcyBhIHByb21pc2UgZm9yIGFuIGFycmF5IChvciBhbiBhcnJheSkgb2YgcHJvbWlzZXNcbiAqIChvciB2YWx1ZXMpXG4gKiBAcmV0dXJuIGEgcHJvbWlzZSBmb3IgYW4gYXJyYXkgb2YgcHJvbWlzZXNcbiAqL1xuUS5hbGxSZXNvbHZlZCA9IGRlcHJlY2F0ZShhbGxSZXNvbHZlZCwgXCJhbGxSZXNvbHZlZFwiLCBcImFsbFNldHRsZWRcIik7XG5mdW5jdGlvbiBhbGxSZXNvbHZlZChwcm9taXNlcykge1xuICAgIHJldHVybiB3aGVuKHByb21pc2VzLCBmdW5jdGlvbiAocHJvbWlzZXMpIHtcbiAgICAgICAgcHJvbWlzZXMgPSBhcnJheV9tYXAocHJvbWlzZXMsIFEpO1xuICAgICAgICByZXR1cm4gd2hlbihhbGwoYXJyYXlfbWFwKHByb21pc2VzLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdoZW4ocHJvbWlzZSwgbm9vcCwgbm9vcCk7XG4gICAgICAgIH0pKSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VzO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuUHJvbWlzZS5wcm90b3R5cGUuYWxsUmVzb2x2ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFsbFJlc29sdmVkKHRoaXMpO1xufTtcblxuLyoqXG4gKiBAc2VlIFByb21pc2UjYWxsU2V0dGxlZFxuICovXG5RLmFsbFNldHRsZWQgPSBhbGxTZXR0bGVkO1xuZnVuY3Rpb24gYWxsU2V0dGxlZChwcm9taXNlcykge1xuICAgIHJldHVybiBRKHByb21pc2VzKS5hbGxTZXR0bGVkKCk7XG59XG5cbi8qKlxuICogVHVybnMgYW4gYXJyYXkgb2YgcHJvbWlzZXMgaW50byBhIHByb21pc2UgZm9yIGFuIGFycmF5IG9mIHRoZWlyIHN0YXRlcyAoYXNcbiAqIHJldHVybmVkIGJ5IGBpbnNwZWN0YCkgd2hlbiB0aGV5IGhhdmUgYWxsIHNldHRsZWQuXG4gKiBAcGFyYW0ge0FycmF5W0FueSpdfSB2YWx1ZXMgYW4gYXJyYXkgKG9yIHByb21pc2UgZm9yIGFuIGFycmF5KSBvZiB2YWx1ZXMgKG9yXG4gKiBwcm9taXNlcyBmb3IgdmFsdWVzKVxuICogQHJldHVybnMge0FycmF5W1N0YXRlXX0gYW4gYXJyYXkgb2Ygc3RhdGVzIGZvciB0aGUgcmVzcGVjdGl2ZSB2YWx1ZXMuXG4gKi9cblByb21pc2UucHJvdG90eXBlLmFsbFNldHRsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbiAocHJvbWlzZXMpIHtcbiAgICAgICAgcmV0dXJuIGFsbChhcnJheV9tYXAocHJvbWlzZXMsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICBwcm9taXNlID0gUShwcm9taXNlKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlZ2FyZGxlc3MoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UuaW5zcGVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihyZWdhcmRsZXNzLCByZWdhcmRsZXNzKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBDYXB0dXJlcyB0aGUgZmFpbHVyZSBvZiBhIHByb21pc2UsIGdpdmluZyBhbiBvcG9ydHVuaXR5IHRvIHJlY292ZXJcbiAqIHdpdGggYSBjYWxsYmFjay4gIElmIHRoZSBnaXZlbiBwcm9taXNlIGlzIGZ1bGZpbGxlZCwgdGhlIHJldHVybmVkXG4gKiBwcm9taXNlIGlzIGZ1bGZpbGxlZC5cbiAqIEBwYXJhbSB7QW55Kn0gcHJvbWlzZSBmb3Igc29tZXRoaW5nXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayB0byBmdWxmaWxsIHRoZSByZXR1cm5lZCBwcm9taXNlIGlmIHRoZVxuICogZ2l2ZW4gcHJvbWlzZSBpcyByZWplY3RlZFxuICogQHJldHVybnMgYSBwcm9taXNlIGZvciB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBjYWxsYmFja1xuICovXG5RLmZhaWwgPSAvLyBYWFggbGVnYWN5XG5RW1wiY2F0Y2hcIl0gPSBmdW5jdGlvbiAob2JqZWN0LCByZWplY3RlZCkge1xuICAgIHJldHVybiBRKG9iamVjdCkudGhlbih2b2lkIDAsIHJlamVjdGVkKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmZhaWwgPSAvLyBYWFggbGVnYWN5XG5Qcm9taXNlLnByb3RvdHlwZVtcImNhdGNoXCJdID0gZnVuY3Rpb24gKHJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbih2b2lkIDAsIHJlamVjdGVkKTtcbn07XG5cbi8qKlxuICogQXR0YWNoZXMgYSBsaXN0ZW5lciB0aGF0IGNhbiByZXNwb25kIHRvIHByb2dyZXNzIG5vdGlmaWNhdGlvbnMgZnJvbSBhXG4gKiBwcm9taXNlJ3Mgb3JpZ2luYXRpbmcgZGVmZXJyZWQuIFRoaXMgbGlzdGVuZXIgcmVjZWl2ZXMgdGhlIGV4YWN0IGFyZ3VtZW50c1xuICogcGFzc2VkIHRvIGBgZGVmZXJyZWQubm90aWZ5YGAuXG4gKiBAcGFyYW0ge0FueSp9IHByb21pc2UgZm9yIHNvbWV0aGluZ1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgdG8gcmVjZWl2ZSBhbnkgcHJvZ3Jlc3Mgbm90aWZpY2F0aW9uc1xuICogQHJldHVybnMgdGhlIGdpdmVuIHByb21pc2UsIHVuY2hhbmdlZFxuICovXG5RLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG5mdW5jdGlvbiBwcm9ncmVzcyhvYmplY3QsIHByb2dyZXNzZWQpIHtcbiAgICByZXR1cm4gUShvYmplY3QpLnRoZW4odm9pZCAwLCB2b2lkIDAsIHByb2dyZXNzZWQpO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5wcm9ncmVzcyA9IGZ1bmN0aW9uIChwcm9ncmVzc2VkKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbih2b2lkIDAsIHZvaWQgMCwgcHJvZ3Jlc3NlZCk7XG59O1xuXG4vKipcbiAqIFByb3ZpZGVzIGFuIG9wcG9ydHVuaXR5IHRvIG9ic2VydmUgdGhlIHNldHRsaW5nIG9mIGEgcHJvbWlzZSxcbiAqIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGUgcHJvbWlzZSBpcyBmdWxmaWxsZWQgb3IgcmVqZWN0ZWQuICBGb3J3YXJkc1xuICogdGhlIHJlc29sdXRpb24gdG8gdGhlIHJldHVybmVkIHByb21pc2Ugd2hlbiB0aGUgY2FsbGJhY2sgaXMgZG9uZS5cbiAqIFRoZSBjYWxsYmFjayBjYW4gcmV0dXJuIGEgcHJvbWlzZSB0byBkZWZlciBjb21wbGV0aW9uLlxuICogQHBhcmFtIHtBbnkqfSBwcm9taXNlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayB0byBvYnNlcnZlIHRoZSByZXNvbHV0aW9uIG9mIHRoZSBnaXZlblxuICogcHJvbWlzZSwgdGFrZXMgbm8gYXJndW1lbnRzLlxuICogQHJldHVybnMgYSBwcm9taXNlIGZvciB0aGUgcmVzb2x1dGlvbiBvZiB0aGUgZ2l2ZW4gcHJvbWlzZSB3aGVuXG4gKiBgYGZpbmBgIGlzIGRvbmUuXG4gKi9cblEuZmluID0gLy8gWFhYIGxlZ2FjeVxuUVtcImZpbmFsbHlcIl0gPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiBRKG9iamVjdClbXCJmaW5hbGx5XCJdKGNhbGxiYWNrKTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmZpbiA9IC8vIFhYWCBsZWdhY3lcblByb21pc2UucHJvdG90eXBlW1wiZmluYWxseVwiXSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrID0gUShjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmZjYWxsKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgLy8gVE9ETyBhdHRlbXB0IHRvIHJlY3ljbGUgdGhlIHJlamVjdGlvbiB3aXRoIFwidGhpc1wiLlxuICAgICAgICByZXR1cm4gY2FsbGJhY2suZmNhbGwoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRocm93IHJlYXNvbjtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFRlcm1pbmF0ZXMgYSBjaGFpbiBvZiBwcm9taXNlcywgZm9yY2luZyByZWplY3Rpb25zIHRvIGJlXG4gKiB0aHJvd24gYXMgZXhjZXB0aW9ucy5cbiAqIEBwYXJhbSB7QW55Kn0gcHJvbWlzZSBhdCB0aGUgZW5kIG9mIGEgY2hhaW4gb2YgcHJvbWlzZXNcbiAqIEByZXR1cm5zIG5vdGhpbmdcbiAqL1xuUS5kb25lID0gZnVuY3Rpb24gKG9iamVjdCwgZnVsZmlsbGVkLCByZWplY3RlZCwgcHJvZ3Jlc3MpIHtcbiAgICByZXR1cm4gUShvYmplY3QpLmRvbmUoZnVsZmlsbGVkLCByZWplY3RlZCwgcHJvZ3Jlc3MpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUuZG9uZSA9IGZ1bmN0aW9uIChmdWxmaWxsZWQsIHJlamVjdGVkLCBwcm9ncmVzcykge1xuICAgIHZhciBvblVuaGFuZGxlZEVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIC8vIGZvcndhcmQgdG8gYSBmdXR1cmUgdHVybiBzbyB0aGF0IGBgd2hlbmBgXG4gICAgICAgIC8vIGRvZXMgbm90IGNhdGNoIGl0IGFuZCB0dXJuIGl0IGludG8gYSByZWplY3Rpb24uXG4gICAgICAgIFEubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbWFrZVN0YWNrVHJhY2VMb25nKGVycm9yLCBwcm9taXNlKTtcbiAgICAgICAgICAgIGlmIChRLm9uZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBRLm9uZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIEF2b2lkIHVubmVjZXNzYXJ5IGBuZXh0VGlja2BpbmcgdmlhIGFuIHVubmVjZXNzYXJ5IGB3aGVuYC5cbiAgICB2YXIgcHJvbWlzZSA9IGZ1bGZpbGxlZCB8fCByZWplY3RlZCB8fCBwcm9ncmVzcyA/XG4gICAgICAgIHRoaXMudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkLCBwcm9ncmVzcykgOlxuICAgICAgICB0aGlzO1xuXG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmIHByb2Nlc3MgJiYgcHJvY2Vzcy5kb21haW4pIHtcbiAgICAgICAgb25VbmhhbmRsZWRFcnJvciA9IHByb2Nlc3MuZG9tYWluLmJpbmQob25VbmhhbmRsZWRFcnJvcik7XG4gICAgfVxuXG4gICAgcHJvbWlzZS50aGVuKHZvaWQgMCwgb25VbmhhbmRsZWRFcnJvcik7XG59O1xuXG4vKipcbiAqIENhdXNlcyBhIHByb21pc2UgdG8gYmUgcmVqZWN0ZWQgaWYgaXQgZG9lcyBub3QgZ2V0IGZ1bGZpbGxlZCBiZWZvcmVcbiAqIHNvbWUgbWlsbGlzZWNvbmRzIHRpbWUgb3V0LlxuICogQHBhcmFtIHtBbnkqfSBwcm9taXNlXG4gKiBAcGFyYW0ge051bWJlcn0gbWlsbGlzZWNvbmRzIHRpbWVvdXRcbiAqIEBwYXJhbSB7QW55Kn0gY3VzdG9tIGVycm9yIG1lc3NhZ2Ugb3IgRXJyb3Igb2JqZWN0IChvcHRpb25hbClcbiAqIEByZXR1cm5zIGEgcHJvbWlzZSBmb3IgdGhlIHJlc29sdXRpb24gb2YgdGhlIGdpdmVuIHByb21pc2UgaWYgaXQgaXNcbiAqIGZ1bGZpbGxlZCBiZWZvcmUgdGhlIHRpbWVvdXQsIG90aGVyd2lzZSByZWplY3RlZC5cbiAqL1xuUS50aW1lb3V0ID0gZnVuY3Rpb24gKG9iamVjdCwgbXMsIGVycm9yKSB7XG4gICAgcmV0dXJuIFEob2JqZWN0KS50aW1lb3V0KG1zLCBlcnJvcik7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gKG1zLCBlcnJvcikge1xuICAgIHZhciBkZWZlcnJlZCA9IGRlZmVyKCk7XG4gICAgdmFyIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWVycm9yIHx8IFwic3RyaW5nXCIgPT09IHR5cGVvZiBlcnJvcikge1xuICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3IgfHwgXCJUaW1lZCBvdXQgYWZ0ZXIgXCIgKyBtcyArIFwiIG1zXCIpO1xuICAgICAgICAgICAgZXJyb3IuY29kZSA9IFwiRVRJTUVET1VUXCI7XG4gICAgICAgIH1cbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycm9yKTtcbiAgICB9LCBtcyk7XG5cbiAgICB0aGlzLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHZhbHVlKTtcbiAgICB9LCBmdW5jdGlvbiAoZXhjZXB0aW9uKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXhjZXB0aW9uKTtcbiAgICB9LCBkZWZlcnJlZC5ub3RpZnkpO1xuXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBwcm9taXNlIGZvciB0aGUgZ2l2ZW4gdmFsdWUgKG9yIHByb21pc2VkIHZhbHVlKSwgc29tZVxuICogbWlsbGlzZWNvbmRzIGFmdGVyIGl0IHJlc29sdmVkLiBQYXNzZXMgcmVqZWN0aW9ucyBpbW1lZGlhdGVseS5cbiAqIEBwYXJhbSB7QW55Kn0gcHJvbWlzZVxuICogQHBhcmFtIHtOdW1iZXJ9IG1pbGxpc2Vjb25kc1xuICogQHJldHVybnMgYSBwcm9taXNlIGZvciB0aGUgcmVzb2x1dGlvbiBvZiB0aGUgZ2l2ZW4gcHJvbWlzZSBhZnRlciBtaWxsaXNlY29uZHNcbiAqIHRpbWUgaGFzIGVsYXBzZWQgc2luY2UgdGhlIHJlc29sdXRpb24gb2YgdGhlIGdpdmVuIHByb21pc2UuXG4gKiBJZiB0aGUgZ2l2ZW4gcHJvbWlzZSByZWplY3RzLCB0aGF0IGlzIHBhc3NlZCBpbW1lZGlhdGVseS5cbiAqL1xuUS5kZWxheSA9IGZ1bmN0aW9uIChvYmplY3QsIHRpbWVvdXQpIHtcbiAgICBpZiAodGltZW91dCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRpbWVvdXQgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHZvaWQgMDtcbiAgICB9XG4gICAgcmV0dXJuIFEob2JqZWN0KS5kZWxheSh0aW1lb3V0KTtcbn07XG5cblByb21pc2UucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24gKHRpbWVvdXQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUodmFsdWUpO1xuICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFBhc3NlcyBhIGNvbnRpbnVhdGlvbiB0byBhIE5vZGUgZnVuY3Rpb24sIHdoaWNoIGlzIGNhbGxlZCB3aXRoIHRoZSBnaXZlblxuICogYXJndW1lbnRzIHByb3ZpZGVkIGFzIGFuIGFycmF5LCBhbmQgcmV0dXJucyBhIHByb21pc2UuXG4gKlxuICogICAgICBRLm5mYXBwbHkoRlMucmVhZEZpbGUsIFtfX2ZpbGVuYW1lXSlcbiAqICAgICAgLnRoZW4oZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAqICAgICAgfSlcbiAqXG4gKi9cblEubmZhcHBseSA9IGZ1bmN0aW9uIChjYWxsYmFjaywgYXJncykge1xuICAgIHJldHVybiBRKGNhbGxiYWNrKS5uZmFwcGx5KGFyZ3MpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUubmZhcHBseSA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICB2YXIgbm9kZUFyZ3MgPSBhcnJheV9zbGljZShhcmdzKTtcbiAgICBub2RlQXJncy5wdXNoKGRlZmVycmVkLm1ha2VOb2RlUmVzb2x2ZXIoKSk7XG4gICAgdGhpcy5mYXBwbHkobm9kZUFyZ3MpLmZhaWwoZGVmZXJyZWQucmVqZWN0KTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn07XG5cbi8qKlxuICogUGFzc2VzIGEgY29udGludWF0aW9uIHRvIGEgTm9kZSBmdW5jdGlvbiwgd2hpY2ggaXMgY2FsbGVkIHdpdGggdGhlIGdpdmVuXG4gKiBhcmd1bWVudHMgcHJvdmlkZWQgaW5kaXZpZHVhbGx5LCBhbmQgcmV0dXJucyBhIHByb21pc2UuXG4gKiBAZXhhbXBsZVxuICogUS5uZmNhbGwoRlMucmVhZEZpbGUsIF9fZmlsZW5hbWUpXG4gKiAudGhlbihmdW5jdGlvbiAoY29udGVudCkge1xuICogfSlcbiAqXG4gKi9cblEubmZjYWxsID0gZnVuY3Rpb24gKGNhbGxiYWNrIC8qLi4uYXJncyovKSB7XG4gICAgdmFyIGFyZ3MgPSBhcnJheV9zbGljZShhcmd1bWVudHMsIDEpO1xuICAgIHJldHVybiBRKGNhbGxiYWNrKS5uZmFwcGx5KGFyZ3MpO1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUubmZjYWxsID0gZnVuY3Rpb24gKC8qLi4uYXJncyovKSB7XG4gICAgdmFyIG5vZGVBcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzKTtcbiAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgIG5vZGVBcmdzLnB1c2goZGVmZXJyZWQubWFrZU5vZGVSZXNvbHZlcigpKTtcbiAgICB0aGlzLmZhcHBseShub2RlQXJncykuZmFpbChkZWZlcnJlZC5yZWplY3QpO1xuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufTtcblxuLyoqXG4gKiBXcmFwcyBhIE5vZGVKUyBjb250aW51YXRpb24gcGFzc2luZyBmdW5jdGlvbiBhbmQgcmV0dXJucyBhbiBlcXVpdmFsZW50XG4gKiB2ZXJzaW9uIHRoYXQgcmV0dXJucyBhIHByb21pc2UuXG4gKiBAZXhhbXBsZVxuICogUS5uZmJpbmQoRlMucmVhZEZpbGUsIF9fZmlsZW5hbWUpKFwidXRmLThcIilcbiAqIC50aGVuKGNvbnNvbGUubG9nKVxuICogLmRvbmUoKVxuICovXG5RLm5mYmluZCA9XG5RLmRlbm9kZWlmeSA9IGZ1bmN0aW9uIChjYWxsYmFjayAvKi4uLmFyZ3MqLykge1xuICAgIHZhciBiYXNlQXJncyA9IGFycmF5X3NsaWNlKGFyZ3VtZW50cywgMSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5vZGVBcmdzID0gYmFzZUFyZ3MuY29uY2F0KGFycmF5X3NsaWNlKGFyZ3VtZW50cykpO1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgICAgICBub2RlQXJncy5wdXNoKGRlZmVycmVkLm1ha2VOb2RlUmVzb2x2ZXIoKSk7XG4gICAgICAgIFEoY2FsbGJhY2spLmZhcHBseShub2RlQXJncykuZmFpbChkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUubmZiaW5kID1cblByb21pc2UucHJvdG90eXBlLmRlbm9kZWlmeSA9IGZ1bmN0aW9uICgvKi4uLmFyZ3MqLykge1xuICAgIHZhciBhcmdzID0gYXJyYXlfc2xpY2UoYXJndW1lbnRzKTtcbiAgICBhcmdzLnVuc2hpZnQodGhpcyk7XG4gICAgcmV0dXJuIFEuZGVub2RlaWZ5LmFwcGx5KHZvaWQgMCwgYXJncyk7XG59O1xuXG5RLm5iaW5kID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzcCAvKi4uLmFyZ3MqLykge1xuICAgIHZhciBiYXNlQXJncyA9IGFycmF5X3NsaWNlKGFyZ3VtZW50cywgMik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5vZGVBcmdzID0gYmFzZUFyZ3MuY29uY2F0KGFycmF5X3NsaWNlKGFyZ3VtZW50cykpO1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgICAgICBub2RlQXJncy5wdXNoKGRlZmVycmVkLm1ha2VOb2RlUmVzb2x2ZXIoKSk7XG4gICAgICAgIGZ1bmN0aW9uIGJvdW5kKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KHRoaXNwLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIFEoYm91bmQpLmZhcHBseShub2RlQXJncykuZmFpbChkZWZlcnJlZC5yZWplY3QpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9O1xufTtcblxuUHJvbWlzZS5wcm90b3R5cGUubmJpbmQgPSBmdW5jdGlvbiAoLyp0aGlzcCwgLi4uYXJncyovKSB7XG4gICAgdmFyIGFyZ3MgPSBhcnJheV9zbGljZShhcmd1bWVudHMsIDApO1xuICAgIGFyZ3MudW5zaGlmdCh0aGlzKTtcbiAgICByZXR1cm4gUS5uYmluZC5hcHBseSh2b2lkIDAsIGFyZ3MpO1xufTtcblxuLyoqXG4gKiBDYWxscyBhIG1ldGhvZCBvZiBhIE5vZGUtc3R5bGUgb2JqZWN0IHRoYXQgYWNjZXB0cyBhIE5vZGUtc3R5bGVcbiAqIGNhbGxiYWNrIHdpdGggYSBnaXZlbiBhcnJheSBvZiBhcmd1bWVudHMsIHBsdXMgYSBwcm92aWRlZCBjYWxsYmFjay5cbiAqIEBwYXJhbSBvYmplY3QgYW4gb2JqZWN0IHRoYXQgaGFzIHRoZSBuYW1lZCBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG5hbWUgb2YgdGhlIG1ldGhvZCBvZiBvYmplY3RcbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIG1ldGhvZDsgdGhlIGNhbGxiYWNrXG4gKiB3aWxsIGJlIHByb3ZpZGVkIGJ5IFEgYW5kIGFwcGVuZGVkIHRvIHRoZXNlIGFyZ3VtZW50cy5cbiAqIEByZXR1cm5zIGEgcHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9yIGVycm9yXG4gKi9cblEubm1hcHBseSA9IC8vIFhYWCBBcyBwcm9wb3NlZCBieSBcIlJlZHNhbmRyb1wiXG5RLm5wb3N0ID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSwgYXJncykge1xuICAgIHJldHVybiBRKG9iamVjdCkubnBvc3QobmFtZSwgYXJncyk7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5ubWFwcGx5ID0gLy8gWFhYIEFzIHByb3Bvc2VkIGJ5IFwiUmVkc2FuZHJvXCJcblByb21pc2UucHJvdG90eXBlLm5wb3N0ID0gZnVuY3Rpb24gKG5hbWUsIGFyZ3MpIHtcbiAgICB2YXIgbm9kZUFyZ3MgPSBhcnJheV9zbGljZShhcmdzIHx8IFtdKTtcbiAgICB2YXIgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgIG5vZGVBcmdzLnB1c2goZGVmZXJyZWQubWFrZU5vZGVSZXNvbHZlcigpKTtcbiAgICB0aGlzLmRpc3BhdGNoKFwicG9zdFwiLCBbbmFtZSwgbm9kZUFyZ3NdKS5mYWlsKGRlZmVycmVkLnJlamVjdCk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59O1xuXG4vKipcbiAqIENhbGxzIGEgbWV0aG9kIG9mIGEgTm9kZS1zdHlsZSBvYmplY3QgdGhhdCBhY2NlcHRzIGEgTm9kZS1zdHlsZVxuICogY2FsbGJhY2ssIGZvcndhcmRpbmcgdGhlIGdpdmVuIHZhcmlhZGljIGFyZ3VtZW50cywgcGx1cyBhIHByb3ZpZGVkXG4gKiBjYWxsYmFjayBhcmd1bWVudC5cbiAqIEBwYXJhbSBvYmplY3QgYW4gb2JqZWN0IHRoYXQgaGFzIHRoZSBuYW1lZCBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG5hbWUgb2YgdGhlIG1ldGhvZCBvZiBvYmplY3RcbiAqIEBwYXJhbSAuLi5hcmdzIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBtZXRob2Q7IHRoZSBjYWxsYmFjayB3aWxsXG4gKiBiZSBwcm92aWRlZCBieSBRIGFuZCBhcHBlbmRlZCB0byB0aGVzZSBhcmd1bWVudHMuXG4gKiBAcmV0dXJucyBhIHByb21pc2UgZm9yIHRoZSB2YWx1ZSBvciBlcnJvclxuICovXG5RLm5zZW5kID0gLy8gWFhYIEJhc2VkIG9uIE1hcmsgTWlsbGVyJ3MgcHJvcG9zZWQgXCJzZW5kXCJcblEubm1jYWxsID0gLy8gWFhYIEJhc2VkIG9uIFwiUmVkc2FuZHJvJ3NcIiBwcm9wb3NhbFxuUS5uaW52b2tlID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSAvKi4uLmFyZ3MqLykge1xuICAgIHZhciBub2RlQXJncyA9IGFycmF5X3NsaWNlKGFyZ3VtZW50cywgMik7XG4gICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICBub2RlQXJncy5wdXNoKGRlZmVycmVkLm1ha2VOb2RlUmVzb2x2ZXIoKSk7XG4gICAgUShvYmplY3QpLmRpc3BhdGNoKFwicG9zdFwiLCBbbmFtZSwgbm9kZUFyZ3NdKS5mYWlsKGRlZmVycmVkLnJlamVjdCk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59O1xuXG5Qcm9taXNlLnByb3RvdHlwZS5uc2VuZCA9IC8vIFhYWCBCYXNlZCBvbiBNYXJrIE1pbGxlcidzIHByb3Bvc2VkIFwic2VuZFwiXG5Qcm9taXNlLnByb3RvdHlwZS5ubWNhbGwgPSAvLyBYWFggQmFzZWQgb24gXCJSZWRzYW5kcm8nc1wiIHByb3Bvc2FsXG5Qcm9taXNlLnByb3RvdHlwZS5uaW52b2tlID0gZnVuY3Rpb24gKG5hbWUgLyouLi5hcmdzKi8pIHtcbiAgICB2YXIgbm9kZUFyZ3MgPSBhcnJheV9zbGljZShhcmd1bWVudHMsIDEpO1xuICAgIHZhciBkZWZlcnJlZCA9IGRlZmVyKCk7XG4gICAgbm9kZUFyZ3MucHVzaChkZWZlcnJlZC5tYWtlTm9kZVJlc29sdmVyKCkpO1xuICAgIHRoaXMuZGlzcGF0Y2goXCJwb3N0XCIsIFtuYW1lLCBub2RlQXJnc10pLmZhaWwoZGVmZXJyZWQucmVqZWN0KTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn07XG5cbi8qKlxuICogSWYgYSBmdW5jdGlvbiB3b3VsZCBsaWtlIHRvIHN1cHBvcnQgYm90aCBOb2RlIGNvbnRpbnVhdGlvbi1wYXNzaW5nLXN0eWxlIGFuZFxuICogcHJvbWlzZS1yZXR1cm5pbmctc3R5bGUsIGl0IGNhbiBlbmQgaXRzIGludGVybmFsIHByb21pc2UgY2hhaW4gd2l0aFxuICogYG5vZGVpZnkobm9kZWJhY2spYCwgZm9yd2FyZGluZyB0aGUgb3B0aW9uYWwgbm9kZWJhY2sgYXJndW1lbnQuICBJZiB0aGUgdXNlclxuICogZWxlY3RzIHRvIHVzZSBhIG5vZGViYWNrLCB0aGUgcmVzdWx0IHdpbGwgYmUgc2VudCB0aGVyZS4gIElmIHRoZXkgZG8gbm90XG4gKiBwYXNzIGEgbm9kZWJhY2ssIHRoZXkgd2lsbCByZWNlaXZlIHRoZSByZXN1bHQgcHJvbWlzZS5cbiAqIEBwYXJhbSBvYmplY3QgYSByZXN1bHQgKG9yIGEgcHJvbWlzZSBmb3IgYSByZXN1bHQpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBub2RlYmFjayBhIE5vZGUuanMtc3R5bGUgY2FsbGJhY2tcbiAqIEByZXR1cm5zIGVpdGhlciB0aGUgcHJvbWlzZSBvciBub3RoaW5nXG4gKi9cblEubm9kZWlmeSA9IG5vZGVpZnk7XG5mdW5jdGlvbiBub2RlaWZ5KG9iamVjdCwgbm9kZWJhY2spIHtcbiAgICByZXR1cm4gUShvYmplY3QpLm5vZGVpZnkobm9kZWJhY2spO1xufVxuXG5Qcm9taXNlLnByb3RvdHlwZS5ub2RlaWZ5ID0gZnVuY3Rpb24gKG5vZGViYWNrKSB7XG4gICAgaWYgKG5vZGViYWNrKSB7XG4gICAgICAgIHRoaXMudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIFEubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5vZGViYWNrKG51bGwsIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIFEubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG5vZGViYWNrKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59O1xuXG5RLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJRLm5vQ29uZmxpY3Qgb25seSB3b3JrcyB3aGVuIFEgaXMgdXNlZCBhcyBhIGdsb2JhbFwiKTtcbn07XG5cbi8vIEFsbCBjb2RlIGJlZm9yZSB0aGlzIHBvaW50IHdpbGwgYmUgZmlsdGVyZWQgZnJvbSBzdGFjayB0cmFjZXMuXG52YXIgcUVuZGluZ0xpbmUgPSBjYXB0dXJlTGluZSgpO1xuXG5yZXR1cm4gUTtcblxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcS9xLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzY29wZSA9ICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbCkgfHxcbiAgICAgICAgICAgICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmKSB8fFxuICAgICAgICAgICAgd2luZG93O1xudmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwoc2NvcGUsIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBzZXRpbW1lZGlhdGUgYXR0YWNoZXMgaXRzZWxmIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG5yZXF1aXJlKFwic2V0aW1tZWRpYXRlXCIpO1xuLy8gT24gc29tZSBleG90aWMgZW52aXJvbm1lbnRzLCBpdCdzIG5vdCBjbGVhciB3aGljaCBvYmplY3QgYHNldGltbWVkaWF0ZWAgd2FzXG4vLyBhYmxlIHRvIGluc3RhbGwgb250by4gIFNlYXJjaCBlYWNoIHBvc3NpYmlsaXR5IGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZVxuLy8gYHNldGltbWVkaWF0ZWAgbGlicmFyeS5cbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLnNldEltbWVkaWF0ZSk7XG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuY2xlYXJJbW1lZGlhdGUpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L25vZGUtbGlicy1icm93c2VyL34vdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5leHRIYW5kbGUgPSAxOyAvLyBTcGVjIHNheXMgZ3JlYXRlciB0aGFuIHplcm9cbiAgICB2YXIgdGFza3NCeUhhbmRsZSA9IHt9O1xuICAgIHZhciBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICB2YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuICAgIHZhciByZWdpc3RlckltbWVkaWF0ZTtcblxuICAgIGZ1bmN0aW9uIHNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuICAgICAgLy8gQ2FsbGJhY2sgY2FuIGVpdGhlciBiZSBhIGZ1bmN0aW9uIG9yIGEgc3RyaW5nXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuZXcgRnVuY3Rpb24oXCJcIiArIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIC8vIENvcHkgZnVuY3Rpb24gYXJndW1lbnRzXG4gICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAxXTtcbiAgICAgIH1cbiAgICAgIC8vIFN0b3JlIGFuZCByZWdpc3RlciB0aGUgdGFza1xuICAgICAgdmFyIHRhc2sgPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgYXJnczogYXJncyB9O1xuICAgICAgdGFza3NCeUhhbmRsZVtuZXh0SGFuZGxlXSA9IHRhc2s7XG4gICAgICByZWdpc3RlckltbWVkaWF0ZShuZXh0SGFuZGxlKTtcbiAgICAgIHJldHVybiBuZXh0SGFuZGxlKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaGFuZGxlKSB7XG4gICAgICAgIGRlbGV0ZSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuKHRhc2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGFzay5jYWxsYmFjaztcbiAgICAgICAgdmFyIGFyZ3MgPSB0YXNrLmFyZ3M7XG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuSWZQcmVzZW50KGhhbmRsZSkge1xuICAgICAgICAvLyBGcm9tIHRoZSBzcGVjOiBcIldhaXQgdW50aWwgYW55IGludm9jYXRpb25zIG9mIHRoaXMgYWxnb3JpdGhtIHN0YXJ0ZWQgYmVmb3JlIHRoaXMgb25lIGhhdmUgY29tcGxldGVkLlwiXG4gICAgICAgIC8vIFNvIGlmIHdlJ3JlIGN1cnJlbnRseSBydW5uaW5nIGEgdGFzaywgd2UnbGwgbmVlZCB0byBkZWxheSB0aGlzIGludm9jYXRpb24uXG4gICAgICAgIGlmIChjdXJyZW50bHlSdW5uaW5nQVRhc2spIHtcbiAgICAgICAgICAgIC8vIERlbGF5IGJ5IGRvaW5nIGEgc2V0VGltZW91dC4gc2V0SW1tZWRpYXRlIHdhcyB0cmllZCBpbnN0ZWFkLCBidXQgaW4gRmlyZWZveCA3IGl0IGdlbmVyYXRlZCBhXG4gICAgICAgICAgICAvLyBcInRvbyBtdWNoIHJlY3Vyc2lvblwiIGVycm9yLlxuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGFzayA9IHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBydW4odGFzayk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbW1lZGlhdGUoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHsgcnVuSWZQcmVzZW50KGhhbmRsZSk7IH0pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhblVzZVBvc3RNZXNzYWdlKCkge1xuICAgICAgICAvLyBUaGUgdGVzdCBhZ2FpbnN0IGBpbXBvcnRTY3JpcHRzYCBwcmV2ZW50cyB0aGlzIGltcGxlbWVudGF0aW9uIGZyb20gYmVpbmcgaW5zdGFsbGVkIGluc2lkZSBhIHdlYiB3b3JrZXIsXG4gICAgICAgIC8vIHdoZXJlIGBnbG9iYWwucG9zdE1lc3NhZ2VgIG1lYW5zIHNvbWV0aGluZyBjb21wbGV0ZWx5IGRpZmZlcmVudCBhbmQgY2FuJ3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlLlxuICAgICAgICBpZiAoZ2xvYmFsLnBvc3RNZXNzYWdlICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgICAgICAgICAgdmFyIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG9sZE9uTWVzc2FnZSA9IGdsb2JhbC5vbm1lc3NhZ2U7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShcIlwiLCBcIipcIik7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gb2xkT25NZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgLy8gSW5zdGFsbHMgYW4gZXZlbnQgaGFuZGxlciBvbiBgZ2xvYmFsYCBmb3IgdGhlIGBtZXNzYWdlYCBldmVudDogc2VlXG4gICAgICAgIC8vICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL3dpbmRvdy5wb3N0TWVzc2FnZVxuICAgICAgICAvLyAqIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL2NvbW1zLmh0bWwjY3Jvc3NEb2N1bWVudE1lc3NhZ2VzXG5cbiAgICAgICAgdmFyIG1lc3NhZ2VQcmVmaXggPSBcInNldEltbWVkaWF0ZSRcIiArIE1hdGgucmFuZG9tKCkgKyBcIiRcIjtcbiAgICAgICAgdmFyIG9uR2xvYmFsTWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBnbG9iYWwgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgZXZlbnQuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuaW5kZXhPZihtZXNzYWdlUHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudCgrZXZlbnQuZGF0YS5zbGljZShtZXNzYWdlUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KFwib25tZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKG1lc3NhZ2VQcmVmaXggKyBoYW5kbGUsIFwiKlwiKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZShoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIDxzY3JpcHQ+IGVsZW1lbnQ7IGl0cyByZWFkeXN0YXRlY2hhbmdlIGV2ZW50IHdpbGwgYmUgZmlyZWQgYXN5bmNocm9ub3VzbHkgb25jZSBpdCBpcyBpbnNlcnRlZFxuICAgICAgICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQuIERvIHNvLCB0aHVzIHF1ZXVpbmcgdXAgdGhlIHRhc2suIFJlbWVtYmVyIHRvIGNsZWFuIHVwIG9uY2UgaXQncyBiZWVuIGNhbGxlZC5cbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaHRtbC5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgICAgIHNjcmlwdCA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaHRtbC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJZiBzdXBwb3J0ZWQsIHdlIHNob3VsZCBhdHRhY2ggdG8gdGhlIHByb3RvdHlwZSBvZiBnbG9iYWwsIHNpbmNlIHRoYXQgaXMgd2hlcmUgc2V0VGltZW91dCBldCBhbC4gbGl2ZS5cbiAgICB2YXIgYXR0YWNoVG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbCk7XG4gICAgYXR0YWNoVG8gPSBhdHRhY2hUbyAmJiBhdHRhY2hUby5zZXRUaW1lb3V0ID8gYXR0YWNoVG8gOiBnbG9iYWw7XG5cbiAgICAvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IGUuZy4gYnJvd3NlcmlmeSBlbnZpcm9ubWVudHMuXG4gICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoZ2xvYmFsLnByb2Nlc3MpID09PSBcIltvYmplY3QgcHJvY2Vzc11cIikge1xuICAgICAgICAvLyBGb3IgTm9kZS5qcyBiZWZvcmUgMC45XG4gICAgICAgIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGNhblVzZVBvc3RNZXNzYWdlKCkpIHtcbiAgICAgICAgLy8gRm9yIG5vbi1JRTEwIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChnbG9iYWwuTWVzc2FnZUNoYW5uZWwpIHtcbiAgICAgICAgLy8gRm9yIHdlYiB3b3JrZXJzLCB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgICAgaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZG9jICYmIFwib25yZWFkeXN0YXRlY2hhbmdlXCIgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIikpIHtcbiAgICAgICAgLy8gRm9yIElFIDbigJM4XG4gICAgICAgIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciBvbGRlciBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCk7XG4gICAgfVxuXG4gICAgYXR0YWNoVG8uc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuICAgIGF0dGFjaFRvLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGU7XG59KHR5cGVvZiBzZWxmID09PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIGdsb2JhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IHRoaXMgOiBnbG9iYWwgOiBzZWxmKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9