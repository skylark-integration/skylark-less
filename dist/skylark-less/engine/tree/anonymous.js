/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Anonymous=function(o,i,t,e,n,s){this.value=o,this._index=i,this._fileInfo=t,this.mapLines=e,this.rulesetLike=void 0!==n&&n,this.allowRoot=!0,this.copyVisibilityInfo(s)};Anonymous.prototype=new Node,Anonymous.prototype.type="Anonymous",Anonymous.prototype.eval=function(){return new Anonymous(this.value,this._index,this._fileInfo,this.mapLines,this.rulesetLike,this.visibilityInfo())},Anonymous.prototype.compare=function(o){return o.toCSS&&this.toCSS()===o.toCSS()?0:void 0},Anonymous.prototype.isRulesetLike=function(){return this.rulesetLike},Anonymous.prototype.genCSS=function(o,i){this.nodeVisible=Boolean(this.value),this.nodeVisible&&i.add(this.value,this._fileInfo,this._index,this.mapLines)},module.exports=Anonymous;
//# sourceMappingURL=../../sourcemaps/engine/tree/anonymous.js.map
