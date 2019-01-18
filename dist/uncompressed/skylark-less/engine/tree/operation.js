define([
    './node',
    './color',
    './dimension',
    '../constants'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Color = __module__1, Dimension = __module__2, MATH = __module__3.Math;
    var Operation = function (op, operands, isSpaced) {
        this.op = op.trim();
        this.operands = operands;
        this.isSpaced = isSpaced;
    };
    Operation.prototype = new Node();
    Operation.prototype.type = 'Operation';
    Operation.prototype.accept = function (visitor) {
        this.operands = visitor.visit(this.operands);
    };
    Operation.prototype.eval = function (context) {
        var a = this.operands[0].eval(context), b = this.operands[1].eval(context), op;
        if (context.isMathOn(this.op)) {
            op = this.op === './' ? '/' : this.op;
            if (a instanceof Dimension && b instanceof Color) {
                a = a.toColor();
            }
            if (b instanceof Dimension && a instanceof Color) {
                b = b.toColor();
            }
            if (!a.operate) {
                if (a instanceof Operation && a.op === '/' && context.math === MATH.PARENS_DIVISION) {
                    return new Operation(this.op, [
                        a,
                        b
                    ], this.isSpaced);
                }
                throw {
                    type: 'Operation',
                    message: 'Operation on an invalid type'
                };
            }
            return a.operate(context, op, b);
        } else {
            return new Operation(this.op, [
                a,
                b
            ], this.isSpaced);
        }
    };
    Operation.prototype.genCSS = function (context, output) {
        this.operands[0].genCSS(context, output);
        if (this.isSpaced) {
            output.add(' ');
        }
        output.add(this.op);
        if (this.isSpaced) {
            output.add(' ');
        }
        this.operands[1].genCSS(context, output);
    };
    module.exports = Operation;
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