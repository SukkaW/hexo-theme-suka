hexo.extend.helper.register('suka_tags', function () {
    let sukaTags;
    if (this.theme.head.keywords) {
        sukaTags = this.theme.head.keywords;
    } else {
        sukaTags = '';
    }

    if (this.page.tags && this.page.tags.length) {
        this.page.tags.forEach((tag, index) => {
            sukaTags += ', ' + tag.name;
        });
    }

    if (sukaTags) {
        return sukaTags;
    } else {
        return '';
    }
});

hexo.extend.helper.register('suka_full_url_for', function (url) {
    let relative = url.indexOf('http') == -1;
    if (relative === true) {
        return this.config.url + this.url_for(url).replace(this.config.root, '/');
    } else {
        return url;
    }
});

hexo.extend.helper.register('suka_icon', function () {
    let sukaStdIcon = 'https://theme-suka.skk.moe/demo/img/suka-favicon.png';
    const suka_icon_url = (type) => this.config.url + this.url_for(this.theme.head.favicon[type]).replace(this.config.root, '/');

    if (this.theme.head.favicon.large) {
        sukaStdIcon = suka_icon_url('large');
    } else if (this.theme.head.favicon.apple_touch_icon) {
        sukaStdIcon = suka_icon_url('apple_touch_icon');
    } else if (this.theme.head.favicon.medium) {
        sukaStdIcon = suka_icon_url('medium');
    } else if (this.theme.head.favicon.small) {
        sukaStdIcon = suka_icon_url('small');
    } else if (this.theme.head.favicon.ico) {
        sukaStdIcon = suka_icon_url('ico');
    }

    return sukaStdIcon;
});
