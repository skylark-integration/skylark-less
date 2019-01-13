/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Dimension=require("../tree/dimension"),MathHelper=function(){};MathHelper._math=function(e,n,t){if(!(t instanceof Dimension))throw{type:"Argument",message:"argument must be a number"};return null==n?n=t.unit:t=t.unify(),new Dimension(e(parseFloat(t.value)),n)},module.exports=MathHelper;
//# sourceMappingURL=../../sourcemaps/engine/functions/math-helper.js.map
