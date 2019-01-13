var contexts = require('./contexts'), Parser = require('./parser/parser'), LessError = require('./less-error'), utils = require('./utils'), PromiseConstructor = typeof Promise === 'undefined' ? require('promise') : Promise, logger = require('./logger');
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