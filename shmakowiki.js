load("ometa-rhino.js");

function ometaFile(fileName) {
    var file = new File(fileName);
    file.open("read", "text");
    data = file.readAll();
    return ometa(data.join(''));
};

ometaFile('shmakowiki.txt');

if (arguments[0]) print(W.matchAll(arguments[0], 'topLevel'));

