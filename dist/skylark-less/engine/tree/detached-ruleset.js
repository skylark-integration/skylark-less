/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),contexts=require("../contexts"),utils=require("../utils"),DetachedRuleset=function(e,t){this.ruleset=e,this.frames=t,this.setParent(this.ruleset,this)};DetachedRuleset.prototype=new Node,DetachedRuleset.prototype.type="DetachedRuleset",DetachedRuleset.prototype.evalFirst=!0,DetachedRuleset.prototype.accept=function(e){this.ruleset=e.visit(this.ruleset)},DetachedRuleset.prototype.eval=function(e){var t=this.frames||utils.copyArray(e.frames);return new DetachedRuleset(this.ruleset,t)},DetachedRuleset.prototype.callEval=function(e){return this.ruleset.eval(this.frames?new contexts.Eval(e,this.frames.concat(e.frames)):e)},module.exports=DetachedRuleset;
//# sourceMappingURL=../../sourcemaps/engine/tree/detached-ruleset.js.map
