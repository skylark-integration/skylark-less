define(['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var Combinator = function (value) {
        if (value === ' ') {
            this.value = ' ';
            this.emptyOrWhitespace = true;
        } else {
            this.value = value ? value.trim() : '';
            this.emptyOrWhitespace = this.value === '';
        }
    };
    Combinator.prototype = new Node();
    Combinator.prototype.type = 'Combinator';
    var _noSpaceCombinators = {
        '': true,
        ' ': true,
        '|': true
    };
    Combinator.prototype.genCSS = function (context, output) {
        var spaceOrEmpty = context.compress || _noSpaceCombinators[this.value] ? '' : ' ';
        output.add(spaceOrEmpty + this.value + spaceOrEmpty);
    };
    module.exports = Combinator;
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