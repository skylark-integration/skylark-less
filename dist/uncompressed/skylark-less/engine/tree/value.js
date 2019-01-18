define(['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var Value = function (value) {
        if (!value) {
            throw new Error('Value requires an array argument');
        }
        if (!Array.isArray(value)) {
            this.value = [value];
        } else {
            this.value = value;
        }
    };
    Value.prototype = new Node();
    Value.prototype.type = 'Value';
    Value.prototype.accept = function (visitor) {
        if (this.value) {
            this.value = visitor.visitArray(this.value);
        }
    };
    Value.prototype.eval = function (context) {
        if (this.value.length === 1) {
            return this.value[0].eval(context);
        } else {
            return new Value(this.value.map(function (v) {
                return v.eval(context);
            }));
        }
    };
    Value.prototype.genCSS = function (context, output) {
        var i;
        for (i = 0; i < this.value.length; i++) {
            this.value[i].genCSS(context, output);
            if (i + 1 < this.value.length) {
                output.add(context && context.compress ? ',' : ', ');
            }
        }
    };
    module.exports = Value;
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