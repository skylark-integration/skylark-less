define([
    './node',
    './paren',
    './comment',
    './dimension',
    '../constants'
], function (__module__0, __module__1, __module__2, __module__3, __module__4) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Paren = __module__1, Comment = __module__2, Dimension = __module__3, MATH = __module__4.Math;
    var Expression = function (value, noSpacing) {
        this.value = value;
        this.noSpacing = noSpacing;
        if (!value) {
            throw new Error('Expression requires an array parameter');
        }
    };
    Expression.prototype = new Node();
    Expression.prototype.type = 'Expression';
    Expression.prototype.accept = function (visitor) {
        this.value = visitor.visitArray(this.value);
    };
    Expression.prototype.eval = function (context) {
        var returnValue, mathOn = context.isMathOn(), inParenthesis = this.parens && (context.math !== MATH.STRICT_LEGACY || !this.parensInOp), doubleParen = false;
        if (inParenthesis) {
            context.inParenthesis();
        }
        if (this.value.length > 1) {
            returnValue = new Expression(this.value.map(function (e) {
                if (!e.eval) {
                    return e;
                }
                return e.eval(context);
            }), this.noSpacing);
        } else if (this.value.length === 1) {
            if (this.value[0].parens && !this.value[0].parensInOp && !context.inCalc) {
                doubleParen = true;
            }
            returnValue = this.value[0].eval(context);
        } else {
            returnValue = this;
        }
        if (inParenthesis) {
            context.outOfParenthesis();
        }
        if (this.parens && this.parensInOp && !mathOn && !doubleParen && !(returnValue instanceof Dimension)) {
            returnValue = new Paren(returnValue);
        }
        return returnValue;
    };
    Expression.prototype.genCSS = function (context, output) {
        for (var i = 0; i < this.value.length; i++) {
            this.value[i].genCSS(context, output);
            if (!this.noSpacing && i + 1 < this.value.length) {
                output.add(' ');
            }
        }
    };
    Expression.prototype.throwAwayComments = function () {
        this.value = this.value.filter(function (v) {
            return !(v instanceof Comment);
        });
    };
    module.exports = Expression;
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