// Welcome Message
require('../includes/tasks/welcome');
// Check required dependencies
require('../includes/tasks/check_deps');

const logger = require('hexo-log')();
logger.info('Loading Suka Theme Plugins');

// Helper
require('../includes/helpers/page')(hexo);
require('../includes/helpers/qrcode')(hexo);

// Generator
require('../includes/generator/search')(hexo);

// Debug helper
hexo.extend.helper.register('console', function () {
    console.log(arguments)
});
