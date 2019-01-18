/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define([],function(){"use strict";var i={},t={exports:{}},r=function(i){this.visible=i};function n(i){return"object"!=typeof i||Array.isArray(i)||!function(i){var t;for(t in i)return!1;return!0}(i)}return r.prototype.run=function(i){this.visit(i)},r.prototype.visitArray=function(i){if(!i)return i;var t,r=i.length;for(t=0;t<r;t++)this.visit(i[t]);return i},r.prototype.visit=function(i){return i?i.constructor===Array?this.visitArray(i):!i.blocksVisibility||i.blocksVisibility()?i:(this.visible?i.ensureVisibility():i.ensureInvisibility(),i.accept(this),i):i},t.exports=r,n(t.exports)?t.exports:n(i)?i:void 0});
//# sourceMappingURL=../../sourcemaps/engine/visitors/set-tree-visibility-visitor.js.map
