/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
module.exports=function(t,e,a){var i=null;if("development"!==e.env)try{i=void 0===t.localStorage?null:t.localStorage}catch(t){}return{setCSS:function(t,e,o,r){if(i){a.info("saving "+t+" to cache.");try{i.setItem(t,r),i.setItem(t+":timestamp",e),o&&i.setItem(t+":vars",JSON.stringify(o))}catch(e){a.error('failed to save "'+t+'" to local storage for caching.')}}},getCSS:function(t,e,a){var o=i&&i.getItem(t),r=i&&i.getItem(t+":timestamp"),n=i&&i.getItem(t+":vars");if(a=a||{},n=n||"{}",r&&e.lastModified&&new Date(e.lastModified).valueOf()===new Date(r).valueOf()&&JSON.stringify(a)===n)return o}}};
//# sourceMappingURL=../sourcemaps/browser/cache.js.map
