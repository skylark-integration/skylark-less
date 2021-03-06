define([
    '../functions/function-registry',
    '../less-error'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var functionRegistry = __module__0, LessError = __module__1;
    var AbstractPluginLoader = function () {
        this.require = function () {
            return null;
        };
    };
    AbstractPluginLoader.prototype.evalPlugin = function (contents, context, imports, pluginOptions, fileInfo) {
        var loader, registry, pluginObj, localModule, pluginManager, filename, result;
        pluginManager = context.pluginManager;
        if (fileInfo) {
            if (typeof fileInfo === 'string') {
                filename = fileInfo;
            } else {
                filename = fileInfo.filename;
            }
        }
        var shortname = new this.less.FileManager().extractUrlParts(filename).filename;
        if (filename) {
            pluginObj = pluginManager.get(filename);
            if (pluginObj) {
                result = this.trySetOptions(pluginObj, filename, shortname, pluginOptions);
                if (result) {
                    return result;
                }
                try {
                    if (pluginObj.use) {
                        pluginObj.use.call(this.context, pluginObj);
                    }
                } catch (e) {
                    e.message = e.message || 'Error during @plugin call';
                    return new LessError(e, imports, filename);
                }
                return pluginObj;
            }
        }
        localModule = {
            exports: {},
            pluginManager: pluginManager,
            fileInfo: fileInfo
        };
        registry = functionRegistry.create();
        var registerPlugin = function (obj) {
            pluginObj = obj;
        };
        try {
            loader = new Function('module', 'require', 'registerPlugin', 'functions', 'tree', 'less', 'fileInfo', contents);
            loader(localModule, this.require(filename), registerPlugin, registry, this.less.tree, this.less, fileInfo);
        } catch (e) {
            return new LessError(e, imports, filename);
        }
        if (!pluginObj) {
            pluginObj = localModule.exports;
        }
        pluginObj = this.validatePlugin(pluginObj, filename, shortname);
        if (pluginObj instanceof LessError) {
            return pluginObj;
        }
        if (pluginObj) {
            pluginObj.imports = imports;
            pluginObj.filename = filename;
            if (!pluginObj.minVersion || this.compareVersion('3.0.0', pluginObj.minVersion) < 0) {
                result = this.trySetOptions(pluginObj, filename, shortname, pluginOptions);
                if (result) {
                    return result;
                }
            }
            pluginManager.addPlugin(pluginObj, fileInfo.filename, registry);
            pluginObj.functions = registry.getLocalFunctions();
            result = this.trySetOptions(pluginObj, filename, shortname, pluginOptions);
            if (result) {
                return result;
            }
            try {
                if (pluginObj.use) {
                    pluginObj.use.call(this.context, pluginObj);
                }
            } catch (e) {
                e.message = e.message || 'Error during @plugin call';
                return new LessError(e, imports, filename);
            }
        } else {
            return new LessError({ message: 'Not a valid plugin' }, imports, filename);
        }
        return pluginObj;
    };
    AbstractPluginLoader.prototype.trySetOptions = function (plugin, filename, name, options) {
        if (options && !plugin.setOptions) {
            return new LessError({ message: 'Options have been provided but the plugin ' + name + ' does not support any options.' });
        }
        try {
            plugin.setOptions && plugin.setOptions(options);
        } catch (e) {
            return new LessError(e);
        }
    };
    AbstractPluginLoader.prototype.validatePlugin = function (plugin, filename, name) {
        if (plugin) {
            if (typeof plugin === 'function') {
                plugin = new plugin();
            }
            if (plugin.minVersion) {
                if (this.compareVersion(plugin.minVersion, this.less.version) < 0) {
                    return new LessError({ message: 'Plugin ' + name + ' requires version ' + this.versionToString(plugin.minVersion) });
                }
            }
            return plugin;
        }
        return null;
    };
    AbstractPluginLoader.prototype.compareVersion = function (aVersion, bVersion) {
        if (typeof aVersion === 'string') {
            aVersion = aVersion.match(/^(\d+)\.?(\d+)?\.?(\d+)?/);
            aVersion.shift();
        }
        for (var i = 0; i < aVersion.length; i++) {
            if (aVersion[i] !== bVersion[i]) {
                return parseInt(aVersion[i]) > parseInt(bVersion[i]) ? -1 : 1;
            }
        }
        return 0;
    };
    AbstractPluginLoader.prototype.versionToString = function (version) {
        var versionString = '';
        for (var i = 0; i < version.length; i++) {
            versionString += (versionString ? '.' : '') + version[i];
        }
        return versionString;
    };
    AbstractPluginLoader.prototype.printUsage = function (plugins) {
        for (var i = 0; i < plugins.length; i++) {
            var plugin = plugins[i];
            if (plugin.printUsage) {
                plugin.printUsage();
            }
        }
    };
    module.exports = AbstractPluginLoader;
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