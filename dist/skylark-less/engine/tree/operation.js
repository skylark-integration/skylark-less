/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Color=require("./color"),Dimension=require("./dimension"),MATH=require("../constants").Math,Operation=function(o,e,t){this.op=o.trim(),this.operands=e,this.isSpaced=t};Operation.prototype=new Node,Operation.prototype.type="Operation",Operation.prototype.accept=function(o){this.operands=o.visit(this.operands)},Operation.prototype.eval=function(o){var e,t=this.operands[0].eval(o),i=this.operands[1].eval(o);if(o.isMathOn(this.op)){if(e="./"===this.op?"/":this.op,t instanceof Dimension&&i instanceof Color&&(t=t.toColor()),i instanceof Dimension&&t instanceof Color&&(i=i.toColor()),!t.operate){if(t instanceof Operation&&"/"===t.op&&o.math===MATH.PARENS_DIVISION)return new Operation(this.op,[t,i],this.isSpaced);throw{type:"Operation",message:"Operation on an invalid type"}}return t.operate(o,e,i)}return new Operation(this.op,[t,i],this.isSpaced)},Operation.prototype.genCSS=function(o,e){this.operands[0].genCSS(o,e),this.isSpaced&&e.add(" "),e.add(this.op),this.isSpaced&&e.add(" "),this.operands[1].genCSS(o,e)},module.exports=Operation;
//# sourceMappingURL=../../sourcemaps/engine/tree/operation.js.map
