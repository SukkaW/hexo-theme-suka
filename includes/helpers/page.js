/**
  * Generate title string based on page type
  * @example
  *     <%- page_title(page) %>
  *     <%- page_descr(page) %>
  */

module.exports = function (hexo) {
    const { stripHTML } = require('hexo-util');

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

        return [title, hexo.config.title].filter((str) => {
            return typeof (str) !== 'undefined' && str.trim() !== '';
        }).join(' | ');
    });

    hexo.extend.helper.register('page_descr', function (page = null) {
        page = (page === null) ? this.page : page;

        let description = hexo.config.description || page.description || page.excerpt || page.content;

        description = stripHTML(description).trim() // Remove prefixing/trailing spaces
            .replace(/^s*/, '').replace(/s*$/, '')
            .substring(0, 200)
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
            .replace(/\n/g, ' '); // Replace new lines by spaces

        return description;
    });
};
