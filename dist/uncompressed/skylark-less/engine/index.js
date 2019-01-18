define([
    './data/index',
    './tree/index',
    './environment/environment',
    './environment/abstract-file-manager',
    './environment/abstract-plugin-loader',
    './visitors/index',
    './parser/parser',
    './functions/index',
    './contexts',
    './source-map-output',
    './source-map-builder',
    './parse-tree',
    './import-manager',
    './render',
    './parse',
    './less-error',
    './transform-tree',
    './utils',
    './plugin-manager',
    './logger'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6, __module__7, __module__8, __module__9, __module__10, __module__11, __module__12, __module__13, __module__14, __module__15, __module__16, __module__17, __module__18, __module__19) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = function (environment, fileManagers) {
        var SourceMapOutput, SourceMapBuilder, ParseTree, ImportManager, Environment;
        var initial = {
            version: [
                3,
                9,
                0
            ],
            data: __module__0,
            tree: __module__1,
            Environment: Environment = __module__2,
            AbstractFileManager: __module__3,
            AbstractPluginLoader: __module__4,
            environment: environment = new Environment(environment, fileManagers),
            visitors: __module__5,
            Parser: __module__6,
            functions: __module__7(environment),
            contexts: __module__8,
            SourceMapOutput: SourceMapOutput = __module__9(environment),
            SourceMapBuilder: SourceMapBuilder = __module__10(SourceMapOutput, environment),
            ParseTree: ParseTree = __module__11(SourceMapBuilder),
            ImportManager: ImportManager = __module__12(environment),
            render: __module__13(environment, ParseTree, ImportManager),
            parse: __module__14(environment, ParseTree, ImportManager),
            LessError: __module__15,
            transformTree: __module__16,
            utils: __module__17,
            PluginManager: __module__18,
            logger: __module__19
        };
        var ctor = function (t) {
            return function () {
                var obj = Object.create(t.prototype);
                t.apply(obj, Array.prototype.slice.call(arguments, 0));
                return obj;
            };
        };
        var t, api = Object.create(initial);
        for (var n in initial.tree) {
            t = initial.tree[n];
            if (typeof t === 'function') {
                api[n.toLowerCase()] = ctor(t);
            } else {
                api[n] = Object.create(null);
                for (var o in t) {
                    api[n][o.toLowerCase()] = ctor(t[o]);
                }
            }
        }
        return api;
    };
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