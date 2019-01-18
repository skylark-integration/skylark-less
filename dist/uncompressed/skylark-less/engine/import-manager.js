define([
    './contexts',
    './parser/parser',
    './less-error',
    './utils',
    './logger'
], function (__module__0, __module__1, __module__2, __module__3, __module__4) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var contexts = __module__0, Parser = __module__1, LessError = __module__2, utils = __module__3, PromiseConstructor = Promise, logger = __module__4;
    module.exports = function (environment) {
        var ImportManager = function (less, context, rootFileInfo) {
            this.less = less;
            this.rootFilename = rootFileInfo.filename;
            this.paths = context.paths || [];
            this.contents = {};
            this.contentsIgnoredChars = {};
            this.mime = context.mime;
            this.error = null;
            this.context = context;
            this.queue = [];
            this.files = {};
        };
        ImportManager.prototype.push = function (path, tryAppendExtension, currentFileInfo, importOptions, callback) {
            var importManager = this, pluginLoader = this.context.pluginManager.Loader;
            this.queue.push(path);
            var fileParsedFunc = function (e, root, fullPath) {
                importManager.queue.splice(importManager.queue.indexOf(path), 1);
                var importedEqualsRoot = fullPath === importManager.rootFilename;
                if (importOptions.optional && e) {
                    callback(null, { rules: [] }, false, null);
                    logger.info('The file ' + fullPath + ' was skipped because it was not found and the import was marked optional.');
                } else {
                    if (!importManager.files[fullPath] && !importOptions.inline) {
                        importManager.files[fullPath] = {
                            root: root,
                            options: importOptions
                        };
                    }
                    if (e && !importManager.error) {
                        importManager.error = e;
                    }
                    callback(e, root, importedEqualsRoot, fullPath);
                }
            };
            var newFileInfo = {
                rewriteUrls: this.context.rewriteUrls,
                entryPath: currentFileInfo.entryPath,
                rootpath: currentFileInfo.rootpath,
                rootFilename: currentFileInfo.rootFilename
            };
            var fileManager = environment.getFileManager(path, currentFileInfo.currentDirectory, this.context, environment);
            if (!fileManager) {
                fileParsedFunc({ message: 'Could not find a file-manager for ' + path });
                return;
            }
            var loadFileCallback = function (loadedFile) {
                var plugin, resolvedFilename = loadedFile.filename, contents = loadedFile.contents.replace(/^\uFEFF/, '');
                newFileInfo.currentDirectory = fileManager.getPath(resolvedFilename);
                if (newFileInfo.rewriteUrls) {
                    newFileInfo.rootpath = fileManager.join(importManager.context.rootpath || '', fileManager.pathDiff(newFileInfo.currentDirectory, newFileInfo.entryPath));
                    if (!fileManager.isPathAbsolute(newFileInfo.rootpath) && fileManager.alwaysMakePathsAbsolute()) {
                        newFileInfo.rootpath = fileManager.join(newFileInfo.entryPath, newFileInfo.rootpath);
                    }
                }
                newFileInfo.filename = resolvedFilename;
                var newEnv = new contexts.Parse(importManager.context);
                newEnv.processImports = false;
                importManager.contents[resolvedFilename] = contents;
                if (currentFileInfo.reference || importOptions.reference) {
                    newFileInfo.reference = true;
                }
                if (importOptions.isPlugin) {
                    plugin = pluginLoader.evalPlugin(contents, newEnv, importManager, importOptions.pluginArgs, newFileInfo);
                    if (plugin instanceof LessError) {
                        fileParsedFunc(plugin, null, resolvedFilename);
                    } else {
                        fileParsedFunc(null, plugin, resolvedFilename);
                    }
                } else if (importOptions.inline) {
                    fileParsedFunc(null, contents, resolvedFilename);
                } else {
                    if (importManager.files[resolvedFilename] && !importManager.files[resolvedFilename].options.multiple && !importOptions.multiple) {
                        fileParsedFunc(null, importManager.files[resolvedFilename].root, resolvedFilename);
                    } else {
                        new Parser(newEnv, importManager, newFileInfo).parse(contents, function (e, root) {
                            fileParsedFunc(e, root, resolvedFilename);
                        });
                    }
                }
            };
            var promise, context = utils.clone(this.context);
            if (tryAppendExtension) {
                context.ext = importOptions.isPlugin ? '.js' : '.less';
            }
            if (importOptions.isPlugin) {
                context.mime = 'application/javascript';
                promise = pluginLoader.loadPlugin(path, currentFileInfo.currentDirectory, context, environment, fileManager);
            } else {
                promise = fileManager.loadFile(path, currentFileInfo.currentDirectory, context, environment, function (err, loadedFile) {
                    if (err) {
                        fileParsedFunc(err);
                    } else {
                        loadFileCallback(loadedFile);
                    }
                });
            }
            if (promise) {
                promise.then(loadFileCallback, fileParsedFunc);
            }
        };
        return ImportManager;
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