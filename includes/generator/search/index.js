/* hexo-generator-search
 * author: PaicHyperionDev
 * license: MIT
 */

module.exports = function (hexo) {
    if (hexo.config.suka_theme.search.enable !== true) {
        return;
    }

    const pathFn = require('path');

    let config = hexo.config.suka_theme.search

    // Set default search path
    if (!config.path) {
        config.path = 'search.json';
    }

    // Add extension name if don't have
    if (!pathFn.extname(config.path)) {
        config.path += '.json';
    }

    if (pathFn.extname(config.path) == '.json') {
        hexo.extend.generator.register('json', require('./json_generator'));
    }
}