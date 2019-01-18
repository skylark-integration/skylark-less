/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define([],function(){"use strict";var t={},r={exports:{}};function i(t){this.imports=[],this.variableImports=[],this._onSequencerEmpty=t,this._currentDepth=0}function e(t){return"object"!=typeof t||Array.isArray(t)||!function(t){var r;for(r in t)return!1;return!0}(t)}return i.prototype.addImport=function(t){var r=this,i={callback:t,args:null,isReady:!1};return this.imports.push(i),function(){i.args=Array.prototype.slice.call(arguments,0),i.isReady=!0,r.tryRun()}},i.prototype.addVariableImport=function(t){this.variableImports.push(t)},i.prototype.tryRun=function(){this._currentDepth++;try{for(;;){for(;this.imports.length>0;){var t=this.imports[0];if(!t.isReady)return;this.imports=this.imports.slice(1),t.callback.apply(null,t.args)}if(0===this.variableImports.length)break;var r=this.variableImports[0];this.variableImports=this.variableImports.slice(1),r()}}finally{this._currentDepth--}0===this._currentDepth&&this._onSequencerEmpty&&this._onSequencerEmpty()},r.exports=i,e(r.exports)?r.exports:e(t)?t:void 0});
//# sourceMappingURL=../../sourcemaps/engine/visitors/import-sequencer.js.map
