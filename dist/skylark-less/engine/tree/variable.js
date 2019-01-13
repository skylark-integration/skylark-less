/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Call=require("./call"),Variable=function(e,i,a){this.name=e,this._index=i,this._fileInfo=a};Variable.prototype=new Node,Variable.prototype.type="Variable",Variable.prototype.eval=function(e){var i,a=this.name;if(0===a.indexOf("@@")&&(a="@"+new Variable(a.slice(1),this.getIndex(),this.fileInfo()).eval(e).value),this.evaluating)throw{type:"Name",message:"Recursive variable definition for "+a,filename:this.fileInfo().filename,index:this.getIndex()};if(this.evaluating=!0,i=this.find(e.frames,function(i){var t=i.variable(a);if(t){if(t.important)e.importantScope[e.importantScope.length-1].important=t.important;return e.inCalc?new Call("_SELF",[t.value]).eval(e):t.value.eval(e)}}))return this.evaluating=!1,i;throw{type:"Name",message:"variable "+a+" is undefined",filename:this.fileInfo().filename,index:this.getIndex()}},Variable.prototype.find=function(e,i){for(var a,t=0;t<e.length;t++)if(a=i.call(e,e[t]))return a;return null},module.exports=Variable;
//# sourceMappingURL=../../sourcemaps/engine/tree/variable.js.map
