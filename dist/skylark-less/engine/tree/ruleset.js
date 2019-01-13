/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Node=require("./node"),Declaration=require("./declaration"),Keyword=require("./keyword"),Comment=require("./comment"),Paren=require("./paren"),Selector=require("./selector"),Element=require("./element"),Anonymous=require("./anonymous"),contexts=require("../contexts"),globalFunctionRegistry=require("../functions/function-registry"),defaultFunc=require("../functions/default"),getDebugInfo=require("./debug-info"),utils=require("../utils"),Ruleset=function(e,t,r,s){this.selectors=e,this.rules=t,this._lookups={},this._variables=null,this._properties=null,this.strictImports=r,this.copyVisibilityInfo(s),this.allowRoot=!0,this.setParent(this.selectors,this),this.setParent(this.rules,this)};Ruleset.prototype=new Node,Ruleset.prototype.type="Ruleset",Ruleset.prototype.isRuleset=!0,Ruleset.prototype.isRulesetLike=function(){return!0},Ruleset.prototype.accept=function(e){this.paths?this.paths=e.visitArray(this.paths,!0):this.selectors&&(this.selectors=e.visitArray(this.selectors)),this.rules&&this.rules.length&&(this.rules=e.visitArray(this.rules))},Ruleset.prototype.eval=function(e){var t,r,s,i,n,l=!1;if(this.selectors&&(r=this.selectors.length)){for(t=new Array(r),defaultFunc.error({type:"Syntax",message:"it is currently only allowed in parametric mixin guards,"}),i=0;i<r;i++){s=this.selectors[i].eval(e);for(var o=0;o<s.elements.length;o++)if(s.elements[o].isVariable){n=!0;break}t[i]=s,s.evaldCondition&&(l=!0)}if(n){var a=new Array(r);for(i=0;i<r;i++)s=t[i],a[i]=s.toCSS(e);this.parse.parseNode(a.join(","),["selectors"],t[0].getIndex(),t[0].fileInfo(),function(e,r){r&&(t=utils.flattenArray(r))})}defaultFunc.reset()}else l=!0;var u,c,h=this.rules?utils.copyArray(this.rules):null,p=new Ruleset(t,h,this.strictImports,this.visibilityInfo());p.originalRuleset=this,p.root=this.root,p.firstRoot=this.firstRoot,p.allowImports=this.allowImports,this.debugInfo&&(p.debugInfo=this.debugInfo),l||(h.length=0),p.functionRegistry=function(e){for(var t,r=0,s=e.length;r!==s;++r)if(t=e[r].functionRegistry)return t;return globalFunctionRegistry}(e.frames).inherit();var f=e.frames;f.unshift(p);var v=e.selectors;v||(e.selectors=v=[]),v.unshift(this.selectors),(p.root||p.allowImports||!p.strictImports)&&p.evalImports(e);var m=p.rules;for(i=0;u=m[i];i++)u.evalFirst&&(m[i]=u.eval(e));var y=e.mediaBlocks&&e.mediaBlocks.length||0;for(i=0;u=m[i];i++)"MixinCall"===u.type?(h=u.eval(e).filter(function(e){return!(e instanceof Declaration&&e.variable)||!p.variable(e.name)}),m.splice.apply(m,[i,1].concat(h)),i+=h.length-1,p.resetCache()):"VariableCall"===u.type&&(h=u.eval(e).rules.filter(function(e){return!(e instanceof Declaration&&e.variable)}),m.splice.apply(m,[i,1].concat(h)),i+=h.length-1,p.resetCache());for(i=0;u=m[i];i++)u.evalFirst||(m[i]=u=u.eval?u.eval(e):u);for(i=0;u=m[i];i++)if(u instanceof Ruleset&&u.selectors&&1===u.selectors.length&&u.selectors[0]&&u.selectors[0].isJustParentSelector()){m.splice(i--,1);for(o=0;c=u.rules[o];o++)c instanceof Node&&(c.copyVisibilityInfo(u.visibilityInfo()),c instanceof Declaration&&c.variable||m.splice(++i,0,c))}if(f.shift(),v.shift(),e.mediaBlocks)for(i=y;i<e.mediaBlocks.length;i++)e.mediaBlocks[i].bubbleSelectors(t);return p},Ruleset.prototype.evalImports=function(e){var t,r,s=this.rules;if(s)for(t=0;t<s.length;t++)"Import"===s[t].type&&((r=s[t].eval(e))&&(r.length||0===r.length)?(s.splice.apply(s,[t,1].concat(r)),t+=r.length-1):s.splice(t,1,r),this.resetCache())},Ruleset.prototype.makeImportant=function(){return new Ruleset(this.selectors,this.rules.map(function(e){return e.makeImportant?e.makeImportant():e}),this.strictImports,this.visibilityInfo())},Ruleset.prototype.matchArgs=function(e){return!e||0===e.length},Ruleset.prototype.matchCondition=function(e,t){var r=this.selectors[this.selectors.length-1];return!!r.evaldCondition&&!(r.condition&&!r.condition.eval(new contexts.Eval(t,t.frames)))},Ruleset.prototype.resetCache=function(){this._rulesets=null,this._variables=null,this._properties=null,this._lookups={}},Ruleset.prototype.variables=function(){return this._variables||(this._variables=this.rules?this.rules.reduce(function(e,t){if(t instanceof Declaration&&!0===t.variable&&(e[t.name]=t),"Import"===t.type&&t.root&&t.root.variables){var r=t.root.variables();for(var s in r)r.hasOwnProperty(s)&&(e[s]=t.root.variable(s))}return e},{}):{}),this._variables},Ruleset.prototype.properties=function(){return this._properties||(this._properties=this.rules?this.rules.reduce(function(e,t){if(t instanceof Declaration&&!0!==t.variable){var r=1===t.name.length&&t.name[0]instanceof Keyword?t.name[0].value:t.name;e["$"+r]?e["$"+r].push(t):e["$"+r]=[t]}return e},{}):{}),this._properties},Ruleset.prototype.variable=function(e){var t=this.variables()[e];if(t)return this.parseValue(t)},Ruleset.prototype.property=function(e){var t=this.properties()[e];if(t)return this.parseValue(t)},Ruleset.prototype.lastDeclaration=function(){for(var e=this.rules.length;e>0;e--){var t=this.rules[e-1];if(t instanceof Declaration)return this.parseValue(t)}},Ruleset.prototype.parseValue=function(e){var t=this;function r(e){return e.value instanceof Anonymous&&!e.parsed?("string"==typeof e.value.value?this.parse.parseNode(e.value.value,["value","important"],e.value.getIndex(),e.fileInfo(),function(t,r){t&&(e.parsed=!0),r&&(e.value=r[0],e.important=r[1]||"",e.parsed=!0)}):e.parsed=!0,e):e}if(Array.isArray(e)){var s=[];return e.forEach(function(e){s.push(r.call(t,e))}),s}return r.call(t,e)},Ruleset.prototype.rulesets=function(){if(!this.rules)return[];var e,t,r=[],s=this.rules;for(e=0;t=s[e];e++)t.isRuleset&&r.push(t);return r},Ruleset.prototype.prependRule=function(e){var t=this.rules;t?t.unshift(e):this.rules=[e],this.setParent(e,this)},Ruleset.prototype.find=function(e,t,r){t=t||this;var s,i,n=[],l=e.toCSS();return l in this._lookups?this._lookups[l]:(this.rulesets().forEach(function(l){if(l!==t)for(var o=0;o<l.selectors.length;o++)if(s=e.match(l.selectors[o])){if(e.elements.length>s){if(!r||r(l)){i=l.find(new Selector(e.elements.slice(s)),t,r);for(var a=0;a<i.length;++a)i[a].path.push(l);Array.prototype.push.apply(n,i)}}else n.push({rule:l,path:[]});break}}),this._lookups[l]=n,n)},Ruleset.prototype.genCSS=function(e,t){var r,s,i,n,l,o=[];e.tabLevel=e.tabLevel||0,this.root||e.tabLevel++;var a,u=e.compress?"":Array(e.tabLevel+1).join("  "),c=e.compress?"":Array(e.tabLevel).join("  "),h=0,p=0;for(r=0;n=this.rules[r];r++)n instanceof Comment?(p===r&&p++,o.push(n)):n.isCharset&&n.isCharset()?(o.splice(h,0,n),h++,p++):"Import"===n.type?(o.splice(p,0,n),p++):o.push(n);if(o=[].concat(o),!this.root){(i=getDebugInfo(e,this,c))&&(t.add(i),t.add(c));var f,v=this.paths,m=v.length;for(a=e.compress?",":",\n"+c,r=0;r<m;r++)if(f=(l=v[r]).length)for(r>0&&t.add(a),e.firstSelector=!0,l[0].genCSS(e,t),e.firstSelector=!1,s=1;s<f;s++)l[s].genCSS(e,t);t.add((e.compress?"{":" {\n")+u)}for(r=0;n=o[r];r++){r+1===o.length&&(e.lastRule=!0);var y=e.lastRule;n.isRulesetLike(n)&&(e.lastRule=!1),n.genCSS?n.genCSS(e,t):n.value&&t.add(n.value.toString()),e.lastRule=y,!e.lastRule&&n.isVisible()?t.add(e.compress?"":"\n"+u):e.lastRule=!1}this.root||(t.add(e.compress?"}":"\n"+c+"}"),e.tabLevel--),t.isEmpty()||e.compress||!this.firstRoot||t.add("\n")},Ruleset.prototype.joinSelectors=function(e,t,r){for(var s=0;s<r.length;s++)this.joinSelector(e,t,r[s])},Ruleset.prototype.joinSelector=function(e,t,r){function s(e,t){var r,s;if(0===e.length)r=new Paren(e[0]);else{var i=new Array(e.length);for(s=0;s<e.length;s++)i[s]=new Element(null,e[s],t.isVariable,t._index,t._fileInfo);r=new Paren(new Selector(i))}return r}function i(e,t){var r;return r=new Element(null,e,t.isVariable,t._index,t._fileInfo),new Selector([r])}function n(e,t,r,s){var i,n,l;if(i=[],e.length>0?(n=(i=utils.copyArray(e)).pop(),l=s.createDerived(utils.copyArray(n.elements))):l=s.createDerived([]),t.length>0){var o=r.combinator,a=t[0].elements[0];o.emptyOrWhitespace&&!a.combinator.emptyOrWhitespace&&(o=a.combinator),l.elements.push(new Element(o,a.value,r.isVariable,r._index,r._fileInfo)),l.elements=l.elements.concat(t[0].elements.slice(1))}if(0!==l.elements.length&&i.push(l),t.length>1){var u=t.slice(1);u=u.map(function(e){return e.createDerived(e.elements,[])}),i=i.concat(u)}return i}function l(e,t,r,s,i){var l;for(l=0;l<e.length;l++){var o=n(e[l],t,r,s);i.push(o)}return i}function o(e,t){var r,s;if(0!==e.length)if(0!==t.length)for(r=0;s=t[r];r++)s.length>0?s[s.length-1]=s[s.length-1].createDerived(s[s.length-1].elements.concat(e)):s.push(new Selector(e));else t.push([new Selector(e)])}function a(e,t){var r=t.createDerived(t.elements,t.extendList,t.evaldCondition);return r.copyVisibilityInfo(e),r}var u,c;if(!function e(t,r,a){var u,c,h,p,f,v,m,y,g,d,b,R,I=!1;for(p=[],f=[[]],u=0;y=a.elements[u];u++)if("&"!==y.value){var S=(R=void 0,(b=y).value instanceof Paren&&(R=b.value.value)instanceof Selector?R:null);if(null!=S){o(p,f);var w,_=[],C=[];for(w=e(_,r,S),I=I||w,h=0;h<_.length;h++)l(f,[i(s(_[h],y),y)],y,a,C);f=C,p=[]}else p.push(y)}else{for(I=!0,v=[],o(p,f),c=0;c<f.length;c++)if(m=f[c],0===r.length)m.length>0&&m[0].elements.push(new Element(y.combinator,"",y.isVariable,y._index,y._fileInfo)),v.push(m);else for(h=0;h<r.length;h++){var k=n(m,r[h],y,a);v.push(k)}f=v,p=[]}for(o(p,f),u=0;u<f.length;u++)(g=f[u].length)>0&&(t.push(f[u]),d=f[u][g-1],f[u][g-1]=d.createDerived(d.elements,a.extendList));return I}(c=[],t,r))if(t.length>0)for(c=[],u=0;u<t.length;u++){var h=t[u].map(a.bind(this,r.visibilityInfo()));h.push(r),c.push(h)}else c=[[r]];for(u=0;u<c.length;u++)e.push(c[u])},module.exports=Ruleset;
//# sourceMappingURL=../../sourcemaps/engine/tree/ruleset.js.map