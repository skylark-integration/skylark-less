/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var LessError=require("./less-error"),transformTree=require("./transform-tree"),logger=require("./logger");module.exports=function(r){var s=function(r,s){this.root=r,this.imports=s};return s.prototype.toCSS=function(s){var e,o,t={};try{e=transformTree(this.root,s)}catch(r){throw new LessError(r,this.imports)}try{var i=Boolean(s.compress);i&&logger.warn("The compress option has been deprecated. We recommend you use a dedicated css minifier, for instance see less-plugin-clean-css.");var n={compress:i,dumpLineNumbers:s.dumpLineNumbers,strictUnits:Boolean(s.strictUnits),numPrecision:8};s.sourceMap?(o=new r(s.sourceMap),t.css=o.toCSS(e,n,this.imports)):t.css=e.toCSS(n)}catch(r){throw new LessError(r,this.imports)}if(s.pluginManager)for(var a=s.pluginManager.getPostProcessors(),p=0;p<a.length;p++)t.css=a[p].process(t.css,{sourceMap:o,options:s,imports:this.imports});for(var c in s.sourceMap&&(t.map=o.getExternalSourceMap()),t.imports=[],this.imports.files)this.imports.files.hasOwnProperty(c)&&c!==this.imports.rootFilename&&t.imports.push(c);return t},s};
//# sourceMappingURL=../sourcemaps/engine/parse-tree.js.map
