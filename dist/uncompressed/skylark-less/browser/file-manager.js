define(['../engine/environment/abstract-file-manager'], function (__module__0) {
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