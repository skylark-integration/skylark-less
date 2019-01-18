define([
    './utils',
    './browser'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var addDataAttr = __module__0.addDataAttr, browser = __module__1;
    module.exports = function (window, options) {
        addDataAttr(options, browser.currentScript(window));
        if (options.isFileProtocol === undefined) {
            options.isFileProtocol = /^(file|(chrome|safari)(-extension)?|resource|qrc|app):/.test(window.location.protocol);
        }
        options.async = options.async || false;
        options.fileAsync = options.fileAsync || false;
        options.poll = options.poll || (options.isFileProtocol ? 1000 : 1500);
        options.env = options.env || (window.location.hostname == '127.0.0.1' || window.location.hostname == '0.0.0.0' || window.location.hostname == 'localhost' || window.location.port && window.location.port.length > 0 || options.isFileProtocol ? 'development' : 'production');
        var dumpLineNumbers = /!dumpLineNumbers:(comments|mediaquery|all)/.exec(window.location.hash);
        if (dumpLineNumbers) {
            options.dumpLineNumbers = dumpLineNumbers[1];
        }
        if (options.useFileCache === undefined) {
            options.useFileCache = true;
        }
        if (options.onReady === undefined) {
            options.onReady = true;
        }
        if (options.relativeUrls) {
            options.rewriteUrls = 'all';
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