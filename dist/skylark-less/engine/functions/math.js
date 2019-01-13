/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var functionRegistry=require("./function-registry"),mathHelper=require("./math-helper.js"),mathFunctions={ceil:null,floor:null,sqrt:null,abs:null,tan:"",sin:"",cos:"",atan:"rad",asin:"rad",acos:"rad"};for(var f in mathFunctions)mathFunctions.hasOwnProperty(f)&&(mathFunctions[f]=mathHelper._math.bind(null,Math[f],mathFunctions[f]));mathFunctions.round=function(n,t){var a=void 0===t?0:t.value;return mathHelper._math(function(n){return n.toFixed(a)},null,n)},functionRegistry.addMultiple(mathFunctions);
//# sourceMappingURL=../../sourcemaps/engine/functions/math.js.map
