/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Variable=require("./variable"),Property=require("./property"),Quoted=function(e,t,o,i,r){this.escaped=null==o||o,this.value=t||"",this.quote=e.charAt(0),this._index=i,this._fileInfo=r,this.variableRegex=/@\{([\w-]+)\}/g,this.propRegex=/\$\{([\w-]+)\}/g};Quoted.prototype=new Node,Quoted.prototype.type="Quoted",Quoted.prototype.genCSS=function(e,t){this.escaped||t.add(this.quote,this.fileInfo(),this.getIndex()),t.add(this.value),this.escaped||t.add(this.quote)},Quoted.prototype.containsVariables=function(){return this.value.match(this.variableRegex)},Quoted.prototype.eval=function(e){var t=this,o=this.value;function i(e,t,o){var i=e;do{i=(e=i).replace(t,o)}while(e!==i);return i}return o=i(o=i(o,this.variableRegex,function(o,i){var r=new Variable("@"+i,t.getIndex(),t.fileInfo()).eval(e,!0);return r instanceof Quoted?r.value:r.toCSS()}),this.propRegex,function(o,i){var r=new Property("$"+i,t.getIndex(),t.fileInfo()).eval(e,!0);return r instanceof Quoted?r.value:r.toCSS()}),new Quoted(this.quote+o+this.quote,o,this.escaped,this.getIndex(),this.fileInfo())},Quoted.prototype.compare=function(e){return"Quoted"!==e.type||this.escaped||e.escaped?e.toCSS&&this.toCSS()===e.toCSS()?0:void 0:Node.numericCompare(this.value,e.value)},module.exports=Quoted;
//# sourceMappingURL=../../sourcemaps/engine/tree/quoted.js.map
