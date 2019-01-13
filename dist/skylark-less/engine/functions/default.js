/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var Keyword=require("../tree/keyword"),functionRegistry=require("./function-registry"),defaultFunc={eval:function(){var e=this.value_,r=this.error_;if(r)throw r;if(null!=e)return e?Keyword.True:Keyword.False},value:function(e){this.value_=e},error:function(e){this.error_=e},reset:function(){this.value_=this.error_=null}};functionRegistry.add("default",defaultFunc.eval.bind(defaultFunc)),module.exports=defaultFunc;
//# sourceMappingURL=../../sourcemaps/engine/functions/default.js.map
