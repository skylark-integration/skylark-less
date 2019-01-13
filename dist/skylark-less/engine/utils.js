/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Constants=require("./constants"),clone=require("clone"),utils={getLocation:function(t,r){for(var e=t+1,a=null,n=-1;--e>=0&&"\n"!==r.charAt(e);)n++;return"number"==typeof t&&(a=(r.slice(0,t).match(/\n/g)||"").length),{line:a,column:n}},copyArray:function(t){var r,e=t.length,a=new Array(e);for(r=0;r<e;r++)a[r]=t[r];return a},clone:function(t){var r={};for(var e in t)t.hasOwnProperty(e)&&(r[e]=t[e]);return r},copyOptions:function(t,r){if(r&&r._defaults)return r;var e=utils.defaults(t,r);if(e.strictMath&&(e.math=Constants.Math.STRICT_LEGACY),e.relativeUrls&&(e.rewriteUrls=Constants.RewriteUrls.ALL),"string"==typeof e.math)switch(e.math.toLowerCase()){case"always":e.math=Constants.Math.ALWAYS;break;case"parens-division":e.math=Constants.Math.PARENS_DIVISION;break;case"strict":case"parens":e.math=Constants.Math.PARENS;break;case"strict-legacy":e.math=Constants.Math.STRICT_LEGACY}if("string"==typeof e.rewriteUrls)switch(e.rewriteUrls.toLowerCase()){case"off":e.rewriteUrls=Constants.RewriteUrls.OFF;break;case"local":e.rewriteUrls=Constants.RewriteUrls.LOCAL;break;case"all":e.rewriteUrls=Constants.RewriteUrls.ALL}return e},defaults:function(t,r){var e=r||{};if(!r._defaults){e={};var a=clone(t);e._defaults=a;var n=r?clone(r):{};Object.assign(e,a,n)}return e},merge:function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e]);return t},flattenArray:function(t,r){r=r||[];for(var e=0,a=t.length;e<a;e++){var n=t[e];Array.isArray(n)?utils.flattenArray(n,r):void 0!==n&&r.push(n)}return r}};module.exports=utils;
//# sourceMappingURL=../sourcemaps/engine/utils.js.map
