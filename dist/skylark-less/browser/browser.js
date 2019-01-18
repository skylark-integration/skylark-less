/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./utils"],function(e){"use strict";var t={},r={exports:{}},n=e;function i(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var t;for(t in e)return!1;return!0}(e)}return r.exports={createCSS:function(e,t,r){var i=r.href||"",s="less:"+(r.title||n.extractId(i)),l=e.getElementById(s),a=!1,d=e.createElement("style");d.setAttribute("type","text/css"),r.media&&d.setAttribute("media",r.media),d.id=s,d.styleSheet||(d.appendChild(e.createTextNode(t)),a=null!==l&&l.childNodes.length>0&&d.childNodes.length>0&&l.firstChild.nodeValue===d.firstChild.nodeValue);var o=e.getElementsByTagName("head")[0];if(null===l||!1===a){var c=r&&r.nextSibling||null;c?c.parentNode.insertBefore(d,c):o.appendChild(d)}if(l&&!1===a&&l.parentNode.removeChild(l),d.styleSheet)try{d.styleSheet.cssText=t}catch(e){throw new Error("Couldn't reassign styleSheet.cssText.")}},currentScript:function(e){var t,r=e.document;return r.currentScript||(t=r.getElementsByTagName("script"))[t.length-1]}},i(r.exports)?r.exports:i(t)?t:void 0});
//# sourceMappingURL=../sourcemaps/browser/browser.js.map
