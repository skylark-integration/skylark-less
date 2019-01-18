define(['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var UnicodeDescriptor = function (value) {
        this.value = value;
    };
    UnicodeDescriptor.prototype = new Node();
    UnicodeDescriptor.prototype.type = 'UnicodeDescriptor';
    module.exports = UnicodeDescriptor;
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