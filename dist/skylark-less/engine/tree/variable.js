/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node","./call"],function(e,t){"use strict";var i={},n={exports:{}},r=t,a=function(e,t,i){this.name=e,this._index=t,this._fileInfo=i};function o(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var t;for(t in e)return!1;return!0}(e)}return(a.prototype=new e).type="Variable",a.prototype.eval=function(e){var t,i=this.name;if(0===i.indexOf("@@")&&(i="@"+new a(i.slice(1),this.getIndex(),this.fileInfo()).eval(e).value),this.evaluating)throw{type:"Name",message:"Recursive variable definition for "+i,filename:this.fileInfo().filename,index:this.getIndex()};if(this.evaluating=!0,t=this.find(e.frames,function(t){var n=t.variable(i);if(n){if(n.important)e.importantScope[e.importantScope.length-1].important=n.important;return e.inCalc?new r("_SELF",[n.value]).eval(e):n.value.eval(e)}}))return this.evaluating=!1,t;throw{type:"Name",message:"variable "+i+" is undefined",filename:this.fileInfo().filename,index:this.getIndex()}},a.prototype.find=function(e,t){for(var i,n=0;n<e.length;n++)if(i=t.call(e,e[n]))return i;return null},n.exports=a,o(n.exports)?n.exports:o(i)?i:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/variable.js.map
