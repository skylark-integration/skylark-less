define([
    '../tree/dimension',
    '../tree/color',
    '../tree/expression',
    '../tree/quoted',
    '../tree/url',
    './function-registry'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = function (environment) {
        var Dimension = __module__0, Color = __module__1, Expression = __module__2, Quoted = __module__3, URL = __module__4, functionRegistry = __module__5;
        functionRegistry.add('svg-gradient', function (direction) {
            var stops, gradientDirectionSvg, gradientType = 'linear', rectangleDimension = 'x="0" y="0" width="1" height="1"', renderEnv = { compress: false }, returner, directionValue = direction.toCSS(renderEnv), i, color, position, positionValue, alpha;
            function throwArgumentDescriptor() {
                throw {
                    type: 'Argument',
                    message: 'svg-gradient expects direction, start_color [start_position], [color position,]...,' + ' end_color [end_position] or direction, color list'
                };
            }
            if (arguments.length == 2) {
                if (arguments[1].value.length < 2) {
                    throwArgumentDescriptor();
                }
                stops = arguments[1].value;
            } else if (arguments.length < 3) {
                throwArgumentDescriptor();
            } else {
                stops = Array.prototype.slice.call(arguments, 1);
            }
            switch (directionValue) {
            case 'to bottom':
                gradientDirectionSvg = 'x1="0%" y1="0%" x2="0%" y2="100%"';
                break;
            case 'to right':
                gradientDirectionSvg = 'x1="0%" y1="0%" x2="100%" y2="0%"';
                break;
            case 'to bottom right':
                gradientDirectionSvg = 'x1="0%" y1="0%" x2="100%" y2="100%"';
                break;
            case 'to top right':
                gradientDirectionSvg = 'x1="0%" y1="100%" x2="100%" y2="0%"';
                break;
            case 'ellipse':
            case 'ellipse at center':
                gradientType = 'radial';
                gradientDirectionSvg = 'cx="50%" cy="50%" r="75%"';
                rectangleDimension = 'x="-50" y="-50" width="101" height="101"';
                break;
            default:
                throw {
                    type: 'Argument',
                    message: "svg-gradient direction must be 'to bottom', 'to right'," + " 'to bottom right', 'to top right' or 'ellipse at center'"
                };
            }
            returner = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">' + '<' + gradientType + 'Gradient id="g" ' + gradientDirectionSvg + '>';
            for (i = 0; i < stops.length; i += 1) {
                if (stops[i] instanceof Expression) {
                    color = stops[i].value[0];
                    position = stops[i].value[1];
                } else {
                    color = stops[i];
                    position = undefined;
                }
                if (!(color instanceof Color) || !((i === 0 || i + 1 === stops.length) && position === undefined) && !(position instanceof Dimension)) {
                    throwArgumentDescriptor();
                }
                positionValue = position ? position.toCSS(renderEnv) : i === 0 ? '0%' : '100%';
                alpha = color.alpha;
                returner += '<stop offset="' + positionValue + '" stop-color="' + color.toRGB() + '"' + (alpha < 1 ? ' stop-opacity="' + alpha + '"' : '') + '/>';
            }
            returner += '</' + gradientType + 'Gradient>' + '<rect ' + rectangleDimension + ' fill="url(#g)" /></svg>';
            returner = encodeURIComponent(returner);
            returner = 'data:image/svg+xml,' + returner;
            return new URL(new Quoted("'" + returner + "'", returner, false, this.index, this.currentFileInfo), this.index, this.currentFileInfo);
        });
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