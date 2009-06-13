var tests = [
    {
        'in': '**xboldx**',
        'out': '[[para, [[bold, [xboldx]]]]]'
    },
    {
        'in': '**bold******',
        'out': '[[para, [[bold, [bold]], [bold, []]]]]'
    },
    {
        'in': '//italic//',
        'out': '[[para, [[italic, [italic]]]]]'
    },
    {
        'in': '--strike--',
        'out': '[[para, [[strike, [strike]]]]]'
    },
    {
        'in': '**bb//bb**nn**bb//bb**',
        'out': '[[para, [[bold, [bb, [italic_, [bb]]]], nn, [bold, [bb, [italic_, [bb]]]]]]]'
    },
    {
        'in': '~**esc bold**',
        'out': '[[para, [[escaped, *], *esc bold, [bold_, []]]]]'
    },
    {
        'in': '**//bolditalic//**',
        'out': '[[para, [[bold, [[italic, [bolditalic]]]]]]]'
    },
    {
        'in': 'para1**bla**\n//dsds//\n\npara2\npara2\n\npara3',
        'out': '[[para, [para1, [bold, [bla]], \n, [italic, [dsds]]]], [para, [para2\npara2]], [para, [para3]]]'
    },
    {
        'in': '* listitem1\n* listitem2\n  * sublistitem2',
        'out': '[[ulist, [[ulistItem, [listitem1]], [ulistItem, [listitem2, [ulist, [[ulistItem, [sublistitem2]]]]]]]]]'
    },
    {
        'in': '1. listitem1\n2. listitem2\n  1. sublistitem2',
        'out': '[[olist, [[olistItem, [listitem1]], [olistItem, [listitem2, [olist, [[olistItem, [sublistitem2]]]]]]]]]'
    },
    {
        'in': '1. olistitem1\n* ulistitem2',
        'out': '[[olist, [[olistItem, [olistitem1]]]], [ulist, [[ulistItem, [ulistitem2]]]]]'
    },
    {
        'in': '* listitem1\n  * sublistitem1\n    * subsublistitem1',
        'out': '[[ulist, [[ulistItem, [listitem1, [ulist, [[ulistItem, [sublistitem1, [ulist, [[ulistItem, [subsublistitem1]]]]]]]]]]]]]'
    },
    {
        'in': '* listitem1\n  * sublistitem1\n    * subsublistitem1\n  * sublistitem2',
        'out': '[[ulist, [[ulistItem, [listitem1, [ulist, [[ulistItem, [sublistitem1, [ulist, [[ulistItem, [subsublistitem1]]]]]], [ulistItem, [sublistitem2]]]]]]]]]'
    },
    {
        'in': '* listitem1\n  * sublistitem1\n    1. osubsublistitem1\n    * usubsublistitem1\n  * sublistitem2',
        'out': '[[ulist, [[ulistItem, [listitem1, [ulist, [[ulistItem, [sublistitem1, [olist, [[olistItem, [osubsublistitem1]]]], [ulist, [[ulistItem, [usubsublistitem1]]]]]], [ulistItem, [sublistitem2]]]]]]]]]'
    },
    {
        'in': '* listitem1\n  * sublistitem1\n    * subsublistitem1\n  * sublistitem2\n    * subsublistitem2',
        'out': '[[ulist, [[ulistItem, [listitem1, [ulist, [[ulistItem, [sublistitem1, [ulist, [[ulistItem, [subsublistitem1]]]]]], [ulistItem, [sublistitem2, [ulist, [[ulistItem, [subsublistitem2]]]]]]]]]]]]]'
    },
    {
        'in': '* listitem1\n* listitem2\n  * sublistitem21\n* listitem3\n  * sublistitem31\n  * sublistitem32',
        'out': '[[ulist, [[ulistItem, [listitem1]], [ulistItem, [listitem2, [ulist, [[ulistItem, [sublistitem21]]]]]], [ulistItem, [listitem3, [ulist, [[ulistItem, [sublistitem31]], [ulistItem, [sublistitem32]]]]]]]]]'
    },
    {
        'in': 'para1\n* listitem1\n* listitem2\n\npara2',
        'out': '[[para, [para1]], [ulist, [[ulistItem, [listitem1]], [ulistItem, [listitem2]]]], [para, [para2]]]'
    },
    {
        'in': '==header11**bold1**\n\npara2\n===header22\npara2\n====header33==',
        'out': '[[header1, [header11, [bold, [bold1]]]], [para, [para2]], [header2, [header22]], [para, [para2]], [header3, [header33]]]'
    },
    {
        'in': '==**xbold1**\n\n**para2**\n===**header22**\n**para2**\n====**header33**==',
        'out': '[[header1, [[bold, [xbold1]]]], [para, [[bold, [para2]]]], [header2, [[bold, [header22]]]], [para, [[bold, [para2]]]], [header3, [[bold, [header33]]]]]'
    },
    {
        'in': '* listitem **bold**\n* listitem //italic//\n* listitem **bo//italic_**',
        'out': '[[ulist, [[ulistItem, [listitem , [bold, [bold]]]], [ulistItem, [listitem , [italic, [italic]]]], [ulistItem, [listitem , [bold, [bo, [italic_, [italic_]]]]]]]]]'
    },
    {
        'in': '~**xb~ol -- dx**',
        'out': '[[para, [[escaped, *], *xb, [escaped, o], l – dx, [bold_, []]]]]'
    },
];

load("ometa-rhino.js");
load('shmakowiki.txt');
load('shmakowiki2html.txt');

for (var i = 0; i < tests.length; i++) {
    var test = tests[i];

    test.res = ShmakoWiki.matchAll(test['in'], 'topLevel');
    var isOk = test.res == test.out;

    print('Test in:\n' + test['in'] + '\n: ' + (isOk ? 'ok' : 'FAIL'));
    print('Test result:\n' + test.res);
    if (!isOk) {
        print('Test out:\n' + test.out);
    }

    test.html = ShmakoWikiToHtml.match(test.res, 'topLevel');
    print('Test html:\n' + test.html);

    print('-----------------------------------------------------');
}
