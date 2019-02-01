// Welcome Message
require('../includes/tasks/welcome');
// Check required dependencies
require('../includes/tasks/check_deps');

// Debug helper
hexo.extend.helper.register('console', function () {
    console.log(arguments)
});
