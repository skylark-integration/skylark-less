/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var PromiseConstructor,contexts=require("./contexts"),Parser=require("./parser/parser"),PluginManager=require("./plugin-manager"),LessError=require("./less-error"),utils=require("./utils");module.exports=function(r,e,t){var n=function(r,e,o){if("function"==typeof e?(o=e,e=utils.copyOptions(this.options,{})):e=utils.copyOptions(this.options,e||{}),!o){PromiseConstructor||(PromiseConstructor="undefined"==typeof Promise?require("promise"):Promise);var i=this;return new PromiseConstructor(function(t,o){n.call(i,r,e,function(r,e){r?o(r):t(e)})})}var s,a,u=new PluginManager(this,!e.reUsePluginManager);if(e.pluginManager=u,s=new contexts.Parse(e),e.rootFileInfo)a=e.rootFileInfo;else{var l=e.filename||"input",p=l.replace(/[^\/\\]*$/,"");(a={filename:l,rewriteUrls:s.rewriteUrls,rootpath:s.rootpath||"",currentDirectory:p,entryPath:p,rootFilename:l}).rootpath&&"/"!==a.rootpath.slice(-1)&&(a.rootpath+="/")}var c=new t(this,s,a);this.importManager=c,e.plugins&&e.plugins.forEach(function(r){var e,t;if(r.fileContent){if(t=r.fileContent.replace(/^\uFEFF/,""),(e=u.Loader.evalPlugin(t,s,c,r.options,r.filename))instanceof LessError)return o(e)}else u.addPlugin(r)}),new Parser(s,c,a).parse(r,function(r,t){if(r)return o(r);o(null,t,c,e)},e)};return n};
//# sourceMappingURL=../sourcemaps/engine/parse.js.map
