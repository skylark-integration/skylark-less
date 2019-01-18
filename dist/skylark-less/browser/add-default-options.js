/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./utils","./browser"],function(o,e){"use strict";var t={},r={exports:{}},i=o.addDataAttr,n=e;function l(o){return"object"!=typeof o||Array.isArray(o)||!function(o){var e;for(e in o)return!1;return!0}(o)}return r.exports=function(o,e){i(e,n.currentScript(o)),void 0===e.isFileProtocol&&(e.isFileProtocol=/^(file|(chrome|safari)(-extension)?|resource|qrc|app):/.test(o.location.protocol)),e.async=e.async||!1,e.fileAsync=e.fileAsync||!1,e.poll=e.poll||(e.isFileProtocol?1e3:1500),e.env=e.env||("127.0.0.1"==o.location.hostname||"0.0.0.0"==o.location.hostname||"localhost"==o.location.hostname||o.location.port&&o.location.port.length>0||e.isFileProtocol?"development":"production");var t=/!dumpLineNumbers:(comments|mediaquery|all)/.exec(o.location.hash);t&&(e.dumpLineNumbers=t[1]),void 0===e.useFileCache&&(e.useFileCache=!0),void 0===e.onReady&&(e.onReady=!0),e.relativeUrls&&(e.rewriteUrls="all")},l(r.exports)?r.exports:l(t)?t:void 0});
//# sourceMappingURL=../sourcemaps/browser/add-default-options.js.map
