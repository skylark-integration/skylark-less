define(['../logger'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var logger = __module__0;
    var environment = function (externalEnvironment, fileManagers) {
        this.fileManagers = fileManagers || [];
        externalEnvironment = externalEnvironment || {};
        var optionalFunctions = [
                'encodeBase64',
                'mimeLookup',
                'charsetLookup',
                'getSourceMapGenerator'
            ], requiredFunctions = [], functions = requiredFunctions.concat(optionalFunctions);
        for (var i = 0; i < functions.length; i++) {
            var propName = functions[i], environmentFunc = externalEnvironment[propName];
            if (environmentFunc) {
                this[propName] = environmentFunc.bind(externalEnvironment);
            } else if (i < requiredFunctions.length) {
                this.warn('missing required function in environment - ' + propName);
            }
        }
    };
    environment.prototype.getFileManager = function (filename, currentDirectory, options, environment, isSync) {
        if (!filename) {
            logger.warn('getFileManager called with no filename.. Please report this issue. continuing.');
        }
        if (currentDirectory == null) {
            logger.warn('getFileManager called with null directory.. Please report this issue. continuing.');
        }
        var fileManagers = this.fileManagers;
        if (options.pluginManager) {
            fileManagers = [].concat(fileManagers).concat(options.pluginManager.getFileManagers());
        }
        for (var i = fileManagers.length - 1; i >= 0; i--) {
            var fileManager = fileManagers[i];
            if (fileManager[isSync ? 'supportsSync' : 'supports'](filename, currentDirectory, options, environment)) {
                return fileManager;
            }
        }
        return null;
    };
    environment.prototype.addFileManager = function (fileManager) {
        this.fileManagers.push(fileManager);
    };
    environment.prototype.clearFileManagers = function () {
        this.fileManagers = [];
    };
    module.exports = environment;
    function __isEmptyObject(obj) {
        var attr;
        for (attr in obj)
            return !1;
        return !0;
    }
    function __isValidToReturn(obj) {
        return typeof obj != 'object' || Array.isArray(obj) || !__isEmptyObject(obj);
    }
    if (__isValidToReturn(module.exports))
        return module.exports;
    else if (__isValidToReturn(exports))
        return exports;
});