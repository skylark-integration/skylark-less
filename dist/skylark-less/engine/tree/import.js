/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Media=require("./media"),URL=require("./url"),Quoted=require("./quoted"),Ruleset=require("./ruleset"),Anonymous=require("./anonymous"),utils=require("../utils"),LessError=require("../less-error"),Import=function(t,i,e,s,o,r){if(this.options=e,this._index=s,this._fileInfo=o,this.path=t,this.features=i,this.allowRoot=!0,void 0!==this.options.less||this.options.inline)this.css=!this.options.less||this.options.inline;else{var n=this.getPath();n&&/[#\.\&\?]css([\?;].*)?$/.test(n)&&(this.css=!0)}this.copyVisibilityInfo(r),this.setParent(this.features,this),this.setParent(this.path,this)};Import.prototype=new Node,Import.prototype.type="Import",Import.prototype.accept=function(t){this.features&&(this.features=t.visit(this.features)),this.path=t.visit(this.path),this.options.isPlugin||this.options.inline||!this.root||(this.root=t.visit(this.root))},Import.prototype.genCSS=function(t,i){this.css&&void 0===this.path._fileInfo.reference&&(i.add("@import ",this._fileInfo,this._index),this.path.genCSS(t,i),this.features&&(i.add(" "),this.features.genCSS(t,i)),i.add(";"))},Import.prototype.getPath=function(){return this.path instanceof URL?this.path.value.value:this.path.value},Import.prototype.isVariableImport=function(){var t=this.path;return t instanceof URL&&(t=t.value),!(t instanceof Quoted)||t.containsVariables()},Import.prototype.evalForImport=function(t){var i=this.path;return i instanceof URL&&(i=i.value),new Import(i.eval(t),this.features,this.options,this._index,this._fileInfo,this.visibilityInfo())},Import.prototype.evalPath=function(t){var i=this.path.eval(t),e=this._fileInfo;if(!(i instanceof URL)){var s=i.value;e&&s&&t.pathRequiresRewrite(s)?i.value=t.rewritePath(s,e.rootpath):i.value=t.normalizePath(i.value)}return i},Import.prototype.eval=function(t){var i=this.doEval(t);return(this.options.reference||this.blocksVisibility())&&(i.length||0===i.length?i.forEach(function(t){t.addVisibilityBlock()}):i.addVisibilityBlock()),i},Import.prototype.doEval=function(t){var i,e,s=this.features&&this.features.eval(t);if(this.options.isPlugin){if(this.root&&this.root.eval)try{this.root.eval(t)}catch(t){throw t.message="Plugin error during evaluation",new LessError(t,this.root.imports,this.root.filename)}return(e=t.frames[0]&&t.frames[0].functionRegistry)&&this.root&&this.root.functions&&e.addMultiple(this.root.functions),[]}if(this.skip&&("function"==typeof this.skip&&(this.skip=this.skip()),this.skip))return[];if(this.options.inline){var o=new Anonymous(this.root,0,{filename:this.importedFilename,reference:this.path._fileInfo&&this.path._fileInfo.reference},!0,!0);return this.features?new Media([o],this.features.value):[o]}if(this.css){var r=new Import(this.evalPath(t),s,this.options,this._index);if(!r.css&&this.error)throw this.error;return r}return(i=new Ruleset(null,utils.copyArray(this.root.rules))).evalImports(t),this.features?new Media(i.rules,this.features.value):i.rules},module.exports=Import;
//# sourceMappingURL=../../sourcemaps/engine/tree/import.js.map
