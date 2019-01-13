/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),URL=function(e,t,a,i){this.value=e,this._index=t,this._fileInfo=a,this.isEvald=i};function escapePath(e){return e.replace(/[\(\)'"\s]/g,function(e){return"\\"+e})}URL.prototype=new Node,URL.prototype.type="Url",URL.prototype.accept=function(e){this.value=e.visit(this.value)},URL.prototype.genCSS=function(e,t){t.add("url("),this.value.genCSS(e,t),t.add(")")},URL.prototype.eval=function(e){var t,a=this.value.eval(e);if(!this.isEvald&&("string"==typeof(t=this.fileInfo()&&this.fileInfo().rootpath)&&"string"==typeof a.value&&e.pathRequiresRewrite(a.value)?(a.quote||(t=escapePath(t)),a.value=e.rewritePath(a.value,t)):a.value=e.normalizePath(a.value),e.urlArgs&&!a.value.match(/^\s*data:/))){var i=(-1===a.value.indexOf("?")?"?":"&")+e.urlArgs;-1!==a.value.indexOf("#")?a.value=a.value.replace("#",i+"#"):a.value+=i}return new URL(a,this.getIndex(),this.fileInfo(),!0)},module.exports=URL;
//# sourceMappingURL=../../sourcemaps/engine/tree/url.js.map
