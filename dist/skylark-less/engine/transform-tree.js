/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./contexts","./visitors/index","./tree/index"],function(e,r,n){"use strict";var i={},t={exports:{}},o=e,s=r,a=n;function u(e){return"object"!=typeof e||Array.isArray(e)||!function(e){var r;for(r in e)return!1;return!0}(e)}return t.exports=function(e,r){var n,i=(r=r||{}).variables,t=new o.Eval(r);"object"!=typeof i||Array.isArray(i)||(i=Object.keys(i).map(function(e){var r=i[e];return r instanceof a.Value||(r instanceof a.Expression||(r=new a.Expression([r])),r=new a.Value([r])),new a.Declaration("@"+e,r,!1,null,0)}),t.frames=[new a.Ruleset(null,i)]);var u,f,l=[new s.JoinSelectorVisitor,new s.MarkVisibleSelectorsVisitor(!0),new s.ExtendVisitor,new s.ToCSSVisitor({compress:Boolean(r.compress)})],c=[];if(r.pluginManager){f=r.pluginManager.visitor();for(var p=0;p<2;p++)for(f.first();u=f.get();)u.isPreEvalVisitor?0!==p&&-1!==c.indexOf(u)||(c.push(u),u.run(e)):0!==p&&-1!==l.indexOf(u)||(u.isPreVisitor?l.unshift(u):l.push(u))}n=e.eval(t);for(p=0;p<l.length;p++)l[p].run(n);if(r.pluginManager)for(f.first();u=f.get();)-1===l.indexOf(u)&&-1===c.indexOf(u)&&u.run(n);return n},u(t.exports)?t.exports:u(i)?i:void 0});
//# sourceMappingURL=../sourcemaps/engine/transform-tree.js.map
