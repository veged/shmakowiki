exports.main = function() {

    var sys = require('sys'),
        fs = require('fs'),
        args = process.argv.slice(2),
        arg,
        options = {};

    while(args.length) {
        arg = args.shift();
        switch (arg) {
            case '-h':
            case '--help':
                sys.puts([
                    'Usage: shmakowiki2html [options]',
                    '',
                    'Options:',
                    '  -i, --input : pecifies filename to read the input source, if omit use STDIN',
                    '  -o, --output : specifies filename to write the output, if omit use STDOUT',
                    '  -v, --verbose : verbose output to STDERR',
                    '  -h, --help : Output help information'
                ].join('\n'));
                process.exit(1);
                break;
            case '-i':
            case '--input':
                options.input = args.shift();
                break;
            case '-o':
            case '--output':
                options.output = args.shift();
                break;
           case '-v':
           case '--verbose':
               options.verbose = true;
               break;
        }
    }

    (options.input ?
        // if input file
        function(inputFn) {
            fs.readFile(options.input, 'utf8', function(err, input){
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
            if (input.charCodeAt(0) == 65279) input = input.slice(1);
            try {
                var shmakowiki = require('shmakowiki'),
                    result = shmakowiki.ShmakoWikiToHtml.match(
                        shmakowiki.ShmakoWiki.matchAll(input, 'topLevel'),
                        'topLevel'
                    ) + '\n';
                options.output ?
                    fs.writeFile(options.output, result, 'utf8', function(err) {
                            if (err) throw err;
                            if (options.verbose) sys.error('  create : ' + options.output);
                        }) :
                    process.stdout.write(result);
            } catch (e) {
                e.errorPos != undefined &&
                    sys.error(
                        input.slice(0, e.errorPos) +
                        "\n--- Parse error ->" +
                        input.slice(e.errorPos) + '\n');
                throw e
            }
        });

};
