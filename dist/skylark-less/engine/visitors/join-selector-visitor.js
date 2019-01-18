/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./visitor"],function(t){"use strict";var i={},e={exports:{}},n=t,s=function(){this.contexts=[[]],this._visitor=new n(this)};function o(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var i;for(i in t)return!1;return!0}(t)}return s.prototype={run:function(t){return this._visitor.visit(t)},visitDeclaration:function(t,i){i.visitDeeper=!1},visitMixinDefinition:function(t,i){i.visitDeeper=!1},visitRuleset:function(t,i){var e,n=this.contexts[this.contexts.length-1],s=[];this.contexts.push(s),t.root||((e=t.selectors)&&(e=e.filter(function(t){return t.getIsOutput()}),t.selectors=e.length?e:e=null,e&&t.joinSelectors(s,n,e)),e||(t.rules=null),t.paths=s)},visitRulesetOut:function(t){this.contexts.length=this.contexts.length-1},visitMedia:function(t,i){var e=this.contexts[this.contexts.length-1];t.rules[0].root=0===e.length||e[0].multiMedia},visitAtRule:function(t,i){var e=this.contexts[this.contexts.length-1];t.rules&&t.rules.length&&(t.rules[0].root=t.isRooted||0===e.length||null)}},e.exports=s,o(e.exports)?e.exports:o(i)?i:void 0});
//# sourceMappingURL=../../sourcemaps/engine/visitors/join-selector-visitor.js.map
