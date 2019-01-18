/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define([],function(){"use strict";var r={},e={exports:{}};function t(r){return"object"!=typeof r||Array.isArray(r)||!function(r){var e;for(e in r)return!1;return!0}(r)}return e.exports={extractId:function(r){return r.replace(/^[a-z-]+:\/+?[^\/]+/,"").replace(/[\?\&]livereload=\w+/,"").replace(/^\//,"").replace(/\.[a-zA-Z]+$/,"").replace(/[^\.\w-]+/g,"-").replace(/\./g,":")},addDataAttr:function(r,e){for(var t in e.dataset)if(e.dataset.hasOwnProperty(t))if("env"===t||"dumpLineNumbers"===t||"rootpath"===t||"errorReporting"===t)r[t]=e.dataset[t];else try{r[t]=JSON.parse(e.dataset[t])}catch(r){}}},t(e.exports)?e.exports:t(r)?r:void 0});
//# sourceMappingURL=../sourcemaps/browser/utils.js.map
