load("ometa-rhino.js");
load('shmakowiki.js');

function getFromFile(fileName) {
    var file = new File(fileName);
    if (!file.exists) return null;
    file.open("read", "text");
    data = file.readAll();
    file.close();
    return data.join('\n');
}

var i = 7,
    noTests = false;

while (!noTests) {
    var testIn = getFromFile('tests/' + i + '.in'),
        testOut = getFromFile('tests/' + i + '.out');

    noTests = !testIn || !testOut;
    if (noTests) break;

    var testRes = W.matchAll(testIn, 'topLevel'),
        isOk = testRes == testOut;

    print('Test in (tests/' + i + '.in): ' + (isOk ? 'ok' : 'FAIL'));
    if (!isOk) {
        print('Test result:\n' + testRes);
        print('Test out (tests/' + i + '.out):\n' + testOut);
    }

    i++;
}
