define([
    './contexts',
    './visitors/index',
    './tree/index'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var contexts = __module__0, visitor = __module__1, tree = __module__2;
    module.exports = function (root, options) {
        options = options || {};
        var evaldRoot, variables = options.variables, evalEnv = new contexts.Eval(options);
        if (typeof variables === 'object' && !Array.isArray(variables)) {
            variables = Object.keys(variables).map(function (k) {
                var value = variables[k];
                if (!(value instanceof tree.Value)) {
                    if (!(value instanceof tree.Expression)) {
                        value = new tree.Expression([value]);
                    }
                    value = new tree.Value([value]);
                }
                return new tree.Declaration('@' + k, value, false, null, 0);
            });
            evalEnv.frames = [new tree.Ruleset(null, variables)];
        }
        var visitors = [
                new visitor.JoinSelectorVisitor(),
                new visitor.MarkVisibleSelectorsVisitor(true),
                new visitor.ExtendVisitor(),
                new visitor.ToCSSVisitor({ compress: Boolean(options.compress) })
            ], preEvalVisitors = [], v, visitorIterator;
        if (options.pluginManager) {
            visitorIterator = options.pluginManager.visitor();
            for (var i = 0; i < 2; i++) {
                visitorIterator.first();
                while (v = visitorIterator.get()) {
                    if (v.isPreEvalVisitor) {
                        if (i === 0 || preEvalVisitors.indexOf(v) === -1) {
                            preEvalVisitors.push(v);
                            v.run(root);
                        }
                    } else {
                        if (i === 0 || visitors.indexOf(v) === -1) {
                            if (v.isPreVisitor) {
                                visitors.unshift(v);
                            } else {
                                visitors.push(v);
                            }
                        }
                    }
                }
            }
        }
        evaldRoot = root.eval(evalEnv);
        for (var i = 0; i < visitors.length; i++) {
            visitors[i].run(evaldRoot);
        }
        if (options.pluginManager) {
            visitorIterator.first();
            while (v = visitorIterator.get()) {
                if (visitors.indexOf(v) === -1 && preEvalVisitors.indexOf(v) === -1) {
                    v.run(evaldRoot);
                }
            }
        }
        return evaldRoot;
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