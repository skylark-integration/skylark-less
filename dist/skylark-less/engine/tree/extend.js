/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node","./selector"],function(t,e){"use strict";var i={},o={exports:{}},s=t,n=e,r=function t(e,i,o,s,n){switch(this.selector=e,this.option=i,this.object_id=t.next_id++,this.parent_ids=[this.object_id],this._index=o,this._fileInfo=s,this.copyVisibilityInfo(n),this.allowRoot=!0,i){case"all":this.allowBefore=!0,this.allowAfter=!0;break;default:this.allowBefore=!1,this.allowAfter=!1}this.setParent(this.selector,this)};function l(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var e;for(e in t)return!1;return!0}(t)}return r.next_id=0,(r.prototype=new s).type="Extend",r.prototype.accept=function(t){this.selector=t.visit(this.selector)},r.prototype.eval=function(t){return new r(this.selector.eval(t),this.option,this.getIndex(),this.fileInfo(),this.visibilityInfo())},r.prototype.clone=function(t){return new r(this.selector,this.option,this.getIndex(),this.fileInfo(),this.visibilityInfo())},r.prototype.findSelfSelectors=function(t){var e,i,o=[];for(e=0;e<t.length;e++)i=t[e].elements,e>0&&i.length&&""===i[0].combinator.value&&(i[0].combinator.value=" "),o=o.concat(t[e].elements);this.selfSelectors=[new n(o)],this.selfSelectors[0].copyVisibilityInfo(this.visibilityInfo())},o.exports=r,l(o.exports)?o.exports:l(i)?i:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/extend.js.map
