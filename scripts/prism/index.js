/* hexo-prism-plugin
 * author: ele828
 * license: MIT
 * patched by SukkaW for hexo-theme-suka
 */

'use strict';

const Prism = require('node-prismjs');

const map = {
    '&#39;': '\'',
    '&amp;': '&',
    '&gt;': '>',
    '&lt;': '<',
    '&quot;': '"'
};

const regex = /<pre><code class="(.*)?">([\s\S]*?)<\/code><\/pre>/igm;
const captionRegex = /<p><code>(?![\s\S]*<code)(.*?)\s(.*?)\n([\s\S]*)<\/code><\/p>/igm;

// Plugin settings
var config = hexo.config.suka_theme.prism;

const line_number = config.line_number || true;

/**
 * Unescape from Marked escape
 * @param {String} str
 * @return {String}
 */
function unescape(str) {
    if (!str || str === null) return '';
    const re = new RegExp('(' + Object.keys(map).join('|') + ')', 'g');
    return String(str).replace(re, (match) => map[match]);
}

/**
 * Code transform for prism plugin.
 * @param {Object} data
 * @return {Object}
 */
function PrismPlugin(data) {
    // Patch for caption support
    if (captionRegex.test(data.content)) {
        // Attempt to parse the code
        data.content = data.content.replace(captionRegex, (origin, lang, caption, code) => {
            if (!lang || !caption || !code) return origin;
            return `<figcaption>${caption}</figcaption><pre><code class="${lang}">${code}</code></pre>`;
        })
    }

    data.content = data.content.replace(regex, (origin, lang, code) => {
        const lineNumbers = line_number ? 'line-numbers' : '';
        const startTag = `<pre class="${lineNumbers} highlight language-${lang}"><code class="language-${lang}">`;
        const endTag = `</code></pre>`;
        code = unescape(code);
        let parsedCode = '';
        if (Prism.languages[lang]) {
            parsedCode = Prism.highlight(code, Prism.languages[lang]);
        } else {
            parsedCode = code;
        }
        if (line_number) {
            const match = parsedCode.match(/\n(?!$)/g);
            const linesNum = match ? match.length + 1 : 1;
            let lines = new Array(linesNum + 1);
            lines = lines.join('<span></span>');
            const startLine = '<span aria-hidden="true" class="line-numbers-rows">';
            const endLine = '</span>';
            parsedCode += startLine + lines + endLine;
        }
        return startTag + parsedCode + endTag;
    });

    return data;
}

// Register prism plugin
if (config.enable === true) {
    hexo.extend.filter.register('after_post_render', PrismPlugin);
}
