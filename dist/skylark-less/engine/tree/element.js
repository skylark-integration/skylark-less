/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node","./paren","./combinator"],function(t,i,e){"use strict";var o={},n={exports:{}},r=i,s=e,a=function(t,i,e,o,n,r){this.combinator=t instanceof s?t:new s(t),this.value="string"==typeof i?i.trim():i||"",this.isVariable=e,this._index=o,this._fileInfo=n,this.copyVisibilityInfo(r),this.setParent(this.combinator,this)};function h(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var i;for(i in t)return!1;return!0}(t)}return(a.prototype=new t).type="Element",a.prototype.accept=function(t){var i=this.value;this.combinator=t.visit(this.combinator),"object"==typeof i&&(this.value=t.visit(i))},a.prototype.eval=function(t){return new a(this.combinator,this.value.eval?this.value.eval(t):this.value,this.isVariable,this.getIndex(),this.fileInfo(),this.visibilityInfo())},a.prototype.clone=function(){return new a(this.combinator,this.value,this.isVariable,this.getIndex(),this.fileInfo(),this.visibilityInfo())},a.prototype.genCSS=function(t,i){i.add(this.toCSS(t),this.fileInfo(),this.getIndex())},a.prototype.toCSS=function(t){t=t||{};var i=this.value,e=t.firstSelector;return i instanceof r&&(t.firstSelector=!0),i=i.toCSS?i.toCSS(t):i,t.firstSelector=e,""===i&&"&"===this.combinator.value.charAt(0)?"":this.combinator.toCSS(t)+i},n.exports=a,h(n.exports)?n.exports:h(o)?o:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/element.js.map
