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