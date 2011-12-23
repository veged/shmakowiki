var shmakowikitoc = require('./_shmakowikitoc.js');

exports.transform = function(ast) {
    console.log(ast[0]);
    return shmakowikitoc.ShmakoWikiToc.match(ast, 'topLevel');
};