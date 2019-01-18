/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define(["./data/index","./tree/index","./environment/environment","./environment/abstract-file-manager","./environment/abstract-plugin-loader","./visitors/index","./parser/parser","./functions/index","./contexts","./source-map-output","./source-map-builder","./parse-tree","./import-manager","./render","./parse","./less-error","./transform-tree","./utils","./plugin-manager","./logger"],function(r,e,t,n,o,a,i,s,u,c,p,l,f,v,m,d,g,x,b,y){"use strict";var A={},M={exports:{}};function j(r){return"object"!=typeof r||Array.isArray(r)||!function(r){var e;for(e in r)return!1;return!0}(r)}return M.exports=function(A,M){var j,L,O,P,w,C,E={version:[3,9,0],data:r,tree:e,Environment:w=t,AbstractFileManager:n,AbstractPluginLoader:o,environment:A=new w(A,M),visitors:a,Parser:i,functions:s(A),contexts:u,SourceMapOutput:j=c(A),SourceMapBuilder:L=p(j,A),ParseTree:O=l(L),ImportManager:P=f(A),render:v(A,O,P),parse:m(A,O,P),LessError:d,transformTree:g,utils:x,PluginManager:b,logger:y},S=function(r){return function(){var e=Object.create(r.prototype);return r.apply(e,Array.prototype.slice.call(arguments,0)),e}},T=Object.create(E);for(var B in E.tree)if("function"==typeof(C=E.tree[B]))T[B.toLowerCase()]=S(C);else for(var F in T[B]=Object.create(null),C)T[B][F.toLowerCase()]=S(C[F]);return T},j(M.exports)?M.exports:j(A)?A:void 0});
//# sourceMappingURL=../sourcemaps/engine/index.js.map
