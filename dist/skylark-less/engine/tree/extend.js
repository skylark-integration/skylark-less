/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Selector=require("./selector"),Extend=function t(e,i,o,n,s){switch(this.selector=e,this.option=i,this.object_id=t.next_id++,this.parent_ids=[this.object_id],this._index=o,this._fileInfo=n,this.copyVisibilityInfo(s),this.allowRoot=!0,i){case"all":this.allowBefore=!0,this.allowAfter=!0;break;default:this.allowBefore=!1,this.allowAfter=!1}this.setParent(this.selector,this)};Extend.next_id=0,Extend.prototype=new Node,Extend.prototype.type="Extend",Extend.prototype.accept=function(t){this.selector=t.visit(this.selector)},Extend.prototype.eval=function(t){return new Extend(this.selector.eval(t),this.option,this.getIndex(),this.fileInfo(),this.visibilityInfo())},Extend.prototype.clone=function(t){return new Extend(this.selector,this.option,this.getIndex(),this.fileInfo(),this.visibilityInfo())},Extend.prototype.findSelfSelectors=function(t){var e,i,o=[];for(e=0;e<t.length;e++)i=t[e].elements,e>0&&i.length&&""===i[0].combinator.value&&(i[0].combinator.value=" "),o=o.concat(t[e].elements);this.selfSelectors=[new Selector(o)],this.selfSelectors[0].copyVisibilityInfo(this.visibilityInfo())},module.exports=Extend;
//# sourceMappingURL=../../sourcemaps/engine/tree/extend.js.map
