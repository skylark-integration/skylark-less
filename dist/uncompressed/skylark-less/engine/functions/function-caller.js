define(['../tree/expression'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Expression = __module__0;
    var functionCaller = function (name, context, index, currentFileInfo) {
        this.name = name.toLowerCase();
        this.index = index;
        this.context = context;
        this.currentFileInfo = currentFileInfo;
        this.func = context.frames[0].functionRegistry.get(this.name);
    };
    functionCaller.prototype.isValid = function () {
        return Boolean(this.func);
    };
    functionCaller.prototype.call = function (args) {
        if (Array.isArray(args)) {
            args = args.filter(function (item) {
                if (item.type === 'Comment') {
                    return false;
                }
                return true;
            }).map(function (item) {
                if (item.type === 'Expression') {
                    var subNodes = item.value.filter(function (item) {
                        if (item.type === 'Comment') {
                            return false;
                        }
                        return true;
                    });
                    if (subNodes.length === 1) {
                        return subNodes[0];
                    } else {
                        return new Expression(subNodes);
                    }
                }
                return item;
            });
        }
        return this.func.apply(this, args);
    };
    module.exports = functionCaller;
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