/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["../tree/keyword","./function-registry"],function(r,e){"use strict";var t={},n={exports:{}},i=r,o={eval:function(){var r=this.value_,e=this.error_;if(e)throw e;if(null!=r)return r?i.True:i.False},value:function(r){this.value_=r},error:function(r){this.error_=r},reset:function(){this.value_=this.error_=null}};function u(r){return"object"!=typeof r||Array.isArray(r)||!function(r){var e;for(e in r)return!1;return!0}(r)}return e.add("default",o.eval.bind(o)),n.exports=o,u(n.exports)?n.exports:u(t)?t:void 0});
//# sourceMappingURL=../../sourcemaps/engine/functions/default.js.map
