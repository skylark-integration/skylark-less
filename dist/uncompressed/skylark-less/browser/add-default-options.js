var addDataAttr = require('./utils').addDataAttr, browser = require('./browser');
module.exports = function (window, options) {
    addDataAttr(options, browser.currentScript(window));
    if (options.isFileProtocol === undefined) {
        options.isFileProtocol = /^(file|(chrome|safari)(-extension)?|resource|qrc|app):/.test(window.location.protocol);
    }
    options.async = options.async || false;
    options.fileAsync = options.fileAsync || false;
    options.poll = options.poll || (options.isFileProtocol ? 1000 : 1500);
    options.env = options.env || (window.location.hostname == '127.0.0.1' || window.location.hostname == '0.0.0.0' || window.location.hostname == 'localhost' || window.location.port && window.location.port.length > 0 || options.isFileProtocol ? 'development' : 'production');
    var dumpLineNumbers = /!dumpLineNumbers:(comments|mediaquery|all)/.exec(window.location.hash);
    if (dumpLineNumbers) {
        options.dumpLineNumbers = dumpLineNumbers[1];
    }
    if (options.useFileCache === undefined) {
        options.useFileCache = true;
    }
    if (options.onReady === undefined) {
        options.onReady = true;
    }
    if (options.relativeUrls) {
        options.rewriteUrls = 'all';
    }
};