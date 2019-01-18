/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node"],function(e){"use strict";var t={},r={exports:{}},n=function(e){if(!e)throw new Error("Value requires an array argument");Array.isArray(e)?this.value=e:this.value=[e]};function a(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var t;for(t in e)return!1;return!0}(e)}return(n.prototype=new e).type="Value",n.prototype.accept=function(e){this.value&&(this.value=e.visitArray(this.value))},n.prototype.eval=function(e){return 1===this.value.length?this.value[0].eval(e):new n(this.value.map(function(t){return t.eval(e)}))},n.prototype.genCSS=function(e,t){var r;for(r=0;r<this.value.length;r++)this.value[r].genCSS(e,t),r+1<this.value.length&&t.add(e&&e.compress?",":", ")},r.exports=n,a(r.exports)?r.exports:a(t)?t:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/value.js.map
