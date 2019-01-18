define([], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var debugInfo = function (context, ctx, lineSeparator) {
        var result = '';
        if (context.dumpLineNumbers && !context.compress) {
            switch (context.dumpLineNumbers) {
            case 'comments':
                result = debugInfo.asComment(ctx);
                break;
            case 'mediaquery':
                result = debugInfo.asMediaQuery(ctx);
                break;
            case 'all':
                result = debugInfo.asComment(ctx) + (lineSeparator || '') + debugInfo.asMediaQuery(ctx);
                break;
            }
        }
        return result;
    };
    debugInfo.asComment = function (ctx) {
        return '/* line ' + ctx.debugInfo.lineNumber + ', ' + ctx.debugInfo.fileName + ' */\n';
    };
    debugInfo.asMediaQuery = function (ctx) {
        var filenameWithProtocol = ctx.debugInfo.fileName;
        if (!/^[a-z]+:\/\//i.test(filenameWithProtocol)) {
            filenameWithProtocol = 'file://' + filenameWithProtocol;
        }
        return '@media -sass-debug-info{filename{font-family:' + filenameWithProtocol.replace(/([.:\/\\])/g, function (a) {
            if (a == '\\') {
                a = '/';
            }
            return '\\' + a;
        }) + '}line{font-family:\\00003' + ctx.debugInfo.lineNumber + '}}\n';
    };
    module.exports = debugInfo;
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