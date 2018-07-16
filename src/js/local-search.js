/*!
 * Hexo Theme Suka | local-search.js
 * Author: SukkaW
 * Link: https://github.com/SukkaW/hexo-theme-suka
 * License: GPL-3.0
 */

// Get search query from URL
String.prototype.queryUrl = function (e) {
    var t = this.replace(/^[^?=]*\?/ig, "").split("#")[0],
        n = {};
    return t.replace(/(^|&)([^&=]+)=([^&]*)/g, function (e, t, r, i) {
        try {
            r = decodeURIComponent(r)
        } catch (s) { }
        try {
            i = decodeURIComponent(i)
        } catch (s) { }
        r in n ? n[r] instanceof Array ? n[r].push(i) : n[r] = [n[r], i] : n[r] = /\[\]$/.test(r) ? [i] : i
    }), e ? n[e] : n
};
var searchQuery = location.search.queryUrl();

var res;
var searchFunc = function (searchFilePath) {
    'use strict';
    fetch(searchFilePath).then(function (res) {
        return res.json();
    }).then(function (datas) {
        var $resultContent = document.getElementById("search-output");
        var $resultNum = document.getElementById("search-result-num");
        var $resultInfo = document.getElementById("search-result-info");
        // Search only when there is a search query
        if (typeof(searchQuery.s) !== "undefined") {
            search(searchQuery.s)
            // Set form value
            document.getElementById('search-field').setAttribute('value', searchQuery.s)
        }
        function search(key) {
            var str = '';
            var keywords = key.trim().toLowerCase().split(/[\s\-]+/);
            var index_num = 0;
            $resultContent.innerHTML = '';
            if (key.trim().length <= 0) {
                return;
            }
            // perform local searching
            datas.forEach(function (data) {
                if (typeof data.title === "undefined") return
                if (typeof data.content === "undefined") return
                var isMatch = true;
                var content_index = [];
                var data_title = data.title.trim().toLowerCase();
                var data_date = new Date(data.date).toLocaleDateString();
                if (typeof data.tags !== "undefined") {
                    var data_tags = data.tags;
                } else {
                    var data_tags = [];
                }
                var data_content = data.content.trim().replace(/<[^>]+>/g, '').toLowerCase();
                var data_url = data.url;
                var index_title = -1;
                var index_tags = -1;
                var index_content = -1;
                var first_occur = -1;
                // only match artiles with not empty titles and contents
                if (data_title !== '' && data_content !== '') {
                    keywords.forEach(function (keyword, i) {
                        index_title = data_title.indexOf(keyword);
                        index_tags = data_tags.indexOf(keyword);
                        index_content = data_content.indexOf(keyword);
                        if (index_title < 0 && index_tags < 0 && index_content < 0) {
                            isMatch = false;
                        } else {
                            if (index_content < 0) {
                                index_content = 0;
                            }
                            if (i === 0) {
                                first_occur = index_content;
                            }
                            index_num = index_num + 1
                        }
                    });
                }

                // show search results
                var position = 1;
                if (isMatch) {
                    str += '<div class="tile"><div class="tile-content">';

                    // highlight keyword in title
                    var match_title = data.title;
                    keywords.forEach(function (keyword) {
                        var regS = new RegExp(keyword, 'gi');
                        match_title = match_title.replace(regS, '<strong><mark>' + key + '</mark></strong>');
                    })
                    str += '<a href="' + data_url + '"><p class="tile-title search-result-title">' + match_title + '</p></a>';
                    str += '<p class="text-gray search-result-summary">'
                    str += '<span class="saerch-result-date">' + data_date + '</span>'
                    var content = data.content;
                    if (first_occur >= 0) {
                        /* cut out characters & highlight keyword in content
                           There were still some bugs when cutting CJK.
                           Need to set max-height and overflow:none to elements contain search result summary
                        */
                        var start = first_occur - 10;
                        var end = first_occur + 10;
                        if (start < 0) {
                            start = 0;
                        }
                        if (start === 0) {
                            end = 10;
                        }
                        if (end > content.length) {
                            end = content.length - 10;
                        }
                        var match_content = content.substr(start, end);
                        keywords.forEach(function (keyword) {
                            var regS = new RegExp(keyword, 'gi');
                            match_content = match_content.replace(regS, '<strong><mark>' + key + '</mark></strong>');
                        })
                        str += match_content + '...</p>';
                    }
                    str += '</div></div>'
                    position++;
                }
            });
            $resultNum.innerHTML = index_num;
            if (index_num <= 0) {
                $resultInfo.style.display = 'none';
                $resultContent.innerHTML = window.searchNoResult;
            } else {
                $resultInfo.style.display = 'block';
                $resultContent.innerHTML = str;
            }
        }
    })
}