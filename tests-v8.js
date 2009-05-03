var tests = [
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
        'out': '[[list, [[listItem, [listitem1]], [listItem, [listitem2, [list, [[listItem, [sublistitem2]]]]]]]]]'
    },
    {
        'in': '* listitem1\n  * sublistitem1\n    * subsublistitem1',
        'out': '[[list, [[listItem, [listitem1, [list, [[listItem, [sublistitem1, [list, [[listItem, [subsublistitem1]]]]]]]]]]]]]'
    },
    {
        'in': '* listitem1\n* listitem2\n  * sublistitem21\n* listitem3\n  * sublistitem31\n  * sublistitem32',
        'out': '[[list, [[listItem, [listitem1]], [listItem, [listitem2, [list, [[listItem, [sublistitem21]]]]]], [listItem, [listitem3, [list, [[listItem, [sublistitem31]], [listItem, [sublistitem32]]]]]]]]]'
    },
    {
        'in': 'para1\n* listitem1\n* listitem2\n\npara2',
        'out': '[[para, [para1]], [list, [[listItem, [listitem1]], [listItem, [listitem2]]]], [para, [para2]]]'
    },
    {
        'in': '* listitem **bold**\n* listitem //italic//\n* listitem **bo//italic_**',
        'out': '[[list, [[listItem, [listitem , [bold, [bold]]]], [listItem, [listitem , [italic, [italic]]]], [listItem, [listitem , [bold, [bo, [italic_, [italic_]]]]]]]]]'
    }
];

load("ometa-rhino.js");
load('shmakowiki.txt');

for (var i = 0; i < tests.length; i++) {
    var test = tests[i];

    var testRes = W.matchAll(test['in'], 'topLevel'),
        isOk = testRes == test.out;

    print('Test in:\n' + test['in'] + '\n: ' + (isOk ? 'ok' : 'FAIL'));
    if (!isOk) {
        print('Test result:\n' + testRes);
        print('Test out:\n' + test.out);
    }
    print('-----------------------------------------------------');
}
