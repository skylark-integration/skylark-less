/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node","./variable","./property"],function(e,t,i){"use strict";var n={},o={exports:{}},r=e,a=t,s=i,u=function(e,t,i,n,o){this.escaped=null==i||i,this.value=t||"",this.quote=e.charAt(0),this._index=n,this._fileInfo=o,this.variableRegex=/@\{([\w-]+)\}/g,this.propRegex=/\$\{([\w-]+)\}/g};function p(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var t;for(t in e)return!1;return!0}(e)}return(u.prototype=new r).type="Quoted",u.prototype.genCSS=function(e,t){this.escaped||t.add(this.quote,this.fileInfo(),this.getIndex()),t.add(this.value),this.escaped||t.add(this.quote)},u.prototype.containsVariables=function(){return this.value.match(this.variableRegex)},u.prototype.eval=function(e){var t=this,i=this.value;function n(e,t,i){var n=e;do{n=(e=n).replace(t,i)}while(e!==n);return n}return i=n(i=n(i,this.variableRegex,function(i,n){var o=new a("@"+n,t.getIndex(),t.fileInfo()).eval(e,!0);return o instanceof u?o.value:o.toCSS()}),this.propRegex,function(i,n){var o=new s("$"+n,t.getIndex(),t.fileInfo()).eval(e,!0);return o instanceof u?o.value:o.toCSS()}),new u(this.quote+i+this.quote,i,this.escaped,this.getIndex(),this.fileInfo())},u.prototype.compare=function(e){return"Quoted"!==e.type||this.escaped||e.escaped?e.toCSS&&this.toCSS()===e.toCSS()?0:void 0:r.numericCompare(this.value,e.value)},o.exports=u,p(o.exports)?o.exports:p(n)?n:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/quoted.js.map
