define(['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var Condition = function (op, l, r, i, negate) {
        this.op = op.trim();
        this.lvalue = l;
        this.rvalue = r;
        this._index = i;
        this.negate = negate;
    };
    Condition.prototype = new Node();
    Condition.prototype.type = 'Condition';
    Condition.prototype.accept = function (visitor) {
        this.lvalue = visitor.visit(this.lvalue);
        this.rvalue = visitor.visit(this.rvalue);
    };
    Condition.prototype.eval = function (context) {
        var result = function (op, a, b) {
            switch (op) {
            case 'and':
                return a && b;
            case 'or':
                return a || b;
            default:
                switch (Node.compare(a, b)) {
                case -1:
                    return op === '<' || op === '=<' || op === '<=';
                case 0:
                    return op === '=' || op === '>=' || op === '=<' || op === '<=';
                case 1:
                    return op === '>' || op === '>=';
                default:
                    return false;
                }
            }
        }(this.op, this.lvalue.eval(context), this.rvalue.eval(context));
        return this.negate ? !result : result;
    };
    module.exports = Condition;
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