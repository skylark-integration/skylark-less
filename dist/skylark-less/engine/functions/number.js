/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["../tree/dimension","../tree/anonymous","./function-registry","./math-helper"],function(n,e,t,r){"use strict";var i={},u={},o=n,a=e,s=r,f=function(n,e){switch((e=Array.prototype.slice.call(e)).length){case 0:throw{type:"Argument",message:"one or more arguments required"}}var t,r,i,u,s,f,c,l,v=[],p={};for(t=0;t<e.length;t++)if((i=e[t])instanceof o)if(c=""!==(f=""===(u=""===i.unit.toString()&&void 0!==l?new o(i.value,l).unify():i.unify()).unit.toString()&&void 0!==c?c:u.unit.toString())&&void 0===c||""!==f&&""===v[0].unify().unit.toString()?f:c,l=""!==f&&void 0===l?i.unit.toString():l,void 0!==(r=void 0!==p[""]&&""!==f&&f===c?p[""]:p[f]))s=""===v[r].unit.toString()&&void 0!==l?new o(v[r].value,l).unify():v[r].unify(),(n&&u.value<s.value||!n&&u.value>s.value)&&(v[r]=i);else{if(void 0!==c&&f!==c)throw{type:"Argument",message:"incompatible types"};p[f]=v.length,v.push(i)}else Array.isArray(e[t].value)&&Array.prototype.push.apply(e,Array.prototype.slice.call(e[t].value));return 1==v.length?v[0]:(e=v.map(function(n){return n.toCSS(this.context)}).join(this.context.compress?",":", "),new a((n?"min":"max")+"("+e+")"))};function c(n){return"object"!=typeof n||Array.isArray(n)||!function(n){var e;for(e in n)return!1;return!0}(n)}return t.addMultiple({min:function(){return f(!0,arguments)},max:function(){return f(!1,arguments)},convert:function(n,e){return n.convertTo(e.value)},pi:function(){return new o(Math.PI)},mod:function(n,e){return new o(n.value%e.value,n.unit)},pow:function(n,e){if("number"==typeof n&&"number"==typeof e)n=new o(n),e=new o(e);else if(!(n instanceof o&&e instanceof o))throw{type:"Argument",message:"arguments must be numbers"};return new o(Math.pow(n.value,e.value),n.unit)},percentage:function(n){return s._math(function(n){return 100*n},"%",n)}}),c(u)?u:c(i)?i:void 0});
//# sourceMappingURL=../../sourcemaps/engine/functions/number.js.map
