define([], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = {
        length: {
            'm': 1,
            'cm': 0.01,
            'mm': 0.001,
            'in': 0.0254,
            'px': 0.0254 / 96,
            'pt': 0.0254 / 72,
            'pc': 0.0254 / 72 * 12
        },
        duration: {
            's': 1,
            'ms': 0.001
        },
        angle: {
            'rad': 1 / (2 * Math.PI),
            'deg': 1 / 360,
            'grad': 1 / 400,
            'turn': 1
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