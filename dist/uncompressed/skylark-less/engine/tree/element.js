define([
    './node',
    './paren',
    './combinator'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Paren = __module__1, Combinator = __module__2;
    var Element = function (combinator, value, isVariable, index, currentFileInfo, visibilityInfo) {
        this.combinator = combinator instanceof Combinator ? combinator : new Combinator(combinator);
        if (typeof value === 'string') {
            this.value = value.trim();
        } else if (value) {
            this.value = value;
        } else {
            this.value = '';
        }
        this.isVariable = isVariable;
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.copyVisibilityInfo(visibilityInfo);
        this.setParent(this.combinator, this);
    };
    Element.prototype = new Node();
    Element.prototype.type = 'Element';
    Element.prototype.accept = function (visitor) {
        var value = this.value;
        this.combinator = visitor.visit(this.combinator);
        if (typeof value === 'object') {
            this.value = visitor.visit(value);
        }
    };
    Element.prototype.eval = function (context) {
        return new Element(this.combinator, this.value.eval ? this.value.eval(context) : this.value, this.isVariable, this.getIndex(), this.fileInfo(), this.visibilityInfo());
    };
    Element.prototype.clone = function () {
        return new Element(this.combinator, this.value, this.isVariable, this.getIndex(), this.fileInfo(), this.visibilityInfo());
    };
    Element.prototype.genCSS = function (context, output) {
        output.add(this.toCSS(context), this.fileInfo(), this.getIndex());
    };
    Element.prototype.toCSS = function (context) {
        context = context || {};
        var value = this.value, firstSelector = context.firstSelector;
        if (value instanceof Paren) {
            context.firstSelector = true;
        }
        value = value.toCSS ? value.toCSS(context) : value;
        context.firstSelector = firstSelector;
        if (value === '' && this.combinator.value.charAt(0) === '&') {
            return '';
        } else {
            return this.combinator.toCSS(context) + value;
        }
    };
    module.exports = Element;
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