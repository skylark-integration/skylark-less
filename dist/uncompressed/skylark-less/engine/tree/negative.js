define([
    './node',
    './operation',
    './dimension'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Operation = __module__1, Dimension = __module__2;
    var Negative = function (node) {
        this.value = node;
    };
    Negative.prototype = new Node();
    Negative.prototype.type = 'Negative';
    Negative.prototype.genCSS = function (context, output) {
        output.add('-');
        this.value.genCSS(context, output);
    };
    Negative.prototype.eval = function (context) {
        if (context.isMathOn()) {
            return new Operation('*', [
                new Dimension(-1),
                this.value
            ]).eval(context);
        }
        return new Negative(this.value.eval(context));
    };
    module.exports = Negative;
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