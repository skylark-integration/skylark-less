define([
    'promise/polyfill',
    '../engine/default-options',
    './add-default-options',
    './index'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    __module__0;
    var options = __module__1();
    if (window.less) {
        for (var key in window.less) {
            if (window.less.hasOwnProperty(key)) {
                options[key] = window.less[key];
            }
        }
    }
    __module__2(window, options);
    options.plugins = options.plugins || [];
    if (window.LESS_PLUGINS) {
        options.plugins = options.plugins.concat(window.LESS_PLUGINS);
    }
    var less = module.exports = __module__3(window, options);
    window.less = less;
    var css, head, style;
    function resolveOrReject(data) {
        if (data.filename) {
            console.warn(data);
        }
        if (!options.async) {
            head.removeChild(style);
        }
    }
    if (options.onReady) {
        if (/!watch/.test(window.location.hash)) {
            less.watch();
        }
        if (!options.async) {
            css = 'body { display: none !important }';
            head = document.head || document.getElementsByTagName('head')[0];
            style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        }
        less.registerStylesheetsImmediately();
        less.pageLoadFinished = less.refresh(less.env === 'development').then(resolveOrReject, resolveOrReject);
    }
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