const { htmlTag } = require('hexo-util');

module.exports = function (hexo) {
    hexo.extend.helper.register('favicon', function () {
        const url_for = hexo.extend.helper.get('url_for').bind(this);
        const { favicon } = this.theme.head;

        let html = '';

        if (favicon.ico) {
            html += htmlTag('link', { rel: 'icon', type: 'image/ico', href: url_for(favicon.ico) });
        }
        if (favicon.apple_touch_icon) {
            html += htmlTag('link', { rel: 'apple-touch-icon', sizes: '180x180', href: url_for(favicon.apple_touch_icon) });
        }
        if (favicon.large) {
            html += htmlTag('link', { rel: 'icon', typt: 'image/png', sizes: '192x192', href: url_for(favicon.large) });
        }
        if (favicon.medium) {
            html += htmlTag('link', { rel: 'icon', typt: 'image/png', sizes: '32x32', href: url_for(favicon.medium) });
        }
        if (favicon.small) {
            html += htmlTag('link', { rel: 'icon', typt: 'image/png', sizes: '16x16', href: url_for(favicon.small) });
        }

        return html;
    });

    hexo.extend.helper.register('site_logo', function () {
        const full_url_for = hexo.extend.helper.get('full_url_for').bind(this);
        const { favicon } = this.theme.head;
        const getFavicon = (type) => full_url_for(favicon[type]);

        if (favicon.large) return getFavicon('large');
        if (favicon.apple_touch_icon) return getFavicon('apple_touch_icon');
        if (favicon.medium) return getFavicon('medium');
        if (favicon.small) return getFavicon('small');
        if (favicon.ico) return getFavicon('ico');

        return 'https://theme-suka.skk.moe/demo/img/suka-favicon.png';
    });
};