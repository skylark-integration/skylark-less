/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Selector=require("./selector"),Element=require("./element"),Ruleset=require("./ruleset"),Declaration=require("./declaration"),DetachedRuleset=require("./detached-ruleset"),Expression=require("./expression"),contexts=require("../contexts"),utils=require("../utils"),Definition=function(e,t,i,n,r,a,s){this.name=e||"anonymous mixin",this.selectors=[new Selector([new Element(null,e,!1,this._index,this._fileInfo)])],this.params=t,this.condition=n,this.variadic=r,this.arity=t.length,this.rules=i,this._lookups={};var o=[];this.required=t.reduce(function(e,t){return!t.name||t.name&&!t.value?e+1:(o.push(t.name),e)},0),this.optionalParameters=o,this.frames=a,this.copyVisibilityInfo(s),this.allowRoot=!0};Definition.prototype=new Ruleset,Definition.prototype.type="MixinDefinition",Definition.prototype.evalFirst=!0,Definition.prototype.accept=function(e){this.params&&this.params.length&&(this.params=e.visitArray(this.params)),this.rules=e.visitArray(this.rules),this.condition&&(this.condition=e.visit(this.condition))},Definition.prototype.evalParams=function(e,t,i,n){var r,a,s,o,l,u,h,f,m=new Ruleset(null,null),c=utils.copyArray(this.params),p=0;if(t.frames&&t.frames[0]&&t.frames[0].functionRegistry&&(m.functionRegistry=t.frames[0].functionRegistry.inherit()),t=new contexts.Eval(t,[m].concat(t.frames)),i)for(p=(i=utils.copyArray(i)).length,s=0;s<p;s++)if(u=(a=i[s])&&a.name){for(h=!1,o=0;o<c.length;o++)if(!n[o]&&u===c[o].name){n[o]=a.value.eval(e),m.prependRule(new Declaration(u,a.value.eval(e))),h=!0;break}if(h){i.splice(s,1),s--;continue}throw{type:"Runtime",message:"Named argument for "+this.name+" "+i[s].name+" not found"}}for(f=0,s=0;s<c.length;s++)if(!n[s]){if(a=i&&i[f],u=c[s].name)if(c[s].variadic){for(r=[],o=f;o<p;o++)r.push(i[o].value.eval(e));m.prependRule(new Declaration(u,new Expression(r).eval(e)))}else{if(l=a&&a.value)l=Array.isArray(l)?new DetachedRuleset(new Ruleset("",l)):l.eval(e);else{if(!c[s].value)throw{type:"Runtime",message:"wrong number of arguments for "+this.name+" ("+p+" for "+this.arity+")"};l=c[s].value.eval(t),m.resetCache()}m.prependRule(new Declaration(u,l)),n[s]=l}if(c[s].variadic&&i)for(o=f;o<p;o++)n[o]=i[o].value.eval(e);f++}return m},Definition.prototype.makeImportant=function(){var e=this.rules?this.rules.map(function(e){return e.makeImportant?e.makeImportant(!0):e}):this.rules;return new Definition(this.name,this.params,e,this.condition,this.variadic,this.frames)},Definition.prototype.eval=function(e){return new Definition(this.name,this.params,this.rules,this.condition,this.variadic,this.frames||utils.copyArray(e.frames))},Definition.prototype.evalCall=function(e,t,i){var n,r,a=[],s=this.frames?this.frames.concat(e.frames):e.frames,o=this.evalParams(e,new contexts.Eval(e,s),t,a);return o.prependRule(new Declaration("@arguments",new Expression(a).eval(e))),n=utils.copyArray(this.rules),(r=new Ruleset(null,n)).originalRuleset=this,r=r.eval(new contexts.Eval(e,[this,o].concat(s))),i&&(r=r.makeImportant()),r},Definition.prototype.matchCondition=function(e,t){return!(this.condition&&!this.condition.eval(new contexts.Eval(t,[this.evalParams(t,new contexts.Eval(t,this.frames?this.frames.concat(t.frames):t.frames),e,[])].concat(this.frames||[]).concat(t.frames))))},Definition.prototype.matchArgs=function(e,t){var i,n=e&&e.length||0,r=this.optionalParameters,a=e?e.reduce(function(e,t){return r.indexOf(t.name)<0?e+1:e},0):0;if(this.variadic){if(a<this.required-1)return!1}else{if(a<this.required)return!1;if(n>this.params.length)return!1}i=Math.min(a,this.arity);for(var s=0;s<i;s++)if(!this.params[s].name&&!this.params[s].variadic&&e[s].value.eval(t).toCSS()!=this.params[s].value.eval(t).toCSS())return!1;return!0},module.exports=Definition;
//# sourceMappingURL=../../sourcemaps/engine/tree/mixin-definition.js.map