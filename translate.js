if (!load && include && system.getcwd)
    var load = function(f) { return include(system.getcwd() + '/' + f) };
if (!print && system.stdout)
    var print = function(d) { return system.stdout(d + '\n') };


(function(){

var GetOpt = require('getopt').GetOpt;
var o = new GetOpt();

o.add('', 'Input file', '', false, false, GetOpt.REQUIRED_ARGUMENT);
o.add('help', 'Print help message', false, 'h', 'help');
o.add('output', 'Output file', '', 'o', 'output', GetOpt.REQUIRED_ARGUMENT);

function help() {
    system.stdout('Usage: ./translate.js [options] input file\n\n');
    system.stdout(o.help());
}

try {
    var args = [];
    for (var i = 1, l = system.args.length; i < l; i++) { args.push(system.args[i]) }
    o.parse(args);
    if (!o.get('help') && !o.get()) throw new Error('Input file required');
} catch(e) {
    system.stdout('Bad arguments.\n' + e + '\n\n');
    help();
    return;
}

if (o.get('help')) {
    help();
} else {
    var f = new File(o.get());
    if (!f.exists()) {
        system.stdout('Cannot access ' + o.get() + ': No such file.\n');
        return;
    }

    f.open('r');
    var input = f.read();
    f.close();

    load('ometa-rhino.js');

    var result = translateCode(input);

    if (o.get('output')) {
        (new File(o.get('output'))).open('w').write(result).close();
        system.stdout(o.get('output') + ' written\n');
    } else {
        system.stdout(result);
    }
}

})();
