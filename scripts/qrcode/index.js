const qrImage = require('qr-image')

hexo.extend.helper.register('qrcode', (url, option) => {
    const qrConfig = Object.assign(
        {
            size: 6,
            margin: 0
        },
        option || {}
    );

    const qrUrl = url.replace('index.html', '');

    const buffer = qrImage.imageSync(
        qrUrl,
        {
            type: 'png',
            size: qrConfig.size,
            margin: qrConfig.margin
        }
    );
    return `data:image/png;base64,${buffer.toString('base64')}`
})