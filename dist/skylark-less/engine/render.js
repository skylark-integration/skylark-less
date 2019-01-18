/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./utils"],function(t){"use strict";var n,r={},o={exports:{}},i=t;function e(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var n;for(n in t)return!1;return!0}(t)}return o.exports=function(t,r,o){var e=function(t,o,u){if("function"==typeof o?(u=o,o=i.copyOptions(this.options,{})):o=i.copyOptions(this.options,o||{}),!u){n||(n=Promise);var s=this;return new n(function(n,r){e.call(s,t,o,function(t,o){t?r(t):n(o)})})}this.parse(t,o,function(t,n,o,i){if(t)return u(t);var e;try{e=new r(n,o).toCSS(i)}catch(t){return u(t)}u(null,e)})};return e},e(o.exports)?o.exports:e(r)?r:void 0});
//# sourceMappingURL=../sourcemaps/engine/render.js.map
