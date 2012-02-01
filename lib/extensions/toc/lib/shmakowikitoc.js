var shmakowiki = require('../../../shmakowiki'),
    toc = require('./_shmakowikitoc.js');

exports.shmakowikiToAst = function(c, p) {
    return shmakowiki.ShmakoWiki.matchAll(c, 'topLevel');
};

exports.astToBemjson = function(c, p) {
    return [
        {
            block: 'b-wiki',
            elem: 'toc',
            content: shmakowiki.astToBemjson([c[1]], 'topInline').content
        },
        shmakowiki.astToBemjson(c[2], 'topInline')
    ];
};

exports.astToHtml = function(c, p) {
    return shmakowiki.astToHtml([c[1]], 'topInline') + shmakowiki.astToHtml(c[2], 'topInline');
};

exports.transformAst = function(ast, p) {
    if (ast[0] === true) {
        return ast;
    }
    var x = toc.ShmakoWikiToc.transform(ast, p);
    return [true, x.toc, shmakowiki.transformAst(x.ast)];
};
