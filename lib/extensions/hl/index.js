var HL_DEFAULT = 'no-render',
    HL = process.env.SHMAKOWIKI_HL || HL_DEFAULT;

if (!~['server', 'client', 'ohl', 'no-render'].indexOf(HL)) {
    HL = HL_DEFAULT;
}

var ext;
switch (HL) {

    case 'server':
        ext = require('./hljs-server');
        break;

    case 'client':
        ext = require('./hljs-client');
        break;

    case 'ohl':
        ext = require('./ohl');
        break;

    case 'no-render':
        ext = require('./no-render');
        break;

}

module.exports = ext;
