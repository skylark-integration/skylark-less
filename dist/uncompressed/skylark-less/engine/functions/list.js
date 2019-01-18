define([
    '../tree/comment',
    '../tree/dimension',
    '../tree/declaration',
    '../tree/expression',
    '../tree/ruleset',
    '../tree/selector',
    '../tree/element',
    './function-registry'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6, __module__7) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Comment = __module__0, Dimension = __module__1, Declaration = __module__2, Expression = __module__3, Ruleset = __module__4, Selector = __module__5, Element = __module__6, functionRegistry = __module__7;
    var getItemsFromNode = function (node) {
        var items = Array.isArray(node.value) ? node.value : Array(node);
        return items;
    };
    functionRegistry.addMultiple({
        _SELF: function (n) {
            return n;
        },
        extract: function (values, index) {
            index = index.value - 1;
            return getItemsFromNode(values)[index];
        },
        length: function (values) {
            return new Dimension(getItemsFromNode(values).length);
        },
        range: function (start, end, step) {
            var from, to, stepValue = 1, list = [];
            if (end) {
                to = end;
                from = start.value;
                if (step) {
                    stepValue = step.value;
                }
            } else {
                from = 1;
                to = start;
            }
            for (var i = from; i <= to.value; i += stepValue) {
                list.push(new Dimension(i, to.unit));
            }
            return new Expression(list);
        },
        each: function (list, rs) {
            var rules = [], newRules, iterator;
            if (list.value) {
                if (Array.isArray(list.value)) {
                    iterator = list.value;
                } else {
                    iterator = [list.value];
                }
            } else if (list.ruleset) {
                iterator = list.ruleset.rules;
            } else if (list.rules) {
                iterator = list.rules;
            } else if (Array.isArray(list)) {
                iterator = list;
            } else {
                iterator = [list];
            }
            var valueName = '@value', keyName = '@key', indexName = '@index';
            if (rs.params) {
                valueName = rs.params[0] && rs.params[0].name;
                keyName = rs.params[1] && rs.params[1].name;
                indexName = rs.params[2] && rs.params[2].name;
                rs = rs.rules;
            } else {
                rs = rs.ruleset;
            }
            for (var i = 0; i < iterator.length; i++) {
                var key, value, item = iterator[i];
                if (item instanceof Declaration) {
                    key = typeof item.name === 'string' ? item.name : item.name[0].value;
                    value = item.value;
                } else {
                    key = new Dimension(i + 1);
                    value = item;
                }
                if (item instanceof Comment) {
                    continue;
                }
                newRules = rs.rules.slice(0);
                if (valueName) {
                    newRules.push(new Declaration(valueName, value, false, false, this.index, this.currentFileInfo));
                }
                if (indexName) {
                    newRules.push(new Declaration(indexName, new Dimension(i + 1), false, false, this.index, this.currentFileInfo));
                }
                if (keyName) {
                    newRules.push(new Declaration(keyName, key, false, false, this.index, this.currentFileInfo));
                }
                rules.push(new Ruleset([new Selector([new Element('', '&')])], newRules, rs.strictImports, rs.visibilityInfo()));
            }
            return new Ruleset([new Selector([new Element('', '&')])], rules, rs.strictImports, rs.visibilityInfo()).eval(this.context);
        }
    });
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