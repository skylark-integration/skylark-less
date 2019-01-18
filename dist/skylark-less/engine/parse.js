/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./contexts","./parser/parser","./plugin-manager","./less-error","./utils"],function(r,e,n,t,o){"use strict";var i,a={},s={exports:{}},u=r,l=e,p=n,f=t,c=o;function h(r){return"object"!=typeof r||Array.isArray(r)||!function(r){var e;for(e in r)return!1;return!0}(r)}return s.exports=function(r,e,n){var t=function(r,e,o){if("function"==typeof e?(o=e,e=c.copyOptions(this.options,{})):e=c.copyOptions(this.options,e||{}),!o){i||(i=Promise);var a=this;return new i(function(n,o){t.call(a,r,e,function(r,e){r?o(r):n(e)})})}var s,h,g=new p(this,!e.reUsePluginManager);if(e.pluginManager=g,s=new u.Parse(e),e.rootFileInfo)h=e.rootFileInfo;else{var v=e.filename||"input",y=v.replace(/[^\/\\]*$/,"");(h={filename:v,rewriteUrls:s.rewriteUrls,rootpath:s.rootpath||"",currentDirectory:y,entryPath:y,rootFilename:v}).rootpath&&"/"!==h.rootpath.slice(-1)&&(h.rootpath+="/")}var m=new n(this,s,h);this.importManager=m,e.plugins&&e.plugins.forEach(function(r){var e,n;if(r.fileContent){if(n=r.fileContent.replace(/^\uFEFF/,""),(e=g.Loader.evalPlugin(n,s,m,r.options,r.filename))instanceof f)return o(e)}else g.addPlugin(r)}),new l(s,m,h).parse(r,function(r,n){if(r)return o(r);o(null,n,m,e)},e)};return t},h(s.exports)?s.exports:h(a)?a:void 0});
//# sourceMappingURL=../sourcemaps/engine/parse.js.map
