/*!
 * Hexo Theme Suka | local-search.js
 * Author: SukkaW
 * Link: https://github.com/SukkaW/hexo-theme-suka
 * License: GPL-3.0
 */
(function () {

    window.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(window.location.search);
        return results == null ? '' : decodeURIComponent(results[1]);
    }

    var searchKeyword = window.getParameterByName('s');

    window.searchEscape = function (keyword) {
        var htmlEntityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#39;',
            '/': '&#x2F;'
        };

        return keyword.replace(/[&<>"'/]/g, function (i) {
            return htmlEntityMap[i];
        });
    }

    window.searchFunc = function (searchFilePath, noResultText) {
        'use strict';

        fetch(searchFilePath).then(function (res) {
            return res.json();
        }).then(function (datas) {
            var $resultContent = document.getElementById('search-output');
            var $resultNum = document.getElementById('search-result-num');
            var $resultInfo = document.getElementById('search-result-info');

            var resultArray = [];

            function search(key) {
                var parseKeywords = function () {
                    var input = key.trim().toLowerCase().split(/[\s\-]+/);
                    var output = [];

                    for (var i in input) {
                        var keyword = input[i];
                        if (keyword.indexOf('+') > -1) {
                            var keys = keyword.split('+');
                            for (var j in keys) {
                                output.push(keys[j]);
                            }
                        } else {
                            output.push(keyword);
                        }
                    }

                    return output;
                }

                var keywords = parseKeywords();
                window.searchKeyword = keywords;

                var index_num = 0;
                $resultContent.innerHTML = '';
                if (key.trim().length <= 0) return;

                // perform local searching
                datas.forEach(function (data) {
                    if (typeof data.title === 'undefined') return;
                    if (typeof data.content === 'undefined') return;
                    var isMatch = true;
                    var data_title = data.title.trim().toLowerCase();
                    var data_date = new Date(data.date).toLocaleDateString();
                    var data_tags = (typeof data.tags !== 'undefined') ? data.tags : [];
                    var data_content = data.content.trim().replace(/<[^>]+>/g, '').toLowerCase();

                    var index_title = -1;
                    var index_tags = -1;
                    var index_content = -1;
                    var first_occur = -1;
                    var data_weight = 0;
                    // only match artiles with not empty titles and contents
                    if (data_title !== '' && data_content !== '') {
                        keywords.forEach(function (keyword, i) {
                            index_title = data_title.indexOf(keyword);
                            index_tags = data_tags.indexOf(keyword);
                            index_content = data_content.indexOf(keyword);
                            if (index_title < 0 && index_tags < 0 && index_content < 0) {
                                isMatch = false;
                            } else {
                                if (index_title >= 0) data_weight = data_weight + 4;
                                if (index_tags >= 0) data_weight = data_weight + 2;
                                if (index_content >= 0) data_weight = data_weight + 1;
                                if (i === 0) first_occur = index_content;
                                index_num++;
                            }
                        });
                    }

                    // show search results
                    if (isMatch) {
                        var str = '';
                        str += '<div class="tile"><div class="tile-content">';

                        // highlight keyword in title
                        var match_title = data.title;
                        keywords.forEach(function (keyword) {
                            var regS = new RegExp(keyword, 'gi');
                            match_title = match_title.replace(regS, '<strong><mark>' + window.searchEscape(keyword) + '</mark></strong>');
                        })
                        str += '<a href="' + data.url + '"><p class="tile-title search-result-title">' + match_title + '</p></a>';
                        str += '<p class="text-gray search-result-summary">';
                        str += '<span class="saerch-result-date">' + data_date + '</span>';
                        var content = data.content;
                        if (first_occur >= 0) {
                            /* cut out characters & highlight keyword in content
                               There were still some bugs when cutting CJK.
                               Need to set max-height and overflow:none to elements contain search result summary
                            */
                            var start = first_occur - 15;
                            var end = first_occur + 20;
                            if (start < 0) start = 0;
                            if (start === 0) end = 20;
                            if (end > content.length) end = content.length - 20;

                            var match_content = content.substr(start, end);
                            keywords.forEach(function (keyword) {
                                var regS = new RegExp(keyword, 'gi');
                                match_content = match_content.replace(regS, '<strong><mark>' + window.searchEscape(key) + '</mark></strong>');
                            })
                            str += match_content + '...</p>';
                        }
                        str += '</div></div>';

                        resultArray.push([str, data_weight]);
                    }
                });
                var resultHTML = (function () {
                    var html = '';
                    resultArray.sort(function (x, y) {
                        return y[1] - x[1];
                    });

                    for (var i in resultArray) {
                        html += resultArray[i][0];
                    }

                    return html;
                })();

                $resultNum.appendChild(document.createTextNode(resultArray.length));
                if (index_num <= 0) {
                    $resultInfo.style.display = 'none';
                    $resultContent.innerHTML = noResultText;
                } else {
                    $resultInfo.style.display = 'block';
                    $resultContent.innerHTML = resultHTML;
                }
            }

            // Search only when there is a search query
            if (typeof (searchKeyword) !== 'undefined') {
                search(searchKeyword);
                // Set form value
                document.getElementById('search-field').setAttribute('value', searchKeyword);
            }
        });
    };
})();