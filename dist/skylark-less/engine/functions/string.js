/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["../tree/quoted","../tree/anonymous","../tree/javascript","./function-registry"],function(e,r,t,n){"use strict";var a={},u={},c=e,o=r,l=t;function p(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var r;for(r in e)return!1;return!0}(e)}return n.addMultiple({e:function(e){return new o(e instanceof l?e.evaluated:e.value)},escape:function(e){return new o(encodeURI(e.value).replace(/=/g,"%3D").replace(/:/g,"%3A").replace(/#/g,"%23").replace(/;/g,"%3B").replace(/\(/g,"%28").replace(/\)/g,"%29"))},replace:function(e,r,t,n){var a=e.value;return t="Quoted"===t.type?t.value:t.toCSS(),a=a.replace(new RegExp(r.value,n?n.value:""),t),new c(e.quote||"",a,e.escaped)},"%":function(e){for(var r=Array.prototype.slice.call(arguments,1),t=e.value,n=0;n<r.length;n++)t=t.replace(/%[sda]/i,function(e){var t="Quoted"===r[n].type&&e.match(/s/i)?r[n].value:r[n].toCSS();return e.match(/[A-Z]$/)?encodeURIComponent(t):t});return t=t.replace(/%%/g,"%"),new c(e.quote||"",t,e.escaped)}}),p(u)?u:p(a)?a:void 0});
//# sourceMappingURL=../../sourcemaps/engine/functions/string.js.map
