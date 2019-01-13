/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Visitor=require("./visitor"),JoinSelectorVisitor=function(){this.contexts=[[]],this._visitor=new Visitor(this)};JoinSelectorVisitor.prototype={run:function(t){return this._visitor.visit(t)},visitDeclaration:function(t,i){i.visitDeeper=!1},visitMixinDefinition:function(t,i){i.visitDeeper=!1},visitRuleset:function(t,i){var e,s=this.contexts[this.contexts.length-1],n=[];this.contexts.push(n),t.root||((e=t.selectors)&&(e=e.filter(function(t){return t.getIsOutput()}),t.selectors=e.length?e:e=null,e&&t.joinSelectors(n,s,e)),e||(t.rules=null),t.paths=n)},visitRulesetOut:function(t){this.contexts.length=this.contexts.length-1},visitMedia:function(t,i){var e=this.contexts[this.contexts.length-1];t.rules[0].root=0===e.length||e[0].multiMedia},visitAtRule:function(t,i){var e=this.contexts[this.contexts.length-1];t.rules&&t.rules.length&&(t.rules[0].root=t.isRooted||0===e.length||null)}},module.exports=JoinSelectorVisitor;
//# sourceMappingURL=../../sourcemaps/engine/visitors/join-selector-visitor.js.map
