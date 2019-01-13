/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var colorFunctions,Dimension=require("../tree/dimension"),Color=require("../tree/color"),Quoted=require("../tree/quoted"),Anonymous=require("../tree/anonymous"),functionRegistry=require("./function-registry");function clamp(n){return Math.min(1,Math.max(0,n))}function hsla(n,r){var e=colorFunctions.hsla(r.h,r.s,r.l,r.a);if(e)return n.value&&/^(rgb|hsl)/.test(n.value)?e.value=n.value:e.value="rgb",e}function number(n){if(n instanceof Dimension)return parseFloat(n.unit.is("%")?n.value/100:n.value);if("number"==typeof n)return n;throw{type:"Argument",message:"color functions take numbers as parameters"}}function scaled(n,r){return n instanceof Dimension&&n.unit.is("%")?parseFloat(n.value*r/100):number(n)}colorFunctions={rgb:function(n,r,e){var o=colorFunctions.rgba(n,r,e,1);if(o)return o.value="rgb",o},rgba:function(n,r,e,o){try{if(n instanceof Color)return o=r?number(r):n.alpha,new Color(n.rgb,o,"rgba");var t=[n,r,e].map(function(n){return scaled(n,255)});return o=number(o),new Color(t,o,"rgba")}catch(n){}},hsl:function(n,r,e){var o=colorFunctions.hsla(n,r,e,1);if(o)return o.value="hsl",o},hsla:function(n,r,e,o){try{if(n instanceof Color)return o=r?number(r):n.alpha,new Color(n.rgb,o,"hsla");var t,u;function a(n){return 6*(n=n<0?n+1:n>1?n-1:n)<1?t+(u-t)*n*6:2*n<1?u:3*n<2?t+(u-t)*(2/3-n)*6:t}n=number(n)%360/360,r=clamp(number(r)),e=clamp(number(e)),o=clamp(number(o)),t=2*e-(u=e<=.5?e*(r+1):e+r-e*r);var i=[255*a(n+1/3),255*a(n),255*a(n-1/3)];return o=number(o),new Color(i,o,"hsla")}catch(n){}},hsv:function(n,r,e){return colorFunctions.hsva(n,r,e,1)},hsva:function(n,r,e,o){var t,u;n=number(n)%360/360*360,r=number(r),e=number(e),o=number(o);var a=[e,e*(1-r),e*(1-(u=n/60-(t=Math.floor(n/60%6)))*r),e*(1-(1-u)*r)],i=[[0,3,1],[2,0,1],[1,0,3],[1,2,0],[3,1,0],[0,1,2]];return colorFunctions.rgba(255*a[i[t][0]],255*a[i[t][1]],255*a[i[t][2]],o)},hue:function(n){return new Dimension(n.toHSL().h)},saturation:function(n){return new Dimension(100*n.toHSL().s,"%")},lightness:function(n){return new Dimension(100*n.toHSL().l,"%")},hsvhue:function(n){return new Dimension(n.toHSV().h)},hsvsaturation:function(n){return new Dimension(100*n.toHSV().s,"%")},hsvvalue:function(n){return new Dimension(100*n.toHSV().v,"%")},red:function(n){return new Dimension(n.rgb[0])},green:function(n){return new Dimension(n.rgb[1])},blue:function(n){return new Dimension(n.rgb[2])},alpha:function(n){return new Dimension(n.toHSL().a)},luma:function(n){return new Dimension(n.luma()*n.alpha*100,"%")},luminance:function(n){var r=.2126*n.rgb[0]/255+.7152*n.rgb[1]/255+.0722*n.rgb[2]/255;return new Dimension(r*n.alpha*100,"%")},saturate:function(n,r,e){if(!n.rgb)return null;var o=n.toHSL();return void 0!==e&&"relative"===e.value?o.s+=o.s*r.value/100:o.s+=r.value/100,o.s=clamp(o.s),hsla(n,o)},desaturate:function(n,r,e){var o=n.toHSL();return void 0!==e&&"relative"===e.value?o.s-=o.s*r.value/100:o.s-=r.value/100,o.s=clamp(o.s),hsla(n,o)},lighten:function(n,r,e){var o=n.toHSL();return void 0!==e&&"relative"===e.value?o.l+=o.l*r.value/100:o.l+=r.value/100,o.l=clamp(o.l),hsla(n,o)},darken:function(n,r,e){var o=n.toHSL();return void 0!==e&&"relative"===e.value?o.l-=o.l*r.value/100:o.l-=r.value/100,o.l=clamp(o.l),hsla(n,o)},fadein:function(n,r,e){var o=n.toHSL();return void 0!==e&&"relative"===e.value?o.a+=o.a*r.value/100:o.a+=r.value/100,o.a=clamp(o.a),hsla(n,o)},fadeout:function(n,r,e){var o=n.toHSL();return void 0!==e&&"relative"===e.value?o.a-=o.a*r.value/100:o.a-=r.value/100,o.a=clamp(o.a),hsla(n,o)},fade:function(n,r){var e=n.toHSL();return e.a=r.value/100,e.a=clamp(e.a),hsla(n,e)},spin:function(n,r){var e=n.toHSL(),o=(e.h+r.value)%360;return e.h=o<0?360+o:o,hsla(n,e)},mix:function(n,r,e){n.toHSL&&r.toHSL||(console.log(r.type),console.dir(r)),e||(e=new Dimension(50));var o=e.value/100,t=2*o-1,u=n.toHSL().a-r.toHSL().a,a=((t*u==-1?t:(t+u)/(1+t*u))+1)/2,i=1-a,l=[n.rgb[0]*a+r.rgb[0]*i,n.rgb[1]*a+r.rgb[1]*i,n.rgb[2]*a+r.rgb[2]*i],s=n.alpha*o+r.alpha*(1-o);return new Color(l,s)},greyscale:function(n){return colorFunctions.desaturate(n,new Dimension(100))},contrast:function(n,r,e,o){if(!n.rgb)return null;if(void 0===e&&(e=colorFunctions.rgba(255,255,255,1)),void 0===r&&(r=colorFunctions.rgba(0,0,0,1)),r.luma()>e.luma()){var t=e;e=r,r=t}return o=void 0===o?.43:number(o),n.luma()<o?e:r},argb:function(n){return new Anonymous(n.toARGB())},color:function(n){if(n instanceof Quoted&&/^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4})$/i.test(n.value)){var r=n.value.slice(1);return new Color(r,void 0,"#"+r)}if(n instanceof Color||(n=Color.fromKeyword(n.value)))return n.value=void 0,n;throw{type:"Argument",message:"argument must be a color keyword or 3|4|6|8 digit hex e.g. #FFF"}},tint:function(n,r){return colorFunctions.mix(colorFunctions.rgb(255,255,255),n,r)},shade:function(n,r){return colorFunctions.mix(colorFunctions.rgb(0,0,0),n,r)}},functionRegistry.addMultiple(colorFunctions);
//# sourceMappingURL=../../sourcemaps/engine/functions/color.js.map