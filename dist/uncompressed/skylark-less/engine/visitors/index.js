define([
    './visitor',
    './import-visitor',
    './set-tree-visibility-visitor',
    './extend-visitor',
    './join-selector-visitor',
    './to-css-visitor'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var visitors = {
        Visitor: __module__0,
        ImportVisitor: __module__1,
        MarkVisibleSelectorsVisitor: __module__2,
        ExtendVisitor: __module__3,
        JoinSelectorVisitor: __module__4,
        ToCSSVisitor: __module__5
    };
    module.exports = visitors;
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