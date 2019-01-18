/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node"],function(t){"use strict";var e={},o={exports:{}},i=function(t,e,o){this.key=t,this.op=e,this.value=o};function r(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var e;for(e in t)return!1;return!0}(t)}return(i.prototype=new t).type="Attribute",i.prototype.eval=function(t){return new i(this.key.eval?this.key.eval(t):this.key,this.op,this.value&&this.value.eval?this.value.eval(t):this.value)},i.prototype.genCSS=function(t,e){e.add(this.toCSS(t))},i.prototype.toCSS=function(t){var e=this.key.toCSS?this.key.toCSS(t):this.key;return this.op&&(e+=this.op,e+=this.value.toCSS?this.value.toCSS(t):this.value),"["+e+"]"},o.exports=i,r(o.exports)?o.exports:r(e)?e:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/attribute.js.map
