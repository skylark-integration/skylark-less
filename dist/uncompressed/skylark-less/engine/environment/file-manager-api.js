define([], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = {
        getPath: function (filename) {
        },
        tryAppendLessExtension: function (filename) {
        },
        alwaysMakePathsAbsolute: function () {
        },
        isPathAbsolute: function (path) {
        },
        join: function (basePath, laterPath) {
        },
        pathDiff: function (url, baseUrl) {
        },
        supportsSync: function (filename, currentDirectory, options, environment) {
        },
        supports: function (filename, currentDirectory, options, environment) {
        },
        loadFile: function (filename, currentDirectory, options, environment) {
        },
        loadFileSync: function (filename, currentDirectory, options, environment) {
        }
    };
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