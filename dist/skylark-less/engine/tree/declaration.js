/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node","./value","./keyword","./anonymous","../constants"],function(t,e,i,n,a){"use strict";var o={},r={exports:{}},s=t,h=e,l=i,f=n,p=a.Math,m=function(t,e,i,n,a,o,r,l){this.name=t,this.value=e instanceof s?e:new h([e?new f(e):null]),this.important=i?" "+i.trim():"",this.merge=n,this._index=a,this._fileInfo=o,this.inline=r||!1,this.variable=void 0!==l?l:t.charAt&&"@"===t.charAt(0),this.allowRoot=!0,this.setParent(this.value,this)};function u(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var e;for(e in t)return!1;return!0}(t)}return(m.prototype=new s).type="Declaration",m.prototype.genCSS=function(t,e){e.add(this.name+(t.compress?":":": "),this.fileInfo(),this.getIndex());try{this.value.genCSS(t,e)}catch(t){throw t.index=this._index,t.filename=this._fileInfo.filename,t}e.add(this.important+(this.inline||t.lastRule&&t.compress?"":";"),this._fileInfo,this._index)},m.prototype.eval=function(t){var e,i,n=!1,a=this.name,o=this.variable;"string"!=typeof a&&(a=1===a.length&&a[0]instanceof l?a[0].value:function(t,e){var i,n="",a=e.length,o={add:function(t){n+=t}};for(i=0;i<a;i++)e[i].eval(t).genCSS(t,o);return n}(t,a),o=!1),"font"===a&&t.math===p.ALWAYS&&(n=!0,e=t.math,t.math=p.PARENS_DIVISION);try{if(t.importantScope.push({}),i=this.value.eval(t),!this.variable&&"DetachedRuleset"===i.type)throw{message:"Rulesets cannot be evaluated on a property.",index:this.getIndex(),filename:this.fileInfo().filename};var r=this.important,s=t.importantScope.pop();return!r&&s.important&&(r=s.important),new m(a,i,r,this.merge,this.getIndex(),this.fileInfo(),this.inline,o)}catch(t){throw"number"!=typeof t.index&&(t.index=this.getIndex(),t.filename=this.fileInfo().filename),t}finally{n&&(t.math=e)}},m.prototype.makeImportant=function(){return new m(this.name,this.value,"!important",this.merge,this.getIndex(),this.fileInfo(),this.inline)},r.exports=m,u(r.exports)?r.exports:u(o)?o:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/declaration.js.map
