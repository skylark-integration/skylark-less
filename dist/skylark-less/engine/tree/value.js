/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Value=function(e){if(!e)throw new Error("Value requires an array argument");Array.isArray(e)?this.value=e:this.value=[e]};Value.prototype=new Node,Value.prototype.type="Value",Value.prototype.accept=function(e){this.value&&(this.value=e.visitArray(this.value))},Value.prototype.eval=function(e){return 1===this.value.length?this.value[0].eval(e):new Value(this.value.map(function(t){return t.eval(e)}))},Value.prototype.genCSS=function(e,t){var a;for(a=0;a<this.value.length;a++)this.value[a].genCSS(e,t),a+1<this.value.length&&t.add(e&&e.compress?",":", ")},module.exports=Value;
//# sourceMappingURL=../../sourcemaps/engine/tree/value.js.map
