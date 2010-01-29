var file = require('file'),
    parser = exports.parser = new (require('args').Parser)();

parser.option('-i', '--input', 'input')
    .help('specifies filename to read the input source, if omit use STDIN')
    .def(system.stdin)
    .input();

parser.option('-o', '--output', 'output')
    .help('specifies filename to write the output, if omit use STDOUT')
    .def(system.stdout)
    .output();

parser.helpful();

exports.main = function () {
    var options = parser.parse(system.args),
        input = options.input.read();

    if (input.charCodeAt(0) == 65279) input = input.slice(1);

    var m = require('../shmakowiki'),
        result = m.ShmakoWikiToHtml.match(
            m.ShmakoWiki.matchAll(input, 'topLevel'),
            'topLevel'
        ) + '\n';

    options.output.write(result);
};
