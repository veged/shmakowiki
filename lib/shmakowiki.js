var shmakowiki = require('./_shmakowiki.js'),
    ShmakoWikiToBemjson = exports.ShmakoWikiToBemjson = shmakowiki.ShmakoWikiToBemjson,
    ShmakoWikiToHtml = exports.ShmakoWikiToHtml = shmakowiki.ShmakoWikiToHtml,
    ShmakoWikiToPlain = exports.ShmakoWikiToPlain = shmakowiki.ShmakoWikiToPlain,
    ShmakoWiki = exports.ShmakoWiki = shmakowiki.ShmakoWiki,
    Transform = exports.Transform = shmakowiki.Transform;

var shmakowikiToAst = exports.shmakowikiToAst = function(text, level1, level2) {
    return transformAst(ShmakoWiki.matchAll(text, level1 || 'topLevel'), level2);
};

var astToBemjson = exports.astToBemjson = function(ast, level) {
    return ShmakoWikiToBemjson.match(ast, level || 'topLevel');
};

var astToHtml = exports.astToHtml = function(ast, level) {
    return ShmakoWikiToHtml.match(ast, level || 'topLevel');
};

var astToPlain = exports.astToPlain = function(ast, level) {
    return ShmakoWikiToPlain.match(ast, level || 'topLevel');
};

var transformAst = exports.transformAst = function(ast, level) {
    return Transform.match(ast, level || 'topLevel');
};

exports.shmakowikiToBemjson = function(text, level1, level2) {
    return astToBemjson(shmakowikiToAst(text, level1), level2);
};

exports.shmakowikiToHtml = function(text, level1, level2) {
    return astToHtml(shmakowikiToAst(text, level1), level2);
};

exports.shmakowikiToPlain = function(text, level1, level2) {
    return astToPlain(shmakowikiToAst(text, level1), level2);
};
