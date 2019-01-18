define([
    './ruleset',
    './value',
    './selector',
    './anonymous',
    './expression',
    './atrule',
    '../utils'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Ruleset = __module__0, Value = __module__1, Selector = __module__2, Anonymous = __module__3, Expression = __module__4, AtRule = __module__5, utils = __module__6;
    var Media = function (value, features, index, currentFileInfo, visibilityInfo) {
        this._index = index;
        this._fileInfo = currentFileInfo;
        var selectors = new Selector([], null, null, this._index, this._fileInfo).createEmptySelectors();
        this.features = new Value(features);
        this.rules = [new Ruleset(selectors, value)];
        this.rules[0].allowImports = true;
        this.copyVisibilityInfo(visibilityInfo);
        this.allowRoot = true;
        this.setParent(selectors, this);
        this.setParent(this.features, this);
        this.setParent(this.rules, this);
    };
    Media.prototype = new AtRule();
    Media.prototype.type = 'Media';
    Media.prototype.isRulesetLike = function () {
        return true;
    };
    Media.prototype.accept = function (visitor) {
        if (this.features) {
            this.features = visitor.visit(this.features);
        }
        if (this.rules) {
            this.rules = visitor.visitArray(this.rules);
        }
    };
    Media.prototype.genCSS = function (context, output) {
        output.add('@media ', this._fileInfo, this._index);
        this.features.genCSS(context, output);
        this.outputRuleset(context, output, this.rules);
    };
    Media.prototype.eval = function (context) {
        if (!context.mediaBlocks) {
            context.mediaBlocks = [];
            context.mediaPath = [];
        }
        var media = new Media(null, [], this._index, this._fileInfo, this.visibilityInfo());
        if (this.debugInfo) {
            this.rules[0].debugInfo = this.debugInfo;
            media.debugInfo = this.debugInfo;
        }
        media.features = this.features.eval(context);
        context.mediaPath.push(media);
        context.mediaBlocks.push(media);
        this.rules[0].functionRegistry = context.frames[0].functionRegistry.inherit();
        context.frames.unshift(this.rules[0]);
        media.rules = [this.rules[0].eval(context)];
        context.frames.shift();
        context.mediaPath.pop();
        return context.mediaPath.length === 0 ? media.evalTop(context) : media.evalNested(context);
    };
    Media.prototype.evalTop = function (context) {
        var result = this;
        if (context.mediaBlocks.length > 1) {
            var selectors = new Selector([], null, null, this.getIndex(), this.fileInfo()).createEmptySelectors();
            result = new Ruleset(selectors, context.mediaBlocks);
            result.multiMedia = true;
            result.copyVisibilityInfo(this.visibilityInfo());
            this.setParent(result, this);
        }
        delete context.mediaBlocks;
        delete context.mediaPath;
        return result;
    };
    Media.prototype.evalNested = function (context) {
        var i, value, path = context.mediaPath.concat([this]);
        for (i = 0; i < path.length; i++) {
            value = path[i].features instanceof Value ? path[i].features.value : path[i].features;
            path[i] = Array.isArray(value) ? value : [value];
        }
        this.features = new Value(this.permute(path).map(function (path) {
            path = path.map(function (fragment) {
                return fragment.toCSS ? fragment : new Anonymous(fragment);
            });
            for (i = path.length - 1; i > 0; i--) {
                path.splice(i, 0, new Anonymous('and'));
            }
            return new Expression(path);
        }));
        this.setParent(this.features, this);
        return new Ruleset([], []);
    };
    Media.prototype.permute = function (arr) {
        if (arr.length === 0) {
            return [];
        } else if (arr.length === 1) {
            return arr[0];
        } else {
            var result = [];
            var rest = this.permute(arr.slice(1));
            for (var i = 0; i < rest.length; i++) {
                for (var j = 0; j < arr[0].length; j++) {
                    result.push([arr[0][j]].concat(rest[i]));
                }
            }
            return result;
        }
    };
    Media.prototype.bubbleSelectors = function (selectors) {
        if (!selectors) {
            return;
        }
        this.rules = [new Ruleset(utils.copyArray(selectors), [this.rules[0]])];
        this.setParent(this.rules, this);
    };
    module.exports = Media;
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