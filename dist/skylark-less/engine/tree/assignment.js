/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Assignment=function(e,t){this.key=e,this.value=t};Assignment.prototype=new Node,Assignment.prototype.type="Assignment",Assignment.prototype.accept=function(e){this.value=e.visit(this.value)},Assignment.prototype.eval=function(e){return this.value.eval?new Assignment(this.key,this.value.eval(e)):this},Assignment.prototype.genCSS=function(e,t){t.add(this.key+"="),this.value.genCSS?this.value.genCSS(e,t):t.add(this.value)},module.exports=Assignment;
//# sourceMappingURL=../../sourcemaps/engine/tree/assignment.js.map
