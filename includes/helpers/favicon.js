module.exports = function (hexo) {
    const { htmlTag } = require('hexo-util');

    hexo.extend.helper.register('favicon', function (options) {
        const url_for = hexo.extend.helper.get('url_for').bind(this);

        let html = '';

        if (options.ico) {
            html += htmlTag('link', { rel: 'icon', type: 'image/ico', href: url_for(options.ico) });
        }
        if (options.apple_touch_icon) {
            html += htmlTag('link', { rel: 'apple-touch-icon', sizes: '180x180', href: url_for(options.apple_touch_icon) });
        }
        if (options.large) {
            html += htmlTag('link', { rel: 'icon', typt: 'image/png', sizes: '192x192', href: url_for(options.large) });
        }
        if (options.medium) {
            html += htmlTag('link', { rel: 'icon', typt: 'image/png', sizes: '32x32', href: url_for(options.medium) });
        }
        if (options.small) {
            html += htmlTag('link', { rel: 'icon', typt: 'image/png', sizes: '16x16', href: url_for(options.small) });
        }

        return html;
    });
};