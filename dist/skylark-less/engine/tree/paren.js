/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node"],function(e){"use strict";var t={},r={exports:{}},n=function(e){this.value=e};function o(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var t;for(t in e)return!1;return!0}(e)}return(n.prototype=new e).type="Paren",n.prototype.genCSS=function(e,t){t.add("("),this.value.genCSS(e,t),t.add(")")},n.prototype.eval=function(e){return new n(this.value.eval(e))},r.exports=n,o(r.exports)?r.exports:o(t)?t:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/paren.js.map
