define([
    './function-registry',
    './math-helper'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var functionRegistry = __module__0, mathHelper = __module__1;
    var mathFunctions = {
        ceil: null,
        floor: null,
        sqrt: null,
        abs: null,
        tan: '',
        sin: '',
        cos: '',
        atan: 'rad',
        asin: 'rad',
        acos: 'rad'
    };
    for (var f in mathFunctions) {
        if (mathFunctions.hasOwnProperty(f)) {
            mathFunctions[f] = mathHelper._math.bind(null, Math[f], mathFunctions[f]);
        }
    }
    mathFunctions.round = function (n, f) {
        var fraction = typeof f === 'undefined' ? 0 : f.value;
        return mathHelper._math(function (num) {
            return num.toFixed(fraction);
        }, null, n);
    };
    functionRegistry.addMultiple(mathFunctions);
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