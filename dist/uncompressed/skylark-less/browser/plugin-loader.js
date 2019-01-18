define(['../engine/environment/abstract-plugin-loader'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var AbstractPluginLoader = __module__0;
    var PluginLoader = function (less) {
        this.less = less;
    };
    PluginLoader.prototype = new AbstractPluginLoader();
    PluginLoader.prototype.loadPlugin = function (filename, basePath, context, environment, fileManager) {
        return new Promise(function (fulfill, reject) {
            fileManager.loadFile(filename, basePath, context, environment).then(fulfill).catch(reject);
        });
    };
    module.exports = PluginLoader;
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