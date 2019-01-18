define([
    './node',
    './media',
    './url',
    './quoted',
    './ruleset',
    './anonymous',
    '../utils',
    '../less-error'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6, __module__7) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Media = __module__1, URL = __module__2, Quoted = __module__3, Ruleset = __module__4, Anonymous = __module__5, utils = __module__6, LessError = __module__7;
    var Import = function (path, features, options, index, currentFileInfo, visibilityInfo) {
        this.options = options;
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.path = path;
        this.features = features;
        this.allowRoot = true;
        if (this.options.less !== undefined || this.options.inline) {
            this.css = !this.options.less || this.options.inline;
        } else {
            var pathValue = this.getPath();
            if (pathValue && /[#\.\&\?]css([\?;].*)?$/.test(pathValue)) {
                this.css = true;
            }
        }
        this.copyVisibilityInfo(visibilityInfo);
        this.setParent(this.features, this);
        this.setParent(this.path, this);
    };
    Import.prototype = new Node();
    Import.prototype.type = 'Import';
    Import.prototype.accept = function (visitor) {
        if (this.features) {
            this.features = visitor.visit(this.features);
        }
        this.path = visitor.visit(this.path);
        if (!this.options.isPlugin && !this.options.inline && this.root) {
            this.root = visitor.visit(this.root);
        }
    };
    Import.prototype.genCSS = function (context, output) {
        if (this.css && this.path._fileInfo.reference === undefined) {
            output.add('@import ', this._fileInfo, this._index);
            this.path.genCSS(context, output);
            if (this.features) {
                output.add(' ');
                this.features.genCSS(context, output);
            }
            output.add(';');
        }
    };
    Import.prototype.getPath = function () {
        return this.path instanceof URL ? this.path.value.value : this.path.value;
    };
    Import.prototype.isVariableImport = function () {
        var path = this.path;
        if (path instanceof URL) {
            path = path.value;
        }
        if (path instanceof Quoted) {
            return path.containsVariables();
        }
        return true;
    };
    Import.prototype.evalForImport = function (context) {
        var path = this.path;
        if (path instanceof URL) {
            path = path.value;
        }
        return new Import(path.eval(context), this.features, this.options, this._index, this._fileInfo, this.visibilityInfo());
    };
    Import.prototype.evalPath = function (context) {
        var path = this.path.eval(context);
        var fileInfo = this._fileInfo;
        if (!(path instanceof URL)) {
            var pathValue = path.value;
            if (fileInfo && pathValue && context.pathRequiresRewrite(pathValue)) {
                path.value = context.rewritePath(pathValue, fileInfo.rootpath);
            } else {
                path.value = context.normalizePath(path.value);
            }
        }
        return path;
    };
    Import.prototype.eval = function (context) {
        var result = this.doEval(context);
        if (this.options.reference || this.blocksVisibility()) {
            if (result.length || result.length === 0) {
                result.forEach(function (node) {
                    node.addVisibilityBlock();
                });
            } else {
                result.addVisibilityBlock();
            }
        }
        return result;
    };
    Import.prototype.doEval = function (context) {
        var ruleset, registry, features = this.features && this.features.eval(context);
        if (this.options.isPlugin) {
            if (this.root && this.root.eval) {
                try {
                    this.root.eval(context);
                } catch (e) {
                    e.message = 'Plugin error during evaluation';
                    throw new LessError(e, this.root.imports, this.root.filename);
                }
            }
            registry = context.frames[0] && context.frames[0].functionRegistry;
            if (registry && this.root && this.root.functions) {
                registry.addMultiple(this.root.functions);
            }
            return [];
        }
        if (this.skip) {
            if (typeof this.skip === 'function') {
                this.skip = this.skip();
            }
            if (this.skip) {
                return [];
            }
        }
        if (this.options.inline) {
            var contents = new Anonymous(this.root, 0, {
                filename: this.importedFilename,
                reference: this.path._fileInfo && this.path._fileInfo.reference
            }, true, true);
            return this.features ? new Media([contents], this.features.value) : [contents];
        } else if (this.css) {
            var newImport = new Import(this.evalPath(context), features, this.options, this._index);
            if (!newImport.css && this.error) {
                throw this.error;
            }
            return newImport;
        } else {
            ruleset = new Ruleset(null, utils.copyArray(this.root.rules));
            ruleset.evalImports(context);
            return this.features ? new Media(ruleset.rules, this.features.value) : ruleset.rules;
        }
    };
    module.exports = Import;
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