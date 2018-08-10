var ejs = require('ejs');
var pathFn = require('path');
var fs = require('fs');
var stringify = require('json-stringify-safe');

var searchTmplSrc = pathFn.join(__dirname, '../../layout/_plugin/search/local-search/search-json.ejs');
var searchTmpl = ejs.compile(fs.readFileSync(searchTmplSrc, 'utf8'));

module.exports = function (locals) {
    var config = this.config;
    var searchConfig = config.suka_theme.search;
    var template = searchTmpl;
    var searchfield = searchConfig.field;

    var posts, pages;

    if (searchfield.trim() != '') {
        searchfield = searchfield.trim();
        if (searchfield == 'post') {
            posts = locals.posts.sort('-date');
        } else if (searchfield == 'page') {
            pages = locals.pages;
        } else {
            posts = locals.posts.sort('-date');
            pages = locals.pages;
        }
    } else {
        posts = locals.posts.sort('-date');
    }

    var json = template({
        config: config,
        posts: posts,
        pages: pages,
        stringify: stringify,
        feed_url: config.root + searchConfig.path,
    });

    return {
        path: searchConfig.path,
        data: json
    };
};