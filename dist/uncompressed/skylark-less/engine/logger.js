define([], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = {
        error: function (msg) {
            this._fireEvent('error', msg);
        },
        warn: function (msg) {
            this._fireEvent('warn', msg);
        },
        info: function (msg) {
            this._fireEvent('info', msg);
        },
        debug: function (msg) {
            this._fireEvent('debug', msg);
        },
        addListener: function (listener) {
            this._listeners.push(listener);
        },
        removeListener: function (listener) {
            for (var i = 0; i < this._listeners.length; i++) {
                if (this._listeners[i] === listener) {
                    this._listeners.splice(i, 1);
                    return;
                }
            }
        },
        _fireEvent: function (type, msg) {
            for (var i = 0; i < this._listeners.length; i++) {
                var logFunction = this._listeners[i][type];
                if (logFunction) {
                    logFunction(msg);
                }
            }
        },
        _listeners: []
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