define([], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = function (window, options, logger) {
        var cache = null;
        if (options.env !== 'development') {
            try {
                cache = typeof window.localStorage === 'undefined' ? null : window.localStorage;
            } catch (_) {
            }
        }
        return {
            setCSS: function (path, lastModified, modifyVars, styles) {
                if (cache) {
                    logger.info('saving ' + path + ' to cache.');
                    try {
                        cache.setItem(path, styles);
                        cache.setItem(path + ':timestamp', lastModified);
                        if (modifyVars) {
                            cache.setItem(path + ':vars', JSON.stringify(modifyVars));
                        }
                    } catch (e) {
                        logger.error('failed to save "' + path + '" to local storage for caching.');
                    }
                }
            },
            getCSS: function (path, webInfo, modifyVars) {
                var css = cache && cache.getItem(path), timestamp = cache && cache.getItem(path + ':timestamp'), vars = cache && cache.getItem(path + ':vars');
                modifyVars = modifyVars || {};
                vars = vars || '{}';
                if (timestamp && webInfo.lastModified && new Date(webInfo.lastModified).valueOf() === new Date(timestamp).valueOf() && JSON.stringify(modifyVars) === vars) {
                    return css;
                }
            }
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