/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),getDebugInfo=require("./debug-info"),Comment=function(e,t,o,n){this.value=e,this.isLineComment=t,this._index=o,this._fileInfo=n,this.allowRoot=!0};Comment.prototype=new Node,Comment.prototype.type="Comment",Comment.prototype.genCSS=function(e,t){this.debugInfo&&t.add(getDebugInfo(e,this),this.fileInfo(),this.getIndex()),t.add(this.value)},Comment.prototype.isSilent=function(e){var t=e.compress&&"!"!==this.value[2];return this.isLineComment||t},module.exports=Comment;
//# sourceMappingURL=../../sourcemaps/engine/tree/comment.js.map
