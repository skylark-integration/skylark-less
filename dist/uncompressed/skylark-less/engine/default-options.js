define([], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = function () {
        return {
            javascriptEnabled: false,
            depends: false,
            compress: false,
            lint: false,
            paths: [],
            color: true,
            strictImports: false,
            insecure: false,
            rootpath: '',
            rewriteUrls: false,
            ieCompat: false,
            math: 0,
            strictUnits: false,
            globalVars: null,
            modifyVars: null,
            urlArgs: ''
        };
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