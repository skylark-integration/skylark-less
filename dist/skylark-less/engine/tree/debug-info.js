/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var debugInfo=function(e,n,u){var a="";if(e.dumpLineNumbers&&!e.compress)switch(e.dumpLineNumbers){case"comments":a=debugInfo.asComment(n);break;case"mediaquery":a=debugInfo.asMediaQuery(n);break;case"all":a=debugInfo.asComment(n)+(u||"")+debugInfo.asMediaQuery(n)}return a};debugInfo.asComment=function(e){return"/* line "+e.debugInfo.lineNumber+", "+e.debugInfo.fileName+" */\n"},debugInfo.asMediaQuery=function(e){var n=e.debugInfo.fileName;return/^[a-z]+:\/\//i.test(n)||(n="file://"+n),"@media -sass-debug-info{filename{font-family:"+n.replace(/([.:\/\\])/g,function(e){return"\\"==e&&(e="/"),"\\"+e})+"}line{font-family:\\00003"+e.debugInfo.lineNumber+"}}\n"},module.exports=debugInfo;
//# sourceMappingURL=../../sourcemaps/engine/tree/debug-info.js.map
