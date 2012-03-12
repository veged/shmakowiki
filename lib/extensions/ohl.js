var ohl = require('ometa-highlighter'),
    OmetaHighlighter = ohl.OmetaHighlighter,
    OmetaHighlighterToHtml = ohl.OmetaHighlighterToHtml,
    OmetaHighlighterToBemjson = ohl.OmetaHighlighterToBemjson;

exports.shmakowikiToAst = function(c, p) {
    return OmetaHighlighter.matchAll(c, p);
};

exports.astToBemjson = function(c, p) {
    return OmetaHighlighterToBemjson.match(c, 'topLevel');
};

exports.astToHtml = function(c, p) {
    return OmetaHighlighterToHtml.match(c, 'topLevel');
};
