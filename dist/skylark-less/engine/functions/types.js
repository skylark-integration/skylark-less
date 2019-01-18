/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["../tree/keyword","../tree/detached-ruleset","../tree/dimension","../tree/color","../tree/quoted","../tree/anonymous","../tree/url","../tree/operation","./function-registry"],function(e,t,n,r,u,i,o,s,f){"use strict";var a={},c={},g=e,m=t,l=n,d=r,y=u,p=i,v=o,h=s,w=function(e,t){return e instanceof t?g.True:g.False},b=function(e,t){if(void 0===t)throw{type:"Argument",message:"missing the required second argument to isunit."};if("string"!=typeof(t="string"==typeof t.value?t.value:t))throw{type:"Argument",message:"Second argument to isunit should be a unit or a string."};return e instanceof l&&e.unit.is(t)?g.True:g.False};function A(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var t;for(t in e)return!1;return!0}(e)}return f.addMultiple({isruleset:function(e){return w(e,m)},iscolor:function(e){return w(e,d)},isnumber:function(e){return w(e,l)},isstring:function(e){return w(e,y)},iskeyword:function(e){return w(e,g)},isurl:function(e){return w(e,v)},ispixel:function(e){return b(e,"px")},ispercentage:function(e){return b(e,"%")},isem:function(e){return b(e,"em")},isunit:b,unit:function(e,t){if(!(e instanceof l))throw{type:"Argument",message:"the first argument to unit must be a number"+(e instanceof h?". Have you forgotten parenthesis?":"")};return t=t?t instanceof g?t.value:t.toCSS():"",new l(e.value,t)},"get-unit":function(e){return new p(e.unit)}}),A(c)?c:A(a)?a:void 0});
//# sourceMappingURL=../../sourcemaps/engine/functions/types.js.map
