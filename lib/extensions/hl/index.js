var HL_RENDER_DEFAULT = 'server',
    HL_RENDER = process.env.SHMAKOWIKI_EXT_HL_RENDER || HL_RENDER_DEFAULT;

if (!~['server', 'client', 'no-render'].indexOf(HL_RENDER)) {
    HL_RENDER = HL_RENDER_DEFAULT;
}

var ext = {};
switch (HL_RENDER) {

    case 'server':
        ext = require('./hljs-server');
        break;

    case 'client':
        ext = require('./hljs-client');
        break;

    case 'no-render':
        ext = require('./no-render');
        break;

}

module.exports = ext;
