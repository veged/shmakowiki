exports.main = function () {

    var sys = require('sys'),
        fs = require('fs');

    require('coa').Cmd()
        .name(process.argv[1])
        .title('Shmakowiki command line utility')
        .helpful()
        .opt()
            .name('version')
            .title('Show version')
            .long('version')
            .flag()
            .act(function(opts) {
                this.exit(
                    JSON.parse(require('fs').readFileSync(__dirname + '/../package.json'))
                        .version);
            })
            .end()
        .opt()
            .name('input')
            .title('Input file. Defaults to stdin')
            .short('i')
            .long('input')
            .end()
        .opt()
            .name('output')
            .title('Output file. Defaults to stdout')
            .short('o')
            .long('output')
            .end()
        .opt()
            .name('format')
            .title('Output format: html, bemjson. Defaults to html')
            .short('f')
            .long('format')
            .def('html')
            .val(function(value) {
                // FIXME: don't use private API _usage()
                !value && this.end().errorExit("Missing required option value\n" + this._usage());
                (['html', 'bemjson'].indexOf(value) == -1) && this.end()
                    .errorExit('Wrong output format "' + value + '" specified, must be one of "html" or "bemjson"');
                return value;
            })
            .end()
        .opt()
            .name('verbose')
            .title('Show verbose output')
            .long('verbose')
            .short('v')
            .flag()
            .end()
        .act(function(opts) {
            (opts.input ?
                // if input file
                function(inputFn) {
                    fs.readFile(opts.input, 'utf8', function(err, input){
                        if (err) throw err;
                        inputFn(input);
                    });
                } :
                // if STDIN
                function(inputFn) {
                    var input = '';
                    process.openStdin()
                        .on('data', function(s) { input += s })
                        .on('end', function() { inputFn(input) });
                })(function(input){
                    // remove BOM if present
                    if (input.charCodeAt(0) === 0xFEFF) input = input.slice(1);
                    try {
                        var shmakowiki = require('./shmakowiki'),
                            ast = shmakowiki.ShmakoWiki.matchAll(input, 'topLevel'),
                            result = (opts.format == 'html' ?
                                shmakowiki.ShmakoWikiToHtml.match(ast, 'topLevel') :
                                JSON.stringify(shmakowiki.ShmakoWikiToBemjson.match(ast, 'topLevel'), null, 4)) + '\n';
                        opts.output ?
                            fs.writeFile(opts.output, result, 'utf8', function(err) {
                                    if (err) throw err;
                                    opts.verbose && sys.error('  create : ' + opts.output);
                                }) :
                            process.stdout.write(result);
                    } catch (e) {
                        e.errorPos != undefined &&
                            sys.error(
                                input.slice(0, e.errorPos) +
                                "\n--- Parse error ->" +
                                input.slice(e.errorPos) + '\n');
                        throw e;
                    }
                });
        })
        .parse(process.argv.slice(2));
};
