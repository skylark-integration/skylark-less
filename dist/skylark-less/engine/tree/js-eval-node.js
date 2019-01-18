/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node","./variable"],function(e,t){"use strict";var n={},r={exports:{}},a=t,i=function(){};function o(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var t;for(t in e)return!1;return!0}(e)}return(i.prototype=new e).evaluateJavaScript=function(e,t){var n,r=this,i={};if(!t.javascriptEnabled)throw{message:"Inline JavaScript is not enabled. Is it set in your options?",filename:this.fileInfo().filename,index:this.getIndex()};e=e.replace(/@\{([\w-]+)\}/g,function(e,n){return r.jsify(new a("@"+n,r.getIndex(),r.fileInfo()).eval(t))});try{e=new Function("return ("+e+")")}catch(t){throw{message:"JavaScript evaluation error: "+t.message+" from `"+e+"`",filename:this.fileInfo().filename,index:this.getIndex()}}var o=t.frames[0].variables();for(var s in o)o.hasOwnProperty(s)&&(i[s.slice(1)]={value:o[s].value,toJS:function(){return this.value.eval(t).toCSS()}});try{n=e.call(i)}catch(e){throw{message:"JavaScript evaluation error: '"+e.name+": "+e.message.replace(/["]/g,"'")+"'",filename:this.fileInfo().filename,index:this.getIndex()}}return n},i.prototype.jsify=function(e){return Array.isArray(e.value)&&e.value.length>1?"["+e.value.map(function(e){return e.toCSS()}).join(", ")+"]":e.toCSS()},r.exports=i,o(r.exports)?r.exports:o(n)?n:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/js-eval-node.js.map
