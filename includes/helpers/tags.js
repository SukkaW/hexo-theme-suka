module.exports = function (hexo) {
    hexo.extend.helper.register('_meta_generator', () => `<meta name="generator" content="Hexo ${hexo.version}">`);
};