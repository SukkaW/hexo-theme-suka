/* hexo-generator-search
 * author: PaicHyperionDev
 * license: MIT
 */

module.exports = function (hexo) {
    if (hexo.config.suka_theme.search.enable !== true) {
        return;
    }

    const start_time = +new Date;

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

    const end_time = +new Date;
    console.log(`  * Local Search (Generator) loaded in ${end_time - start_time} ms`)
}