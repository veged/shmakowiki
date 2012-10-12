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
}var ShmakoWikiToBemjson = exports.ShmakoWikiToBemjson = objectThatDelegatesTo(OMeta, {
    keyword: function() {
        var $elf = this, _fromIdx = this.input.idx;
        return function() {
            switch (this._apply("anything")) {
              case "bold":
                return "bold";
              case "monospace":
                return "monospace";
              case "italic_":
                return "italic_";
              case "link_":
                return "link_";
              case "link":
                return "link";
              case "strike":
                return "strike";
              case "subscript":
                return "subscript";
              case "escaped":
                return "escaped";
              case "olist":
                return "olist";
              case "para":
                return "para";
              case "header5":
                return "header5";
              case "ulist":
                return "ulist";
              case "lineBreak":
                return "lineBreak";
              case "header4":
                return "header4";
              case "header1":
                return "header1";
              case "superscript":
                return "superscript";
              case "italic":
                return "italic";
              case "header3":
                return "header3";
              case "olistItem":
                return "olistItem";
              case "superscript_":
                return "superscript_";
              case "subscript_":
                return "subscript_";
              case "strike_":
                return "strike_";
              case "bold_":
                return "bold_";
              case "ulistItem":
                return "ulistItem";
              case "header6":
                return "header6";
              case "monospace_":
                return "monospace_";
              case "header2":
                return "header2";
              case "underline":
                return "underline";
              case "extension":
                return "extension";
              case "underline_":
                return "underline_";
              default:
                throw fail();
            }
        }.call(this);
    },
    token: function() {
        var $elf = this, _fromIdx = this.input.idx, t, ans, c;
        return this._or(function() {
            return function() {
                this._form(function() {
                    return function() {
                        t = this._apply("keyword");
                        return ans = this._applyWithArgs("apply", t);
                    }.call(this);
                });
                return ans;
            }.call(this);
        }, function() {
            return function() {
                c = this._apply("anything");
                return utils.htmlEscape(c);
            }.call(this);
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
    bold: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                tag: "b",
                content: c
            };
        }.call(this);
    },
    bold_: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                tag: "b",
                content: c
            };
        }.call(this);
    },
    italic: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                tag: "i",
                content: c
            };
        }.call(this);
    },
    italic_: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                tag: "i",
                content: c
            };
        }.call(this);
    },
    underline: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                tag: "u",
                content: c
            };
        }.call(this);
    },
    underline_: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                tag: "u",
                content: c
            };
        }.call(this);
    },
    strike: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                tag: "s",
                content: c
            };
        }.call(this);
    },
    strike_: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                tag: "s",
                content: c
            };
        }.call(this);
    },
    monospace: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                tag: "tt",
                content: c
            };
        }.call(this);
    },
    monospace_: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                tag: "tt",
                content: c
            };
        }.call(this);
    },
    superscript: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                tag: "sup",
                content: c
            };
        }.call(this);
    },
    superscript_: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                tag: "sup",
                content: c
            };
        }.call(this);
    },
    subscript: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                tag: "sub",
                content: c
            };
        }.call(this);
    },
    subscript_: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                tag: "sub",
                content: c
            };
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
                return {
                    block: "b-link",
                    url: c,
                    content: c
                };
            }.call(this);
        }, function() {
            return function() {
                c = this._apply("token");
                cc = this._apply("tokens");
                return {
                    block: "b-link",
                    url: c,
                    content: cc
                };
            }.call(this);
        });
    },
    link_: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("token");
            return {
                block: "b-link",
                url: c,
                content: c
            };
        }.call(this);
    },
    lineBreak: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("anything");
            return {
                tag: "br"
            };
        }.call(this);
    },
    escaped: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                tag: "span",
                content: c
            };
        }.call(this);
    },
    para: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                elem: "p",
                content: c
            };
        }.call(this);
    },
    header1: function() {
        var $elf = this, _fromIdx = this.input.idx, c, a;
        return function() {
            c = this._apply("tokens");
            a = this._apply("anything");
            return {
                elem: "h1",
                attrs: {
                    id: a
                },
                content: c
            };
        }.call(this);
    },
    header2: function() {
        var $elf = this, _fromIdx = this.input.idx, c, a;
        return function() {
            c = this._apply("tokens");
            a = this._apply("anything");
            return {
                elem: "h2",
                attrs: {
                    id: a
                },
                content: c
            };
        }.call(this);
    },
    header3: function() {
        var $elf = this, _fromIdx = this.input.idx, c, a;
        return function() {
            c = this._apply("tokens");
            a = this._apply("anything");
            return {
                elem: "h3",
                attrs: {
                    id: a
                },
                content: c
            };
        }.call(this);
    },
    header4: function() {
        var $elf = this, _fromIdx = this.input.idx, c, a;
        return function() {
            c = this._apply("tokens");
            a = this._apply("anything");
            return {
                elem: "h4",
                attrs: {
                    id: a
                },
                content: c
            };
        }.call(this);
    },
    header5: function() {
        var $elf = this, _fromIdx = this.input.idx, c, a;
        return function() {
            c = this._apply("tokens");
            a = this._apply("anything");
            return {
                elem: "h5",
                attrs: {
                    id: a
                },
                content: c
            };
        }.call(this);
    },
    header6: function() {
        var $elf = this, _fromIdx = this.input.idx, c, a;
        return function() {
            c = this._apply("tokens");
            a = this._apply("anything");
            return {
                elem: "h6",
                attrs: {
                    id: a
                },
                content: c
            };
        }.call(this);
    },
    olist: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                elem: "ol",
                content: c
            };
        }.call(this);
    },
    ulist: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                elem: "ul",
                content: c
            };
        }.call(this);
    },
    olistItem: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                elem: "li",
                content: c
            };
        }.call(this);
    },
    ulistItem: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                elem: "li",
                content: c
            };
        }.call(this);
    },
    extension: function() {
        var $elf = this, _fromIdx = this.input.idx, t, c, p;
        return function() {
            t = this._apply("anything");
            c = this._apply("anything");
            p = this._apply("anything");
            return utils.getExtension(t, "astToBemjson", function(c, p) {
                return {
                    tag: "div",
                    content: utils.htmlEscape(c)
                };
            })(c, p);
        }.call(this);
    },
    topInline: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return c;
        }.call(this);
    },
    topLevel: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return {
                block: "b-text",
                content: c
            };
        }.call(this);
    }
});