define(['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var Paren = function (node) {
        this.value = node;
    };
    Paren.prototype = new Node();
    Paren.prototype.type = 'Paren';
    Paren.prototype.genCSS = function (context, output) {
        output.add('(');
        this.value.genCSS(context, output);
        output.add(')');
    };
    Paren.prototype.eval = function (context) {
        return new Paren(this.value.eval(context));
    };
    module.exports = Paren;
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