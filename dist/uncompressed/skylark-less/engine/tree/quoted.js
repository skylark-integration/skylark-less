define([
    './node',
    './variable',
    './property'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Variable = __module__1, Property = __module__2;
    var Quoted = function (str, content, escaped, index, currentFileInfo) {
        this.escaped = escaped == null ? true : escaped;
        this.value = content || '';
        this.quote = str.charAt(0);
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.variableRegex = /@\{([\w-]+)\}/g;
        this.propRegex = /\$\{([\w-]+)\}/g;
    };
    Quoted.prototype = new Node();
    Quoted.prototype.type = 'Quoted';
    Quoted.prototype.genCSS = function (context, output) {
        if (!this.escaped) {
            output.add(this.quote, this.fileInfo(), this.getIndex());
        }
        output.add(this.value);
        if (!this.escaped) {
            output.add(this.quote);
        }
    };
    Quoted.prototype.containsVariables = function () {
        return this.value.match(this.variableRegex);
    };
    Quoted.prototype.eval = function (context) {
        var that = this, value = this.value;
        var variableReplacement = function (_, name) {
            var v = new Variable('@' + name, that.getIndex(), that.fileInfo()).eval(context, true);
            return v instanceof Quoted ? v.value : v.toCSS();
        };
        var propertyReplacement = function (_, name) {
            var v = new Property('$' + name, that.getIndex(), that.fileInfo()).eval(context, true);
            return v instanceof Quoted ? v.value : v.toCSS();
        };
        function iterativeReplace(value, regexp, replacementFnc) {
            var evaluatedValue = value;
            do {
                value = evaluatedValue;
                evaluatedValue = value.replace(regexp, replacementFnc);
            } while (value !== evaluatedValue);
            return evaluatedValue;
        }
        value = iterativeReplace(value, this.variableRegex, variableReplacement);
        value = iterativeReplace(value, this.propRegex, propertyReplacement);
        return new Quoted(this.quote + value + this.quote, value, this.escaped, this.getIndex(), this.fileInfo());
    };
    Quoted.prototype.compare = function (other) {
        if (other.type === 'Quoted' && !this.escaped && !other.escaped) {
            return Node.numericCompare(this.value, other.value);
        } else {
            return other.toCSS && this.toCSS() === other.toCSS() ? 0 : undefined;
        }
    };
    module.exports = Quoted;
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