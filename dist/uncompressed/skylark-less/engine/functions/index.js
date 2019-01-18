define([
    './function-registry',
    './function-caller',
    './boolean',
    './default',
    './color',
    './color-blending',
    './data-uri',
    './list',
    './math',
    './number',
    './string',
    './svg',
    './types'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6, __module__7, __module__8, __module__9, __module__10, __module__11, __module__12) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = function (environment) {
        var functions = {
            functionRegistry: __module__0,
            functionCaller: __module__1
        };
        __module__2;
        __module__3;
        __module__4;
        __module__5;
        __module__6(environment);
        __module__7;
        __module__8;
        __module__9;
        __module__10;
        __module__11(environment);
        __module__12;
        return functions;
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