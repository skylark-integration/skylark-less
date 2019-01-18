/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["../logger"],function(e){"use strict";var n={},r={exports:{}},t=e,i=function(e,n){this.fileManagers=n||[],e=e||{};for(var r=[],t=r.concat(["encodeBase64","mimeLookup","charsetLookup","getSourceMapGenerator"]),i=0;i<t.length;i++){var a=t[i],o=e[a];o?this[a]=o.bind(e):i<r.length&&this.warn("missing required function in environment - "+a)}};function a(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var n;for(n in e)return!1;return!0}(e)}return i.prototype.getFileManager=function(e,n,r,i,a){e||t.warn("getFileManager called with no filename.. Please report this issue. continuing."),null==n&&t.warn("getFileManager called with null directory.. Please report this issue. continuing.");var o=this.fileManagers;r.pluginManager&&(o=[].concat(o).concat(r.pluginManager.getFileManagers()));for(var s=o.length-1;s>=0;s--){var u=o[s];if(u[a?"supportsSync":"supports"](e,n,r,i))return u}return null},i.prototype.addFileManager=function(e){this.fileManagers.push(e)},i.prototype.clearFileManagers=function(){this.fileManagers=[]},r.exports=i,a(r.exports)?r.exports:a(n)?n:void 0});
//# sourceMappingURL=../../sourcemaps/engine/environment/environment.js.map
