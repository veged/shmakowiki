var shmakowikitoc = require('./_shmakowikitoc.js');

exports.transform = function(ast) {
    return shmakowikitoc.ShmakoWikiToc.transform(ast);
};

exports.match = function(ast, level) {
    return shmakowikitoc.ShmakoWikiToc.match(ast, level);
};