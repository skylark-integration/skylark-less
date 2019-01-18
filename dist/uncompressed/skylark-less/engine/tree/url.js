define(['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var URL = function (val, index, currentFileInfo, isEvald) {
        this.value = val;
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.isEvald = isEvald;
    };
    URL.prototype = new Node();
    URL.prototype.type = 'Url';
    URL.prototype.accept = function (visitor) {
        this.value = visitor.visit(this.value);
    };
    URL.prototype.genCSS = function (context, output) {
        output.add('url(');
        this.value.genCSS(context, output);
        output.add(')');
    };
    URL.prototype.eval = function (context) {
        var val = this.value.eval(context), rootpath;
        if (!this.isEvald) {
            rootpath = this.fileInfo() && this.fileInfo().rootpath;
            if (typeof rootpath === 'string' && typeof val.value === 'string' && context.pathRequiresRewrite(val.value)) {
                if (!val.quote) {
                    rootpath = escapePath(rootpath);
                }
                val.value = context.rewritePath(val.value, rootpath);
            } else {
                val.value = context.normalizePath(val.value);
            }
            if (context.urlArgs) {
                if (!val.value.match(/^\s*data:/)) {
                    var delimiter = val.value.indexOf('?') === -1 ? '?' : '&';
                    var urlArgs = delimiter + context.urlArgs;
                    if (val.value.indexOf('#') !== -1) {
                        val.value = val.value.replace('#', urlArgs + '#');
                    } else {
                        val.value += urlArgs;
                    }
                }
            }
        }
        return new URL(val, this.getIndex(), this.fileInfo(), true);
    };
    function escapePath(path) {
        return path.replace(/[\(\)'"\s]/g, function (match) {
            return '\\' + match;
        });
    }
    module.exports = URL;
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