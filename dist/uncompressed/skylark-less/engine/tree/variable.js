define([
    './node',
    './call'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Call = __module__1;
    var Variable = function (name, index, currentFileInfo) {
        this.name = name;
        this._index = index;
        this._fileInfo = currentFileInfo;
    };
    Variable.prototype = new Node();
    Variable.prototype.type = 'Variable';
    Variable.prototype.eval = function (context) {
        var variable, name = this.name;
        if (name.indexOf('@@') === 0) {
            name = '@' + new Variable(name.slice(1), this.getIndex(), this.fileInfo()).eval(context).value;
        }
        if (this.evaluating) {
            throw {
                type: 'Name',
                message: 'Recursive variable definition for ' + name,
                filename: this.fileInfo().filename,
                index: this.getIndex()
            };
        }
        this.evaluating = true;
        variable = this.find(context.frames, function (frame) {
            var v = frame.variable(name);
            if (v) {
                if (v.important) {
                    var importantScope = context.importantScope[context.importantScope.length - 1];
                    importantScope.important = v.important;
                }
                if (context.inCalc) {
                    return new Call('_SELF', [v.value]).eval(context);
                } else {
                    return v.value.eval(context);
                }
            }
        });
        if (variable) {
            this.evaluating = false;
            return variable;
        } else {
            throw {
                type: 'Name',
                message: 'variable ' + name + ' is undefined',
                filename: this.fileInfo().filename,
                index: this.getIndex()
            };
        }
    };
    Variable.prototype.find = function (obj, fun) {
        for (var i = 0, r; i < obj.length; i++) {
            r = fun.call(obj, obj[i]);
            if (r) {
                return r;
            }
        }
        return null;
    };
    module.exports = Variable;
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