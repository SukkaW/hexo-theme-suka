// Welcome Message
require('../includes/tasks/welcome');
// Check required dependencies
require('../includes/tasks/check_deps');

// Helper
require('../includes/helpers/page')(hexo);
require('../includes/helpers/qrcode')(hexo);

// Generator
require('../includes/generator/search/index')(hexo);

// Debug helper
hexo.extend.helper.register('console', function () {
    console.log(arguments)
});
