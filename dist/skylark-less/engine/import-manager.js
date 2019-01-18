/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./contexts","./parser/parser","./less-error","./utils","./logger"],function(e,t,r,n,i){"use strict";var o={},s={exports:{}},a=e,l=t,u=r,c=n,p=(Promise,i);function h(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var t;for(t in e)return!1;return!0}(e)}return s.exports=function(e){var t=function(e,t,r){this.less=e,this.rootFilename=r.filename,this.paths=t.paths||[],this.contents={},this.contentsIgnoredChars={},this.mime=t.mime,this.error=null,this.context=t,this.queue=[],this.files={}};return t.prototype.push=function(t,r,n,i,o){var s=this,h=this.context.pluginManager.Loader;this.queue.push(t);var f=function(e,r,n){s.queue.splice(s.queue.indexOf(t),1);var a=n===s.rootFilename;i.optional&&e?(o(null,{rules:[]},!1,null),p.info("The file "+n+" was skipped because it was not found and the import was marked optional.")):(s.files[n]||i.inline||(s.files[n]={root:r,options:i}),e&&!s.error&&(s.error=e),o(e,r,a,n))},m={rewriteUrls:this.context.rewriteUrls,entryPath:n.entryPath,rootpath:n.rootpath,rootFilename:n.rootFilename},g=e.getFileManager(t,n.currentDirectory,this.context,e);if(g){var x,y=function(e){var t,r=e.filename,o=e.contents.replace(/^\uFEFF/,"");m.currentDirectory=g.getPath(r),m.rewriteUrls&&(m.rootpath=g.join(s.context.rootpath||"",g.pathDiff(m.currentDirectory,m.entryPath)),!g.isPathAbsolute(m.rootpath)&&g.alwaysMakePathsAbsolute()&&(m.rootpath=g.join(m.entryPath,m.rootpath))),m.filename=r;var c=new a.Parse(s.context);c.processImports=!1,s.contents[r]=o,(n.reference||i.reference)&&(m.reference=!0),i.isPlugin?(t=h.evalPlugin(o,c,s,i.pluginArgs,m))instanceof u?f(t,null,r):f(null,t,r):i.inline?f(null,o,r):!s.files[r]||s.files[r].options.multiple||i.multiple?new l(c,s,m).parse(o,function(e,t){f(e,t,r)}):f(null,s.files[r].root,r)},P=c.clone(this.context);r&&(P.ext=i.isPlugin?".js":".less"),i.isPlugin?(P.mime="application/javascript",x=h.loadPlugin(t,n.currentDirectory,P,e,g)):x=g.loadFile(t,n.currentDirectory,P,e,function(e,t){e?f(e):y(t)}),x&&x.then(y,f)}else f({message:"Could not find a file-manager for "+t})},t},h(s.exports)?s.exports:h(o)?o:void 0});
//# sourceMappingURL=../sourcemaps/engine/import-manager.js.map
