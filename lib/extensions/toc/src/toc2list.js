var TocToList = {

    createChain: function(levels, header, n, prevn) {
        var lh = levels[prevn], ul, li;

        for (var i = prevn + 1; i <= n; i++) {
            ul = this.createUl(this.createLi());
            this.getLi(lh)[1].push(ul);
            lh = levels[i] = ul;
        }

        this.getLi(lh)[1].push(this.createLink(header[1], header[2]));
    },

    getLi: function(ul) {
        var li = ul[1][ul[1].length - 1];

        if (!li) {
            li = this.createLi();
            ul[1].push(li);
        }

        return li;
    },

    convert: function(headers) {
        var levels = { 1: this.createUl() },
            i, h, n, prev = 1,
            minLevel = 6,
            shift = 0;

        for (i = 0; i < headers.length; i++) {
            n = this.getLevelNumber(headers[i][0]);
            if (n < minLevel) minLevel = n;
        }

        shift = minLevel - 1;

        for (i = 0; i < headers.length; i++) {
            h = headers[i];
            n = this.getLevelNumber(h[0]) - shift;
            if (n > prev) {
                this.createChain(levels, h, n, prev);
            } else {
                levels[n][1].push(this.createLi(h[1], h[2]));
            }
            prev = n;
        }

        return levels[1];
    },

    createUl: function(li) {
        return ['ulist', li ? [li] : []];
    },

    createLi: function(content, a) {
        return ['ulistItem', content ? [this.createLink(content, a)] : []];
    },

    createLink: function(content, a) {
        return ['link', '#' + a, [content]];
    },

    getLevelNumber: function(text) {
        return text.charCodeAt(text.length - 1) - 48;
    }

};
