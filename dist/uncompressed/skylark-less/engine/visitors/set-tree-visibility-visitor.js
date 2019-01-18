define([], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var SetTreeVisibilityVisitor = function (visible) {
        this.visible = visible;
    };
    SetTreeVisibilityVisitor.prototype.run = function (root) {
        this.visit(root);
    };
    SetTreeVisibilityVisitor.prototype.visitArray = function (nodes) {
        if (!nodes) {
            return nodes;
        }
        var cnt = nodes.length, i;
        for (i = 0; i < cnt; i++) {
            this.visit(nodes[i]);
        }
        return nodes;
    };
    SetTreeVisibilityVisitor.prototype.visit = function (node) {
        if (!node) {
            return node;
        }
        if (node.constructor === Array) {
            return this.visitArray(node);
        }
        if (!node.blocksVisibility || node.blocksVisibility()) {
            return node;
        }
        if (this.visible) {
            node.ensureVisibility();
        } else {
            node.ensureInvisibility();
        }
        node.accept(this);
        return node;
    };
    module.exports = SetTreeVisibilityVisitor;
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