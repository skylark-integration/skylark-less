var AbstractPluginLoader = require('../engine/environment/abstract-plugin-loader.js');
var PluginLoader = function (less) {
    this.less = less;
};
PluginLoader.prototype = new AbstractPluginLoader();
PluginLoader.prototype.loadPlugin = function (filename, basePath, context, environment, fileManager) {
    return new Promise(function (fulfill, reject) {
        fileManager.loadFile(filename, basePath, context, environment).then(fulfill).catch(reject);
    });
};
module.exports = PluginLoader;