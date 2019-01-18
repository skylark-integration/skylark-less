/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./less-error","./transform-tree","./logger"],function(r,s,t){"use strict";var e={},o={exports:{}},i=r,n=s,p=t;function c(r){return"object"!=typeof r||Array.isArray(r)||!function(r){var s;for(s in r)return!1;return!0}(r)}return o.exports=function(r){var s=function(r,s){this.root=r,this.imports=s};return s.prototype.toCSS=function(s){var t,e,o={};try{t=n(this.root,s)}catch(r){throw new i(r,this.imports)}try{var c=Boolean(s.compress);c&&p.warn("The compress option has been deprecated. We recommend you use a dedicated css minifier, for instance see less-plugin-clean-css.");var a={compress:c,dumpLineNumbers:s.dumpLineNumbers,strictUnits:Boolean(s.strictUnits),numPrecision:8};s.sourceMap?(e=new r(s.sourceMap),o.css=e.toCSS(t,a,this.imports)):o.css=t.toCSS(a)}catch(r){throw new i(r,this.imports)}if(s.pluginManager)for(var u=s.pluginManager.getPostProcessors(),m=0;m<u.length;m++)o.css=u[m].process(o.css,{sourceMap:e,options:s,imports:this.imports});for(var h in s.sourceMap&&(o.map=e.getExternalSourceMap()),o.imports=[],this.imports.files)this.imports.files.hasOwnProperty(h)&&h!==this.imports.rootFilename&&o.imports.push(h);return o},s},c(o.exports)?o.exports:c(e)?e:void 0});
//# sourceMappingURL=../sourcemaps/engine/parse-tree.js.map
