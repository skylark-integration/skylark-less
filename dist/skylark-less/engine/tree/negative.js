/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Operation=require("./operation"),Dimension=require("./dimension"),Negative=function(e){this.value=e};Negative.prototype=new Node,Negative.prototype.type="Negative",Negative.prototype.genCSS=function(e,t){t.add("-"),this.value.genCSS(e,t)},Negative.prototype.eval=function(e){return e.isMathOn()?new Operation("*",[new Dimension(-1),this.value]).eval(e):new Negative(this.value.eval(e))},module.exports=Negative;
//# sourceMappingURL=../../sourcemaps/engine/tree/negative.js.map
