/**
  * Generate title string based on page type
  * @example
  *     <%- page_title(page) %>
  *     <%- page_descr(page) %>
  *     <%- page_tags(page) %>
  */

const { stripHTML } = require('hexo-util');

module.exports = function (hexo) {
    hexo.extend.helper.register('page_title', function (page = null) {
        page = (page === null) ? this.page : page;

        let title = page.title;

        if (this.is_archive()) {
            title = this.__('archive');
            if (this.is_month()) {
                title += `: ${page.year}/${page.month}`;
            } else if (this.is_year()) {
                title += `: ${page.year}`;
            }
        } else if (this.is_category()) {
            title = `${this.__('category')}: ${page.category}`;
        } else if (this.is_tag()) {
            title = `${this.__('tag')}: ${page.tag}`;
        }

        return [title, hexo.config.title].filter((str) => typeof (str) !== 'undefined' && str.trim() !== '').join(' | ');
    });

    hexo.extend.helper.register('page_descr', function (page = null) {
        page = (page === null) ? this.page : page;

        let description = page.description || page.excerpt || page.content || hexo.config.description ;

        description = stripHTML(description).trim() // Remove prefixing/trailing spaces
            .replace(/^s*/, '').replace(/s*$/, '')
            .substring(0, 200)
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
            .replace(/\n/g, ' '); // Replace new lines by spaces

        return [description, hexo.config.author, hexo.config.title].filter((str) => typeof (str) !== 'undefined' && str.trim() !== '').join(' - ');
    });

    hexo.extend.helper.register('page_tags', function (page = null) {
        page = (page === null) ? this.page : page;
        const { config } = this;

        let page_tags = page.keywords || page.tags,
            site_tags = config.keywords || this.theme.head.keywords;

        const parse = (tags) => {
            let result = [];
            if (tags) {
                if (typeof tags === 'string') {
                    result.push(tags);
                } else if (tags.length) {
                    result.push(tags.map(tag => tag.name ? tag.name : tag).filter(tags => !!tags).join(', '));
                }
            }
            return result;
        };

        return [parse(page_tags), parse(site_tags)].filter(tags => tags.length && tags.length !== 0).join(', ');
    });
};
