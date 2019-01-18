/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node","./variable","./ruleset","./selector"],function(e,t,r,a){"use strict";var i={},s={exports:{}},n=t,o=r,l=a,u=function(e,t,r,a,i){this.value=e,this.lookups=t,this.important=r,this._index=a,this._fileInfo=i};function f(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var t;for(t in e)return!1;return!0}(e)}return(u.prototype=new e).type="NamespaceValue",u.prototype.eval=function(e){var t,r,a=this.value.eval(e);for(t=0;t<this.lookups.length;t++){if(r=this.lookups[t],Array.isArray(a)&&(a=new o([new l],a)),""===r)a=a.lastDeclaration();else if("@"===r.charAt(0)){if("@"===r.charAt(1)&&(r="@"+new n(r.substr(1)).eval(e).value),a.variables&&(a=a.variable(r)),!a)throw{type:"Name",message:"variable "+r+" not found",filename:this.fileInfo().filename,index:this.getIndex()}}else{if(r="$@"===r.substring(0,2)?"$"+new n(r.substr(1)).eval(e).value:"$"===r.charAt(0)?r:"$"+r,a.properties&&(a=a.property(r)),!a)throw{type:"Name",message:'property "'+r.substr(1)+'" not found',filename:this.fileInfo().filename,index:this.getIndex()};a=a[a.length-1]}a.value&&(a=a.eval(e).value),a.ruleset&&(a=a.ruleset.eval(e))}return a},s.exports=u,f(s.exports)?s.exports:f(i)?i:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/namespace-value.js.map
