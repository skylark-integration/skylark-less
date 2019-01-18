define([
    './contexts',
    './parser/parser',
    './plugin-manager',
    './less-error',
    './utils'
], function (__module__0, __module__1, __module__2, __module__3, __module__4) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var PromiseConstructor, contexts = __module__0, Parser = __module__1, PluginManager = __module__2, LessError = __module__3, utils = __module__4;
    module.exports = function (environment, ParseTree, ImportManager) {
        var parse = function (input, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = utils.copyOptions(this.options, {});
            } else {
                options = utils.copyOptions(this.options, options || {});
            }
            if (!callback) {
                if (!PromiseConstructor) {
                    PromiseConstructor = Promise;
                }
                var self = this;
                return new PromiseConstructor(function (resolve, reject) {
                    parse.call(self, input, options, function (err, output) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(output);
                        }
                    });
                });
            } else {
                var context, rootFileInfo, pluginManager = new PluginManager(this, !options.reUsePluginManager);
                options.pluginManager = pluginManager;
                context = new contexts.Parse(options);
                if (options.rootFileInfo) {
                    rootFileInfo = options.rootFileInfo;
                } else {
                    var filename = options.filename || 'input';
                    var entryPath = filename.replace(/[^\/\\]*$/, '');
                    rootFileInfo = {
                        filename: filename,
                        rewriteUrls: context.rewriteUrls,
                        rootpath: context.rootpath || '',
                        currentDirectory: entryPath,
                        entryPath: entryPath,
                        rootFilename: filename
                    };
                    if (rootFileInfo.rootpath && rootFileInfo.rootpath.slice(-1) !== '/') {
                        rootFileInfo.rootpath += '/';
                    }
                }
                var imports = new ImportManager(this, context, rootFileInfo);
                this.importManager = imports;
                if (options.plugins) {
                    options.plugins.forEach(function (plugin) {
                        var evalResult, contents;
                        if (plugin.fileContent) {
                            contents = plugin.fileContent.replace(/^\uFEFF/, '');
                            evalResult = pluginManager.Loader.evalPlugin(contents, context, imports, plugin.options, plugin.filename);
                            if (evalResult instanceof LessError) {
                                return callback(evalResult);
                            }
                        } else {
                            pluginManager.addPlugin(plugin);
                        }
                    });
                }
                new Parser(context, imports, rootFileInfo).parse(input, function (e, root) {
                    if (e) {
                        return callback(e);
                    }
                    callback(null, root, imports, options);
                }, options);
            }
        };
        return parse;
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