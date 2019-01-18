define([
    './function-registry',
    '../tree/anonymous',
    '../tree/keyword'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var functionRegistry = __module__0, Anonymous = __module__1, Keyword = __module__2;
    functionRegistry.addMultiple({
        boolean: function (condition) {
            return condition ? Keyword.True : Keyword.False;
        },
        'if': function (condition, trueValue, falseValue) {
            return condition ? trueValue : falseValue || new Anonymous();
        }
    });
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