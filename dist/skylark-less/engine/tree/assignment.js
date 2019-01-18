/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node"],function(t){"use strict";var e={},n={exports:{}},i=function(t,e){this.key=t,this.value=e};function r(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var e;for(e in t)return!1;return!0}(t)}return(i.prototype=new t).type="Assignment",i.prototype.accept=function(t){this.value=t.visit(this.value)},i.prototype.eval=function(t){return this.value.eval?new i(this.key,this.value.eval(t)):this},i.prototype.genCSS=function(t,e){e.add(this.key+"="),this.value.genCSS?this.value.genCSS(t,e):e.add(this.value)},n.exports=i,r(n.exports)?n.exports:r(e)?e:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/assignment.js.map
