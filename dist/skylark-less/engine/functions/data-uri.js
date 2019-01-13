/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
module.exports=function(e){var r=require("../tree/quoted"),t=require("../tree/url"),i=require("../utils"),n=require("./function-registry"),a=function(e,r){return new t(r,e.index,e.currentFileInfo).eval(e.context)},s=require("../logger");n.add("data-uri",function(n,u){u||(u=n,n=null);var o=n&&n.value,c=u.value,l=this.currentFileInfo,d=l.rewriteUrls?l.currentDirectory:l.entryPath,f=c.indexOf("#"),h="";-1!==f&&(h=c.slice(f),c=c.slice(0,f));var v=i.clone(this.context);v.rawBuffer=!0;var g=e.getFileManager(c,d,v,e,!0);if(!g)return a(this,u);var x=!1;if(n)x=/;base64$/.test(o);else{if("image/svg+xml"===(o=e.mimeLookup(c)))x=!1;else{var m=e.charsetLookup(o);x=["US-ASCII","UTF-8"].indexOf(m)<0}x&&(o+=";base64")}var p=g.loadFileSync(c,d,v,e);if(!p.contents)return s.warn("Skipped data-uri embedding of "+c+" because file not found"),a(this,u||n);var I=p.contents;if(x&&!e.encodeBase64)return a(this,u);var w="data:"+o+","+(I=x?e.encodeBase64(I):encodeURIComponent(I))+h;return w.length>=32768&&!1!==this.context.ieCompat?(s.warn("Skipped data-uri embedding of "+c+" because its size ("+w.length+" characters) exceeds IE8-safe 32768 characters!"),a(this,u||n)):new t(new r('"'+w+'"',w,!1,this.index,this.currentFileInfo),this.index,this.currentFileInfo)})};
//# sourceMappingURL=../../sourcemaps/engine/functions/data-uri.js.map
