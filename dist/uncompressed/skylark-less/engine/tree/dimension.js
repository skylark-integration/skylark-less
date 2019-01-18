define([
    './node',
    '../data/unit-conversions',
    './unit',
    './color'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, unitConversions = __module__1, Unit = __module__2, Color = __module__3;
    var Dimension = function (value, unit) {
        this.value = parseFloat(value);
        if (isNaN(this.value)) {
            throw new Error('Dimension is not a number.');
        }
        this.unit = unit && unit instanceof Unit ? unit : new Unit(unit ? [unit] : undefined);
        this.setParent(this.unit, this);
    };
    Dimension.prototype = new Node();
    Dimension.prototype.type = 'Dimension';
    Dimension.prototype.accept = function (visitor) {
        this.unit = visitor.visit(this.unit);
    };
    Dimension.prototype.eval = function (context) {
        return this;
    };
    Dimension.prototype.toColor = function () {
        return new Color([
            this.value,
            this.value,
            this.value
        ]);
    };
    Dimension.prototype.genCSS = function (context, output) {
        if (context && context.strictUnits && !this.unit.isSingular()) {
            throw new Error('Multiple units in dimension. Correct the units or use the unit function. Bad unit: ' + this.unit.toString());
        }
        var value = this.fround(context, this.value), strValue = String(value);
        if (value !== 0 && value < 0.000001 && value > -0.000001) {
            strValue = value.toFixed(20).replace(/0+$/, '');
        }
        if (context && context.compress) {
            if (value === 0 && this.unit.isLength()) {
                output.add(strValue);
                return;
            }
            if (value > 0 && value < 1) {
                strValue = strValue.substr(1);
            }
        }
        output.add(strValue);
        this.unit.genCSS(context, output);
    };
    Dimension.prototype.operate = function (context, op, other) {
        var value = this._operate(context, op, this.value, other.value), unit = this.unit.clone();
        if (op === '+' || op === '-') {
            if (unit.numerator.length === 0 && unit.denominator.length === 0) {
                unit = other.unit.clone();
                if (this.unit.backupUnit) {
                    unit.backupUnit = this.unit.backupUnit;
                }
            } else if (other.unit.numerator.length === 0 && unit.denominator.length === 0) {
            } else {
                other = other.convertTo(this.unit.usedUnits());
                if (context.strictUnits && other.unit.toString() !== unit.toString()) {
                    throw new Error("Incompatible units. Change the units or use the unit function. Bad units: '" + unit.toString() + "' and '" + other.unit.toString() + "'.");
                }
                value = this._operate(context, op, this.value, other.value);
            }
        } else if (op === '*') {
            unit.numerator = unit.numerator.concat(other.unit.numerator).sort();
            unit.denominator = unit.denominator.concat(other.unit.denominator).sort();
            unit.cancel();
        } else if (op === '/') {
            unit.numerator = unit.numerator.concat(other.unit.denominator).sort();
            unit.denominator = unit.denominator.concat(other.unit.numerator).sort();
            unit.cancel();
        }
        return new Dimension(value, unit);
    };
    Dimension.prototype.compare = function (other) {
        var a, b;
        if (!(other instanceof Dimension)) {
            return undefined;
        }
        if (this.unit.isEmpty() || other.unit.isEmpty()) {
            a = this;
            b = other;
        } else {
            a = this.unify();
            b = other.unify();
            if (a.unit.compare(b.unit) !== 0) {
                return undefined;
            }
        }
        return Node.numericCompare(a.value, b.value);
    };
    Dimension.prototype.unify = function () {
        return this.convertTo({
            length: 'px',
            duration: 's',
            angle: 'rad'
        });
    };
    Dimension.prototype.convertTo = function (conversions) {
        var value = this.value, unit = this.unit.clone(), i, groupName, group, targetUnit, derivedConversions = {}, applyUnit;
        if (typeof conversions === 'string') {
            for (i in unitConversions) {
                if (unitConversions[i].hasOwnProperty(conversions)) {
                    derivedConversions = {};
                    derivedConversions[i] = conversions;
                }
            }
            conversions = derivedConversions;
        }
        applyUnit = function (atomicUnit, denominator) {
            if (group.hasOwnProperty(atomicUnit)) {
                if (denominator) {
                    value = value / (group[atomicUnit] / group[targetUnit]);
                } else {
                    value = value * (group[atomicUnit] / group[targetUnit]);
                }
                return targetUnit;
            }
            return atomicUnit;
        };
        for (groupName in conversions) {
            if (conversions.hasOwnProperty(groupName)) {
                targetUnit = conversions[groupName];
                group = unitConversions[groupName];
                unit.map(applyUnit);
            }
        }
        unit.cancel();
        return new Dimension(value, unit);
    };
    module.exports = Dimension;
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