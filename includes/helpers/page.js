/**
  * Generate title string based on page type
  * @example
  *     <%- page_title(page) %>
  */
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

        return [title, hexo.config.title].filter((str) => {
            return typeof (str) !== 'undefined' && str.trim() !== '';
        }).join(' | ');
    });

    hexo.extend.helper.register('page_descr', function (page = null) {
        page = (page === null) ? this.page : page;

        let description = (hexo.config.description) ? hexo.config.description : '';
    
        if (page.description) {
            description = page.description;
        } else if (page.excerpt) {
            description = this.strip_html(page.excerpt).replace(/^s*/, '').replace(/s*$/, '');
        } else if (page.content) {
            description = this.strip_html(this.truncate(page.content, { length: hexo.theme.config.post.entry_excerpt }));
        }

        return description;
    });
};
