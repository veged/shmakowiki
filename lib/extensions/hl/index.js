var HL_DEFAULT = 'no-hl',
    HL = process.env.SHMAKOWIKI_HL || HL_DEFAULT;

if (!~['server', 'client', 'ohl', 'no-hl'].indexOf(HL)) {
    HL = HL_DEFAULT;
}

var ext;
switch (HL) {

    case 'server':
    case 'client':
        ext = require('./hljs-' + HL);
        break;

    case 'ohl':
    case 'no-hl':
        ext = require('./' + HL);
        break;

}

module.exports = ext;
