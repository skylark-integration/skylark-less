define([
    './node',
    './value',
    './keyword',
    './anonymous',
    '../constants'
], function (__module__0, __module__1, __module__2, __module__3, __module__4) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Value = __module__1, Keyword = __module__2, Anonymous = __module__3, MATH = __module__4.Math;
    var Declaration = function (name, value, important, merge, index, currentFileInfo, inline, variable) {
        this.name = name;
        this.value = value instanceof Node ? value : new Value([value ? new Anonymous(value) : null]);
        this.important = important ? ' ' + important.trim() : '';
        this.merge = merge;
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.inline = inline || false;
        this.variable = variable !== undefined ? variable : name.charAt && name.charAt(0) === '@';
        this.allowRoot = true;
        this.setParent(this.value, this);
    };
    function evalName(context, name) {
        var value = '', i, n = name.length, output = {
                add: function (s) {
                    value += s;
                }
            };
        for (i = 0; i < n; i++) {
            name[i].eval(context).genCSS(context, output);
        }
        return value;
    }
    Declaration.prototype = new Node();
    Declaration.prototype.type = 'Declaration';
    Declaration.prototype.genCSS = function (context, output) {
        output.add(this.name + (context.compress ? ':' : ': '), this.fileInfo(), this.getIndex());
        try {
            this.value.genCSS(context, output);
        } catch (e) {
            e.index = this._index;
            e.filename = this._fileInfo.filename;
            throw e;
        }
        output.add(this.important + (this.inline || context.lastRule && context.compress ? '' : ';'), this._fileInfo, this._index);
    };
    Declaration.prototype.eval = function (context) {
        var mathBypass = false, prevMath, name = this.name, evaldValue, variable = this.variable;
        if (typeof name !== 'string') {
            name = name.length === 1 && name[0] instanceof Keyword ? name[0].value : evalName(context, name);
            variable = false;
        }
        if (name === 'font' && context.math === MATH.ALWAYS) {
            mathBypass = true;
            prevMath = context.math;
            context.math = MATH.PARENS_DIVISION;
        }
        try {
            context.importantScope.push({});
            evaldValue = this.value.eval(context);
            if (!this.variable && evaldValue.type === 'DetachedRuleset') {
                throw {
                    message: 'Rulesets cannot be evaluated on a property.',
                    index: this.getIndex(),
                    filename: this.fileInfo().filename
                };
            }
            var important = this.important, importantResult = context.importantScope.pop();
            if (!important && importantResult.important) {
                important = importantResult.important;
            }
            return new Declaration(name, evaldValue, important, this.merge, this.getIndex(), this.fileInfo(), this.inline, variable);
        } catch (e) {
            if (typeof e.index !== 'number') {
                e.index = this.getIndex();
                e.filename = this.fileInfo().filename;
            }
            throw e;
        } finally {
            if (mathBypass) {
                context.math = prevMath;
            }
        }
    };
    Declaration.prototype.makeImportant = function () {
        return new Declaration(this.name, this.value, '!important', this.merge, this.getIndex(), this.fileInfo(), this.inline);
    };
    module.exports = Declaration;
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