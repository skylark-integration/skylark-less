/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var functionRegistry=require("../functions/function-registry"),LessError=require("../less-error"),AbstractPluginLoader=function(){this.require=function(){return null}};AbstractPluginLoader.prototype.evalPlugin=function(r,e,t,n,i){var s,o,u,a,l,c;a=e.pluginManager,i&&(l="string"==typeof i?i:i.filename);var g=(new this.less.FileManager).extractUrlParts(l).filename;if(l&&(o=a.get(l))){if(c=this.trySetOptions(o,l,g,n))return c;try{o.use&&o.use.call(this.context,o)}catch(r){return r.message=r.message||"Error during @plugin call",new LessError(r,t,l)}return o}u={exports:{},pluginManager:a,fileInfo:i},s=functionRegistry.create();try{new Function("module","require","registerPlugin","functions","tree","less","fileInfo",r)(u,this.require(l),function(r){o=r},s,this.less.tree,this.less,i)}catch(r){return new LessError(r,t,l)}if(o||(o=u.exports),(o=this.validatePlugin(o,l,g))instanceof LessError)return o;if(!o)return new LessError({message:"Not a valid plugin"},t,l);if(o.imports=t,o.filename=l,(!o.minVersion||this.compareVersion("3.0.0",o.minVersion)<0)&&(c=this.trySetOptions(o,l,g,n)))return c;if(a.addPlugin(o,i.filename,s),o.functions=s.getLocalFunctions(),c=this.trySetOptions(o,l,g,n))return c;try{o.use&&o.use.call(this.context,o)}catch(r){return r.message=r.message||"Error during @plugin call",new LessError(r,t,l)}return o},AbstractPluginLoader.prototype.trySetOptions=function(r,e,t,n){if(n&&!r.setOptions)return new LessError({message:"Options have been provided but the plugin "+t+" does not support any options."});try{r.setOptions&&r.setOptions(n)}catch(r){return new LessError(r)}},AbstractPluginLoader.prototype.validatePlugin=function(r,e,t){return r?("function"==typeof r&&(r=new r),r.minVersion&&this.compareVersion(r.minVersion,this.less.version)<0?new LessError({message:"Plugin "+t+" requires version "+this.versionToString(r.minVersion)}):r):null},AbstractPluginLoader.prototype.compareVersion=function(r,e){"string"==typeof r&&(r=r.match(/^(\d+)\.?(\d+)?\.?(\d+)?/)).shift();for(var t=0;t<r.length;t++)if(r[t]!==e[t])return parseInt(r[t])>parseInt(e[t])?-1:1;return 0},AbstractPluginLoader.prototype.versionToString=function(r){for(var e="",t=0;t<r.length;t++)e+=(e?".":"")+r[t];return e},AbstractPluginLoader.prototype.printUsage=function(r){for(var e=0;e<r.length;e++){var t=r[e];t.printUsage&&t.printUsage()}},module.exports=AbstractPluginLoader;
//# sourceMappingURL=../../sourcemaps/engine/environment/abstract-plugin-loader.js.map