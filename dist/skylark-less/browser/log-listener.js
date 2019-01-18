/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define([],function(){"use strict";var e={},o={exports:{}};function r(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var o;for(o in e)return!1;return!0}(e)}return o.exports=function(e,o){o.logLevel=void 0!==o.logLevel?o.logLevel:"development"===o.env?3:1,o.loggers||(o.loggers=[{debug:function(e){o.logLevel>=4&&console.log(e)},info:function(e){o.logLevel>=3&&console.log(e)},warn:function(e){o.logLevel>=2&&console.warn(e)},error:function(e){o.logLevel>=1&&console.error(e)}}]);for(var r=0;r<o.loggers.length;r++)e.logger.addListener(o.loggers[r])},r(o.exports)?o.exports:r(e)?e:void 0});
//# sourceMappingURL=../sourcemaps/browser/log-listener.js.map
