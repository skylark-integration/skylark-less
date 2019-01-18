define([], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = {
        extractId: function (href) {
            return href.replace(/^[a-z-]+:\/+?[^\/]+/, '').replace(/[\?\&]livereload=\w+/, '').replace(/^\//, '').replace(/\.[a-zA-Z]+$/, '').replace(/[^\.\w-]+/g, '-').replace(/\./g, ':');
        },
        addDataAttr: function (options, tag) {
            for (var opt in tag.dataset) {
                if (tag.dataset.hasOwnProperty(opt)) {
                    if (opt === 'env' || opt === 'dumpLineNumbers' || opt === 'rootpath' || opt === 'errorReporting') {
                        options[opt] = tag.dataset[opt];
                    } else {
                        try {
                            options[opt] = JSON.parse(tag.dataset[opt]);
                        } catch (_) {
                        }
                    }
                }
            }
        }
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