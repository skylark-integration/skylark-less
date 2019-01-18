define([], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = function () {
        this.parent = null;
        this.visibilityBlocks = undefined;
        this.nodeVisible = undefined;
        this.rootNode = null;
        this.parsed = null;
        var self = this;
        Object.defineProperty(this, 'currentFileInfo', {
            get: function () {
                return self.fileInfo();
            }
        });
        Object.defineProperty(this, 'index', {
            get: function () {
                return self.getIndex();
            }
        });
    };
    Node.prototype.setParent = function (nodes, parent) {
        function set(node) {
            if (node && node instanceof Node) {
                node.parent = parent;
            }
        }
        if (Array.isArray(nodes)) {
            nodes.forEach(set);
        } else {
            set(nodes);
        }
    };
    Node.prototype.getIndex = function () {
        return this._index || this.parent && this.parent.getIndex() || 0;
    };
    Node.prototype.fileInfo = function () {
        return this._fileInfo || this.parent && this.parent.fileInfo() || {};
    };
    Node.prototype.isRulesetLike = function () {
        return false;
    };
    Node.prototype.toCSS = function (context) {
        var strs = [];
        this.genCSS(context, {
            add: function (chunk, fileInfo, index) {
                strs.push(chunk);
            },
            isEmpty: function () {
                return strs.length === 0;
            }
        });
        return strs.join('');
    };
    Node.prototype.genCSS = function (context, output) {
        output.add(this.value);
    };
    Node.prototype.accept = function (visitor) {
        this.value = visitor.visit(this.value);
    };
    Node.prototype.eval = function () {
        return this;
    };
    Node.prototype._operate = function (context, op, a, b) {
        switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        }
    };
    Node.prototype.fround = function (context, value) {
        var precision = context && context.numPrecision;
        return precision ? Number((value + 2e-16).toFixed(precision)) : value;
    };
    Node.compare = function (a, b) {
        if (a.compare && !(b.type === 'Quoted' || b.type === 'Anonymous')) {
            return a.compare(b);
        } else if (b.compare) {
            return -b.compare(a);
        } else if (a.type !== b.type) {
            return undefined;
        }
        a = a.value;
        b = b.value;
        if (!Array.isArray(a)) {
            return a === b ? 0 : undefined;
        }
        if (a.length !== b.length) {
            return undefined;
        }
        for (var i = 0; i < a.length; i++) {
            if (Node.compare(a[i], b[i]) !== 0) {
                return undefined;
            }
        }
        return 0;
    };
    Node.numericCompare = function (a, b) {
        return a < b ? -1 : a === b ? 0 : a > b ? 1 : undefined;
    };
    Node.prototype.blocksVisibility = function () {
        if (this.visibilityBlocks == null) {
            this.visibilityBlocks = 0;
        }
        return this.visibilityBlocks !== 0;
    };
    Node.prototype.addVisibilityBlock = function () {
        if (this.visibilityBlocks == null) {
            this.visibilityBlocks = 0;
        }
        this.visibilityBlocks = this.visibilityBlocks + 1;
    };
    Node.prototype.removeVisibilityBlock = function () {
        if (this.visibilityBlocks == null) {
            this.visibilityBlocks = 0;
        }
        this.visibilityBlocks = this.visibilityBlocks - 1;
    };
    Node.prototype.ensureVisibility = function () {
        this.nodeVisible = true;
    };
    Node.prototype.ensureInvisibility = function () {
        this.nodeVisible = false;
    };
    Node.prototype.isVisible = function () {
        return this.nodeVisible;
    };
    Node.prototype.visibilityInfo = function () {
        return {
            visibilityBlocks: this.visibilityBlocks,
            nodeVisible: this.nodeVisible
        };
    };
    Node.prototype.copyVisibilityInfo = function (info) {
        if (!info) {
            return;
        }
        this.visibilityBlocks = info.visibilityBlocks;
        this.nodeVisible = info.nodeVisible;
    };
    module.exports = Node;
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