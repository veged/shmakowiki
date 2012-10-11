var HL = require('highlight.js'),
    U = require('./util');

exports.astToBemjson = function(c, p) {

    var lang = U.translateAlias(p),
        res = p? HL.highlight(lang, c) : HL.highlightAuto(c);

    return {
        block: 'highlight',
        lang: res.language,
        content: res.value
    };

};

exports.astToHtml = function(c, p) {

    var lang = U.translateAlias(p),
        res = p? HL.highlight(lang, c) : HL.highlightAuto(c);

    return '<pre class="highlight"><code class="highlight__code ' + res.language + '">' +
        res.value +
        '</code></pre>';

};
