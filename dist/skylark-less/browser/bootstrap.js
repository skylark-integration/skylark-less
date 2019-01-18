/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["promise/polyfill","../engine/default-options","./add-default-options","./index"],function(e,n,t,o){"use strict";var s={},i={exports:{}},d=n();if(window.less)for(var r in window.less)window.less.hasOwnProperty(r)&&(d[r]=window.less[r]);t(window,d),d.plugins=d.plugins||[],window.LESS_PLUGINS&&(d.plugins=d.plugins.concat(window.LESS_PLUGINS));var a,l,w,p=i.exports=o(window,d);function c(e){e.filename&&console.warn(e),d.async||l.removeChild(w)}function u(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var n;for(n in e)return!1;return!0}(e)}return window.less=p,d.onReady&&(/!watch/.test(window.location.hash)&&p.watch(),d.async||(a="body { display: none !important }",l=document.head||document.getElementsByTagName("head")[0],(w=document.createElement("style")).type="text/css",w.styleSheet?w.styleSheet.cssText=a:w.appendChild(document.createTextNode(a)),l.appendChild(w)),p.registerStylesheetsImmediately(),p.pageLoadFinished=p.refresh("development"===p.env).then(c,c)),u(i.exports)?i.exports:u(s)?s:void 0});
//# sourceMappingURL=../sourcemaps/browser/bootstrap.js.map
