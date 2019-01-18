define([], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = function (less, options) {
        var logLevel_debug = 4, logLevel_info = 3, logLevel_warn = 2, logLevel_error = 1;
        options.logLevel = typeof options.logLevel !== 'undefined' ? options.logLevel : options.env === 'development' ? logLevel_info : logLevel_error;
        if (!options.loggers) {
            options.loggers = [{
                    debug: function (msg) {
                        if (options.logLevel >= logLevel_debug) {
                            console.log(msg);
                        }
                    },
                    info: function (msg) {
                        if (options.logLevel >= logLevel_info) {
                            console.log(msg);
                        }
                    },
                    warn: function (msg) {
                        if (options.logLevel >= logLevel_warn) {
                            console.warn(msg);
                        }
                    },
                    error: function (msg) {
                        if (options.logLevel >= logLevel_error) {
                            console.error(msg);
                        }
                    }
                }];
        }
        for (var i = 0; i < options.loggers.length; i++) {
            less.logger.addListener(options.loggers[i]);
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