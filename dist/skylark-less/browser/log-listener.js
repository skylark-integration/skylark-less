/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
module.exports=function(e,o){o.logLevel=void 0!==o.logLevel?o.logLevel:"development"===o.env?3:1,o.loggers||(o.loggers=[{debug:function(e){o.logLevel>=4&&console.log(e)},info:function(e){o.logLevel>=3&&console.log(e)},warn:function(e){o.logLevel>=2&&console.warn(e)},error:function(e){o.logLevel>=1&&console.error(e)}}]);for(var l=0;l<o.loggers.length;l++)e.logger.addListener(o.loggers[l])};
//# sourceMappingURL=../sourcemaps/browser/log-listener.js.map
