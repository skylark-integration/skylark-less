/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define([],function(){"use strict";var t={},n={exports:{}};function r(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var n;for(n in t)return!1;return!0}(t)}return n.exports=function t(n){return{_data:{},add:function(t,n){t=t.toLowerCase(),this._data.hasOwnProperty(t),this._data[t]=n},addMultiple:function(t){Object.keys(t).forEach(function(n){this.add(n,t[n])}.bind(this))},get:function(t){return this._data[t]||n&&n.get(t)},getLocalFunctions:function(){return this._data},inherit:function(){return t(this)},create:function(n){return t(n)}}}(null),r(n.exports)?n.exports:r(t)?t:void 0});
//# sourceMappingURL=../../sourcemaps/engine/functions/function-registry.js.map
