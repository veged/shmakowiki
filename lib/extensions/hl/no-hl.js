var U = require('../../utils');

exports.astToBemjson = function(c, p) {

    return {
        tag: 'pre',
        content: {
            tag: 'code',
            cls: p,
            content: U.htmlEscape(c)
        }
    };

};

exports.astToHtml = function(c, p) {

    return '<pre><code class="' + p + '">' +
        U.htmlEscape(c) +
        '</code></pre>';

};
