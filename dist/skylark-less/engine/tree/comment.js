/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node","./debug-info"],function(t,e){"use strict";var n={},i={exports:{}},o=e,r=function(t,e,n,i){this.value=t,this.isLineComment=e,this._index=n,this._fileInfo=i,this.allowRoot=!0};function s(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var e;for(e in t)return!1;return!0}(t)}return(r.prototype=new t).type="Comment",r.prototype.genCSS=function(t,e){this.debugInfo&&e.add(o(t,this),this.fileInfo(),this.getIndex()),e.add(this.value)},r.prototype.isSilent=function(t){var e=t.compress&&"!"!==this.value[2];return this.isLineComment||e},i.exports=r,s(i.exports)?i.exports:s(n)?n:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/comment.js.map
