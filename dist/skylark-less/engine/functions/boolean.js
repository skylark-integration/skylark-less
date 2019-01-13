/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var functionRegistry=require("./function-registry"),Anonymous=require("../tree/anonymous"),Keyword=require("../tree/keyword");functionRegistry.addMultiple({boolean:function(e){return e?Keyword.True:Keyword.False},if:function(e,r,n){return e?r:n||new Anonymous}});
//# sourceMappingURL=../../sourcemaps/engine/functions/boolean.js.map
