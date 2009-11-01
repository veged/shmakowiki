load("ometa-js/ometa-rhino.js");
load('shmakowiki.txt');
load('shmakowiki2html.txt');

print(ShmakoWikiToHtml.match(
    ShmakoWiki.matchAll(
        read('shmakowiki.wiki').slice(1),
        'topLevel'
    ),
    'topLevel'
));
