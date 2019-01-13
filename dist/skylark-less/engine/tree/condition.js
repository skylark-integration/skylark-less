/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Condition=function(t,e,i,o,n){this.op=t.trim(),this.lvalue=e,this.rvalue=i,this._index=o,this.negate=n};Condition.prototype=new Node,Condition.prototype.type="Condition",Condition.prototype.accept=function(t){this.lvalue=t.visit(this.lvalue),this.rvalue=t.visit(this.rvalue)},Condition.prototype.eval=function(t){var e=function(t,e,i){switch(t){case"and":return e&&i;case"or":return e||i;default:switch(Node.compare(e,i)){case-1:return"<"===t||"=<"===t||"<="===t;case 0:return"="===t||">="===t||"=<"===t||"<="===t;case 1:return">"===t||">="===t;default:return!1}}}(this.op,this.lvalue.eval(t),this.rvalue.eval(t));return this.negate?!e:e},module.exports=Condition;
//# sourceMappingURL=../../sourcemaps/engine/tree/condition.js.map
