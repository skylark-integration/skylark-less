/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define([],function(){"use strict";var e={},r={exports:{}};function t(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var r;for(r in e)return!1;return!0}(e)}return r.exports={error:function(e){this._fireEvent("error",e)},warn:function(e){this._fireEvent("warn",e)},info:function(e){this._fireEvent("info",e)},debug:function(e){this._fireEvent("debug",e)},addListener:function(e){this._listeners.push(e)},removeListener:function(e){for(var r=0;r<this._listeners.length;r++)if(this._listeners[r]===e)return void this._listeners.splice(r,1)},_fireEvent:function(e,r){for(var t=0;t<this._listeners.length;t++){var n=this._listeners[t][e];n&&n(r)}},_listeners:[]},t(r.exports)?r.exports:t(e)?e:void 0});
//# sourceMappingURL=../sourcemaps/engine/logger.js.map
