// Welcome Message
require('../includes/tasks/welcome');


// Debug helper
hexo.extend.helper.register('console', function () {
    console.log(arguments)
});
