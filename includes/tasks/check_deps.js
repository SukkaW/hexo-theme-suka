const logger = require('hexo-log')();

function checkDep(name) {
    try {
        require.resolve(name);
        return true;
    } catch(e) {
        logger.error(`Package ${name} is not installed.`)
    }
    return false;
}

logger.info('Checking dependencies');

const missingDeps = [
    'json-stringify-safe',
    'node-prismjs',
    'prismjs',
    'qr-image'
].map(checkDep).some(installed => !installed);

if (missingDeps) {
    logger.error('Please install the missing dependencies.');
    logger.error('You can enter suka-theme directory and run following commands:');
    logger.error('$ npm i --production');
    logger.error('$ yarn --production # If you prefer yarn.');
    process.exit(-1);
}