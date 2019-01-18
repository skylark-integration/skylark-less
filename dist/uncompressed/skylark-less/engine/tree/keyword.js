define(['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var Keyword = function (value) {
        this.value = value;
    };
    Keyword.prototype = new Node();
    Keyword.prototype.type = 'Keyword';
    Keyword.prototype.genCSS = function (context, output) {
        if (this.value === '%') {
            throw {
                type: 'Syntax',
                message: 'Invalid % without number'
            };
        }
        output.add(this.value);
    };
    Keyword.True = new Keyword('true');
    Keyword.False = new Keyword('false');
    module.exports = Keyword;
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