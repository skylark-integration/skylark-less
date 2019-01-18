/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node","./operation","./dimension"],function(e,t,n){"use strict";var r={},o={exports:{}},i=t,u=n,a=function(e){this.value=e};function p(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var t;for(t in e)return!1;return!0}(e)}return(a.prototype=new e).type="Negative",a.prototype.genCSS=function(e,t){t.add("-"),this.value.genCSS(e,t)},a.prototype.eval=function(e){return e.isMathOn()?new i("*",[new u(-1),this.value]).eval(e):new a(this.value.eval(e))},o.exports=a,p(o.exports)?o.exports:p(r)?r:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/negative.js.map
