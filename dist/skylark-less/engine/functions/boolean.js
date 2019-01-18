/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./function-registry","../tree/anonymous","../tree/keyword"],function(r,n,e){"use strict";var t={},u={},o=n,i=e;function f(r){return"object"!=typeof r||Array.isArray(r)||!function(r){var n;for(n in r)return!1;return!0}(r)}return r.addMultiple({boolean:function(r){return r?i.True:i.False},if:function(r,n,e){return r?n:e||new o}}),f(u)?u:f(t)?t:void 0});
//# sourceMappingURL=../../sourcemaps/engine/functions/boolean.js.map
