/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["../tree/color","./function-registry"],function(r,n){"use strict";var t={},e={},u=r,i=n;function o(r,n,t){var e,i,o,a,f=n.alpha,c=t.alpha,l=[];o=c+f*(1-c);for(var s=0;s<3;s++)a=r(e=n.rgb[s]/255,i=t.rgb[s]/255),o&&(a=(c*i+f*(e-c*(e+i-a)))/o),l[s]=255*a;return new u(l,o)}var a={multiply:function(r,n){return r*n},screen:function(r,n){return r+n-r*n},overlay:function(r,n){return(r*=2)<=1?a.multiply(r,n):a.screen(r-1,n)},softlight:function(r,n){var t=1,e=r;return n>.5&&(e=1,t=r>.25?Math.sqrt(r):((16*r-12)*r+4)*r),r-(1-2*n)*e*(t-r)},hardlight:function(r,n){return a.overlay(n,r)},difference:function(r,n){return Math.abs(r-n)},exclusion:function(r,n){return r+n-2*r*n},average:function(r,n){return(r+n)/2},negation:function(r,n){return 1-Math.abs(r+n-1)}};for(var f in a)a.hasOwnProperty(f)&&(o[f]=o.bind(null,a[f]));function c(r){return"object"!=typeof r||Array.isArray(r)||!function(r){var n;for(n in r)return!1;return!0}(r)}return i.addMultiple(o),c(e)?e:c(t)?t:void 0});
//# sourceMappingURL=../../sourcemaps/engine/functions/color-blending.js.map
