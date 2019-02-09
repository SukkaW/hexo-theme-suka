/**
  * Generate title string based on page type
  * @example
  *     <%- page_title(page) %>
  */
module.exports = function (hexo) {
    hexo.extend.helper.register('page_title', function (page = null) {
        page = (page === null) ? this.page : page;

        let title = this.page.title;

        if (this.is_archive()) {
            title = this.__('archive');
            if (this.is_month()) {
                title += `: ${page.year}-${page.month}`;
            } else if (this.is_year()) {
                title += `: ${page.year}`;
            }
        } else if (this.is_category()) {
            title = `${this.__('category')}: ${this.page.category}`;
        } else if (this.is_tag()) {
            title = `${this.__('tag')}: ${this.page.tag}`;
        }

        if (title) {
            return `${title} | ${hexo.config.title}`;
        } else {
            return hexo.config.title;
        }
    });
}
