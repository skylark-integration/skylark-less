/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define([],function(){"use strict";var e={},n={exports:{}},r=function(e,n,i){var t="";if(e.dumpLineNumbers&&!e.compress)switch(e.dumpLineNumbers){case"comments":t=r.asComment(n);break;case"mediaquery":t=r.asMediaQuery(n);break;case"all":t=r.asComment(n)+(i||"")+r.asMediaQuery(n)}return t};function i(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var n;for(n in e)return!1;return!0}(e)}return r.asComment=function(e){return"/* line "+e.debugInfo.lineNumber+", "+e.debugInfo.fileName+" */\n"},r.asMediaQuery=function(e){var n=e.debugInfo.fileName;return/^[a-z]+:\/\//i.test(n)||(n="file://"+n),"@media -sass-debug-info{filename{font-family:"+n.replace(/([.:\/\\])/g,function(e){return"\\"==e&&(e="/"),"\\"+e})+"}line{font-family:\\00003"+e.debugInfo.lineNumber+"}}\n"},n.exports=r,i(n.exports)?n.exports:i(e)?e:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/debug-info.js.map
