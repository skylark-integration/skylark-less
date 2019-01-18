define([
    './node',
    './selector',
    './ruleset',
    './anonymous'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Selector = __module__1, Ruleset = __module__2, Anonymous = __module__3;
    var AtRule = function (name, value, rules, index, currentFileInfo, debugInfo, isRooted, visibilityInfo) {
        var i;
        this.name = name;
        this.value = value instanceof Node ? value : value ? new Anonymous(value) : value;
        if (rules) {
            if (Array.isArray(rules)) {
                this.rules = rules;
            } else {
                this.rules = [rules];
                this.rules[0].selectors = new Selector([], null, null, index, currentFileInfo).createEmptySelectors();
            }
            for (i = 0; i < this.rules.length; i++) {
                this.rules[i].allowImports = true;
            }
            this.setParent(this.rules, this);
        }
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.debugInfo = debugInfo;
        this.isRooted = isRooted || false;
        this.copyVisibilityInfo(visibilityInfo);
        this.allowRoot = true;
    };
    AtRule.prototype = new Node();
    AtRule.prototype.type = 'AtRule';
    AtRule.prototype.accept = function (visitor) {
        var value = this.value, rules = this.rules;
        if (rules) {
            this.rules = visitor.visitArray(rules);
        }
        if (value) {
            this.value = visitor.visit(value);
        }
    };
    AtRule.prototype.isRulesetLike = function () {
        return this.rules || !this.isCharset();
    };
    AtRule.prototype.isCharset = function () {
        return '@charset' === this.name;
    };
    AtRule.prototype.genCSS = function (context, output) {
        var value = this.value, rules = this.rules;
        output.add(this.name, this.fileInfo(), this.getIndex());
        if (value) {
            output.add(' ');
            value.genCSS(context, output);
        }
        if (rules) {
            this.outputRuleset(context, output, rules);
        } else {
            output.add(';');
        }
    };
    AtRule.prototype.eval = function (context) {
        var mediaPathBackup, mediaBlocksBackup, value = this.value, rules = this.rules;
        mediaPathBackup = context.mediaPath;
        mediaBlocksBackup = context.mediaBlocks;
        context.mediaPath = [];
        context.mediaBlocks = [];
        if (value) {
            value = value.eval(context);
        }
        if (rules) {
            rules = [rules[0].eval(context)];
            rules[0].root = true;
        }
        context.mediaPath = mediaPathBackup;
        context.mediaBlocks = mediaBlocksBackup;
        return new AtRule(this.name, value, rules, this.getIndex(), this.fileInfo(), this.debugInfo, this.isRooted, this.visibilityInfo());
    };
    AtRule.prototype.variable = function (name) {
        if (this.rules) {
            return Ruleset.prototype.variable.call(this.rules[0], name);
        }
    };
    AtRule.prototype.find = function () {
        if (this.rules) {
            return Ruleset.prototype.find.apply(this.rules[0], arguments);
        }
    };
    AtRule.prototype.rulesets = function () {
        if (this.rules) {
            return Ruleset.prototype.rulesets.apply(this.rules[0]);
        }
    };
    AtRule.prototype.outputRuleset = function (context, output, rules) {
        var ruleCnt = rules.length, i;
        context.tabLevel = (context.tabLevel | 0) + 1;
        if (context.compress) {
            output.add('{');
            for (i = 0; i < ruleCnt; i++) {
                rules[i].genCSS(context, output);
            }
            output.add('}');
            context.tabLevel--;
            return;
        }
        var tabSetStr = '\n' + Array(context.tabLevel).join('  '), tabRuleStr = tabSetStr + '  ';
        if (!ruleCnt) {
            output.add(' {' + tabSetStr + '}');
        } else {
            output.add(' {' + tabRuleStr);
            rules[0].genCSS(context, output);
            for (i = 1; i < ruleCnt; i++) {
                output.add(tabRuleStr);
                rules[i].genCSS(context, output);
            }
            output.add(tabSetStr + '}');
        }
        context.tabLevel--;
    };
    module.exports = AtRule;
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