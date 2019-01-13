var PluginManager = function (less) {
    this.less = less;
    this.visitors = [];
    this.preProcessors = [];
    this.postProcessors = [];
    this.installedPlugins = [];
    this.fileManagers = [];
    this.iterator = -1;
    this.pluginCache = {};
    this.Loader = new less.PluginLoader(less);
};
var pm, PluginManagerFactory = function (less, newFactory) {
        if (newFactory || !pm) {
            pm = new PluginManager(less);
        }
        return pm;
    };
PluginManager.prototype.addPlugins = function (plugins) {
    if (plugins) {
        for (var i = 0; i < plugins.length; i++) {
            this.addPlugin(plugins[i]);
        }
    }
};
PluginManager.prototype.addPlugin = function (plugin, filename, functionRegistry) {
    this.installedPlugins.push(plugin);
    if (filename) {
        this.pluginCache[filename] = plugin;
    }
    if (plugin.install) {
        plugin.install(this.less, this, functionRegistry || this.less.functions.functionRegistry);
    }
};
PluginManager.prototype.get = function (filename) {
    return this.pluginCache[filename];
};
PluginManager.prototype.addVisitor = function (visitor) {
    this.visitors.push(visitor);
};
PluginManager.prototype.addPreProcessor = function (preProcessor, priority) {
    var indexToInsertAt;
    for (indexToInsertAt = 0; indexToInsertAt < this.preProcessors.length; indexToInsertAt++) {
        if (this.preProcessors[indexToInsertAt].priority >= priority) {
            break;
        }
    }
    this.preProcessors.splice(indexToInsertAt, 0, {
        preProcessor: preProcessor,
        priority: priority
    });
};
PluginManager.prototype.addPostProcessor = function (postProcessor, priority) {
    var indexToInsertAt;
    for (indexToInsertAt = 0; indexToInsertAt < this.postProcessors.length; indexToInsertAt++) {
        if (this.postProcessors[indexToInsertAt].priority >= priority) {
            break;
        }
    }
    this.postProcessors.splice(indexToInsertAt, 0, {
        postProcessor: postProcessor,
        priority: priority
    });
};
PluginManager.prototype.addFileManager = function (manager) {
    this.fileManagers.push(manager);
};
PluginManager.prototype.getPreProcessors = function () {
    var preProcessors = [];
    for (var i = 0; i < this.preProcessors.length; i++) {
        preProcessors.push(this.preProcessors[i].preProcessor);
    }
    return preProcessors;
};
PluginManager.prototype.getPostProcessors = function () {
    var postProcessors = [];
    for (var i = 0; i < this.postProcessors.length; i++) {
        postProcessors.push(this.postProcessors[i].postProcessor);
    }
    return postProcessors;
};
PluginManager.prototype.getVisitors = function () {
    return this.visitors;
};
PluginManager.prototype.visitor = function () {
    var self = this;
    return {
        first: function () {
            self.iterator = -1;
            return self.visitors[self.iterator];
        },
        get: function () {
            self.iterator += 1;
            return self.visitors[self.iterator];
        }
    };
};
PluginManager.prototype.getFileManagers = function () {
    return this.fileManagers;
};
module.exports = PluginManagerFactory;