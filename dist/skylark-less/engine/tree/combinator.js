/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node"],function(t){"use strict";var e={},r={exports:{}},i=function(t){" "===t?(this.value=" ",this.emptyOrWhitespace=!0):(this.value=t?t.trim():"",this.emptyOrWhitespace=""===this.value)};(i.prototype=new t).type="Combinator";var o={"":!0," ":!0,"|":!0};function n(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var e;for(e in t)return!1;return!0}(t)}return i.prototype.genCSS=function(t,e){var r=t.compress||o[this.value]?"":" ";e.add(r+this.value+r)},r.exports=i,n(r.exports)?r.exports:n(e)?e:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/combinator.js.map
