/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var PromiseConstructor,utils=require("./utils");module.exports=function(t,o,r){var i=function(t,r,n){if("function"==typeof r?(n=r,r=utils.copyOptions(this.options,{})):r=utils.copyOptions(this.options,r||{}),!n){PromiseConstructor||(PromiseConstructor="undefined"==typeof Promise?require("promise"):Promise);var s=this;return new PromiseConstructor(function(o,n){i.call(s,t,r,function(t,r){t?n(t):o(r)})})}this.parse(t,r,function(t,r,i,s){if(t)return n(t);var e;try{e=new o(r,i).toCSS(s)}catch(t){return n(t)}n(null,e)})};return i};
//# sourceMappingURL=../sourcemaps/engine/render.js.map
