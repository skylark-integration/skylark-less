/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var AbstractPluginLoader=require("../engine/environment/abstract-plugin-loader.js"),PluginLoader=function(e){this.less=e};PluginLoader.prototype=new AbstractPluginLoader,PluginLoader.prototype.loadPlugin=function(e,n,o,r,t){return new Promise(function(i,a){t.loadFile(e,n,o,r).then(i).catch(a)})},module.exports=PluginLoader;
//# sourceMappingURL=../sourcemaps/browser/plugin-loader.js.map
