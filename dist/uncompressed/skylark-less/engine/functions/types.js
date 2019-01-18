define([
    '../tree/keyword',
    '../tree/detached-ruleset',
    '../tree/dimension',
    '../tree/color',
    '../tree/quoted',
    '../tree/anonymous',
    '../tree/url',
    '../tree/operation',
    './function-registry'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6, __module__7, __module__8) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Keyword = __module__0, DetachedRuleset = __module__1, Dimension = __module__2, Color = __module__3, Quoted = __module__4, Anonymous = __module__5, URL = __module__6, Operation = __module__7, functionRegistry = __module__8;
    var isa = function (n, Type) {
            return n instanceof Type ? Keyword.True : Keyword.False;
        }, isunit = function (n, unit) {
            if (unit === undefined) {
                throw {
                    type: 'Argument',
                    message: 'missing the required second argument to isunit.'
                };
            }
            unit = typeof unit.value === 'string' ? unit.value : unit;
            if (typeof unit !== 'string') {
                throw {
                    type: 'Argument',
                    message: 'Second argument to isunit should be a unit or a string.'
                };
            }
            return n instanceof Dimension && n.unit.is(unit) ? Keyword.True : Keyword.False;
        };
    functionRegistry.addMultiple({
        isruleset: function (n) {
            return isa(n, DetachedRuleset);
        },
        iscolor: function (n) {
            return isa(n, Color);
        },
        isnumber: function (n) {
            return isa(n, Dimension);
        },
        isstring: function (n) {
            return isa(n, Quoted);
        },
        iskeyword: function (n) {
            return isa(n, Keyword);
        },
        isurl: function (n) {
            return isa(n, URL);
        },
        ispixel: function (n) {
            return isunit(n, 'px');
        },
        ispercentage: function (n) {
            return isunit(n, '%');
        },
        isem: function (n) {
            return isunit(n, 'em');
        },
        isunit: isunit,
        unit: function (val, unit) {
            if (!(val instanceof Dimension)) {
                throw {
                    type: 'Argument',
                    message: 'the first argument to unit must be a number' + (val instanceof Operation ? '. Have you forgotten parenthesis?' : '')
                };
            }
            if (unit) {
                if (unit instanceof Keyword) {
                    unit = unit.value;
                } else {
                    unit = unit.toCSS();
                }
            } else {
                unit = '';
            }
            return new Dimension(val.value, unit);
        },
        'get-unit': function (n) {
            return new Anonymous(n.unit);
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