/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node"],function(e){"use strict";var t={},r={exports:{}},i=function(e,t,r,i){this.value=e,this._index=t,this._fileInfo=r,this.isEvald=i};function a(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var t;for(t in e)return!1;return!0}(e)}return(i.prototype=new e).type="Url",i.prototype.accept=function(e){this.value=e.visit(this.value)},i.prototype.genCSS=function(e,t){t.add("url("),this.value.genCSS(e,t),t.add(")")},i.prototype.eval=function(e){var t,r=this.value.eval(e);if(!this.isEvald&&("string"==typeof(t=this.fileInfo()&&this.fileInfo().rootpath)&&"string"==typeof r.value&&e.pathRequiresRewrite(r.value)?(r.quote||(t=t.replace(/[\(\)'"\s]/g,function(e){return"\\"+e})),r.value=e.rewritePath(r.value,t)):r.value=e.normalizePath(r.value),e.urlArgs&&!r.value.match(/^\s*data:/))){var a=(-1===r.value.indexOf("?")?"?":"&")+e.urlArgs;-1!==r.value.indexOf("#")?r.value=r.value.replace("#",a+"#"):r.value+=a}return new i(r,this.getIndex(),this.fileInfo(),!0)},r.exports=i,a(r.exports)?r.exports:a(t)?t:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/url.js.map
