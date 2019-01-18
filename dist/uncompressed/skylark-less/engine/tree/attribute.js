define(['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var Attribute = function (key, op, value) {
        this.key = key;
        this.op = op;
        this.value = value;
    };
    Attribute.prototype = new Node();
    Attribute.prototype.type = 'Attribute';
    Attribute.prototype.eval = function (context) {
        return new Attribute(this.key.eval ? this.key.eval(context) : this.key, this.op, this.value && this.value.eval ? this.value.eval(context) : this.value);
    };
    Attribute.prototype.genCSS = function (context, output) {
        output.add(this.toCSS(context));
    };
    Attribute.prototype.toCSS = function (context) {
        var value = this.key.toCSS ? this.key.toCSS(context) : this.key;
        if (this.op) {
            value += this.op;
            value += this.value.toCSS ? this.value.toCSS(context) : this.value;
        }
        return '[' + value + ']';
    };
    module.exports = Attribute;
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