var Node = require('./node'), Declaration = require('./declaration'), Keyword = require('./keyword'), Comment = require('./comment'), Paren = require('./paren'), Selector = require('./selector'), Element = require('./element'), Anonymous = require('./anonymous'), contexts = require('../contexts'), globalFunctionRegistry = require('../functions/function-registry'), defaultFunc = require('../functions/default'), getDebugInfo = require('./debug-info'), utils = require('../utils');
var Ruleset = function (selectors, rules, strictImports, visibilityInfo) {
    this.selectors = selectors;
    this.rules = rules;
    this._lookups = {};
    this._variables = null;
    this._properties = null;
    this.strictImports = strictImports;
    this.copyVisibilityInfo(visibilityInfo);
    this.allowRoot = true;
    this.setParent(this.selectors, this);
    this.setParent(this.rules, this);
};
Ruleset.prototype = new Node();
Ruleset.prototype.type = 'Ruleset';
Ruleset.prototype.isRuleset = true;
Ruleset.prototype.isRulesetLike = function () {
    return true;
};
Ruleset.prototype.accept = function (visitor) {
    if (this.paths) {
        this.paths = visitor.visitArray(this.paths, true);
    } else if (this.selectors) {
        this.selectors = visitor.visitArray(this.selectors);
    }
    if (this.rules && this.rules.length) {
        this.rules = visitor.visitArray(this.rules);
    }
};
Ruleset.prototype.eval = function (context) {
    var that = this, selectors, selCnt, selector, i, hasVariable, hasOnePassingSelector = false;
    if (this.selectors && (selCnt = this.selectors.length)) {
        selectors = new Array(selCnt);
        defaultFunc.error({
            type: 'Syntax',
            message: 'it is currently only allowed in parametric mixin guards,'
        });
        for (i = 0; i < selCnt; i++) {
            selector = this.selectors[i].eval(context);
            for (var j = 0; j < selector.elements.length; j++) {
                if (selector.elements[j].isVariable) {
                    hasVariable = true;
                    break;
                }
            }
            selectors[i] = selector;
            if (selector.evaldCondition) {
                hasOnePassingSelector = true;
            }
        }
        if (hasVariable) {
            var toParseSelectors = new Array(selCnt);
            for (i = 0; i < selCnt; i++) {
                selector = selectors[i];
                toParseSelectors[i] = selector.toCSS(context);
            }
            this.parse.parseNode(toParseSelectors.join(','), ['selectors'], selectors[0].getIndex(), selectors[0].fileInfo(), function (err, result) {
                if (result) {
                    selectors = utils.flattenArray(result);
                }
            });
        }
        defaultFunc.reset();
    } else {
        hasOnePassingSelector = true;
    }
    var rules = this.rules ? utils.copyArray(this.rules) : null, ruleset = new Ruleset(selectors, rules, this.strictImports, this.visibilityInfo()), rule, subRule;
    ruleset.originalRuleset = this;
    ruleset.root = this.root;
    ruleset.firstRoot = this.firstRoot;
    ruleset.allowImports = this.allowImports;
    if (this.debugInfo) {
        ruleset.debugInfo = this.debugInfo;
    }
    if (!hasOnePassingSelector) {
        rules.length = 0;
    }
    ruleset.functionRegistry = function (frames) {
        var i = 0, n = frames.length, found;
        for (; i !== n; ++i) {
            found = frames[i].functionRegistry;
            if (found) {
                return found;
            }
        }
        return globalFunctionRegistry;
    }(context.frames).inherit();
    var ctxFrames = context.frames;
    ctxFrames.unshift(ruleset);
    var ctxSelectors = context.selectors;
    if (!ctxSelectors) {
        context.selectors = ctxSelectors = [];
    }
    ctxSelectors.unshift(this.selectors);
    if (ruleset.root || ruleset.allowImports || !ruleset.strictImports) {
        ruleset.evalImports(context);
    }
    var rsRules = ruleset.rules;
    for (i = 0; rule = rsRules[i]; i++) {
        if (rule.evalFirst) {
            rsRules[i] = rule.eval(context);
        }
    }
    var mediaBlockCount = context.mediaBlocks && context.mediaBlocks.length || 0;
    for (i = 0; rule = rsRules[i]; i++) {
        if (rule.type === 'MixinCall') {
            rules = rule.eval(context).filter(function (r) {
                if (r instanceof Declaration && r.variable) {
                    return !ruleset.variable(r.name);
                }
                return true;
            });
            rsRules.splice.apply(rsRules, [
                i,
                1
            ].concat(rules));
            i += rules.length - 1;
            ruleset.resetCache();
        } else if (rule.type === 'VariableCall') {
            rules = rule.eval(context).rules.filter(function (r) {
                if (r instanceof Declaration && r.variable) {
                    return false;
                }
                return true;
            });
            rsRules.splice.apply(rsRules, [
                i,
                1
            ].concat(rules));
            i += rules.length - 1;
            ruleset.resetCache();
        }
    }
    for (i = 0; rule = rsRules[i]; i++) {
        if (!rule.evalFirst) {
            rsRules[i] = rule = rule.eval ? rule.eval(context) : rule;
        }
    }
    for (i = 0; rule = rsRules[i]; i++) {
        if (rule instanceof Ruleset && rule.selectors && rule.selectors.length === 1) {
            if (rule.selectors[0] && rule.selectors[0].isJustParentSelector()) {
                rsRules.splice(i--, 1);
                for (var j = 0; subRule = rule.rules[j]; j++) {
                    if (subRule instanceof Node) {
                        subRule.copyVisibilityInfo(rule.visibilityInfo());
                        if (!(subRule instanceof Declaration) || !subRule.variable) {
                            rsRules.splice(++i, 0, subRule);
                        }
                    }
                }
            }
        }
    }
    ctxFrames.shift();
    ctxSelectors.shift();
    if (context.mediaBlocks) {
        for (i = mediaBlockCount; i < context.mediaBlocks.length; i++) {
            context.mediaBlocks[i].bubbleSelectors(selectors);
        }
    }
    return ruleset;
};
Ruleset.prototype.evalImports = function (context) {
    var rules = this.rules, i, importRules;
    if (!rules) {
        return;
    }
    for (i = 0; i < rules.length; i++) {
        if (rules[i].type === 'Import') {
            importRules = rules[i].eval(context);
            if (importRules && (importRules.length || importRules.length === 0)) {
                rules.splice.apply(rules, [
                    i,
                    1
                ].concat(importRules));
                i += importRules.length - 1;
            } else {
                rules.splice(i, 1, importRules);
            }
            this.resetCache();
        }
    }
};
Ruleset.prototype.makeImportant = function () {
    var result = new Ruleset(this.selectors, this.rules.map(function (r) {
        if (r.makeImportant) {
            return r.makeImportant();
        } else {
            return r;
        }
    }), this.strictImports, this.visibilityInfo());
    return result;
};
Ruleset.prototype.matchArgs = function (args) {
    return !args || args.length === 0;
};
Ruleset.prototype.matchCondition = function (args, context) {
    var lastSelector = this.selectors[this.selectors.length - 1];
    if (!lastSelector.evaldCondition) {
        return false;
    }
    if (lastSelector.condition && !lastSelector.condition.eval(new contexts.Eval(context, context.frames))) {
        return false;
    }
    return true;
};
Ruleset.prototype.resetCache = function () {
    this._rulesets = null;
    this._variables = null;
    this._properties = null;
    this._lookups = {};
};
Ruleset.prototype.variables = function () {
    if (!this._variables) {
        this._variables = !this.rules ? {} : this.rules.reduce(function (hash, r) {
            if (r instanceof Declaration && r.variable === true) {
                hash[r.name] = r;
            }
            if (r.type === 'Import' && r.root && r.root.variables) {
                var vars = r.root.variables();
                for (var name in vars) {
                    if (vars.hasOwnProperty(name)) {
                        hash[name] = r.root.variable(name);
                    }
                }
            }
            return hash;
        }, {});
    }
    return this._variables;
};
Ruleset.prototype.properties = function () {
    if (!this._properties) {
        this._properties = !this.rules ? {} : this.rules.reduce(function (hash, r) {
            if (r instanceof Declaration && r.variable !== true) {
                var name = r.name.length === 1 && r.name[0] instanceof Keyword ? r.name[0].value : r.name;
                if (!hash['$' + name]) {
                    hash['$' + name] = [r];
                } else {
                    hash['$' + name].push(r);
                }
            }
            return hash;
        }, {});
    }
    return this._properties;
};
Ruleset.prototype.variable = function (name) {
    var decl = this.variables()[name];
    if (decl) {
        return this.parseValue(decl);
    }
};
Ruleset.prototype.property = function (name) {
    var decl = this.properties()[name];
    if (decl) {
        return this.parseValue(decl);
    }
};
Ruleset.prototype.lastDeclaration = function () {
    for (var i = this.rules.length; i > 0; i--) {
        var decl = this.rules[i - 1];
        if (decl instanceof Declaration) {
            return this.parseValue(decl);
        }
    }
};
Ruleset.prototype.parseValue = function (toParse) {
    var self = this;
    function transformDeclaration(decl) {
        if (decl.value instanceof Anonymous && !decl.parsed) {
            if (typeof decl.value.value === 'string') {
                this.parse.parseNode(decl.value.value, [
                    'value',
                    'important'
                ], decl.value.getIndex(), decl.fileInfo(), function (err, result) {
                    if (err) {
                        decl.parsed = true;
                    }
                    if (result) {
                        decl.value = result[0];
                        decl.important = result[1] || '';
                        decl.parsed = true;
                    }
                });
            } else {
                decl.parsed = true;
            }
            return decl;
        } else {
            return decl;
        }
    }
    if (!Array.isArray(toParse)) {
        return transformDeclaration.call(self, toParse);
    } else {
        var nodes = [];
        toParse.forEach(function (n) {
            nodes.push(transformDeclaration.call(self, n));
        });
        return nodes;
    }
};
Ruleset.prototype.rulesets = function () {
    if (!this.rules) {
        return [];
    }
    var filtRules = [], rules = this.rules, i, rule;
    for (i = 0; rule = rules[i]; i++) {
        if (rule.isRuleset) {
            filtRules.push(rule);
        }
    }
    return filtRules;
};
Ruleset.prototype.prependRule = function (rule) {
    var rules = this.rules;
    if (rules) {
        rules.unshift(rule);
    } else {
        this.rules = [rule];
    }
    this.setParent(rule, this);
};
Ruleset.prototype.find = function (selector, self, filter) {
    self = self || this;
    var rules = [], match, foundMixins, key = selector.toCSS();
    if (key in this._lookups) {
        return this._lookups[key];
    }
    this.rulesets().forEach(function (rule) {
        if (rule !== self) {
            for (var j = 0; j < rule.selectors.length; j++) {
                match = selector.match(rule.selectors[j]);
                if (match) {
                    if (selector.elements.length > match) {
                        if (!filter || filter(rule)) {
                            foundMixins = rule.find(new Selector(selector.elements.slice(match)), self, filter);
                            for (var i = 0; i < foundMixins.length; ++i) {
                                foundMixins[i].path.push(rule);
                            }
                            Array.prototype.push.apply(rules, foundMixins);
                        }
                    } else {
                        rules.push({
                            rule: rule,
                            path: []
                        });
                    }
                    break;
                }
            }
        }
    });
    this._lookups[key] = rules;
    return rules;
};
Ruleset.prototype.genCSS = function (context, output) {
    var i, j, charsetRuleNodes = [], ruleNodes = [], debugInfo, rule, path;
    context.tabLevel = context.tabLevel || 0;
    if (!this.root) {
        context.tabLevel++;
    }
    var tabRuleStr = context.compress ? '' : Array(context.tabLevel + 1).join('  '), tabSetStr = context.compress ? '' : Array(context.tabLevel).join('  '), sep;
    var charsetNodeIndex = 0;
    var importNodeIndex = 0;
    for (i = 0; rule = this.rules[i]; i++) {
        if (rule instanceof Comment) {
            if (importNodeIndex === i) {
                importNodeIndex++;
            }
            ruleNodes.push(rule);
        } else if (rule.isCharset && rule.isCharset()) {
            ruleNodes.splice(charsetNodeIndex, 0, rule);
            charsetNodeIndex++;
            importNodeIndex++;
        } else if (rule.type === 'Import') {
            ruleNodes.splice(importNodeIndex, 0, rule);
            importNodeIndex++;
        } else {
            ruleNodes.push(rule);
        }
    }
    ruleNodes = charsetRuleNodes.concat(ruleNodes);
    if (!this.root) {
        debugInfo = getDebugInfo(context, this, tabSetStr);
        if (debugInfo) {
            output.add(debugInfo);
            output.add(tabSetStr);
        }
        var paths = this.paths, pathCnt = paths.length, pathSubCnt;
        sep = context.compress ? ',' : ',\n' + tabSetStr;
        for (i = 0; i < pathCnt; i++) {
            path = paths[i];
            if (!(pathSubCnt = path.length)) {
                continue;
            }
            if (i > 0) {
                output.add(sep);
            }
            context.firstSelector = true;
            path[0].genCSS(context, output);
            context.firstSelector = false;
            for (j = 1; j < pathSubCnt; j++) {
                path[j].genCSS(context, output);
            }
        }
        output.add((context.compress ? '{' : ' {\n') + tabRuleStr);
    }
    for (i = 0; rule = ruleNodes[i]; i++) {
        if (i + 1 === ruleNodes.length) {
            context.lastRule = true;
        }
        var currentLastRule = context.lastRule;
        if (rule.isRulesetLike(rule)) {
            context.lastRule = false;
        }
        if (rule.genCSS) {
            rule.genCSS(context, output);
        } else if (rule.value) {
            output.add(rule.value.toString());
        }
        context.lastRule = currentLastRule;
        if (!context.lastRule && rule.isVisible()) {
            output.add(context.compress ? '' : '\n' + tabRuleStr);
        } else {
            context.lastRule = false;
        }
    }
    if (!this.root) {
        output.add(context.compress ? '}' : '\n' + tabSetStr + '}');
        context.tabLevel--;
    }
    if (!output.isEmpty() && !context.compress && this.firstRoot) {
        output.add('\n');
    }
};
Ruleset.prototype.joinSelectors = function (paths, context, selectors) {
    for (var s = 0; s < selectors.length; s++) {
        this.joinSelector(paths, context, selectors[s]);
    }
};
Ruleset.prototype.joinSelector = function (paths, context, selector) {
    function createParenthesis(elementsToPak, originalElement) {
        var replacementParen, j;
        if (elementsToPak.length === 0) {
            replacementParen = new Paren(elementsToPak[0]);
        } else {
            var insideParent = new Array(elementsToPak.length);
            for (j = 0; j < elementsToPak.length; j++) {
                insideParent[j] = new Element(null, elementsToPak[j], originalElement.isVariable, originalElement._index, originalElement._fileInfo);
            }
            replacementParen = new Paren(new Selector(insideParent));
        }
        return replacementParen;
    }
    function createSelector(containedElement, originalElement) {
        var element, selector;
        element = new Element(null, containedElement, originalElement.isVariable, originalElement._index, originalElement._fileInfo);
        selector = new Selector([element]);
        return selector;
    }
    function addReplacementIntoPath(beginningPath, addPath, replacedElement, originalSelector) {
        var newSelectorPath, lastSelector, newJoinedSelector;
        newSelectorPath = [];
        if (beginningPath.length > 0) {
            newSelectorPath = utils.copyArray(beginningPath);
            lastSelector = newSelectorPath.pop();
            newJoinedSelector = originalSelector.createDerived(utils.copyArray(lastSelector.elements));
        } else {
            newJoinedSelector = originalSelector.createDerived([]);
        }
        if (addPath.length > 0) {
            var combinator = replacedElement.combinator, parentEl = addPath[0].elements[0];
            if (combinator.emptyOrWhitespace && !parentEl.combinator.emptyOrWhitespace) {
                combinator = parentEl.combinator;
            }
            newJoinedSelector.elements.push(new Element(combinator, parentEl.value, replacedElement.isVariable, replacedElement._index, replacedElement._fileInfo));
            newJoinedSelector.elements = newJoinedSelector.elements.concat(addPath[0].elements.slice(1));
        }
        if (newJoinedSelector.elements.length !== 0) {
            newSelectorPath.push(newJoinedSelector);
        }
        if (addPath.length > 1) {
            var restOfPath = addPath.slice(1);
            restOfPath = restOfPath.map(function (selector) {
                return selector.createDerived(selector.elements, []);
            });
            newSelectorPath = newSelectorPath.concat(restOfPath);
        }
        return newSelectorPath;
    }
    function addAllReplacementsIntoPath(beginningPath, addPaths, replacedElement, originalSelector, result) {
        var j;
        for (j = 0; j < beginningPath.length; j++) {
            var newSelectorPath = addReplacementIntoPath(beginningPath[j], addPaths, replacedElement, originalSelector);
            result.push(newSelectorPath);
        }
        return result;
    }
    function mergeElementsOnToSelectors(elements, selectors) {
        var i, sel;
        if (elements.length === 0) {
            return;
        }
        if (selectors.length === 0) {
            selectors.push([new Selector(elements)]);
            return;
        }
        for (i = 0; sel = selectors[i]; i++) {
            if (sel.length > 0) {
                sel[sel.length - 1] = sel[sel.length - 1].createDerived(sel[sel.length - 1].elements.concat(elements));
            } else {
                sel.push(new Selector(elements));
            }
        }
    }
    function replaceParentSelector(paths, context, inSelector) {
        var i, j, k, currentElements, newSelectors, selectorsMultiplied, sel, el, hadParentSelector = false, length, lastSelector;
        function findNestedSelector(element) {
            var maybeSelector;
            if (!(element.value instanceof Paren)) {
                return null;
            }
            maybeSelector = element.value.value;
            if (!(maybeSelector instanceof Selector)) {
                return null;
            }
            return maybeSelector;
        }
        currentElements = [];
        newSelectors = [[]];
        for (i = 0; el = inSelector.elements[i]; i++) {
            if (el.value !== '&') {
                var nestedSelector = findNestedSelector(el);
                if (nestedSelector != null) {
                    mergeElementsOnToSelectors(currentElements, newSelectors);
                    var nestedPaths = [], replaced, replacedNewSelectors = [];
                    replaced = replaceParentSelector(nestedPaths, context, nestedSelector);
                    hadParentSelector = hadParentSelector || replaced;
                    for (k = 0; k < nestedPaths.length; k++) {
                        var replacementSelector = createSelector(createParenthesis(nestedPaths[k], el), el);
                        addAllReplacementsIntoPath(newSelectors, [replacementSelector], el, inSelector, replacedNewSelectors);
                    }
                    newSelectors = replacedNewSelectors;
                    currentElements = [];
                } else {
                    currentElements.push(el);
                }
            } else {
                hadParentSelector = true;
                selectorsMultiplied = [];
                mergeElementsOnToSelectors(currentElements, newSelectors);
                for (j = 0; j < newSelectors.length; j++) {
                    sel = newSelectors[j];
                    if (context.length === 0) {
                        if (sel.length > 0) {
                            sel[0].elements.push(new Element(el.combinator, '', el.isVariable, el._index, el._fileInfo));
                        }
                        selectorsMultiplied.push(sel);
                    } else {
                        for (k = 0; k < context.length; k++) {
                            var newSelectorPath = addReplacementIntoPath(sel, context[k], el, inSelector);
                            selectorsMultiplied.push(newSelectorPath);
                        }
                    }
                }
                newSelectors = selectorsMultiplied;
                currentElements = [];
            }
        }
        mergeElementsOnToSelectors(currentElements, newSelectors);
        for (i = 0; i < newSelectors.length; i++) {
            length = newSelectors[i].length;
            if (length > 0) {
                paths.push(newSelectors[i]);
                lastSelector = newSelectors[i][length - 1];
                newSelectors[i][length - 1] = lastSelector.createDerived(lastSelector.elements, inSelector.extendList);
            }
        }
        return hadParentSelector;
    }
    function deriveSelector(visibilityInfo, deriveFrom) {
        var newSelector = deriveFrom.createDerived(deriveFrom.elements, deriveFrom.extendList, deriveFrom.evaldCondition);
        newSelector.copyVisibilityInfo(visibilityInfo);
        return newSelector;
    }
    var i, newPaths, hadParentSelector;
    newPaths = [];
    hadParentSelector = replaceParentSelector(newPaths, context, selector);
    if (!hadParentSelector) {
        if (context.length > 0) {
            newPaths = [];
            for (i = 0; i < context.length; i++) {
                var concatenated = context[i].map(deriveSelector.bind(this, selector.visibilityInfo()));
                concatenated.push(selector);
                newPaths.push(concatenated);
            }
        } else {
            newPaths = [[selector]];
        }
    }
    for (i = 0; i < newPaths.length; i++) {
        paths.push(newPaths[i]);
    }
};
module.exports = Ruleset;