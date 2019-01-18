/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["../tree/expression"],function(t){"use strict";var r={},e={exports:{}},n=t,i=function(t,r,e,n){this.name=t.toLowerCase(),this.index=e,this.context=r,this.currentFileInfo=n,this.func=r.frames[0].functionRegistry.get(this.name)};function o(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var r;for(r in t)return!1;return!0}(t)}return i.prototype.isValid=function(){return Boolean(this.func)},i.prototype.call=function(t){return Array.isArray(t)&&(t=t.filter(function(t){return"Comment"!==t.type}).map(function(t){if("Expression"===t.type){var r=t.value.filter(function(t){return"Comment"!==t.type});return 1===r.length?r[0]:new n(r)}return t})),this.func.apply(this,t)},e.exports=i,o(e.exports)?e.exports:o(r)?r:void 0});
//# sourceMappingURL=../../sourcemaps/engine/functions/function-caller.js.map
