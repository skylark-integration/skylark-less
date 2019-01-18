/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node","./variable","./ruleset","./detached-ruleset","../less-error"],function(e,r,t,a,i){"use strict";var l={},n={exports:{}},o=r,s=t,u=a,f=i,v=function(e,r,t){this.variable=e,this._index=r,this._fileInfo=t,this.allowRoot=!0};function h(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var r;for(r in e)return!1;return!0}(e)}return(v.prototype=new e).type="VariableCall",v.prototype.eval=function(e){var r,t=new o(this.variable,this.getIndex(),this.fileInfo()).eval(e),a=new f({message:"Could not evaluate variable call "+this.variable});if(!t.ruleset){if(t.rules)r=t;else if(Array.isArray(t))r=new s("",t);else{if(!Array.isArray(t.value))throw a;r=new s("",t.value)}t=new u(r)}if(t.ruleset)return t.callEval(e);throw a},n.exports=v,h(n.exports)?n.exports:h(l)?l:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/variable-call.js.map
