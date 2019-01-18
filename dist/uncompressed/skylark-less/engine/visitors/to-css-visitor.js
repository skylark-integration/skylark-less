define([
    '../tree/index',
    './visitor'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var tree = __module__0, Visitor = __module__1;
    var CSSVisitorUtils = function (context) {
        this._visitor = new Visitor(this);
        this._context = context;
    };
    CSSVisitorUtils.prototype = {
        containsSilentNonBlockedChild: function (bodyRules) {
            var rule;
            if (!bodyRules) {
                return false;
            }
            for (var r = 0; r < bodyRules.length; r++) {
                rule = bodyRules[r];
                if (rule.isSilent && rule.isSilent(this._context) && !rule.blocksVisibility()) {
                    return true;
                }
            }
            return false;
        },
        keepOnlyVisibleChilds: function (owner) {
            if (owner && owner.rules) {
                owner.rules = owner.rules.filter(function (thing) {
                    return thing.isVisible();
                });
            }
        },
        isEmpty: function (owner) {
            return owner && owner.rules ? owner.rules.length === 0 : true;
        },
        hasVisibleSelector: function (rulesetNode) {
            return rulesetNode && rulesetNode.paths ? rulesetNode.paths.length > 0 : false;
        },
        resolveVisibility: function (node, originalRules) {
            if (!node.blocksVisibility()) {
                if (this.isEmpty(node) && !this.containsSilentNonBlockedChild(originalRules)) {
                    return;
                }
                return node;
            }
            var compiledRulesBody = node.rules[0];
            this.keepOnlyVisibleChilds(compiledRulesBody);
            if (this.isEmpty(compiledRulesBody)) {
                return;
            }
            node.ensureVisibility();
            node.removeVisibilityBlock();
            return node;
        },
        isVisibleRuleset: function (rulesetNode) {
            if (rulesetNode.firstRoot) {
                return true;
            }
            if (this.isEmpty(rulesetNode)) {
                return false;
            }
            if (!rulesetNode.root && !this.hasVisibleSelector(rulesetNode)) {
                return false;
            }
            return true;
        }
    };
    var ToCSSVisitor = function (context) {
        this._visitor = new Visitor(this);
        this._context = context;
        this.utils = new CSSVisitorUtils(context);
    };
    ToCSSVisitor.prototype = {
        isReplacing: true,
        run: function (root) {
            return this._visitor.visit(root);
        },
        visitDeclaration: function (declNode, visitArgs) {
            if (declNode.blocksVisibility() || declNode.variable) {
                return;
            }
            return declNode;
        },
        visitMixinDefinition: function (mixinNode, visitArgs) {
            mixinNode.frames = [];
        },
        visitExtend: function (extendNode, visitArgs) {
        },
        visitComment: function (commentNode, visitArgs) {
            if (commentNode.blocksVisibility() || commentNode.isSilent(this._context)) {
                return;
            }
            return commentNode;
        },
        visitMedia: function (mediaNode, visitArgs) {
            var originalRules = mediaNode.rules[0].rules;
            mediaNode.accept(this._visitor);
            visitArgs.visitDeeper = false;
            return this.utils.resolveVisibility(mediaNode, originalRules);
        },
        visitImport: function (importNode, visitArgs) {
            if (importNode.blocksVisibility()) {
                return;
            }
            return importNode;
        },
        visitAtRule: function (atRuleNode, visitArgs) {
            if (atRuleNode.rules && atRuleNode.rules.length) {
                return this.visitAtRuleWithBody(atRuleNode, visitArgs);
            } else {
                return this.visitAtRuleWithoutBody(atRuleNode, visitArgs);
            }
        },
        visitAnonymous: function (anonymousNode, visitArgs) {
            if (!anonymousNode.blocksVisibility()) {
                anonymousNode.accept(this._visitor);
                return anonymousNode;
            }
        },
        visitAtRuleWithBody: function (atRuleNode, visitArgs) {
            function hasFakeRuleset(atRuleNode) {
                var bodyRules = atRuleNode.rules;
                return bodyRules.length === 1 && (!bodyRules[0].paths || bodyRules[0].paths.length === 0);
            }
            function getBodyRules(atRuleNode) {
                var nodeRules = atRuleNode.rules;
                if (hasFakeRuleset(atRuleNode)) {
                    return nodeRules[0].rules;
                }
                return nodeRules;
            }
            var originalRules = getBodyRules(atRuleNode);
            atRuleNode.accept(this._visitor);
            visitArgs.visitDeeper = false;
            if (!this.utils.isEmpty(atRuleNode)) {
                this._mergeRules(atRuleNode.rules[0].rules);
            }
            return this.utils.resolveVisibility(atRuleNode, originalRules);
        },
        visitAtRuleWithoutBody: function (atRuleNode, visitArgs) {
            if (atRuleNode.blocksVisibility()) {
                return;
            }
            if (atRuleNode.name === '@charset') {
                if (this.charset) {
                    if (atRuleNode.debugInfo) {
                        var comment = new tree.Comment('/* ' + atRuleNode.toCSS(this._context).replace(/\n/g, '') + ' */\n');
                        comment.debugInfo = atRuleNode.debugInfo;
                        return this._visitor.visit(comment);
                    }
                    return;
                }
                this.charset = true;
            }
            return atRuleNode;
        },
        checkValidNodes: function (rules, isRoot) {
            if (!rules) {
                return;
            }
            for (var i = 0; i < rules.length; i++) {
                var ruleNode = rules[i];
                if (isRoot && ruleNode instanceof tree.Declaration && !ruleNode.variable) {
                    throw {
                        message: 'Properties must be inside selector blocks. They cannot be in the root',
                        index: ruleNode.getIndex(),
                        filename: ruleNode.fileInfo() && ruleNode.fileInfo().filename
                    };
                }
                if (ruleNode instanceof tree.Call) {
                    throw {
                        message: "Function '" + ruleNode.name + "' is undefined",
                        index: ruleNode.getIndex(),
                        filename: ruleNode.fileInfo() && ruleNode.fileInfo().filename
                    };
                }
                if (ruleNode.type && !ruleNode.allowRoot) {
                    throw {
                        message: ruleNode.type + ' node returned by a function is not valid here',
                        index: ruleNode.getIndex(),
                        filename: ruleNode.fileInfo() && ruleNode.fileInfo().filename
                    };
                }
            }
        },
        visitRuleset: function (rulesetNode, visitArgs) {
            var rule, rulesets = [];
            this.checkValidNodes(rulesetNode.rules, rulesetNode.firstRoot);
            if (!rulesetNode.root) {
                this._compileRulesetPaths(rulesetNode);
                var nodeRules = rulesetNode.rules, nodeRuleCnt = nodeRules ? nodeRules.length : 0;
                for (var i = 0; i < nodeRuleCnt;) {
                    rule = nodeRules[i];
                    if (rule && rule.rules) {
                        rulesets.push(this._visitor.visit(rule));
                        nodeRules.splice(i, 1);
                        nodeRuleCnt--;
                        continue;
                    }
                    i++;
                }
                if (nodeRuleCnt > 0) {
                    rulesetNode.accept(this._visitor);
                } else {
                    rulesetNode.rules = null;
                }
                visitArgs.visitDeeper = false;
            } else {
                rulesetNode.accept(this._visitor);
                visitArgs.visitDeeper = false;
            }
            if (rulesetNode.rules) {
                this._mergeRules(rulesetNode.rules);
                this._removeDuplicateRules(rulesetNode.rules);
            }
            if (this.utils.isVisibleRuleset(rulesetNode)) {
                rulesetNode.ensureVisibility();
                rulesets.splice(0, 0, rulesetNode);
            }
            if (rulesets.length === 1) {
                return rulesets[0];
            }
            return rulesets;
        },
        _compileRulesetPaths: function (rulesetNode) {
            if (rulesetNode.paths) {
                rulesetNode.paths = rulesetNode.paths.filter(function (p) {
                    var i;
                    if (p[0].elements[0].combinator.value === ' ') {
                        p[0].elements[0].combinator = new tree.Combinator('');
                    }
                    for (i = 0; i < p.length; i++) {
                        if (p[i].isVisible() && p[i].getIsOutput()) {
                            return true;
                        }
                    }
                    return false;
                });
            }
        },
        _removeDuplicateRules: function (rules) {
            if (!rules) {
                return;
            }
            var ruleCache = {}, ruleList, rule, i;
            for (i = rules.length - 1; i >= 0; i--) {
                rule = rules[i];
                if (rule instanceof tree.Declaration) {
                    if (!ruleCache[rule.name]) {
                        ruleCache[rule.name] = rule;
                    } else {
                        ruleList = ruleCache[rule.name];
                        if (ruleList instanceof tree.Declaration) {
                            ruleList = ruleCache[rule.name] = [ruleCache[rule.name].toCSS(this._context)];
                        }
                        var ruleCSS = rule.toCSS(this._context);
                        if (ruleList.indexOf(ruleCSS) !== -1) {
                            rules.splice(i, 1);
                        } else {
                            ruleList.push(ruleCSS);
                        }
                    }
                }
            }
        },
        _mergeRules: function (rules) {
            if (!rules) {
                return;
            }
            var groups = {}, groupsArr = [];
            for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];
                if (rule.merge) {
                    var key = rule.name;
                    groups[key] ? rules.splice(i--, 1) : groupsArr.push(groups[key] = []);
                    groups[key].push(rule);
                }
            }
            groupsArr.forEach(function (group) {
                if (group.length > 0) {
                    var result = group[0], space = [], comma = [new tree.Expression(space)];
                    group.forEach(function (rule) {
                        if (rule.merge === '+' && space.length > 0) {
                            comma.push(new tree.Expression(space = []));
                        }
                        space.push(rule.value);
                        result.important = result.important || rule.important;
                    });
                    result.value = new tree.Value(comma);
                }
            });
        }
    };
    module.exports = ToCSSVisitor;
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