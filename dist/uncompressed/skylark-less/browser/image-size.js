define(['./../engine/functions/function-registry'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = function () {
        var functionRegistry = __module__0;
        function imageSize() {
            throw {
                type: 'Runtime',
                message: 'Image size functions are not supported in browser version of less'
            };
        }
        var imageFunctions = {
            'image-size': function (filePathNode) {
                imageSize(this, filePathNode);
                return -1;
            },
            'image-width': function (filePathNode) {
                imageSize(this, filePathNode);
                return -1;
            },
            'image-height': function (filePathNode) {
                imageSize(this, filePathNode);
                return -1;
            }
        };
        functionRegistry.addMultiple(imageFunctions);
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