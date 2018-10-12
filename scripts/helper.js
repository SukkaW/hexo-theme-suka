hexo.extend.helper.register('suka_title', function () {
    var suka_title = this.page.title;
    if (this.is_archive()) {
        suka_title = this.__('archive');
        if (this.is_month()) {
            suka_title += ': ' + this.page.year + '-' + this.page.month;
        }
        else if (this.is_year()) {
            suka_title += ': ' + this.page.year;
        }
    }
    else if (this.is_category()) {
        suka_title = this.__('category') + ': ' + this.page.category;
    }
    else if (this.is_tag()) {
        suka_title = this.__('tag') + ': ' + this.page.tag;
    }

    if (suka_title) {
        return suka_title + ' | ';
    } else {
        return '';
    }
});

hexo.extend.helper.register('suka_descr', function () {
    if (this.config.description) {
        var suka_descr = this.config.description;
    } else {
        var suka_descr = '';
    }

    if (this.page.description) {
        suka_descr = this.page.description;
    } else if (this.page.excerpt) {
        suka_descr = this.strip_html(this.page.excerpt).replace(/^s*/, '').replace(/s*$/, '');
    } else if (this.page.content) {
        suka_descr = this.strip_html(this.truncate(this.page.content, { length: this.theme.post.entry_excerpt }))
    }

    if (suka_descr) {
        return suka_descr;
    } else {
        return '';
    }
});

hexo.extend.helper.register('suka_tags', function () {
    if (this.theme.head.keywords) {
        var suka_tags = this.theme.head.keywords;
    } else {
        var suka_tags = '';
    }

    if (this.page.tags && this.page.tags.length) {
        this.page.tags.forEach(function (tag, index) {
            suka_tags += ', ' + tag.name;
        });
    }

    if (suka_tags) {
        return suka_tags;
    } else {
        return '';
    }
});

hexo.extend.helper.register('suka_full_url_for', function (url) {
    var relative = url.indexOf('http') == -1;
    if (relative === true) {
        return this.config.url + this.url_for(url).replace(this.config.root, '/');
    } else {
        return url;
    }
});

hexo.extend.helper.register('suka_icon', function () {
    var suka_std_icon = 'https://theme-suka.skk.moe/demo/img/suka-favicon.png';
    if (this.theme.head.favicon.large) {
        suka_std_icon = this.config.url + this.url_for(this.theme.head.favicon.large).replace(this.config.root, '/');
    } else if (this.theme.head.favicon.apple_touch_icon) {
        suka_std_icon = this.config.url + this.url_for(this.theme.head.favicon.apple_touch_icon).replace(this.config.root, '/');
    } else if (this.theme.head.favicon.medium) {
        suka_std_icon = this.config.url + this.url_for(this.theme.head.favicon.medium).replace(this.config.root, '/');
    } else if (this.theme.head.favicon.small) {
        suka_std_icon = this.config.url + this.url_for(this.theme.head.favicon.small).replace(this.config.root, '/');
    } else if (this.theme.head.favicon.ico) {
        suka_std_icon = this.config.url + this.url_for(this.theme.head.favicon.ico).replace(this.config.root, '/');
    }

    return suka_std_icon;
});
