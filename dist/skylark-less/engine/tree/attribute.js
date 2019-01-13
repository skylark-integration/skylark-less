/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Attribute=function(t,e,i){this.key=t,this.op=e,this.value=i};Attribute.prototype=new Node,Attribute.prototype.type="Attribute",Attribute.prototype.eval=function(t){return new Attribute(this.key.eval?this.key.eval(t):this.key,this.op,this.value&&this.value.eval?this.value.eval(t):this.value)},Attribute.prototype.genCSS=function(t,e){e.add(this.toCSS(t))},Attribute.prototype.toCSS=function(t){var e=this.key.toCSS?this.key.toCSS(t):this.key;return this.op&&(e+=this.op,e+=this.value.toCSS?this.value.toCSS(t):this.value),"["+e+"]"},module.exports=Attribute;
//# sourceMappingURL=../../sourcemaps/engine/tree/attribute.js.map
