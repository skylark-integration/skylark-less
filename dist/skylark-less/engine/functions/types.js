/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Keyword=require("../tree/keyword"),DetachedRuleset=require("../tree/detached-ruleset"),Dimension=require("../tree/dimension"),Color=require("../tree/color"),Quoted=require("../tree/quoted"),Anonymous=require("../tree/anonymous"),URL=require("../tree/url"),Operation=require("../tree/operation"),functionRegistry=require("./function-registry"),isa=function(e,n){return e instanceof n?Keyword.True:Keyword.False},isunit=function(e,n){if(void 0===n)throw{type:"Argument",message:"missing the required second argument to isunit."};if("string"!=typeof(n="string"==typeof n.value?n.value:n))throw{type:"Argument",message:"Second argument to isunit should be a unit or a string."};return e instanceof Dimension&&e.unit.is(n)?Keyword.True:Keyword.False};functionRegistry.addMultiple({isruleset:function(e){return isa(e,DetachedRuleset)},iscolor:function(e){return isa(e,Color)},isnumber:function(e){return isa(e,Dimension)},isstring:function(e){return isa(e,Quoted)},iskeyword:function(e){return isa(e,Keyword)},isurl:function(e){return isa(e,URL)},ispixel:function(e){return isunit(e,"px")},ispercentage:function(e){return isunit(e,"%")},isem:function(e){return isunit(e,"em")},isunit:isunit,unit:function(e,n){if(!(e instanceof Dimension))throw{type:"Argument",message:"the first argument to unit must be a number"+(e instanceof Operation?". Have you forgotten parenthesis?":"")};return n=n?n instanceof Keyword?n.value:n.toCSS():"",new Dimension(e.value,n)},"get-unit":function(e){return new Anonymous(e.unit)}});
//# sourceMappingURL=../../sourcemaps/engine/functions/types.js.map
