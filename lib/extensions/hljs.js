var HL = require('highlight.js');

exports.astToBemjson = function(c, p) {

    var lang = translateAlias(p),
        res = p? HL.highlight(lang, c) : HL.highlightAuto(lang);

    return {
        block: 'highlight',
        lang: res.language,
        content: res.value
    };

};

exports.astToHtml = function(c, p) {

    var lang = translateAlias(p),
        res = p? HL.highlight(lang, c) : HL.highlightAuto(lang);

    return '<pre class="highlight"><code class="highlight__code ' + res.language + '">' +
        res.value +
        '</code></pre>';

};

function translateAlias(alias) {

    var lang = alias;

    switch (alias) {

        case 'js':
            lang = 'javascript';
            break;

        case 'patch':
            lang = 'diff';
            break;

        case 'md':
            lang = 'markdown';
            break;

    }

    return lang;

}
