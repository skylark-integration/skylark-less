/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Paren=function(e){this.value=e};Paren.prototype=new Node,Paren.prototype.type="Paren",Paren.prototype.genCSS=function(e,n){n.add("("),this.value.genCSS(e,n),n.add(")")},Paren.prototype.eval=function(e){return new Paren(this.value.eval(e))},module.exports=Paren;
//# sourceMappingURL=../../sourcemaps/engine/tree/paren.js.map
