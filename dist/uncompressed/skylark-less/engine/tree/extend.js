define([
    './node',
    './selector'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Selector = __module__1;
    var Extend = function Extend(selector, option, index, currentFileInfo, visibilityInfo) {
        this.selector = selector;
        this.option = option;
        this.object_id = Extend.next_id++;
        this.parent_ids = [this.object_id];
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.copyVisibilityInfo(visibilityInfo);
        this.allowRoot = true;
        switch (option) {
        case 'all':
            this.allowBefore = true;
            this.allowAfter = true;
            break;
        default:
            this.allowBefore = false;
            this.allowAfter = false;
            break;
        }
        this.setParent(this.selector, this);
    };
    Extend.next_id = 0;
    Extend.prototype = new Node();
    Extend.prototype.type = 'Extend';
    Extend.prototype.accept = function (visitor) {
        this.selector = visitor.visit(this.selector);
    };
    Extend.prototype.eval = function (context) {
        return new Extend(this.selector.eval(context), this.option, this.getIndex(), this.fileInfo(), this.visibilityInfo());
    };
    Extend.prototype.clone = function (context) {
        return new Extend(this.selector, this.option, this.getIndex(), this.fileInfo(), this.visibilityInfo());
    };
    Extend.prototype.findSelfSelectors = function (selectors) {
        var selfElements = [], i, selectorElements;
        for (i = 0; i < selectors.length; i++) {
            selectorElements = selectors[i].elements;
            if (i > 0 && selectorElements.length && selectorElements[0].combinator.value === '') {
                selectorElements[0].combinator.value = ' ';
            }
            selfElements = selfElements.concat(selectors[i].elements);
        }
        this.selfSelectors = [new Selector(selfElements)];
        this.selfSelectors[0].copyVisibilityInfo(this.visibilityInfo());
    };
    module.exports = Extend;
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