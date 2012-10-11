var U = require('./util');

exports.astToBemjson = function(c, p) {

    var lang = U.translateAlias(p);

    return {
        block: 'highlight',
        mods: {'render': 'client'},
        lang: lang,
        content: c
    };

};

exports.astToHtml = function(c, p) {

    var lang = U.translateAlias(p);

    return '<pre class="highlight highlight_render_client"><code class="highlight__code ' + lang + '">' +
        c +
        '</code></pre>';

};
