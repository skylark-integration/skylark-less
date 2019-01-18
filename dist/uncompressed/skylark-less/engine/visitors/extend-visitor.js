define([
    '../tree/index',
    './visitor',
    '../logger',
    '../utils'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var tree = __module__0, Visitor = __module__1, logger = __module__2, utils = __module__3;
    var ExtendFinderVisitor = function () {
        this._visitor = new Visitor(this);
        this.contexts = [];
        this.allExtendsStack = [[]];
    };
    ExtendFinderVisitor.prototype = {
        run: function (root) {
            root = this._visitor.visit(root);
            root.allExtends = this.allExtendsStack[0];
            return root;
        },
        visitDeclaration: function (declNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitMixinDefinition: function (mixinDefinitionNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitRuleset: function (rulesetNode, visitArgs) {
            if (rulesetNode.root) {
                return;
            }
            var i, j, extend, allSelectorsExtendList = [], extendList;
            var rules = rulesetNode.rules, ruleCnt = rules ? rules.length : 0;
            for (i = 0; i < ruleCnt; i++) {
                if (rulesetNode.rules[i] instanceof tree.Extend) {
                    allSelectorsExtendList.push(rules[i]);
                    rulesetNode.extendOnEveryPath = true;
                }
            }
            var paths = rulesetNode.paths;
            for (i = 0; i < paths.length; i++) {
                var selectorPath = paths[i], selector = selectorPath[selectorPath.length - 1], selExtendList = selector.extendList;
                extendList = selExtendList ? utils.copyArray(selExtendList).concat(allSelectorsExtendList) : allSelectorsExtendList;
                if (extendList) {
                    extendList = extendList.map(function (allSelectorsExtend) {
                        return allSelectorsExtend.clone();
                    });
                }
                for (j = 0; j < extendList.length; j++) {
                    this.foundExtends = true;
                    extend = extendList[j];
                    extend.findSelfSelectors(selectorPath);
                    extend.ruleset = rulesetNode;
                    if (j === 0) {
                        extend.firstExtendOnThisSelectorPath = true;
                    }
                    this.allExtendsStack[this.allExtendsStack.length - 1].push(extend);
                }
            }
            this.contexts.push(rulesetNode.selectors);
        },
        visitRulesetOut: function (rulesetNode) {
            if (!rulesetNode.root) {
                this.contexts.length = this.contexts.length - 1;
            }
        },
        visitMedia: function (mediaNode, visitArgs) {
            mediaNode.allExtends = [];
            this.allExtendsStack.push(mediaNode.allExtends);
        },
        visitMediaOut: function (mediaNode) {
            this.allExtendsStack.length = this.allExtendsStack.length - 1;
        },
        visitAtRule: function (atRuleNode, visitArgs) {
            atRuleNode.allExtends = [];
            this.allExtendsStack.push(atRuleNode.allExtends);
        },
        visitAtRuleOut: function (atRuleNode) {
            this.allExtendsStack.length = this.allExtendsStack.length - 1;
        }
    };
    var ProcessExtendsVisitor = function () {
        this._visitor = new Visitor(this);
    };
    ProcessExtendsVisitor.prototype = {
        run: function (root) {
            var extendFinder = new ExtendFinderVisitor();
            this.extendIndices = {};
            extendFinder.run(root);
            if (!extendFinder.foundExtends) {
                return root;
            }
            root.allExtends = root.allExtends.concat(this.doExtendChaining(root.allExtends, root.allExtends));
            this.allExtendsStack = [root.allExtends];
            var newRoot = this._visitor.visit(root);
            this.checkExtendsForNonMatched(root.allExtends);
            return newRoot;
        },
        checkExtendsForNonMatched: function (extendList) {
            var indices = this.extendIndices;
            extendList.filter(function (extend) {
                return !extend.hasFoundMatches && extend.parent_ids.length == 1;
            }).forEach(function (extend) {
                var selector = '_unknown_';
                try {
                    selector = extend.selector.toCSS({});
                } catch (_) {
                }
                if (!indices[extend.index + ' ' + selector]) {
                    indices[extend.index + ' ' + selector] = true;
                    logger.warn("extend '" + selector + "' has no matches");
                }
            });
        },
        doExtendChaining: function (extendsList, extendsListTarget, iterationCount) {
            var extendIndex, targetExtendIndex, matches, extendsToAdd = [], newSelector, extendVisitor = this, selectorPath, extend, targetExtend, newExtend;
            iterationCount = iterationCount || 0;
            for (extendIndex = 0; extendIndex < extendsList.length; extendIndex++) {
                for (targetExtendIndex = 0; targetExtendIndex < extendsListTarget.length; targetExtendIndex++) {
                    extend = extendsList[extendIndex];
                    targetExtend = extendsListTarget[targetExtendIndex];
                    if (extend.parent_ids.indexOf(targetExtend.object_id) >= 0) {
                        continue;
                    }
                    selectorPath = [targetExtend.selfSelectors[0]];
                    matches = extendVisitor.findMatch(extend, selectorPath);
                    if (matches.length) {
                        extend.hasFoundMatches = true;
                        extend.selfSelectors.forEach(function (selfSelector) {
                            var info = targetExtend.visibilityInfo();
                            newSelector = extendVisitor.extendSelector(matches, selectorPath, selfSelector, extend.isVisible());
                            newExtend = new tree.Extend(targetExtend.selector, targetExtend.option, 0, targetExtend.fileInfo(), info);
                            newExtend.selfSelectors = newSelector;
                            newSelector[newSelector.length - 1].extendList = [newExtend];
                            extendsToAdd.push(newExtend);
                            newExtend.ruleset = targetExtend.ruleset;
                            newExtend.parent_ids = newExtend.parent_ids.concat(targetExtend.parent_ids, extend.parent_ids);
                            if (targetExtend.firstExtendOnThisSelectorPath) {
                                newExtend.firstExtendOnThisSelectorPath = true;
                                targetExtend.ruleset.paths.push(newSelector);
                            }
                        });
                    }
                }
            }
            if (extendsToAdd.length) {
                this.extendChainCount++;
                if (iterationCount > 100) {
                    var selectorOne = '{unable to calculate}';
                    var selectorTwo = '{unable to calculate}';
                    try {
                        selectorOne = extendsToAdd[0].selfSelectors[0].toCSS();
                        selectorTwo = extendsToAdd[0].selector.toCSS();
                    } catch (e) {
                    }
                    throw { message: 'extend circular reference detected. One of the circular extends is currently:' + selectorOne + ':extend(' + selectorTwo + ')' };
                }
                return extendsToAdd.concat(extendVisitor.doExtendChaining(extendsToAdd, extendsListTarget, iterationCount + 1));
            } else {
                return extendsToAdd;
            }
        },
        visitDeclaration: function (ruleNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitMixinDefinition: function (mixinDefinitionNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitSelector: function (selectorNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitRuleset: function (rulesetNode, visitArgs) {
            if (rulesetNode.root) {
                return;
            }
            var matches, pathIndex, extendIndex, allExtends = this.allExtendsStack[this.allExtendsStack.length - 1], selectorsToAdd = [], extendVisitor = this, selectorPath;
            for (extendIndex = 0; extendIndex < allExtends.length; extendIndex++) {
                for (pathIndex = 0; pathIndex < rulesetNode.paths.length; pathIndex++) {
                    selectorPath = rulesetNode.paths[pathIndex];
                    if (rulesetNode.extendOnEveryPath) {
                        continue;
                    }
                    var extendList = selectorPath[selectorPath.length - 1].extendList;
                    if (extendList && extendList.length) {
                        continue;
                    }
                    matches = this.findMatch(allExtends[extendIndex], selectorPath);
                    if (matches.length) {
                        allExtends[extendIndex].hasFoundMatches = true;
                        allExtends[extendIndex].selfSelectors.forEach(function (selfSelector) {
                            var extendedSelectors;
                            extendedSelectors = extendVisitor.extendSelector(matches, selectorPath, selfSelector, allExtends[extendIndex].isVisible());
                            selectorsToAdd.push(extendedSelectors);
                        });
                    }
                }
            }
            rulesetNode.paths = rulesetNode.paths.concat(selectorsToAdd);
        },
        findMatch: function (extend, haystackSelectorPath) {
            var haystackSelectorIndex, hackstackSelector, hackstackElementIndex, haystackElement, targetCombinator, i, extendVisitor = this, needleElements = extend.selector.elements, potentialMatches = [], potentialMatch, matches = [];
            for (haystackSelectorIndex = 0; haystackSelectorIndex < haystackSelectorPath.length; haystackSelectorIndex++) {
                hackstackSelector = haystackSelectorPath[haystackSelectorIndex];
                for (hackstackElementIndex = 0; hackstackElementIndex < hackstackSelector.elements.length; hackstackElementIndex++) {
                    haystackElement = hackstackSelector.elements[hackstackElementIndex];
                    if (extend.allowBefore || haystackSelectorIndex === 0 && hackstackElementIndex === 0) {
                        potentialMatches.push({
                            pathIndex: haystackSelectorIndex,
                            index: hackstackElementIndex,
                            matched: 0,
                            initialCombinator: haystackElement.combinator
                        });
                    }
                    for (i = 0; i < potentialMatches.length; i++) {
                        potentialMatch = potentialMatches[i];
                        targetCombinator = haystackElement.combinator.value;
                        if (targetCombinator === '' && hackstackElementIndex === 0) {
                            targetCombinator = ' ';
                        }
                        if (!extendVisitor.isElementValuesEqual(needleElements[potentialMatch.matched].value, haystackElement.value) || potentialMatch.matched > 0 && needleElements[potentialMatch.matched].combinator.value !== targetCombinator) {
                            potentialMatch = null;
                        } else {
                            potentialMatch.matched++;
                        }
                        if (potentialMatch) {
                            potentialMatch.finished = potentialMatch.matched === needleElements.length;
                            if (potentialMatch.finished && (!extend.allowAfter && (hackstackElementIndex + 1 < hackstackSelector.elements.length || haystackSelectorIndex + 1 < haystackSelectorPath.length))) {
                                potentialMatch = null;
                            }
                        }
                        if (potentialMatch) {
                            if (potentialMatch.finished) {
                                potentialMatch.length = needleElements.length;
                                potentialMatch.endPathIndex = haystackSelectorIndex;
                                potentialMatch.endPathElementIndex = hackstackElementIndex + 1;
                                potentialMatches.length = 0;
                                matches.push(potentialMatch);
                            }
                        } else {
                            potentialMatches.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
            return matches;
        },
        isElementValuesEqual: function (elementValue1, elementValue2) {
            if (typeof elementValue1 === 'string' || typeof elementValue2 === 'string') {
                return elementValue1 === elementValue2;
            }
            if (elementValue1 instanceof tree.Attribute) {
                if (elementValue1.op !== elementValue2.op || elementValue1.key !== elementValue2.key) {
                    return false;
                }
                if (!elementValue1.value || !elementValue2.value) {
                    if (elementValue1.value || elementValue2.value) {
                        return false;
                    }
                    return true;
                }
                elementValue1 = elementValue1.value.value || elementValue1.value;
                elementValue2 = elementValue2.value.value || elementValue2.value;
                return elementValue1 === elementValue2;
            }
            elementValue1 = elementValue1.value;
            elementValue2 = elementValue2.value;
            if (elementValue1 instanceof tree.Selector) {
                if (!(elementValue2 instanceof tree.Selector) || elementValue1.elements.length !== elementValue2.elements.length) {
                    return false;
                }
                for (var i = 0; i < elementValue1.elements.length; i++) {
                    if (elementValue1.elements[i].combinator.value !== elementValue2.elements[i].combinator.value) {
                        if (i !== 0 || (elementValue1.elements[i].combinator.value || ' ') !== (elementValue2.elements[i].combinator.value || ' ')) {
                            return false;
                        }
                    }
                    if (!this.isElementValuesEqual(elementValue1.elements[i].value, elementValue2.elements[i].value)) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        },
        extendSelector: function (matches, selectorPath, replacementSelector, isVisible) {
            var currentSelectorPathIndex = 0, currentSelectorPathElementIndex = 0, path = [], matchIndex, selector, firstElement, match, newElements;
            for (matchIndex = 0; matchIndex < matches.length; matchIndex++) {
                match = matches[matchIndex];
                selector = selectorPath[match.pathIndex];
                firstElement = new tree.Element(match.initialCombinator, replacementSelector.elements[0].value, replacementSelector.elements[0].isVariable, replacementSelector.elements[0].getIndex(), replacementSelector.elements[0].fileInfo());
                if (match.pathIndex > currentSelectorPathIndex && currentSelectorPathElementIndex > 0) {
                    path[path.length - 1].elements = path[path.length - 1].elements.concat(selectorPath[currentSelectorPathIndex].elements.slice(currentSelectorPathElementIndex));
                    currentSelectorPathElementIndex = 0;
                    currentSelectorPathIndex++;
                }
                newElements = selector.elements.slice(currentSelectorPathElementIndex, match.index).concat([firstElement]).concat(replacementSelector.elements.slice(1));
                if (currentSelectorPathIndex === match.pathIndex && matchIndex > 0) {
                    path[path.length - 1].elements = path[path.length - 1].elements.concat(newElements);
                } else {
                    path = path.concat(selectorPath.slice(currentSelectorPathIndex, match.pathIndex));
                    path.push(new tree.Selector(newElements));
                }
                currentSelectorPathIndex = match.endPathIndex;
                currentSelectorPathElementIndex = match.endPathElementIndex;
                if (currentSelectorPathElementIndex >= selectorPath[currentSelectorPathIndex].elements.length) {
                    currentSelectorPathElementIndex = 0;
                    currentSelectorPathIndex++;
                }
            }
            if (currentSelectorPathIndex < selectorPath.length && currentSelectorPathElementIndex > 0) {
                path[path.length - 1].elements = path[path.length - 1].elements.concat(selectorPath[currentSelectorPathIndex].elements.slice(currentSelectorPathElementIndex));
                currentSelectorPathIndex++;
            }
            path = path.concat(selectorPath.slice(currentSelectorPathIndex, selectorPath.length));
            path = path.map(function (currentValue) {
                var derived = currentValue.createDerived(currentValue.elements);
                if (isVisible) {
                    derived.ensureVisibility();
                } else {
                    derived.ensureInvisibility();
                }
                return derived;
            });
            return path;
        },
        visitMedia: function (mediaNode, visitArgs) {
            var newAllExtends = mediaNode.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
            newAllExtends = newAllExtends.concat(this.doExtendChaining(newAllExtends, mediaNode.allExtends));
            this.allExtendsStack.push(newAllExtends);
        },
        visitMediaOut: function (mediaNode) {
            var lastIndex = this.allExtendsStack.length - 1;
            this.allExtendsStack.length = lastIndex;
        },
        visitAtRule: function (atRuleNode, visitArgs) {
            var newAllExtends = atRuleNode.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
            newAllExtends = newAllExtends.concat(this.doExtendChaining(newAllExtends, atRuleNode.allExtends));
            this.allExtendsStack.push(newAllExtends);
        },
        visitAtRuleOut: function (atRuleNode) {
            var lastIndex = this.allExtendsStack.length - 1;
            this.allExtendsStack.length = lastIndex;
        }
    };
    module.exports = ProcessExtendsVisitor;
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