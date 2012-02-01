exports.main = function () {

    var util = require('util'),
        q = require('q');

    require('coa').Cmd()
        .name(process.argv[1])
        .title('Shmakowiki command line utility')
        .helpful()
        .opt()
            .name('version')
            .title('Show version')
            .long('version')
            .flag()
            .only()
            .act(function(opts) {
                return JSON.parse(require('fs').readFileSync(__dirname + '/../package.json'))
                    .version;
            })
            .end()
        .opt()
            .name('input')
            .title('Input file. Defaults to stdin')
            .short('i')
            .long('input')
            .input()
            .end()
        .opt()
            .name('output')
            .title('Output file. Defaults to stdout')
            .short('o')
            .long('output')
            .output()
            .end()
        .opt()
            .name('format')
            .title('Output format: html, bemjson. Defaults to html')
            .short('f')
            .long('format')
            .def('html')
            .val(function(value) {
                // FIXME: don't use private API _usage()
                if (!value) {
                    return this.reject("Missing required option value\n" + this._usage());
                }
                if (['html', 'bemjson'].indexOf(value) == -1) {
                    return this.reject('Wrong output format "' + value + '" specified, must be one of "html" or "bemjson"');
                }
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
            var deferred = q.defer();

            readStream(opts.input, function(err, input) {
                if (err) throw err;

                // remove BOM if present
                if (input.charCodeAt(0) === 0xFEFF) input = input.slice(1);

                try {
                    var shmakowiki = require('./shmakowiki'),
                        result = (opts.format == 'html' ?
                            shmakowiki.shmakowikiToHtml(input) :
                            JSON.stringify(shmakowiki.shmakowikiToBemjson(input), null, 4)) + '\n';
                    opts.output.write(result);
                    if (opts.output != process.stdout) opts.output.end();
                    opts.verbose && util.error('  create : ' + opts.output);
                } catch (e) {
                    e.errorPos != undefined &&
                        util.error(
                            input.slice(0, e.errorPos) +
                            "\n--- Parse error ->" +
                            input.slice(e.errorPos) + '\n');
                    deferred.reject(e);
                    return;
                }

                deferred.resolve();
            });
            opts.input.resume();

            return deferred.promise;
        })
        .run();
};

function readStream(stream, callback) {
    var data = '';
    stream
        .on('data', function(chunk) {
            data += chunk;
        })
        .on('error', function(err) {
            callback(err);
        })
        .on('end', function() {
            callback(null, data);
        });
}
