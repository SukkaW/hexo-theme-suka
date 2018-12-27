const qrImage = require('qr-image')

hexo.extend.helper.register('qrcode', (url, option) => {
    option = Object.assign(
        {
            size: 6,
            margin: 0
        },
        option || {}
    )

    url = url.replace('index.html', '');

    const buffer = qrImage.imageSync(url, {
        type: 'png',
        size: option.size,
        margin: option.margin
    })
    return `data:image/png;base64,${buffer.toString('base64')}`
})