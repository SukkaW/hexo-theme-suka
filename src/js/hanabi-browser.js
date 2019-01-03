/*!
 * Hexo Theme Suka | hanabi-browser.js
 * Author: SukkaW
 * Link: https://github.com/SukkaW/hexo-theme-suka
 * License: GPL-3.0
 */
; (function () {
    setTimeout(function () {
        var selector = 'pre code';
        var elements = document.querySelectorAll(selector);
        for (var i = 0, el; el = elements[i++];) {
            var code = el.textContent;
            el.innerHTML = hanabi && hanabi(code) || code;
        }
    });
})();