var transLanguage = {
    'ru': {
        'А': 'A', 'а': 'a',
        'Б': 'B', 'б': 'b',
        'В': 'V', 'в': 'v',
        'Г': 'G', 'г': 'g',
        'Д': 'D', 'д': 'd',
        'Е': 'E', 'е': 'e',
        'Ё': 'Yo', 'ё': 'yo',
        'Ж': 'Zh', 'ж': 'zh',
        'З': 'Z', 'з': 'z',
        'И': 'I', 'и': 'i',
        'Й': 'J', 'й': 'j',
        'К': 'K', 'к': 'k',
        'Л': 'L', 'л': 'l',
        'М': 'M', 'м': 'm',
        'Н': 'N', 'н': 'n',
        'О': 'O', 'о': 'o',
        'П': 'P', 'п': 'p',
        'Р': 'R', 'р': 'r',
        'С': 'S', 'с': 's',
        'Т': 'T', 'т': 't',
        'У': 'U', 'у': 'u',
        'Ф': 'F', 'ф': 'f',
        'Х': 'X', 'х': 'x',
        'Ц': 'C', 'ц': 'c',
        'Ч': 'Ch', 'ч': 'ch',
        'Ш': 'Sh', 'ш': 'sh',
        'Щ': 'Shh', 'щ': 'shh',
        'Ъ': 'Y', 'ъ': 'y',
        'Ы': 'Y', 'ы': 'y',
        'Ь': 'Y', 'ь': 'y',
        'Э': 'E', 'э': 'e',
        'Ю': 'Yu', 'ю': 'yu',
        'Я': 'Ya', 'я': 'ya'
    }
};

var unicode = {
    isLatin: function(cc) {
        return (cc >= 0x0041 && cc <= 0x005A) || (cc >= 0x0061 && cc <= 0x007A);
    },
    isNumeric: function(cc) {
        return (cc >= 0x0030 && cc <= 0x0039);
    }
};

exports.transliterate = function(language, text) {
    var t = '',
        hash = transLanguage[language] || {},
        c, cc;

    for (var i = 0; i < text.length; i++) {
        c = text.charAt(i);
        cc = text.charCodeAt(i);
        if (unicode.isLatin(cc) || unicode.isNumeric(cc)) {
            t += c;
        } else {
            t += (hash[c] || '');
        }
    }

    return t;
};

exports.getExtension = function(name, func, noop) {
    noop = noop || function(c, p) {
        return c;
    };

    var ext;
    try {
        ext = require.resolve('./extensions/' + name);
    } catch(ignore) {
        try {
            ext = require.resolve('shmakowiki-' + name);
        } catch(ignore) {}
    }
    return ext? (require(ext)[func] || noop) : noop;
};

exports.htmlEscape = (function() {
    var amp = new RegExp('&', 'g'),
        lt = new RegExp('<', 'g'),
        gt = new RegExp('>', 'g'),
        apos = new RegExp("'", 'g'),
        quot = new RegExp('"', 'g');

    return function(s) {
        return String(s)
            .replace(amp, '&amp;')
            .replace(lt, '&lt;')
            .replace(gt, '&gt;')
            .replace(apos, '&apos;')
            .replace(quot, '&quot;');
    }
})();
