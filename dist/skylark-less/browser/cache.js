/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define([],function(){"use strict";var t={},e={exports:{}};function r(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var e;for(e in t)return!1;return!0}(t)}return e.exports=function(t,e,r){var n=null;if("development"!==e.env)try{n=void 0===t.localStorage?null:t.localStorage}catch(t){}return{setCSS:function(t,e,o,a){if(n){r.info("saving "+t+" to cache.");try{n.setItem(t,a),n.setItem(t+":timestamp",e),o&&n.setItem(t+":vars",JSON.stringify(o))}catch(e){r.error('failed to save "'+t+'" to local storage for caching.')}}},getCSS:function(t,e,r){var o=n&&n.getItem(t),a=n&&n.getItem(t+":timestamp"),i=n&&n.getItem(t+":vars");if(r=r||{},i=i||"{}",a&&e.lastModified&&new Date(e.lastModified).valueOf()===new Date(a).valueOf()&&JSON.stringify(r)===i)return o}}},r(e.exports)?e.exports:r(t)?t:void 0});
//# sourceMappingURL=../sourcemaps/browser/cache.js.map
