/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
module.exports={error:function(e){this._fireEvent("error",e)},warn:function(e){this._fireEvent("warn",e)},info:function(e){this._fireEvent("info",e)},debug:function(e){this._fireEvent("debug",e)},addListener:function(e){this._listeners.push(e)},removeListener:function(e){for(var i=0;i<this._listeners.length;i++)if(this._listeners[i]===e)return void this._listeners.splice(i,1)},_fireEvent:function(e,i){for(var n=0;n<this._listeners.length;n++){var t=this._listeners[n][e];t&&t(i)}},_listeners:[]};
//# sourceMappingURL=../sourcemaps/engine/logger.js.map
