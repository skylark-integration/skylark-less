/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node","../contexts","../utils"],function(t,e,r){"use strict";var s={},n={exports:{}},o=e,i=r,a=function(t,e){this.ruleset=t,this.frames=e,this.setParent(this.ruleset,this)};function u(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var e;for(e in t)return!1;return!0}(t)}return(a.prototype=new t).type="DetachedRuleset",a.prototype.evalFirst=!0,a.prototype.accept=function(t){this.ruleset=t.visit(this.ruleset)},a.prototype.eval=function(t){var e=this.frames||i.copyArray(t.frames);return new a(this.ruleset,e)},a.prototype.callEval=function(t){return this.ruleset.eval(this.frames?new o.Eval(t,this.frames.concat(t.frames)):t)},n.exports=a,u(n.exports)?n.exports:u(s)?s:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/detached-ruleset.js.map
