/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                exports: null
            };
            require(id);
        } else {
            map[id] = factory;
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.exports) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args);
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx/skylark");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-langx/skylark',[], function() {
    var skylark = {

    };
    return skylark;
});

define('skylark-less/less',[
	"skylark-langx/skylark"
],function(skylark){
	return skylark.less = less;
});
define('skylark-less/engine/data/colors',[], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = {
        'aliceblue': '#f0f8ff',
        'antiquewhite': '#faebd7',
        'aqua': '#00ffff',
        'aquamarine': '#7fffd4',
        'azure': '#f0ffff',
        'beige': '#f5f5dc',
        'bisque': '#ffe4c4',
        'black': '#000000',
        'blanchedalmond': '#ffebcd',
        'blue': '#0000ff',
        'blueviolet': '#8a2be2',
        'brown': '#a52a2a',
        'burlywood': '#deb887',
        'cadetblue': '#5f9ea0',
        'chartreuse': '#7fff00',
        'chocolate': '#d2691e',
        'coral': '#ff7f50',
        'cornflowerblue': '#6495ed',
        'cornsilk': '#fff8dc',
        'crimson': '#dc143c',
        'cyan': '#00ffff',
        'darkblue': '#00008b',
        'darkcyan': '#008b8b',
        'darkgoldenrod': '#b8860b',
        'darkgray': '#a9a9a9',
        'darkgrey': '#a9a9a9',
        'darkgreen': '#006400',
        'darkkhaki': '#bdb76b',
        'darkmagenta': '#8b008b',
        'darkolivegreen': '#556b2f',
        'darkorange': '#ff8c00',
        'darkorchid': '#9932cc',
        'darkred': '#8b0000',
        'darksalmon': '#e9967a',
        'darkseagreen': '#8fbc8f',
        'darkslateblue': '#483d8b',
        'darkslategray': '#2f4f4f',
        'darkslategrey': '#2f4f4f',
        'darkturquoise': '#00ced1',
        'darkviolet': '#9400d3',
        'deeppink': '#ff1493',
        'deepskyblue': '#00bfff',
        'dimgray': '#696969',
        'dimgrey': '#696969',
        'dodgerblue': '#1e90ff',
        'firebrick': '#b22222',
        'floralwhite': '#fffaf0',
        'forestgreen': '#228b22',
        'fuchsia': '#ff00ff',
        'gainsboro': '#dcdcdc',
        'ghostwhite': '#f8f8ff',
        'gold': '#ffd700',
        'goldenrod': '#daa520',
        'gray': '#808080',
        'grey': '#808080',
        'green': '#008000',
        'greenyellow': '#adff2f',
        'honeydew': '#f0fff0',
        'hotpink': '#ff69b4',
        'indianred': '#cd5c5c',
        'indigo': '#4b0082',
        'ivory': '#fffff0',
        'khaki': '#f0e68c',
        'lavender': '#e6e6fa',
        'lavenderblush': '#fff0f5',
        'lawngreen': '#7cfc00',
        'lemonchiffon': '#fffacd',
        'lightblue': '#add8e6',
        'lightcoral': '#f08080',
        'lightcyan': '#e0ffff',
        'lightgoldenrodyellow': '#fafad2',
        'lightgray': '#d3d3d3',
        'lightgrey': '#d3d3d3',
        'lightgreen': '#90ee90',
        'lightpink': '#ffb6c1',
        'lightsalmon': '#ffa07a',
        'lightseagreen': '#20b2aa',
        'lightskyblue': '#87cefa',
        'lightslategray': '#778899',
        'lightslategrey': '#778899',
        'lightsteelblue': '#b0c4de',
        'lightyellow': '#ffffe0',
        'lime': '#00ff00',
        'limegreen': '#32cd32',
        'linen': '#faf0e6',
        'magenta': '#ff00ff',
        'maroon': '#800000',
        'mediumaquamarine': '#66cdaa',
        'mediumblue': '#0000cd',
        'mediumorchid': '#ba55d3',
        'mediumpurple': '#9370d8',
        'mediumseagreen': '#3cb371',
        'mediumslateblue': '#7b68ee',
        'mediumspringgreen': '#00fa9a',
        'mediumturquoise': '#48d1cc',
        'mediumvioletred': '#c71585',
        'midnightblue': '#191970',
        'mintcream': '#f5fffa',
        'mistyrose': '#ffe4e1',
        'moccasin': '#ffe4b5',
        'navajowhite': '#ffdead',
        'navy': '#000080',
        'oldlace': '#fdf5e6',
        'olive': '#808000',
        'olivedrab': '#6b8e23',
        'orange': '#ffa500',
        'orangered': '#ff4500',
        'orchid': '#da70d6',
        'palegoldenrod': '#eee8aa',
        'palegreen': '#98fb98',
        'paleturquoise': '#afeeee',
        'palevioletred': '#d87093',
        'papayawhip': '#ffefd5',
        'peachpuff': '#ffdab9',
        'peru': '#cd853f',
        'pink': '#ffc0cb',
        'plum': '#dda0dd',
        'powderblue': '#b0e0e6',
        'purple': '#800080',
        'rebeccapurple': '#663399',
        'red': '#ff0000',
        'rosybrown': '#bc8f8f',
        'royalblue': '#4169e1',
        'saddlebrown': '#8b4513',
        'salmon': '#fa8072',
        'sandybrown': '#f4a460',
        'seagreen': '#2e8b57',
        'seashell': '#fff5ee',
        'sienna': '#a0522d',
        'silver': '#c0c0c0',
        'skyblue': '#87ceeb',
        'slateblue': '#6a5acd',
        'slategray': '#708090',
        'slategrey': '#708090',
        'snow': '#fffafa',
        'springgreen': '#00ff7f',
        'steelblue': '#4682b4',
        'tan': '#d2b48c',
        'teal': '#008080',
        'thistle': '#d8bfd8',
        'tomato': '#ff6347',
        'turquoise': '#40e0d0',
        'violet': '#ee82ee',
        'wheat': '#f5deb3',
        'white': '#ffffff',
        'whitesmoke': '#f5f5f5',
        'yellow': '#ffff00',
        'yellowgreen': '#9acd32'
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
define('skylark-less/engine/data/unit-conversions',[], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = {
        length: {
            'm': 1,
            'cm': 0.01,
            'mm': 0.001,
            'in': 0.0254,
            'px': 0.0254 / 96,
            'pt': 0.0254 / 72,
            'pc': 0.0254 / 72 * 12
        },
        duration: {
            's': 1,
            'ms': 0.001
        },
        angle: {
            'rad': 1 / (2 * Math.PI),
            'deg': 1 / 360,
            'grad': 1 / 400,
            'turn': 1
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
define('skylark-less/engine/data/index',[
    './colors',
    './unit-conversions'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = {
        colors: __module__0,
        unitConversions: __module__1
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
define('skylark-less/engine/tree/node',[], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = function () {
        this.parent = null;
        this.visibilityBlocks = undefined;
        this.nodeVisible = undefined;
        this.rootNode = null;
        this.parsed = null;
        var self = this;
        Object.defineProperty(this, 'currentFileInfo', {
            get: function () {
                return self.fileInfo();
            }
        });
        Object.defineProperty(this, 'index', {
            get: function () {
                return self.getIndex();
            }
        });
    };
    Node.prototype.setParent = function (nodes, parent) {
        function set(node) {
            if (node && node instanceof Node) {
                node.parent = parent;
            }
        }
        if (Array.isArray(nodes)) {
            nodes.forEach(set);
        } else {
            set(nodes);
        }
    };
    Node.prototype.getIndex = function () {
        return this._index || this.parent && this.parent.getIndex() || 0;
    };
    Node.prototype.fileInfo = function () {
        return this._fileInfo || this.parent && this.parent.fileInfo() || {};
    };
    Node.prototype.isRulesetLike = function () {
        return false;
    };
    Node.prototype.toCSS = function (context) {
        var strs = [];
        this.genCSS(context, {
            add: function (chunk, fileInfo, index) {
                strs.push(chunk);
            },
            isEmpty: function () {
                return strs.length === 0;
            }
        });
        return strs.join('');
    };
    Node.prototype.genCSS = function (context, output) {
        output.add(this.value);
    };
    Node.prototype.accept = function (visitor) {
        this.value = visitor.visit(this.value);
    };
    Node.prototype.eval = function () {
        return this;
    };
    Node.prototype._operate = function (context, op, a, b) {
        switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        }
    };
    Node.prototype.fround = function (context, value) {
        var precision = context && context.numPrecision;
        return precision ? Number((value + 2e-16).toFixed(precision)) : value;
    };
    Node.compare = function (a, b) {
        if (a.compare && !(b.type === 'Quoted' || b.type === 'Anonymous')) {
            return a.compare(b);
        } else if (b.compare) {
            return -b.compare(a);
        } else if (a.type !== b.type) {
            return undefined;
        }
        a = a.value;
        b = b.value;
        if (!Array.isArray(a)) {
            return a === b ? 0 : undefined;
        }
        if (a.length !== b.length) {
            return undefined;
        }
        for (var i = 0; i < a.length; i++) {
            if (Node.compare(a[i], b[i]) !== 0) {
                return undefined;
            }
        }
        return 0;
    };
    Node.numericCompare = function (a, b) {
        return a < b ? -1 : a === b ? 0 : a > b ? 1 : undefined;
    };
    Node.prototype.blocksVisibility = function () {
        if (this.visibilityBlocks == null) {
            this.visibilityBlocks = 0;
        }
        return this.visibilityBlocks !== 0;
    };
    Node.prototype.addVisibilityBlock = function () {
        if (this.visibilityBlocks == null) {
            this.visibilityBlocks = 0;
        }
        this.visibilityBlocks = this.visibilityBlocks + 1;
    };
    Node.prototype.removeVisibilityBlock = function () {
        if (this.visibilityBlocks == null) {
            this.visibilityBlocks = 0;
        }
        this.visibilityBlocks = this.visibilityBlocks - 1;
    };
    Node.prototype.ensureVisibility = function () {
        this.nodeVisible = true;
    };
    Node.prototype.ensureInvisibility = function () {
        this.nodeVisible = false;
    };
    Node.prototype.isVisible = function () {
        return this.nodeVisible;
    };
    Node.prototype.visibilityInfo = function () {
        return {
            visibilityBlocks: this.visibilityBlocks,
            nodeVisible: this.nodeVisible
        };
    };
    Node.prototype.copyVisibilityInfo = function (info) {
        if (!info) {
            return;
        }
        this.visibilityBlocks = info.visibilityBlocks;
        this.nodeVisible = info.nodeVisible;
    };
    module.exports = Node;
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
define('skylark-less/engine/tree/color',[
    './node',
    '../data/colors'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, colors = __module__1;
    var Color = function (rgb, a, originalForm) {
        var self = this;
        if (Array.isArray(rgb)) {
            this.rgb = rgb;
        } else if (rgb.length >= 6) {
            this.rgb = [];
            rgb.match(/.{2}/g).map(function (c, i) {
                if (i < 3) {
                    self.rgb.push(parseInt(c, 16));
                } else {
                    self.alpha = parseInt(c, 16) / 255;
                }
            });
        } else {
            this.rgb = [];
            rgb.split('').map(function (c, i) {
                if (i < 3) {
                    self.rgb.push(parseInt(c + c, 16));
                } else {
                    self.alpha = parseInt(c + c, 16) / 255;
                }
            });
        }
        this.alpha = this.alpha || (typeof a === 'number' ? a : 1);
        if (typeof originalForm !== 'undefined') {
            this.value = originalForm;
        }
    };
    Color.prototype = new Node();
    Color.prototype.type = 'Color';
    function clamp(v, max) {
        return Math.min(Math.max(v, 0), max);
    }
    function toHex(v) {
        return '#' + v.map(function (c) {
            c = clamp(Math.round(c), 255);
            return (c < 16 ? '0' : '') + c.toString(16);
        }).join('');
    }
    Color.prototype.luma = function () {
        var r = this.rgb[0] / 255, g = this.rgb[1] / 255, b = this.rgb[2] / 255;
        r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
        g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
        b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    Color.prototype.genCSS = function (context, output) {
        output.add(this.toCSS(context));
    };
    Color.prototype.toCSS = function (context, doNotCompress) {
        var compress = context && context.compress && !doNotCompress, color, alpha, colorFunction, args = [];
        alpha = this.fround(context, this.alpha);
        if (this.value) {
            if (this.value.indexOf('rgb') === 0) {
                if (alpha < 1) {
                    colorFunction = 'rgba';
                }
            } else if (this.value.indexOf('hsl') === 0) {
                if (alpha < 1) {
                    colorFunction = 'hsla';
                } else {
                    colorFunction = 'hsl';
                }
            } else {
                return this.value;
            }
        } else {
            if (alpha < 1) {
                colorFunction = 'rgba';
            }
        }
        switch (colorFunction) {
        case 'rgba':
            args = this.rgb.map(function (c) {
                return clamp(Math.round(c), 255);
            }).concat(clamp(alpha, 1));
            break;
        case 'hsla':
            args.push(clamp(alpha, 1));
        case 'hsl':
            color = this.toHSL();
            args = [
                this.fround(context, color.h),
                this.fround(context, color.s * 100) + '%',
                this.fround(context, color.l * 100) + '%'
            ].concat(args);
        }
        if (colorFunction) {
            return colorFunction + '(' + args.join(',' + (compress ? '' : ' ')) + ')';
        }
        color = this.toRGB();
        if (compress) {
            var splitcolor = color.split('');
            if (splitcolor[1] === splitcolor[2] && splitcolor[3] === splitcolor[4] && splitcolor[5] === splitcolor[6]) {
                color = '#' + splitcolor[1] + splitcolor[3] + splitcolor[5];
            }
        }
        return color;
    };
    Color.prototype.operate = function (context, op, other) {
        var rgb = new Array(3);
        var alpha = this.alpha * (1 - other.alpha) + other.alpha;
        for (var c = 0; c < 3; c++) {
            rgb[c] = this._operate(context, op, this.rgb[c], other.rgb[c]);
        }
        return new Color(rgb, alpha);
    };
    Color.prototype.toRGB = function () {
        return toHex(this.rgb);
    };
    Color.prototype.toHSL = function () {
        var r = this.rgb[0] / 255, g = this.rgb[1] / 255, b = this.rgb[2] / 255, a = this.alpha;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2, d = max - min;
        if (max === min) {
            h = s = 0;
        } else {
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            }
            h /= 6;
        }
        return {
            h: h * 360,
            s: s,
            l: l,
            a: a
        };
    };
    Color.prototype.toHSV = function () {
        var r = this.rgb[0] / 255, g = this.rgb[1] / 255, b = this.rgb[2] / 255, a = this.alpha;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;
        var d = max - min;
        if (max === 0) {
            s = 0;
        } else {
            s = d / max;
        }
        if (max === min) {
            h = 0;
        } else {
            switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            }
            h /= 6;
        }
        return {
            h: h * 360,
            s: s,
            v: v,
            a: a
        };
    };
    Color.prototype.toARGB = function () {
        return toHex([this.alpha * 255].concat(this.rgb));
    };
    Color.prototype.compare = function (x) {
        return x.rgb && x.rgb[0] === this.rgb[0] && x.rgb[1] === this.rgb[1] && x.rgb[2] === this.rgb[2] && x.alpha === this.alpha ? 0 : undefined;
    };
    Color.fromKeyword = function (keyword) {
        var c, key = keyword.toLowerCase();
        if (colors.hasOwnProperty(key)) {
            c = new Color(colors[key].slice(1));
        } else if (key === 'transparent') {
            c = new Color([
                0,
                0,
                0
            ], 0);
        }
        if (c) {
            c.value = keyword;
            return c;
        }
    };
    module.exports = Color;
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
define('skylark-less/engine/tree/paren',['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var Paren = function (node) {
        this.value = node;
    };
    Paren.prototype = new Node();
    Paren.prototype.type = 'Paren';
    Paren.prototype.genCSS = function (context, output) {
        output.add('(');
        this.value.genCSS(context, output);
        output.add(')');
    };
    Paren.prototype.eval = function (context) {
        return new Paren(this.value.eval(context));
    };
    module.exports = Paren;
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
define('skylark-less/engine/tree/combinator',['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var Combinator = function (value) {
        if (value === ' ') {
            this.value = ' ';
            this.emptyOrWhitespace = true;
        } else {
            this.value = value ? value.trim() : '';
            this.emptyOrWhitespace = this.value === '';
        }
    };
    Combinator.prototype = new Node();
    Combinator.prototype.type = 'Combinator';
    var _noSpaceCombinators = {
        '': true,
        ' ': true,
        '|': true
    };
    Combinator.prototype.genCSS = function (context, output) {
        var spaceOrEmpty = context.compress || _noSpaceCombinators[this.value] ? '' : ' ';
        output.add(spaceOrEmpty + this.value + spaceOrEmpty);
    };
    module.exports = Combinator;
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
define('skylark-less/engine/tree/element',[
    './node',
    './paren',
    './combinator'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Paren = __module__1, Combinator = __module__2;
    var Element = function (combinator, value, isVariable, index, currentFileInfo, visibilityInfo) {
        this.combinator = combinator instanceof Combinator ? combinator : new Combinator(combinator);
        if (typeof value === 'string') {
            this.value = value.trim();
        } else if (value) {
            this.value = value;
        } else {
            this.value = '';
        }
        this.isVariable = isVariable;
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.copyVisibilityInfo(visibilityInfo);
        this.setParent(this.combinator, this);
    };
    Element.prototype = new Node();
    Element.prototype.type = 'Element';
    Element.prototype.accept = function (visitor) {
        var value = this.value;
        this.combinator = visitor.visit(this.combinator);
        if (typeof value === 'object') {
            this.value = visitor.visit(value);
        }
    };
    Element.prototype.eval = function (context) {
        return new Element(this.combinator, this.value.eval ? this.value.eval(context) : this.value, this.isVariable, this.getIndex(), this.fileInfo(), this.visibilityInfo());
    };
    Element.prototype.clone = function () {
        return new Element(this.combinator, this.value, this.isVariable, this.getIndex(), this.fileInfo(), this.visibilityInfo());
    };
    Element.prototype.genCSS = function (context, output) {
        output.add(this.toCSS(context), this.fileInfo(), this.getIndex());
    };
    Element.prototype.toCSS = function (context) {
        context = context || {};
        var value = this.value, firstSelector = context.firstSelector;
        if (value instanceof Paren) {
            context.firstSelector = true;
        }
        value = value.toCSS ? value.toCSS(context) : value;
        context.firstSelector = firstSelector;
        if (value === '' && this.combinator.value.charAt(0) === '&') {
            return '';
        } else {
            return this.combinator.toCSS(context) + value;
        }
    };
    module.exports = Element;
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
define('skylark-less/engine/constants',[], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = {
        Math: {
            ALWAYS: 0,
            PARENS_DIVISION: 1,
            PARENS: 2,
            STRICT_LEGACY: 3
        },
        RewriteUrls: {
            OFF: 0,
            LOCAL: 1,
            ALL: 2
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
define('skylark-less/engine/utils',['./constants'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Constants = __module__0;
    var utils = {
        getLocation: function (index, inputStream) {
            var n = index + 1, line = null, column = -1;
            while (--n >= 0 && inputStream.charAt(n) !== '\n') {
                column++;
            }
            if (typeof index === 'number') {
                line = (inputStream.slice(0, index).match(/\n/g) || '').length;
            }
            return {
                line: line,
                column: column
            };
        },
        copyArray: function (arr) {
            var i, length = arr.length, copy = new Array(length);
            for (i = 0; i < length; i++) {
                copy[i] = arr[i];
            }
            return copy;
        },
        clone: function (obj) {
            var cloned = {};
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    cloned[prop] = obj[prop];
                }
            }
            return cloned;
        },
        copyOptions: function (obj1, obj2) {
            if (obj2 && obj2._defaults) {
                return obj2;
            }
            var opts = utils.defaults(obj1, obj2);
            if (opts.strictMath) {
                opts.math = Constants.Math.STRICT_LEGACY;
            }
            if (opts.relativeUrls) {
                opts.rewriteUrls = Constants.RewriteUrls.ALL;
            }
            if (typeof opts.math === 'string') {
                switch (opts.math.toLowerCase()) {
                case 'always':
                    opts.math = Constants.Math.ALWAYS;
                    break;
                case 'parens-division':
                    opts.math = Constants.Math.PARENS_DIVISION;
                    break;
                case 'strict':
                case 'parens':
                    opts.math = Constants.Math.PARENS;
                    break;
                case 'strict-legacy':
                    opts.math = Constants.Math.STRICT_LEGACY;
                }
            }
            if (typeof opts.rewriteUrls === 'string') {
                switch (opts.rewriteUrls.toLowerCase()) {
                case 'off':
                    opts.rewriteUrls = Constants.RewriteUrls.OFF;
                    break;
                case 'local':
                    opts.rewriteUrls = Constants.RewriteUrls.LOCAL;
                    break;
                case 'all':
                    opts.rewriteUrls = Constants.RewriteUrls.ALL;
                    break;
                }
            }
            return opts;
        },
        defaults: function (obj1, obj2) {
            var newObj = obj2 || {};
            if (!obj2._defaults) {
                newObj = {};
                var defaults = utils.clone(obj1);
                newObj._defaults = defaults;
                var cloned = obj2 ? utils.clone(obj2) : {};
                Object.assign(newObj, defaults, cloned);
            }
            return newObj;
        },
        merge: function (obj1, obj2) {
            for (var prop in obj2) {
                if (obj2.hasOwnProperty(prop)) {
                    obj1[prop] = obj2[prop];
                }
            }
            return obj1;
        },
        flattenArray: function (arr, result) {
            result = result || [];
            for (var i = 0, length = arr.length; i < length; i++) {
                var value = arr[i];
                if (Array.isArray(value)) {
                    utils.flattenArray(value, result);
                } else {
                    if (value !== undefined) {
                        result.push(value);
                    }
                }
            }
            return result;
        }
    };
    module.exports = utils;
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
define('skylark-less/engine/less-error',['./utils'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var utils = __module__0;
    var LessError = module.exports = function LessError(e, fileContentMap, currentFilename) {
        Error.call(this);
        var filename = e.filename || currentFilename;
        this.message = e.message;
        this.stack = e.stack;
        if (fileContentMap && filename) {
            var input = fileContentMap.contents[filename], loc = utils.getLocation(e.index, input), line = loc.line, col = loc.column, callLine = e.call && utils.getLocation(e.call, input).line, lines = input ? input.split('\n') : '';
            this.type = e.type || 'Syntax';
            this.filename = filename;
            this.index = e.index;
            this.line = typeof line === 'number' ? line + 1 : null;
            this.column = col;
            if (!this.line && this.stack) {
                var found = this.stack.match(/(<anonymous>|Function):(\d+):(\d+)/);
                if (found) {
                    if (found[2]) {
                        this.line = parseInt(found[2]) - 2;
                    }
                    if (found[3]) {
                        this.column = parseInt(found[3]);
                    }
                }
            }
            this.callLine = callLine + 1;
            this.callExtract = lines[callLine];
            this.extract = [
                lines[this.line - 2],
                lines[this.line - 1],
                lines[this.line]
            ];
        }
    };
    if (typeof Object.create === 'undefined') {
        var F = function () {
        };
        F.prototype = Error.prototype;
        LessError.prototype = new F();
    } else {
        LessError.prototype = Object.create(Error.prototype);
    }
    LessError.prototype.constructor = LessError;
    LessError.prototype.toString = function (options) {
        options = options || {};
        var message = '';
        var extract = this.extract || [];
        var error = [];
        var stylize = function (str) {
            return str;
        };
        if (options.stylize) {
            var type = typeof options.stylize;
            if (type !== 'function') {
                throw Error('options.stylize should be a function, got a ' + type + '!');
            }
            stylize = options.stylize;
        }
        if (this.line !== null) {
            if (typeof extract[0] === 'string') {
                error.push(stylize(this.line - 1 + ' ' + extract[0], 'grey'));
            }
            if (typeof extract[1] === 'string') {
                var errorTxt = this.line + ' ';
                if (extract[1]) {
                    errorTxt += extract[1].slice(0, this.column) + stylize(stylize(stylize(extract[1].substr(this.column, 1), 'bold') + extract[1].slice(this.column + 1), 'red'), 'inverse');
                }
                error.push(errorTxt);
            }
            if (typeof extract[2] === 'string') {
                error.push(stylize(this.line + 1 + ' ' + extract[2], 'grey'));
            }
            error = error.join('\n') + stylize('', 'reset') + '\n';
        }
        message += stylize(this.type + 'Error: ' + this.message, 'red');
        if (this.filename) {
            message += stylize(' in ', 'red') + this.filename;
        }
        if (this.line) {
            message += stylize(' on line ' + this.line + ', column ' + (this.column + 1) + ':', 'grey');
        }
        message += '\n' + error;
        if (this.callLine) {
            message += stylize('from ', 'red') + (this.filename || '') + '/n';
            message += stylize(this.callLine, 'grey') + ' ' + this.callExtract + '/n';
        }
        return message;
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
define('skylark-less/engine/tree/selector',[
    './node',
    './element',
    '../less-error'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Element = __module__1, LessError = __module__2;
    var Selector = function (elements, extendList, condition, index, currentFileInfo, visibilityInfo) {
        this.extendList = extendList;
        this.condition = condition;
        this.evaldCondition = !condition;
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.elements = this.getElements(elements);
        this.mixinElements_ = undefined;
        this.copyVisibilityInfo(visibilityInfo);
        this.setParent(this.elements, this);
    };
    Selector.prototype = new Node();
    Selector.prototype.type = 'Selector';
    Selector.prototype.accept = function (visitor) {
        if (this.elements) {
            this.elements = visitor.visitArray(this.elements);
        }
        if (this.extendList) {
            this.extendList = visitor.visitArray(this.extendList);
        }
        if (this.condition) {
            this.condition = visitor.visit(this.condition);
        }
    };
    Selector.prototype.createDerived = function (elements, extendList, evaldCondition) {
        elements = this.getElements(elements);
        var newSelector = new Selector(elements, extendList || this.extendList, null, this.getIndex(), this.fileInfo(), this.visibilityInfo());
        newSelector.evaldCondition = evaldCondition != null ? evaldCondition : this.evaldCondition;
        newSelector.mediaEmpty = this.mediaEmpty;
        return newSelector;
    };
    Selector.prototype.getElements = function (els) {
        if (!els) {
            return [new Element('', '&', false, this._index, this._fileInfo)];
        }
        if (typeof els === 'string') {
            this.parse.parseNode(els, ['selector'], this._index, this._fileInfo, function (err, result) {
                if (err) {
                    throw new LessError({
                        index: err.index,
                        message: err.message
                    }, this.parse.imports, this._fileInfo.filename);
                }
                els = result[0].elements;
            });
        }
        return els;
    };
    Selector.prototype.createEmptySelectors = function () {
        var el = new Element('', '&', false, this._index, this._fileInfo), sels = [new Selector([el], null, null, this._index, this._fileInfo)];
        sels[0].mediaEmpty = true;
        return sels;
    };
    Selector.prototype.match = function (other) {
        var elements = this.elements, len = elements.length, olen, i;
        other = other.mixinElements();
        olen = other.length;
        if (olen === 0 || len < olen) {
            return 0;
        } else {
            for (i = 0; i < olen; i++) {
                if (elements[i].value !== other[i]) {
                    return 0;
                }
            }
        }
        return olen;
    };
    Selector.prototype.mixinElements = function () {
        if (this.mixinElements_) {
            return this.mixinElements_;
        }
        var elements = this.elements.map(function (v) {
            return v.combinator.value + (v.value.value || v.value);
        }).join('').match(/[,&#\*\.\w-]([\w-]|(\\.))*/g);
        if (elements) {
            if (elements[0] === '&') {
                elements.shift();
            }
        } else {
            elements = [];
        }
        return this.mixinElements_ = elements;
    };
    Selector.prototype.isJustParentSelector = function () {
        return !this.mediaEmpty && this.elements.length === 1 && this.elements[0].value === '&' && (this.elements[0].combinator.value === ' ' || this.elements[0].combinator.value === '');
    };
    Selector.prototype.eval = function (context) {
        var evaldCondition = this.condition && this.condition.eval(context), elements = this.elements, extendList = this.extendList;
        elements = elements && elements.map(function (e) {
            return e.eval(context);
        });
        extendList = extendList && extendList.map(function (extend) {
            return extend.eval(context);
        });
        return this.createDerived(elements, extendList, evaldCondition);
    };
    Selector.prototype.genCSS = function (context, output) {
        var i, element;
        if ((!context || !context.firstSelector) && this.elements[0].combinator.value === '') {
            output.add(' ', this.fileInfo(), this.getIndex());
        }
        for (i = 0; i < this.elements.length; i++) {
            element = this.elements[i];
            element.genCSS(context, output);
        }
    };
    Selector.prototype.getIsOutput = function () {
        return this.evaldCondition;
    };
    module.exports = Selector;
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
define('skylark-less/engine/tree/value',['./node'], function (__module__0) {
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
define('skylark-less/engine/tree/keyword',['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var Keyword = function (value) {
        this.value = value;
    };
    Keyword.prototype = new Node();
    Keyword.prototype.type = 'Keyword';
    Keyword.prototype.genCSS = function (context, output) {
        if (this.value === '%') {
            throw {
                type: 'Syntax',
                message: 'Invalid % without number'
            };
        }
        output.add(this.value);
    };
    Keyword.True = new Keyword('true');
    Keyword.False = new Keyword('false');
    module.exports = Keyword;
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
define('skylark-less/engine/tree/anonymous',['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var Anonymous = function (value, index, currentFileInfo, mapLines, rulesetLike, visibilityInfo) {
        this.value = value;
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.mapLines = mapLines;
        this.rulesetLike = typeof rulesetLike === 'undefined' ? false : rulesetLike;
        this.allowRoot = true;
        this.copyVisibilityInfo(visibilityInfo);
    };
    Anonymous.prototype = new Node();
    Anonymous.prototype.type = 'Anonymous';
    Anonymous.prototype.eval = function () {
        return new Anonymous(this.value, this._index, this._fileInfo, this.mapLines, this.rulesetLike, this.visibilityInfo());
    };
    Anonymous.prototype.compare = function (other) {
        return other.toCSS && this.toCSS() === other.toCSS() ? 0 : undefined;
    };
    Anonymous.prototype.isRulesetLike = function () {
        return this.rulesetLike;
    };
    Anonymous.prototype.genCSS = function (context, output) {
        this.nodeVisible = Boolean(this.value);
        if (this.nodeVisible) {
            output.add(this.value, this._fileInfo, this._index, this.mapLines);
        }
    };
    module.exports = Anonymous;
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
define('skylark-less/engine/tree/declaration',[
    './node',
    './value',
    './keyword',
    './anonymous',
    '../constants'
], function (__module__0, __module__1, __module__2, __module__3, __module__4) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Value = __module__1, Keyword = __module__2, Anonymous = __module__3, MATH = __module__4.Math;
    var Declaration = function (name, value, important, merge, index, currentFileInfo, inline, variable) {
        this.name = name;
        this.value = value instanceof Node ? value : new Value([value ? new Anonymous(value) : null]);
        this.important = important ? ' ' + important.trim() : '';
        this.merge = merge;
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.inline = inline || false;
        this.variable = variable !== undefined ? variable : name.charAt && name.charAt(0) === '@';
        this.allowRoot = true;
        this.setParent(this.value, this);
    };
    function evalName(context, name) {
        var value = '', i, n = name.length, output = {
                add: function (s) {
                    value += s;
                }
            };
        for (i = 0; i < n; i++) {
            name[i].eval(context).genCSS(context, output);
        }
        return value;
    }
    Declaration.prototype = new Node();
    Declaration.prototype.type = 'Declaration';
    Declaration.prototype.genCSS = function (context, output) {
        output.add(this.name + (context.compress ? ':' : ': '), this.fileInfo(), this.getIndex());
        try {
            this.value.genCSS(context, output);
        } catch (e) {
            e.index = this._index;
            e.filename = this._fileInfo.filename;
            throw e;
        }
        output.add(this.important + (this.inline || context.lastRule && context.compress ? '' : ';'), this._fileInfo, this._index);
    };
    Declaration.prototype.eval = function (context) {
        var mathBypass = false, prevMath, name = this.name, evaldValue, variable = this.variable;
        if (typeof name !== 'string') {
            name = name.length === 1 && name[0] instanceof Keyword ? name[0].value : evalName(context, name);
            variable = false;
        }
        if (name === 'font' && context.math === MATH.ALWAYS) {
            mathBypass = true;
            prevMath = context.math;
            context.math = MATH.PARENS_DIVISION;
        }
        try {
            context.importantScope.push({});
            evaldValue = this.value.eval(context);
            if (!this.variable && evaldValue.type === 'DetachedRuleset') {
                throw {
                    message: 'Rulesets cannot be evaluated on a property.',
                    index: this.getIndex(),
                    filename: this.fileInfo().filename
                };
            }
            var important = this.important, importantResult = context.importantScope.pop();
            if (!important && importantResult.important) {
                important = importantResult.important;
            }
            return new Declaration(name, evaldValue, important, this.merge, this.getIndex(), this.fileInfo(), this.inline, variable);
        } catch (e) {
            if (typeof e.index !== 'number') {
                e.index = this.getIndex();
                e.filename = this.fileInfo().filename;
            }
            throw e;
        } finally {
            if (mathBypass) {
                context.math = prevMath;
            }
        }
    };
    Declaration.prototype.makeImportant = function () {
        return new Declaration(this.name, this.value, '!important', this.merge, this.getIndex(), this.fileInfo(), this.inline);
    };
    module.exports = Declaration;
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
define('skylark-less/engine/tree/debug-info',[], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var debugInfo = function (context, ctx, lineSeparator) {
        var result = '';
        if (context.dumpLineNumbers && !context.compress) {
            switch (context.dumpLineNumbers) {
            case 'comments':
                result = debugInfo.asComment(ctx);
                break;
            case 'mediaquery':
                result = debugInfo.asMediaQuery(ctx);
                break;
            case 'all':
                result = debugInfo.asComment(ctx) + (lineSeparator || '') + debugInfo.asMediaQuery(ctx);
                break;
            }
        }
        return result;
    };
    debugInfo.asComment = function (ctx) {
        return '/* line ' + ctx.debugInfo.lineNumber + ', ' + ctx.debugInfo.fileName + ' */\n';
    };
    debugInfo.asMediaQuery = function (ctx) {
        var filenameWithProtocol = ctx.debugInfo.fileName;
        if (!/^[a-z]+:\/\//i.test(filenameWithProtocol)) {
            filenameWithProtocol = 'file://' + filenameWithProtocol;
        }
        return '@media -sass-debug-info{filename{font-family:' + filenameWithProtocol.replace(/([.:\/\\])/g, function (a) {
            if (a == '\\') {
                a = '/';
            }
            return '\\' + a;
        }) + '}line{font-family:\\00003' + ctx.debugInfo.lineNumber + '}}\n';
    };
    module.exports = debugInfo;
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
define('skylark-less/engine/tree/comment',[
    './node',
    './debug-info'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, getDebugInfo = __module__1;
    var Comment = function (value, isLineComment, index, currentFileInfo) {
        this.value = value;
        this.isLineComment = isLineComment;
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.allowRoot = true;
    };
    Comment.prototype = new Node();
    Comment.prototype.type = 'Comment';
    Comment.prototype.genCSS = function (context, output) {
        if (this.debugInfo) {
            output.add(getDebugInfo(context, this), this.fileInfo(), this.getIndex());
        }
        output.add(this.value);
    };
    Comment.prototype.isSilent = function (context) {
        var isCompressed = context.compress && this.value[2] !== '!';
        return this.isLineComment || isCompressed;
    };
    module.exports = Comment;
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
define('skylark-less/engine/contexts',['./constants'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var contexts = {};
    module.exports = contexts;
    var Constants = __module__0;
    var copyFromOriginal = function copyFromOriginal(original, destination, propertiesToCopy) {
        if (!original) {
            return;
        }
        for (var i = 0; i < propertiesToCopy.length; i++) {
            if (original.hasOwnProperty(propertiesToCopy[i])) {
                destination[propertiesToCopy[i]] = original[propertiesToCopy[i]];
            }
        }
    };
    var parseCopyProperties = [
        'paths',
        'rewriteUrls',
        'rootpath',
        'strictImports',
        'insecure',
        'dumpLineNumbers',
        'compress',
        'syncImport',
        'chunkInput',
        'mime',
        'useFileCache',
        'processImports',
        'pluginManager'
    ];
    contexts.Parse = function (options) {
        copyFromOriginal(options, this, parseCopyProperties);
        if (typeof this.paths === 'string') {
            this.paths = [this.paths];
        }
    };
    var evalCopyProperties = [
        'paths',
        'compress',
        'ieCompat',
        'math',
        'strictUnits',
        'sourceMap',
        'importMultiple',
        'urlArgs',
        'javascriptEnabled',
        'pluginManager',
        'importantScope',
        'rewriteUrls'
    ];
    contexts.Eval = function (options, frames) {
        copyFromOriginal(options, this, evalCopyProperties);
        if (typeof this.paths === 'string') {
            this.paths = [this.paths];
        }
        this.frames = frames || [];
        this.importantScope = this.importantScope || [];
    };
    contexts.Eval.prototype.enterCalc = function () {
        if (!this.calcStack) {
            this.calcStack = [];
        }
        this.calcStack.push(true);
        this.inCalc = true;
    };
    contexts.Eval.prototype.exitCalc = function () {
        this.calcStack.pop();
        if (!this.calcStack) {
            this.inCalc = false;
        }
    };
    contexts.Eval.prototype.inParenthesis = function () {
        if (!this.parensStack) {
            this.parensStack = [];
        }
        this.parensStack.push(true);
    };
    contexts.Eval.prototype.outOfParenthesis = function () {
        this.parensStack.pop();
    };
    contexts.Eval.prototype.inCalc = false;
    contexts.Eval.prototype.mathOn = true;
    contexts.Eval.prototype.isMathOn = function (op) {
        if (!this.mathOn) {
            return false;
        }
        if (op === '/' && this.math !== Constants.Math.ALWAYS && (!this.parensStack || !this.parensStack.length)) {
            return false;
        }
        if (this.math > Constants.Math.PARENS_DIVISION) {
            return this.parensStack && this.parensStack.length;
        }
        return true;
    };
    contexts.Eval.prototype.pathRequiresRewrite = function (path) {
        var isRelative = this.rewriteUrls === Constants.RewriteUrls.LOCAL ? isPathLocalRelative : isPathRelative;
        return isRelative(path);
    };
    contexts.Eval.prototype.rewritePath = function (path, rootpath) {
        var newPath;
        rootpath = rootpath || '';
        newPath = this.normalizePath(rootpath + path);
        if (isPathLocalRelative(path) && isPathRelative(rootpath) && isPathLocalRelative(newPath) === false) {
            newPath = './' + newPath;
        }
        return newPath;
    };
    contexts.Eval.prototype.normalizePath = function (path) {
        var segments = path.split('/').reverse(), segment;
        path = [];
        while (segments.length !== 0) {
            segment = segments.pop();
            switch (segment) {
            case '.':
                break;
            case '..':
                if (path.length === 0 || path[path.length - 1] === '..') {
                    path.push(segment);
                } else {
                    path.pop();
                }
                break;
            default:
                path.push(segment);
                break;
            }
        }
        return path.join('/');
    };
    function isPathRelative(path) {
        return !/^(?:[a-z-]+:|\/|#)/i.test(path);
    }
    function isPathLocalRelative(path) {
        return path.charAt(0) === '.';
    }
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
define('skylark-less/engine/functions/function-registry',[], function () {
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
define('skylark-less/engine/functions/default',[
    '../tree/keyword',
    './function-registry'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Keyword = __module__0, functionRegistry = __module__1;
    var defaultFunc = {
        eval: function () {
            var v = this.value_, e = this.error_;
            if (e) {
                throw e;
            }
            if (v != null) {
                return v ? Keyword.True : Keyword.False;
            }
        },
        value: function (v) {
            this.value_ = v;
        },
        error: function (e) {
            this.error_ = e;
        },
        reset: function () {
            this.value_ = this.error_ = null;
        }
    };
    functionRegistry.add('default', defaultFunc.eval.bind(defaultFunc));
    module.exports = defaultFunc;
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
define('skylark-less/engine/tree/ruleset',[
    './node',
    './declaration',
    './keyword',
    './comment',
    './paren',
    './selector',
    './element',
    './anonymous',
    '../contexts',
    '../functions/function-registry',
    '../functions/default',
    './debug-info',
    '../utils'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6, __module__7, __module__8, __module__9, __module__10, __module__11, __module__12) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Declaration = __module__1, Keyword = __module__2, Comment = __module__3, Paren = __module__4, Selector = __module__5, Element = __module__6, Anonymous = __module__7, contexts = __module__8, globalFunctionRegistry = __module__9, defaultFunc = __module__10, getDebugInfo = __module__11, utils = __module__12;
    var Ruleset = function (selectors, rules, strictImports, visibilityInfo) {
        this.selectors = selectors;
        this.rules = rules;
        this._lookups = {};
        this._variables = null;
        this._properties = null;
        this.strictImports = strictImports;
        this.copyVisibilityInfo(visibilityInfo);
        this.allowRoot = true;
        this.setParent(this.selectors, this);
        this.setParent(this.rules, this);
    };
    Ruleset.prototype = new Node();
    Ruleset.prototype.type = 'Ruleset';
    Ruleset.prototype.isRuleset = true;
    Ruleset.prototype.isRulesetLike = function () {
        return true;
    };
    Ruleset.prototype.accept = function (visitor) {
        if (this.paths) {
            this.paths = visitor.visitArray(this.paths, true);
        } else if (this.selectors) {
            this.selectors = visitor.visitArray(this.selectors);
        }
        if (this.rules && this.rules.length) {
            this.rules = visitor.visitArray(this.rules);
        }
    };
    Ruleset.prototype.eval = function (context) {
        var that = this, selectors, selCnt, selector, i, hasVariable, hasOnePassingSelector = false;
        if (this.selectors && (selCnt = this.selectors.length)) {
            selectors = new Array(selCnt);
            defaultFunc.error({
                type: 'Syntax',
                message: 'it is currently only allowed in parametric mixin guards,'
            });
            for (i = 0; i < selCnt; i++) {
                selector = this.selectors[i].eval(context);
                for (var j = 0; j < selector.elements.length; j++) {
                    if (selector.elements[j].isVariable) {
                        hasVariable = true;
                        break;
                    }
                }
                selectors[i] = selector;
                if (selector.evaldCondition) {
                    hasOnePassingSelector = true;
                }
            }
            if (hasVariable) {
                var toParseSelectors = new Array(selCnt);
                for (i = 0; i < selCnt; i++) {
                    selector = selectors[i];
                    toParseSelectors[i] = selector.toCSS(context);
                }
                this.parse.parseNode(toParseSelectors.join(','), ['selectors'], selectors[0].getIndex(), selectors[0].fileInfo(), function (err, result) {
                    if (result) {
                        selectors = utils.flattenArray(result);
                    }
                });
            }
            defaultFunc.reset();
        } else {
            hasOnePassingSelector = true;
        }
        var rules = this.rules ? utils.copyArray(this.rules) : null, ruleset = new Ruleset(selectors, rules, this.strictImports, this.visibilityInfo()), rule, subRule;
        ruleset.originalRuleset = this;
        ruleset.root = this.root;
        ruleset.firstRoot = this.firstRoot;
        ruleset.allowImports = this.allowImports;
        if (this.debugInfo) {
            ruleset.debugInfo = this.debugInfo;
        }
        if (!hasOnePassingSelector) {
            rules.length = 0;
        }
        ruleset.functionRegistry = function (frames) {
            var i = 0, n = frames.length, found;
            for (; i !== n; ++i) {
                found = frames[i].functionRegistry;
                if (found) {
                    return found;
                }
            }
            return globalFunctionRegistry;
        }(context.frames).inherit();
        var ctxFrames = context.frames;
        ctxFrames.unshift(ruleset);
        var ctxSelectors = context.selectors;
        if (!ctxSelectors) {
            context.selectors = ctxSelectors = [];
        }
        ctxSelectors.unshift(this.selectors);
        if (ruleset.root || ruleset.allowImports || !ruleset.strictImports) {
            ruleset.evalImports(context);
        }
        var rsRules = ruleset.rules;
        for (i = 0; rule = rsRules[i]; i++) {
            if (rule.evalFirst) {
                rsRules[i] = rule.eval(context);
            }
        }
        var mediaBlockCount = context.mediaBlocks && context.mediaBlocks.length || 0;
        for (i = 0; rule = rsRules[i]; i++) {
            if (rule.type === 'MixinCall') {
                rules = rule.eval(context).filter(function (r) {
                    if (r instanceof Declaration && r.variable) {
                        return !ruleset.variable(r.name);
                    }
                    return true;
                });
                rsRules.splice.apply(rsRules, [
                    i,
                    1
                ].concat(rules));
                i += rules.length - 1;
                ruleset.resetCache();
            } else if (rule.type === 'VariableCall') {
                rules = rule.eval(context).rules.filter(function (r) {
                    if (r instanceof Declaration && r.variable) {
                        return false;
                    }
                    return true;
                });
                rsRules.splice.apply(rsRules, [
                    i,
                    1
                ].concat(rules));
                i += rules.length - 1;
                ruleset.resetCache();
            }
        }
        for (i = 0; rule = rsRules[i]; i++) {
            if (!rule.evalFirst) {
                rsRules[i] = rule = rule.eval ? rule.eval(context) : rule;
            }
        }
        for (i = 0; rule = rsRules[i]; i++) {
            if (rule instanceof Ruleset && rule.selectors && rule.selectors.length === 1) {
                if (rule.selectors[0] && rule.selectors[0].isJustParentSelector()) {
                    rsRules.splice(i--, 1);
                    for (var j = 0; subRule = rule.rules[j]; j++) {
                        if (subRule instanceof Node) {
                            subRule.copyVisibilityInfo(rule.visibilityInfo());
                            if (!(subRule instanceof Declaration) || !subRule.variable) {
                                rsRules.splice(++i, 0, subRule);
                            }
                        }
                    }
                }
            }
        }
        ctxFrames.shift();
        ctxSelectors.shift();
        if (context.mediaBlocks) {
            for (i = mediaBlockCount; i < context.mediaBlocks.length; i++) {
                context.mediaBlocks[i].bubbleSelectors(selectors);
            }
        }
        return ruleset;
    };
    Ruleset.prototype.evalImports = function (context) {
        var rules = this.rules, i, importRules;
        if (!rules) {
            return;
        }
        for (i = 0; i < rules.length; i++) {
            if (rules[i].type === 'Import') {
                importRules = rules[i].eval(context);
                if (importRules && (importRules.length || importRules.length === 0)) {
                    rules.splice.apply(rules, [
                        i,
                        1
                    ].concat(importRules));
                    i += importRules.length - 1;
                } else {
                    rules.splice(i, 1, importRules);
                }
                this.resetCache();
            }
        }
    };
    Ruleset.prototype.makeImportant = function () {
        var result = new Ruleset(this.selectors, this.rules.map(function (r) {
            if (r.makeImportant) {
                return r.makeImportant();
            } else {
                return r;
            }
        }), this.strictImports, this.visibilityInfo());
        return result;
    };
    Ruleset.prototype.matchArgs = function (args) {
        return !args || args.length === 0;
    };
    Ruleset.prototype.matchCondition = function (args, context) {
        var lastSelector = this.selectors[this.selectors.length - 1];
        if (!lastSelector.evaldCondition) {
            return false;
        }
        if (lastSelector.condition && !lastSelector.condition.eval(new contexts.Eval(context, context.frames))) {
            return false;
        }
        return true;
    };
    Ruleset.prototype.resetCache = function () {
        this._rulesets = null;
        this._variables = null;
        this._properties = null;
        this._lookups = {};
    };
    Ruleset.prototype.variables = function () {
        if (!this._variables) {
            this._variables = !this.rules ? {} : this.rules.reduce(function (hash, r) {
                if (r instanceof Declaration && r.variable === true) {
                    hash[r.name] = r;
                }
                if (r.type === 'Import' && r.root && r.root.variables) {
                    var vars = r.root.variables();
                    for (var name in vars) {
                        if (vars.hasOwnProperty(name)) {
                            hash[name] = r.root.variable(name);
                        }
                    }
                }
                return hash;
            }, {});
        }
        return this._variables;
    };
    Ruleset.prototype.properties = function () {
        if (!this._properties) {
            this._properties = !this.rules ? {} : this.rules.reduce(function (hash, r) {
                if (r instanceof Declaration && r.variable !== true) {
                    var name = r.name.length === 1 && r.name[0] instanceof Keyword ? r.name[0].value : r.name;
                    if (!hash['$' + name]) {
                        hash['$' + name] = [r];
                    } else {
                        hash['$' + name].push(r);
                    }
                }
                return hash;
            }, {});
        }
        return this._properties;
    };
    Ruleset.prototype.variable = function (name) {
        var decl = this.variables()[name];
        if (decl) {
            return this.parseValue(decl);
        }
    };
    Ruleset.prototype.property = function (name) {
        var decl = this.properties()[name];
        if (decl) {
            return this.parseValue(decl);
        }
    };
    Ruleset.prototype.lastDeclaration = function () {
        for (var i = this.rules.length; i > 0; i--) {
            var decl = this.rules[i - 1];
            if (decl instanceof Declaration) {
                return this.parseValue(decl);
            }
        }
    };
    Ruleset.prototype.parseValue = function (toParse) {
        var self = this;
        function transformDeclaration(decl) {
            if (decl.value instanceof Anonymous && !decl.parsed) {
                if (typeof decl.value.value === 'string') {
                    this.parse.parseNode(decl.value.value, [
                        'value',
                        'important'
                    ], decl.value.getIndex(), decl.fileInfo(), function (err, result) {
                        if (err) {
                            decl.parsed = true;
                        }
                        if (result) {
                            decl.value = result[0];
                            decl.important = result[1] || '';
                            decl.parsed = true;
                        }
                    });
                } else {
                    decl.parsed = true;
                }
                return decl;
            } else {
                return decl;
            }
        }
        if (!Array.isArray(toParse)) {
            return transformDeclaration.call(self, toParse);
        } else {
            var nodes = [];
            toParse.forEach(function (n) {
                nodes.push(transformDeclaration.call(self, n));
            });
            return nodes;
        }
    };
    Ruleset.prototype.rulesets = function () {
        if (!this.rules) {
            return [];
        }
        var filtRules = [], rules = this.rules, i, rule;
        for (i = 0; rule = rules[i]; i++) {
            if (rule.isRuleset) {
                filtRules.push(rule);
            }
        }
        return filtRules;
    };
    Ruleset.prototype.prependRule = function (rule) {
        var rules = this.rules;
        if (rules) {
            rules.unshift(rule);
        } else {
            this.rules = [rule];
        }
        this.setParent(rule, this);
    };
    Ruleset.prototype.find = function (selector, self, filter) {
        self = self || this;
        var rules = [], match, foundMixins, key = selector.toCSS();
        if (key in this._lookups) {
            return this._lookups[key];
        }
        this.rulesets().forEach(function (rule) {
            if (rule !== self) {
                for (var j = 0; j < rule.selectors.length; j++) {
                    match = selector.match(rule.selectors[j]);
                    if (match) {
                        if (selector.elements.length > match) {
                            if (!filter || filter(rule)) {
                                foundMixins = rule.find(new Selector(selector.elements.slice(match)), self, filter);
                                for (var i = 0; i < foundMixins.length; ++i) {
                                    foundMixins[i].path.push(rule);
                                }
                                Array.prototype.push.apply(rules, foundMixins);
                            }
                        } else {
                            rules.push({
                                rule: rule,
                                path: []
                            });
                        }
                        break;
                    }
                }
            }
        });
        this._lookups[key] = rules;
        return rules;
    };
    Ruleset.prototype.genCSS = function (context, output) {
        var i, j, charsetRuleNodes = [], ruleNodes = [], debugInfo, rule, path;
        context.tabLevel = context.tabLevel || 0;
        if (!this.root) {
            context.tabLevel++;
        }
        var tabRuleStr = context.compress ? '' : Array(context.tabLevel + 1).join('  '), tabSetStr = context.compress ? '' : Array(context.tabLevel).join('  '), sep;
        var charsetNodeIndex = 0;
        var importNodeIndex = 0;
        for (i = 0; rule = this.rules[i]; i++) {
            if (rule instanceof Comment) {
                if (importNodeIndex === i) {
                    importNodeIndex++;
                }
                ruleNodes.push(rule);
            } else if (rule.isCharset && rule.isCharset()) {
                ruleNodes.splice(charsetNodeIndex, 0, rule);
                charsetNodeIndex++;
                importNodeIndex++;
            } else if (rule.type === 'Import') {
                ruleNodes.splice(importNodeIndex, 0, rule);
                importNodeIndex++;
            } else {
                ruleNodes.push(rule);
            }
        }
        ruleNodes = charsetRuleNodes.concat(ruleNodes);
        if (!this.root) {
            debugInfo = getDebugInfo(context, this, tabSetStr);
            if (debugInfo) {
                output.add(debugInfo);
                output.add(tabSetStr);
            }
            var paths = this.paths, pathCnt = paths.length, pathSubCnt;
            sep = context.compress ? ',' : ',\n' + tabSetStr;
            for (i = 0; i < pathCnt; i++) {
                path = paths[i];
                if (!(pathSubCnt = path.length)) {
                    continue;
                }
                if (i > 0) {
                    output.add(sep);
                }
                context.firstSelector = true;
                path[0].genCSS(context, output);
                context.firstSelector = false;
                for (j = 1; j < pathSubCnt; j++) {
                    path[j].genCSS(context, output);
                }
            }
            output.add((context.compress ? '{' : ' {\n') + tabRuleStr);
        }
        for (i = 0; rule = ruleNodes[i]; i++) {
            if (i + 1 === ruleNodes.length) {
                context.lastRule = true;
            }
            var currentLastRule = context.lastRule;
            if (rule.isRulesetLike(rule)) {
                context.lastRule = false;
            }
            if (rule.genCSS) {
                rule.genCSS(context, output);
            } else if (rule.value) {
                output.add(rule.value.toString());
            }
            context.lastRule = currentLastRule;
            if (!context.lastRule && rule.isVisible()) {
                output.add(context.compress ? '' : '\n' + tabRuleStr);
            } else {
                context.lastRule = false;
            }
        }
        if (!this.root) {
            output.add(context.compress ? '}' : '\n' + tabSetStr + '}');
            context.tabLevel--;
        }
        if (!output.isEmpty() && !context.compress && this.firstRoot) {
            output.add('\n');
        }
    };
    Ruleset.prototype.joinSelectors = function (paths, context, selectors) {
        for (var s = 0; s < selectors.length; s++) {
            this.joinSelector(paths, context, selectors[s]);
        }
    };
    Ruleset.prototype.joinSelector = function (paths, context, selector) {
        function createParenthesis(elementsToPak, originalElement) {
            var replacementParen, j;
            if (elementsToPak.length === 0) {
                replacementParen = new Paren(elementsToPak[0]);
            } else {
                var insideParent = new Array(elementsToPak.length);
                for (j = 0; j < elementsToPak.length; j++) {
                    insideParent[j] = new Element(null, elementsToPak[j], originalElement.isVariable, originalElement._index, originalElement._fileInfo);
                }
                replacementParen = new Paren(new Selector(insideParent));
            }
            return replacementParen;
        }
        function createSelector(containedElement, originalElement) {
            var element, selector;
            element = new Element(null, containedElement, originalElement.isVariable, originalElement._index, originalElement._fileInfo);
            selector = new Selector([element]);
            return selector;
        }
        function addReplacementIntoPath(beginningPath, addPath, replacedElement, originalSelector) {
            var newSelectorPath, lastSelector, newJoinedSelector;
            newSelectorPath = [];
            if (beginningPath.length > 0) {
                newSelectorPath = utils.copyArray(beginningPath);
                lastSelector = newSelectorPath.pop();
                newJoinedSelector = originalSelector.createDerived(utils.copyArray(lastSelector.elements));
            } else {
                newJoinedSelector = originalSelector.createDerived([]);
            }
            if (addPath.length > 0) {
                var combinator = replacedElement.combinator, parentEl = addPath[0].elements[0];
                if (combinator.emptyOrWhitespace && !parentEl.combinator.emptyOrWhitespace) {
                    combinator = parentEl.combinator;
                }
                newJoinedSelector.elements.push(new Element(combinator, parentEl.value, replacedElement.isVariable, replacedElement._index, replacedElement._fileInfo));
                newJoinedSelector.elements = newJoinedSelector.elements.concat(addPath[0].elements.slice(1));
            }
            if (newJoinedSelector.elements.length !== 0) {
                newSelectorPath.push(newJoinedSelector);
            }
            if (addPath.length > 1) {
                var restOfPath = addPath.slice(1);
                restOfPath = restOfPath.map(function (selector) {
                    return selector.createDerived(selector.elements, []);
                });
                newSelectorPath = newSelectorPath.concat(restOfPath);
            }
            return newSelectorPath;
        }
        function addAllReplacementsIntoPath(beginningPath, addPaths, replacedElement, originalSelector, result) {
            var j;
            for (j = 0; j < beginningPath.length; j++) {
                var newSelectorPath = addReplacementIntoPath(beginningPath[j], addPaths, replacedElement, originalSelector);
                result.push(newSelectorPath);
            }
            return result;
        }
        function mergeElementsOnToSelectors(elements, selectors) {
            var i, sel;
            if (elements.length === 0) {
                return;
            }
            if (selectors.length === 0) {
                selectors.push([new Selector(elements)]);
                return;
            }
            for (i = 0; sel = selectors[i]; i++) {
                if (sel.length > 0) {
                    sel[sel.length - 1] = sel[sel.length - 1].createDerived(sel[sel.length - 1].elements.concat(elements));
                } else {
                    sel.push(new Selector(elements));
                }
            }
        }
        function replaceParentSelector(paths, context, inSelector) {
            var i, j, k, currentElements, newSelectors, selectorsMultiplied, sel, el, hadParentSelector = false, length, lastSelector;
            function findNestedSelector(element) {
                var maybeSelector;
                if (!(element.value instanceof Paren)) {
                    return null;
                }
                maybeSelector = element.value.value;
                if (!(maybeSelector instanceof Selector)) {
                    return null;
                }
                return maybeSelector;
            }
            currentElements = [];
            newSelectors = [[]];
            for (i = 0; el = inSelector.elements[i]; i++) {
                if (el.value !== '&') {
                    var nestedSelector = findNestedSelector(el);
                    if (nestedSelector != null) {
                        mergeElementsOnToSelectors(currentElements, newSelectors);
                        var nestedPaths = [], replaced, replacedNewSelectors = [];
                        replaced = replaceParentSelector(nestedPaths, context, nestedSelector);
                        hadParentSelector = hadParentSelector || replaced;
                        for (k = 0; k < nestedPaths.length; k++) {
                            var replacementSelector = createSelector(createParenthesis(nestedPaths[k], el), el);
                            addAllReplacementsIntoPath(newSelectors, [replacementSelector], el, inSelector, replacedNewSelectors);
                        }
                        newSelectors = replacedNewSelectors;
                        currentElements = [];
                    } else {
                        currentElements.push(el);
                    }
                } else {
                    hadParentSelector = true;
                    selectorsMultiplied = [];
                    mergeElementsOnToSelectors(currentElements, newSelectors);
                    for (j = 0; j < newSelectors.length; j++) {
                        sel = newSelectors[j];
                        if (context.length === 0) {
                            if (sel.length > 0) {
                                sel[0].elements.push(new Element(el.combinator, '', el.isVariable, el._index, el._fileInfo));
                            }
                            selectorsMultiplied.push(sel);
                        } else {
                            for (k = 0; k < context.length; k++) {
                                var newSelectorPath = addReplacementIntoPath(sel, context[k], el, inSelector);
                                selectorsMultiplied.push(newSelectorPath);
                            }
                        }
                    }
                    newSelectors = selectorsMultiplied;
                    currentElements = [];
                }
            }
            mergeElementsOnToSelectors(currentElements, newSelectors);
            for (i = 0; i < newSelectors.length; i++) {
                length = newSelectors[i].length;
                if (length > 0) {
                    paths.push(newSelectors[i]);
                    lastSelector = newSelectors[i][length - 1];
                    newSelectors[i][length - 1] = lastSelector.createDerived(lastSelector.elements, inSelector.extendList);
                }
            }
            return hadParentSelector;
        }
        function deriveSelector(visibilityInfo, deriveFrom) {
            var newSelector = deriveFrom.createDerived(deriveFrom.elements, deriveFrom.extendList, deriveFrom.evaldCondition);
            newSelector.copyVisibilityInfo(visibilityInfo);
            return newSelector;
        }
        var i, newPaths, hadParentSelector;
        newPaths = [];
        hadParentSelector = replaceParentSelector(newPaths, context, selector);
        if (!hadParentSelector) {
            if (context.length > 0) {
                newPaths = [];
                for (i = 0; i < context.length; i++) {
                    var concatenated = context[i].map(deriveSelector.bind(this, selector.visibilityInfo()));
                    concatenated.push(selector);
                    newPaths.push(concatenated);
                }
            } else {
                newPaths = [[selector]];
            }
        }
        for (i = 0; i < newPaths.length; i++) {
            paths.push(newPaths[i]);
        }
    };
    module.exports = Ruleset;
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
define('skylark-less/engine/tree/atrule',[
    './node',
    './selector',
    './ruleset',
    './anonymous'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Selector = __module__1, Ruleset = __module__2, Anonymous = __module__3;
    var AtRule = function (name, value, rules, index, currentFileInfo, debugInfo, isRooted, visibilityInfo) {
        var i;
        this.name = name;
        this.value = value instanceof Node ? value : value ? new Anonymous(value) : value;
        if (rules) {
            if (Array.isArray(rules)) {
                this.rules = rules;
            } else {
                this.rules = [rules];
                this.rules[0].selectors = new Selector([], null, null, index, currentFileInfo).createEmptySelectors();
            }
            for (i = 0; i < this.rules.length; i++) {
                this.rules[i].allowImports = true;
            }
            this.setParent(this.rules, this);
        }
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.debugInfo = debugInfo;
        this.isRooted = isRooted || false;
        this.copyVisibilityInfo(visibilityInfo);
        this.allowRoot = true;
    };
    AtRule.prototype = new Node();
    AtRule.prototype.type = 'AtRule';
    AtRule.prototype.accept = function (visitor) {
        var value = this.value, rules = this.rules;
        if (rules) {
            this.rules = visitor.visitArray(rules);
        }
        if (value) {
            this.value = visitor.visit(value);
        }
    };
    AtRule.prototype.isRulesetLike = function () {
        return this.rules || !this.isCharset();
    };
    AtRule.prototype.isCharset = function () {
        return '@charset' === this.name;
    };
    AtRule.prototype.genCSS = function (context, output) {
        var value = this.value, rules = this.rules;
        output.add(this.name, this.fileInfo(), this.getIndex());
        if (value) {
            output.add(' ');
            value.genCSS(context, output);
        }
        if (rules) {
            this.outputRuleset(context, output, rules);
        } else {
            output.add(';');
        }
    };
    AtRule.prototype.eval = function (context) {
        var mediaPathBackup, mediaBlocksBackup, value = this.value, rules = this.rules;
        mediaPathBackup = context.mediaPath;
        mediaBlocksBackup = context.mediaBlocks;
        context.mediaPath = [];
        context.mediaBlocks = [];
        if (value) {
            value = value.eval(context);
        }
        if (rules) {
            rules = [rules[0].eval(context)];
            rules[0].root = true;
        }
        context.mediaPath = mediaPathBackup;
        context.mediaBlocks = mediaBlocksBackup;
        return new AtRule(this.name, value, rules, this.getIndex(), this.fileInfo(), this.debugInfo, this.isRooted, this.visibilityInfo());
    };
    AtRule.prototype.variable = function (name) {
        if (this.rules) {
            return Ruleset.prototype.variable.call(this.rules[0], name);
        }
    };
    AtRule.prototype.find = function () {
        if (this.rules) {
            return Ruleset.prototype.find.apply(this.rules[0], arguments);
        }
    };
    AtRule.prototype.rulesets = function () {
        if (this.rules) {
            return Ruleset.prototype.rulesets.apply(this.rules[0]);
        }
    };
    AtRule.prototype.outputRuleset = function (context, output, rules) {
        var ruleCnt = rules.length, i;
        context.tabLevel = (context.tabLevel | 0) + 1;
        if (context.compress) {
            output.add('{');
            for (i = 0; i < ruleCnt; i++) {
                rules[i].genCSS(context, output);
            }
            output.add('}');
            context.tabLevel--;
            return;
        }
        var tabSetStr = '\n' + Array(context.tabLevel).join('  '), tabRuleStr = tabSetStr + '  ';
        if (!ruleCnt) {
            output.add(' {' + tabSetStr + '}');
        } else {
            output.add(' {' + tabRuleStr);
            rules[0].genCSS(context, output);
            for (i = 1; i < ruleCnt; i++) {
                output.add(tabRuleStr);
                rules[i].genCSS(context, output);
            }
            output.add(tabSetStr + '}');
        }
        context.tabLevel--;
    };
    module.exports = AtRule;
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
define('skylark-less/engine/tree/detached-ruleset',[
    './node',
    '../contexts',
    '../utils'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, contexts = __module__1, utils = __module__2;
    var DetachedRuleset = function (ruleset, frames) {
        this.ruleset = ruleset;
        this.frames = frames;
        this.setParent(this.ruleset, this);
    };
    DetachedRuleset.prototype = new Node();
    DetachedRuleset.prototype.type = 'DetachedRuleset';
    DetachedRuleset.prototype.evalFirst = true;
    DetachedRuleset.prototype.accept = function (visitor) {
        this.ruleset = visitor.visit(this.ruleset);
    };
    DetachedRuleset.prototype.eval = function (context) {
        var frames = this.frames || utils.copyArray(context.frames);
        return new DetachedRuleset(this.ruleset, frames);
    };
    DetachedRuleset.prototype.callEval = function (context) {
        return this.ruleset.eval(this.frames ? new contexts.Eval(context, this.frames.concat(context.frames)) : context);
    };
    module.exports = DetachedRuleset;
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
define('skylark-less/engine/tree/unit',[
    './node',
    '../data/unit-conversions',
    '../utils'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, unitConversions = __module__1, utils = __module__2;
    var Unit = function (numerator, denominator, backupUnit) {
        this.numerator = numerator ? utils.copyArray(numerator).sort() : [];
        this.denominator = denominator ? utils.copyArray(denominator).sort() : [];
        if (backupUnit) {
            this.backupUnit = backupUnit;
        } else if (numerator && numerator.length) {
            this.backupUnit = numerator[0];
        }
    };
    Unit.prototype = new Node();
    Unit.prototype.type = 'Unit';
    Unit.prototype.clone = function () {
        return new Unit(utils.copyArray(this.numerator), utils.copyArray(this.denominator), this.backupUnit);
    };
    Unit.prototype.genCSS = function (context, output) {
        var strictUnits = context && context.strictUnits;
        if (this.numerator.length === 1) {
            output.add(this.numerator[0]);
        } else if (!strictUnits && this.backupUnit) {
            output.add(this.backupUnit);
        } else if (!strictUnits && this.denominator.length) {
            output.add(this.denominator[0]);
        }
    };
    Unit.prototype.toString = function () {
        var i, returnStr = this.numerator.join('*');
        for (i = 0; i < this.denominator.length; i++) {
            returnStr += '/' + this.denominator[i];
        }
        return returnStr;
    };
    Unit.prototype.compare = function (other) {
        return this.is(other.toString()) ? 0 : undefined;
    };
    Unit.prototype.is = function (unitString) {
        return this.toString().toUpperCase() === unitString.toUpperCase();
    };
    Unit.prototype.isLength = function () {
        return RegExp('^(px|em|ex|ch|rem|in|cm|mm|pc|pt|ex|vw|vh|vmin|vmax)$', 'gi').test(this.toCSS());
    };
    Unit.prototype.isEmpty = function () {
        return this.numerator.length === 0 && this.denominator.length === 0;
    };
    Unit.prototype.isSingular = function () {
        return this.numerator.length <= 1 && this.denominator.length === 0;
    };
    Unit.prototype.map = function (callback) {
        var i;
        for (i = 0; i < this.numerator.length; i++) {
            this.numerator[i] = callback(this.numerator[i], false);
        }
        for (i = 0; i < this.denominator.length; i++) {
            this.denominator[i] = callback(this.denominator[i], true);
        }
    };
    Unit.prototype.usedUnits = function () {
        var group, result = {}, mapUnit, groupName;
        mapUnit = function (atomicUnit) {
            if (group.hasOwnProperty(atomicUnit) && !result[groupName]) {
                result[groupName] = atomicUnit;
            }
            return atomicUnit;
        };
        for (groupName in unitConversions) {
            if (unitConversions.hasOwnProperty(groupName)) {
                group = unitConversions[groupName];
                this.map(mapUnit);
            }
        }
        return result;
    };
    Unit.prototype.cancel = function () {
        var counter = {}, atomicUnit, i;
        for (i = 0; i < this.numerator.length; i++) {
            atomicUnit = this.numerator[i];
            counter[atomicUnit] = (counter[atomicUnit] || 0) + 1;
        }
        for (i = 0; i < this.denominator.length; i++) {
            atomicUnit = this.denominator[i];
            counter[atomicUnit] = (counter[atomicUnit] || 0) - 1;
        }
        this.numerator = [];
        this.denominator = [];
        for (atomicUnit in counter) {
            if (counter.hasOwnProperty(atomicUnit)) {
                var count = counter[atomicUnit];
                if (count > 0) {
                    for (i = 0; i < count; i++) {
                        this.numerator.push(atomicUnit);
                    }
                } else if (count < 0) {
                    for (i = 0; i < -count; i++) {
                        this.denominator.push(atomicUnit);
                    }
                }
            }
        }
        this.numerator.sort();
        this.denominator.sort();
    };
    module.exports = Unit;
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
define('skylark-less/engine/tree/dimension',[
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
define('skylark-less/engine/tree/operation',[
    './node',
    './color',
    './dimension',
    '../constants'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Color = __module__1, Dimension = __module__2, MATH = __module__3.Math;
    var Operation = function (op, operands, isSpaced) {
        this.op = op.trim();
        this.operands = operands;
        this.isSpaced = isSpaced;
    };
    Operation.prototype = new Node();
    Operation.prototype.type = 'Operation';
    Operation.prototype.accept = function (visitor) {
        this.operands = visitor.visit(this.operands);
    };
    Operation.prototype.eval = function (context) {
        var a = this.operands[0].eval(context), b = this.operands[1].eval(context), op;
        if (context.isMathOn(this.op)) {
            op = this.op === './' ? '/' : this.op;
            if (a instanceof Dimension && b instanceof Color) {
                a = a.toColor();
            }
            if (b instanceof Dimension && a instanceof Color) {
                b = b.toColor();
            }
            if (!a.operate) {
                if (a instanceof Operation && a.op === '/' && context.math === MATH.PARENS_DIVISION) {
                    return new Operation(this.op, [
                        a,
                        b
                    ], this.isSpaced);
                }
                throw {
                    type: 'Operation',
                    message: 'Operation on an invalid type'
                };
            }
            return a.operate(context, op, b);
        } else {
            return new Operation(this.op, [
                a,
                b
            ], this.isSpaced);
        }
    };
    Operation.prototype.genCSS = function (context, output) {
        this.operands[0].genCSS(context, output);
        if (this.isSpaced) {
            output.add(' ');
        }
        output.add(this.op);
        if (this.isSpaced) {
            output.add(' ');
        }
        this.operands[1].genCSS(context, output);
    };
    module.exports = Operation;
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
define('skylark-less/engine/tree/expression',[
    './node',
    './paren',
    './comment',
    './dimension',
    '../constants'
], function (__module__0, __module__1, __module__2, __module__3, __module__4) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Paren = __module__1, Comment = __module__2, Dimension = __module__3, MATH = __module__4.Math;
    var Expression = function (value, noSpacing) {
        this.value = value;
        this.noSpacing = noSpacing;
        if (!value) {
            throw new Error('Expression requires an array parameter');
        }
    };
    Expression.prototype = new Node();
    Expression.prototype.type = 'Expression';
    Expression.prototype.accept = function (visitor) {
        this.value = visitor.visitArray(this.value);
    };
    Expression.prototype.eval = function (context) {
        var returnValue, mathOn = context.isMathOn(), inParenthesis = this.parens && (context.math !== MATH.STRICT_LEGACY || !this.parensInOp), doubleParen = false;
        if (inParenthesis) {
            context.inParenthesis();
        }
        if (this.value.length > 1) {
            returnValue = new Expression(this.value.map(function (e) {
                if (!e.eval) {
                    return e;
                }
                return e.eval(context);
            }), this.noSpacing);
        } else if (this.value.length === 1) {
            if (this.value[0].parens && !this.value[0].parensInOp && !context.inCalc) {
                doubleParen = true;
            }
            returnValue = this.value[0].eval(context);
        } else {
            returnValue = this;
        }
        if (inParenthesis) {
            context.outOfParenthesis();
        }
        if (this.parens && this.parensInOp && !mathOn && !doubleParen && !(returnValue instanceof Dimension)) {
            returnValue = new Paren(returnValue);
        }
        return returnValue;
    };
    Expression.prototype.genCSS = function (context, output) {
        for (var i = 0; i < this.value.length; i++) {
            this.value[i].genCSS(context, output);
            if (!this.noSpacing && i + 1 < this.value.length) {
                output.add(' ');
            }
        }
    };
    Expression.prototype.throwAwayComments = function () {
        this.value = this.value.filter(function (v) {
            return !(v instanceof Comment);
        });
    };
    module.exports = Expression;
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
define('skylark-less/engine/functions/function-caller',['../tree/expression'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Expression = __module__0;
    var functionCaller = function (name, context, index, currentFileInfo) {
        this.name = name.toLowerCase();
        this.index = index;
        this.context = context;
        this.currentFileInfo = currentFileInfo;
        this.func = context.frames[0].functionRegistry.get(this.name);
    };
    functionCaller.prototype.isValid = function () {
        return Boolean(this.func);
    };
    functionCaller.prototype.call = function (args) {
        if (Array.isArray(args)) {
            args = args.filter(function (item) {
                if (item.type === 'Comment') {
                    return false;
                }
                return true;
            }).map(function (item) {
                if (item.type === 'Expression') {
                    var subNodes = item.value.filter(function (item) {
                        if (item.type === 'Comment') {
                            return false;
                        }
                        return true;
                    });
                    if (subNodes.length === 1) {
                        return subNodes[0];
                    } else {
                        return new Expression(subNodes);
                    }
                }
                return item;
            });
        }
        return this.func.apply(this, args);
    };
    module.exports = functionCaller;
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
define('skylark-less/engine/tree/call',[
    './node',
    './anonymous',
    '../functions/function-caller'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Anonymous = __module__1, FunctionCaller = __module__2;
    var Call = function (name, args, index, currentFileInfo) {
        this.name = name;
        this.args = args;
        this.calc = name === 'calc';
        this._index = index;
        this._fileInfo = currentFileInfo;
    };
    Call.prototype = new Node();
    Call.prototype.type = 'Call';
    Call.prototype.accept = function (visitor) {
        if (this.args) {
            this.args = visitor.visitArray(this.args);
        }
    };
    Call.prototype.eval = function (context) {
        var currentMathContext = context.mathOn;
        context.mathOn = !this.calc;
        if (this.calc || context.inCalc) {
            context.enterCalc();
        }
        var args = this.args.map(function (a) {
            return a.eval(context);
        });
        if (this.calc || context.inCalc) {
            context.exitCalc();
        }
        context.mathOn = currentMathContext;
        var result, funcCaller = new FunctionCaller(this.name, context, this.getIndex(), this.fileInfo());
        if (funcCaller.isValid()) {
            try {
                result = funcCaller.call(args);
            } catch (e) {
                throw {
                    type: e.type || 'Runtime',
                    message: 'error evaluating function `' + this.name + '`' + (e.message ? ': ' + e.message : ''),
                    index: this.getIndex(),
                    filename: this.fileInfo().filename,
                    line: e.lineNumber,
                    column: e.columnNumber
                };
            }
            if (result !== null && result !== undefined) {
                if (!(result instanceof Node)) {
                    if (!result || result === true) {
                        result = new Anonymous(null);
                    } else {
                        result = new Anonymous(result.toString());
                    }
                }
                result._index = this._index;
                result._fileInfo = this._fileInfo;
                return result;
            }
        }
        return new Call(this.name, args, this.getIndex(), this.fileInfo());
    };
    Call.prototype.genCSS = function (context, output) {
        output.add(this.name + '(', this.fileInfo(), this.getIndex());
        for (var i = 0; i < this.args.length; i++) {
            this.args[i].genCSS(context, output);
            if (i + 1 < this.args.length) {
                output.add(', ');
            }
        }
        output.add(')');
    };
    module.exports = Call;
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
define('skylark-less/engine/tree/variable',[
    './node',
    './call'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Call = __module__1;
    var Variable = function (name, index, currentFileInfo) {
        this.name = name;
        this._index = index;
        this._fileInfo = currentFileInfo;
    };
    Variable.prototype = new Node();
    Variable.prototype.type = 'Variable';
    Variable.prototype.eval = function (context) {
        var variable, name = this.name;
        if (name.indexOf('@@') === 0) {
            name = '@' + new Variable(name.slice(1), this.getIndex(), this.fileInfo()).eval(context).value;
        }
        if (this.evaluating) {
            throw {
                type: 'Name',
                message: 'Recursive variable definition for ' + name,
                filename: this.fileInfo().filename,
                index: this.getIndex()
            };
        }
        this.evaluating = true;
        variable = this.find(context.frames, function (frame) {
            var v = frame.variable(name);
            if (v) {
                if (v.important) {
                    var importantScope = context.importantScope[context.importantScope.length - 1];
                    importantScope.important = v.important;
                }
                if (context.inCalc) {
                    return new Call('_SELF', [v.value]).eval(context);
                } else {
                    return v.value.eval(context);
                }
            }
        });
        if (variable) {
            this.evaluating = false;
            return variable;
        } else {
            throw {
                type: 'Name',
                message: 'variable ' + name + ' is undefined',
                filename: this.fileInfo().filename,
                index: this.getIndex()
            };
        }
    };
    Variable.prototype.find = function (obj, fun) {
        for (var i = 0, r; i < obj.length; i++) {
            r = fun.call(obj, obj[i]);
            if (r) {
                return r;
            }
        }
        return null;
    };
    module.exports = Variable;
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
define('skylark-less/engine/tree/property',[
    './node',
    './declaration'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Declaration = __module__1;
    var Property = function (name, index, currentFileInfo) {
        this.name = name;
        this._index = index;
        this._fileInfo = currentFileInfo;
    };
    Property.prototype = new Node();
    Property.prototype.type = 'Property';
    Property.prototype.eval = function (context) {
        var property, name = this.name;
        var mergeRules = context.pluginManager.less.visitors.ToCSSVisitor.prototype._mergeRules;
        if (this.evaluating) {
            throw {
                type: 'Name',
                message: 'Recursive property reference for ' + name,
                filename: this.fileInfo().filename,
                index: this.getIndex()
            };
        }
        this.evaluating = true;
        property = this.find(context.frames, function (frame) {
            var v, vArr = frame.property(name);
            if (vArr) {
                for (var i = 0; i < vArr.length; i++) {
                    v = vArr[i];
                    vArr[i] = new Declaration(v.name, v.value, v.important, v.merge, v.index, v.currentFileInfo, v.inline, v.variable);
                }
                mergeRules(vArr);
                v = vArr[vArr.length - 1];
                if (v.important) {
                    var importantScope = context.importantScope[context.importantScope.length - 1];
                    importantScope.important = v.important;
                }
                v = v.value.eval(context);
                return v;
            }
        });
        if (property) {
            this.evaluating = false;
            return property;
        } else {
            throw {
                type: 'Name',
                message: "Property '" + name + "' is undefined",
                filename: this.currentFileInfo.filename,
                index: this.index
            };
        }
    };
    Property.prototype.find = function (obj, fun) {
        for (var i = 0, r; i < obj.length; i++) {
            r = fun.call(obj, obj[i]);
            if (r) {
                return r;
            }
        }
        return null;
    };
    module.exports = Property;
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
define('skylark-less/engine/tree/attribute',['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var Attribute = function (key, op, value) {
        this.key = key;
        this.op = op;
        this.value = value;
    };
    Attribute.prototype = new Node();
    Attribute.prototype.type = 'Attribute';
    Attribute.prototype.eval = function (context) {
        return new Attribute(this.key.eval ? this.key.eval(context) : this.key, this.op, this.value && this.value.eval ? this.value.eval(context) : this.value);
    };
    Attribute.prototype.genCSS = function (context, output) {
        output.add(this.toCSS(context));
    };
    Attribute.prototype.toCSS = function (context) {
        var value = this.key.toCSS ? this.key.toCSS(context) : this.key;
        if (this.op) {
            value += this.op;
            value += this.value.toCSS ? this.value.toCSS(context) : this.value;
        }
        return '[' + value + ']';
    };
    module.exports = Attribute;
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
define('skylark-less/engine/tree/quoted',[
    './node',
    './variable',
    './property'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Variable = __module__1, Property = __module__2;
    var Quoted = function (str, content, escaped, index, currentFileInfo) {
        this.escaped = escaped == null ? true : escaped;
        this.value = content || '';
        this.quote = str.charAt(0);
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.variableRegex = /@\{([\w-]+)\}/g;
        this.propRegex = /\$\{([\w-]+)\}/g;
    };
    Quoted.prototype = new Node();
    Quoted.prototype.type = 'Quoted';
    Quoted.prototype.genCSS = function (context, output) {
        if (!this.escaped) {
            output.add(this.quote, this.fileInfo(), this.getIndex());
        }
        output.add(this.value);
        if (!this.escaped) {
            output.add(this.quote);
        }
    };
    Quoted.prototype.containsVariables = function () {
        return this.value.match(this.variableRegex);
    };
    Quoted.prototype.eval = function (context) {
        var that = this, value = this.value;
        var variableReplacement = function (_, name) {
            var v = new Variable('@' + name, that.getIndex(), that.fileInfo()).eval(context, true);
            return v instanceof Quoted ? v.value : v.toCSS();
        };
        var propertyReplacement = function (_, name) {
            var v = new Property('$' + name, that.getIndex(), that.fileInfo()).eval(context, true);
            return v instanceof Quoted ? v.value : v.toCSS();
        };
        function iterativeReplace(value, regexp, replacementFnc) {
            var evaluatedValue = value;
            do {
                value = evaluatedValue;
                evaluatedValue = value.replace(regexp, replacementFnc);
            } while (value !== evaluatedValue);
            return evaluatedValue;
        }
        value = iterativeReplace(value, this.variableRegex, variableReplacement);
        value = iterativeReplace(value, this.propRegex, propertyReplacement);
        return new Quoted(this.quote + value + this.quote, value, this.escaped, this.getIndex(), this.fileInfo());
    };
    Quoted.prototype.compare = function (other) {
        if (other.type === 'Quoted' && !this.escaped && !other.escaped) {
            return Node.numericCompare(this.value, other.value);
        } else {
            return other.toCSS && this.toCSS() === other.toCSS() ? 0 : undefined;
        }
    };
    module.exports = Quoted;
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
define('skylark-less/engine/tree/url',['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var URL = function (val, index, currentFileInfo, isEvald) {
        this.value = val;
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.isEvald = isEvald;
    };
    URL.prototype = new Node();
    URL.prototype.type = 'Url';
    URL.prototype.accept = function (visitor) {
        this.value = visitor.visit(this.value);
    };
    URL.prototype.genCSS = function (context, output) {
        output.add('url(');
        this.value.genCSS(context, output);
        output.add(')');
    };
    URL.prototype.eval = function (context) {
        var val = this.value.eval(context), rootpath;
        if (!this.isEvald) {
            rootpath = this.fileInfo() && this.fileInfo().rootpath;
            if (typeof rootpath === 'string' && typeof val.value === 'string' && context.pathRequiresRewrite(val.value)) {
                if (!val.quote) {
                    rootpath = escapePath(rootpath);
                }
                val.value = context.rewritePath(val.value, rootpath);
            } else {
                val.value = context.normalizePath(val.value);
            }
            if (context.urlArgs) {
                if (!val.value.match(/^\s*data:/)) {
                    var delimiter = val.value.indexOf('?') === -1 ? '?' : '&';
                    var urlArgs = delimiter + context.urlArgs;
                    if (val.value.indexOf('#') !== -1) {
                        val.value = val.value.replace('#', urlArgs + '#');
                    } else {
                        val.value += urlArgs;
                    }
                }
            }
        }
        return new URL(val, this.getIndex(), this.fileInfo(), true);
    };
    function escapePath(path) {
        return path.replace(/[\(\)'"\s]/g, function (match) {
            return '\\' + match;
        });
    }
    module.exports = URL;
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
define('skylark-less/engine/tree/media',[
    './ruleset',
    './value',
    './selector',
    './anonymous',
    './expression',
    './atrule',
    '../utils'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Ruleset = __module__0, Value = __module__1, Selector = __module__2, Anonymous = __module__3, Expression = __module__4, AtRule = __module__5, utils = __module__6;
    var Media = function (value, features, index, currentFileInfo, visibilityInfo) {
        this._index = index;
        this._fileInfo = currentFileInfo;
        var selectors = new Selector([], null, null, this._index, this._fileInfo).createEmptySelectors();
        this.features = new Value(features);
        this.rules = [new Ruleset(selectors, value)];
        this.rules[0].allowImports = true;
        this.copyVisibilityInfo(visibilityInfo);
        this.allowRoot = true;
        this.setParent(selectors, this);
        this.setParent(this.features, this);
        this.setParent(this.rules, this);
    };
    Media.prototype = new AtRule();
    Media.prototype.type = 'Media';
    Media.prototype.isRulesetLike = function () {
        return true;
    };
    Media.prototype.accept = function (visitor) {
        if (this.features) {
            this.features = visitor.visit(this.features);
        }
        if (this.rules) {
            this.rules = visitor.visitArray(this.rules);
        }
    };
    Media.prototype.genCSS = function (context, output) {
        output.add('@media ', this._fileInfo, this._index);
        this.features.genCSS(context, output);
        this.outputRuleset(context, output, this.rules);
    };
    Media.prototype.eval = function (context) {
        if (!context.mediaBlocks) {
            context.mediaBlocks = [];
            context.mediaPath = [];
        }
        var media = new Media(null, [], this._index, this._fileInfo, this.visibilityInfo());
        if (this.debugInfo) {
            this.rules[0].debugInfo = this.debugInfo;
            media.debugInfo = this.debugInfo;
        }
        media.features = this.features.eval(context);
        context.mediaPath.push(media);
        context.mediaBlocks.push(media);
        this.rules[0].functionRegistry = context.frames[0].functionRegistry.inherit();
        context.frames.unshift(this.rules[0]);
        media.rules = [this.rules[0].eval(context)];
        context.frames.shift();
        context.mediaPath.pop();
        return context.mediaPath.length === 0 ? media.evalTop(context) : media.evalNested(context);
    };
    Media.prototype.evalTop = function (context) {
        var result = this;
        if (context.mediaBlocks.length > 1) {
            var selectors = new Selector([], null, null, this.getIndex(), this.fileInfo()).createEmptySelectors();
            result = new Ruleset(selectors, context.mediaBlocks);
            result.multiMedia = true;
            result.copyVisibilityInfo(this.visibilityInfo());
            this.setParent(result, this);
        }
        delete context.mediaBlocks;
        delete context.mediaPath;
        return result;
    };
    Media.prototype.evalNested = function (context) {
        var i, value, path = context.mediaPath.concat([this]);
        for (i = 0; i < path.length; i++) {
            value = path[i].features instanceof Value ? path[i].features.value : path[i].features;
            path[i] = Array.isArray(value) ? value : [value];
        }
        this.features = new Value(this.permute(path).map(function (path) {
            path = path.map(function (fragment) {
                return fragment.toCSS ? fragment : new Anonymous(fragment);
            });
            for (i = path.length - 1; i > 0; i--) {
                path.splice(i, 0, new Anonymous('and'));
            }
            return new Expression(path);
        }));
        this.setParent(this.features, this);
        return new Ruleset([], []);
    };
    Media.prototype.permute = function (arr) {
        if (arr.length === 0) {
            return [];
        } else if (arr.length === 1) {
            return arr[0];
        } else {
            var result = [];
            var rest = this.permute(arr.slice(1));
            for (var i = 0; i < rest.length; i++) {
                for (var j = 0; j < arr[0].length; j++) {
                    result.push([arr[0][j]].concat(rest[i]));
                }
            }
            return result;
        }
    };
    Media.prototype.bubbleSelectors = function (selectors) {
        if (!selectors) {
            return;
        }
        this.rules = [new Ruleset(utils.copyArray(selectors), [this.rules[0]])];
        this.setParent(this.rules, this);
    };
    module.exports = Media;
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
define('skylark-less/engine/tree/import',[
    './node',
    './media',
    './url',
    './quoted',
    './ruleset',
    './anonymous',
    '../utils',
    '../less-error'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6, __module__7) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Media = __module__1, URL = __module__2, Quoted = __module__3, Ruleset = __module__4, Anonymous = __module__5, utils = __module__6, LessError = __module__7;
    var Import = function (path, features, options, index, currentFileInfo, visibilityInfo) {
        this.options = options;
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.path = path;
        this.features = features;
        this.allowRoot = true;
        if (this.options.less !== undefined || this.options.inline) {
            this.css = !this.options.less || this.options.inline;
        } else {
            var pathValue = this.getPath();
            if (pathValue && /[#\.\&\?]css([\?;].*)?$/.test(pathValue)) {
                this.css = true;
            }
        }
        this.copyVisibilityInfo(visibilityInfo);
        this.setParent(this.features, this);
        this.setParent(this.path, this);
    };
    Import.prototype = new Node();
    Import.prototype.type = 'Import';
    Import.prototype.accept = function (visitor) {
        if (this.features) {
            this.features = visitor.visit(this.features);
        }
        this.path = visitor.visit(this.path);
        if (!this.options.isPlugin && !this.options.inline && this.root) {
            this.root = visitor.visit(this.root);
        }
    };
    Import.prototype.genCSS = function (context, output) {
        if (this.css && this.path._fileInfo.reference === undefined) {
            output.add('@import ', this._fileInfo, this._index);
            this.path.genCSS(context, output);
            if (this.features) {
                output.add(' ');
                this.features.genCSS(context, output);
            }
            output.add(';');
        }
    };
    Import.prototype.getPath = function () {
        return this.path instanceof URL ? this.path.value.value : this.path.value;
    };
    Import.prototype.isVariableImport = function () {
        var path = this.path;
        if (path instanceof URL) {
            path = path.value;
        }
        if (path instanceof Quoted) {
            return path.containsVariables();
        }
        return true;
    };
    Import.prototype.evalForImport = function (context) {
        var path = this.path;
        if (path instanceof URL) {
            path = path.value;
        }
        return new Import(path.eval(context), this.features, this.options, this._index, this._fileInfo, this.visibilityInfo());
    };
    Import.prototype.evalPath = function (context) {
        var path = this.path.eval(context);
        var fileInfo = this._fileInfo;
        if (!(path instanceof URL)) {
            var pathValue = path.value;
            if (fileInfo && pathValue && context.pathRequiresRewrite(pathValue)) {
                path.value = context.rewritePath(pathValue, fileInfo.rootpath);
            } else {
                path.value = context.normalizePath(path.value);
            }
        }
        return path;
    };
    Import.prototype.eval = function (context) {
        var result = this.doEval(context);
        if (this.options.reference || this.blocksVisibility()) {
            if (result.length || result.length === 0) {
                result.forEach(function (node) {
                    node.addVisibilityBlock();
                });
            } else {
                result.addVisibilityBlock();
            }
        }
        return result;
    };
    Import.prototype.doEval = function (context) {
        var ruleset, registry, features = this.features && this.features.eval(context);
        if (this.options.isPlugin) {
            if (this.root && this.root.eval) {
                try {
                    this.root.eval(context);
                } catch (e) {
                    e.message = 'Plugin error during evaluation';
                    throw new LessError(e, this.root.imports, this.root.filename);
                }
            }
            registry = context.frames[0] && context.frames[0].functionRegistry;
            if (registry && this.root && this.root.functions) {
                registry.addMultiple(this.root.functions);
            }
            return [];
        }
        if (this.skip) {
            if (typeof this.skip === 'function') {
                this.skip = this.skip();
            }
            if (this.skip) {
                return [];
            }
        }
        if (this.options.inline) {
            var contents = new Anonymous(this.root, 0, {
                filename: this.importedFilename,
                reference: this.path._fileInfo && this.path._fileInfo.reference
            }, true, true);
            return this.features ? new Media([contents], this.features.value) : [contents];
        } else if (this.css) {
            var newImport = new Import(this.evalPath(context), features, this.options, this._index);
            if (!newImport.css && this.error) {
                throw this.error;
            }
            return newImport;
        } else {
            ruleset = new Ruleset(null, utils.copyArray(this.root.rules));
            ruleset.evalImports(context);
            return this.features ? new Media(ruleset.rules, this.features.value) : ruleset.rules;
        }
    };
    module.exports = Import;
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
define('skylark-less/engine/tree/mixin-definition',[
    './selector',
    './element',
    './ruleset',
    './declaration',
    './detached-ruleset',
    './expression',
    '../contexts',
    '../utils'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6, __module__7) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Selector = __module__0, Element = __module__1, Ruleset = __module__2, Declaration = __module__3, DetachedRuleset = __module__4, Expression = __module__5, contexts = __module__6, utils = __module__7;
    var Definition = function (name, params, rules, condition, variadic, frames, visibilityInfo) {
        this.name = name || 'anonymous mixin';
        this.selectors = [new Selector([new Element(null, name, false, this._index, this._fileInfo)])];
        this.params = params;
        this.condition = condition;
        this.variadic = variadic;
        this.arity = params.length;
        this.rules = rules;
        this._lookups = {};
        var optionalParameters = [];
        this.required = params.reduce(function (count, p) {
            if (!p.name || p.name && !p.value) {
                return count + 1;
            } else {
                optionalParameters.push(p.name);
                return count;
            }
        }, 0);
        this.optionalParameters = optionalParameters;
        this.frames = frames;
        this.copyVisibilityInfo(visibilityInfo);
        this.allowRoot = true;
    };
    Definition.prototype = new Ruleset();
    Definition.prototype.type = 'MixinDefinition';
    Definition.prototype.evalFirst = true;
    Definition.prototype.accept = function (visitor) {
        if (this.params && this.params.length) {
            this.params = visitor.visitArray(this.params);
        }
        this.rules = visitor.visitArray(this.rules);
        if (this.condition) {
            this.condition = visitor.visit(this.condition);
        }
    };
    Definition.prototype.evalParams = function (context, mixinEnv, args, evaldArguments) {
        var frame = new Ruleset(null, null), varargs, arg, params = utils.copyArray(this.params), i, j, val, name, isNamedFound, argIndex, argsLength = 0;
        if (mixinEnv.frames && mixinEnv.frames[0] && mixinEnv.frames[0].functionRegistry) {
            frame.functionRegistry = mixinEnv.frames[0].functionRegistry.inherit();
        }
        mixinEnv = new contexts.Eval(mixinEnv, [frame].concat(mixinEnv.frames));
        if (args) {
            args = utils.copyArray(args);
            argsLength = args.length;
            for (i = 0; i < argsLength; i++) {
                arg = args[i];
                if (name = arg && arg.name) {
                    isNamedFound = false;
                    for (j = 0; j < params.length; j++) {
                        if (!evaldArguments[j] && name === params[j].name) {
                            evaldArguments[j] = arg.value.eval(context);
                            frame.prependRule(new Declaration(name, arg.value.eval(context)));
                            isNamedFound = true;
                            break;
                        }
                    }
                    if (isNamedFound) {
                        args.splice(i, 1);
                        i--;
                        continue;
                    } else {
                        throw {
                            type: 'Runtime',
                            message: 'Named argument for ' + this.name + ' ' + args[i].name + ' not found'
                        };
                    }
                }
            }
        }
        argIndex = 0;
        for (i = 0; i < params.length; i++) {
            if (evaldArguments[i]) {
                continue;
            }
            arg = args && args[argIndex];
            if (name = params[i].name) {
                if (params[i].variadic) {
                    varargs = [];
                    for (j = argIndex; j < argsLength; j++) {
                        varargs.push(args[j].value.eval(context));
                    }
                    frame.prependRule(new Declaration(name, new Expression(varargs).eval(context)));
                } else {
                    val = arg && arg.value;
                    if (val) {
                        if (Array.isArray(val)) {
                            val = new DetachedRuleset(new Ruleset('', val));
                        } else {
                            val = val.eval(context);
                        }
                    } else if (params[i].value) {
                        val = params[i].value.eval(mixinEnv);
                        frame.resetCache();
                    } else {
                        throw {
                            type: 'Runtime',
                            message: 'wrong number of arguments for ' + this.name + ' (' + argsLength + ' for ' + this.arity + ')'
                        };
                    }
                    frame.prependRule(new Declaration(name, val));
                    evaldArguments[i] = val;
                }
            }
            if (params[i].variadic && args) {
                for (j = argIndex; j < argsLength; j++) {
                    evaldArguments[j] = args[j].value.eval(context);
                }
            }
            argIndex++;
        }
        return frame;
    };
    Definition.prototype.makeImportant = function () {
        var rules = !this.rules ? this.rules : this.rules.map(function (r) {
            if (r.makeImportant) {
                return r.makeImportant(true);
            } else {
                return r;
            }
        });
        var result = new Definition(this.name, this.params, rules, this.condition, this.variadic, this.frames);
        return result;
    };
    Definition.prototype.eval = function (context) {
        return new Definition(this.name, this.params, this.rules, this.condition, this.variadic, this.frames || utils.copyArray(context.frames));
    };
    Definition.prototype.evalCall = function (context, args, important) {
        var _arguments = [], mixinFrames = this.frames ? this.frames.concat(context.frames) : context.frames, frame = this.evalParams(context, new contexts.Eval(context, mixinFrames), args, _arguments), rules, ruleset;
        frame.prependRule(new Declaration('@arguments', new Expression(_arguments).eval(context)));
        rules = utils.copyArray(this.rules);
        ruleset = new Ruleset(null, rules);
        ruleset.originalRuleset = this;
        ruleset = ruleset.eval(new contexts.Eval(context, [
            this,
            frame
        ].concat(mixinFrames)));
        if (important) {
            ruleset = ruleset.makeImportant();
        }
        return ruleset;
    };
    Definition.prototype.matchCondition = function (args, context) {
        if (this.condition && !this.condition.eval(new contexts.Eval(context, [this.evalParams(context, new contexts.Eval(context, this.frames ? this.frames.concat(context.frames) : context.frames), args, [])].concat(this.frames || []).concat(context.frames)))) {
            return false;
        }
        return true;
    };
    Definition.prototype.matchArgs = function (args, context) {
        var allArgsCnt = args && args.length || 0, len, optionalParameters = this.optionalParameters;
        var requiredArgsCnt = !args ? 0 : args.reduce(function (count, p) {
            if (optionalParameters.indexOf(p.name) < 0) {
                return count + 1;
            } else {
                return count;
            }
        }, 0);
        if (!this.variadic) {
            if (requiredArgsCnt < this.required) {
                return false;
            }
            if (allArgsCnt > this.params.length) {
                return false;
            }
        } else {
            if (requiredArgsCnt < this.required - 1) {
                return false;
            }
        }
        len = Math.min(requiredArgsCnt, this.arity);
        for (var i = 0; i < len; i++) {
            if (!this.params[i].name && !this.params[i].variadic) {
                if (args[i].value.eval(context).toCSS() != this.params[i].value.eval(context).toCSS()) {
                    return false;
                }
            }
        }
        return true;
    };
    module.exports = Definition;
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
define('skylark-less/engine/tree/mixin-call',[
    './node',
    './selector',
    './mixin-definition',
    '../functions/default'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Selector = __module__1, MixinDefinition = __module__2, defaultFunc = __module__3;
    var MixinCall = function (elements, args, index, currentFileInfo, important) {
        this.selector = new Selector(elements);
        this.arguments = args || [];
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.important = important;
        this.allowRoot = true;
        this.setParent(this.selector, this);
    };
    MixinCall.prototype = new Node();
    MixinCall.prototype.type = 'MixinCall';
    MixinCall.prototype.accept = function (visitor) {
        if (this.selector) {
            this.selector = visitor.visit(this.selector);
        }
        if (this.arguments.length) {
            this.arguments = visitor.visitArray(this.arguments);
        }
    };
    MixinCall.prototype.eval = function (context) {
        var mixins, mixin, mixinPath, args = [], arg, argValue, rules = [], match = false, i, m, f, isRecursive, isOneFound, candidates = [], candidate, conditionResult = [], defaultResult, defFalseEitherCase = -1, defNone = 0, defTrue = 1, defFalse = 2, count, originalRuleset, noArgumentsFilter;
        this.selector = this.selector.eval(context);
        function calcDefGroup(mixin, mixinPath) {
            var f, p, namespace;
            for (f = 0; f < 2; f++) {
                conditionResult[f] = true;
                defaultFunc.value(f);
                for (p = 0; p < mixinPath.length && conditionResult[f]; p++) {
                    namespace = mixinPath[p];
                    if (namespace.matchCondition) {
                        conditionResult[f] = conditionResult[f] && namespace.matchCondition(null, context);
                    }
                }
                if (mixin.matchCondition) {
                    conditionResult[f] = conditionResult[f] && mixin.matchCondition(args, context);
                }
            }
            if (conditionResult[0] || conditionResult[1]) {
                if (conditionResult[0] != conditionResult[1]) {
                    return conditionResult[1] ? defTrue : defFalse;
                }
                return defNone;
            }
            return defFalseEitherCase;
        }
        for (i = 0; i < this.arguments.length; i++) {
            arg = this.arguments[i];
            argValue = arg.value.eval(context);
            if (arg.expand && Array.isArray(argValue.value)) {
                argValue = argValue.value;
                for (m = 0; m < argValue.length; m++) {
                    args.push({ value: argValue[m] });
                }
            } else {
                args.push({
                    name: arg.name,
                    value: argValue
                });
            }
        }
        noArgumentsFilter = function (rule) {
            return rule.matchArgs(null, context);
        };
        for (i = 0; i < context.frames.length; i++) {
            if ((mixins = context.frames[i].find(this.selector, null, noArgumentsFilter)).length > 0) {
                isOneFound = true;
                for (m = 0; m < mixins.length; m++) {
                    mixin = mixins[m].rule;
                    mixinPath = mixins[m].path;
                    isRecursive = false;
                    for (f = 0; f < context.frames.length; f++) {
                        if (!(mixin instanceof MixinDefinition) && mixin === (context.frames[f].originalRuleset || context.frames[f])) {
                            isRecursive = true;
                            break;
                        }
                    }
                    if (isRecursive) {
                        continue;
                    }
                    if (mixin.matchArgs(args, context)) {
                        candidate = {
                            mixin: mixin,
                            group: calcDefGroup(mixin, mixinPath)
                        };
                        if (candidate.group !== defFalseEitherCase) {
                            candidates.push(candidate);
                        }
                        match = true;
                    }
                }
                defaultFunc.reset();
                count = [
                    0,
                    0,
                    0
                ];
                for (m = 0; m < candidates.length; m++) {
                    count[candidates[m].group]++;
                }
                if (count[defNone] > 0) {
                    defaultResult = defFalse;
                } else {
                    defaultResult = defTrue;
                    if (count[defTrue] + count[defFalse] > 1) {
                        throw {
                            type: 'Runtime',
                            message: 'Ambiguous use of `default()` found when matching for `' + this.format(args) + '`',
                            index: this.getIndex(),
                            filename: this.fileInfo().filename
                        };
                    }
                }
                for (m = 0; m < candidates.length; m++) {
                    candidate = candidates[m].group;
                    if (candidate === defNone || candidate === defaultResult) {
                        try {
                            mixin = candidates[m].mixin;
                            if (!(mixin instanceof MixinDefinition)) {
                                originalRuleset = mixin.originalRuleset || mixin;
                                mixin = new MixinDefinition('', [], mixin.rules, null, false, null, originalRuleset.visibilityInfo());
                                mixin.originalRuleset = originalRuleset;
                            }
                            var newRules = mixin.evalCall(context, args, this.important).rules;
                            this._setVisibilityToReplacement(newRules);
                            Array.prototype.push.apply(rules, newRules);
                        } catch (e) {
                            throw {
                                message: e.message,
                                index: this.getIndex(),
                                filename: this.fileInfo().filename,
                                stack: e.stack
                            };
                        }
                    }
                }
                if (match) {
                    return rules;
                }
            }
        }
        if (isOneFound) {
            throw {
                type: 'Runtime',
                message: 'No matching definition was found for `' + this.format(args) + '`',
                index: this.getIndex(),
                filename: this.fileInfo().filename
            };
        } else {
            throw {
                type: 'Name',
                message: this.selector.toCSS().trim() + ' is undefined',
                index: this.getIndex(),
                filename: this.fileInfo().filename
            };
        }
    };
    MixinCall.prototype._setVisibilityToReplacement = function (replacement) {
        var i, rule;
        if (this.blocksVisibility()) {
            for (i = 0; i < replacement.length; i++) {
                rule = replacement[i];
                rule.addVisibilityBlock();
            }
        }
    };
    MixinCall.prototype.format = function (args) {
        return this.selector.toCSS().trim() + '(' + (args ? args.map(function (a) {
            var argValue = '';
            if (a.name) {
                argValue += a.name + ':';
            }
            if (a.value.toCSS) {
                argValue += a.value.toCSS();
            } else {
                argValue += '???';
            }
            return argValue;
        }).join(', ') : '') + ')';
    };
    module.exports = MixinCall;
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
define('skylark-less/engine/tree/js-eval-node',[
    './node',
    './variable'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Variable = __module__1;
    var JsEvalNode = function () {
    };
    JsEvalNode.prototype = new Node();
    JsEvalNode.prototype.evaluateJavaScript = function (expression, context) {
        var result, that = this, evalContext = {};
        if (!context.javascriptEnabled) {
            throw {
                message: 'Inline JavaScript is not enabled. Is it set in your options?',
                filename: this.fileInfo().filename,
                index: this.getIndex()
            };
        }
        expression = expression.replace(/@\{([\w-]+)\}/g, function (_, name) {
            return that.jsify(new Variable('@' + name, that.getIndex(), that.fileInfo()).eval(context));
        });
        try {
            expression = new Function('return (' + expression + ')');
        } catch (e) {
            throw {
                message: 'JavaScript evaluation error: ' + e.message + ' from `' + expression + '`',
                filename: this.fileInfo().filename,
                index: this.getIndex()
            };
        }
        var variables = context.frames[0].variables();
        for (var k in variables) {
            if (variables.hasOwnProperty(k)) {
                evalContext[k.slice(1)] = {
                    value: variables[k].value,
                    toJS: function () {
                        return this.value.eval(context).toCSS();
                    }
                };
            }
        }
        try {
            result = expression.call(evalContext);
        } catch (e) {
            throw {
                message: "JavaScript evaluation error: '" + e.name + ': ' + e.message.replace(/["]/g, "'") + "'",
                filename: this.fileInfo().filename,
                index: this.getIndex()
            };
        }
        return result;
    };
    JsEvalNode.prototype.jsify = function (obj) {
        if (Array.isArray(obj.value) && obj.value.length > 1) {
            return '[' + obj.value.map(function (v) {
                return v.toCSS();
            }).join(', ') + ']';
        } else {
            return obj.toCSS();
        }
    };
    module.exports = JsEvalNode;
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
define('skylark-less/engine/tree/javascript',[
    './js-eval-node',
    './dimension',
    './quoted',
    './anonymous'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var JsEvalNode = __module__0, Dimension = __module__1, Quoted = __module__2, Anonymous = __module__3;
    var JavaScript = function (string, escaped, index, currentFileInfo) {
        this.escaped = escaped;
        this.expression = string;
        this._index = index;
        this._fileInfo = currentFileInfo;
    };
    JavaScript.prototype = new JsEvalNode();
    JavaScript.prototype.type = 'JavaScript';
    JavaScript.prototype.eval = function (context) {
        var result = this.evaluateJavaScript(this.expression, context);
        var type = typeof result;
        if (type === 'number' && !isNaN(result)) {
            return new Dimension(result);
        } else if (type === 'string') {
            return new Quoted('"' + result + '"', result, this.escaped, this._index);
        } else if (Array.isArray(result)) {
            return new Anonymous(result.join(', '));
        } else {
            return new Anonymous(result);
        }
    };
    module.exports = JavaScript;
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
define('skylark-less/engine/tree/assignment',['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var Assignment = function (key, val) {
        this.key = key;
        this.value = val;
    };
    Assignment.prototype = new Node();
    Assignment.prototype.type = 'Assignment';
    Assignment.prototype.accept = function (visitor) {
        this.value = visitor.visit(this.value);
    };
    Assignment.prototype.eval = function (context) {
        if (this.value.eval) {
            return new Assignment(this.key, this.value.eval(context));
        }
        return this;
    };
    Assignment.prototype.genCSS = function (context, output) {
        output.add(this.key + '=');
        if (this.value.genCSS) {
            this.value.genCSS(context, output);
        } else {
            output.add(this.value);
        }
    };
    module.exports = Assignment;
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
define('skylark-less/engine/tree/condition',['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var Condition = function (op, l, r, i, negate) {
        this.op = op.trim();
        this.lvalue = l;
        this.rvalue = r;
        this._index = i;
        this.negate = negate;
    };
    Condition.prototype = new Node();
    Condition.prototype.type = 'Condition';
    Condition.prototype.accept = function (visitor) {
        this.lvalue = visitor.visit(this.lvalue);
        this.rvalue = visitor.visit(this.rvalue);
    };
    Condition.prototype.eval = function (context) {
        var result = function (op, a, b) {
            switch (op) {
            case 'and':
                return a && b;
            case 'or':
                return a || b;
            default:
                switch (Node.compare(a, b)) {
                case -1:
                    return op === '<' || op === '=<' || op === '<=';
                case 0:
                    return op === '=' || op === '>=' || op === '=<' || op === '<=';
                case 1:
                    return op === '>' || op === '>=';
                default:
                    return false;
                }
            }
        }(this.op, this.lvalue.eval(context), this.rvalue.eval(context));
        return this.negate ? !result : result;
    };
    module.exports = Condition;
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
define('skylark-less/engine/tree/unicode-descriptor',['./node'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0;
    var UnicodeDescriptor = function (value) {
        this.value = value;
    };
    UnicodeDescriptor.prototype = new Node();
    UnicodeDescriptor.prototype.type = 'UnicodeDescriptor';
    module.exports = UnicodeDescriptor;
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
define('skylark-less/engine/tree/negative',[
    './node',
    './operation',
    './dimension'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Operation = __module__1, Dimension = __module__2;
    var Negative = function (node) {
        this.value = node;
    };
    Negative.prototype = new Node();
    Negative.prototype.type = 'Negative';
    Negative.prototype.genCSS = function (context, output) {
        output.add('-');
        this.value.genCSS(context, output);
    };
    Negative.prototype.eval = function (context) {
        if (context.isMathOn()) {
            return new Operation('*', [
                new Dimension(-1),
                this.value
            ]).eval(context);
        }
        return new Negative(this.value.eval(context));
    };
    module.exports = Negative;
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
define('skylark-less/engine/tree/extend',[
    './node',
    './selector'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Selector = __module__1;
    var Extend = function Extend(selector, option, index, currentFileInfo, visibilityInfo) {
        this.selector = selector;
        this.option = option;
        this.object_id = Extend.next_id++;
        this.parent_ids = [this.object_id];
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.copyVisibilityInfo(visibilityInfo);
        this.allowRoot = true;
        switch (option) {
        case 'all':
            this.allowBefore = true;
            this.allowAfter = true;
            break;
        default:
            this.allowBefore = false;
            this.allowAfter = false;
            break;
        }
        this.setParent(this.selector, this);
    };
    Extend.next_id = 0;
    Extend.prototype = new Node();
    Extend.prototype.type = 'Extend';
    Extend.prototype.accept = function (visitor) {
        this.selector = visitor.visit(this.selector);
    };
    Extend.prototype.eval = function (context) {
        return new Extend(this.selector.eval(context), this.option, this.getIndex(), this.fileInfo(), this.visibilityInfo());
    };
    Extend.prototype.clone = function (context) {
        return new Extend(this.selector, this.option, this.getIndex(), this.fileInfo(), this.visibilityInfo());
    };
    Extend.prototype.findSelfSelectors = function (selectors) {
        var selfElements = [], i, selectorElements;
        for (i = 0; i < selectors.length; i++) {
            selectorElements = selectors[i].elements;
            if (i > 0 && selectorElements.length && selectorElements[0].combinator.value === '') {
                selectorElements[0].combinator.value = ' ';
            }
            selfElements = selfElements.concat(selectors[i].elements);
        }
        this.selfSelectors = [new Selector(selfElements)];
        this.selfSelectors[0].copyVisibilityInfo(this.visibilityInfo());
    };
    module.exports = Extend;
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
define('skylark-less/engine/tree/variable-call',[
    './node',
    './variable',
    './ruleset',
    './detached-ruleset',
    '../less-error'
], function (__module__0, __module__1, __module__2, __module__3, __module__4) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Variable = __module__1, Ruleset = __module__2, DetachedRuleset = __module__3, LessError = __module__4;
    var VariableCall = function (variable, index, currentFileInfo) {
        this.variable = variable;
        this._index = index;
        this._fileInfo = currentFileInfo;
        this.allowRoot = true;
    };
    VariableCall.prototype = new Node();
    VariableCall.prototype.type = 'VariableCall';
    VariableCall.prototype.eval = function (context) {
        var rules, detachedRuleset = new Variable(this.variable, this.getIndex(), this.fileInfo()).eval(context), error = new LessError({ message: 'Could not evaluate variable call ' + this.variable });
        if (!detachedRuleset.ruleset) {
            if (detachedRuleset.rules) {
                rules = detachedRuleset;
            } else if (Array.isArray(detachedRuleset)) {
                rules = new Ruleset('', detachedRuleset);
            } else if (Array.isArray(detachedRuleset.value)) {
                rules = new Ruleset('', detachedRuleset.value);
            } else {
                throw error;
            }
            detachedRuleset = new DetachedRuleset(rules);
        }
        if (detachedRuleset.ruleset) {
            return detachedRuleset.callEval(context);
        }
        throw error;
    };
    module.exports = VariableCall;
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
define('skylark-less/engine/tree/namespace-value',[
    './node',
    './variable',
    './ruleset',
    './selector'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Node = __module__0, Variable = __module__1, Ruleset = __module__2, Selector = __module__3;
    var NamespaceValue = function (ruleCall, lookups, important, index, fileInfo) {
        this.value = ruleCall;
        this.lookups = lookups;
        this.important = important;
        this._index = index;
        this._fileInfo = fileInfo;
    };
    NamespaceValue.prototype = new Node();
    NamespaceValue.prototype.type = 'NamespaceValue';
    NamespaceValue.prototype.eval = function (context) {
        var i, j, name, rules = this.value.eval(context);
        for (i = 0; i < this.lookups.length; i++) {
            name = this.lookups[i];
            if (Array.isArray(rules)) {
                rules = new Ruleset([new Selector()], rules);
            }
            if (name === '') {
                rules = rules.lastDeclaration();
            } else if (name.charAt(0) === '@') {
                if (name.charAt(1) === '@') {
                    name = '@' + new Variable(name.substr(1)).eval(context).value;
                }
                if (rules.variables) {
                    rules = rules.variable(name);
                }
                if (!rules) {
                    throw {
                        type: 'Name',
                        message: 'variable ' + name + ' not found',
                        filename: this.fileInfo().filename,
                        index: this.getIndex()
                    };
                }
            } else {
                if (name.substring(0, 2) === '$@') {
                    name = '$' + new Variable(name.substr(1)).eval(context).value;
                } else {
                    name = name.charAt(0) === '$' ? name : '$' + name;
                }
                if (rules.properties) {
                    rules = rules.property(name);
                }
                if (!rules) {
                    throw {
                        type: 'Name',
                        message: 'property "' + name.substr(1) + '" not found',
                        filename: this.fileInfo().filename,
                        index: this.getIndex()
                    };
                }
                rules = rules[rules.length - 1];
            }
            if (rules.value) {
                rules = rules.eval(context).value;
            }
            if (rules.ruleset) {
                rules = rules.ruleset.eval(context);
            }
        }
        return rules;
    };
    module.exports = NamespaceValue;
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
define('skylark-less/engine/tree/index',[
    './node',
    './color',
    './atrule',
    './detached-ruleset',
    './operation',
    './dimension',
    './unit',
    './keyword',
    './variable',
    './property',
    './ruleset',
    './element',
    './attribute',
    './combinator',
    './selector',
    './quoted',
    './expression',
    './declaration',
    './call',
    './url',
    './import',
    './mixin-call',
    './mixin-definition',
    './comment',
    './anonymous',
    './value',
    './javascript',
    './assignment',
    './condition',
    './paren',
    './media',
    './unicode-descriptor',
    './negative',
    './extend',
    './variable-call',
    './namespace-value'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6, __module__7, __module__8, __module__9, __module__10, __module__11, __module__12, __module__13, __module__14, __module__15, __module__16, __module__17, __module__18, __module__19, __module__20, __module__21, __module__22, __module__23, __module__24, __module__25, __module__26, __module__27, __module__28, __module__29, __module__30, __module__31, __module__32, __module__33, __module__34, __module__35) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var tree = Object.create(null);
    tree.Node = __module__0;
    tree.Color = __module__1;
    tree.AtRule = __module__2;
    tree.DetachedRuleset = __module__3;
    tree.Operation = __module__4;
    tree.Dimension = __module__5;
    tree.Unit = __module__6;
    tree.Keyword = __module__7;
    tree.Variable = __module__8;
    tree.Property = __module__9;
    tree.Ruleset = __module__10;
    tree.Element = __module__11;
    tree.Attribute = __module__12;
    tree.Combinator = __module__13;
    tree.Selector = __module__14;
    tree.Quoted = __module__15;
    tree.Expression = __module__16;
    tree.Declaration = __module__17;
    tree.Call = __module__18;
    tree.URL = __module__19;
    tree.Import = __module__20;
    tree.mixin = {
        Call: __module__21,
        Definition: __module__22
    };
    tree.Comment = __module__23;
    tree.Anonymous = __module__24;
    tree.Value = __module__25;
    tree.JavaScript = __module__26;
    tree.Assignment = __module__27;
    tree.Condition = __module__28;
    tree.Paren = __module__29;
    tree.Media = __module__30;
    tree.UnicodeDescriptor = __module__31;
    tree.Negative = __module__32;
    tree.Extend = __module__33;
    tree.VariableCall = __module__34;
    tree.NamespaceValue = __module__35;
    module.exports = tree;
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
define('skylark-less/engine/logger',[], function () {
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
define('skylark-less/engine/environment/environment',['../logger'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var logger = __module__0;
    var environment = function (externalEnvironment, fileManagers) {
        this.fileManagers = fileManagers || [];
        externalEnvironment = externalEnvironment || {};
        var optionalFunctions = [
                'encodeBase64',
                'mimeLookup',
                'charsetLookup',
                'getSourceMapGenerator'
            ], requiredFunctions = [], functions = requiredFunctions.concat(optionalFunctions);
        for (var i = 0; i < functions.length; i++) {
            var propName = functions[i], environmentFunc = externalEnvironment[propName];
            if (environmentFunc) {
                this[propName] = environmentFunc.bind(externalEnvironment);
            } else if (i < requiredFunctions.length) {
                this.warn('missing required function in environment - ' + propName);
            }
        }
    };
    environment.prototype.getFileManager = function (filename, currentDirectory, options, environment, isSync) {
        if (!filename) {
            logger.warn('getFileManager called with no filename.. Please report this issue. continuing.');
        }
        if (currentDirectory == null) {
            logger.warn('getFileManager called with null directory.. Please report this issue. continuing.');
        }
        var fileManagers = this.fileManagers;
        if (options.pluginManager) {
            fileManagers = [].concat(fileManagers).concat(options.pluginManager.getFileManagers());
        }
        for (var i = fileManagers.length - 1; i >= 0; i--) {
            var fileManager = fileManagers[i];
            if (fileManager[isSync ? 'supportsSync' : 'supports'](filename, currentDirectory, options, environment)) {
                return fileManager;
            }
        }
        return null;
    };
    environment.prototype.addFileManager = function (fileManager) {
        this.fileManagers.push(fileManager);
    };
    environment.prototype.clearFileManagers = function () {
        this.fileManagers = [];
    };
    module.exports = environment;
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
define('skylark-less/engine/environment/abstract-file-manager',[], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var abstractFileManager = function () {
    };
    abstractFileManager.prototype.getPath = function (filename) {
        var j = filename.lastIndexOf('?');
        if (j > 0) {
            filename = filename.slice(0, j);
        }
        j = filename.lastIndexOf('/');
        if (j < 0) {
            j = filename.lastIndexOf('\\');
        }
        if (j < 0) {
            return '';
        }
        return filename.slice(0, j + 1);
    };
    abstractFileManager.prototype.tryAppendExtension = function (path, ext) {
        return /(\.[a-z]*$)|([\?;].*)$/.test(path) ? path : path + ext;
    };
    abstractFileManager.prototype.tryAppendLessExtension = function (path) {
        return this.tryAppendExtension(path, '.less');
    };
    abstractFileManager.prototype.supportsSync = function () {
        return false;
    };
    abstractFileManager.prototype.alwaysMakePathsAbsolute = function () {
        return false;
    };
    abstractFileManager.prototype.isPathAbsolute = function (filename) {
        return /^(?:[a-z-]+:|\/|\\|#)/i.test(filename);
    };
    abstractFileManager.prototype.join = function (basePath, laterPath) {
        if (!basePath) {
            return laterPath;
        }
        return basePath + laterPath;
    };
    abstractFileManager.prototype.pathDiff = function pathDiff(url, baseUrl) {
        var urlParts = this.extractUrlParts(url), baseUrlParts = this.extractUrlParts(baseUrl), i, max, urlDirectories, baseUrlDirectories, diff = '';
        if (urlParts.hostPart !== baseUrlParts.hostPart) {
            return '';
        }
        max = Math.max(baseUrlParts.directories.length, urlParts.directories.length);
        for (i = 0; i < max; i++) {
            if (baseUrlParts.directories[i] !== urlParts.directories[i]) {
                break;
            }
        }
        baseUrlDirectories = baseUrlParts.directories.slice(i);
        urlDirectories = urlParts.directories.slice(i);
        for (i = 0; i < baseUrlDirectories.length - 1; i++) {
            diff += '../';
        }
        for (i = 0; i < urlDirectories.length - 1; i++) {
            diff += urlDirectories[i] + '/';
        }
        return diff;
    };
    abstractFileManager.prototype.extractUrlParts = function extractUrlParts(url, baseUrl) {
        var urlPartsRegex = /^((?:[a-z-]+:)?\/{2}(?:[^\/\?#]*\/)|([\/\\]))?((?:[^\/\\\?#]*[\/\\])*)([^\/\\\?#]*)([#\?].*)?$/i, urlParts = url.match(urlPartsRegex), returner = {}, rawDirectories = [], directories = [], i, baseUrlParts;
        if (!urlParts) {
            throw new Error("Could not parse sheet href - '" + url + "'");
        }
        if (baseUrl && (!urlParts[1] || urlParts[2])) {
            baseUrlParts = baseUrl.match(urlPartsRegex);
            if (!baseUrlParts) {
                throw new Error("Could not parse page url - '" + baseUrl + "'");
            }
            urlParts[1] = urlParts[1] || baseUrlParts[1] || '';
            if (!urlParts[2]) {
                urlParts[3] = baseUrlParts[3] + urlParts[3];
            }
        }
        if (urlParts[3]) {
            rawDirectories = urlParts[3].replace(/\\/g, '/').split('/');
            for (i = 0; i < rawDirectories.length; i++) {
                if (rawDirectories[i] === '..') {
                    directories.pop();
                } else if (rawDirectories[i] !== '.') {
                    directories.push(rawDirectories[i]);
                }
            }
        }
        returner.hostPart = urlParts[1];
        returner.directories = directories;
        returner.rawPath = (urlParts[1] || '') + rawDirectories.join('/');
        returner.path = (urlParts[1] || '') + directories.join('/');
        returner.filename = urlParts[4];
        returner.fileUrl = returner.path + (urlParts[4] || '');
        returner.url = returner.fileUrl + (urlParts[5] || '');
        return returner;
    };
    module.exports = abstractFileManager;
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
define('skylark-less/engine/environment/abstract-plugin-loader',[
    '../functions/function-registry',
    '../less-error'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var functionRegistry = __module__0, LessError = __module__1;
    var AbstractPluginLoader = function () {
        this.require = function () {
            return null;
        };
    };
    AbstractPluginLoader.prototype.evalPlugin = function (contents, context, imports, pluginOptions, fileInfo) {
        var loader, registry, pluginObj, localModule, pluginManager, filename, result;
        pluginManager = context.pluginManager;
        if (fileInfo) {
            if (typeof fileInfo === 'string') {
                filename = fileInfo;
            } else {
                filename = fileInfo.filename;
            }
        }
        var shortname = new this.less.FileManager().extractUrlParts(filename).filename;
        if (filename) {
            pluginObj = pluginManager.get(filename);
            if (pluginObj) {
                result = this.trySetOptions(pluginObj, filename, shortname, pluginOptions);
                if (result) {
                    return result;
                }
                try {
                    if (pluginObj.use) {
                        pluginObj.use.call(this.context, pluginObj);
                    }
                } catch (e) {
                    e.message = e.message || 'Error during @plugin call';
                    return new LessError(e, imports, filename);
                }
                return pluginObj;
            }
        }
        localModule = {
            exports: {},
            pluginManager: pluginManager,
            fileInfo: fileInfo
        };
        registry = functionRegistry.create();
        var registerPlugin = function (obj) {
            pluginObj = obj;
        };
        try {
            loader = new Function('module', 'require', 'registerPlugin', 'functions', 'tree', 'less', 'fileInfo', contents);
            loader(localModule, this.require(filename), registerPlugin, registry, this.less.tree, this.less, fileInfo);
        } catch (e) {
            return new LessError(e, imports, filename);
        }
        if (!pluginObj) {
            pluginObj = localModule.exports;
        }
        pluginObj = this.validatePlugin(pluginObj, filename, shortname);
        if (pluginObj instanceof LessError) {
            return pluginObj;
        }
        if (pluginObj) {
            pluginObj.imports = imports;
            pluginObj.filename = filename;
            if (!pluginObj.minVersion || this.compareVersion('3.0.0', pluginObj.minVersion) < 0) {
                result = this.trySetOptions(pluginObj, filename, shortname, pluginOptions);
                if (result) {
                    return result;
                }
            }
            pluginManager.addPlugin(pluginObj, fileInfo.filename, registry);
            pluginObj.functions = registry.getLocalFunctions();
            result = this.trySetOptions(pluginObj, filename, shortname, pluginOptions);
            if (result) {
                return result;
            }
            try {
                if (pluginObj.use) {
                    pluginObj.use.call(this.context, pluginObj);
                }
            } catch (e) {
                e.message = e.message || 'Error during @plugin call';
                return new LessError(e, imports, filename);
            }
        } else {
            return new LessError({ message: 'Not a valid plugin' }, imports, filename);
        }
        return pluginObj;
    };
    AbstractPluginLoader.prototype.trySetOptions = function (plugin, filename, name, options) {
        if (options && !plugin.setOptions) {
            return new LessError({ message: 'Options have been provided but the plugin ' + name + ' does not support any options.' });
        }
        try {
            plugin.setOptions && plugin.setOptions(options);
        } catch (e) {
            return new LessError(e);
        }
    };
    AbstractPluginLoader.prototype.validatePlugin = function (plugin, filename, name) {
        if (plugin) {
            if (typeof plugin === 'function') {
                plugin = new plugin();
            }
            if (plugin.minVersion) {
                if (this.compareVersion(plugin.minVersion, this.less.version) < 0) {
                    return new LessError({ message: 'Plugin ' + name + ' requires version ' + this.versionToString(plugin.minVersion) });
                }
            }
            return plugin;
        }
        return null;
    };
    AbstractPluginLoader.prototype.compareVersion = function (aVersion, bVersion) {
        if (typeof aVersion === 'string') {
            aVersion = aVersion.match(/^(\d+)\.?(\d+)?\.?(\d+)?/);
            aVersion.shift();
        }
        for (var i = 0; i < aVersion.length; i++) {
            if (aVersion[i] !== bVersion[i]) {
                return parseInt(aVersion[i]) > parseInt(bVersion[i]) ? -1 : 1;
            }
        }
        return 0;
    };
    AbstractPluginLoader.prototype.versionToString = function (version) {
        var versionString = '';
        for (var i = 0; i < version.length; i++) {
            versionString += (versionString ? '.' : '') + version[i];
        }
        return versionString;
    };
    AbstractPluginLoader.prototype.printUsage = function (plugins) {
        for (var i = 0; i < plugins.length; i++) {
            var plugin = plugins[i];
            if (plugin.printUsage) {
                plugin.printUsage();
            }
        }
    };
    module.exports = AbstractPluginLoader;
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
define('skylark-less/engine/visitors/visitor',['../tree/index'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var tree = __module__0;
    var _visitArgs = { visitDeeper: true }, _hasIndexed = false;
    function _noop(node) {
        return node;
    }
    function indexNodeTypes(parent, ticker) {
        var key, child;
        for (key in parent) {
            child = parent[key];
            switch (typeof child) {
            case 'function':
                if (child.prototype && child.prototype.type) {
                    child.prototype.typeIndex = ticker++;
                }
                break;
            case 'object':
                ticker = indexNodeTypes(child, ticker);
                break;
            }
        }
        return ticker;
    }
    var Visitor = function (implementation) {
        this._implementation = implementation;
        this._visitInCache = {};
        this._visitOutCache = {};
        if (!_hasIndexed) {
            indexNodeTypes(tree, 1);
            _hasIndexed = true;
        }
    };
    Visitor.prototype = {
        visit: function (node) {
            if (!node) {
                return node;
            }
            var nodeTypeIndex = node.typeIndex;
            if (!nodeTypeIndex) {
                if (node.value && node.value.typeIndex) {
                    this.visit(node.value);
                }
                return node;
            }
            var impl = this._implementation, func = this._visitInCache[nodeTypeIndex], funcOut = this._visitOutCache[nodeTypeIndex], visitArgs = _visitArgs, fnName;
            visitArgs.visitDeeper = true;
            if (!func) {
                fnName = 'visit' + node.type;
                func = impl[fnName] || _noop;
                funcOut = impl[fnName + 'Out'] || _noop;
                this._visitInCache[nodeTypeIndex] = func;
                this._visitOutCache[nodeTypeIndex] = funcOut;
            }
            if (func !== _noop) {
                var newNode = func.call(impl, node, visitArgs);
                if (node && impl.isReplacing) {
                    node = newNode;
                }
            }
            if (visitArgs.visitDeeper && node && node.accept) {
                node.accept(this);
            }
            if (funcOut != _noop) {
                funcOut.call(impl, node);
            }
            return node;
        },
        visitArray: function (nodes, nonReplacing) {
            if (!nodes) {
                return nodes;
            }
            var cnt = nodes.length, i;
            if (nonReplacing || !this._implementation.isReplacing) {
                for (i = 0; i < cnt; i++) {
                    this.visit(nodes[i]);
                }
                return nodes;
            }
            var out = [];
            for (i = 0; i < cnt; i++) {
                var evald = this.visit(nodes[i]);
                if (evald === undefined) {
                    continue;
                }
                if (!evald.splice) {
                    out.push(evald);
                } else if (evald.length) {
                    this.flatten(evald, out);
                }
            }
            return out;
        },
        flatten: function (arr, out) {
            if (!out) {
                out = [];
            }
            var cnt, i, item, nestedCnt, j, nestedItem;
            for (i = 0, cnt = arr.length; i < cnt; i++) {
                item = arr[i];
                if (item === undefined) {
                    continue;
                }
                if (!item.splice) {
                    out.push(item);
                    continue;
                }
                for (j = 0, nestedCnt = item.length; j < nestedCnt; j++) {
                    nestedItem = item[j];
                    if (nestedItem === undefined) {
                        continue;
                    }
                    if (!nestedItem.splice) {
                        out.push(nestedItem);
                    } else if (nestedItem.length) {
                        this.flatten(nestedItem, out);
                    }
                }
            }
            return out;
        }
    };
    module.exports = Visitor;
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
define('skylark-less/engine/visitors/import-sequencer',[], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    function ImportSequencer(onSequencerEmpty) {
        this.imports = [];
        this.variableImports = [];
        this._onSequencerEmpty = onSequencerEmpty;
        this._currentDepth = 0;
    }
    ImportSequencer.prototype.addImport = function (callback) {
        var importSequencer = this, importItem = {
                callback: callback,
                args: null,
                isReady: false
            };
        this.imports.push(importItem);
        return function () {
            importItem.args = Array.prototype.slice.call(arguments, 0);
            importItem.isReady = true;
            importSequencer.tryRun();
        };
    };
    ImportSequencer.prototype.addVariableImport = function (callback) {
        this.variableImports.push(callback);
    };
    ImportSequencer.prototype.tryRun = function () {
        this._currentDepth++;
        try {
            while (true) {
                while (this.imports.length > 0) {
                    var importItem = this.imports[0];
                    if (!importItem.isReady) {
                        return;
                    }
                    this.imports = this.imports.slice(1);
                    importItem.callback.apply(null, importItem.args);
                }
                if (this.variableImports.length === 0) {
                    break;
                }
                var variableImport = this.variableImports[0];
                this.variableImports = this.variableImports.slice(1);
                variableImport();
            }
        } finally {
            this._currentDepth--;
        }
        if (this._currentDepth === 0 && this._onSequencerEmpty) {
            this._onSequencerEmpty();
        }
    };
    module.exports = ImportSequencer;
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
define('skylark-less/engine/visitors/import-visitor',[
    '../contexts',
    './visitor',
    './import-sequencer',
    '../utils'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var contexts = __module__0, Visitor = __module__1, ImportSequencer = __module__2, utils = __module__3;
    var ImportVisitor = function (importer, finish) {
        this._visitor = new Visitor(this);
        this._importer = importer;
        this._finish = finish;
        this.context = new contexts.Eval();
        this.importCount = 0;
        this.onceFileDetectionMap = {};
        this.recursionDetector = {};
        this._sequencer = new ImportSequencer(this._onSequencerEmpty.bind(this));
    };
    ImportVisitor.prototype = {
        isReplacing: false,
        run: function (root) {
            try {
                this._visitor.visit(root);
            } catch (e) {
                this.error = e;
            }
            this.isFinished = true;
            this._sequencer.tryRun();
        },
        _onSequencerEmpty: function () {
            if (!this.isFinished) {
                return;
            }
            this._finish(this.error);
        },
        visitImport: function (importNode, visitArgs) {
            var inlineCSS = importNode.options.inline;
            if (!importNode.css || inlineCSS) {
                var context = new contexts.Eval(this.context, utils.copyArray(this.context.frames));
                var importParent = context.frames[0];
                this.importCount++;
                if (importNode.isVariableImport()) {
                    this._sequencer.addVariableImport(this.processImportNode.bind(this, importNode, context, importParent));
                } else {
                    this.processImportNode(importNode, context, importParent);
                }
            }
            visitArgs.visitDeeper = false;
        },
        processImportNode: function (importNode, context, importParent) {
            var evaldImportNode, inlineCSS = importNode.options.inline;
            try {
                evaldImportNode = importNode.evalForImport(context);
            } catch (e) {
                if (!e.filename) {
                    e.index = importNode.getIndex();
                    e.filename = importNode.fileInfo().filename;
                }
                importNode.css = true;
                importNode.error = e;
            }
            if (evaldImportNode && (!evaldImportNode.css || inlineCSS)) {
                if (evaldImportNode.options.multiple) {
                    context.importMultiple = true;
                }
                var tryAppendLessExtension = evaldImportNode.css === undefined;
                for (var i = 0; i < importParent.rules.length; i++) {
                    if (importParent.rules[i] === importNode) {
                        importParent.rules[i] = evaldImportNode;
                        break;
                    }
                }
                var onImported = this.onImported.bind(this, evaldImportNode, context), sequencedOnImported = this._sequencer.addImport(onImported);
                this._importer.push(evaldImportNode.getPath(), tryAppendLessExtension, evaldImportNode.fileInfo(), evaldImportNode.options, sequencedOnImported);
            } else {
                this.importCount--;
                if (this.isFinished) {
                    this._sequencer.tryRun();
                }
            }
        },
        onImported: function (importNode, context, e, root, importedAtRoot, fullPath) {
            if (e) {
                if (!e.filename) {
                    e.index = importNode.getIndex();
                    e.filename = importNode.fileInfo().filename;
                }
                this.error = e;
            }
            var importVisitor = this, inlineCSS = importNode.options.inline, isPlugin = importNode.options.isPlugin, isOptional = importNode.options.optional, duplicateImport = importedAtRoot || fullPath in importVisitor.recursionDetector;
            if (!context.importMultiple) {
                if (duplicateImport) {
                    importNode.skip = true;
                } else {
                    importNode.skip = function () {
                        if (fullPath in importVisitor.onceFileDetectionMap) {
                            return true;
                        }
                        importVisitor.onceFileDetectionMap[fullPath] = true;
                        return false;
                    };
                }
            }
            if (!fullPath && isOptional) {
                importNode.skip = true;
            }
            if (root) {
                importNode.root = root;
                importNode.importedFilename = fullPath;
                if (!inlineCSS && !isPlugin && (context.importMultiple || !duplicateImport)) {
                    importVisitor.recursionDetector[fullPath] = true;
                    var oldContext = this.context;
                    this.context = context;
                    try {
                        this._visitor.visit(root);
                    } catch (e) {
                        this.error = e;
                    }
                    this.context = oldContext;
                }
            }
            importVisitor.importCount--;
            if (importVisitor.isFinished) {
                importVisitor._sequencer.tryRun();
            }
        },
        visitDeclaration: function (declNode, visitArgs) {
            if (declNode.value.type === 'DetachedRuleset') {
                this.context.frames.unshift(declNode);
            } else {
                visitArgs.visitDeeper = false;
            }
        },
        visitDeclarationOut: function (declNode) {
            if (declNode.value.type === 'DetachedRuleset') {
                this.context.frames.shift();
            }
        },
        visitAtRule: function (atRuleNode, visitArgs) {
            this.context.frames.unshift(atRuleNode);
        },
        visitAtRuleOut: function (atRuleNode) {
            this.context.frames.shift();
        },
        visitMixinDefinition: function (mixinDefinitionNode, visitArgs) {
            this.context.frames.unshift(mixinDefinitionNode);
        },
        visitMixinDefinitionOut: function (mixinDefinitionNode) {
            this.context.frames.shift();
        },
        visitRuleset: function (rulesetNode, visitArgs) {
            this.context.frames.unshift(rulesetNode);
        },
        visitRulesetOut: function (rulesetNode) {
            this.context.frames.shift();
        },
        visitMedia: function (mediaNode, visitArgs) {
            this.context.frames.unshift(mediaNode.rules[0]);
        },
        visitMediaOut: function (mediaNode) {
            this.context.frames.shift();
        }
    };
    module.exports = ImportVisitor;
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
define('skylark-less/engine/visitors/set-tree-visibility-visitor',[], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var SetTreeVisibilityVisitor = function (visible) {
        this.visible = visible;
    };
    SetTreeVisibilityVisitor.prototype.run = function (root) {
        this.visit(root);
    };
    SetTreeVisibilityVisitor.prototype.visitArray = function (nodes) {
        if (!nodes) {
            return nodes;
        }
        var cnt = nodes.length, i;
        for (i = 0; i < cnt; i++) {
            this.visit(nodes[i]);
        }
        return nodes;
    };
    SetTreeVisibilityVisitor.prototype.visit = function (node) {
        if (!node) {
            return node;
        }
        if (node.constructor === Array) {
            return this.visitArray(node);
        }
        if (!node.blocksVisibility || node.blocksVisibility()) {
            return node;
        }
        if (this.visible) {
            node.ensureVisibility();
        } else {
            node.ensureInvisibility();
        }
        node.accept(this);
        return node;
    };
    module.exports = SetTreeVisibilityVisitor;
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
define('skylark-less/engine/visitors/extend-visitor',[
    '../tree/index',
    './visitor',
    '../logger',
    '../utils'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var tree = __module__0, Visitor = __module__1, logger = __module__2, utils = __module__3;
    var ExtendFinderVisitor = function () {
        this._visitor = new Visitor(this);
        this.contexts = [];
        this.allExtendsStack = [[]];
    };
    ExtendFinderVisitor.prototype = {
        run: function (root) {
            root = this._visitor.visit(root);
            root.allExtends = this.allExtendsStack[0];
            return root;
        },
        visitDeclaration: function (declNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitMixinDefinition: function (mixinDefinitionNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitRuleset: function (rulesetNode, visitArgs) {
            if (rulesetNode.root) {
                return;
            }
            var i, j, extend, allSelectorsExtendList = [], extendList;
            var rules = rulesetNode.rules, ruleCnt = rules ? rules.length : 0;
            for (i = 0; i < ruleCnt; i++) {
                if (rulesetNode.rules[i] instanceof tree.Extend) {
                    allSelectorsExtendList.push(rules[i]);
                    rulesetNode.extendOnEveryPath = true;
                }
            }
            var paths = rulesetNode.paths;
            for (i = 0; i < paths.length; i++) {
                var selectorPath = paths[i], selector = selectorPath[selectorPath.length - 1], selExtendList = selector.extendList;
                extendList = selExtendList ? utils.copyArray(selExtendList).concat(allSelectorsExtendList) : allSelectorsExtendList;
                if (extendList) {
                    extendList = extendList.map(function (allSelectorsExtend) {
                        return allSelectorsExtend.clone();
                    });
                }
                for (j = 0; j < extendList.length; j++) {
                    this.foundExtends = true;
                    extend = extendList[j];
                    extend.findSelfSelectors(selectorPath);
                    extend.ruleset = rulesetNode;
                    if (j === 0) {
                        extend.firstExtendOnThisSelectorPath = true;
                    }
                    this.allExtendsStack[this.allExtendsStack.length - 1].push(extend);
                }
            }
            this.contexts.push(rulesetNode.selectors);
        },
        visitRulesetOut: function (rulesetNode) {
            if (!rulesetNode.root) {
                this.contexts.length = this.contexts.length - 1;
            }
        },
        visitMedia: function (mediaNode, visitArgs) {
            mediaNode.allExtends = [];
            this.allExtendsStack.push(mediaNode.allExtends);
        },
        visitMediaOut: function (mediaNode) {
            this.allExtendsStack.length = this.allExtendsStack.length - 1;
        },
        visitAtRule: function (atRuleNode, visitArgs) {
            atRuleNode.allExtends = [];
            this.allExtendsStack.push(atRuleNode.allExtends);
        },
        visitAtRuleOut: function (atRuleNode) {
            this.allExtendsStack.length = this.allExtendsStack.length - 1;
        }
    };
    var ProcessExtendsVisitor = function () {
        this._visitor = new Visitor(this);
    };
    ProcessExtendsVisitor.prototype = {
        run: function (root) {
            var extendFinder = new ExtendFinderVisitor();
            this.extendIndices = {};
            extendFinder.run(root);
            if (!extendFinder.foundExtends) {
                return root;
            }
            root.allExtends = root.allExtends.concat(this.doExtendChaining(root.allExtends, root.allExtends));
            this.allExtendsStack = [root.allExtends];
            var newRoot = this._visitor.visit(root);
            this.checkExtendsForNonMatched(root.allExtends);
            return newRoot;
        },
        checkExtendsForNonMatched: function (extendList) {
            var indices = this.extendIndices;
            extendList.filter(function (extend) {
                return !extend.hasFoundMatches && extend.parent_ids.length == 1;
            }).forEach(function (extend) {
                var selector = '_unknown_';
                try {
                    selector = extend.selector.toCSS({});
                } catch (_) {
                }
                if (!indices[extend.index + ' ' + selector]) {
                    indices[extend.index + ' ' + selector] = true;
                    logger.warn("extend '" + selector + "' has no matches");
                }
            });
        },
        doExtendChaining: function (extendsList, extendsListTarget, iterationCount) {
            var extendIndex, targetExtendIndex, matches, extendsToAdd = [], newSelector, extendVisitor = this, selectorPath, extend, targetExtend, newExtend;
            iterationCount = iterationCount || 0;
            for (extendIndex = 0; extendIndex < extendsList.length; extendIndex++) {
                for (targetExtendIndex = 0; targetExtendIndex < extendsListTarget.length; targetExtendIndex++) {
                    extend = extendsList[extendIndex];
                    targetExtend = extendsListTarget[targetExtendIndex];
                    if (extend.parent_ids.indexOf(targetExtend.object_id) >= 0) {
                        continue;
                    }
                    selectorPath = [targetExtend.selfSelectors[0]];
                    matches = extendVisitor.findMatch(extend, selectorPath);
                    if (matches.length) {
                        extend.hasFoundMatches = true;
                        extend.selfSelectors.forEach(function (selfSelector) {
                            var info = targetExtend.visibilityInfo();
                            newSelector = extendVisitor.extendSelector(matches, selectorPath, selfSelector, extend.isVisible());
                            newExtend = new tree.Extend(targetExtend.selector, targetExtend.option, 0, targetExtend.fileInfo(), info);
                            newExtend.selfSelectors = newSelector;
                            newSelector[newSelector.length - 1].extendList = [newExtend];
                            extendsToAdd.push(newExtend);
                            newExtend.ruleset = targetExtend.ruleset;
                            newExtend.parent_ids = newExtend.parent_ids.concat(targetExtend.parent_ids, extend.parent_ids);
                            if (targetExtend.firstExtendOnThisSelectorPath) {
                                newExtend.firstExtendOnThisSelectorPath = true;
                                targetExtend.ruleset.paths.push(newSelector);
                            }
                        });
                    }
                }
            }
            if (extendsToAdd.length) {
                this.extendChainCount++;
                if (iterationCount > 100) {
                    var selectorOne = '{unable to calculate}';
                    var selectorTwo = '{unable to calculate}';
                    try {
                        selectorOne = extendsToAdd[0].selfSelectors[0].toCSS();
                        selectorTwo = extendsToAdd[0].selector.toCSS();
                    } catch (e) {
                    }
                    throw { message: 'extend circular reference detected. One of the circular extends is currently:' + selectorOne + ':extend(' + selectorTwo + ')' };
                }
                return extendsToAdd.concat(extendVisitor.doExtendChaining(extendsToAdd, extendsListTarget, iterationCount + 1));
            } else {
                return extendsToAdd;
            }
        },
        visitDeclaration: function (ruleNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitMixinDefinition: function (mixinDefinitionNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitSelector: function (selectorNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitRuleset: function (rulesetNode, visitArgs) {
            if (rulesetNode.root) {
                return;
            }
            var matches, pathIndex, extendIndex, allExtends = this.allExtendsStack[this.allExtendsStack.length - 1], selectorsToAdd = [], extendVisitor = this, selectorPath;
            for (extendIndex = 0; extendIndex < allExtends.length; extendIndex++) {
                for (pathIndex = 0; pathIndex < rulesetNode.paths.length; pathIndex++) {
                    selectorPath = rulesetNode.paths[pathIndex];
                    if (rulesetNode.extendOnEveryPath) {
                        continue;
                    }
                    var extendList = selectorPath[selectorPath.length - 1].extendList;
                    if (extendList && extendList.length) {
                        continue;
                    }
                    matches = this.findMatch(allExtends[extendIndex], selectorPath);
                    if (matches.length) {
                        allExtends[extendIndex].hasFoundMatches = true;
                        allExtends[extendIndex].selfSelectors.forEach(function (selfSelector) {
                            var extendedSelectors;
                            extendedSelectors = extendVisitor.extendSelector(matches, selectorPath, selfSelector, allExtends[extendIndex].isVisible());
                            selectorsToAdd.push(extendedSelectors);
                        });
                    }
                }
            }
            rulesetNode.paths = rulesetNode.paths.concat(selectorsToAdd);
        },
        findMatch: function (extend, haystackSelectorPath) {
            var haystackSelectorIndex, hackstackSelector, hackstackElementIndex, haystackElement, targetCombinator, i, extendVisitor = this, needleElements = extend.selector.elements, potentialMatches = [], potentialMatch, matches = [];
            for (haystackSelectorIndex = 0; haystackSelectorIndex < haystackSelectorPath.length; haystackSelectorIndex++) {
                hackstackSelector = haystackSelectorPath[haystackSelectorIndex];
                for (hackstackElementIndex = 0; hackstackElementIndex < hackstackSelector.elements.length; hackstackElementIndex++) {
                    haystackElement = hackstackSelector.elements[hackstackElementIndex];
                    if (extend.allowBefore || haystackSelectorIndex === 0 && hackstackElementIndex === 0) {
                        potentialMatches.push({
                            pathIndex: haystackSelectorIndex,
                            index: hackstackElementIndex,
                            matched: 0,
                            initialCombinator: haystackElement.combinator
                        });
                    }
                    for (i = 0; i < potentialMatches.length; i++) {
                        potentialMatch = potentialMatches[i];
                        targetCombinator = haystackElement.combinator.value;
                        if (targetCombinator === '' && hackstackElementIndex === 0) {
                            targetCombinator = ' ';
                        }
                        if (!extendVisitor.isElementValuesEqual(needleElements[potentialMatch.matched].value, haystackElement.value) || potentialMatch.matched > 0 && needleElements[potentialMatch.matched].combinator.value !== targetCombinator) {
                            potentialMatch = null;
                        } else {
                            potentialMatch.matched++;
                        }
                        if (potentialMatch) {
                            potentialMatch.finished = potentialMatch.matched === needleElements.length;
                            if (potentialMatch.finished && (!extend.allowAfter && (hackstackElementIndex + 1 < hackstackSelector.elements.length || haystackSelectorIndex + 1 < haystackSelectorPath.length))) {
                                potentialMatch = null;
                            }
                        }
                        if (potentialMatch) {
                            if (potentialMatch.finished) {
                                potentialMatch.length = needleElements.length;
                                potentialMatch.endPathIndex = haystackSelectorIndex;
                                potentialMatch.endPathElementIndex = hackstackElementIndex + 1;
                                potentialMatches.length = 0;
                                matches.push(potentialMatch);
                            }
                        } else {
                            potentialMatches.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
            return matches;
        },
        isElementValuesEqual: function (elementValue1, elementValue2) {
            if (typeof elementValue1 === 'string' || typeof elementValue2 === 'string') {
                return elementValue1 === elementValue2;
            }
            if (elementValue1 instanceof tree.Attribute) {
                if (elementValue1.op !== elementValue2.op || elementValue1.key !== elementValue2.key) {
                    return false;
                }
                if (!elementValue1.value || !elementValue2.value) {
                    if (elementValue1.value || elementValue2.value) {
                        return false;
                    }
                    return true;
                }
                elementValue1 = elementValue1.value.value || elementValue1.value;
                elementValue2 = elementValue2.value.value || elementValue2.value;
                return elementValue1 === elementValue2;
            }
            elementValue1 = elementValue1.value;
            elementValue2 = elementValue2.value;
            if (elementValue1 instanceof tree.Selector) {
                if (!(elementValue2 instanceof tree.Selector) || elementValue1.elements.length !== elementValue2.elements.length) {
                    return false;
                }
                for (var i = 0; i < elementValue1.elements.length; i++) {
                    if (elementValue1.elements[i].combinator.value !== elementValue2.elements[i].combinator.value) {
                        if (i !== 0 || (elementValue1.elements[i].combinator.value || ' ') !== (elementValue2.elements[i].combinator.value || ' ')) {
                            return false;
                        }
                    }
                    if (!this.isElementValuesEqual(elementValue1.elements[i].value, elementValue2.elements[i].value)) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        },
        extendSelector: function (matches, selectorPath, replacementSelector, isVisible) {
            var currentSelectorPathIndex = 0, currentSelectorPathElementIndex = 0, path = [], matchIndex, selector, firstElement, match, newElements;
            for (matchIndex = 0; matchIndex < matches.length; matchIndex++) {
                match = matches[matchIndex];
                selector = selectorPath[match.pathIndex];
                firstElement = new tree.Element(match.initialCombinator, replacementSelector.elements[0].value, replacementSelector.elements[0].isVariable, replacementSelector.elements[0].getIndex(), replacementSelector.elements[0].fileInfo());
                if (match.pathIndex > currentSelectorPathIndex && currentSelectorPathElementIndex > 0) {
                    path[path.length - 1].elements = path[path.length - 1].elements.concat(selectorPath[currentSelectorPathIndex].elements.slice(currentSelectorPathElementIndex));
                    currentSelectorPathElementIndex = 0;
                    currentSelectorPathIndex++;
                }
                newElements = selector.elements.slice(currentSelectorPathElementIndex, match.index).concat([firstElement]).concat(replacementSelector.elements.slice(1));
                if (currentSelectorPathIndex === match.pathIndex && matchIndex > 0) {
                    path[path.length - 1].elements = path[path.length - 1].elements.concat(newElements);
                } else {
                    path = path.concat(selectorPath.slice(currentSelectorPathIndex, match.pathIndex));
                    path.push(new tree.Selector(newElements));
                }
                currentSelectorPathIndex = match.endPathIndex;
                currentSelectorPathElementIndex = match.endPathElementIndex;
                if (currentSelectorPathElementIndex >= selectorPath[currentSelectorPathIndex].elements.length) {
                    currentSelectorPathElementIndex = 0;
                    currentSelectorPathIndex++;
                }
            }
            if (currentSelectorPathIndex < selectorPath.length && currentSelectorPathElementIndex > 0) {
                path[path.length - 1].elements = path[path.length - 1].elements.concat(selectorPath[currentSelectorPathIndex].elements.slice(currentSelectorPathElementIndex));
                currentSelectorPathIndex++;
            }
            path = path.concat(selectorPath.slice(currentSelectorPathIndex, selectorPath.length));
            path = path.map(function (currentValue) {
                var derived = currentValue.createDerived(currentValue.elements);
                if (isVisible) {
                    derived.ensureVisibility();
                } else {
                    derived.ensureInvisibility();
                }
                return derived;
            });
            return path;
        },
        visitMedia: function (mediaNode, visitArgs) {
            var newAllExtends = mediaNode.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
            newAllExtends = newAllExtends.concat(this.doExtendChaining(newAllExtends, mediaNode.allExtends));
            this.allExtendsStack.push(newAllExtends);
        },
        visitMediaOut: function (mediaNode) {
            var lastIndex = this.allExtendsStack.length - 1;
            this.allExtendsStack.length = lastIndex;
        },
        visitAtRule: function (atRuleNode, visitArgs) {
            var newAllExtends = atRuleNode.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
            newAllExtends = newAllExtends.concat(this.doExtendChaining(newAllExtends, atRuleNode.allExtends));
            this.allExtendsStack.push(newAllExtends);
        },
        visitAtRuleOut: function (atRuleNode) {
            var lastIndex = this.allExtendsStack.length - 1;
            this.allExtendsStack.length = lastIndex;
        }
    };
    module.exports = ProcessExtendsVisitor;
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
define('skylark-less/engine/visitors/join-selector-visitor',['./visitor'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Visitor = __module__0;
    var JoinSelectorVisitor = function () {
        this.contexts = [[]];
        this._visitor = new Visitor(this);
    };
    JoinSelectorVisitor.prototype = {
        run: function (root) {
            return this._visitor.visit(root);
        },
        visitDeclaration: function (declNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitMixinDefinition: function (mixinDefinitionNode, visitArgs) {
            visitArgs.visitDeeper = false;
        },
        visitRuleset: function (rulesetNode, visitArgs) {
            var context = this.contexts[this.contexts.length - 1], paths = [], selectors;
            this.contexts.push(paths);
            if (!rulesetNode.root) {
                selectors = rulesetNode.selectors;
                if (selectors) {
                    selectors = selectors.filter(function (selector) {
                        return selector.getIsOutput();
                    });
                    rulesetNode.selectors = selectors.length ? selectors : selectors = null;
                    if (selectors) {
                        rulesetNode.joinSelectors(paths, context, selectors);
                    }
                }
                if (!selectors) {
                    rulesetNode.rules = null;
                }
                rulesetNode.paths = paths;
            }
        },
        visitRulesetOut: function (rulesetNode) {
            this.contexts.length = this.contexts.length - 1;
        },
        visitMedia: function (mediaNode, visitArgs) {
            var context = this.contexts[this.contexts.length - 1];
            mediaNode.rules[0].root = context.length === 0 || context[0].multiMedia;
        },
        visitAtRule: function (atRuleNode, visitArgs) {
            var context = this.contexts[this.contexts.length - 1];
            if (atRuleNode.rules && atRuleNode.rules.length) {
                atRuleNode.rules[0].root = atRuleNode.isRooted || context.length === 0 || null;
            }
        }
    };
    module.exports = JoinSelectorVisitor;
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
define('skylark-less/engine/visitors/to-css-visitor',[
    '../tree/index',
    './visitor'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var tree = __module__0, Visitor = __module__1;
    var CSSVisitorUtils = function (context) {
        this._visitor = new Visitor(this);
        this._context = context;
    };
    CSSVisitorUtils.prototype = {
        containsSilentNonBlockedChild: function (bodyRules) {
            var rule;
            if (!bodyRules) {
                return false;
            }
            for (var r = 0; r < bodyRules.length; r++) {
                rule = bodyRules[r];
                if (rule.isSilent && rule.isSilent(this._context) && !rule.blocksVisibility()) {
                    return true;
                }
            }
            return false;
        },
        keepOnlyVisibleChilds: function (owner) {
            if (owner && owner.rules) {
                owner.rules = owner.rules.filter(function (thing) {
                    return thing.isVisible();
                });
            }
        },
        isEmpty: function (owner) {
            return owner && owner.rules ? owner.rules.length === 0 : true;
        },
        hasVisibleSelector: function (rulesetNode) {
            return rulesetNode && rulesetNode.paths ? rulesetNode.paths.length > 0 : false;
        },
        resolveVisibility: function (node, originalRules) {
            if (!node.blocksVisibility()) {
                if (this.isEmpty(node) && !this.containsSilentNonBlockedChild(originalRules)) {
                    return;
                }
                return node;
            }
            var compiledRulesBody = node.rules[0];
            this.keepOnlyVisibleChilds(compiledRulesBody);
            if (this.isEmpty(compiledRulesBody)) {
                return;
            }
            node.ensureVisibility();
            node.removeVisibilityBlock();
            return node;
        },
        isVisibleRuleset: function (rulesetNode) {
            if (rulesetNode.firstRoot) {
                return true;
            }
            if (this.isEmpty(rulesetNode)) {
                return false;
            }
            if (!rulesetNode.root && !this.hasVisibleSelector(rulesetNode)) {
                return false;
            }
            return true;
        }
    };
    var ToCSSVisitor = function (context) {
        this._visitor = new Visitor(this);
        this._context = context;
        this.utils = new CSSVisitorUtils(context);
    };
    ToCSSVisitor.prototype = {
        isReplacing: true,
        run: function (root) {
            return this._visitor.visit(root);
        },
        visitDeclaration: function (declNode, visitArgs) {
            if (declNode.blocksVisibility() || declNode.variable) {
                return;
            }
            return declNode;
        },
        visitMixinDefinition: function (mixinNode, visitArgs) {
            mixinNode.frames = [];
        },
        visitExtend: function (extendNode, visitArgs) {
        },
        visitComment: function (commentNode, visitArgs) {
            if (commentNode.blocksVisibility() || commentNode.isSilent(this._context)) {
                return;
            }
            return commentNode;
        },
        visitMedia: function (mediaNode, visitArgs) {
            var originalRules = mediaNode.rules[0].rules;
            mediaNode.accept(this._visitor);
            visitArgs.visitDeeper = false;
            return this.utils.resolveVisibility(mediaNode, originalRules);
        },
        visitImport: function (importNode, visitArgs) {
            if (importNode.blocksVisibility()) {
                return;
            }
            return importNode;
        },
        visitAtRule: function (atRuleNode, visitArgs) {
            if (atRuleNode.rules && atRuleNode.rules.length) {
                return this.visitAtRuleWithBody(atRuleNode, visitArgs);
            } else {
                return this.visitAtRuleWithoutBody(atRuleNode, visitArgs);
            }
        },
        visitAnonymous: function (anonymousNode, visitArgs) {
            if (!anonymousNode.blocksVisibility()) {
                anonymousNode.accept(this._visitor);
                return anonymousNode;
            }
        },
        visitAtRuleWithBody: function (atRuleNode, visitArgs) {
            function hasFakeRuleset(atRuleNode) {
                var bodyRules = atRuleNode.rules;
                return bodyRules.length === 1 && (!bodyRules[0].paths || bodyRules[0].paths.length === 0);
            }
            function getBodyRules(atRuleNode) {
                var nodeRules = atRuleNode.rules;
                if (hasFakeRuleset(atRuleNode)) {
                    return nodeRules[0].rules;
                }
                return nodeRules;
            }
            var originalRules = getBodyRules(atRuleNode);
            atRuleNode.accept(this._visitor);
            visitArgs.visitDeeper = false;
            if (!this.utils.isEmpty(atRuleNode)) {
                this._mergeRules(atRuleNode.rules[0].rules);
            }
            return this.utils.resolveVisibility(atRuleNode, originalRules);
        },
        visitAtRuleWithoutBody: function (atRuleNode, visitArgs) {
            if (atRuleNode.blocksVisibility()) {
                return;
            }
            if (atRuleNode.name === '@charset') {
                if (this.charset) {
                    if (atRuleNode.debugInfo) {
                        var comment = new tree.Comment('/* ' + atRuleNode.toCSS(this._context).replace(/\n/g, '') + ' */\n');
                        comment.debugInfo = atRuleNode.debugInfo;
                        return this._visitor.visit(comment);
                    }
                    return;
                }
                this.charset = true;
            }
            return atRuleNode;
        },
        checkValidNodes: function (rules, isRoot) {
            if (!rules) {
                return;
            }
            for (var i = 0; i < rules.length; i++) {
                var ruleNode = rules[i];
                if (isRoot && ruleNode instanceof tree.Declaration && !ruleNode.variable) {
                    throw {
                        message: 'Properties must be inside selector blocks. They cannot be in the root',
                        index: ruleNode.getIndex(),
                        filename: ruleNode.fileInfo() && ruleNode.fileInfo().filename
                    };
                }
                if (ruleNode instanceof tree.Call) {
                    throw {
                        message: "Function '" + ruleNode.name + "' is undefined",
                        index: ruleNode.getIndex(),
                        filename: ruleNode.fileInfo() && ruleNode.fileInfo().filename
                    };
                }
                if (ruleNode.type && !ruleNode.allowRoot) {
                    throw {
                        message: ruleNode.type + ' node returned by a function is not valid here',
                        index: ruleNode.getIndex(),
                        filename: ruleNode.fileInfo() && ruleNode.fileInfo().filename
                    };
                }
            }
        },
        visitRuleset: function (rulesetNode, visitArgs) {
            var rule, rulesets = [];
            this.checkValidNodes(rulesetNode.rules, rulesetNode.firstRoot);
            if (!rulesetNode.root) {
                this._compileRulesetPaths(rulesetNode);
                var nodeRules = rulesetNode.rules, nodeRuleCnt = nodeRules ? nodeRules.length : 0;
                for (var i = 0; i < nodeRuleCnt;) {
                    rule = nodeRules[i];
                    if (rule && rule.rules) {
                        rulesets.push(this._visitor.visit(rule));
                        nodeRules.splice(i, 1);
                        nodeRuleCnt--;
                        continue;
                    }
                    i++;
                }
                if (nodeRuleCnt > 0) {
                    rulesetNode.accept(this._visitor);
                } else {
                    rulesetNode.rules = null;
                }
                visitArgs.visitDeeper = false;
            } else {
                rulesetNode.accept(this._visitor);
                visitArgs.visitDeeper = false;
            }
            if (rulesetNode.rules) {
                this._mergeRules(rulesetNode.rules);
                this._removeDuplicateRules(rulesetNode.rules);
            }
            if (this.utils.isVisibleRuleset(rulesetNode)) {
                rulesetNode.ensureVisibility();
                rulesets.splice(0, 0, rulesetNode);
            }
            if (rulesets.length === 1) {
                return rulesets[0];
            }
            return rulesets;
        },
        _compileRulesetPaths: function (rulesetNode) {
            if (rulesetNode.paths) {
                rulesetNode.paths = rulesetNode.paths.filter(function (p) {
                    var i;
                    if (p[0].elements[0].combinator.value === ' ') {
                        p[0].elements[0].combinator = new tree.Combinator('');
                    }
                    for (i = 0; i < p.length; i++) {
                        if (p[i].isVisible() && p[i].getIsOutput()) {
                            return true;
                        }
                    }
                    return false;
                });
            }
        },
        _removeDuplicateRules: function (rules) {
            if (!rules) {
                return;
            }
            var ruleCache = {}, ruleList, rule, i;
            for (i = rules.length - 1; i >= 0; i--) {
                rule = rules[i];
                if (rule instanceof tree.Declaration) {
                    if (!ruleCache[rule.name]) {
                        ruleCache[rule.name] = rule;
                    } else {
                        ruleList = ruleCache[rule.name];
                        if (ruleList instanceof tree.Declaration) {
                            ruleList = ruleCache[rule.name] = [ruleCache[rule.name].toCSS(this._context)];
                        }
                        var ruleCSS = rule.toCSS(this._context);
                        if (ruleList.indexOf(ruleCSS) !== -1) {
                            rules.splice(i, 1);
                        } else {
                            ruleList.push(ruleCSS);
                        }
                    }
                }
            }
        },
        _mergeRules: function (rules) {
            if (!rules) {
                return;
            }
            var groups = {}, groupsArr = [];
            for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];
                if (rule.merge) {
                    var key = rule.name;
                    groups[key] ? rules.splice(i--, 1) : groupsArr.push(groups[key] = []);
                    groups[key].push(rule);
                }
            }
            groupsArr.forEach(function (group) {
                if (group.length > 0) {
                    var result = group[0], space = [], comma = [new tree.Expression(space)];
                    group.forEach(function (rule) {
                        if (rule.merge === '+' && space.length > 0) {
                            comma.push(new tree.Expression(space = []));
                        }
                        space.push(rule.value);
                        result.important = result.important || rule.important;
                    });
                    result.value = new tree.Value(comma);
                }
            });
        }
    };
    module.exports = ToCSSVisitor;
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
define('skylark-less/engine/visitors/index',[
    './visitor',
    './import-visitor',
    './set-tree-visibility-visitor',
    './extend-visitor',
    './join-selector-visitor',
    './to-css-visitor'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var visitors = {
        Visitor: __module__0,
        ImportVisitor: __module__1,
        MarkVisibleSelectorsVisitor: __module__2,
        ExtendVisitor: __module__3,
        JoinSelectorVisitor: __module__4,
        ToCSSVisitor: __module__5
    };
    module.exports = visitors;
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
define('skylark-less/engine/parser/chunker',[], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = function (input, fail) {
        var len = input.length, level = 0, parenLevel = 0, lastOpening, lastOpeningParen, lastMultiComment, lastMultiCommentEndBrace, chunks = [], emitFrom = 0, chunkerCurrentIndex, currentChunkStartIndex, cc, cc2, matched;
        function emitChunk(force) {
            var len = chunkerCurrentIndex - emitFrom;
            if (len < 512 && !force || !len) {
                return;
            }
            chunks.push(input.slice(emitFrom, chunkerCurrentIndex + 1));
            emitFrom = chunkerCurrentIndex + 1;
        }
        for (chunkerCurrentIndex = 0; chunkerCurrentIndex < len; chunkerCurrentIndex++) {
            cc = input.charCodeAt(chunkerCurrentIndex);
            if (cc >= 97 && cc <= 122 || cc < 34) {
                continue;
            }
            switch (cc) {
            case 40:
                parenLevel++;
                lastOpeningParen = chunkerCurrentIndex;
                continue;
            case 41:
                if (--parenLevel < 0) {
                    return fail('missing opening `(`', chunkerCurrentIndex);
                }
                continue;
            case 59:
                if (!parenLevel) {
                    emitChunk();
                }
                continue;
            case 123:
                level++;
                lastOpening = chunkerCurrentIndex;
                continue;
            case 125:
                if (--level < 0) {
                    return fail('missing opening `{`', chunkerCurrentIndex);
                }
                if (!level && !parenLevel) {
                    emitChunk();
                }
                continue;
            case 92:
                if (chunkerCurrentIndex < len - 1) {
                    chunkerCurrentIndex++;
                    continue;
                }
                return fail('unescaped `\\`', chunkerCurrentIndex);
            case 34:
            case 39:
            case 96:
                matched = 0;
                currentChunkStartIndex = chunkerCurrentIndex;
                for (chunkerCurrentIndex = chunkerCurrentIndex + 1; chunkerCurrentIndex < len; chunkerCurrentIndex++) {
                    cc2 = input.charCodeAt(chunkerCurrentIndex);
                    if (cc2 > 96) {
                        continue;
                    }
                    if (cc2 == cc) {
                        matched = 1;
                        break;
                    }
                    if (cc2 == 92) {
                        if (chunkerCurrentIndex == len - 1) {
                            return fail('unescaped `\\`', chunkerCurrentIndex);
                        }
                        chunkerCurrentIndex++;
                    }
                }
                if (matched) {
                    continue;
                }
                return fail('unmatched `' + String.fromCharCode(cc) + '`', currentChunkStartIndex);
            case 47:
                if (parenLevel || chunkerCurrentIndex == len - 1) {
                    continue;
                }
                cc2 = input.charCodeAt(chunkerCurrentIndex + 1);
                if (cc2 == 47) {
                    for (chunkerCurrentIndex = chunkerCurrentIndex + 2; chunkerCurrentIndex < len; chunkerCurrentIndex++) {
                        cc2 = input.charCodeAt(chunkerCurrentIndex);
                        if (cc2 <= 13 && (cc2 == 10 || cc2 == 13)) {
                            break;
                        }
                    }
                } else if (cc2 == 42) {
                    lastMultiComment = currentChunkStartIndex = chunkerCurrentIndex;
                    for (chunkerCurrentIndex = chunkerCurrentIndex + 2; chunkerCurrentIndex < len - 1; chunkerCurrentIndex++) {
                        cc2 = input.charCodeAt(chunkerCurrentIndex);
                        if (cc2 == 125) {
                            lastMultiCommentEndBrace = chunkerCurrentIndex;
                        }
                        if (cc2 != 42) {
                            continue;
                        }
                        if (input.charCodeAt(chunkerCurrentIndex + 1) == 47) {
                            break;
                        }
                    }
                    if (chunkerCurrentIndex == len - 1) {
                        return fail('missing closing `*/`', currentChunkStartIndex);
                    }
                    chunkerCurrentIndex++;
                }
                continue;
            case 42:
                if (chunkerCurrentIndex < len - 1 && input.charCodeAt(chunkerCurrentIndex + 1) == 47) {
                    return fail('unmatched `/*`', chunkerCurrentIndex);
                }
                continue;
            }
        }
        if (level !== 0) {
            if (lastMultiComment > lastOpening && lastMultiCommentEndBrace > lastMultiComment) {
                return fail('missing closing `}` or `*/`', lastOpening);
            } else {
                return fail('missing closing `}`', lastOpening);
            }
        } else if (parenLevel !== 0) {
            return fail('missing closing `)`', lastOpeningParen);
        }
        emitChunk(true);
        return chunks;
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
define('skylark-less/engine/parser/parser-input',['./chunker'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var chunker = __module__0;
    module.exports = function () {
        var input, j, saveStack = [], furthest, furthestPossibleErrorMessage, chunks, current, currentPos, parserInput = {};
        var CHARCODE_SPACE = 32, CHARCODE_TAB = 9, CHARCODE_LF = 10, CHARCODE_CR = 13, CHARCODE_PLUS = 43, CHARCODE_COMMA = 44, CHARCODE_FORWARD_SLASH = 47, CHARCODE_9 = 57;
        function skipWhitespace(length) {
            var oldi = parserInput.i, oldj = j, curr = parserInput.i - currentPos, endIndex = parserInput.i + current.length - curr, mem = parserInput.i += length, inp = input, c, nextChar, comment;
            for (; parserInput.i < endIndex; parserInput.i++) {
                c = inp.charCodeAt(parserInput.i);
                if (parserInput.autoCommentAbsorb && c === CHARCODE_FORWARD_SLASH) {
                    nextChar = inp.charAt(parserInput.i + 1);
                    if (nextChar === '/') {
                        comment = {
                            index: parserInput.i,
                            isLineComment: true
                        };
                        var nextNewLine = inp.indexOf('\n', parserInput.i + 2);
                        if (nextNewLine < 0) {
                            nextNewLine = endIndex;
                        }
                        parserInput.i = nextNewLine;
                        comment.text = inp.substr(comment.index, parserInput.i - comment.index);
                        parserInput.commentStore.push(comment);
                        continue;
                    } else if (nextChar === '*') {
                        var nextStarSlash = inp.indexOf('*/', parserInput.i + 2);
                        if (nextStarSlash >= 0) {
                            comment = {
                                index: parserInput.i,
                                text: inp.substr(parserInput.i, nextStarSlash + 2 - parserInput.i),
                                isLineComment: false
                            };
                            parserInput.i += comment.text.length - 1;
                            parserInput.commentStore.push(comment);
                            continue;
                        }
                    }
                    break;
                }
                if (c !== CHARCODE_SPACE && c !== CHARCODE_LF && c !== CHARCODE_TAB && c !== CHARCODE_CR) {
                    break;
                }
            }
            current = current.slice(length + parserInput.i - mem + curr);
            currentPos = parserInput.i;
            if (!current.length) {
                if (j < chunks.length - 1) {
                    current = chunks[++j];
                    skipWhitespace(0);
                    return true;
                }
                parserInput.finished = true;
            }
            return oldi !== parserInput.i || oldj !== j;
        }
        parserInput.save = function () {
            currentPos = parserInput.i;
            saveStack.push({
                current: current,
                i: parserInput.i,
                j: j
            });
        };
        parserInput.restore = function (possibleErrorMessage) {
            if (parserInput.i > furthest || parserInput.i === furthest && possibleErrorMessage && !furthestPossibleErrorMessage) {
                furthest = parserInput.i;
                furthestPossibleErrorMessage = possibleErrorMessage;
            }
            var state = saveStack.pop();
            current = state.current;
            currentPos = parserInput.i = state.i;
            j = state.j;
        };
        parserInput.forget = function () {
            saveStack.pop();
        };
        parserInput.isWhitespace = function (offset) {
            var pos = parserInput.i + (offset || 0), code = input.charCodeAt(pos);
            return code === CHARCODE_SPACE || code === CHARCODE_CR || code === CHARCODE_TAB || code === CHARCODE_LF;
        };
        parserInput.$re = function (tok) {
            if (parserInput.i > currentPos) {
                current = current.slice(parserInput.i - currentPos);
                currentPos = parserInput.i;
            }
            var m = tok.exec(current);
            if (!m) {
                return null;
            }
            skipWhitespace(m[0].length);
            if (typeof m === 'string') {
                return m;
            }
            return m.length === 1 ? m[0] : m;
        };
        parserInput.$char = function (tok) {
            if (input.charAt(parserInput.i) !== tok) {
                return null;
            }
            skipWhitespace(1);
            return tok;
        };
        parserInput.$str = function (tok) {
            var tokLength = tok.length;
            for (var i = 0; i < tokLength; i++) {
                if (input.charAt(parserInput.i + i) !== tok.charAt(i)) {
                    return null;
                }
            }
            skipWhitespace(tokLength);
            return tok;
        };
        parserInput.$quoted = function (loc) {
            var pos = loc || parserInput.i, startChar = input.charAt(pos);
            if (startChar !== "'" && startChar !== '"') {
                return;
            }
            var length = input.length, currentPosition = pos;
            for (var i = 1; i + currentPosition < length; i++) {
                var nextChar = input.charAt(i + currentPosition);
                switch (nextChar) {
                case '\\':
                    i++;
                    continue;
                case '\r':
                case '\n':
                    break;
                case startChar:
                    var str = input.substr(currentPosition, i + 1);
                    if (!loc && loc !== 0) {
                        skipWhitespace(i + 1);
                        return str;
                    }
                    return [
                        startChar,
                        str
                    ];
                default:
                }
            }
            return null;
        };
        parserInput.$parseUntil = function (tok) {
            var quote = '', returnVal = null, inComment = false, blockDepth = 0, blockStack = [], parseGroups = [], length = input.length, startPos = parserInput.i, lastPos = parserInput.i, i = parserInput.i, loop = true, testChar;
            if (typeof tok === 'string') {
                testChar = function (char) {
                    return char === tok;
                };
            } else {
                testChar = function (char) {
                    return tok.test(char);
                };
            }
            do {
                var prevChar, nextChar = input.charAt(i);
                if (blockDepth === 0 && testChar(nextChar)) {
                    returnVal = input.substr(lastPos, i - lastPos);
                    if (returnVal) {
                        parseGroups.push(returnVal);
                    } else {
                        parseGroups.push(' ');
                    }
                    returnVal = parseGroups;
                    skipWhitespace(i - startPos);
                    loop = false;
                } else {
                    if (inComment) {
                        if (nextChar === '*' && input.charAt(i + 1) === '/') {
                            i++;
                            blockDepth--;
                            inComment = false;
                        }
                        i++;
                        continue;
                    }
                    switch (nextChar) {
                    case '\\':
                        i++;
                        nextChar = input.charAt(i);
                        parseGroups.push(input.substr(lastPos, i - lastPos + 1));
                        lastPos = i + 1;
                        break;
                    case '/':
                        if (input.charAt(i + 1) === '*') {
                            i++;
                            inComment = true;
                            blockDepth++;
                        }
                        break;
                    case "'":
                    case '"':
                        quote = parserInput.$quoted(i);
                        if (quote) {
                            parseGroups.push(input.substr(lastPos, i - lastPos), quote);
                            i += quote[1].length - 1;
                            lastPos = i + 1;
                        } else {
                            skipWhitespace(i - startPos);
                            returnVal = nextChar;
                            loop = false;
                        }
                        break;
                    case '{':
                        blockStack.push('}');
                        blockDepth++;
                        break;
                    case '(':
                        blockStack.push(')');
                        blockDepth++;
                        break;
                    case '[':
                        blockStack.push(']');
                        blockDepth++;
                        break;
                    case '}':
                    case ')':
                    case ']':
                        var expected = blockStack.pop();
                        if (nextChar === expected) {
                            blockDepth--;
                        } else {
                            skipWhitespace(i - startPos);
                            returnVal = expected;
                            loop = false;
                        }
                    }
                    i++;
                    if (i > length) {
                        loop = false;
                    }
                }
                prevChar = nextChar;
            } while (loop);
            return returnVal ? returnVal : null;
        };
        parserInput.autoCommentAbsorb = true;
        parserInput.commentStore = [];
        parserInput.finished = false;
        parserInput.peek = function (tok) {
            if (typeof tok === 'string') {
                for (var i = 0; i < tok.length; i++) {
                    if (input.charAt(parserInput.i + i) !== tok.charAt(i)) {
                        return false;
                    }
                }
                return true;
            } else {
                return tok.test(current);
            }
        };
        parserInput.peekChar = function (tok) {
            return input.charAt(parserInput.i) === tok;
        };
        parserInput.currentChar = function () {
            return input.charAt(parserInput.i);
        };
        parserInput.prevChar = function () {
            return input.charAt(parserInput.i - 1);
        };
        parserInput.getInput = function () {
            return input;
        };
        parserInput.peekNotNumeric = function () {
            var c = input.charCodeAt(parserInput.i);
            return c > CHARCODE_9 || c < CHARCODE_PLUS || c === CHARCODE_FORWARD_SLASH || c === CHARCODE_COMMA;
        };
        parserInput.start = function (str, chunkInput, failFunction) {
            input = str;
            parserInput.i = j = currentPos = furthest = 0;
            if (chunkInput) {
                chunks = chunker(str, failFunction);
            } else {
                chunks = [str];
            }
            current = chunks[0];
            skipWhitespace(0);
        };
        parserInput.end = function () {
            var message, isFinished = parserInput.i >= input.length;
            if (parserInput.i < furthest) {
                message = furthestPossibleErrorMessage;
                parserInput.i = furthest;
            }
            return {
                isFinished: isFinished,
                furthest: parserInput.i,
                furthestPossibleErrorMessage: message,
                furthestReachedEnd: parserInput.i >= input.length - 1,
                furthestChar: input[parserInput.i]
            };
        };
        return parserInput;
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
define('skylark-less/engine/parser/parser',[
    '../less-error',
    '../tree/index',
    '../visitors/index',
    './parser-input',
    '../utils',
    '../functions/function-registry'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var LessError = __module__0, tree = __module__1, visitors = __module__2, getParserInput = __module__3, utils = __module__4, functionRegistry = __module__5;
    var Parser = function Parser(context, imports, fileInfo) {
        var parsers, parserInput = getParserInput();
        function error(msg, type) {
            throw new LessError({
                index: parserInput.i,
                filename: fileInfo.filename,
                type: type || 'Syntax',
                message: msg
            }, imports);
        }
        function expect(arg, msg) {
            var result = arg instanceof Function ? arg.call(parsers) : parserInput.$re(arg);
            if (result) {
                return result;
            }
            error(msg || (typeof arg === 'string' ? "expected '" + arg + "' got '" + parserInput.currentChar() + "'" : 'unexpected token'));
        }
        function expectChar(arg, msg) {
            if (parserInput.$char(arg)) {
                return arg;
            }
            error(msg || "expected '" + arg + "' got '" + parserInput.currentChar() + "'");
        }
        function getDebugInfo(index) {
            var filename = fileInfo.filename;
            return {
                lineNumber: utils.getLocation(index, parserInput.getInput()).line + 1,
                fileName: filename
            };
        }
        function parseNode(str, parseList, currentIndex, fileInfo, callback) {
            var result, returnNodes = [];
            var parser = parserInput;
            try {
                parser.start(str, false, function fail(msg, index) {
                    callback({
                        message: msg,
                        index: index + currentIndex
                    });
                });
                for (var x = 0, p, i; p = parseList[x]; x++) {
                    i = parser.i;
                    result = parsers[p]();
                    if (result) {
                        result._index = i + currentIndex;
                        result._fileInfo = fileInfo;
                        returnNodes.push(result);
                    } else {
                        returnNodes.push(null);
                    }
                }
                var endInfo = parser.end();
                if (endInfo.isFinished) {
                    callback(null, returnNodes);
                } else {
                    callback(true, null);
                }
            } catch (e) {
                throw new LessError({
                    index: e.index + currentIndex,
                    message: e.message
                }, imports, fileInfo.filename);
            }
        }
        return {
            parserInput: parserInput,
            imports: imports,
            fileInfo: fileInfo,
            parseNode: parseNode,
            parse: function (str, callback, additionalData) {
                var root, error = null, globalVars, modifyVars, ignored, preText = '';
                globalVars = additionalData && additionalData.globalVars ? Parser.serializeVars(additionalData.globalVars) + '\n' : '';
                modifyVars = additionalData && additionalData.modifyVars ? '\n' + Parser.serializeVars(additionalData.modifyVars) : '';
                if (context.pluginManager) {
                    var preProcessors = context.pluginManager.getPreProcessors();
                    for (var i = 0; i < preProcessors.length; i++) {
                        str = preProcessors[i].process(str, {
                            context: context,
                            imports: imports,
                            fileInfo: fileInfo
                        });
                    }
                }
                if (globalVars || additionalData && additionalData.banner) {
                    preText = (additionalData && additionalData.banner ? additionalData.banner : '') + globalVars;
                    ignored = imports.contentsIgnoredChars;
                    ignored[fileInfo.filename] = ignored[fileInfo.filename] || 0;
                    ignored[fileInfo.filename] += preText.length;
                }
                str = str.replace(/\r\n?/g, '\n');
                str = preText + str.replace(/^\uFEFF/, '') + modifyVars;
                imports.contents[fileInfo.filename] = str;
                try {
                    parserInput.start(str, context.chunkInput, function fail(msg, index) {
                        throw new LessError({
                            index: index,
                            type: 'Parse',
                            message: msg,
                            filename: fileInfo.filename
                        }, imports);
                    });
                    tree.Node.prototype.parse = this;
                    root = new tree.Ruleset(null, this.parsers.primary());
                    tree.Node.prototype.rootNode = root;
                    root.root = true;
                    root.firstRoot = true;
                    root.functionRegistry = functionRegistry.inherit();
                } catch (e) {
                    return callback(new LessError(e, imports, fileInfo.filename));
                }
                var endInfo = parserInput.end();
                if (!endInfo.isFinished) {
                    var message = endInfo.furthestPossibleErrorMessage;
                    if (!message) {
                        message = 'Unrecognised input';
                        if (endInfo.furthestChar === '}') {
                            message += ". Possibly missing opening '{'";
                        } else if (endInfo.furthestChar === ')') {
                            message += ". Possibly missing opening '('";
                        } else if (endInfo.furthestReachedEnd) {
                            message += '. Possibly missing something';
                        }
                    }
                    error = new LessError({
                        type: 'Parse',
                        message: message,
                        index: endInfo.furthest,
                        filename: fileInfo.filename
                    }, imports);
                }
                var finish = function (e) {
                    e = error || e || imports.error;
                    if (e) {
                        if (!(e instanceof LessError)) {
                            e = new LessError(e, imports, fileInfo.filename);
                        }
                        return callback(e);
                    } else {
                        return callback(null, root);
                    }
                };
                if (context.processImports !== false) {
                    new visitors.ImportVisitor(imports, finish).run(root);
                } else {
                    return finish();
                }
            },
            parsers: parsers = {
                primary: function () {
                    var mixin = this.mixin, root = [], node;
                    while (true) {
                        while (true) {
                            node = this.comment();
                            if (!node) {
                                break;
                            }
                            root.push(node);
                        }
                        if (parserInput.finished) {
                            break;
                        }
                        if (parserInput.peek('}')) {
                            break;
                        }
                        node = this.extendRule();
                        if (node) {
                            root = root.concat(node);
                            continue;
                        }
                        node = mixin.definition() || this.declaration() || this.ruleset() || mixin.call(false, false) || this.variableCall() || this.entities.call() || this.atrule();
                        if (node) {
                            root.push(node);
                        } else {
                            var foundSemiColon = false;
                            while (parserInput.$char(';')) {
                                foundSemiColon = true;
                            }
                            if (!foundSemiColon) {
                                break;
                            }
                        }
                    }
                    return root;
                },
                comment: function () {
                    if (parserInput.commentStore.length) {
                        var comment = parserInput.commentStore.shift();
                        return new tree.Comment(comment.text, comment.isLineComment, comment.index, fileInfo);
                    }
                },
                entities: {
                    mixinLookup: function () {
                        return parsers.mixin.call(true, true);
                    },
                    quoted: function (forceEscaped) {
                        var str, index = parserInput.i, isEscaped = false;
                        parserInput.save();
                        if (parserInput.$char('~')) {
                            isEscaped = true;
                        } else if (forceEscaped) {
                            parserInput.restore();
                            return;
                        }
                        str = parserInput.$quoted();
                        if (!str) {
                            parserInput.restore();
                            return;
                        }
                        parserInput.forget();
                        return new tree.Quoted(str.charAt(0), str.substr(1, str.length - 2), isEscaped, index, fileInfo);
                    },
                    keyword: function () {
                        var k = parserInput.$char('%') || parserInput.$re(/^\[?(?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+\]?/);
                        if (k) {
                            return tree.Color.fromKeyword(k) || new tree.Keyword(k);
                        }
                    },
                    call: function () {
                        var name, args, func, index = parserInput.i;
                        if (parserInput.peek(/^url\(/i)) {
                            return;
                        }
                        parserInput.save();
                        name = parserInput.$re(/^([\w-]+|%|progid:[\w\.]+)\(/);
                        if (!name) {
                            parserInput.forget();
                            return;
                        }
                        name = name[1];
                        func = this.customFuncCall(name);
                        if (func) {
                            args = func.parse();
                            if (args && func.stop) {
                                parserInput.forget();
                                return args;
                            }
                        }
                        args = this.arguments(args);
                        if (!parserInput.$char(')')) {
                            parserInput.restore("Could not parse call arguments or missing ')'");
                            return;
                        }
                        parserInput.forget();
                        return new tree.Call(name, args, index, fileInfo);
                    },
                    customFuncCall: function (name) {
                        return {
                            alpha: f(parsers.ieAlpha, true),
                            boolean: f(condition),
                            'if': f(condition)
                        }[name.toLowerCase()];
                        function f(parse, stop) {
                            return {
                                parse: parse,
                                stop: stop
                            };
                        }
                        function condition() {
                            return [expect(parsers.condition, 'expected condition')];
                        }
                    },
                    arguments: function (prevArgs) {
                        var argsComma = prevArgs || [], argsSemiColon = [], isSemiColonSeparated, value;
                        parserInput.save();
                        while (true) {
                            if (prevArgs) {
                                prevArgs = false;
                            } else {
                                value = parsers.detachedRuleset() || this.assignment() || parsers.expression();
                                if (!value) {
                                    break;
                                }
                                if (value.value && value.value.length == 1) {
                                    value = value.value[0];
                                }
                                argsComma.push(value);
                            }
                            if (parserInput.$char(',')) {
                                continue;
                            }
                            if (parserInput.$char(';') || isSemiColonSeparated) {
                                isSemiColonSeparated = true;
                                value = argsComma.length < 1 ? argsComma[0] : new tree.Value(argsComma);
                                argsSemiColon.push(value);
                                argsComma = [];
                            }
                        }
                        parserInput.forget();
                        return isSemiColonSeparated ? argsSemiColon : argsComma;
                    },
                    literal: function () {
                        return this.dimension() || this.color() || this.quoted() || this.unicodeDescriptor();
                    },
                    assignment: function () {
                        var key, value;
                        parserInput.save();
                        key = parserInput.$re(/^\w+(?=\s?=)/i);
                        if (!key) {
                            parserInput.restore();
                            return;
                        }
                        if (!parserInput.$char('=')) {
                            parserInput.restore();
                            return;
                        }
                        value = parsers.entity();
                        if (value) {
                            parserInput.forget();
                            return new tree.Assignment(key, value);
                        } else {
                            parserInput.restore();
                        }
                    },
                    url: function () {
                        var value, index = parserInput.i;
                        parserInput.autoCommentAbsorb = false;
                        if (!parserInput.$str('url(')) {
                            parserInput.autoCommentAbsorb = true;
                            return;
                        }
                        value = this.quoted() || this.variable() || this.property() || parserInput.$re(/^(?:(?:\\[\(\)'"])|[^\(\)'"])+/) || '';
                        parserInput.autoCommentAbsorb = true;
                        expectChar(')');
                        return new tree.URL(value.value != null || value instanceof tree.Variable || value instanceof tree.Property ? value : new tree.Anonymous(value, index), index, fileInfo);
                    },
                    variable: function () {
                        var ch, name, index = parserInput.i;
                        parserInput.save();
                        if (parserInput.currentChar() === '@' && (name = parserInput.$re(/^@@?[\w-]+/))) {
                            ch = parserInput.currentChar();
                            if (ch === '(' || ch === '[' && !parserInput.prevChar().match(/^\s/)) {
                                var result = parsers.variableCall(name);
                                if (result) {
                                    parserInput.forget();
                                    return result;
                                }
                            }
                            parserInput.forget();
                            return new tree.Variable(name, index, fileInfo);
                        }
                        parserInput.restore();
                    },
                    variableCurly: function () {
                        var curly, index = parserInput.i;
                        if (parserInput.currentChar() === '@' && (curly = parserInput.$re(/^@\{([\w-]+)\}/))) {
                            return new tree.Variable('@' + curly[1], index, fileInfo);
                        }
                    },
                    property: function () {
                        var name, index = parserInput.i;
                        if (parserInput.currentChar() === '$' && (name = parserInput.$re(/^\$[\w-]+/))) {
                            return new tree.Property(name, index, fileInfo);
                        }
                    },
                    propertyCurly: function () {
                        var curly, index = parserInput.i;
                        if (parserInput.currentChar() === '$' && (curly = parserInput.$re(/^\$\{([\w-]+)\}/))) {
                            return new tree.Property('$' + curly[1], index, fileInfo);
                        }
                    },
                    color: function () {
                        var rgb;
                        if (parserInput.currentChar() === '#' && (rgb = parserInput.$re(/^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4})/))) {
                            return new tree.Color(rgb[1], undefined, rgb[0]);
                        }
                    },
                    colorKeyword: function () {
                        parserInput.save();
                        var autoCommentAbsorb = parserInput.autoCommentAbsorb;
                        parserInput.autoCommentAbsorb = false;
                        var k = parserInput.$re(/^[_A-Za-z-][_A-Za-z0-9-]+/);
                        parserInput.autoCommentAbsorb = autoCommentAbsorb;
                        if (!k) {
                            parserInput.forget();
                            return;
                        }
                        parserInput.restore();
                        var color = tree.Color.fromKeyword(k);
                        if (color) {
                            parserInput.$str(k);
                            return color;
                        }
                    },
                    dimension: function () {
                        if (parserInput.peekNotNumeric()) {
                            return;
                        }
                        var value = parserInput.$re(/^([+-]?\d*\.?\d+)(%|[a-z_]+)?/i);
                        if (value) {
                            return new tree.Dimension(value[1], value[2]);
                        }
                    },
                    unicodeDescriptor: function () {
                        var ud;
                        ud = parserInput.$re(/^U\+[0-9a-fA-F?]+(\-[0-9a-fA-F?]+)?/);
                        if (ud) {
                            return new tree.UnicodeDescriptor(ud[0]);
                        }
                    },
                    javascript: function () {
                        var js, index = parserInput.i;
                        parserInput.save();
                        var escape = parserInput.$char('~');
                        var jsQuote = parserInput.$char('`');
                        if (!jsQuote) {
                            parserInput.restore();
                            return;
                        }
                        js = parserInput.$re(/^[^`]*`/);
                        if (js) {
                            parserInput.forget();
                            return new tree.JavaScript(js.substr(0, js.length - 1), Boolean(escape), index, fileInfo);
                        }
                        parserInput.restore('invalid javascript definition');
                    }
                },
                variable: function () {
                    var name;
                    if (parserInput.currentChar() === '@' && (name = parserInput.$re(/^(@[\w-]+)\s*:/))) {
                        return name[1];
                    }
                },
                variableCall: function (parsedName) {
                    var lookups, important, i = parserInput.i, inValue = !!parsedName, name = parsedName;
                    parserInput.save();
                    if (name || parserInput.currentChar() === '@' && (name = parserInput.$re(/^(@[\w-]+)(\(\s*\))?/))) {
                        lookups = this.mixin.ruleLookups();
                        if (!lookups && (inValue && parserInput.$str('()') !== '()' || name[2] !== '()')) {
                            parserInput.restore("Missing '[...]' lookup in variable call");
                            return;
                        }
                        if (!inValue) {
                            name = name[1];
                        }
                        if (lookups && parsers.important()) {
                            important = true;
                        }
                        var call = new tree.VariableCall(name, i, fileInfo);
                        if (!inValue && parsers.end()) {
                            parserInput.forget();
                            return call;
                        } else {
                            parserInput.forget();
                            return new tree.NamespaceValue(call, lookups, important, i, fileInfo);
                        }
                    }
                    parserInput.restore();
                },
                extend: function (isRule) {
                    var elements, e, index = parserInput.i, option, extendList, extend;
                    if (!parserInput.$str(isRule ? '&:extend(' : ':extend(')) {
                        return;
                    }
                    do {
                        option = null;
                        elements = null;
                        while (!(option = parserInput.$re(/^(all)(?=\s*(\)|,))/))) {
                            e = this.element();
                            if (!e) {
                                break;
                            }
                            if (elements) {
                                elements.push(e);
                            } else {
                                elements = [e];
                            }
                        }
                        option = option && option[1];
                        if (!elements) {
                            error('Missing target selector for :extend().');
                        }
                        extend = new tree.Extend(new tree.Selector(elements), option, index, fileInfo);
                        if (extendList) {
                            extendList.push(extend);
                        } else {
                            extendList = [extend];
                        }
                    } while (parserInput.$char(','));
                    expect(/^\)/);
                    if (isRule) {
                        expect(/^;/);
                    }
                    return extendList;
                },
                extendRule: function () {
                    return this.extend(true);
                },
                mixin: {
                    call: function (inValue, getLookup) {
                        var s = parserInput.currentChar(), important = false, lookups, index = parserInput.i, elements, args, hasParens;
                        if (s !== '.' && s !== '#') {
                            return;
                        }
                        parserInput.save();
                        elements = this.elements();
                        if (elements) {
                            if (parserInput.$char('(')) {
                                args = this.args(true).args;
                                expectChar(')');
                                hasParens = true;
                            }
                            if (getLookup !== false) {
                                lookups = this.ruleLookups();
                            }
                            if (getLookup === true && !lookups) {
                                parserInput.restore();
                                return;
                            }
                            if (inValue && !lookups && !hasParens) {
                                parserInput.restore();
                                return;
                            }
                            if (!inValue && parsers.important()) {
                                important = true;
                            }
                            if (inValue || parsers.end()) {
                                parserInput.forget();
                                var mixin = new tree.mixin.Call(elements, args, index, fileInfo, !lookups && important);
                                if (lookups) {
                                    return new tree.NamespaceValue(mixin, lookups, important);
                                } else {
                                    return mixin;
                                }
                            }
                        }
                        parserInput.restore();
                    },
                    elements: function () {
                        var elements, e, c, elem, elemIndex, re = /^[#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/;
                        while (true) {
                            elemIndex = parserInput.i;
                            e = parserInput.$re(re);
                            if (!e) {
                                break;
                            }
                            elem = new tree.Element(c, e, false, elemIndex, fileInfo);
                            if (elements) {
                                elements.push(elem);
                            } else {
                                elements = [elem];
                            }
                            c = parserInput.$char('>');
                        }
                        return elements;
                    },
                    args: function (isCall) {
                        var entities = parsers.entities, returner = {
                                args: null,
                                variadic: false
                            }, expressions = [], argsSemiColon = [], argsComma = [], isSemiColonSeparated, expressionContainsNamed, name, nameLoop, value, arg, expand, hasSep = true;
                        parserInput.save();
                        while (true) {
                            if (isCall) {
                                arg = parsers.detachedRuleset() || parsers.expression();
                            } else {
                                parserInput.commentStore.length = 0;
                                if (parserInput.$str('...')) {
                                    returner.variadic = true;
                                    if (parserInput.$char(';') && !isSemiColonSeparated) {
                                        isSemiColonSeparated = true;
                                    }
                                    (isSemiColonSeparated ? argsSemiColon : argsComma).push({ variadic: true });
                                    break;
                                }
                                arg = entities.variable() || entities.property() || entities.literal() || entities.keyword() || this.call(true);
                            }
                            if (!arg || !hasSep) {
                                break;
                            }
                            nameLoop = null;
                            if (arg.throwAwayComments) {
                                arg.throwAwayComments();
                            }
                            value = arg;
                            var val = null;
                            if (isCall) {
                                if (arg.value && arg.value.length == 1) {
                                    val = arg.value[0];
                                }
                            } else {
                                val = arg;
                            }
                            if (val && (val instanceof tree.Variable || val instanceof tree.Property)) {
                                if (parserInput.$char(':')) {
                                    if (expressions.length > 0) {
                                        if (isSemiColonSeparated) {
                                            error('Cannot mix ; and , as delimiter types');
                                        }
                                        expressionContainsNamed = true;
                                    }
                                    value = parsers.detachedRuleset() || parsers.expression();
                                    if (!value) {
                                        if (isCall) {
                                            error('could not understand value for named argument');
                                        } else {
                                            parserInput.restore();
                                            returner.args = [];
                                            return returner;
                                        }
                                    }
                                    nameLoop = name = val.name;
                                } else if (parserInput.$str('...')) {
                                    if (!isCall) {
                                        returner.variadic = true;
                                        if (parserInput.$char(';') && !isSemiColonSeparated) {
                                            isSemiColonSeparated = true;
                                        }
                                        (isSemiColonSeparated ? argsSemiColon : argsComma).push({
                                            name: arg.name,
                                            variadic: true
                                        });
                                        break;
                                    } else {
                                        expand = true;
                                    }
                                } else if (!isCall) {
                                    name = nameLoop = val.name;
                                    value = null;
                                }
                            }
                            if (value) {
                                expressions.push(value);
                            }
                            argsComma.push({
                                name: nameLoop,
                                value: value,
                                expand: expand
                            });
                            if (parserInput.$char(',')) {
                                hasSep = true;
                                continue;
                            }
                            hasSep = parserInput.$char(';') === ';';
                            if (hasSep || isSemiColonSeparated) {
                                if (expressionContainsNamed) {
                                    error('Cannot mix ; and , as delimiter types');
                                }
                                isSemiColonSeparated = true;
                                if (expressions.length > 1) {
                                    value = new tree.Value(expressions);
                                }
                                argsSemiColon.push({
                                    name: name,
                                    value: value,
                                    expand: expand
                                });
                                name = null;
                                expressions = [];
                                expressionContainsNamed = false;
                            }
                        }
                        parserInput.forget();
                        returner.args = isSemiColonSeparated ? argsSemiColon : argsComma;
                        return returner;
                    },
                    definition: function () {
                        var name, params = [], match, ruleset, cond, variadic = false;
                        if (parserInput.currentChar() !== '.' && parserInput.currentChar() !== '#' || parserInput.peek(/^[^{]*\}/)) {
                            return;
                        }
                        parserInput.save();
                        match = parserInput.$re(/^([#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+)\s*\(/);
                        if (match) {
                            name = match[1];
                            var argInfo = this.args(false);
                            params = argInfo.args;
                            variadic = argInfo.variadic;
                            if (!parserInput.$char(')')) {
                                parserInput.restore("Missing closing ')'");
                                return;
                            }
                            parserInput.commentStore.length = 0;
                            if (parserInput.$str('when')) {
                                cond = expect(parsers.conditions, 'expected condition');
                            }
                            ruleset = parsers.block();
                            if (ruleset) {
                                parserInput.forget();
                                return new tree.mixin.Definition(name, params, ruleset, cond, variadic);
                            } else {
                                parserInput.restore();
                            }
                        } else {
                            parserInput.forget();
                        }
                    },
                    ruleLookups: function () {
                        var rule, args, lookups = [];
                        if (parserInput.currentChar() !== '[') {
                            return;
                        }
                        while (true) {
                            parserInput.save();
                            args = null;
                            rule = this.lookupValue();
                            if (!rule && rule !== '') {
                                parserInput.restore();
                                break;
                            }
                            lookups.push(rule);
                            parserInput.forget();
                        }
                        if (lookups.length > 0) {
                            return lookups;
                        }
                    },
                    lookupValue: function () {
                        parserInput.save();
                        if (!parserInput.$char('[')) {
                            parserInput.restore();
                            return;
                        }
                        var name = parserInput.$re(/^(?:[@$]{0,2})[_a-zA-Z0-9-]*/);
                        if (!parserInput.$char(']')) {
                            parserInput.restore();
                            return;
                        }
                        if (name || name === '') {
                            parserInput.forget();
                            return name;
                        }
                        parserInput.restore();
                    }
                },
                entity: function () {
                    var entities = this.entities;
                    return this.comment() || entities.literal() || entities.variable() || entities.url() || entities.property() || entities.call() || entities.keyword() || this.mixin.call(true) || entities.javascript();
                },
                end: function () {
                    return parserInput.$char(';') || parserInput.peek('}');
                },
                ieAlpha: function () {
                    var value;
                    if (!parserInput.$re(/^opacity=/i)) {
                        return;
                    }
                    value = parserInput.$re(/^\d+/);
                    if (!value) {
                        value = expect(parsers.entities.variable, 'Could not parse alpha');
                        value = '@{' + value.name.slice(1) + '}';
                    }
                    expectChar(')');
                    return new tree.Quoted('', 'alpha(opacity=' + value + ')');
                },
                element: function () {
                    var e, c, v, index = parserInput.i;
                    c = this.combinator();
                    e = parserInput.$re(/^(?:\d+\.\d+|\d+)%/) || parserInput.$re(/^(?:[.#]?|:*)(?:[\w-]|[^\x00-\x9f]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/) || parserInput.$char('*') || parserInput.$char('&') || this.attribute() || parserInput.$re(/^\([^&()@]+\)/) || parserInput.$re(/^[\.#:](?=@)/) || this.entities.variableCurly();
                    if (!e) {
                        parserInput.save();
                        if (parserInput.$char('(')) {
                            if ((v = this.selector(false)) && parserInput.$char(')')) {
                                e = new tree.Paren(v);
                                parserInput.forget();
                            } else {
                                parserInput.restore("Missing closing ')'");
                            }
                        } else {
                            parserInput.forget();
                        }
                    }
                    if (e) {
                        return new tree.Element(c, e, e instanceof tree.Variable, index, fileInfo);
                    }
                },
                combinator: function () {
                    var c = parserInput.currentChar();
                    if (c === '/') {
                        parserInput.save();
                        var slashedCombinator = parserInput.$re(/^\/[a-z]+\//i);
                        if (slashedCombinator) {
                            parserInput.forget();
                            return new tree.Combinator(slashedCombinator);
                        }
                        parserInput.restore();
                    }
                    if (c === '>' || c === '+' || c === '~' || c === '|' || c === '^') {
                        parserInput.i++;
                        if (c === '^' && parserInput.currentChar() === '^') {
                            c = '^^';
                            parserInput.i++;
                        }
                        while (parserInput.isWhitespace()) {
                            parserInput.i++;
                        }
                        return new tree.Combinator(c);
                    } else if (parserInput.isWhitespace(-1)) {
                        return new tree.Combinator(' ');
                    } else {
                        return new tree.Combinator(null);
                    }
                },
                selector: function (isLess) {
                    var index = parserInput.i, elements, extendList, c, e, allExtends, when, condition;
                    isLess = isLess !== false;
                    while (isLess && (extendList = this.extend()) || isLess && (when = parserInput.$str('when')) || (e = this.element())) {
                        if (when) {
                            condition = expect(this.conditions, 'expected condition');
                        } else if (condition) {
                            error('CSS guard can only be used at the end of selector');
                        } else if (extendList) {
                            if (allExtends) {
                                allExtends = allExtends.concat(extendList);
                            } else {
                                allExtends = extendList;
                            }
                        } else {
                            if (allExtends) {
                                error('Extend can only be used at the end of selector');
                            }
                            c = parserInput.currentChar();
                            if (elements) {
                                elements.push(e);
                            } else {
                                elements = [e];
                            }
                            e = null;
                        }
                        if (c === '{' || c === '}' || c === ';' || c === ',' || c === ')') {
                            break;
                        }
                    }
                    if (elements) {
                        return new tree.Selector(elements, allExtends, condition, index, fileInfo);
                    }
                    if (allExtends) {
                        error('Extend must be used to extend a selector, it cannot be used on its own');
                    }
                },
                selectors: function () {
                    var s, selectors;
                    while (true) {
                        s = this.selector();
                        if (!s) {
                            break;
                        }
                        if (selectors) {
                            selectors.push(s);
                        } else {
                            selectors = [s];
                        }
                        parserInput.commentStore.length = 0;
                        if (s.condition && selectors.length > 1) {
                            error('Guards are only currently allowed on a single selector.');
                        }
                        if (!parserInput.$char(',')) {
                            break;
                        }
                        if (s.condition) {
                            error('Guards are only currently allowed on a single selector.');
                        }
                        parserInput.commentStore.length = 0;
                    }
                    return selectors;
                },
                attribute: function () {
                    if (!parserInput.$char('[')) {
                        return;
                    }
                    var entities = this.entities, key, val, op;
                    if (!(key = entities.variableCurly())) {
                        key = expect(/^(?:[_A-Za-z0-9-\*]*\|)?(?:[_A-Za-z0-9-]|\\.)+/);
                    }
                    op = parserInput.$re(/^[|~*$^]?=/);
                    if (op) {
                        val = entities.quoted() || parserInput.$re(/^[0-9]+%/) || parserInput.$re(/^[\w-]+/) || entities.variableCurly();
                    }
                    expectChar(']');
                    return new tree.Attribute(key, op, val);
                },
                block: function () {
                    var content;
                    if (parserInput.$char('{') && (content = this.primary()) && parserInput.$char('}')) {
                        return content;
                    }
                },
                blockRuleset: function () {
                    var block = this.block();
                    if (block) {
                        block = new tree.Ruleset(null, block);
                    }
                    return block;
                },
                detachedRuleset: function () {
                    var argInfo, params, variadic;
                    parserInput.save();
                    if (parserInput.$re(/^[.#]\(/)) {
                        argInfo = this.mixin.args(false);
                        params = argInfo.args;
                        variadic = argInfo.variadic;
                        if (!parserInput.$char(')')) {
                            parserInput.restore();
                            return;
                        }
                    }
                    var blockRuleset = this.blockRuleset();
                    if (blockRuleset) {
                        parserInput.forget();
                        if (params) {
                            return new tree.mixin.Definition(null, params, blockRuleset, null, variadic);
                        }
                        return new tree.DetachedRuleset(blockRuleset);
                    }
                    parserInput.restore();
                },
                ruleset: function () {
                    var selectors, rules, debugInfo;
                    parserInput.save();
                    if (context.dumpLineNumbers) {
                        debugInfo = getDebugInfo(parserInput.i);
                    }
                    selectors = this.selectors();
                    if (selectors && (rules = this.block())) {
                        parserInput.forget();
                        var ruleset = new tree.Ruleset(selectors, rules, context.strictImports);
                        if (context.dumpLineNumbers) {
                            ruleset.debugInfo = debugInfo;
                        }
                        return ruleset;
                    } else {
                        parserInput.restore();
                    }
                },
                declaration: function () {
                    var name, value, index = parserInput.i, hasDR, c = parserInput.currentChar(), important, merge, isVariable;
                    if (c === '.' || c === '#' || c === '&' || c === ':') {
                        return;
                    }
                    parserInput.save();
                    name = this.variable() || this.ruleProperty();
                    if (name) {
                        isVariable = typeof name === 'string';
                        if (isVariable) {
                            value = this.detachedRuleset();
                            if (value) {
                                hasDR = true;
                            }
                        }
                        parserInput.commentStore.length = 0;
                        if (!value) {
                            merge = !isVariable && name.length > 1 && name.pop().value;
                            if (name[0].value && name[0].value.slice(0, 2) === '--') {
                                value = this.permissiveValue();
                            } else {
                                value = this.anonymousValue();
                            }
                            if (value) {
                                parserInput.forget();
                                return new tree.Declaration(name, value, false, merge, index, fileInfo);
                            }
                            if (!value) {
                                value = this.value();
                            }
                            if (value) {
                                important = this.important();
                            } else if (isVariable) {
                                value = this.permissiveValue();
                            }
                        }
                        if (value && (this.end() || hasDR)) {
                            parserInput.forget();
                            return new tree.Declaration(name, value, important, merge, index, fileInfo);
                        } else {
                            parserInput.restore();
                        }
                    } else {
                        parserInput.restore();
                    }
                },
                anonymousValue: function () {
                    var index = parserInput.i;
                    var match = parserInput.$re(/^([^.#@\$+\/'"*`(;{}-]*);/);
                    if (match) {
                        return new tree.Anonymous(match[1], index);
                    }
                },
                permissiveValue: function (untilTokens) {
                    var i, e, done, value, tok = untilTokens || ';', index = parserInput.i, result = [];
                    function testCurrentChar() {
                        var char = parserInput.currentChar();
                        if (typeof tok === 'string') {
                            return char === tok;
                        } else {
                            return tok.test(char);
                        }
                    }
                    if (testCurrentChar()) {
                        return;
                    }
                    value = [];
                    do {
                        e = this.comment();
                        if (e) {
                            value.push(e);
                            continue;
                        }
                        e = this.entity();
                        if (e) {
                            value.push(e);
                        }
                    } while (e);
                    done = testCurrentChar();
                    if (value.length > 0) {
                        value = new tree.Expression(value);
                        if (done) {
                            return value;
                        } else {
                            result.push(value);
                        }
                        if (parserInput.prevChar() === ' ') {
                            result.push(new tree.Anonymous(' ', index));
                        }
                    }
                    parserInput.save();
                    value = parserInput.$parseUntil(tok);
                    if (value) {
                        if (typeof value === 'string') {
                            error("Expected '" + value + "'", 'Parse');
                        }
                        if (value.length === 1 && value[0] === ' ') {
                            parserInput.forget();
                            return new tree.Anonymous('', index);
                        }
                        var item;
                        for (i = 0; i < value.length; i++) {
                            item = value[i];
                            if (Array.isArray(item)) {
                                result.push(new tree.Quoted(item[0], item[1], true, index, fileInfo));
                            } else {
                                if (i === value.length - 1) {
                                    item = item.trim();
                                }
                                var quote = new tree.Quoted("'", item, true, index, fileInfo);
                                quote.variableRegex = /@([\w-]+)/g;
                                quote.propRegex = /\$([\w-]+)/g;
                                result.push(quote);
                            }
                        }
                        parserInput.forget();
                        return new tree.Expression(result, true);
                    }
                    parserInput.restore();
                },
                'import': function () {
                    var path, features, index = parserInput.i;
                    var dir = parserInput.$re(/^@import?\s+/);
                    if (dir) {
                        var options = (dir ? this.importOptions() : null) || {};
                        if (path = this.entities.quoted() || this.entities.url()) {
                            features = this.mediaFeatures();
                            if (!parserInput.$char(';')) {
                                parserInput.i = index;
                                error('missing semi-colon or unrecognised media features on import');
                            }
                            features = features && new tree.Value(features);
                            return new tree.Import(path, features, options, index, fileInfo);
                        } else {
                            parserInput.i = index;
                            error('malformed import statement');
                        }
                    }
                },
                importOptions: function () {
                    var o, options = {}, optionName, value;
                    if (!parserInput.$char('(')) {
                        return null;
                    }
                    do {
                        o = this.importOption();
                        if (o) {
                            optionName = o;
                            value = true;
                            switch (optionName) {
                            case 'css':
                                optionName = 'less';
                                value = false;
                                break;
                            case 'once':
                                optionName = 'multiple';
                                value = false;
                                break;
                            }
                            options[optionName] = value;
                            if (!parserInput.$char(',')) {
                                break;
                            }
                        }
                    } while (o);
                    expectChar(')');
                    return options;
                },
                importOption: function () {
                    var opt = parserInput.$re(/^(less|css|multiple|once|inline|reference|optional)/);
                    if (opt) {
                        return opt[1];
                    }
                },
                mediaFeature: function () {
                    var entities = this.entities, nodes = [], e, p;
                    parserInput.save();
                    do {
                        e = entities.keyword() || entities.variable() || entities.mixinLookup();
                        if (e) {
                            nodes.push(e);
                        } else if (parserInput.$char('(')) {
                            p = this.property();
                            e = this.value();
                            if (parserInput.$char(')')) {
                                if (p && e) {
                                    nodes.push(new tree.Paren(new tree.Declaration(p, e, null, null, parserInput.i, fileInfo, true)));
                                } else if (e) {
                                    nodes.push(new tree.Paren(e));
                                } else {
                                    error('badly formed media feature definition');
                                }
                            } else {
                                error("Missing closing ')'", 'Parse');
                            }
                        }
                    } while (e);
                    parserInput.forget();
                    if (nodes.length > 0) {
                        return new tree.Expression(nodes);
                    }
                },
                mediaFeatures: function () {
                    var entities = this.entities, features = [], e;
                    do {
                        e = this.mediaFeature();
                        if (e) {
                            features.push(e);
                            if (!parserInput.$char(',')) {
                                break;
                            }
                        } else {
                            e = entities.variable() || entities.mixinLookup();
                            if (e) {
                                features.push(e);
                                if (!parserInput.$char(',')) {
                                    break;
                                }
                            }
                        }
                    } while (e);
                    return features.length > 0 ? features : null;
                },
                media: function () {
                    var features, rules, media, debugInfo, index = parserInput.i;
                    if (context.dumpLineNumbers) {
                        debugInfo = getDebugInfo(index);
                    }
                    parserInput.save();
                    if (parserInput.$str('@media')) {
                        features = this.mediaFeatures();
                        rules = this.block();
                        if (!rules) {
                            error('media definitions require block statements after any features');
                        }
                        parserInput.forget();
                        media = new tree.Media(rules, features, index, fileInfo);
                        if (context.dumpLineNumbers) {
                            media.debugInfo = debugInfo;
                        }
                        return media;
                    }
                    parserInput.restore();
                },
                plugin: function () {
                    var path, args, options, index = parserInput.i, dir = parserInput.$re(/^@plugin?\s+/);
                    if (dir) {
                        args = this.pluginArgs();
                        if (args) {
                            options = {
                                pluginArgs: args,
                                isPlugin: true
                            };
                        } else {
                            options = { isPlugin: true };
                        }
                        if (path = this.entities.quoted() || this.entities.url()) {
                            if (!parserInput.$char(';')) {
                                parserInput.i = index;
                                error('missing semi-colon on @plugin');
                            }
                            return new tree.Import(path, null, options, index, fileInfo);
                        } else {
                            parserInput.i = index;
                            error('malformed @plugin statement');
                        }
                    }
                },
                pluginArgs: function () {
                    parserInput.save();
                    if (!parserInput.$char('(')) {
                        parserInput.restore();
                        return null;
                    }
                    var args = parserInput.$re(/^\s*([^\);]+)\)\s*/);
                    if (args[1]) {
                        parserInput.forget();
                        return args[1].trim();
                    } else {
                        parserInput.restore();
                        return null;
                    }
                },
                atrule: function () {
                    var index = parserInput.i, name, value, rules, nonVendorSpecificName, hasIdentifier, hasExpression, hasUnknown, hasBlock = true, isRooted = true;
                    if (parserInput.currentChar() !== '@') {
                        return;
                    }
                    value = this['import']() || this.plugin() || this.media();
                    if (value) {
                        return value;
                    }
                    parserInput.save();
                    name = parserInput.$re(/^@[a-z-]+/);
                    if (!name) {
                        return;
                    }
                    nonVendorSpecificName = name;
                    if (name.charAt(1) == '-' && name.indexOf('-', 2) > 0) {
                        nonVendorSpecificName = '@' + name.slice(name.indexOf('-', 2) + 1);
                    }
                    switch (nonVendorSpecificName) {
                    case '@charset':
                        hasIdentifier = true;
                        hasBlock = false;
                        break;
                    case '@namespace':
                        hasExpression = true;
                        hasBlock = false;
                        break;
                    case '@keyframes':
                    case '@counter-style':
                        hasIdentifier = true;
                        break;
                    case '@document':
                    case '@supports':
                        hasUnknown = true;
                        isRooted = false;
                        break;
                    default:
                        hasUnknown = true;
                        break;
                    }
                    parserInput.commentStore.length = 0;
                    if (hasIdentifier) {
                        value = this.entity();
                        if (!value) {
                            error('expected ' + name + ' identifier');
                        }
                    } else if (hasExpression) {
                        value = this.expression();
                        if (!value) {
                            error('expected ' + name + ' expression');
                        }
                    } else if (hasUnknown) {
                        value = this.permissiveValue(/^[{;]/);
                        hasBlock = parserInput.currentChar() === '{';
                        if (!value) {
                            if (!hasBlock && parserInput.currentChar() !== ';') {
                                error(name + ' rule is missing block or ending semi-colon');
                            }
                        } else if (!value.value) {
                            value = null;
                        }
                    }
                    if (hasBlock) {
                        rules = this.blockRuleset();
                    }
                    if (rules || !hasBlock && value && parserInput.$char(';')) {
                        parserInput.forget();
                        return new tree.AtRule(name, value, rules, index, fileInfo, context.dumpLineNumbers ? getDebugInfo(index) : null, isRooted);
                    }
                    parserInput.restore('at-rule options not recognised');
                },
                value: function () {
                    var e, expressions = [], index = parserInput.i;
                    do {
                        e = this.expression();
                        if (e) {
                            expressions.push(e);
                            if (!parserInput.$char(',')) {
                                break;
                            }
                        }
                    } while (e);
                    if (expressions.length > 0) {
                        return new tree.Value(expressions, index);
                    }
                },
                important: function () {
                    if (parserInput.currentChar() === '!') {
                        return parserInput.$re(/^! *important/);
                    }
                },
                sub: function () {
                    var a, e;
                    parserInput.save();
                    if (parserInput.$char('(')) {
                        a = this.addition();
                        if (a && parserInput.$char(')')) {
                            parserInput.forget();
                            e = new tree.Expression([a]);
                            e.parens = true;
                            return e;
                        }
                        parserInput.restore("Expected ')'");
                        return;
                    }
                    parserInput.restore();
                },
                multiplication: function () {
                    var m, a, op, operation, isSpaced;
                    m = this.operand();
                    if (m) {
                        isSpaced = parserInput.isWhitespace(-1);
                        while (true) {
                            if (parserInput.peek(/^\/[*\/]/)) {
                                break;
                            }
                            parserInput.save();
                            op = parserInput.$char('/') || parserInput.$char('*') || parserInput.$str('./');
                            if (!op) {
                                parserInput.forget();
                                break;
                            }
                            a = this.operand();
                            if (!a) {
                                parserInput.restore();
                                break;
                            }
                            parserInput.forget();
                            m.parensInOp = true;
                            a.parensInOp = true;
                            operation = new tree.Operation(op, [
                                operation || m,
                                a
                            ], isSpaced);
                            isSpaced = parserInput.isWhitespace(-1);
                        }
                        return operation || m;
                    }
                },
                addition: function () {
                    var m, a, op, operation, isSpaced;
                    m = this.multiplication();
                    if (m) {
                        isSpaced = parserInput.isWhitespace(-1);
                        while (true) {
                            op = parserInput.$re(/^[-+]\s+/) || !isSpaced && (parserInput.$char('+') || parserInput.$char('-'));
                            if (!op) {
                                break;
                            }
                            a = this.multiplication();
                            if (!a) {
                                break;
                            }
                            m.parensInOp = true;
                            a.parensInOp = true;
                            operation = new tree.Operation(op, [
                                operation || m,
                                a
                            ], isSpaced);
                            isSpaced = parserInput.isWhitespace(-1);
                        }
                        return operation || m;
                    }
                },
                conditions: function () {
                    var a, b, index = parserInput.i, condition;
                    a = this.condition(true);
                    if (a) {
                        while (true) {
                            if (!parserInput.peek(/^,\s*(not\s*)?\(/) || !parserInput.$char(',')) {
                                break;
                            }
                            b = this.condition(true);
                            if (!b) {
                                break;
                            }
                            condition = new tree.Condition('or', condition || a, b, index);
                        }
                        return condition || a;
                    }
                },
                condition: function (needsParens) {
                    var result, logical, next;
                    function or() {
                        return parserInput.$str('or');
                    }
                    result = this.conditionAnd(needsParens);
                    if (!result) {
                        return;
                    }
                    logical = or();
                    if (logical) {
                        next = this.condition(needsParens);
                        if (next) {
                            result = new tree.Condition(logical, result, next);
                        } else {
                            return;
                        }
                    }
                    return result;
                },
                conditionAnd: function (needsParens) {
                    var result, logical, next, self = this;
                    function insideCondition() {
                        var cond = self.negatedCondition(needsParens) || self.parenthesisCondition(needsParens);
                        if (!cond && !needsParens) {
                            return self.atomicCondition(needsParens);
                        }
                        return cond;
                    }
                    function and() {
                        return parserInput.$str('and');
                    }
                    result = insideCondition();
                    if (!result) {
                        return;
                    }
                    logical = and();
                    if (logical) {
                        next = this.conditionAnd(needsParens);
                        if (next) {
                            result = new tree.Condition(logical, result, next);
                        } else {
                            return;
                        }
                    }
                    return result;
                },
                negatedCondition: function (needsParens) {
                    if (parserInput.$str('not')) {
                        var result = this.parenthesisCondition(needsParens);
                        if (result) {
                            result.negate = !result.negate;
                        }
                        return result;
                    }
                },
                parenthesisCondition: function (needsParens) {
                    function tryConditionFollowedByParenthesis(me) {
                        var body;
                        parserInput.save();
                        body = me.condition(needsParens);
                        if (!body) {
                            parserInput.restore();
                            return;
                        }
                        if (!parserInput.$char(')')) {
                            parserInput.restore();
                            return;
                        }
                        parserInput.forget();
                        return body;
                    }
                    var body;
                    parserInput.save();
                    if (!parserInput.$str('(')) {
                        parserInput.restore();
                        return;
                    }
                    body = tryConditionFollowedByParenthesis(this);
                    if (body) {
                        parserInput.forget();
                        return body;
                    }
                    body = this.atomicCondition(needsParens);
                    if (!body) {
                        parserInput.restore();
                        return;
                    }
                    if (!parserInput.$char(')')) {
                        parserInput.restore("expected ')' got '" + parserInput.currentChar() + "'");
                        return;
                    }
                    parserInput.forget();
                    return body;
                },
                atomicCondition: function (needsParens) {
                    var entities = this.entities, index = parserInput.i, a, b, c, op;
                    function cond() {
                        return this.addition() || entities.keyword() || entities.quoted() || entities.mixinLookup();
                    }
                    cond = cond.bind(this);
                    a = cond();
                    if (a) {
                        if (parserInput.$char('>')) {
                            if (parserInput.$char('=')) {
                                op = '>=';
                            } else {
                                op = '>';
                            }
                        } else if (parserInput.$char('<')) {
                            if (parserInput.$char('=')) {
                                op = '<=';
                            } else {
                                op = '<';
                            }
                        } else if (parserInput.$char('=')) {
                            if (parserInput.$char('>')) {
                                op = '=>';
                            } else if (parserInput.$char('<')) {
                                op = '=<';
                            } else {
                                op = '=';
                            }
                        }
                        if (op) {
                            b = cond();
                            if (b) {
                                c = new tree.Condition(op, a, b, index, false);
                            } else {
                                error('expected expression');
                            }
                        } else {
                            c = new tree.Condition('=', a, new tree.Keyword('true'), index, false);
                        }
                        return c;
                    }
                },
                operand: function () {
                    var entities = this.entities, negate;
                    if (parserInput.peek(/^-[@\$\(]/)) {
                        negate = parserInput.$char('-');
                    }
                    var o = this.sub() || entities.dimension() || entities.color() || entities.variable() || entities.property() || entities.call() || entities.quoted(true) || entities.colorKeyword() || entities.mixinLookup();
                    if (negate) {
                        o.parensInOp = true;
                        o = new tree.Negative(o);
                    }
                    return o;
                },
                expression: function () {
                    var entities = [], e, delim, index = parserInput.i;
                    do {
                        e = this.comment();
                        if (e) {
                            entities.push(e);
                            continue;
                        }
                        e = this.addition() || this.entity();
                        if (e) {
                            entities.push(e);
                            if (!parserInput.peek(/^\/[\/*]/)) {
                                delim = parserInput.$char('/');
                                if (delim) {
                                    entities.push(new tree.Anonymous(delim, index));
                                }
                            }
                        }
                    } while (e);
                    if (entities.length > 0) {
                        return new tree.Expression(entities);
                    }
                },
                property: function () {
                    var name = parserInput.$re(/^(\*?-?[_a-zA-Z0-9-]+)\s*:/);
                    if (name) {
                        return name[1];
                    }
                },
                ruleProperty: function () {
                    var name = [], index = [], s, k;
                    parserInput.save();
                    var simpleProperty = parserInput.$re(/^([_a-zA-Z0-9-]+)\s*:/);
                    if (simpleProperty) {
                        name = [new tree.Keyword(simpleProperty[1])];
                        parserInput.forget();
                        return name;
                    }
                    function match(re) {
                        var i = parserInput.i, chunk = parserInput.$re(re);
                        if (chunk) {
                            index.push(i);
                            return name.push(chunk[1]);
                        }
                    }
                    match(/^(\*?)/);
                    while (true) {
                        if (!match(/^((?:[\w-]+)|(?:[@\$]\{[\w-]+\}))/)) {
                            break;
                        }
                    }
                    if (name.length > 1 && match(/^((?:\+_|\+)?)\s*:/)) {
                        parserInput.forget();
                        if (name[0] === '') {
                            name.shift();
                            index.shift();
                        }
                        for (k = 0; k < name.length; k++) {
                            s = name[k];
                            name[k] = s.charAt(0) !== '@' && s.charAt(0) !== '$' ? new tree.Keyword(s) : s.charAt(0) === '@' ? new tree.Variable('@' + s.slice(2, -1), index[k], fileInfo) : new tree.Property('$' + s.slice(2, -1), index[k], fileInfo);
                        }
                        return name;
                    }
                    parserInput.restore();
                }
            }
        };
    };
    Parser.serializeVars = function (vars) {
        var s = '';
        for (var name in vars) {
            if (Object.hasOwnProperty.call(vars, name)) {
                var value = vars[name];
                s += (name[0] === '@' ? '' : '@') + name + ': ' + value + (String(value).slice(-1) === ';' ? '' : ';');
            }
        }
        return s;
    };
    module.exports = Parser;
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
define('skylark-less/engine/functions/boolean',[
    './function-registry',
    '../tree/anonymous',
    '../tree/keyword'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var functionRegistry = __module__0, Anonymous = __module__1, Keyword = __module__2;
    functionRegistry.addMultiple({
        boolean: function (condition) {
            return condition ? Keyword.True : Keyword.False;
        },
        'if': function (condition, trueValue, falseValue) {
            return condition ? trueValue : falseValue || new Anonymous();
        }
    });
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
define('skylark-less/engine/functions/color',[
    '../tree/dimension',
    '../tree/color',
    '../tree/quoted',
    '../tree/anonymous',
    './function-registry'
], function (__module__0, __module__1, __module__2, __module__3, __module__4) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Dimension = __module__0, Color = __module__1, Quoted = __module__2, Anonymous = __module__3, functionRegistry = __module__4, colorFunctions;
    function clamp(val) {
        return Math.min(1, Math.max(0, val));
    }
    function hsla(origColor, hsl) {
        var color = colorFunctions.hsla(hsl.h, hsl.s, hsl.l, hsl.a);
        if (color) {
            if (origColor.value && /^(rgb|hsl)/.test(origColor.value)) {
                color.value = origColor.value;
            } else {
                color.value = 'rgb';
            }
            return color;
        }
    }
    function number(n) {
        if (n instanceof Dimension) {
            return parseFloat(n.unit.is('%') ? n.value / 100 : n.value);
        } else if (typeof n === 'number') {
            return n;
        } else {
            throw {
                type: 'Argument',
                message: 'color functions take numbers as parameters'
            };
        }
    }
    function scaled(n, size) {
        if (n instanceof Dimension && n.unit.is('%')) {
            return parseFloat(n.value * size / 100);
        } else {
            return number(n);
        }
    }
    colorFunctions = {
        rgb: function (r, g, b) {
            var color = colorFunctions.rgba(r, g, b, 1);
            if (color) {
                color.value = 'rgb';
                return color;
            }
        },
        rgba: function (r, g, b, a) {
            try {
                if (r instanceof Color) {
                    if (g) {
                        a = number(g);
                    } else {
                        a = r.alpha;
                    }
                    return new Color(r.rgb, a, 'rgba');
                }
                var rgb = [
                    r,
                    g,
                    b
                ].map(function (c) {
                    return scaled(c, 255);
                });
                a = number(a);
                return new Color(rgb, a, 'rgba');
            } catch (e) {
            }
        },
        hsl: function (h, s, l) {
            var color = colorFunctions.hsla(h, s, l, 1);
            if (color) {
                color.value = 'hsl';
                return color;
            }
        },
        hsla: function (h, s, l, a) {
            try {
                if (h instanceof Color) {
                    if (s) {
                        a = number(s);
                    } else {
                        a = h.alpha;
                    }
                    return new Color(h.rgb, a, 'hsla');
                }
                var m1, m2;
                function hue(h) {
                    h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
                    if (h * 6 < 1) {
                        return m1 + (m2 - m1) * h * 6;
                    } else if (h * 2 < 1) {
                        return m2;
                    } else if (h * 3 < 2) {
                        return m1 + (m2 - m1) * (2 / 3 - h) * 6;
                    } else {
                        return m1;
                    }
                }
                h = number(h) % 360 / 360;
                s = clamp(number(s));
                l = clamp(number(l));
                a = clamp(number(a));
                m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
                m1 = l * 2 - m2;
                var rgb = [
                    hue(h + 1 / 3) * 255,
                    hue(h) * 255,
                    hue(h - 1 / 3) * 255
                ];
                a = number(a);
                return new Color(rgb, a, 'hsla');
            } catch (e) {
            }
        },
        hsv: function (h, s, v) {
            return colorFunctions.hsva(h, s, v, 1);
        },
        hsva: function (h, s, v, a) {
            h = number(h) % 360 / 360 * 360;
            s = number(s);
            v = number(v);
            a = number(a);
            var i, f;
            i = Math.floor(h / 60 % 6);
            f = h / 60 - i;
            var vs = [
                v,
                v * (1 - s),
                v * (1 - f * s),
                v * (1 - (1 - f) * s)
            ];
            var perm = [
                [
                    0,
                    3,
                    1
                ],
                [
                    2,
                    0,
                    1
                ],
                [
                    1,
                    0,
                    3
                ],
                [
                    1,
                    2,
                    0
                ],
                [
                    3,
                    1,
                    0
                ],
                [
                    0,
                    1,
                    2
                ]
            ];
            return colorFunctions.rgba(vs[perm[i][0]] * 255, vs[perm[i][1]] * 255, vs[perm[i][2]] * 255, a);
        },
        hue: function (color) {
            return new Dimension(color.toHSL().h);
        },
        saturation: function (color) {
            return new Dimension(color.toHSL().s * 100, '%');
        },
        lightness: function (color) {
            return new Dimension(color.toHSL().l * 100, '%');
        },
        hsvhue: function (color) {
            return new Dimension(color.toHSV().h);
        },
        hsvsaturation: function (color) {
            return new Dimension(color.toHSV().s * 100, '%');
        },
        hsvvalue: function (color) {
            return new Dimension(color.toHSV().v * 100, '%');
        },
        red: function (color) {
            return new Dimension(color.rgb[0]);
        },
        green: function (color) {
            return new Dimension(color.rgb[1]);
        },
        blue: function (color) {
            return new Dimension(color.rgb[2]);
        },
        alpha: function (color) {
            return new Dimension(color.toHSL().a);
        },
        luma: function (color) {
            return new Dimension(color.luma() * color.alpha * 100, '%');
        },
        luminance: function (color) {
            var luminance = 0.2126 * color.rgb[0] / 255 + 0.7152 * color.rgb[1] / 255 + 0.0722 * color.rgb[2] / 255;
            return new Dimension(luminance * color.alpha * 100, '%');
        },
        saturate: function (color, amount, method) {
            if (!color.rgb) {
                return null;
            }
            var hsl = color.toHSL();
            if (typeof method !== 'undefined' && method.value === 'relative') {
                hsl.s += hsl.s * amount.value / 100;
            } else {
                hsl.s += amount.value / 100;
            }
            hsl.s = clamp(hsl.s);
            return hsla(color, hsl);
        },
        desaturate: function (color, amount, method) {
            var hsl = color.toHSL();
            if (typeof method !== 'undefined' && method.value === 'relative') {
                hsl.s -= hsl.s * amount.value / 100;
            } else {
                hsl.s -= amount.value / 100;
            }
            hsl.s = clamp(hsl.s);
            return hsla(color, hsl);
        },
        lighten: function (color, amount, method) {
            var hsl = color.toHSL();
            if (typeof method !== 'undefined' && method.value === 'relative') {
                hsl.l += hsl.l * amount.value / 100;
            } else {
                hsl.l += amount.value / 100;
            }
            hsl.l = clamp(hsl.l);
            return hsla(color, hsl);
        },
        darken: function (color, amount, method) {
            var hsl = color.toHSL();
            if (typeof method !== 'undefined' && method.value === 'relative') {
                hsl.l -= hsl.l * amount.value / 100;
            } else {
                hsl.l -= amount.value / 100;
            }
            hsl.l = clamp(hsl.l);
            return hsla(color, hsl);
        },
        fadein: function (color, amount, method) {
            var hsl = color.toHSL();
            if (typeof method !== 'undefined' && method.value === 'relative') {
                hsl.a += hsl.a * amount.value / 100;
            } else {
                hsl.a += amount.value / 100;
            }
            hsl.a = clamp(hsl.a);
            return hsla(color, hsl);
        },
        fadeout: function (color, amount, method) {
            var hsl = color.toHSL();
            if (typeof method !== 'undefined' && method.value === 'relative') {
                hsl.a -= hsl.a * amount.value / 100;
            } else {
                hsl.a -= amount.value / 100;
            }
            hsl.a = clamp(hsl.a);
            return hsla(color, hsl);
        },
        fade: function (color, amount) {
            var hsl = color.toHSL();
            hsl.a = amount.value / 100;
            hsl.a = clamp(hsl.a);
            return hsla(color, hsl);
        },
        spin: function (color, amount) {
            var hsl = color.toHSL();
            var hue = (hsl.h + amount.value) % 360;
            hsl.h = hue < 0 ? 360 + hue : hue;
            return hsla(color, hsl);
        },
        mix: function (color1, color2, weight) {
            if (!color1.toHSL || !color2.toHSL) {
                console.log(color2.type);
                console.dir(color2);
            }
            if (!weight) {
                weight = new Dimension(50);
            }
            var p = weight.value / 100;
            var w = p * 2 - 1;
            var a = color1.toHSL().a - color2.toHSL().a;
            var w1 = ((w * a == -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
            var w2 = 1 - w1;
            var rgb = [
                color1.rgb[0] * w1 + color2.rgb[0] * w2,
                color1.rgb[1] * w1 + color2.rgb[1] * w2,
                color1.rgb[2] * w1 + color2.rgb[2] * w2
            ];
            var alpha = color1.alpha * p + color2.alpha * (1 - p);
            return new Color(rgb, alpha);
        },
        greyscale: function (color) {
            return colorFunctions.desaturate(color, new Dimension(100));
        },
        contrast: function (color, dark, light, threshold) {
            if (!color.rgb) {
                return null;
            }
            if (typeof light === 'undefined') {
                light = colorFunctions.rgba(255, 255, 255, 1);
            }
            if (typeof dark === 'undefined') {
                dark = colorFunctions.rgba(0, 0, 0, 1);
            }
            if (dark.luma() > light.luma()) {
                var t = light;
                light = dark;
                dark = t;
            }
            if (typeof threshold === 'undefined') {
                threshold = 0.43;
            } else {
                threshold = number(threshold);
            }
            if (color.luma() < threshold) {
                return light;
            } else {
                return dark;
            }
        },
        argb: function (color) {
            return new Anonymous(color.toARGB());
        },
        color: function (c) {
            if (c instanceof Quoted && /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4})$/i.test(c.value)) {
                var val = c.value.slice(1);
                return new Color(val, undefined, '#' + val);
            }
            if (c instanceof Color || (c = Color.fromKeyword(c.value))) {
                c.value = undefined;
                return c;
            }
            throw {
                type: 'Argument',
                message: 'argument must be a color keyword or 3|4|6|8 digit hex e.g. #FFF'
            };
        },
        tint: function (color, amount) {
            return colorFunctions.mix(colorFunctions.rgb(255, 255, 255), color, amount);
        },
        shade: function (color, amount) {
            return colorFunctions.mix(colorFunctions.rgb(0, 0, 0), color, amount);
        }
    };
    functionRegistry.addMultiple(colorFunctions);
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
define('skylark-less/engine/functions/color-blending',[
    '../tree/color',
    './function-registry'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Color = __module__0, functionRegistry = __module__1;
    function colorBlend(mode, color1, color2) {
        var ab = color1.alpha, cb, as = color2.alpha, cs, ar, cr, r = [];
        ar = as + ab * (1 - as);
        for (var i = 0; i < 3; i++) {
            cb = color1.rgb[i] / 255;
            cs = color2.rgb[i] / 255;
            cr = mode(cb, cs);
            if (ar) {
                cr = (as * cs + ab * (cb - as * (cb + cs - cr))) / ar;
            }
            r[i] = cr * 255;
        }
        return new Color(r, ar);
    }
    var colorBlendModeFunctions = {
        multiply: function (cb, cs) {
            return cb * cs;
        },
        screen: function (cb, cs) {
            return cb + cs - cb * cs;
        },
        overlay: function (cb, cs) {
            cb *= 2;
            return cb <= 1 ? colorBlendModeFunctions.multiply(cb, cs) : colorBlendModeFunctions.screen(cb - 1, cs);
        },
        softlight: function (cb, cs) {
            var d = 1, e = cb;
            if (cs > 0.5) {
                e = 1;
                d = cb > 0.25 ? Math.sqrt(cb) : ((16 * cb - 12) * cb + 4) * cb;
            }
            return cb - (1 - 2 * cs) * e * (d - cb);
        },
        hardlight: function (cb, cs) {
            return colorBlendModeFunctions.overlay(cs, cb);
        },
        difference: function (cb, cs) {
            return Math.abs(cb - cs);
        },
        exclusion: function (cb, cs) {
            return cb + cs - 2 * cb * cs;
        },
        average: function (cb, cs) {
            return (cb + cs) / 2;
        },
        negation: function (cb, cs) {
            return 1 - Math.abs(cb + cs - 1);
        }
    };
    for (var f in colorBlendModeFunctions) {
        if (colorBlendModeFunctions.hasOwnProperty(f)) {
            colorBlend[f] = colorBlend.bind(null, colorBlendModeFunctions[f]);
        }
    }
    functionRegistry.addMultiple(colorBlend);
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
define('skylark-less/engine/functions/data-uri',[
    '../tree/quoted',
    '../tree/url',
    '../utils',
    './function-registry',
    '../logger'
], function (__module__0, __module__1, __module__2, __module__3, __module__4) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = function (environment) {
        var Quoted = __module__0, URL = __module__1, utils = __module__2, functionRegistry = __module__3, fallback = function (functionThis, node) {
                return new URL(node, functionThis.index, functionThis.currentFileInfo).eval(functionThis.context);
            }, logger = __module__4;
        functionRegistry.add('data-uri', function (mimetypeNode, filePathNode) {
            if (!filePathNode) {
                filePathNode = mimetypeNode;
                mimetypeNode = null;
            }
            var mimetype = mimetypeNode && mimetypeNode.value;
            var filePath = filePathNode.value;
            var currentFileInfo = this.currentFileInfo;
            var currentDirectory = currentFileInfo.rewriteUrls ? currentFileInfo.currentDirectory : currentFileInfo.entryPath;
            var fragmentStart = filePath.indexOf('#');
            var fragment = '';
            if (fragmentStart !== -1) {
                fragment = filePath.slice(fragmentStart);
                filePath = filePath.slice(0, fragmentStart);
            }
            var context = utils.clone(this.context);
            context.rawBuffer = true;
            var fileManager = environment.getFileManager(filePath, currentDirectory, context, environment, true);
            if (!fileManager) {
                return fallback(this, filePathNode);
            }
            var useBase64 = false;
            if (!mimetypeNode) {
                mimetype = environment.mimeLookup(filePath);
                if (mimetype === 'image/svg+xml') {
                    useBase64 = false;
                } else {
                    var charset = environment.charsetLookup(mimetype);
                    useBase64 = [
                        'US-ASCII',
                        'UTF-8'
                    ].indexOf(charset) < 0;
                }
                if (useBase64) {
                    mimetype += ';base64';
                }
            } else {
                useBase64 = /;base64$/.test(mimetype);
            }
            var fileSync = fileManager.loadFileSync(filePath, currentDirectory, context, environment);
            if (!fileSync.contents) {
                logger.warn('Skipped data-uri embedding of ' + filePath + ' because file not found');
                return fallback(this, filePathNode || mimetypeNode);
            }
            var buf = fileSync.contents;
            if (useBase64 && !environment.encodeBase64) {
                return fallback(this, filePathNode);
            }
            buf = useBase64 ? environment.encodeBase64(buf) : encodeURIComponent(buf);
            var uri = 'data:' + mimetype + ',' + buf + fragment;
            var DATA_URI_MAX = 32768;
            if (uri.length >= DATA_URI_MAX) {
                if (this.context.ieCompat !== false) {
                    logger.warn('Skipped data-uri embedding of ' + filePath + ' because its size (' + uri.length + ' characters) exceeds IE8-safe ' + DATA_URI_MAX + ' characters!');
                    return fallback(this, filePathNode || mimetypeNode);
                }
            }
            return new URL(new Quoted('"' + uri + '"', uri, false, this.index, this.currentFileInfo), this.index, this.currentFileInfo);
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
define('skylark-less/engine/functions/list',[
    '../tree/comment',
    '../tree/dimension',
    '../tree/declaration',
    '../tree/expression',
    '../tree/ruleset',
    '../tree/selector',
    '../tree/element',
    './function-registry'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6, __module__7) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Comment = __module__0, Dimension = __module__1, Declaration = __module__2, Expression = __module__3, Ruleset = __module__4, Selector = __module__5, Element = __module__6, functionRegistry = __module__7;
    var getItemsFromNode = function (node) {
        var items = Array.isArray(node.value) ? node.value : Array(node);
        return items;
    };
    functionRegistry.addMultiple({
        _SELF: function (n) {
            return n;
        },
        extract: function (values, index) {
            index = index.value - 1;
            return getItemsFromNode(values)[index];
        },
        length: function (values) {
            return new Dimension(getItemsFromNode(values).length);
        },
        range: function (start, end, step) {
            var from, to, stepValue = 1, list = [];
            if (end) {
                to = end;
                from = start.value;
                if (step) {
                    stepValue = step.value;
                }
            } else {
                from = 1;
                to = start;
            }
            for (var i = from; i <= to.value; i += stepValue) {
                list.push(new Dimension(i, to.unit));
            }
            return new Expression(list);
        },
        each: function (list, rs) {
            var rules = [], newRules, iterator;
            if (list.value) {
                if (Array.isArray(list.value)) {
                    iterator = list.value;
                } else {
                    iterator = [list.value];
                }
            } else if (list.ruleset) {
                iterator = list.ruleset.rules;
            } else if (list.rules) {
                iterator = list.rules;
            } else if (Array.isArray(list)) {
                iterator = list;
            } else {
                iterator = [list];
            }
            var valueName = '@value', keyName = '@key', indexName = '@index';
            if (rs.params) {
                valueName = rs.params[0] && rs.params[0].name;
                keyName = rs.params[1] && rs.params[1].name;
                indexName = rs.params[2] && rs.params[2].name;
                rs = rs.rules;
            } else {
                rs = rs.ruleset;
            }
            for (var i = 0; i < iterator.length; i++) {
                var key, value, item = iterator[i];
                if (item instanceof Declaration) {
                    key = typeof item.name === 'string' ? item.name : item.name[0].value;
                    value = item.value;
                } else {
                    key = new Dimension(i + 1);
                    value = item;
                }
                if (item instanceof Comment) {
                    continue;
                }
                newRules = rs.rules.slice(0);
                if (valueName) {
                    newRules.push(new Declaration(valueName, value, false, false, this.index, this.currentFileInfo));
                }
                if (indexName) {
                    newRules.push(new Declaration(indexName, new Dimension(i + 1), false, false, this.index, this.currentFileInfo));
                }
                if (keyName) {
                    newRules.push(new Declaration(keyName, key, false, false, this.index, this.currentFileInfo));
                }
                rules.push(new Ruleset([new Selector([new Element('', '&')])], newRules, rs.strictImports, rs.visibilityInfo()));
            }
            return new Ruleset([new Selector([new Element('', '&')])], rules, rs.strictImports, rs.visibilityInfo()).eval(this.context);
        }
    });
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
define('skylark-less/engine/functions/math-helper',['../tree/dimension'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Dimension = __module__0;
    var MathHelper = function () {
    };
    MathHelper._math = function (fn, unit, n) {
        if (!(n instanceof Dimension)) {
            throw {
                type: 'Argument',
                message: 'argument must be a number'
            };
        }
        if (unit == null) {
            unit = n.unit;
        } else {
            n = n.unify();
        }
        return new Dimension(fn(parseFloat(n.value)), unit);
    };
    module.exports = MathHelper;
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
define('skylark-less/engine/functions/math',[
    './function-registry',
    './math-helper'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var functionRegistry = __module__0, mathHelper = __module__1;
    var mathFunctions = {
        ceil: null,
        floor: null,
        sqrt: null,
        abs: null,
        tan: '',
        sin: '',
        cos: '',
        atan: 'rad',
        asin: 'rad',
        acos: 'rad'
    };
    for (var f in mathFunctions) {
        if (mathFunctions.hasOwnProperty(f)) {
            mathFunctions[f] = mathHelper._math.bind(null, Math[f], mathFunctions[f]);
        }
    }
    mathFunctions.round = function (n, f) {
        var fraction = typeof f === 'undefined' ? 0 : f.value;
        return mathHelper._math(function (num) {
            return num.toFixed(fraction);
        }, null, n);
    };
    functionRegistry.addMultiple(mathFunctions);
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
define('skylark-less/engine/functions/number',[
    '../tree/dimension',
    '../tree/anonymous',
    './function-registry',
    './math-helper'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Dimension = __module__0, Anonymous = __module__1, functionRegistry = __module__2, mathHelper = __module__3;
    var minMax = function (isMin, args) {
        args = Array.prototype.slice.call(args);
        switch (args.length) {
        case 0:
            throw {
                type: 'Argument',
                message: 'one or more arguments required'
            };
        }
        var i, j, current, currentUnified, referenceUnified, unit, unitStatic, unitClone, order = [], values = {};
        for (i = 0; i < args.length; i++) {
            current = args[i];
            if (!(current instanceof Dimension)) {
                if (Array.isArray(args[i].value)) {
                    Array.prototype.push.apply(args, Array.prototype.slice.call(args[i].value));
                }
                continue;
            }
            currentUnified = current.unit.toString() === '' && unitClone !== undefined ? new Dimension(current.value, unitClone).unify() : current.unify();
            unit = currentUnified.unit.toString() === '' && unitStatic !== undefined ? unitStatic : currentUnified.unit.toString();
            unitStatic = unit !== '' && unitStatic === undefined || unit !== '' && order[0].unify().unit.toString() === '' ? unit : unitStatic;
            unitClone = unit !== '' && unitClone === undefined ? current.unit.toString() : unitClone;
            j = values[''] !== undefined && unit !== '' && unit === unitStatic ? values[''] : values[unit];
            if (j === undefined) {
                if (unitStatic !== undefined && unit !== unitStatic) {
                    throw {
                        type: 'Argument',
                        message: 'incompatible types'
                    };
                }
                values[unit] = order.length;
                order.push(current);
                continue;
            }
            referenceUnified = order[j].unit.toString() === '' && unitClone !== undefined ? new Dimension(order[j].value, unitClone).unify() : order[j].unify();
            if (isMin && currentUnified.value < referenceUnified.value || !isMin && currentUnified.value > referenceUnified.value) {
                order[j] = current;
            }
        }
        if (order.length == 1) {
            return order[0];
        }
        args = order.map(function (a) {
            return a.toCSS(this.context);
        }).join(this.context.compress ? ',' : ', ');
        return new Anonymous((isMin ? 'min' : 'max') + '(' + args + ')');
    };
    functionRegistry.addMultiple({
        min: function () {
            return minMax(true, arguments);
        },
        max: function () {
            return minMax(false, arguments);
        },
        convert: function (val, unit) {
            return val.convertTo(unit.value);
        },
        pi: function () {
            return new Dimension(Math.PI);
        },
        mod: function (a, b) {
            return new Dimension(a.value % b.value, a.unit);
        },
        pow: function (x, y) {
            if (typeof x === 'number' && typeof y === 'number') {
                x = new Dimension(x);
                y = new Dimension(y);
            } else if (!(x instanceof Dimension) || !(y instanceof Dimension)) {
                throw {
                    type: 'Argument',
                    message: 'arguments must be numbers'
                };
            }
            return new Dimension(Math.pow(x.value, y.value), x.unit);
        },
        percentage: function (n) {
            var result = mathHelper._math(function (num) {
                return num * 100;
            }, '%', n);
            return result;
        }
    });
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
define('skylark-less/engine/functions/string',[
    '../tree/quoted',
    '../tree/anonymous',
    '../tree/javascript',
    './function-registry'
], function (__module__0, __module__1, __module__2, __module__3) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Quoted = __module__0, Anonymous = __module__1, JavaScript = __module__2, functionRegistry = __module__3;
    functionRegistry.addMultiple({
        e: function (str) {
            return new Anonymous(str instanceof JavaScript ? str.evaluated : str.value);
        },
        escape: function (str) {
            return new Anonymous(encodeURI(str.value).replace(/=/g, '%3D').replace(/:/g, '%3A').replace(/#/g, '%23').replace(/;/g, '%3B').replace(/\(/g, '%28').replace(/\)/g, '%29'));
        },
        replace: function (string, pattern, replacement, flags) {
            var result = string.value;
            replacement = replacement.type === 'Quoted' ? replacement.value : replacement.toCSS();
            result = result.replace(new RegExp(pattern.value, flags ? flags.value : ''), replacement);
            return new Quoted(string.quote || '', result, string.escaped);
        },
        '%': function (string) {
            var args = Array.prototype.slice.call(arguments, 1), result = string.value;
            for (var i = 0; i < args.length; i++) {
                result = result.replace(/%[sda]/i, function (token) {
                    var value = args[i].type === 'Quoted' && token.match(/s/i) ? args[i].value : args[i].toCSS();
                    return token.match(/[A-Z]$/) ? encodeURIComponent(value) : value;
                });
            }
            result = result.replace(/%%/g, '%');
            return new Quoted(string.quote || '', result, string.escaped);
        }
    });
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
define('skylark-less/engine/functions/svg',[
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
define('skylark-less/engine/functions/types',[
    '../tree/keyword',
    '../tree/detached-ruleset',
    '../tree/dimension',
    '../tree/color',
    '../tree/quoted',
    '../tree/anonymous',
    '../tree/url',
    '../tree/operation',
    './function-registry'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6, __module__7, __module__8) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var Keyword = __module__0, DetachedRuleset = __module__1, Dimension = __module__2, Color = __module__3, Quoted = __module__4, Anonymous = __module__5, URL = __module__6, Operation = __module__7, functionRegistry = __module__8;
    var isa = function (n, Type) {
            return n instanceof Type ? Keyword.True : Keyword.False;
        }, isunit = function (n, unit) {
            if (unit === undefined) {
                throw {
                    type: 'Argument',
                    message: 'missing the required second argument to isunit.'
                };
            }
            unit = typeof unit.value === 'string' ? unit.value : unit;
            if (typeof unit !== 'string') {
                throw {
                    type: 'Argument',
                    message: 'Second argument to isunit should be a unit or a string.'
                };
            }
            return n instanceof Dimension && n.unit.is(unit) ? Keyword.True : Keyword.False;
        };
    functionRegistry.addMultiple({
        isruleset: function (n) {
            return isa(n, DetachedRuleset);
        },
        iscolor: function (n) {
            return isa(n, Color);
        },
        isnumber: function (n) {
            return isa(n, Dimension);
        },
        isstring: function (n) {
            return isa(n, Quoted);
        },
        iskeyword: function (n) {
            return isa(n, Keyword);
        },
        isurl: function (n) {
            return isa(n, URL);
        },
        ispixel: function (n) {
            return isunit(n, 'px');
        },
        ispercentage: function (n) {
            return isunit(n, '%');
        },
        isem: function (n) {
            return isunit(n, 'em');
        },
        isunit: isunit,
        unit: function (val, unit) {
            if (!(val instanceof Dimension)) {
                throw {
                    type: 'Argument',
                    message: 'the first argument to unit must be a number' + (val instanceof Operation ? '. Have you forgotten parenthesis?' : '')
                };
            }
            if (unit) {
                if (unit instanceof Keyword) {
                    unit = unit.value;
                } else {
                    unit = unit.toCSS();
                }
            } else {
                unit = '';
            }
            return new Dimension(val.value, unit);
        },
        'get-unit': function (n) {
            return new Anonymous(n.unit);
        }
    });
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
define('skylark-less/engine/functions/index',[
    './function-registry',
    './function-caller',
    './boolean',
    './default',
    './color',
    './color-blending',
    './data-uri',
    './list',
    './math',
    './number',
    './string',
    './svg',
    './types'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6, __module__7, __module__8, __module__9, __module__10, __module__11, __module__12) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = function (environment) {
        var functions = {
            functionRegistry: __module__0,
            functionCaller: __module__1
        };
        __module__2;
        __module__3;
        __module__4;
        __module__5;
        __module__6(environment);
        __module__7;
        __module__8;
        __module__9;
        __module__10;
        __module__11(environment);
        __module__12;
        return functions;
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
define('skylark-less/engine/source-map-output',[], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = function (environment) {
        var SourceMapOutput = function (options) {
            this._css = [];
            this._rootNode = options.rootNode;
            this._contentsMap = options.contentsMap;
            this._contentsIgnoredCharsMap = options.contentsIgnoredCharsMap;
            if (options.sourceMapFilename) {
                this._sourceMapFilename = options.sourceMapFilename.replace(/\\/g, '/');
            }
            this._outputFilename = options.outputFilename;
            this.sourceMapURL = options.sourceMapURL;
            if (options.sourceMapBasepath) {
                this._sourceMapBasepath = options.sourceMapBasepath.replace(/\\/g, '/');
            }
            if (options.sourceMapRootpath) {
                this._sourceMapRootpath = options.sourceMapRootpath.replace(/\\/g, '/');
                if (this._sourceMapRootpath.charAt(this._sourceMapRootpath.length - 1) !== '/') {
                    this._sourceMapRootpath += '/';
                }
            } else {
                this._sourceMapRootpath = '';
            }
            this._outputSourceFiles = options.outputSourceFiles;
            this._sourceMapGeneratorConstructor = environment.getSourceMapGenerator();
            this._lineNumber = 0;
            this._column = 0;
        };
        SourceMapOutput.prototype.removeBasepath = function (path) {
            if (this._sourceMapBasepath && path.indexOf(this._sourceMapBasepath) === 0) {
                path = path.substring(this._sourceMapBasepath.length);
                if (path.charAt(0) === '\\' || path.charAt(0) === '/') {
                    path = path.substring(1);
                }
            }
            return path;
        };
        SourceMapOutput.prototype.normalizeFilename = function (filename) {
            filename = filename.replace(/\\/g, '/');
            filename = this.removeBasepath(filename);
            return (this._sourceMapRootpath || '') + filename;
        };
        SourceMapOutput.prototype.add = function (chunk, fileInfo, index, mapLines) {
            if (!chunk) {
                return;
            }
            var lines, sourceLines, columns, sourceColumns, i;
            if (fileInfo && fileInfo.filename) {
                var inputSource = this._contentsMap[fileInfo.filename];
                if (this._contentsIgnoredCharsMap[fileInfo.filename]) {
                    index -= this._contentsIgnoredCharsMap[fileInfo.filename];
                    if (index < 0) {
                        index = 0;
                    }
                    inputSource = inputSource.slice(this._contentsIgnoredCharsMap[fileInfo.filename]);
                }
                inputSource = inputSource.substring(0, index);
                sourceLines = inputSource.split('\n');
                sourceColumns = sourceLines[sourceLines.length - 1];
            }
            lines = chunk.split('\n');
            columns = lines[lines.length - 1];
            if (fileInfo && fileInfo.filename) {
                if (!mapLines) {
                    this._sourceMapGenerator.addMapping({
                        generated: {
                            line: this._lineNumber + 1,
                            column: this._column
                        },
                        original: {
                            line: sourceLines.length,
                            column: sourceColumns.length
                        },
                        source: this.normalizeFilename(fileInfo.filename)
                    });
                } else {
                    for (i = 0; i < lines.length; i++) {
                        this._sourceMapGenerator.addMapping({
                            generated: {
                                line: this._lineNumber + i + 1,
                                column: i === 0 ? this._column : 0
                            },
                            original: {
                                line: sourceLines.length + i,
                                column: i === 0 ? sourceColumns.length : 0
                            },
                            source: this.normalizeFilename(fileInfo.filename)
                        });
                    }
                }
            }
            if (lines.length === 1) {
                this._column += columns.length;
            } else {
                this._lineNumber += lines.length - 1;
                this._column = columns.length;
            }
            this._css.push(chunk);
        };
        SourceMapOutput.prototype.isEmpty = function () {
            return this._css.length === 0;
        };
        SourceMapOutput.prototype.toCSS = function (context) {
            this._sourceMapGenerator = new this._sourceMapGeneratorConstructor({
                file: this._outputFilename,
                sourceRoot: null
            });
            if (this._outputSourceFiles) {
                for (var filename in this._contentsMap) {
                    if (this._contentsMap.hasOwnProperty(filename)) {
                        var source = this._contentsMap[filename];
                        if (this._contentsIgnoredCharsMap[filename]) {
                            source = source.slice(this._contentsIgnoredCharsMap[filename]);
                        }
                        this._sourceMapGenerator.setSourceContent(this.normalizeFilename(filename), source);
                    }
                }
            }
            this._rootNode.genCSS(context, this);
            if (this._css.length > 0) {
                var sourceMapURL, sourceMapContent = JSON.stringify(this._sourceMapGenerator.toJSON());
                if (this.sourceMapURL) {
                    sourceMapURL = this.sourceMapURL;
                } else if (this._sourceMapFilename) {
                    sourceMapURL = this._sourceMapFilename;
                }
                this.sourceMapURL = sourceMapURL;
                this.sourceMap = sourceMapContent;
            }
            return this._css.join('');
        };
        return SourceMapOutput;
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
define('skylark-less/engine/source-map-builder',[], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = function (SourceMapOutput, environment) {
        var SourceMapBuilder = function (options) {
            this.options = options;
        };
        SourceMapBuilder.prototype.toCSS = function (rootNode, options, imports) {
            var sourceMapOutput = new SourceMapOutput({
                contentsIgnoredCharsMap: imports.contentsIgnoredChars,
                rootNode: rootNode,
                contentsMap: imports.contents,
                sourceMapFilename: this.options.sourceMapFilename,
                sourceMapURL: this.options.sourceMapURL,
                outputFilename: this.options.sourceMapOutputFilename,
                sourceMapBasepath: this.options.sourceMapBasepath,
                sourceMapRootpath: this.options.sourceMapRootpath,
                outputSourceFiles: this.options.outputSourceFiles,
                sourceMapGenerator: this.options.sourceMapGenerator,
                sourceMapFileInline: this.options.sourceMapFileInline
            });
            var css = sourceMapOutput.toCSS(options);
            this.sourceMap = sourceMapOutput.sourceMap;
            this.sourceMapURL = sourceMapOutput.sourceMapURL;
            if (this.options.sourceMapInputFilename) {
                this.sourceMapInputFilename = sourceMapOutput.normalizeFilename(this.options.sourceMapInputFilename);
            }
            if (this.options.sourceMapBasepath !== undefined && this.sourceMapURL !== undefined) {
                this.sourceMapURL = sourceMapOutput.removeBasepath(this.sourceMapURL);
            }
            return css + this.getCSSAppendage();
        };
        SourceMapBuilder.prototype.getCSSAppendage = function () {
            var sourceMapURL = this.sourceMapURL;
            if (this.options.sourceMapFileInline) {
                if (this.sourceMap === undefined) {
                    return '';
                }
                sourceMapURL = 'data:application/json;base64,' + environment.encodeBase64(this.sourceMap);
            }
            if (sourceMapURL) {
                return '/*# sourceMappingURL=' + sourceMapURL + ' */';
            }
            return '';
        };
        SourceMapBuilder.prototype.getExternalSourceMap = function () {
            return this.sourceMap;
        };
        SourceMapBuilder.prototype.setExternalSourceMap = function (sourceMap) {
            this.sourceMap = sourceMap;
        };
        SourceMapBuilder.prototype.isInline = function () {
            return this.options.sourceMapFileInline;
        };
        SourceMapBuilder.prototype.getSourceMapURL = function () {
            return this.sourceMapURL;
        };
        SourceMapBuilder.prototype.getOutputFilename = function () {
            return this.options.sourceMapOutputFilename;
        };
        SourceMapBuilder.prototype.getInputFilename = function () {
            return this.sourceMapInputFilename;
        };
        return SourceMapBuilder;
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
define('skylark-less/engine/transform-tree',[
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
define('skylark-less/engine/parse-tree',[
    './less-error',
    './transform-tree',
    './logger'
], function (__module__0, __module__1, __module__2) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var LessError = __module__0, transformTree = __module__1, logger = __module__2;
    module.exports = function (SourceMapBuilder) {
        var ParseTree = function (root, imports) {
            this.root = root;
            this.imports = imports;
        };
        ParseTree.prototype.toCSS = function (options) {
            var evaldRoot, result = {}, sourceMapBuilder;
            try {
                evaldRoot = transformTree(this.root, options);
            } catch (e) {
                throw new LessError(e, this.imports);
            }
            try {
                var compress = Boolean(options.compress);
                if (compress) {
                    logger.warn('The compress option has been deprecated. We recommend you use a dedicated css minifier, for instance see less-plugin-clean-css.');
                }
                var toCSSOptions = {
                    compress: compress,
                    dumpLineNumbers: options.dumpLineNumbers,
                    strictUnits: Boolean(options.strictUnits),
                    numPrecision: 8
                };
                if (options.sourceMap) {
                    sourceMapBuilder = new SourceMapBuilder(options.sourceMap);
                    result.css = sourceMapBuilder.toCSS(evaldRoot, toCSSOptions, this.imports);
                } else {
                    result.css = evaldRoot.toCSS(toCSSOptions);
                }
            } catch (e) {
                throw new LessError(e, this.imports);
            }
            if (options.pluginManager) {
                var postProcessors = options.pluginManager.getPostProcessors();
                for (var i = 0; i < postProcessors.length; i++) {
                    result.css = postProcessors[i].process(result.css, {
                        sourceMap: sourceMapBuilder,
                        options: options,
                        imports: this.imports
                    });
                }
            }
            if (options.sourceMap) {
                result.map = sourceMapBuilder.getExternalSourceMap();
            }
            result.imports = [];
            for (var file in this.imports.files) {
                if (this.imports.files.hasOwnProperty(file) && file !== this.imports.rootFilename) {
                    result.imports.push(file);
                }
            }
            return result;
        };
        return ParseTree;
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
define('skylark-less/engine/import-manager',[
    './contexts',
    './parser/parser',
    './less-error',
    './utils',
    './logger'
], function (__module__0, __module__1, __module__2, __module__3, __module__4) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var contexts = __module__0, Parser = __module__1, LessError = __module__2, utils = __module__3, PromiseConstructor = Promise, logger = __module__4;
    module.exports = function (environment) {
        var ImportManager = function (less, context, rootFileInfo) {
            this.less = less;
            this.rootFilename = rootFileInfo.filename;
            this.paths = context.paths || [];
            this.contents = {};
            this.contentsIgnoredChars = {};
            this.mime = context.mime;
            this.error = null;
            this.context = context;
            this.queue = [];
            this.files = {};
        };
        ImportManager.prototype.push = function (path, tryAppendExtension, currentFileInfo, importOptions, callback) {
            var importManager = this, pluginLoader = this.context.pluginManager.Loader;
            this.queue.push(path);
            var fileParsedFunc = function (e, root, fullPath) {
                importManager.queue.splice(importManager.queue.indexOf(path), 1);
                var importedEqualsRoot = fullPath === importManager.rootFilename;
                if (importOptions.optional && e) {
                    callback(null, { rules: [] }, false, null);
                    logger.info('The file ' + fullPath + ' was skipped because it was not found and the import was marked optional.');
                } else {
                    if (!importManager.files[fullPath] && !importOptions.inline) {
                        importManager.files[fullPath] = {
                            root: root,
                            options: importOptions
                        };
                    }
                    if (e && !importManager.error) {
                        importManager.error = e;
                    }
                    callback(e, root, importedEqualsRoot, fullPath);
                }
            };
            var newFileInfo = {
                rewriteUrls: this.context.rewriteUrls,
                entryPath: currentFileInfo.entryPath,
                rootpath: currentFileInfo.rootpath,
                rootFilename: currentFileInfo.rootFilename
            };
            var fileManager = environment.getFileManager(path, currentFileInfo.currentDirectory, this.context, environment);
            if (!fileManager) {
                fileParsedFunc({ message: 'Could not find a file-manager for ' + path });
                return;
            }
            var loadFileCallback = function (loadedFile) {
                var plugin, resolvedFilename = loadedFile.filename, contents = loadedFile.contents.replace(/^\uFEFF/, '');
                newFileInfo.currentDirectory = fileManager.getPath(resolvedFilename);
                if (newFileInfo.rewriteUrls) {
                    newFileInfo.rootpath = fileManager.join(importManager.context.rootpath || '', fileManager.pathDiff(newFileInfo.currentDirectory, newFileInfo.entryPath));
                    if (!fileManager.isPathAbsolute(newFileInfo.rootpath) && fileManager.alwaysMakePathsAbsolute()) {
                        newFileInfo.rootpath = fileManager.join(newFileInfo.entryPath, newFileInfo.rootpath);
                    }
                }
                newFileInfo.filename = resolvedFilename;
                var newEnv = new contexts.Parse(importManager.context);
                newEnv.processImports = false;
                importManager.contents[resolvedFilename] = contents;
                if (currentFileInfo.reference || importOptions.reference) {
                    newFileInfo.reference = true;
                }
                if (importOptions.isPlugin) {
                    plugin = pluginLoader.evalPlugin(contents, newEnv, importManager, importOptions.pluginArgs, newFileInfo);
                    if (plugin instanceof LessError) {
                        fileParsedFunc(plugin, null, resolvedFilename);
                    } else {
                        fileParsedFunc(null, plugin, resolvedFilename);
                    }
                } else if (importOptions.inline) {
                    fileParsedFunc(null, contents, resolvedFilename);
                } else {
                    if (importManager.files[resolvedFilename] && !importManager.files[resolvedFilename].options.multiple && !importOptions.multiple) {
                        fileParsedFunc(null, importManager.files[resolvedFilename].root, resolvedFilename);
                    } else {
                        new Parser(newEnv, importManager, newFileInfo).parse(contents, function (e, root) {
                            fileParsedFunc(e, root, resolvedFilename);
                        });
                    }
                }
            };
            var promise, context = utils.clone(this.context);
            if (tryAppendExtension) {
                context.ext = importOptions.isPlugin ? '.js' : '.less';
            }
            if (importOptions.isPlugin) {
                context.mime = 'application/javascript';
                promise = pluginLoader.loadPlugin(path, currentFileInfo.currentDirectory, context, environment, fileManager);
            } else {
                promise = fileManager.loadFile(path, currentFileInfo.currentDirectory, context, environment, function (err, loadedFile) {
                    if (err) {
                        fileParsedFunc(err);
                    } else {
                        loadFileCallback(loadedFile);
                    }
                });
            }
            if (promise) {
                promise.then(loadFileCallback, fileParsedFunc);
            }
        };
        return ImportManager;
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
define('skylark-less/engine/render',['./utils'], function (__module__0) {
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
define('skylark-less/engine/plugin-manager',[], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var PluginManager = function (less) {
        this.less = less;
        this.visitors = [];
        this.preProcessors = [];
        this.postProcessors = [];
        this.installedPlugins = [];
        this.fileManagers = [];
        this.iterator = -1;
        this.pluginCache = {};
        this.Loader = new less.PluginLoader(less);
    };
    var pm, PluginManagerFactory = function (less, newFactory) {
            if (newFactory || !pm) {
                pm = new PluginManager(less);
            }
            return pm;
        };
    PluginManager.prototype.addPlugins = function (plugins) {
        if (plugins) {
            for (var i = 0; i < plugins.length; i++) {
                this.addPlugin(plugins[i]);
            }
        }
    };
    PluginManager.prototype.addPlugin = function (plugin, filename, functionRegistry) {
        this.installedPlugins.push(plugin);
        if (filename) {
            this.pluginCache[filename] = plugin;
        }
        if (plugin.install) {
            plugin.install(this.less, this, functionRegistry || this.less.functions.functionRegistry);
        }
    };
    PluginManager.prototype.get = function (filename) {
        return this.pluginCache[filename];
    };
    PluginManager.prototype.addVisitor = function (visitor) {
        this.visitors.push(visitor);
    };
    PluginManager.prototype.addPreProcessor = function (preProcessor, priority) {
        var indexToInsertAt;
        for (indexToInsertAt = 0; indexToInsertAt < this.preProcessors.length; indexToInsertAt++) {
            if (this.preProcessors[indexToInsertAt].priority >= priority) {
                break;
            }
        }
        this.preProcessors.splice(indexToInsertAt, 0, {
            preProcessor: preProcessor,
            priority: priority
        });
    };
    PluginManager.prototype.addPostProcessor = function (postProcessor, priority) {
        var indexToInsertAt;
        for (indexToInsertAt = 0; indexToInsertAt < this.postProcessors.length; indexToInsertAt++) {
            if (this.postProcessors[indexToInsertAt].priority >= priority) {
                break;
            }
        }
        this.postProcessors.splice(indexToInsertAt, 0, {
            postProcessor: postProcessor,
            priority: priority
        });
    };
    PluginManager.prototype.addFileManager = function (manager) {
        this.fileManagers.push(manager);
    };
    PluginManager.prototype.getPreProcessors = function () {
        var preProcessors = [];
        for (var i = 0; i < this.preProcessors.length; i++) {
            preProcessors.push(this.preProcessors[i].preProcessor);
        }
        return preProcessors;
    };
    PluginManager.prototype.getPostProcessors = function () {
        var postProcessors = [];
        for (var i = 0; i < this.postProcessors.length; i++) {
            postProcessors.push(this.postProcessors[i].postProcessor);
        }
        return postProcessors;
    };
    PluginManager.prototype.getVisitors = function () {
        return this.visitors;
    };
    PluginManager.prototype.visitor = function () {
        var self = this;
        return {
            first: function () {
                self.iterator = -1;
                return self.visitors[self.iterator];
            },
            get: function () {
                self.iterator += 1;
                return self.visitors[self.iterator];
            }
        };
    };
    PluginManager.prototype.getFileManagers = function () {
        return this.fileManagers;
    };
    module.exports = PluginManagerFactory;
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
define('skylark-less/engine/parse',[
    './contexts',
    './parser/parser',
    './plugin-manager',
    './less-error',
    './utils'
], function (__module__0, __module__1, __module__2, __module__3, __module__4) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var PromiseConstructor, contexts = __module__0, Parser = __module__1, PluginManager = __module__2, LessError = __module__3, utils = __module__4;
    module.exports = function (environment, ParseTree, ImportManager) {
        var parse = function (input, options, callback) {
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
                    parse.call(self, input, options, function (err, output) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(output);
                        }
                    });
                });
            } else {
                var context, rootFileInfo, pluginManager = new PluginManager(this, !options.reUsePluginManager);
                options.pluginManager = pluginManager;
                context = new contexts.Parse(options);
                if (options.rootFileInfo) {
                    rootFileInfo = options.rootFileInfo;
                } else {
                    var filename = options.filename || 'input';
                    var entryPath = filename.replace(/[^\/\\]*$/, '');
                    rootFileInfo = {
                        filename: filename,
                        rewriteUrls: context.rewriteUrls,
                        rootpath: context.rootpath || '',
                        currentDirectory: entryPath,
                        entryPath: entryPath,
                        rootFilename: filename
                    };
                    if (rootFileInfo.rootpath && rootFileInfo.rootpath.slice(-1) !== '/') {
                        rootFileInfo.rootpath += '/';
                    }
                }
                var imports = new ImportManager(this, context, rootFileInfo);
                this.importManager = imports;
                if (options.plugins) {
                    options.plugins.forEach(function (plugin) {
                        var evalResult, contents;
                        if (plugin.fileContent) {
                            contents = plugin.fileContent.replace(/^\uFEFF/, '');
                            evalResult = pluginManager.Loader.evalPlugin(contents, context, imports, plugin.options, plugin.filename);
                            if (evalResult instanceof LessError) {
                                return callback(evalResult);
                            }
                        } else {
                            pluginManager.addPlugin(plugin);
                        }
                    });
                }
                new Parser(context, imports, rootFileInfo).parse(input, function (e, root) {
                    if (e) {
                        return callback(e);
                    }
                    callback(null, root, imports, options);
                }, options);
            }
        };
        return parse;
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
define('skylark-less/engine/index',[
    './data/index',
    './tree/index',
    './environment/environment',
    './environment/abstract-file-manager',
    './environment/abstract-plugin-loader',
    './visitors/index',
    './parser/parser',
    './functions/index',
    './contexts',
    './source-map-output',
    './source-map-builder',
    './parse-tree',
    './import-manager',
    './render',
    './parse',
    './less-error',
    './transform-tree',
    './utils',
    './plugin-manager',
    './logger'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6, __module__7, __module__8, __module__9, __module__10, __module__11, __module__12, __module__13, __module__14, __module__15, __module__16, __module__17, __module__18, __module__19) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = function (environment, fileManagers) {
        var SourceMapOutput, SourceMapBuilder, ParseTree, ImportManager, Environment;
        var initial = {
            version: [
                3,
                9,
                0
            ],
            data: __module__0,
            tree: __module__1,
            Environment: Environment = __module__2,
            AbstractFileManager: __module__3,
            AbstractPluginLoader: __module__4,
            environment: environment = new Environment(environment, fileManagers),
            visitors: __module__5,
            Parser: __module__6,
            functions: __module__7(environment),
            contexts: __module__8,
            SourceMapOutput: SourceMapOutput = __module__9(environment),
            SourceMapBuilder: SourceMapBuilder = __module__10(SourceMapOutput, environment),
            ParseTree: ParseTree = __module__11(SourceMapBuilder),
            ImportManager: ImportManager = __module__12(environment),
            render: __module__13(environment, ParseTree, ImportManager),
            parse: __module__14(environment, ParseTree, ImportManager),
            LessError: __module__15,
            transformTree: __module__16,
            utils: __module__17,
            PluginManager: __module__18,
            logger: __module__19
        };
        var ctor = function (t) {
            return function () {
                var obj = Object.create(t.prototype);
                t.apply(obj, Array.prototype.slice.call(arguments, 0));
                return obj;
            };
        };
        var t, api = Object.create(initial);
        for (var n in initial.tree) {
            t = initial.tree[n];
            if (typeof t === 'function') {
                api[n.toLowerCase()] = ctor(t);
            } else {
                api[n] = Object.create(null);
                for (var o in t) {
                    api[n][o.toLowerCase()] = ctor(t[o]);
                }
            }
        }
        return api;
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
define('skylark-less/browser/utils',[], function () {
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
define('skylark-less/browser/browser',['./utils'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var utils = __module__0;
    module.exports = {
        createCSS: function (document, styles, sheet) {
            var href = sheet.href || '';
            var id = 'less:' + (sheet.title || utils.extractId(href));
            var oldStyleNode = document.getElementById(id);
            var keepOldStyleNode = false;
            var styleNode = document.createElement('style');
            styleNode.setAttribute('type', 'text/css');
            if (sheet.media) {
                styleNode.setAttribute('media', sheet.media);
            }
            styleNode.id = id;
            if (!styleNode.styleSheet) {
                styleNode.appendChild(document.createTextNode(styles));
                keepOldStyleNode = oldStyleNode !== null && oldStyleNode.childNodes.length > 0 && styleNode.childNodes.length > 0 && oldStyleNode.firstChild.nodeValue === styleNode.firstChild.nodeValue;
            }
            var head = document.getElementsByTagName('head')[0];
            if (oldStyleNode === null || keepOldStyleNode === false) {
                var nextEl = sheet && sheet.nextSibling || null;
                if (nextEl) {
                    nextEl.parentNode.insertBefore(styleNode, nextEl);
                } else {
                    head.appendChild(styleNode);
                }
            }
            if (oldStyleNode && keepOldStyleNode === false) {
                oldStyleNode.parentNode.removeChild(oldStyleNode);
            }
            if (styleNode.styleSheet) {
                try {
                    styleNode.styleSheet.cssText = styles;
                } catch (e) {
                    throw new Error("Couldn't reassign styleSheet.cssText.");
                }
            }
        },
        currentScript: function (window) {
            var document = window.document;
            return document.currentScript || function () {
                var scripts = document.getElementsByTagName('script');
                return scripts[scripts.length - 1];
            }();
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
define('skylark-less/browser/file-manager',['../engine/environment/abstract-file-manager'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = function (options, logger) {
        var AbstractFileManager = __module__0;
        var fileCache = {};
        var FileManager = function () {
        };
        FileManager.prototype = new AbstractFileManager();
        FileManager.prototype.alwaysMakePathsAbsolute = function alwaysMakePathsAbsolute() {
            return true;
        };
        FileManager.prototype.join = function join(basePath, laterPath) {
            if (!basePath) {
                return laterPath;
            }
            return this.extractUrlParts(laterPath, basePath).path;
        };
        FileManager.prototype.doXHR = function doXHR(url, type, callback, errback) {
            var xhr = new XMLHttpRequest();
            var async = options.isFileProtocol ? options.fileAsync : true;
            if (typeof xhr.overrideMimeType === 'function') {
                xhr.overrideMimeType('text/css');
            }
            logger.debug("XHR: Getting '" + url + "'");
            xhr.open('GET', url, async);
            xhr.setRequestHeader('Accept', type || 'text/x-less, text/css; q=0.9, */*; q=0.5');
            xhr.send(null);
            function handleResponse(xhr, callback, errback) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    callback(xhr.responseText, xhr.getResponseHeader('Last-Modified'));
                } else if (typeof errback === 'function') {
                    errback(xhr.status, url);
                }
            }
            if (options.isFileProtocol && !options.fileAsync) {
                if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300) {
                    callback(xhr.responseText);
                } else {
                    errback(xhr.status, url);
                }
            } else if (async) {
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        handleResponse(xhr, callback, errback);
                    }
                };
            } else {
                handleResponse(xhr, callback, errback);
            }
        };
        FileManager.prototype.supports = function (filename, currentDirectory, options, environment) {
            return true;
        };
        FileManager.prototype.clearFileCache = function () {
            fileCache = {};
        };
        FileManager.prototype.loadFile = function loadFile(filename, currentDirectory, options, environment) {
            if (currentDirectory && !this.isPathAbsolute(filename)) {
                filename = currentDirectory + filename;
            }
            filename = options.ext ? this.tryAppendExtension(filename, options.ext) : filename;
            options = options || {};
            var hrefParts = this.extractUrlParts(filename, window.location.href);
            var href = hrefParts.url;
            var self = this;
            return new Promise(function (resolve, reject) {
                if (options.useFileCache && fileCache[href]) {
                    try {
                        var lessText = fileCache[href];
                        return resolve({
                            contents: lessText,
                            filename: href,
                            webInfo: { lastModified: new Date() }
                        });
                    } catch (e) {
                        return reject({
                            filename: href,
                            message: 'Error loading file ' + href + ' error was ' + e.message
                        });
                    }
                }
                self.doXHR(href, options.mime, function doXHRCallback(data, lastModified) {
                    fileCache[href] = data;
                    resolve({
                        contents: data,
                        filename: href,
                        webInfo: { lastModified: lastModified }
                    });
                }, function doXHRError(status, url) {
                    reject({
                        type: 'File',
                        message: "'" + url + "' wasn't found (" + status + ')',
                        href: href
                    });
                });
            });
        };
        return FileManager;
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
define('skylark-less/browser/plugin-loader',['../engine/environment/abstract-plugin-loader'], function (__module__0) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var AbstractPluginLoader = __module__0;
    var PluginLoader = function (less) {
        this.less = less;
    };
    PluginLoader.prototype = new AbstractPluginLoader();
    PluginLoader.prototype.loadPlugin = function (filename, basePath, context, environment, fileManager) {
        return new Promise(function (fulfill, reject) {
            fileManager.loadFile(filename, basePath, context, environment).then(fulfill).catch(reject);
        });
    };
    module.exports = PluginLoader;
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
define('skylark-less/browser/log-listener',[], function () {
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
define('skylark-less/browser/error-reporting',[
    './utils',
    './browser'
], function (__module__0, __module__1) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var utils = __module__0, browser = __module__1;
    module.exports = function (window, less, options) {
        function errorHTML(e, rootHref) {
            var id = 'less-error-message:' + utils.extractId(rootHref || '');
            var template = '<li><label>{line}</label><pre class="{class}">{content}</pre></li>';
            var elem = window.document.createElement('div'), timer, content, errors = [];
            var filename = e.filename || rootHref;
            var filenameNoPath = filename.match(/([^\/]+(\?.*)?)$/)[1];
            elem.id = id;
            elem.className = 'less-error-message';
            content = '<h3>' + (e.type || 'Syntax') + 'Error: ' + (e.message || 'There is an error in your .less file') + '</h3>' + '<p>in <a href="' + filename + '">' + filenameNoPath + '</a> ';
            var errorline = function (e, i, classname) {
                if (e.extract[i] !== undefined) {
                    errors.push(template.replace(/\{line\}/, (parseInt(e.line, 10) || 0) + (i - 1)).replace(/\{class\}/, classname).replace(/\{content\}/, e.extract[i]));
                }
            };
            if (e.line) {
                errorline(e, 0, '');
                errorline(e, 1, 'line');
                errorline(e, 2, '');
                content += 'on line ' + e.line + ', column ' + (e.column + 1) + ':</p>' + '<ul>' + errors.join('') + '</ul>';
            }
            if (e.stack && (e.extract || options.logLevel >= 4)) {
                content += '<br/>Stack Trace</br />' + e.stack.split('\n').slice(1).join('<br/>');
            }
            elem.innerHTML = content;
            browser.createCSS(window.document, [
                '.less-error-message ul, .less-error-message li {',
                'list-style-type: none;',
                'margin-right: 15px;',
                'padding: 4px 0;',
                'margin: 0;',
                '}',
                '.less-error-message label {',
                'font-size: 12px;',
                'margin-right: 15px;',
                'padding: 4px 0;',
                'color: #cc7777;',
                '}',
                '.less-error-message pre {',
                'color: #dd6666;',
                'padding: 4px 0;',
                'margin: 0;',
                'display: inline-block;',
                '}',
                '.less-error-message pre.line {',
                'color: #ff0000;',
                '}',
                '.less-error-message h3 {',
                'font-size: 20px;',
                'font-weight: bold;',
                'padding: 15px 0 5px 0;',
                'margin: 0;',
                '}',
                '.less-error-message a {',
                'color: #10a',
                '}',
                '.less-error-message .error {',
                'color: red;',
                'font-weight: bold;',
                'padding-bottom: 2px;',
                'border-bottom: 1px dashed red;',
                '}'
            ].join('\n'), { title: 'error-message' });
            elem.style.cssText = [
                'font-family: Arial, sans-serif',
                'border: 1px solid #e00',
                'background-color: #eee',
                'border-radius: 5px',
                '-webkit-border-radius: 5px',
                '-moz-border-radius: 5px',
                'color: #e00',
                'padding: 15px',
                'margin-bottom: 15px'
            ].join(';');
            if (options.env === 'development') {
                timer = setInterval(function () {
                    var document = window.document, body = document.body;
                    if (body) {
                        if (document.getElementById(id)) {
                            body.replaceChild(elem, document.getElementById(id));
                        } else {
                            body.insertBefore(elem, body.firstChild);
                        }
                        clearInterval(timer);
                    }
                }, 10);
            }
        }
        function removeErrorHTML(path) {
            var node = window.document.getElementById('less-error-message:' + utils.extractId(path));
            if (node) {
                node.parentNode.removeChild(node);
            }
        }
        function removeErrorConsole(path) {
        }
        function removeError(path) {
            if (!options.errorReporting || options.errorReporting === 'html') {
                removeErrorHTML(path);
            } else if (options.errorReporting === 'console') {
                removeErrorConsole(path);
            } else if (typeof options.errorReporting === 'function') {
                options.errorReporting('remove', path);
            }
        }
        function errorConsole(e, rootHref) {
            var template = '{line} {content}';
            var filename = e.filename || rootHref;
            var errors = [];
            var content = (e.type || 'Syntax') + 'Error: ' + (e.message || 'There is an error in your .less file') + ' in ' + filename;
            var errorline = function (e, i, classname) {
                if (e.extract[i] !== undefined) {
                    errors.push(template.replace(/\{line\}/, (parseInt(e.line, 10) || 0) + (i - 1)).replace(/\{class\}/, classname).replace(/\{content\}/, e.extract[i]));
                }
            };
            if (e.line) {
                errorline(e, 0, '');
                errorline(e, 1, 'line');
                errorline(e, 2, '');
                content += ' on line ' + e.line + ', column ' + (e.column + 1) + ':\n' + errors.join('\n');
            }
            if (e.stack && (e.extract || options.logLevel >= 4)) {
                content += '\nStack Trace\n' + e.stack;
            }
            less.logger.error(content);
        }
        function error(e, rootHref) {
            if (!options.errorReporting || options.errorReporting === 'html') {
                errorHTML(e, rootHref);
            } else if (options.errorReporting === 'console') {
                errorConsole(e, rootHref);
            } else if (typeof options.errorReporting === 'function') {
                options.errorReporting('add', e, rootHref);
            }
        }
        return {
            add: error,
            remove: removeError
        };
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
define('skylark-less/browser/cache',[], function () {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    module.exports = function (window, options, logger) {
        var cache = null;
        if (options.env !== 'development') {
            try {
                cache = typeof window.localStorage === 'undefined' ? null : window.localStorage;
            } catch (_) {
            }
        }
        return {
            setCSS: function (path, lastModified, modifyVars, styles) {
                if (cache) {
                    logger.info('saving ' + path + ' to cache.');
                    try {
                        cache.setItem(path, styles);
                        cache.setItem(path + ':timestamp', lastModified);
                        if (modifyVars) {
                            cache.setItem(path + ':vars', JSON.stringify(modifyVars));
                        }
                    } catch (e) {
                        logger.error('failed to save "' + path + '" to local storage for caching.');
                    }
                }
            },
            getCSS: function (path, webInfo, modifyVars) {
                var css = cache && cache.getItem(path), timestamp = cache && cache.getItem(path + ':timestamp'), vars = cache && cache.getItem(path + ':vars');
                modifyVars = modifyVars || {};
                vars = vars || '{}';
                if (timestamp && webInfo.lastModified && new Date(webInfo.lastModified).valueOf() === new Date(timestamp).valueOf() && JSON.stringify(modifyVars) === vars) {
                    return css;
                }
            }
        };
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
define('skylark-less/browser/image-size',['./../engine/functions/function-registry'], function (__module__0) {
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
define('skylark-less/browser/index',[
    './utils',
    './browser',
    '../less',
    './file-manager',
    './plugin-loader',
    './log-listener',
    './error-reporting',
    './cache',
    './image-size'
], function (__module__0, __module__1, __module__2, __module__3, __module__4, __module__5, __module__6, __module__7, __module__8) {
    'use strict';
    var exports = {};
    var module = { exports: {} };
    var addDataAttr = __module__0.addDataAttr, browser = __module__1;
    module.exports = function (window, options) {
        var document = window.document;
        var less = __module__2();
        less.options = options;
        var environment = less.environment, FileManager = __module__3(options, less.logger), fileManager = new FileManager();
        environment.addFileManager(fileManager);
        less.FileManager = FileManager;
        less.PluginLoader = __module__4;
        __module__5(less, options);
        var errors = __module__6(window, less, options);
        var cache = less.cache = options.cache || __module__7(window, options, less.logger);
        __module__8(less.environment);
        if (options.functions) {
            less.functions.functionRegistry.addMultiple(options.functions);
        }
        var typePattern = /^text\/(x-)?less$/;
        function clone(obj) {
            var cloned = {};
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    cloned[prop] = obj[prop];
                }
            }
            return cloned;
        }
        function bind(func, thisArg) {
            var curryArgs = Array.prototype.slice.call(arguments, 2);
            return function () {
                var args = curryArgs.concat(Array.prototype.slice.call(arguments, 0));
                return func.apply(thisArg, args);
            };
        }
        function loadStyles(modifyVars) {
            var styles = document.getElementsByTagName('style'), style;
            for (var i = 0; i < styles.length; i++) {
                style = styles[i];
                if (style.type.match(typePattern)) {
                    var instanceOptions = clone(options);
                    instanceOptions.modifyVars = modifyVars;
                    var lessText = style.innerHTML || '';
                    instanceOptions.filename = document.location.href.replace(/#.*$/, '');
                    less.render(lessText, instanceOptions, bind(function (style, e, result) {
                        if (e) {
                            errors.add(e, 'inline');
                        } else {
                            style.type = 'text/css';
                            if (style.styleSheet) {
                                style.styleSheet.cssText = result.css;
                            } else {
                                style.innerHTML = result.css;
                            }
                        }
                    }, null, style));
                }
            }
        }
        function loadStyleSheet(sheet, callback, reload, remaining, modifyVars) {
            var instanceOptions = clone(options);
            addDataAttr(instanceOptions, sheet);
            instanceOptions.mime = sheet.type;
            if (modifyVars) {
                instanceOptions.modifyVars = modifyVars;
            }
            function loadInitialFileCallback(loadedFile) {
                var data = loadedFile.contents, path = loadedFile.filename, webInfo = loadedFile.webInfo;
                var newFileInfo = {
                    currentDirectory: fileManager.getPath(path),
                    filename: path,
                    rootFilename: path,
                    rewriteUrls: instanceOptions.rewriteUrls
                };
                newFileInfo.entryPath = newFileInfo.currentDirectory;
                newFileInfo.rootpath = instanceOptions.rootpath || newFileInfo.currentDirectory;
                if (webInfo) {
                    webInfo.remaining = remaining;
                    var css = cache.getCSS(path, webInfo, instanceOptions.modifyVars);
                    if (!reload && css) {
                        webInfo.local = true;
                        callback(null, css, data, sheet, webInfo, path);
                        return;
                    }
                }
                errors.remove(path);
                instanceOptions.rootFileInfo = newFileInfo;
                less.render(data, instanceOptions, function (e, result) {
                    if (e) {
                        e.href = path;
                        callback(e);
                    } else {
                        cache.setCSS(sheet.href, webInfo.lastModified, instanceOptions.modifyVars, result.css);
                        callback(null, result.css, data, sheet, webInfo, path);
                    }
                });
            }
            fileManager.loadFile(sheet.href, null, instanceOptions, environment).then(function (loadedFile) {
                loadInitialFileCallback(loadedFile);
            }).catch(function (err) {
                console.log(err);
                callback(err);
            });
        }
        function loadStyleSheets(callback, reload, modifyVars) {
            for (var i = 0; i < less.sheets.length; i++) {
                loadStyleSheet(less.sheets[i], callback, reload, less.sheets.length - (i + 1), modifyVars);
            }
        }
        function initRunningMode() {
            if (less.env === 'development') {
                less.watchTimer = setInterval(function () {
                    if (less.watchMode) {
                        fileManager.clearFileCache();
                        loadStyleSheets(function (e, css, _, sheet, webInfo) {
                            if (e) {
                                errors.add(e, e.href || sheet.href);
                            } else if (css) {
                                browser.createCSS(window.document, css, sheet);
                            }
                        });
                    }
                }, options.poll);
            }
        }
        less.watch = function () {
            if (!less.watchMode) {
                less.env = 'development';
                initRunningMode();
            }
            this.watchMode = true;
            return true;
        };
        less.unwatch = function () {
            clearInterval(less.watchTimer);
            this.watchMode = false;
            return false;
        };
        less.registerStylesheetsImmediately = function () {
            var links = document.getElementsByTagName('link');
            less.sheets = [];
            for (var i = 0; i < links.length; i++) {
                if (links[i].rel === 'stylesheet/less' || links[i].rel.match(/stylesheet/) && links[i].type.match(typePattern)) {
                    less.sheets.push(links[i]);
                }
            }
        };
        less.registerStylesheets = function () {
            return new Promise(function (resolve, reject) {
                less.registerStylesheetsImmediately();
                resolve();
            });
        };
        less.modifyVars = function (record) {
            return less.refresh(true, record, false);
        };
        less.refresh = function (reload, modifyVars, clearFileCache) {
            if ((reload || clearFileCache) && clearFileCache !== false) {
                fileManager.clearFileCache();
            }
            return new Promise(function (resolve, reject) {
                var startTime, endTime, totalMilliseconds, remainingSheets;
                startTime = endTime = new Date();
                remainingSheets = less.sheets.length;
                if (remainingSheets === 0) {
                    endTime = new Date();
                    totalMilliseconds = endTime - startTime;
                    less.logger.info('Less has finished and no sheets were loaded.');
                    resolve({
                        startTime: startTime,
                        endTime: endTime,
                        totalMilliseconds: totalMilliseconds,
                        sheets: less.sheets.length
                    });
                } else {
                    loadStyleSheets(function (e, css, _, sheet, webInfo) {
                        if (e) {
                            errors.add(e, e.href || sheet.href);
                            reject(e);
                            return;
                        }
                        if (webInfo.local) {
                            less.logger.info('Loading ' + sheet.href + ' from cache.');
                        } else {
                            less.logger.info('Rendered ' + sheet.href + ' successfully.');
                        }
                        browser.createCSS(window.document, css, sheet);
                        less.logger.info('CSS for ' + sheet.href + ' generated in ' + (new Date() - endTime) + 'ms');
                        remainingSheets--;
                        if (remainingSheets === 0) {
                            totalMilliseconds = new Date() - startTime;
                            less.logger.info('Less has finished. CSS generated in ' + totalMilliseconds + 'ms');
                            resolve({
                                startTime: startTime,
                                endTime: endTime,
                                totalMilliseconds: totalMilliseconds,
                                sheets: less.sheets.length
                            });
                        }
                        endTime = new Date();
                    }, reload, modifyVars);
                }
                loadStyles(modifyVars);
            });
        };
        less.refreshStyles = loadStyles;
        return less;
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
define('skylark-less/main',[
	"./less",
	"./engine/index",
	"./browser/index"
],function(less,engine){
	less.engine = engine;
	return less;
});
define('skylark-less', ['skylark-less/main'], function (main) { return main; });


},this);