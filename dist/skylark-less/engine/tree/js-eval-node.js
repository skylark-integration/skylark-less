/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Variable=require("./variable"),JsEvalNode=function(){};JsEvalNode.prototype=new Node,JsEvalNode.prototype.evaluateJavaScript=function(e,a){var t,r=this,n={};if(!a.javascriptEnabled)throw{message:"Inline JavaScript is not enabled. Is it set in your options?",filename:this.fileInfo().filename,index:this.getIndex()};e=e.replace(/@\{([\w-]+)\}/g,function(e,t){return r.jsify(new Variable("@"+t,r.getIndex(),r.fileInfo()).eval(a))});try{e=new Function("return ("+e+")")}catch(a){throw{message:"JavaScript evaluation error: "+a.message+" from `"+e+"`",filename:this.fileInfo().filename,index:this.getIndex()}}var i=a.frames[0].variables();for(var o in i)i.hasOwnProperty(o)&&(n[o.slice(1)]={value:i[o].value,toJS:function(){return this.value.eval(a).toCSS()}});try{t=e.call(n)}catch(e){throw{message:"JavaScript evaluation error: '"+e.name+": "+e.message.replace(/["]/g,"'")+"'",filename:this.fileInfo().filename,index:this.getIndex()}}return t},JsEvalNode.prototype.jsify=function(e){return Array.isArray(e.value)&&e.value.length>1?"["+e.value.map(function(e){return e.toCSS()}).join(", ")+"]":e.toCSS()},module.exports=JsEvalNode;
//# sourceMappingURL=../../sourcemaps/engine/tree/js-eval-node.js.map
