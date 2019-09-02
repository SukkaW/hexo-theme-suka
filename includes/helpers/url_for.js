
'use strict';

const { parse } = require('url');

module.exports = function (hexo) {
    hexo.extend.helper.register('_full_url_for', function (path = '/') {
        if (path[0] === '#' || path.startsWith('//')) {
            return path;
        }

        const { config } = this;
        const data = parse(path);

        // Exit if this is an external path
        if (data.protocol) {
            return path;
        }

        // Prepend root path
        path = config.url + `/${path}`.replace(/\/{2,}/g, '/');
        return path;
    });
};