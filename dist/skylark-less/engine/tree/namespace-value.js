/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Variable=require("./variable"),Ruleset=require("./ruleset"),Selector=require("./selector"),NamespaceValue=function(e,a,t,r,l){this.value=e,this.lookups=a,this.important=t,this._index=r,this._fileInfo=l};NamespaceValue.prototype=new Node,NamespaceValue.prototype.type="NamespaceValue",NamespaceValue.prototype.eval=function(e){var a,t,r=this.value.eval(e);for(a=0;a<this.lookups.length;a++){if(t=this.lookups[a],Array.isArray(r)&&(r=new Ruleset([new Selector],r)),""===t)r=r.lastDeclaration();else if("@"===t.charAt(0)){if("@"===t.charAt(1)&&(t="@"+new Variable(t.substr(1)).eval(e).value),r.variables&&(r=r.variable(t)),!r)throw{type:"Name",message:"variable "+t+" not found",filename:this.fileInfo().filename,index:this.getIndex()}}else{if(t="$@"===t.substring(0,2)?"$"+new Variable(t.substr(1)).eval(e).value:"$"===t.charAt(0)?t:"$"+t,r.properties&&(r=r.property(t)),!r)throw{type:"Name",message:'property "'+t.substr(1)+'" not found',filename:this.fileInfo().filename,index:this.getIndex()};r=r[r.length-1]}r.value&&(r=r.eval(e).value),r.ruleset&&(r=r.ruleset.eval(e))}return r},module.exports=NamespaceValue;
//# sourceMappingURL=../../sourcemaps/engine/tree/namespace-value.js.map
