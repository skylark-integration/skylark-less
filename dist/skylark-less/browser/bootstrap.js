/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
require("promise/polyfill");var options=require("../engine/default-options")();if(window.less)for(var key in window.less)window.less.hasOwnProperty(key)&&(options[key]=window.less[key]);require("./add-default-options")(window,options),options.plugins=options.plugins||[],window.LESS_PLUGINS&&(options.plugins=options.plugins.concat(window.LESS_PLUGINS));var css,head,style,less=module.exports=require("./index")(window,options);function resolveOrReject(e){e.filename&&console.warn(e),options.async||head.removeChild(style)}window.less=less,options.onReady&&(/!watch/.test(window.location.hash)&&less.watch(),options.async||(css="body { display: none !important }",head=document.head||document.getElementsByTagName("head")[0],(style=document.createElement("style")).type="text/css",style.styleSheet?style.styleSheet.cssText=css:style.appendChild(document.createTextNode(css)),head.appendChild(style)),less.registerStylesheetsImmediately(),less.pageLoadFinished=less.refresh("development"===less.env).then(resolveOrReject,resolveOrReject));
//# sourceMappingURL=../sourcemaps/browser/bootstrap.js.map
