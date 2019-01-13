/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Expression=require("../tree/expression"),functionCaller=function(n,t,e,r){this.name=n.toLowerCase(),this.index=e,this.context=t,this.currentFileInfo=r,this.func=t.frames[0].functionRegistry.get(this.name)};functionCaller.prototype.isValid=function(){return Boolean(this.func)},functionCaller.prototype.call=function(n){return Array.isArray(n)&&(n=n.filter(function(n){return"Comment"!==n.type}).map(function(n){if("Expression"===n.type){var t=n.value.filter(function(n){return"Comment"!==n.type});return 1===t.length?t[0]:new Expression(t)}return n})),this.func.apply(this,n)},module.exports=functionCaller;
//# sourceMappingURL=../../sourcemaps/engine/functions/function-caller.js.map
