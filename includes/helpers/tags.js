'use strict';

const urlFn = require('url');
const moment = require('moment');
const { escapeHTML, htmlTag, stripHTML } = require('hexo-util');

module.exports = function (hexo) {
    const { helper } = hexo.extend;

    helper.register('_meta_generator', () => `<meta name="generator" content="Hexo ${hexo.version}">`);

    helper.register('css_async', (url) => `<link rel="preload" href="${url}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="${url}"></noscript>`);

    helper.register('_open_graph', function (options = {}) {
        function meta(name, content, escape) {
            if (escape !== false && typeof content === 'string') {
                content = escapeHTML(content);
            }

            return htmlTag('meta', { name, content });
        }

        function og(name, content, escape) {
            if (escape !== false && typeof content === 'string') {
                content = escapeHTML(content);
            }

            return htmlTag('meta', { property: name, content });
        }

        const { config, page } = this;
        const { content } = page;

        let images = options.image || options.images || page.photos || [];

        const description = helper.get('page_descr').bind(this)();
        const _tags = helper.get('page_tags').bind(this)();

        let keywords;

        const _title = helper.get('page_title').bind(this);
        const title = (() => _title())();

        const type = options.type || (this.is_post() ? 'article' : 'website');
        const url = (options.url || this.url).replace('index.html', '');
        const siteName = options.site_name || config.title;
        const date = options.date !== false ? options.date || page.date : false;
        const updated = options.updated !== false ? options.updated || page.updated : false;
        const thumbnail = page.thumbnail;
        const language = options.language || config.language;
        const author = config.author;

        // Images
        if (!Array.isArray(images)) images = [images];

        if (!images.length && content) {
            images = images.slice();

            if (content.includes('<img')) {
                let img;
                const imgPattern = /<img [^>]*src=['"]([^'"]+)([^>]*>)/gi;
                while (img = imgPattern.exec(content)) {
                    images.push(img[1]);
                }
            }
        }
        images = images.map(path => {
            if (!urlFn.parse(path).host) {
                // resolve `path`'s absolute path relative to current page's url
                // `path` can be both absolute (starts with `/`) or relative.
                return urlFn.resolve(url || config.url, path);
            }

            return path;
        });

        if (thumbnail) images.unshift(thumbnail);


        let result = '';

        result += og('og:title', title);
        result += og('og:site_name', siteName);
        result += og('og:type', type);
        result += og('og:url', url, false);

        if (language) result += og('og:locale', language, false);

        if (description) result += meta('description', description, false);
        if (_tags) {
            if (typeof _tags === 'string') {
                keywords = _tags
            } else if (_tags.length) {
                keywords = _tags.map(tag => tag.name ? tag.name : tag).filter(keyword => !!keyword).join()
            }
            result += meta('keywords', keywords);
        }

        images.forEach(path => {
            result += og('og:image', path, false);
        });

        if (date) {
            if ((moment.isMoment(date) || moment.isDate(date)) && !isNaN(date.valueOf())) {
                result += og('article:published_time', date.toISOString());
            }
        }

        if (updated) {
            if ((moment.isMoment(updated) || moment.isDate(updated)) && !isNaN(updated.valueOf())) {
                result += og('article:modified_time', updated.toISOString());
                result += og('og:updated_time', updated.toISOString());
            }
        }

        if (this.is_post()) {
            if (author) {
                result += og('article:author', author);
            }

            if (_tags) {
                result += og('article:tag', keywords);
            }

            if (thumbnail) {
                result += meta('twitter:card', 'summary_large_image');
                result += meta('twitter:image', thumbnail, false);
            } else {
                result += meta('twitter:card', 'summary');
            }
        };

        return result.trim();
    });
};
