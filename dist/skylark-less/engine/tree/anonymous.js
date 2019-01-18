/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node"],function(t){"use strict";var i={},e={exports:{}},o=function(t,i,e,o,n,s){this.value=t,this._index=i,this._fileInfo=e,this.mapLines=o,this.rulesetLike=void 0!==n&&n,this.allowRoot=!0,this.copyVisibilityInfo(s)};function n(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var i;for(i in t)return!1;return!0}(t)}return(o.prototype=new t).type="Anonymous",o.prototype.eval=function(){return new o(this.value,this._index,this._fileInfo,this.mapLines,this.rulesetLike,this.visibilityInfo())},o.prototype.compare=function(t){return t.toCSS&&this.toCSS()===t.toCSS()?0:void 0},o.prototype.isRulesetLike=function(){return this.rulesetLike},o.prototype.genCSS=function(t,i){this.nodeVisible=Boolean(this.value),this.nodeVisible&&i.add(this.value,this._fileInfo,this._index,this.mapLines)},e.exports=o,n(e.exports)?e.exports:n(i)?i:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/anonymous.js.map
