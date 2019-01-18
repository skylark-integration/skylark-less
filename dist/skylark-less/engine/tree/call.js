/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node","./anonymous","../functions/function-caller"],function(t,e,n){"use strict";var i={},a={exports:{}},r=t,s=e,o=n,l=function(t,e,n,i){this.name=t,this.args=e,this.calc="calc"===t,this._index=n,this._fileInfo=i};function c(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var e;for(e in t)return!1;return!0}(t)}return(l.prototype=new r).type="Call",l.prototype.accept=function(t){this.args&&(this.args=t.visitArray(this.args))},l.prototype.eval=function(t){var e=t.mathOn;t.mathOn=!this.calc,(this.calc||t.inCalc)&&t.enterCalc();var n=this.args.map(function(e){return e.eval(t)});(this.calc||t.inCalc)&&t.exitCalc(),t.mathOn=e;var i,a=new o(this.name,t,this.getIndex(),this.fileInfo());if(a.isValid()){try{i=a.call(n)}catch(t){throw{type:t.type||"Runtime",message:"error evaluating function `"+this.name+"`"+(t.message?": "+t.message:""),index:this.getIndex(),filename:this.fileInfo().filename,line:t.lineNumber,column:t.columnNumber}}if(null!==i&&void 0!==i)return i instanceof r||(i=new s(i&&!0!==i?i.toString():null)),i._index=this._index,i._fileInfo=this._fileInfo,i}return new l(this.name,n,this.getIndex(),this.fileInfo())},l.prototype.genCSS=function(t,e){e.add(this.name+"(",this.fileInfo(),this.getIndex());for(var n=0;n<this.args.length;n++)this.args[n].genCSS(t,e),n+1<this.args.length&&e.add(", ");e.add(")")},a.exports=l,c(a.exports)?a.exports:c(i)?i:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/call.js.map
