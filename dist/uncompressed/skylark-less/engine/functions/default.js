define([
    '../tree/keyword',
    './function-registry'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Keyword = __module__0, functionRegistry = __module__1;
    var defaultFunc = {
        eval: function () {
            var v = this.value_, e = this.error_;
            if (e) {
                throw e;
            }
            if (v != null) {
                return v ? Keyword.True : Keyword.False;
            }
        },
        value: function (v) {
            this.value_ = v;
        },
        error: function (e) {
            this.error_ = e;
        },
        reset: function () {
            this.value_ = this.error_ = null;
        }
    };
    functionRegistry.add('default', defaultFunc.eval.bind(defaultFunc));
    module.exports = defaultFunc;
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