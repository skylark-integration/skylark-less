define([
    './node',
    './debug-info'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, getDebugInfo = __module__1;
    var Comment = function (value, isLineComment, index, currentFileInfo) {
        this.value = value;
        this.isLineComment = isLineComment;
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.allowRoot = true;
    };
    Comment.prototype = new Node();
    Comment.prototype.type = 'Comment';
    Comment.prototype.genCSS = function (context, output) {
        if (this.debugInfo) {
            output.add(getDebugInfo(context, this), this.fileInfo(), this.getIndex());
        }
        output.add(this.value);
    };
    Comment.prototype.isSilent = function (context) {
        var isCompressed = context.compress && this.value[2] !== '!';
        return this.isLineComment || isCompressed;
    };
    module.exports = Comment;
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