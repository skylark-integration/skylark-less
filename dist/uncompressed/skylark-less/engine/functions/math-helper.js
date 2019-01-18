define(['../tree/dimension'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Dimension = __module__0;
    var MathHelper = function () {
    };
    MathHelper._math = function (fn, unit, n) {
        if (!(n instanceof Dimension)) {
            throw {
                type: 'Argument',
                message: 'argument must be a number'
            };
        }
        if (unit == null) {
            unit = n.unit;
        } else {
            n = n.unify();
        }
        return new Dimension(fn(parseFloat(n.value)), unit);
    };
    module.exports = MathHelper;
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