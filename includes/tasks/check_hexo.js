const logger = require('hexo-log')();

module.exports = function (hexo) {
    if (hexo.version.startsWith('3')) {
        logger.error('Please update Hexo to v4.0.0 or greater!');
        logger.error('You can run following commands at your site directory:');
        logger.error('$ npm i hexo@4');
        logger.error('$ yarn add hexo@4 # If you prefer yarn.');
        process.exit(-1);
    }
}
