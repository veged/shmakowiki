load("ometa-rhino.js");

function ometaFile(fileName) {
    var file = new File(fileName);
    file.open("read", "text");
    data = file.readAll();
    return ometa(data.join(''));
};

ometaFile('wackowiki.txt');

print(W.matchAll(arguments[0], 'topLevel'));

