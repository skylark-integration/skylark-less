/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Combinator=function(o){" "===o?(this.value=" ",this.emptyOrWhitespace=!0):(this.value=o?o.trim():"",this.emptyOrWhitespace=""===this.value)};Combinator.prototype=new Node,Combinator.prototype.type="Combinator";var _noSpaceCombinators={"":!0," ":!0,"|":!0};Combinator.prototype.genCSS=function(o,t){var e=o.compress||_noSpaceCombinators[this.value]?"":" ";t.add(e+this.value+e)},module.exports=Combinator;
//# sourceMappingURL=../../sourcemaps/engine/tree/combinator.js.map
