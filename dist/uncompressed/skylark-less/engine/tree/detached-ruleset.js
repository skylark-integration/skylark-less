define([
    './node',
    '../contexts',
    '../utils'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, contexts = __module__1, utils = __module__2;
    var DetachedRuleset = function (ruleset, frames) {
        this.ruleset = ruleset;
        this.frames = frames;
        this.setParent(this.ruleset, this);
    };
    DetachedRuleset.prototype = new Node();
    DetachedRuleset.prototype.type = 'DetachedRuleset';
    DetachedRuleset.prototype.evalFirst = true;
    DetachedRuleset.prototype.accept = function (visitor) {
        this.ruleset = visitor.visit(this.ruleset);
    };
    DetachedRuleset.prototype.eval = function (context) {
        var frames = this.frames || utils.copyArray(context.frames);
        return new DetachedRuleset(this.ruleset, frames);
    };
    DetachedRuleset.prototype.callEval = function (context) {
        return this.ruleset.eval(this.frames ? new contexts.Eval(context, this.frames.concat(context.frames)) : context);
    };
    module.exports = DetachedRuleset;
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