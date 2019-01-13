/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
module.exports=function(e,r){var t,n,i,a,u,o,s={version:[3,9,0],data:require("./data"),tree:require("./tree"),Environment:u=require("./environment/environment"),AbstractFileManager:require("./environment/abstract-file-manager"),AbstractPluginLoader:require("./environment/abstract-plugin-loader"),environment:e=new u(e,r),visitors:require("./visitors"),Parser:require("./parser/parser"),functions:require("./functions")(e),contexts:require("./contexts"),SourceMapOutput:t=require("./source-map-output")(e),SourceMapBuilder:n=require("./source-map-builder")(t,e),ParseTree:i=require("./parse-tree")(n),ImportManager:a=require("./import-manager")(e),render:require("./render")(e,i,a),parse:require("./parse")(e,i,a),LessError:require("./less-error"),transformTree:require("./transform-tree"),utils:require("./utils"),PluginManager:require("./plugin-manager"),logger:require("./logger")},c=function(e){return function(){var r=Object.create(e.prototype);return e.apply(r,Array.prototype.slice.call(arguments,0)),r}},p=Object.create(s);for(var l in s.tree)if("function"==typeof(o=s.tree[l]))p[l.toLowerCase()]=c(o);else for(var q in p[l]=Object.create(null),o)p[l][q.toLowerCase()]=c(o[q]);return p};
//# sourceMappingURL=../sourcemaps/engine/index.js.map
