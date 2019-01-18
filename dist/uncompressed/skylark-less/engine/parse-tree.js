define([
    './less-error',
    './transform-tree',
    './logger'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var LessError = __module__0, transformTree = __module__1, logger = __module__2;
    module.exports = function (SourceMapBuilder) {
        var ParseTree = function (root, imports) {
            this.root = root;
            this.imports = imports;
        };
        ParseTree.prototype.toCSS = function (options) {
            var evaldRoot, result = {}, sourceMapBuilder;
            try {
                evaldRoot = transformTree(this.root, options);
            } catch (e) {
                throw new LessError(e, this.imports);
            }
            try {
                var compress = Boolean(options.compress);
                if (compress) {
                    logger.warn('The compress option has been deprecated. We recommend you use a dedicated css minifier, for instance see less-plugin-clean-css.');
                }
                var toCSSOptions = {
                    compress: compress,
                    dumpLineNumbers: options.dumpLineNumbers,
                    strictUnits: Boolean(options.strictUnits),
                    numPrecision: 8
                };
                if (options.sourceMap) {
                    sourceMapBuilder = new SourceMapBuilder(options.sourceMap);
                    result.css = sourceMapBuilder.toCSS(evaldRoot, toCSSOptions, this.imports);
                } else {
                    result.css = evaldRoot.toCSS(toCSSOptions);
                }
            } catch (e) {
                throw new LessError(e, this.imports);
            }
            if (options.pluginManager) {
                var postProcessors = options.pluginManager.getPostProcessors();
                for (var i = 0; i < postProcessors.length; i++) {
                    result.css = postProcessors[i].process(result.css, {
                        sourceMap: sourceMapBuilder,
                        options: options,
                        imports: this.imports
                    });
                }
            }
            if (options.sourceMap) {
                result.map = sourceMapBuilder.getExternalSourceMap();
            }
            result.imports = [];
            for (var file in this.imports.files) {
                if (this.imports.files.hasOwnProperty(file) && file !== this.imports.rootFilename) {
                    result.imports.push(file);
                }
            }
            return result;
        };
        return ParseTree;
    };
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