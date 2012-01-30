var shmakowiki = require('./_shmakowiki.js'),
    ShmakoWiki = shmakowiki.ShmakoWiki,
    ShmakoWikiToBemjson = shmakowiki.ShmakoWikiToBemjson,
    ShmakoWikiToHtml = shmakowiki.ShmakoWikiToHtml,
    ShmakoWikiToPlain = shmakowiki.ShmakoWikiToPlain,
    ShmakoWikiToc = require('./extensions/shmakowiki-toc/lib/shmakowikitoc.js');

var shmakowikiToAST = exports.shmakowikiToAST = function(text, level) {
    return postprocessAST(ShmakoWiki.matchAll(text, level || "topLevel"), level);
};

var shmakowikiToBemjson = exports.shmakowikiToBemjson = function(text, level) {
    return astToBemjson(shmakowikiToAST(text, level), level);
};

var shmakowikiToHtml = exports.shmakowikiToHtml = function(text, level) {
    return astToHtml(shmakowikiToAST(text, level), level);
};

var shmakowikiToPlain = exports.shmakowikiToPlain = function(text, level) {
    return astToPlain(shmakowikiToAST(text, level), level);
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

var postprocessAST = function(ast, level) {
    return ShmakoWikiToc.match(ast, level || 'topLevel');
};