/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node","./paren","./comment","./dimension","../constants"],function(t,e,n,r,i){"use strict";var a={},s={exports:{}},o=t,p=e,u=n,h=r,l=i.Math,v=function(t,e){if(this.value=t,this.noSpacing=e,!t)throw new Error("Expression requires an array parameter")};function c(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var e;for(e in t)return!1;return!0}(t)}return(v.prototype=new o).type="Expression",v.prototype.accept=function(t){this.value=t.visitArray(this.value)},v.prototype.eval=function(t){var e,n=t.isMathOn(),r=this.parens&&(t.math!==l.STRICT_LEGACY||!this.parensInOp),i=!1;return r&&t.inParenthesis(),this.value.length>1?e=new v(this.value.map(function(e){return e.eval?e.eval(t):e}),this.noSpacing):1===this.value.length?(!this.value[0].parens||this.value[0].parensInOp||t.inCalc||(i=!0),e=this.value[0].eval(t)):e=this,r&&t.outOfParenthesis(),!this.parens||!this.parensInOp||n||i||e instanceof h||(e=new p(e)),e},v.prototype.genCSS=function(t,e){for(var n=0;n<this.value.length;n++)this.value[n].genCSS(t,e),!this.noSpacing&&n+1<this.value.length&&e.add(" ")},v.prototype.throwAwayComments=function(){this.value=this.value.filter(function(t){return!(t instanceof u)})},s.exports=v,c(s.exports)?s.exports:c(a)?a:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/expression.js.map
