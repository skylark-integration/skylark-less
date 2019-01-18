/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["../engine/environment/abstract-plugin-loader"],function(n){"use strict";var r={},t={exports:{}},e=function(n){this.less=n};function o(n){return"object"!=typeof n||Array.isArray(n)||!function(n){var r;for(r in n)return!1;return!0}(n)}return(e.prototype=new n).loadPlugin=function(n,r,t,e,o){return new Promise(function(i,u){o.loadFile(n,r,t,e).then(i).catch(u)})},t.exports=e,o(t.exports)?t.exports:o(r)?r:void 0});
//# sourceMappingURL=../sourcemaps/browser/plugin-loader.js.map
