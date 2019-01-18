define([
    './node',
    './variable',
    './ruleset',
    './detached-ruleset',
    '../less-error'
], function (__module__0, __module__1, __module__2, __module__3, __module__4) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Variable = __module__1, Ruleset = __module__2, DetachedRuleset = __module__3, LessError = __module__4;
    var VariableCall = function (variable, index, currentFileInfo) {
        this.variable = variable;
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.allowRoot = true;
    };
    VariableCall.prototype = new Node();
    VariableCall.prototype.type = 'VariableCall';
    VariableCall.prototype.eval = function (context) {
        var rules, detachedRuleset = new Variable(this.variable, this.getIndex(), this.fileInfo()).eval(context), error = new LessError({ message: 'Could not evaluate variable call ' + this.variable });
        if (!detachedRuleset.ruleset) {
            if (detachedRuleset.rules) {
                rules = detachedRuleset;
            } else if (Array.isArray(detachedRuleset)) {
                rules = new Ruleset('', detachedRuleset);
            } else if (Array.isArray(detachedRuleset.value)) {
                rules = new Ruleset('', detachedRuleset.value);
            } else {
                throw error;
            }
            detachedRuleset = new DetachedRuleset(rules);
        }
        if (detachedRuleset.ruleset) {
            return detachedRuleset.callEval(context);
        }
        throw error;
    };
    module.exports = VariableCall;
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