define([
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