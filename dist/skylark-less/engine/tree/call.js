/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Anonymous=require("./anonymous"),FunctionCaller=require("../functions/function-caller"),Call=function(e,n,t,i){this.name=e,this.args=n,this.calc="calc"===e,this._index=t,this._fileInfo=i};Call.prototype=new Node,Call.prototype.type="Call",Call.prototype.accept=function(e){this.args&&(this.args=e.visitArray(this.args))},Call.prototype.eval=function(e){var n=e.mathOn;e.mathOn=!this.calc,(this.calc||e.inCalc)&&e.enterCalc();var t=this.args.map(function(n){return n.eval(e)});(this.calc||e.inCalc)&&e.exitCalc(),e.mathOn=n;var i,a=new FunctionCaller(this.name,e,this.getIndex(),this.fileInfo());if(a.isValid()){try{i=a.call(t)}catch(e){throw{type:e.type||"Runtime",message:"error evaluating function `"+this.name+"`"+(e.message?": "+e.message:""),index:this.getIndex(),filename:this.fileInfo().filename,line:e.lineNumber,column:e.columnNumber}}if(null!==i&&void 0!==i)return i instanceof Node||(i=new Anonymous(i&&!0!==i?i.toString():null)),i._index=this._index,i._fileInfo=this._fileInfo,i}return new Call(this.name,t,this.getIndex(),this.fileInfo())},Call.prototype.genCSS=function(e,n){n.add(this.name+"(",this.fileInfo(),this.getIndex());for(var t=0;t<this.args.length;t++)this.args[t].genCSS(e,n),t+1<this.args.length&&n.add(", ");n.add(")")},module.exports=Call;
//# sourceMappingURL=../../sourcemaps/engine/tree/call.js.map
