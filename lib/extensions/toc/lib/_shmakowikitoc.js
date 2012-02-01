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
var api = require('../../../shmakowiki'),
    Transform = api.Transform;
var ometajs_ = require('ometajs').globals || global;var StringBuffer = ometajs_.StringBuffer;
var objectThatDelegatesTo = ometajs_.objectThatDelegatesTo;
var isImmutable = ometajs_.isImmutable;
var digitValue = ometajs_.digitValue;
var isSequenceable = ometajs_.isSequenceable;
var escapeChar = ometajs_.escapeChar;
var unescape = ometajs_.unescape;
var getTag = ometajs_.getTag;
var inspect = ometajs_.inspect;
var lift = ometajs_.lift;
var clone = ometajs_.clone;
var Parser = ometajs_.Parser;
var fail = ometajs_.fail;
var OMeta = ometajs_.OMeta;
var BSNullOptimization = ometajs_.BSNullOptimization;
var BSAssociativeOptimization = ometajs_.BSAssociativeOptimization;
var BSSeqInliner = ometajs_.BSSeqInliner;
var BSJumpTableOptimization = ometajs_.BSJumpTableOptimization;
var BSOMetaOptimizer = ometajs_.BSOMetaOptimizer;
var BSOMetaParser = ometajs_.BSOMetaParser;
var BSOMetaTranslator = ometajs_.BSOMetaTranslator;
var BSJSParser = ometajs_.BSJSParser;
var BSSemActionParser = ometajs_.BSSemActionParser;
var BSJSIdentity = ometajs_.BSJSIdentity;
var BSJSTranslator = ometajs_.BSJSTranslator;
var BSOMetaJSParser = ometajs_.BSOMetaJSParser;
var BSOMetaJSTranslator = ometajs_.BSOMetaJSTranslator;
if (global === ometajs_) {
  fail = (function(fail) {
    return function() { return fail };
  })(fail);
  OMeta = require('ometajs').OMeta;
}{
    var ShmakoWikiToc = exports.ShmakoWikiToc = objectThatDelegatesTo(OMeta, {
        keyword: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                switch (this._apply("anything")) {
                  case "olistItem":
                    return "olistItem";
                  case "underline_":
                    return "underline_";
                  case "strike":
                    return "strike";
                  case "lineBreak":
                    return "lineBreak";
                  case "italic_":
                    return "italic_";
                  case "bold_":
                    return "bold_";
                  case "underline":
                    return "underline";
                  case "subscript":
                    return "subscript";
                  case "olist":
                    return "olist";
                  case "superscript":
                    return "superscript";
                  case "monospace_":
                    return "monospace_";
                  case "monospace":
                    return "monospace";
                  case "strike_":
                    return "strike_";
                  case "italic":
                    return "italic";
                  case "para":
                    return "para";
                  case "ulistItem":
                    return "ulistItem";
                  case "ulist":
                    return "ulist";
                  case "subscript_":
                    return "subscript_";
                  case "superscript_":
                    return "superscript_";
                  case "bold":
                    return "bold";
                  default:
                    throw fail();
                }
            }.call(this);
        },
        headertag: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                switch (this._apply("anything")) {
                  case "header4":
                    return "header4";
                  case "header1":
                    return "header1";
                  case "header5":
                    return "header5";
                  case "header2":
                    return "header2";
                  case "header6":
                    return "header6";
                  case "header3":
                    return "header3";
                  default:
                    throw fail();
                }
            }.call(this);
        },
        header: function() {
            var $elf = this, _fromIdx = this.input.idx, t, c, a;
            return function() {
                this._form(function() {
                    return function() {
                        t = this._apply("headertag");
                        c = this._apply("tokens");
                        return a = this._apply("anything");
                    }.call(this);
                });
                return function() {
                    var h = [ t, c, a ];
                    ShmakoWikiToc.addTocHeader(h);
                    return h;
                }.call(this);
            }.call(this);
        },
        token: function() {
            var $elf = this, _fromIdx = this.input.idx, t, ans, c;
            return this._or(function() {
                return this._apply("header");
            }, function() {
                return this._apply("extension");
            }, function() {
                return function() {
                    this._form(function() {
                        return function() {
                            t = this._apply("keyword");
                            return ans = this._apply("tokens");
                        }.call(this);
                    });
                    return [ t, ans ];
                }.call(this);
            }, function() {
                return this._apply("link");
            }, function() {
                return this._apply("escaped");
            }, function() {
                return c = this._apply("anything");
            });
        },
        tokens: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                this._form(function() {
                    return c = this._many(function() {
                        return this._apply("token");
                    });
                });
                return c;
            }.call(this);
        },
        link: function() {
            var $elf = this, _fromIdx = this.input.idx, c, c, cc;
            return this._or(function() {
                return function() {
                    c = this._apply("token");
                    this._form(function() {
                        return undefined;
                    });
                    return [ "link", c, [] ];
                }.call(this);
            }, function() {
                return function() {
                    c = this._apply("token");
                    cc = this._apply("tokens");
                    return [ "link", c, cc ];
                }.call(this);
            });
        },
        link_: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._apply("token");
                return c;
            }.call(this);
        },
        escaped: function() {
            var $elf = this, _fromIdx = this.input.idx, t, c;
            return function() {
                this._form(function() {
                    return function() {
                        t = this._applyWithArgs("exactly", "escaped");
                        return c = this._apply("anything");
                    }.call(this);
                });
                return [ t, c ];
            }.call(this);
        },
        extension: function() {
            var $elf = this, _fromIdx = this.input.idx, t, tt, c, p, t, tt, c, p;
            return this._or(function() {
                return function() {
                    this._form(function() {
                        return function() {
                            t = this._applyWithArgs("exactly", "extension");
                            tt = this._applyWithArgs("exactly", "toc");
                            c = this._apply("anything");
                            return p = this._apply("anything");
                        }.call(this);
                    });
                    return function() {
                        var x;
                        return c[0] === true ? [ t, tt, c, p ] : (x = this.transform(c, p), [ t, tt, [ true, x["toc"], x["ast"] ], p ]);
                    }.call(this);
                }.call(this);
            }, function() {
                return function() {
                    this._form(function() {
                        return function() {
                            t = this._applyWithArgs("exactly", "extension");
                            tt = this._apply("anything");
                            c = this._apply("anything");
                            return p = this._apply("anything");
                        }.call(this);
                    });
                    return [ t, tt, c, p ];
                }.call(this);
            });
        },
        topLevel: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._apply("tokens");
                return c;
            }.call(this);
        }
    });
    ShmakoWikiToc["tocs"] = [];
    ShmakoWikiToc["transform"] = function(ast, p) {
        this.startToc();
        var _ast = this.match(ast, "topLevel");
        if (p === "nested") {
            this.addNestedToc();
        } else {
            undefined;
        }
        return {
            ast: _ast,
            toc: this.finishToc()
        };
    };
    ShmakoWikiToc["startToc"] = function() {
        this["tocs"].push({
            toc: []
        });
    };
    ShmakoWikiToc["finishToc"] = function() {
        return TocToList.convert(this["tocs"].pop()["toc"]);
    };
    ShmakoWikiToc["addTocHeader"] = function(header) {
        if (this["tocs"] && this["tocs"]["length"]) {
            this["tocs"][this["tocs"]["length"] - 1]["toc"].push([ header[0], api.astToPlain(header[1]), header[2] ]);
        } else {
            undefined;
        }
    };
    ShmakoWikiToc["addNestedToc"] = function() {
        var headers = this["tocs"][this["tocs"]["length"] - 1]["toc"], parent = this["tocs"][this["tocs"]["length"] - 2];
        if (parent) {
            parent["toc"] = parent["toc"].concat(headers);
        } else {
            undefined;
        }
    };
}
