define([
    './node',
    './variable'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Variable = __module__1;
    var JsEvalNode = function () {
    };
    JsEvalNode.prototype = new Node();
    JsEvalNode.prototype.evaluateJavaScript = function (expression, context) {
        var result, that = this, evalContext = {};
        if (!context.javascriptEnabled) {
            throw {
                message: 'Inline JavaScript is not enabled. Is it set in your options?',
                filename: this.fileInfo().filename,
                index: this.getIndex()
            };
        }
        expression = expression.replace(/@\{([\w-]+)\}/g, function (_, name) {
            return that.jsify(new Variable('@' + name, that.getIndex(), that.fileInfo()).eval(context));
        });
        try {
            expression = new Function('return (' + expression + ')');
        } catch (e) {
            throw {
                message: 'JavaScript evaluation error: ' + e.message + ' from `' + expression + '`',
                filename: this.fileInfo().filename,
                index: this.getIndex()
            };
        }
        var variables = context.frames[0].variables();
        for (var k in variables) {
            if (variables.hasOwnProperty(k)) {
                evalContext[k.slice(1)] = {
                    value: variables[k].value,
                    toJS: function () {
                        return this.value.eval(context).toCSS();
                    }
                };
            }
        }
        try {
            result = expression.call(evalContext);
        } catch (e) {
            throw {
                message: "JavaScript evaluation error: '" + e.name + ': ' + e.message.replace(/["]/g, "'") + "'",
                filename: this.fileInfo().filename,
                index: this.getIndex()
            };
        }
        return result;
    };
    JsEvalNode.prototype.jsify = function (obj) {
        if (Array.isArray(obj.value) && obj.value.length > 1) {
            return '[' + obj.value.map(function (v) {
                return v.toCSS();
            }).join(', ') + ']';
        } else {
            return obj.toCSS();
        }
    };
    module.exports = JsEvalNode;
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