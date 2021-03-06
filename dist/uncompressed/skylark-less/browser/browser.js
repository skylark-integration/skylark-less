define(['./utils'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var utils = __module__0;
    module.exports = {
        createCSS: function (document, styles, sheet) {
            var href = sheet.href || '';
            var id = 'less:' + (sheet.title || utils.extractId(href));
            var oldStyleNode = document.getElementById(id);
            var keepOldStyleNode = false;
            var styleNode = document.createElement('style');
            styleNode.setAttribute('type', 'text/css');
            if (sheet.media) {
                styleNode.setAttribute('media', sheet.media);
            }
            styleNode.id = id;
            if (!styleNode.styleSheet) {
                styleNode.appendChild(document.createTextNode(styles));
                keepOldStyleNode = oldStyleNode !== null && oldStyleNode.childNodes.length > 0 && styleNode.childNodes.length > 0 && oldStyleNode.firstChild.nodeValue === styleNode.firstChild.nodeValue;
            }
            var head = document.getElementsByTagName('head')[0];
            if (oldStyleNode === null || keepOldStyleNode === false) {
                var nextEl = sheet && sheet.nextSibling || null;
                if (nextEl) {
                    nextEl.parentNode.insertBefore(styleNode, nextEl);
                } else {
                    head.appendChild(styleNode);
                }
            }
            if (oldStyleNode && keepOldStyleNode === false) {
                oldStyleNode.parentNode.removeChild(oldStyleNode);
            }
            if (styleNode.styleSheet) {
                try {
                    styleNode.styleSheet.cssText = styles;
                } catch (e) {
                    throw new Error("Couldn't reassign styleSheet.cssText.");
                }
            }
        },
        currentScript: function (window) {
            var document = window.document;
            return document.currentScript || function () {
                var scripts = document.getElementsByTagName('script');
                return scripts[scripts.length - 1];
            }();
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