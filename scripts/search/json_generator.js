const ejs = require('ejs');
const pathFn = require('path');
const fs = require('fs');
const stringify = require('json-stringify-safe');

const searchTmplSrc = pathFn.join(__dirname, '../../layout/_plugin/search/local-search/search-json.ejs');
const searchTmpl = ejs.compile(fs.readFileSync(searchTmplSrc, 'utf8'));

module.exports = function (locals) {
    const config = this.config;
    const searchConfig = config.suka_theme.search;
    const template = searchTmpl;
    let searchfield = searchConfig.field;

    let posts,
        pages;

    if (searchfield.trim() !== '') {
        searchfield = searchfield.trim();
        if (searchfield === 'post') {
            posts = locals.posts.sort('-date');
        } else if (searchfield === 'page') {
            pages = locals.pages;
        } else {
            posts = locals.posts.sort('-date');
            pages = locals.pages;
        }
    } else {
        posts = locals.posts.sort('-date');
    }

    let json = template({
        config,
        posts,
        pages,
        stringify,
        feed_url: config.root + searchConfig.path,
    });

    return {
        path: searchConfig.path,
        data: json
    };
};