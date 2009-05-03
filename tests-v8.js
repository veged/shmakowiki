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
        'in': '* listitem1\n* listitem2',
        'out': '[[list, [[listItem, [listitem1]], [listItem, [listitem2]]]]]'
    },
    {
        'in': 'para1\n* listitem1\n* listitem2\n\npara2',
        'out': '[[para, [para1]], [list, [[listItem, [listitem1]], [listItem, [listitem2]]]], [para, [para2]]]'
    },
    {
        'in': '* list **bold**\n* list //italic//\n* list **bo//italic_**',
        'out': '[[list, [[listItem, [list , [bold, [bold]]]], [listItem, [list , [italic, [italic]]]], [listItem, [list , [bold, [bo, [italic_, [italic_]]]]]]]]]'
    }
];

load("ometa-rhino.js");
load('shmakowiki.txt');

for (var i = 0; i < tests.length; i++) {
    var test = tests[i];

    var testRes = W.matchAll(test['in'], 'topLevel'),
        isOk = testRes == test.out;

    print('Test in "' + test['in'] + '": ' + (isOk ? 'ok' : 'FAIL'));
    if (!isOk) {
        print('Test result:\n' + testRes);
        print('Test out:\n' + test.out);
    }
}
