define([
    './js-eval-node',
    './dimension',
    './quoted',
    './anonymous'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var JsEvalNode = __module__0, Dimension = __module__1, Quoted = __module__2, Anonymous = __module__3;
    var JavaScript = function (string, escaped, index, currentFileInfo) {
        this.escaped = escaped;
        this.expression = string;
        this._index = index;
        this._fileInfo = currentFileInfo;
    };
    JavaScript.prototype = new JsEvalNode();
    JavaScript.prototype.type = 'JavaScript';
    JavaScript.prototype.eval = function (context) {
        var result = this.evaluateJavaScript(this.expression, context);
        var type = typeof result;
        if (type === 'number' && !isNaN(result)) {
            return new Dimension(result);
        } else if (type === 'string') {
            return new Quoted('"' + result + '"', result, this.escaped, this._index);
        } else if (Array.isArray(result)) {
            return new Anonymous(result.join(', '));
        } else {
            return new Anonymous(result);
        }
    };
    module.exports = JavaScript;
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