define([], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = {
        Math: {
            ALWAYS: 0,
            PARENS_DIVISION: 1,
            PARENS: 2,
            STRICT_LEGACY: 3
        },
        RewriteUrls: {
            OFF: 0,
            LOCAL: 1,
            ALL: 2
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