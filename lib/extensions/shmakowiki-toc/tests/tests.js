var tests = [
    {
        'in': '%%toc\n==test1\n==test2%%',
        'out': []
    }
];

var api = require('../../../shmakowiki.js'),
    totalFail = 0;

for (var i = 0; i < tests.length; i++) {
    var test = tests[i];

    test.res = api.shmakowikiToAST(test['in']);

    var res = JSON.stringify(test.res),
        out = JSON.stringify(test.out),
        isOk = res == out;

    console.log('Test in:\n' + test['in'] + '\n: ' + (isOk ? 'ok' : 'FAIL'));
    console.log('Test result:\n' + res);
    if (!isOk) {
        totalFail++;
        console.log('Test out:\n' + out);
    }

    console.log('-----------------------------------------------------');
}
console.log('\n' + (totalFail ? 'Total FAIL: ' + totalFail : 'All Ok'));
