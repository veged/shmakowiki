var utils = require('../utils');

exports.astToBemjson = function(c, p) {
    return {
        block: 'b-code',
        cls: p,
        content: utils.htmlEscape(c)
    };
};

exports.astToHtml = function(c, p) {
    return '<pre><code class="'+ p + '">' +
        utils.htmlEscape(c) +
        '</code></pre>';
};
