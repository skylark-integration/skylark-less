/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Color=require("../tree/color"),functionRegistry=require("./function-registry");function colorBlend(n,o,r){var e,t,l,u,c=o.alpha,i=r.alpha,a=[];l=i+c*(1-i);for(var d=0;d<3;d++)u=n(e=o.rgb[d]/255,t=r.rgb[d]/255),l&&(u=(i*t+c*(e-i*(e+t-u)))/l),a[d]=255*u;return new Color(a,l)}var colorBlendModeFunctions={multiply:function(n,o){return n*o},screen:function(n,o){return n+o-n*o},overlay:function(n,o){return(n*=2)<=1?colorBlendModeFunctions.multiply(n,o):colorBlendModeFunctions.screen(n-1,o)},softlight:function(n,o){var r=1,e=n;return o>.5&&(e=1,r=n>.25?Math.sqrt(n):((16*n-12)*n+4)*n),n-(1-2*o)*e*(r-n)},hardlight:function(n,o){return colorBlendModeFunctions.overlay(o,n)},difference:function(n,o){return Math.abs(n-o)},exclusion:function(n,o){return n+o-2*n*o},average:function(n,o){return(n+o)/2},negation:function(n,o){return 1-Math.abs(n+o-1)}};for(var f in colorBlendModeFunctions)colorBlendModeFunctions.hasOwnProperty(f)&&(colorBlend[f]=colorBlend.bind(null,colorBlendModeFunctions[f]));functionRegistry.addMultiple(colorBlend);
//# sourceMappingURL=../../sourcemaps/engine/functions/color-blending.js.map
