/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Keyword=function(e){this.value=e};Keyword.prototype=new Node,Keyword.prototype.type="Keyword",Keyword.prototype.genCSS=function(e,o){if("%"===this.value)throw{type:"Syntax",message:"Invalid % without number"};o.add(this.value)},Keyword.True=new Keyword("true"),Keyword.False=new Keyword("false"),module.exports=Keyword;
//# sourceMappingURL=../../sourcemaps/engine/tree/keyword.js.map
