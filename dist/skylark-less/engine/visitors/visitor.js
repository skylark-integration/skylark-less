/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["../tree/index"],function(t){"use strict";var i={},e={exports:{}},r=t,n={visitDeeper:!0},s=!1;function o(t){return t}var a=function(t){this._implementation=t,this._visitInCache={},this._visitOutCache={},s||(!function t(i,e){var r,n;for(r in i)switch(typeof(n=i[r])){case"function":n.prototype&&n.prototype.type&&(n.prototype.typeIndex=e++);break;case"object":e=t(n,e)}return e}(r,1),s=!0)};function p(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var i;for(i in t)return!1;return!0}(t)}return a.prototype={visit:function(t){if(!t)return t;var i=t.typeIndex;if(!i)return t.value&&t.value.typeIndex&&this.visit(t.value),t;var e,r=this._implementation,s=this._visitInCache[i],a=this._visitOutCache[i],p=n;if(p.visitDeeper=!0,s||(s=r[e="visit"+t.type]||o,a=r[e+"Out"]||o,this._visitInCache[i]=s,this._visitOutCache[i]=a),s!==o){var u=s.call(r,t,p);t&&r.isReplacing&&(t=u)}return p.visitDeeper&&t&&t.accept&&t.accept(this),a!=o&&a.call(r,t),t},visitArray:function(t,i){if(!t)return t;var e,r=t.length;if(i||!this._implementation.isReplacing){for(e=0;e<r;e++)this.visit(t[e]);return t}var n=[];for(e=0;e<r;e++){var s=this.visit(t[e]);void 0!==s&&(s.splice?s.length&&this.flatten(s,n):n.push(s))}return n},flatten:function(t,i){var e,r,n,s,o,a;for(i||(i=[]),r=0,e=t.length;r<e;r++)if(void 0!==(n=t[r]))if(n.splice)for(o=0,s=n.length;o<s;o++)void 0!==(a=n[o])&&(a.splice?a.length&&this.flatten(a,i):i.push(a));else i.push(n);return i}},e.exports=a,p(e.exports)?e.exports:p(i)?i:void 0});
//# sourceMappingURL=../../sourcemaps/engine/visitors/visitor.js.map
