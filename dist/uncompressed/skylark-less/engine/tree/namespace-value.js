define([
    './node',
    './variable',
    './ruleset',
    './selector'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Variable = __module__1, Ruleset = __module__2, Selector = __module__3;
    var NamespaceValue = function (ruleCall, lookups, important, index, fileInfo) {
        this.value = ruleCall;
        this.lookups = lookups;
        this.important = important;
        this._index = index;
        this._fileInfo = fileInfo;
    };
    NamespaceValue.prototype = new Node();
    NamespaceValue.prototype.type = 'NamespaceValue';
    NamespaceValue.prototype.eval = function (context) {
        var i, j, name, rules = this.value.eval(context);
        for (i = 0; i < this.lookups.length; i++) {
            name = this.lookups[i];
            if (Array.isArray(rules)) {
                rules = new Ruleset([new Selector()], rules);
            }
            if (name === '') {
                rules = rules.lastDeclaration();
            } else if (name.charAt(0) === '@') {
                if (name.charAt(1) === '@') {
                    name = '@' + new Variable(name.substr(1)).eval(context).value;
                }
                if (rules.variables) {
                    rules = rules.variable(name);
                }
                if (!rules) {
                    throw {
                        type: 'Name',
                        message: 'variable ' + name + ' not found',
                        filename: this.fileInfo().filename,
                        index: this.getIndex()
                    };
                }
            } else {
                if (name.substring(0, 2) === '$@') {
                    name = '$' + new Variable(name.substr(1)).eval(context).value;
                } else {
                    name = name.charAt(0) === '$' ? name : '$' + name;
                }
                if (rules.properties) {
                    rules = rules.property(name);
                }
                if (!rules) {
                    throw {
                        type: 'Name',
                        message: 'property "' + name.substr(1) + '" not found',
                        filename: this.fileInfo().filename,
                        index: this.getIndex()
                    };
                }
                rules = rules[rules.length - 1];
            }
            if (rules.value) {
                rules = rules.eval(context).value;
            }
            if (rules.ruleset) {
                rules = rules.ruleset.eval(context);
            }
        }
        return rules;
    };
    module.exports = NamespaceValue;
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