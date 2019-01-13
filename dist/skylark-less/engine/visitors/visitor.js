/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var tree=require("../tree"),_visitArgs={visitDeeper:!0},_hasIndexed=!1;function _noop(t){return t}function indexNodeTypes(t,e){var i,n;for(i in t)switch(typeof(n=t[i])){case"function":n.prototype&&n.prototype.type&&(n.prototype.typeIndex=e++);break;case"object":e=indexNodeTypes(n,e)}return e}var Visitor=function(t){this._implementation=t,this._visitInCache={},this._visitOutCache={},_hasIndexed||(indexNodeTypes(tree,1),_hasIndexed=!0)};Visitor.prototype={visit:function(t){if(!t)return t;var e=t.typeIndex;if(!e)return t.value&&t.value.typeIndex&&this.visit(t.value),t;var i,n=this._implementation,s=this._visitInCache[e],r=this._visitOutCache[e],o=_visitArgs;if(o.visitDeeper=!0,s||(s=n[i="visit"+t.type]||_noop,r=n[i+"Out"]||_noop,this._visitInCache[e]=s,this._visitOutCache[e]=r),s!==_noop){var p=s.call(n,t,o);t&&n.isReplacing&&(t=p)}return o.visitDeeper&&t&&t.accept&&t.accept(this),r!=_noop&&r.call(n,t),t},visitArray:function(t,e){if(!t)return t;var i,n=t.length;if(e||!this._implementation.isReplacing){for(i=0;i<n;i++)this.visit(t[i]);return t}var s=[];for(i=0;i<n;i++){var r=this.visit(t[i]);void 0!==r&&(r.splice?r.length&&this.flatten(r,s):s.push(r))}return s},flatten:function(t,e){var i,n,s,r,o,p;for(e||(e=[]),n=0,i=t.length;n<i;n++)if(void 0!==(s=t[n]))if(s.splice)for(o=0,r=s.length;o<r;o++)void 0!==(p=s[o])&&(p.splice?p.length&&this.flatten(p,e):e.push(p));else e.push(s);return e}},module.exports=Visitor;
//# sourceMappingURL=../../sourcemaps/engine/visitors/visitor.js.map
