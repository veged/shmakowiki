var HL = require('highlight.js');

exports.astToBemjson = function(c, p) {

    var lang = translateAlias(p),
        res = p? HL.highlight(lang, c) : HL.highlightAuto(lang);

    return {
        block: 'b-code',
        lang: lang,
        content: res.value
    };

};

exports.astToHtml = function(c, p) {

    var lang = translateAlias(p),
        res = p? HL.highlight(lang, c) : HL.highlightAuto(lang);

    return '<pre><code class="b-code b-code_lang_'+ lang + ' language-' + lang + '">' +
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
