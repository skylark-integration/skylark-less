/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./node"],function(t){"use strict";var e={},r={exports:{}},i=t,n=function(t,e,r,i,n){this.op=t.trim(),this.lvalue=e,this.rvalue=r,this._index=i,this.negate=n};function s(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var e;for(e in t)return!1;return!0}(t)}return(n.prototype=new i).type="Condition",n.prototype.accept=function(t){this.lvalue=t.visit(this.lvalue),this.rvalue=t.visit(this.rvalue)},n.prototype.eval=function(t){var e=function(t,e,r){switch(t){case"and":return e&&r;case"or":return e||r;default:switch(i.compare(e,r)){case-1:return"<"===t||"=<"===t||"<="===t;case 0:return"="===t||">="===t||"=<"===t||"<="===t;case 1:return">"===t||">="===t;default:return!1}}}(this.op,this.lvalue.eval(t),this.rvalue.eval(t));return this.negate?!e:e},r.exports=n,s(r.exports)?r.exports:s(e)?e:void 0});
//# sourceMappingURL=../../sourcemaps/engine/tree/condition.js.map
