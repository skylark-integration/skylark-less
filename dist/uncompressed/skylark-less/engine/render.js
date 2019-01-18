define(['./utils'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var PromiseConstructor, utils = __module__0;
    module.exports = function (environment, ParseTree, ImportManager) {
        var render = function (input, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = utils.copyOptions(this.options, {});
            } else {
                options = utils.copyOptions(this.options, options || {});
            }
            if (!callback) {
                if (!PromiseConstructor) {
                    PromiseConstructor = Promise;
                }
                var self = this;
                return new PromiseConstructor(function (resolve, reject) {
                    render.call(self, input, options, function (err, output) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(output);
                        }
                    });
                });
            } else {
                this.parse(input, options, function (err, root, imports, options) {
                    if (err) {
                        return callback(err);
                    }
                    var result;
                    try {
                        var parseTree = new ParseTree(root, imports);
                        result = parseTree.toCSS(options);
                    } catch (err) {
                        return callback(err);
                    }
                    callback(null, result);
                });
            }
        };
        return render;
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