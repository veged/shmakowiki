var file = require('file'),
    parser = exports.parser = new (require('args').Parser)();

parser.option('-i', '--input', 'inputFile')
    .help('specifies filename to read the input source, if omit use STDIN')
    .set();

parser.option('-o', '--output', 'outFile')
    .help('specifies filename to write the output, if omit use STDOUT')
    .set();

parser.helpful();

exports.main = function () {
    var options = parser.parse(system.args),
        input = options.inputFile ? file.read(options.inputFile) : system.stdin.read();

    if (input.charCodeAt(0) == 65279) input = input.slice(1);

    var m = require('shmakowiki'),
        result = m.ShmakoWikiToHtml.match(
            m.ShmakoWiki.matchAll(input, 'topLevel'),
            'topLevel'
        ) + '\n';

    options.outFile ? file.write(options.outFile, result) : system.stdout.write(result);
};
