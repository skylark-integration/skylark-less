/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var SetTreeVisibilityVisitor=function(i){this.visible=i};SetTreeVisibilityVisitor.prototype.run=function(i){this.visit(i)},SetTreeVisibilityVisitor.prototype.visitArray=function(i){if(!i)return i;var t,r=i.length;for(t=0;t<r;t++)this.visit(i[t]);return i},SetTreeVisibilityVisitor.prototype.visit=function(i){return i?i.constructor===Array?this.visitArray(i):!i.blocksVisibility||i.blocksVisibility()?i:(this.visible?i.ensureVisibility():i.ensureInvisibility(),i.accept(this),i):i},module.exports=SetTreeVisibilityVisitor;
//# sourceMappingURL=../../sourcemaps/engine/visitors/set-tree-visibility-visitor.js.map
