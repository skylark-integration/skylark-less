define([
    './node',
    './declaration'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Declaration = __module__1;
    var Property = function (name, index, currentFileInfo) {
        this.name = name;
        this._index = index;
        this._fileInfo = currentFileInfo;
    };
    Property.prototype = new Node();
    Property.prototype.type = 'Property';
    Property.prototype.eval = function (context) {
        var property, name = this.name;
        var mergeRules = context.pluginManager.less.visitors.ToCSSVisitor.prototype._mergeRules;
        if (this.evaluating) {
            throw {
                type: 'Name',
                message: 'Recursive property reference for ' + name,
                filename: this.fileInfo().filename,
                index: this.getIndex()
            };
        }
        this.evaluating = true;
        property = this.find(context.frames, function (frame) {
            var v, vArr = frame.property(name);
            if (vArr) {
                for (var i = 0; i < vArr.length; i++) {
                    v = vArr[i];
                    vArr[i] = new Declaration(v.name, v.value, v.important, v.merge, v.index, v.currentFileInfo, v.inline, v.variable);
                }
                mergeRules(vArr);
                v = vArr[vArr.length - 1];
                if (v.important) {
                    var importantScope = context.importantScope[context.importantScope.length - 1];
                    importantScope.important = v.important;
                }
                v = v.value.eval(context);
                return v;
            }
        });
        if (property) {
            this.evaluating = false;
            return property;
        } else {
            throw {
                type: 'Name',
                message: "Property '" + name + "' is undefined",
                filename: this.currentFileInfo.filename,
                index: this.index
            };
        }
    };
    Property.prototype.find = function (obj, fun) {
        for (var i = 0, r; i < obj.length; i++) {
            r = fun.call(obj, obj[i]);
            if (r) {
                return r;
            }
        }
        return null;
    };
    module.exports = Property;
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