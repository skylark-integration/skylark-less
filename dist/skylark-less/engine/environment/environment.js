/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var logger=require("../logger"),environment=function(e,n){this.fileManagers=n||[],e=e||{};for(var r=[],t=r.concat(["encodeBase64","mimeLookup","charsetLookup","getSourceMapGenerator"]),i=0;i<t.length;i++){var a=t[i],o=e[a];o?this[a]=o.bind(e):i<r.length&&this.warn("missing required function in environment - "+a)}};environment.prototype.getFileManager=function(e,n,r,t,i){e||logger.warn("getFileManager called with no filename.. Please report this issue. continuing."),null==n&&logger.warn("getFileManager called with null directory.. Please report this issue. continuing.");var a=this.fileManagers;r.pluginManager&&(a=[].concat(a).concat(r.pluginManager.getFileManagers()));for(var o=a.length-1;o>=0;o--){var l=a[o];if(l[i?"supportsSync":"supports"](e,n,r,t))return l}return null},environment.prototype.addFileManager=function(e){this.fileManagers.push(e)},environment.prototype.clearFileManagers=function(){this.fileManagers=[]},module.exports=environment;
//# sourceMappingURL=../../sourcemaps/engine/environment/environment.js.map
