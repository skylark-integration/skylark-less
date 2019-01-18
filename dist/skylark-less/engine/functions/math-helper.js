/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["../tree/dimension"],function(e){"use strict";var n={},r={exports:{}},t=e,u=function(){};function o(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var n;for(n in e)return!1;return!0}(e)}return u._math=function(e,n,r){if(!(r instanceof t))throw{type:"Argument",message:"argument must be a number"};return null==n?n=r.unit:r=r.unify(),new t(e(parseFloat(r.value)),n)},r.exports=u,o(r.exports)?r.exports:o(n)?n:void 0});
//# sourceMappingURL=../../sourcemaps/engine/functions/math-helper.js.map
