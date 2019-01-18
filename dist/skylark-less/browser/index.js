/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./utils","./browser","../less","./file-manager","./plugin-loader","./log-listener","./error-reporting","./cache","./image-size"],function(e,t,r,n,o,i,s,a,l){"use strict";var c={},f={exports:{}},h=e.addDataAttr,u=t;function d(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var t;for(t in e)return!1;return!0}(e)}return f.exports=function(e,t){var c=e.document,f=r();f.options=t;var d=f.environment,g=n(t,f.logger),m=new g;d.addFileManager(m),f.FileManager=g,f.PluginLoader=o,i(f,t);var y=s(e,f,t),v=f.cache=t.cache||a(e,t,f.logger);l(f.environment),t.functions&&f.functions.functionRegistry.addMultiple(t.functions);var p=/^text\/(x-)?less$/;function w(e){var t={};for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);return t}function S(e,t){var r=Array.prototype.slice.call(arguments,2);return function(){var n=r.concat(Array.prototype.slice.call(arguments,0));return e.apply(t,n)}}function M(e){for(var r,n=c.getElementsByTagName("style"),o=0;o<n.length;o++)if((r=n[o]).type.match(p)){var i=w(t);i.modifyVars=e;var s=r.innerHTML||"";i.filename=c.location.href.replace(/#.*$/,""),f.render(s,i,S(function(e,t,r){t?y.add(t,"inline"):(e.type="text/css",e.styleSheet?e.styleSheet.cssText=r.css:e.innerHTML=r.css)},null,r))}}function T(e,r,n,o,i){var s=w(t);h(s,e),s.mime=e.type,i&&(s.modifyVars=i),m.loadFile(e.href,null,s,d).then(function(t){!function(t){var i=t.contents,a=t.filename,l=t.webInfo,c={currentDirectory:m.getPath(a),filename:a,rootFilename:a,rewriteUrls:s.rewriteUrls};if(c.entryPath=c.currentDirectory,c.rootpath=s.rootpath||c.currentDirectory,l){l.remaining=o;var h=v.getCSS(a,l,s.modifyVars);if(!n&&h)return l.local=!0,void r(null,h,i,e,l,a)}y.remove(a),s.rootFileInfo=c,f.render(i,s,function(t,n){t?(t.href=a,r(t)):(v.setCSS(e.href,l.lastModified,s.modifyVars,n.css),r(null,n.css,i,e,l,a))})}(t)}).catch(function(e){console.log(e),r(e)})}function D(e,t,r){for(var n=0;n<f.sheets.length;n++)T(f.sheets[n],e,t,f.sheets.length-(n+1),r)}return f.watch=function(){return f.watchMode||(f.env="development","development"===f.env&&(f.watchTimer=setInterval(function(){f.watchMode&&(m.clearFileCache(),D(function(t,r,n,o,i){t?y.add(t,t.href||o.href):r&&u.createCSS(e.document,r,o)}))},t.poll))),this.watchMode=!0,!0},f.unwatch=function(){return clearInterval(f.watchTimer),this.watchMode=!1,!1},f.registerStylesheetsImmediately=function(){var e=c.getElementsByTagName("link");f.sheets=[];for(var t=0;t<e.length;t++)("stylesheet/less"===e[t].rel||e[t].rel.match(/stylesheet/)&&e[t].type.match(p))&&f.sheets.push(e[t])},f.registerStylesheets=function(){return new Promise(function(e,t){f.registerStylesheetsImmediately(),e()})},f.modifyVars=function(e){return f.refresh(!0,e,!1)},f.refresh=function(t,r,n){return(t||n)&&!1!==n&&m.clearFileCache(),new Promise(function(n,o){var i,s,a,l;i=s=new Date,0===(l=f.sheets.length)?(s=new Date,a=s-i,f.logger.info("Less has finished and no sheets were loaded."),n({startTime:i,endTime:s,totalMilliseconds:a,sheets:f.sheets.length})):D(function(t,r,c,h,d){if(t)return y.add(t,t.href||h.href),void o(t);d.local?f.logger.info("Loading "+h.href+" from cache."):f.logger.info("Rendered "+h.href+" successfully."),u.createCSS(e.document,r,h),f.logger.info("CSS for "+h.href+" generated in "+(new Date-s)+"ms"),0===--l&&(a=new Date-i,f.logger.info("Less has finished. CSS generated in "+a+"ms"),n({startTime:i,endTime:s,totalMilliseconds:a,sheets:f.sheets.length})),s=new Date},t,r),M(r)})},f.refreshStyles=M,f},d(f.exports)?f.exports:d(c)?c:void 0});
//# sourceMappingURL=../sourcemaps/browser/index.js.map
