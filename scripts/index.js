// Welcome Message
require('../includes/tasks/welcome');
// Check required dependencies
require('../includes/tasks/check_deps');

// Page Helper
require('../includes/helpers/page')(hexo);

// Debug helper
hexo.extend.helper.register('console', function () {
    console.log(arguments)
});
