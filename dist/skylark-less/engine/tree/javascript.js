/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./js-eval-node","./dimension","./quoted","./anonymous"],function(e,t,n,r){"use strict";var i={},o={exports:{}},s=t,a=n,p=r,u=function(e,t,n,r){this.escaped=t,this.expression=e,this._index=n,this._fileInfo=r};function c(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var t;for(t in e)return!1;return!0}(e)}return(u.prototype=new e).type="JavaScript",u.prototype.eval=function(e){var t=this.evaluateJavaScript(this.expression,e),n=typeof t;return"number"!==n||isNaN(t)?"string"===n?new a('"'+t+'"',t,this.escaped,this._index):Array.isArray(t)?new p(t.join(", ")):new p(t):new s(t)},o.exports=u,c(o.exports)?o.exports:c(i)?i:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/javascript.js.map
