/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["../tree/quoted","../tree/url","../utils","./function-registry","../logger"],function(e,t,r,n,i){"use strict";var a={},o={exports:{}};function s(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var t;for(t in e)return!1;return!0}(e)}return o.exports=function(a){var o=e,s=t,u=r,c=function(e,t){return new s(t,e.index,e.currentFileInfo).eval(e.context)},f=i;n.add("data-uri",function(e,t){t||(t=e,e=null);var r=e&&e.value,n=t.value,i=this.currentFileInfo,d=i.rewriteUrls?i.currentDirectory:i.entryPath,l=n.indexOf("#"),h="";-1!==l&&(h=n.slice(l),n=n.slice(0,l));var v=u.clone(this.context);v.rawBuffer=!0;var x=a.getFileManager(n,d,v,a,!0);if(!x)return c(this,t);var p=!1;if(e)p=/;base64$/.test(r);else{if("image/svg+xml"===(r=a.mimeLookup(n)))p=!1;else{var g=a.charsetLookup(r);p=["US-ASCII","UTF-8"].indexOf(g)<0}p&&(r+=";base64")}var m=x.loadFileSync(n,d,v,a);if(!m.contents)return f.warn("Skipped data-uri embedding of "+n+" because file not found"),c(this,t||e);var I=m.contents;if(p&&!a.encodeBase64)return c(this,t);var b="data:"+r+","+(I=p?a.encodeBase64(I):encodeURIComponent(I))+h;return b.length>=32768&&!1!==this.context.ieCompat?(f.warn("Skipped data-uri embedding of "+n+" because its size ("+b.length+" characters) exceeds IE8-safe 32768 characters!"),c(this,t||e)):new s(new o('"'+b+'"',b,!1,this.index,this.currentFileInfo),this.index,this.currentFileInfo)})},s(o.exports)?o.exports:s(a)?a:void 0});
//# sourceMappingURL=../../sourcemaps/engine/functions/data-uri.js.map
