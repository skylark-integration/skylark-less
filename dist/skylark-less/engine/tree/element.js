/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Paren=require("./paren"),Combinator=require("./combinator"),Element=function(t,e,i,o,n,r){this.combinator=t instanceof Combinator?t:new Combinator(t),this.value="string"==typeof e?e.trim():e||"",this.isVariable=i,this._index=o,this._fileInfo=n,this.copyVisibilityInfo(r),this.setParent(this.combinator,this)};Element.prototype=new Node,Element.prototype.type="Element",Element.prototype.accept=function(t){var e=this.value;this.combinator=t.visit(this.combinator),"object"==typeof e&&(this.value=t.visit(e))},Element.prototype.eval=function(t){return new Element(this.combinator,this.value.eval?this.value.eval(t):this.value,this.isVariable,this.getIndex(),this.fileInfo(),this.visibilityInfo())},Element.prototype.clone=function(){return new Element(this.combinator,this.value,this.isVariable,this.getIndex(),this.fileInfo(),this.visibilityInfo())},Element.prototype.genCSS=function(t,e){e.add(this.toCSS(t),this.fileInfo(),this.getIndex())},Element.prototype.toCSS=function(t){t=t||{};var e=this.value,i=t.firstSelector;return e instanceof Paren&&(t.firstSelector=!0),e=e.toCSS?e.toCSS(t):e,t.firstSelector=i,""===e&&"&"===this.combinator.value.charAt(0)?"":this.combinator.toCSS(t)+e},module.exports=Element;
//# sourceMappingURL=../../sourcemaps/engine/tree/element.js.map
