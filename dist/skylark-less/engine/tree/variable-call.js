/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Variable=require("./variable"),Ruleset=require("./ruleset"),DetachedRuleset=require("./detached-ruleset"),LessError=require("../less-error"),VariableCall=function(e,r,l){this.variable=e,this._index=r,this._fileInfo=l,this.allowRoot=!0};VariableCall.prototype=new Node,VariableCall.prototype.type="VariableCall",VariableCall.prototype.eval=function(e){var r,l=new Variable(this.variable,this.getIndex(),this.fileInfo()).eval(e),a=new LessError({message:"Could not evaluate variable call "+this.variable});if(!l.ruleset){if(l.rules)r=l;else if(Array.isArray(l))r=new Ruleset("",l);else{if(!Array.isArray(l.value))throw a;r=new Ruleset("",l.value)}l=new DetachedRuleset(r)}if(l.ruleset)return l.callEval(e);throw a},module.exports=VariableCall;
//# sourceMappingURL=../../sourcemaps/engine/tree/variable-call.js.map
