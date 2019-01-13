/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
module.exports={extractId:function(e){return e.replace(/^[a-z-]+:\/+?[^\/]+/,"").replace(/[\?\&]livereload=\w+/,"").replace(/^\//,"").replace(/\.[a-zA-Z]+$/,"").replace(/[^\.\w-]+/g,"-").replace(/\./g,":")},addDataAttr:function(e,a){for(var r in a.dataset)if(a.dataset.hasOwnProperty(r))if("env"===r||"dumpLineNumbers"===r||"rootpath"===r||"errorReporting"===r)e[r]=a.dataset[r];else try{e[r]=JSON.parse(a.dataset[r])}catch(e){}}};
//# sourceMappingURL=../sourcemaps/browser/utils.js.map
