var HLU = require('./util'),
    U = require('../../utils');

exports.astToBemjson = function(c, p) {

    var lang = HLU.translateAlias(p);

    return {
        block: 'highlight',
        mods: {'render': 'client'},
        lang: lang,
        content: U.htmlEscape(c)
    };

};

exports.astToHtml = function(c, p) {

    var lang = HLU.translateAlias(p);

    return '<pre class="highlight highlight_render_client"><code class="highlight__code ' + lang + '">' +
        U.htmlEscape(c) +
        '</code></pre>';

};
