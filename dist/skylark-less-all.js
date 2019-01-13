/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
!function(e,r){var t=r.define,n=r.require,s="function"==typeof t&&t.amd,o=!s&&"undefined"!=typeof exports;if(!s&&!t){var i={};t=r.define=function(e,r,t){"function"==typeof t?(i[e]={factory:t,deps:r.map(function(r){return function(e,r){if("."!==e[0])return e;var t=r.split("/"),n=e.split("/");t.pop();for(var s=0;s<n.length;s++)"."!=n[s]&&(".."==n[s]?t.pop():t.push(n[s]));return t.join("/")}(r,e)}),exports:null},n(e)):i[e]=t},n=r.require=function(e){if(!i.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var t=i[e];if(!t.exports){var s=[];t.deps.forEach(function(e){s.push(n(e))}),t.exports=t.factory.apply(r,s)}return t.exports}}if(!t)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,r){e("skylark-langx/skylark",[],function(){return{}});var t=r("./utils").addDataAttr,n=r("./browser");module.exports=function(e,s){var o=e.document,i=r("../less")();i.options=s;var a=i.environment,l=r("./file-manager")(s,i.logger),c=new l;a.addFileManager(c),i.FileManager=l,i.PluginLoader=r("./plugin-loader"),r("./log-listener")(i,s);var f=r("./error-reporting")(e,i,s),u=i.cache=s.cache||r("./cache")(e,s,i.logger);r("./image-size")(i.environment),s.functions&&i.functions.functionRegistry.addMultiple(s.functions);var h=/^text\/(x-)?less$/;function d(e){var r={};for(var t in e)e.hasOwnProperty(t)&&(r[t]=e[t]);return r}function y(e,r){var t=Array.prototype.slice.call(arguments,2);return function(){var n=t.concat(Array.prototype.slice.call(arguments,0));return e.apply(r,n)}}function m(e){for(var r,t=o.getElementsByTagName("style"),n=0;n<t.length;n++)if((r=t[n]).type.match(h)){var a=d(s);a.modifyVars=e;var l=r.innerHTML||"";a.filename=o.location.href.replace(/#.*$/,""),i.render(l,a,y(function(e,r,t){r?f.add(r,"inline"):(e.type="text/css",e.styleSheet?e.styleSheet.cssText=t.css:e.innerHTML=t.css)},null,r))}}function g(e,r,n,o,l){var h=d(s);t(h,e),h.mime=e.type,l&&(h.modifyVars=l),c.loadFile(e.href,null,h,a).then(function(t){!function(t){var s=t.contents,a=t.filename,l=t.webInfo,d={currentDirectory:c.getPath(a),filename:a,rootFilename:a,rewriteUrls:h.rewriteUrls};if(d.entryPath=d.currentDirectory,d.rootpath=h.rootpath||d.currentDirectory,l){l.remaining=o;var y=u.getCSS(a,l,h.modifyVars);if(!n&&y)return l.local=!0,void r(null,y,s,e,l,a)}f.remove(a),h.rootFileInfo=d,i.render(s,h,function(t,n){t?(t.href=a,r(t)):(u.setCSS(e.href,l.lastModified,h.modifyVars,n.css),r(null,n.css,s,e,l,a))})}(t)}).catch(function(e){console.log(e),r(e)})}function p(e,r,t){for(var n=0;n<i.sheets.length;n++)g(i.sheets[n],e,r,i.sheets.length-(n+1),t)}return i.watch=function(){return i.watchMode||(i.env="development","development"===i.env&&(i.watchTimer=setInterval(function(){i.watchMode&&(c.clearFileCache(),p(function(r,t,s,o,i){r?f.add(r,r.href||o.href):t&&n.createCSS(e.document,t,o)}))},s.poll))),this.watchMode=!0,!0},i.unwatch=function(){return clearInterval(i.watchTimer),this.watchMode=!1,!1},i.registerStylesheetsImmediately=function(){var e=o.getElementsByTagName("link");i.sheets=[];for(var r=0;r<e.length;r++)("stylesheet/less"===e[r].rel||e[r].rel.match(/stylesheet/)&&e[r].type.match(h))&&i.sheets.push(e[r])},i.registerStylesheets=function(){return new Promise(function(e,r){i.registerStylesheetsImmediately(),e()})},i.modifyVars=function(e){return i.refresh(!0,e,!1)},i.refresh=function(r,t,s){return(r||s)&&!1!==s&&c.clearFileCache(),new Promise(function(s,o){var a,l,c,u;a=l=new Date,0===(u=i.sheets.length)?(l=new Date,c=l-a,i.logger.info("Less has finished and no sheets were loaded."),s({startTime:a,endTime:l,totalMilliseconds:c,sheets:i.sheets.length})):p(function(r,t,h,d,y){if(r)return f.add(r,r.href||d.href),void o(r);y.local?i.logger.info("Loading "+d.href+" from cache."):i.logger.info("Rendered "+d.href+" successfully."),n.createCSS(e.document,t,d),i.logger.info("CSS for "+d.href+" generated in "+(new Date-l)+"ms"),0===--u&&(c=new Date-a,i.logger.info("Less has finished. CSS generated in "+c+"ms"),s({startTime:a,endTime:l,totalMilliseconds:c,sheets:i.sheets.length})),l=new Date},r,t),m(t)})},i.refreshStyles=m,i},e("skylark-less/browser/index",function(){}),e("skylark-less/less",["skylark-langx/skylark","./browser/index"],function(e,r){return e.less=r}),e("skylark-less/main",["./less"],function(e){return e}),e("skylark-less",["skylark-less/main"],function(e){return e})}(t,n),!s){var a=n("skylark-langx/skylark");o?module.exports=a:r.skylarkjs=a}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-less-all.js.map