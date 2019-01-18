/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./visitor","./import-visitor","./set-tree-visibility-visitor","./extend-visitor","./join-selector-visitor","./to-css-visitor"],function(i,r,t,o,e,s){"use strict";var n={},v={exports:{}},c={Visitor:i,ImportVisitor:r,MarkVisibleSelectorsVisitor:t,ExtendVisitor:o,JoinSelectorVisitor:e,ToCSSVisitor:s};function u(i){return"object"!=typeof i||Array.isArray(i)||!function(i){var r;for(r in i)return!1;return!0}(i)}return v.exports=c,u(v.exports)?v.exports:u(n)?n:void 0});
//# sourceMappingURL=../../sourcemaps/engine/visitors/index.js.map
