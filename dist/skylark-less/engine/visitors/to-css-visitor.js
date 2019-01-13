/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var tree=require("../tree"),Visitor=require("./visitor"),CSSVisitorUtils=function(i){this._visitor=new Visitor(this),this._context=i};CSSVisitorUtils.prototype={containsSilentNonBlockedChild:function(i){var e;if(!i)return!1;for(var t=0;t<i.length;t++)if((e=i[t]).isSilent&&e.isSilent(this._context)&&!e.blocksVisibility())return!0;return!1},keepOnlyVisibleChilds:function(i){i&&i.rules&&(i.rules=i.rules.filter(function(i){return i.isVisible()}))},isEmpty:function(i){return!i||!i.rules||0===i.rules.length},hasVisibleSelector:function(i){return!(!i||!i.paths)&&i.paths.length>0},resolveVisibility:function(i,e){if(!i.blocksVisibility()){if(this.isEmpty(i)&&!this.containsSilentNonBlockedChild(e))return;return i}var t=i.rules[0];if(this.keepOnlyVisibleChilds(t),!this.isEmpty(t))return i.ensureVisibility(),i.removeVisibilityBlock(),i},isVisibleRuleset:function(i){return!!i.firstRoot||!this.isEmpty(i)&&!(!i.root&&!this.hasVisibleSelector(i))}};var ToCSSVisitor=function(i){this._visitor=new Visitor(this),this._context=i,this.utils=new CSSVisitorUtils(i)};ToCSSVisitor.prototype={isReplacing:!0,run:function(i){return this._visitor.visit(i)},visitDeclaration:function(i,e){if(!i.blocksVisibility()&&!i.variable)return i},visitMixinDefinition:function(i,e){i.frames=[]},visitExtend:function(i,e){},visitComment:function(i,e){if(!i.blocksVisibility()&&!i.isSilent(this._context))return i},visitMedia:function(i,e){var t=i.rules[0].rules;return i.accept(this._visitor),e.visitDeeper=!1,this.utils.resolveVisibility(i,t)},visitImport:function(i,e){if(!i.blocksVisibility())return i},visitAtRule:function(i,e){return i.rules&&i.rules.length?this.visitAtRuleWithBody(i,e):this.visitAtRuleWithoutBody(i,e)},visitAnonymous:function(i,e){if(!i.blocksVisibility())return i.accept(this._visitor),i},visitAtRuleWithBody:function(i,e){var t=function(i){var e=i.rules;return function(i){var e=i.rules;return 1===e.length&&(!e[0].paths||0===e[0].paths.length)}(i)?e[0].rules:e}(i);return i.accept(this._visitor),e.visitDeeper=!1,this.utils.isEmpty(i)||this._mergeRules(i.rules[0].rules),this.utils.resolveVisibility(i,t)},visitAtRuleWithoutBody:function(i,e){if(!i.blocksVisibility()){if("@charset"===i.name){if(this.charset){if(i.debugInfo){var t=new tree.Comment("/* "+i.toCSS(this._context).replace(/\n/g,"")+" */\n");return t.debugInfo=i.debugInfo,this._visitor.visit(t)}return}this.charset=!0}return i}},checkValidNodes:function(i,e){if(i)for(var t=0;t<i.length;t++){var s=i[t];if(e&&s instanceof tree.Declaration&&!s.variable)throw{message:"Properties must be inside selector blocks. They cannot be in the root",index:s.getIndex(),filename:s.fileInfo()&&s.fileInfo().filename};if(s instanceof tree.Call)throw{message:"Function '"+s.name+"' is undefined",index:s.getIndex(),filename:s.fileInfo()&&s.fileInfo().filename};if(s.type&&!s.allowRoot)throw{message:s.type+" node returned by a function is not valid here",index:s.getIndex(),filename:s.fileInfo()&&s.fileInfo().filename}}},visitRuleset:function(i,e){var t,s=[];if(this.checkValidNodes(i.rules,i.firstRoot),i.root)i.accept(this._visitor),e.visitDeeper=!1;else{this._compileRulesetPaths(i);for(var n=i.rules,r=n?n.length:0,o=0;o<r;)(t=n[o])&&t.rules?(s.push(this._visitor.visit(t)),n.splice(o,1),r--):o++;r>0?i.accept(this._visitor):i.rules=null,e.visitDeeper=!1}return i.rules&&(this._mergeRules(i.rules),this._removeDuplicateRules(i.rules)),this.utils.isVisibleRuleset(i)&&(i.ensureVisibility(),s.splice(0,0,i)),1===s.length?s[0]:s},_compileRulesetPaths:function(i){i.paths&&(i.paths=i.paths.filter(function(i){var e;for(" "===i[0].elements[0].combinator.value&&(i[0].elements[0].combinator=new tree.Combinator("")),e=0;e<i.length;e++)if(i[e].isVisible()&&i[e].getIsOutput())return!0;return!1}))},_removeDuplicateRules:function(i){if(i){var e,t,s,n={};for(s=i.length-1;s>=0;s--)if((t=i[s])instanceof tree.Declaration)if(n[t.name]){(e=n[t.name])instanceof tree.Declaration&&(e=n[t.name]=[n[t.name].toCSS(this._context)]);var r=t.toCSS(this._context);-1!==e.indexOf(r)?i.splice(s,1):e.push(r)}else n[t.name]=t}},_mergeRules:function(i){if(i){for(var e={},t=[],s=0;s<i.length;s++){var n=i[s];if(n.merge){var r=n.name;e[r]?i.splice(s--,1):t.push(e[r]=[]),e[r].push(n)}}t.forEach(function(i){if(i.length>0){var e=i[0],t=[],s=[new tree.Expression(t)];i.forEach(function(i){"+"===i.merge&&t.length>0&&s.push(new tree.Expression(t=[])),t.push(i.value),e.important=e.important||i.important}),e.value=new tree.Value(s)}})}}},module.exports=ToCSSVisitor;
//# sourceMappingURL=../../sourcemaps/engine/visitors/to-css-visitor.js.map