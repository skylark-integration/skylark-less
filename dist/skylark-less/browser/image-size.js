/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./../engine/functions/function-registry"],function(n){"use strict";var e={},r={exports:{}};function t(n){return"object"!=typeof n||Array.isArray(n)||!function(n){var e;for(e in n)return!1;return!0}(n)}return r.exports=function(){function e(){throw{type:"Runtime",message:"Image size functions are not supported in browser version of less"}}var r={"image-size":function(n){return e(),-1},"image-width":function(n){return e(),-1},"image-height":function(n){return e(),-1}};n.addMultiple(r)},t(r.exports)?r.exports:t(e)?e:void 0});
//# sourceMappingURL=../sourcemaps/browser/image-size.js.map
