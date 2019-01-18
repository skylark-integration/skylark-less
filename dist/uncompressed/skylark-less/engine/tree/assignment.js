define(['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var Assignment = function (key, val) {
        this.key = key;
        this.value = val;
    };
    Assignment.prototype = new Node();
    Assignment.prototype.type = 'Assignment';
    Assignment.prototype.accept = function (visitor) {
        this.value = visitor.visit(this.value);
    };
    Assignment.prototype.eval = function (context) {
        if (this.value.eval) {
            return new Assignment(this.key, this.value.eval(context));
        }
        return this;
    };
    Assignment.prototype.genCSS = function (context, output) {
        output.add(this.key + '=');
        if (this.value.genCSS) {
            this.value.genCSS(context, output);
        } else {
            output.add(this.value);
        }
    };
    module.exports = Assignment;
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