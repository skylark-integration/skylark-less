/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Declaration=require("./declaration"),Property=function(e,t,r){this.name=e,this._index=t,this._fileInfo=r};Property.prototype=new Node,Property.prototype.type="Property",Property.prototype.eval=function(e){var t,r=this.name,i=e.pluginManager.less.visitors.ToCSSVisitor.prototype._mergeRules;if(this.evaluating)throw{type:"Name",message:"Recursive property reference for "+r,filename:this.fileInfo().filename,index:this.getIndex()};if(this.evaluating=!0,t=this.find(e.frames,function(t){var n,o=t.property(r);if(o){for(var a=0;a<o.length;a++)n=o[a],o[a]=new Declaration(n.name,n.value,n.important,n.merge,n.index,n.currentFileInfo,n.inline,n.variable);if(i(o),(n=o[o.length-1]).important)e.importantScope[e.importantScope.length-1].important=n.important;return n=n.value.eval(e)}}))return this.evaluating=!1,t;throw{type:"Name",message:"Property '"+r+"' is undefined",filename:this.currentFileInfo.filename,index:this.index}},Property.prototype.find=function(e,t){for(var r,i=0;i<e.length;i++)if(r=t.call(e,e[i]))return r;return null},module.exports=Property;
//# sourceMappingURL=../../sourcemaps/engine/tree/property.js.map
