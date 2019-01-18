define([
    '../tree/quoted',
    '../tree/anonymous',
    '../tree/javascript',
    './function-registry'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Quoted = __module__0, Anonymous = __module__1, JavaScript = __module__2, functionRegistry = __module__3;
    functionRegistry.addMultiple({
        e: function (str) {
            return new Anonymous(str instanceof JavaScript ? str.evaluated : str.value);
        },
        escape: function (str) {
            return new Anonymous(encodeURI(str.value).replace(/=/g, '%3D').replace(/:/g, '%3A').replace(/#/g, '%23').replace(/;/g, '%3B').replace(/\(/g, '%28').replace(/\)/g, '%29'));
        },
        replace: function (string, pattern, replacement, flags) {
            var result = string.value;
            replacement = replacement.type === 'Quoted' ? replacement.value : replacement.toCSS();
            result = result.replace(new RegExp(pattern.value, flags ? flags.value : ''), replacement);
            return new Quoted(string.quote || '', result, string.escaped);
        },
        '%': function (string) {
            var args = Array.prototype.slice.call(arguments, 1), result = string.value;
            for (var i = 0; i < args.length; i++) {
                result = result.replace(/%[sda]/i, function (token) {
                    var value = args[i].type === 'Quoted' && token.match(/s/i) ? args[i].value : args[i].toCSS();
                    return token.match(/[A-Z]$/) ? encodeURIComponent(value) : value;
                });
            }
            result = result.replace(/%%/g, '%');
            return new Quoted(string.quote || '', result, string.escaped);
        }
    });
    function __isEmptyObject(obj) {
        var attr;
        for (attr in obj)
            return !1;
        return !0;
    }
    function __isValidToReturn(obj) {
        return typeof obj != 'object' || Array.isArray(obj) || !__isEmptyObject(obj);
    }
    if (__isValidToReturn(module.exports))
        return module.exports;
    else if (__isValidToReturn(exports))
        return exports;
});