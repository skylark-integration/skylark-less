define([
    './node',
    './color',
    './atrule',
    './detached-ruleset',
    './operation',
    './dimension',
    './unit',
    './keyword',
    './variable',
    './property',
    './ruleset',
    './element',
    './attribute',
    './combinator',
    './selector',
    './quoted',
    './expression',
    './declaration',
    './call',
    './url',
    './import',
    './mixin-call',
    './mixin-definition',
    './comment',
    './anonymous',
    './value',
    './javascript',
    './assignment',
    './condition',
    './paren',
    './media',
    './unicode-descriptor',
    './negative',
    './extend',
    './variable-call',
    './namespace-value'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6, __module__7, __module__8, __module__9, __module__10, __module__11, __module__12, __module__13, __module__14, __module__15, __module__16, __module__17, __module__18, __module__19, __module__20, __module__21, __module__22, __module__23, __module__24, __module__25, __module__26, __module__27, __module__28, __module__29, __module__30, __module__31, __module__32, __module__33, __module__34, __module__35) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var tree = Object.create(null);
    tree.Node = __module__0;
    tree.Color = __module__1;
    tree.AtRule = __module__2;
    tree.DetachedRuleset = __module__3;
    tree.Operation = __module__4;
    tree.Dimension = __module__5;
    tree.Unit = __module__6;
    tree.Keyword = __module__7;
    tree.Variable = __module__8;
    tree.Property = __module__9;
    tree.Ruleset = __module__10;
    tree.Element = __module__11;
    tree.Attribute = __module__12;
    tree.Combinator = __module__13;
    tree.Selector = __module__14;
    tree.Quoted = __module__15;
    tree.Expression = __module__16;
    tree.Declaration = __module__17;
    tree.Call = __module__18;
    tree.URL = __module__19;
    tree.Import = __module__20;
    tree.mixin = {
        Call: __module__21,
        Definition: __module__22
    };
    tree.Comment = __module__23;
    tree.Anonymous = __module__24;
    tree.Value = __module__25;
    tree.JavaScript = __module__26;
    tree.Assignment = __module__27;
    tree.Condition = __module__28;
    tree.Paren = __module__29;
    tree.Media = __module__30;
    tree.UnicodeDescriptor = __module__31;
    tree.Negative = __module__32;
    tree.Extend = __module__33;
    tree.VariableCall = __module__34;
    tree.NamespaceValue = __module__35;
    module.exports = tree;
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