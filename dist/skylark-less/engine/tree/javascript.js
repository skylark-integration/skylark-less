/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var JsEvalNode=require("./js-eval-node"),Dimension=require("./dimension"),Quoted=require("./quoted"),Anonymous=require("./anonymous"),JavaScript=function(e,i,n,o){this.escaped=i,this.expression=e,this._index=n,this._fileInfo=o};JavaScript.prototype=new JsEvalNode,JavaScript.prototype.type="JavaScript",JavaScript.prototype.eval=function(e){var i=this.evaluateJavaScript(this.expression,e),n=typeof i;return"number"!==n||isNaN(i)?"string"===n?new Quoted('"'+i+'"',i,this.escaped,this._index):Array.isArray(i)?new Anonymous(i.join(", ")):new Anonymous(i):new Dimension(i)},module.exports=JavaScript;
//# sourceMappingURL=../../sourcemaps/engine/tree/javascript.js.map
