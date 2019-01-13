/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Ruleset=require("./ruleset"),Value=require("./value"),Selector=require("./selector"),Anonymous=require("./anonymous"),Expression=require("./expression"),AtRule=require("./atrule"),utils=require("../utils"),Media=function(e,t,i,s,r){this._index=i,this._fileInfo=s;var n=new Selector([],null,null,this._index,this._fileInfo).createEmptySelectors();this.features=new Value(t),this.rules=[new Ruleset(n,e)],this.rules[0].allowImports=!0,this.copyVisibilityInfo(r),this.allowRoot=!0,this.setParent(n,this),this.setParent(this.features,this),this.setParent(this.rules,this)};Media.prototype=new AtRule,Media.prototype.type="Media",Media.prototype.isRulesetLike=function(){return!0},Media.prototype.accept=function(e){this.features&&(this.features=e.visit(this.features)),this.rules&&(this.rules=e.visitArray(this.rules))},Media.prototype.genCSS=function(e,t){t.add("@media ",this._fileInfo,this._index),this.features.genCSS(e,t),this.outputRuleset(e,t,this.rules)},Media.prototype.eval=function(e){e.mediaBlocks||(e.mediaBlocks=[],e.mediaPath=[]);var t=new Media(null,[],this._index,this._fileInfo,this.visibilityInfo());return this.debugInfo&&(this.rules[0].debugInfo=this.debugInfo,t.debugInfo=this.debugInfo),t.features=this.features.eval(e),e.mediaPath.push(t),e.mediaBlocks.push(t),this.rules[0].functionRegistry=e.frames[0].functionRegistry.inherit(),e.frames.unshift(this.rules[0]),t.rules=[this.rules[0].eval(e)],e.frames.shift(),e.mediaPath.pop(),0===e.mediaPath.length?t.evalTop(e):t.evalNested(e)},Media.prototype.evalTop=function(e){var t=this;if(e.mediaBlocks.length>1){var i=new Selector([],null,null,this.getIndex(),this.fileInfo()).createEmptySelectors();(t=new Ruleset(i,e.mediaBlocks)).multiMedia=!0,t.copyVisibilityInfo(this.visibilityInfo()),this.setParent(t,this)}return delete e.mediaBlocks,delete e.mediaPath,t},Media.prototype.evalNested=function(e){var t,i,s=e.mediaPath.concat([this]);for(t=0;t<s.length;t++)i=s[t].features instanceof Value?s[t].features.value:s[t].features,s[t]=Array.isArray(i)?i:[i];return this.features=new Value(this.permute(s).map(function(e){for(e=e.map(function(e){return e.toCSS?e:new Anonymous(e)}),t=e.length-1;t>0;t--)e.splice(t,0,new Anonymous("and"));return new Expression(e)})),this.setParent(this.features,this),new Ruleset([],[])},Media.prototype.permute=function(e){if(0===e.length)return[];if(1===e.length)return e[0];for(var t=[],i=this.permute(e.slice(1)),s=0;s<i.length;s++)for(var r=0;r<e[0].length;r++)t.push([e[0][r]].concat(i[s]));return t},Media.prototype.bubbleSelectors=function(e){e&&(this.rules=[new Ruleset(utils.copyArray(e),[this.rules[0]])],this.setParent(this.rules,this))},module.exports=Media;
//# sourceMappingURL=../../sourcemaps/engine/tree/media.js.map