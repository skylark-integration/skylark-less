/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./function-registry","./math-helper"],function(n,r){"use strict";var t={},a={},u=n,i=r,e={ceil:null,floor:null,sqrt:null,abs:null,tan:"",sin:"",cos:"",atan:"rad",asin:"rad",acos:"rad"};for(var o in e)e.hasOwnProperty(o)&&(e[o]=i._math.bind(null,Math[o],e[o]));function l(n){return"object"!=typeof n||Array.isArray(n)||!function(n){var r;for(r in n)return!1;return!0}(n)}return e.round=function(n,r){var t=void 0===r?0:r.value;return i._math(function(n){return n.toFixed(t)},null,n)},u.addMultiple(e),l(a)?a:l(t)?t:void 0});
//# sourceMappingURL=../../sourcemaps/engine/functions/math.js.map
