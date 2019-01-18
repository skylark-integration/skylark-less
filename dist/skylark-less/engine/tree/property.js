/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node","./declaration"],function(e,t){"use strict";var n={},r={exports:{}},i=t,o=function(e,t,n){this.name=e,this._index=t,this._fileInfo=n};function a(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var t;for(t in e)return!1;return!0}(e)}return(o.prototype=new e).type="Property",o.prototype.eval=function(e){var t,n=this.name,r=e.pluginManager.less.visitors.ToCSSVisitor.prototype._mergeRules;if(this.evaluating)throw{type:"Name",message:"Recursive property reference for "+n,filename:this.fileInfo().filename,index:this.getIndex()};if(this.evaluating=!0,t=this.find(e.frames,function(t){var o,a=t.property(n);if(a){for(var f=0;f<a.length;f++)o=a[f],a[f]=new i(o.name,o.value,o.important,o.merge,o.index,o.currentFileInfo,o.inline,o.variable);if(r(a),(o=a[a.length-1]).important)e.importantScope[e.importantScope.length-1].important=o.important;return o=o.value.eval(e)}}))return this.evaluating=!1,t;throw{type:"Name",message:"Property '"+n+"' is undefined",filename:this.currentFileInfo.filename,index:this.index}},o.prototype.find=function(e,t){for(var n,r=0;r<e.length;r++)if(n=t.call(e,e[r]))return n;return null},r.exports=o,a(r.exports)?r.exports:a(n)?n:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/property.js.map
