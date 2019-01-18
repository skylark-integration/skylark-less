define(['./visitor'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Visitor = __module__0;
    var JoinSelectorVisitor = function () {
        this.contexts = [[]];
        this._visitor = new Visitor(this);
    };
    JoinSelectorVisitor.prototype = {
        run: function (root) {
            return this._visitor.visit(root);
        },
        visitDeclaration: function (declNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitMixinDefinition: function (mixinDefinitionNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitRuleset: function (rulesetNode, visitArgs) {
            var context = this.contexts[this.contexts.length - 1], paths = [], selectors;
            this.contexts.push(paths);
            if (!rulesetNode.root) {
                selectors = rulesetNode.selectors;
                if (selectors) {
                    selectors = selectors.filter(function (selector) {
                        return selector.getIsOutput();
                    });
                    rulesetNode.selectors = selectors.length ? selectors : selectors = null;
                    if (selectors) {
                        rulesetNode.joinSelectors(paths, context, selectors);
                    }
                }
                if (!selectors) {
                    rulesetNode.rules = null;
                }
                rulesetNode.paths = paths;
            }
        },
        visitRulesetOut: function (rulesetNode) {
            this.contexts.length = this.contexts.length - 1;
        },
        visitMedia: function (mediaNode, visitArgs) {
            var context = this.contexts[this.contexts.length - 1];
            mediaNode.rules[0].root = context.length === 0 || context[0].multiMedia;
        },
        visitAtRule: function (atRuleNode, visitArgs) {
            var context = this.contexts[this.contexts.length - 1];
            if (atRuleNode.rules && atRuleNode.rules.length) {
                atRuleNode.rules[0].root = atRuleNode.isRooted || context.length === 0 || null;
            }
        }
    };
    module.exports = JoinSelectorVisitor;
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