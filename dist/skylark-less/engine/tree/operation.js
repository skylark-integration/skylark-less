/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node","./color","./dimension","../constants"],function(t,e,o,n){"use strict";var i={},s={exports:{}},r=t,p=e,a=o,c=n.Math,d=function(t,e,o){this.op=t.trim(),this.operands=e,this.isSpaced=o};function h(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var e;for(e in t)return!1;return!0}(t)}return(d.prototype=new r).type="Operation",d.prototype.accept=function(t){this.operands=t.visit(this.operands)},d.prototype.eval=function(t){var e,o=this.operands[0].eval(t),n=this.operands[1].eval(t);if(t.isMathOn(this.op)){if(e="./"===this.op?"/":this.op,o instanceof a&&n instanceof p&&(o=o.toColor()),n instanceof a&&o instanceof p&&(n=n.toColor()),!o.operate){if(o instanceof d&&"/"===o.op&&t.math===c.PARENS_DIVISION)return new d(this.op,[o,n],this.isSpaced);throw{type:"Operation",message:"Operation on an invalid type"}}return o.operate(t,e,n)}return new d(this.op,[o,n],this.isSpaced)},d.prototype.genCSS=function(t,e){this.operands[0].genCSS(t,e),this.isSpaced&&e.add(" "),e.add(this.op),this.isSpaced&&e.add(" "),this.operands[1].genCSS(t,e)},s.exports=d,h(s.exports)?s.exports:h(i)?i:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/operation.js.map
