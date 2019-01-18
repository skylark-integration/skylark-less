define([], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    function makeRegistry(base) {
        return {
            _data: {},
            add: function (name, func) {
                name = name.toLowerCase();
                if (this._data.hasOwnProperty(name)) {
                }
                this._data[name] = func;
            },
            addMultiple: function (functions) {
                Object.keys(functions).forEach(function (name) {
                    this.add(name, functions[name]);
                }.bind(this));
            },
            get: function (name) {
                return this._data[name] || base && base.get(name);
            },
            getLocalFunctions: function () {
                return this._data;
            },
            inherit: function () {
                return makeRegistry(this);
            },
            create: function (base) {
                return makeRegistry(base);
            }
        };
    }
    module.exports = makeRegistry(null);
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