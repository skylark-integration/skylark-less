/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Paren=require("./paren"),Comment=require("./comment"),Dimension=require("./dimension"),MATH=require("../constants").Math,Expression=function(e,n){if(this.value=e,this.noSpacing=n,!e)throw new Error("Expression requires an array parameter")};Expression.prototype=new Node,Expression.prototype.type="Expression",Expression.prototype.accept=function(e){this.value=e.visitArray(this.value)},Expression.prototype.eval=function(e){var n,t=e.isMathOn(),i=this.parens&&(e.math!==MATH.STRICT_LEGACY||!this.parensInOp),s=!1;return i&&e.inParenthesis(),this.value.length>1?n=new Expression(this.value.map(function(n){return n.eval?n.eval(e):n}),this.noSpacing):1===this.value.length?(!this.value[0].parens||this.value[0].parensInOp||e.inCalc||(s=!0),n=this.value[0].eval(e)):n=this,i&&e.outOfParenthesis(),!this.parens||!this.parensInOp||t||s||n instanceof Dimension||(n=new Paren(n)),n},Expression.prototype.genCSS=function(e,n){for(var t=0;t<this.value.length;t++)this.value[t].genCSS(e,n),!this.noSpacing&&t+1<this.value.length&&n.add(" ")},Expression.prototype.throwAwayComments=function(){this.value=this.value.filter(function(e){return!(e instanceof Comment)})},module.exports=Expression;
//# sourceMappingURL=../../sourcemaps/engine/tree/expression.js.map
