/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
function makeRegistry(t){return{_data:{},add:function(t,e){t=t.toLowerCase(),this._data.hasOwnProperty(t),this._data[t]=e},addMultiple:function(t){Object.keys(t).forEach(function(e){this.add(e,t[e])}.bind(this))},get:function(e){return this._data[e]||t&&t.get(e)},getLocalFunctions:function(){return this._data},inherit:function(){return makeRegistry(this)},create:function(t){return makeRegistry(t)}}}module.exports=makeRegistry(null);
//# sourceMappingURL=../../sourcemaps/engine/functions/function-registry.js.map
