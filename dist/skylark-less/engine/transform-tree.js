/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var contexts=require("./contexts"),visitor=require("./visitors"),tree=require("./tree");module.exports=function(e,r){var i,t=(r=r||{}).variables,n=new contexts.Eval(r);"object"!=typeof t||Array.isArray(t)||(t=Object.keys(t).map(function(e){var r=t[e];return r instanceof tree.Value||(r instanceof tree.Expression||(r=new tree.Expression([r])),r=new tree.Value([r])),new tree.Declaration("@"+e,r,!1,null,0)}),n.frames=[new tree.Ruleset(null,t)]);var s,o,a=[new visitor.JoinSelectorVisitor,new visitor.MarkVisibleSelectorsVisitor(!0),new visitor.ExtendVisitor,new visitor.ToCSSVisitor({compress:Boolean(r.compress)})],u=[];if(r.pluginManager){o=r.pluginManager.visitor();for(var l=0;l<2;l++)for(o.first();s=o.get();)s.isPreEvalVisitor?0!==l&&-1!==u.indexOf(s)||(u.push(s),s.run(e)):0!==l&&-1!==a.indexOf(s)||(s.isPreVisitor?a.unshift(s):a.push(s))}i=e.eval(n);for(l=0;l<a.length;l++)a[l].run(i);if(r.pluginManager)for(o.first();s=o.get();)-1===a.indexOf(s)&&-1===u.indexOf(s)&&s.run(i);return i};
//# sourceMappingURL=../sourcemaps/engine/transform-tree.js.map
