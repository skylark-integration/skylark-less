require('promise/polyfill');
var options = require('../engine/default-options')();
if (window.less) {
    for (var key in window.less) {
        if (window.less.hasOwnProperty(key)) {
            options[key] = window.less[key];
        }
    }
}
require('./add-default-options')(window, options);
options.plugins = options.plugins || [];
if (window.LESS_PLUGINS) {
    options.plugins = options.plugins.concat(window.LESS_PLUGINS);
}
var less = module.exports = require('./index')(window, options);
window.less = less;
var css, head, style;
function resolveOrReject(data) {
    if (data.filename) {
        console.warn(data);
    }
    if (!options.async) {
        head.removeChild(style);
    }
}
if (options.onReady) {
    if (/!watch/.test(window.location.hash)) {
        less.watch();
    }
    if (!options.async) {
        css = 'body { display: none !important }';
        head = document.head || document.getElementsByTagName('head')[0];
        style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
    }
    less.registerStylesheetsImmediately();
    less.pageLoadFinished = less.refresh(less.env === 'development').then(resolveOrReject, resolveOrReject);
}