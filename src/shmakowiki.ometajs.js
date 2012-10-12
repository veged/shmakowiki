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
    var ShmakoWiki = exports.ShmakoWiki = objectThatDelegatesTo(OMeta, {
        oneOf: function() {
            var $elf = this, _fromIdx = this.input.idx, a, a;
            return this._or(function() {
                return function() {
                    a = this._apply("anything");
                    this._pred(a["length"] == 1);
                    return this._applyWithArgs("apply", a.pop());
                }.call(this);
            }, function() {
                return function() {
                    a = this._apply("anything");
                    this._pred(a["length"] > 1);
                    return this._or(function() {
                        return this._applyWithArgs("apply", a.pop());
                    }, function() {
                        return this._applyWithArgs("oneOf", a);
                    });
                }.call(this);
            });
        },
        escapedChar: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                this._applyWithArgs("exactly", "~");
                c = this._apply("char");
                return c;
            }.call(this);
        },
        escaped: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._many1(function() {
                    return this._apply("escapedChar");
                });
                return [ "escaped", c.join("") ];
            }.call(this);
        },
        b: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._applyWithArgs("exactly", "*");
                this._applyWithArgs("exactly", "*");
                return "**";
            }.call(this);
        },
        i: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._applyWithArgs("exactly", "/");
                this._applyWithArgs("exactly", "/");
                return "//";
            }.call(this);
        },
        u: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._applyWithArgs("exactly", "_");
                this._applyWithArgs("exactly", "_");
                return "__";
            }.call(this);
        },
        s: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._not(function() {
                    return this._applyWithArgs("exactly", " ");
                });
                this._applyWithArgs("exactly", "-");
                this._applyWithArgs("exactly", "-");
                "--";
                return this._not(function() {
                    return this._applyWithArgs("exactly", " ");
                });
            }.call(this);
        },
        m: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._applyWithArgs("exactly", "#");
                this._applyWithArgs("exactly", "#");
                return "##";
            }.call(this);
        },
        sup: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._applyWithArgs("exactly", "^");
                this._applyWithArgs("exactly", "^");
                return "^^";
            }.call(this);
        },
        sub: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._applyWithArgs("exactly", ",");
                this._applyWithArgs("exactly", ",");
                return ",,";
            }.call(this);
        },
        ext: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._applyWithArgs("exactly", "%");
                this._applyWithArgs("exactly", "%");
                return "%%";
            }.call(this);
        },
        linkStart: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                switch (this._apply("anything")) {
                  case "(":
                    return function() {
                        this._applyWithArgs("exactly", "(");
                        return "((";
                    }.call(this);
                  case "[":
                    return function() {
                        this._applyWithArgs("exactly", "[");
                        return "[[";
                    }.call(this);
                  default:
                    throw fail();
                }
            }.call(this);
        },
        linkEnd: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                switch (this._apply("anything")) {
                  case "]":
                    return function() {
                        this._applyWithArgs("exactly", "]");
                        return "]]";
                    }.call(this);
                  case ")":
                    return function() {
                        this._applyWithArgs("exactly", ")");
                        return "))";
                    }.call(this);
                  default:
                    throw fail();
                }
            }.call(this);
        },
        l: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or(function() {
                return this._apply("linkStart");
            }, function() {
                return this._apply("linkEnd");
            });
        },
        lineBreak: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._applyWithArgs("exactly", "\\");
                this._applyWithArgs("exactly", "\\");
                "\\\\";
                return [ "lineBreak", [] ];
            }.call(this);
        },
        special: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._or(function() {
                    return this._apply("b");
                }, function() {
                    return this._apply("i");
                }, function() {
                    return this._apply("u");
                }, function() {
                    return this._apply("s");
                }, function() {
                    return this._apply("m");
                }, function() {
                    return this._apply("sup");
                }, function() {
                    return this._apply("sub");
                }, function() {
                    return this._apply("l");
                }, function() {
                    return this._apply("lineBreak");
                });
                return [ "special", c ];
            }.call(this);
        },
        between: function() {
            var $elf = this, _fromIdx = this.input.idx, t, n, nn, c;
            return function() {
                t = this._apply("anything");
                n = this._apply("anything");
                nn = function() {
                    this._applyWithArgs("apply", t);
                    return ShmakoWiki.arrAdd(n, t);
                }.call(this);
                c = this._many(function() {
                    return function() {
                        this._not(function() {
                            return this._applyWithArgs("oneOf", ShmakoWiki.arrCopy(nn));
                        });
                        return this._applyWithArgs("allInline", nn);
                    }.call(this);
                });
                this._applyWithArgs("apply", t);
                return c;
            }.call(this);
        },
        between_: function() {
            var $elf = this, _fromIdx = this.input.idx, t, c;
            return function() {
                t = this._apply("anything");
                this._applyWithArgs("apply", t);
                c = this._many(function() {
                    return function() {
                        this._not(function() {
                            return this._apply("special");
                        });
                        return this._apply("text");
                    }.call(this);
                });
                this._or(function() {
                    return this._not(function() {
                        return this._not(function() {
                            return this._apply("special");
                        });
                    });
                }, function() {
                    return this._apply("end");
                });
                return c;
            }.call(this);
        },
        bold: function() {
            var $elf = this, _fromIdx = this.input.idx, n, c;
            return function() {
                n = this._apply("anything");
                c = this._applyWithArgs("between", "b", n);
                return [ "bold", c ];
            }.call(this);
        },
        bold_: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._applyWithArgs("between_", "b");
                return [ "bold_", c ];
            }.call(this);
        },
        italic: function() {
            var $elf = this, _fromIdx = this.input.idx, n, c;
            return function() {
                n = this._apply("anything");
                c = this._applyWithArgs("between", "i", n);
                return [ "italic", c ];
            }.call(this);
        },
        italic_: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._applyWithArgs("between_", "i");
                return [ "italic_", c ];
            }.call(this);
        },
        underline: function() {
            var $elf = this, _fromIdx = this.input.idx, n, c;
            return function() {
                n = this._apply("anything");
                c = this._applyWithArgs("between", "u", n);
                return [ "underline", c ];
            }.call(this);
        },
        underline_: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._applyWithArgs("between_", "u");
                return [ "underline_", c ];
            }.call(this);
        },
        strike: function() {
            var $elf = this, _fromIdx = this.input.idx, n, c;
            return function() {
                n = this._apply("anything");
                c = this._applyWithArgs("between", "s", n);
                return [ "strike", c ];
            }.call(this);
        },
        strike_: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._applyWithArgs("between_", "s");
                return [ "strike_", c ];
            }.call(this);
        },
        monospace: function() {
            var $elf = this, _fromIdx = this.input.idx, n, c;
            return function() {
                n = this._apply("anything");
                c = this._applyWithArgs("between", "m", n);
                return [ "monospace", c ];
            }.call(this);
        },
        monospace_: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._applyWithArgs("between_", "m");
                return [ "monospace_", c ];
            }.call(this);
        },
        superscript: function() {
            var $elf = this, _fromIdx = this.input.idx, n, c;
            return function() {
                n = this._apply("anything");
                c = this._applyWithArgs("between", "sup", n);
                return [ "superscript", c ];
            }.call(this);
        },
        superscript_: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._applyWithArgs("between_", "sup");
                return [ "superscript_", c ];
            }.call(this);
        },
        subscript: function() {
            var $elf = this, _fromIdx = this.input.idx, n, c;
            return function() {
                n = this._apply("anything");
                c = this._applyWithArgs("between", "sub", n);
                return [ "subscript", c ];
            }.call(this);
        },
        subscript_: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._applyWithArgs("between_", "sub");
                return [ "subscript_", c ];
            }.call(this);
        },
        link: function() {
            var $elf = this, _fromIdx = this.input.idx, n, nn, c, cc;
            return function() {
                n = this._apply("anything");
                nn = function() {
                    this._apply("linkStart");
                    return ShmakoWiki.arrAdd(n, "l");
                }.call(this);
                c = this._many1(function() {
                    return function() {
                        this._not(function() {
                            return this._apply("space");
                        });
                        this._not(function() {
                            return this._apply("linkEnd");
                        });
                        return this._apply("char");
                    }.call(this);
                });
                this._apply("spacesNoNl");
                cc = this._many(function() {
                    return function() {
                        this._not(function() {
                            return this._applyWithArgs("oneOf", ShmakoWiki.arrCopy(nn));
                        });
                        return this._applyWithArgs("allInline", nn);
                    }.call(this);
                });
                this._apply("linkEnd");
                return [ "link", c.join(""), cc ];
            }.call(this);
        },
        link_: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return this._or(function() {
                return function() {
                    this._apply("linkStart");
                    c = this._many1(function() {
                        return function() {
                            this._not(function() {
                                return this._apply("space");
                            });
                            return this._apply("char");
                        }.call(this);
                    });
                    this._or(function() {
                        return this._not(function() {
                            return this._not(function() {
                                return this._apply("space");
                            });
                        });
                    }, function() {
                        return this._not(function() {
                            return this._not(function() {
                                return this._apply("special");
                            });
                        });
                    }, function() {
                        return this._apply("end");
                    });
                    return [ "link_", c.join("") ];
                }.call(this);
            }, function() {
                return function() {
                    this._apply("linkEnd");
                    return "";
                }.call(this);
            });
        },
        mdash: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._applyWithArgs("exactly", " ");
                this._applyWithArgs("exactly", "-");
                this._applyWithArgs("exactly", "-");
                this._applyWithArgs("exactly", " ");
                " -- ";
                return " – ";
            }.call(this);
        },
        text: function() {
            var $elf = this, _fromIdx = this.input.idx, c, c;
            return this._or(function() {
                return function() {
                    c = this._many1(function() {
                        return function() {
                            this._not(function() {
                                return this._apply("special");
                            });
                            this._not(function() {
                                return this._apply("escapedChar");
                            });
                            return this._or(function() {
                                return this._apply("mdash");
                            }, function() {
                                return this._apply("char");
                            });
                        }.call(this);
                    });
                    return c.join("");
                }.call(this);
            }, function() {
                return function() {
                    c = this._apply("escaped");
                    return c;
                }.call(this);
            });
        },
        inline: function() {
            var $elf = this, _fromIdx = this.input.idx, n;
            return function() {
                n = this._apply("anything");
                return this._or(function() {
                    return this._applyWithArgs("bold", n);
                }, function() {
                    return this._applyWithArgs("italic", n);
                }, function() {
                    return this._applyWithArgs("underline", n);
                }, function() {
                    return this._applyWithArgs("strike", n);
                }, function() {
                    return this._applyWithArgs("monospace", n);
                }, function() {
                    return this._applyWithArgs("superscript", n);
                }, function() {
                    return this._applyWithArgs("subscript", n);
                }, function() {
                    return this._applyWithArgs("link", n);
                }, function() {
                    return this._apply("lineBreak");
                }, function() {
                    return this._apply("text");
                });
            }.call(this);
        },
        inline_: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or(function() {
                return this._apply("bold_");
            }, function() {
                return this._apply("italic_");
            }, function() {
                return this._apply("underline_");
            }, function() {
                return this._apply("superscript_");
            }, function() {
                return this._apply("subscript_");
            }, function() {
                return this._apply("strike_");
            }, function() {
                return this._apply("monospace_");
            }, function() {
                return this._apply("link_");
            });
        },
        allInline: function() {
            var $elf = this, _fromIdx = this.input.idx, n;
            return function() {
                n = this._apply("anything");
                return this._or(function() {
                    return this._applyWithArgs("inline", n);
                }, function() {
                    return function() {
                        this._not(function() {
                            return this._applyWithArgs("inline", n);
                        });
                        return this._apply("inline_");
                    }.call(this);
                });
            }.call(this);
        },
        topInline: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._many1(function() {
                return this._applyWithArgs("allInline", []);
            });
        },
        noNlSpace: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._not(function() {
                    return this._applyWithArgs("exactly", "\n");
                });
                return this._apply("space");
            }.call(this);
        },
        spacesNoNl: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._many(function() {
                return this._apply("noNlSpace");
            });
        },
        spacesNlSpaces: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._apply("spacesNoNl");
                this._applyWithArgs("exactly", "\n");
                this._apply("spacesNoNl");
                this._not(function() {
                    return this._apply("end");
                });
                return " ";
            }.call(this);
        },
        nl: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._applyWithArgs("exactly", "\n");
                return this._many1(function() {
                    return function() {
                        this._apply("spacesNoNl");
                        return this._applyWithArgs("exactly", "\n");
                    }.call(this);
                });
            }.call(this);
        },
        headerStart: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._many1(function() {
                    return this._applyWithArgs("exactly", "=");
                });
                this._many(function() {
                    return this._apply("noNlSpace");
                });
                return c["length"] - 1;
            }.call(this);
        },
        headerEnd: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or(function() {
                return function() {
                    switch (this._apply("anything")) {
                      case "\n":
                        return this._many(function() {
                            return function() {
                                this._many(function() {
                                    return this._apply("noNlSpace");
                                });
                                return this._applyWithArgs("exactly", "\n");
                            }.call(this);
                        });
                      default:
                        throw fail();
                    }
                }.call(this);
            }, function() {
                return this._apply("end");
            });
        },
        headerAnchor: function() {
            var $elf = this, _fromIdx = this.input.idx, a;
            return this._or(function() {
                return function() {
                    this._many1(function() {
                        return this._applyWithArgs("exactly", "=");
                    });
                    a = this._many(function() {
                        return function() {
                            this._not(function() {
                                return this._applyWithArgs("exactly", "\n");
                            });
                            return this._apply("char");
                        }.call(this);
                    });
                    return a.join("");
                }.call(this);
            }, function() {
                return function() {
                    this._apply("empty");
                    return "";
                }.call(this);
            });
        },
        header: function() {
            var $elf = this, _fromIdx = this.input.idx, l, cc, c, anchor;
            return function() {
                l = this._apply("headerStart");
                c = function() {
                    cc = this._many1(function() {
                        return function() {
                            this._not(function() {
                                return this._apply("headerEnd");
                            });
                            this._not(function() {
                                return this._applyWithArgs("exactly", "=");
                            });
                            return this._apply("char");
                        }.call(this);
                    });
                    return cc.join("");
                }.call(this);
                anchor = this._apply("headerAnchor");
                this._apply("headerEnd");
                return function() {
                    var hAST = ShmakoWiki.matchAll(c, "topInline"), hAnchor = utils.transliterate("ru", anchor["length"] ? anchor : ShmakoWikiToPlain.match(hAST, "topLevel"));
                    return [ "header" + (l <= 6 ? l : 6), hAST, hAnchor ];
                }.call(this);
            }.call(this);
        },
        blockEnd: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or(function() {
                return function() {
                    switch (this._apply("anything")) {
                      case "\n":
                        return this._or(function() {
                            return this._not(function() {
                                return this._not(function() {
                                    return this._apply("extBlockStart");
                                });
                            });
                        }, function() {
                            return this._many1(function() {
                                return function() {
                                    this._many(function() {
                                        return this._apply("noNlSpace");
                                    });
                                    return this._applyWithArgs("exactly", "\n");
                                }.call(this);
                            });
                        }, function() {
                            return this._not(function() {
                                return this._not(function() {
                                    return this._apply("listStart");
                                });
                            });
                        }, function() {
                            return this._not(function() {
                                return this._not(function() {
                                    return this._apply("headerStart");
                                });
                            });
                        });
                      default:
                        throw fail();
                    }
                }.call(this);
            }, function() {
                return function() {
                    this._many(function() {
                        return this._applyWithArgs("exactly", "\n");
                    });
                    return this._apply("end");
                }.call(this);
            });
        },
        para: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._many1(function() {
                    return function() {
                        this._not(function() {
                            return this._apply("blockEnd");
                        });
                        return this._or(function() {
                            return function() {
                                this._many(function() {
                                    return this._apply("noNlSpace");
                                });
                                this._applyWithArgs("exactly", "\n");
                                this._many(function() {
                                    return this._apply("noNlSpace");
                                });
                                this._not(function() {
                                    return this._apply("end");
                                });
                                return " ";
                            }.call(this);
                        }, function() {
                            return this._apply("char");
                        });
                    }.call(this);
                });
                c.join("");
                this._apply("blockEnd");
                return [ "para", ShmakoWiki.matchAll(c, "topInline") ];
            }.call(this);
        },
        listStart: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._many(function() {
                    return this._apply("noNlSpace");
                });
                return this._apply("bullet");
            }.call(this);
        },
        uliBullet: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._applyWithArgs("exactly", "*");
                this._not(function() {
                    return this._applyWithArgs("exactly", "*");
                });
                this._many(function() {
                    return this._apply("noNlSpace");
                });
                return "u";
            }.call(this);
        },
        oliBullet: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return function() {
                this._many1(function() {
                    return this._apply("digit");
                });
                this._applyWithArgs("exactly", ".");
                this._many(function() {
                    return this._apply("noNlSpace");
                });
                return "o";
            }.call(this);
        },
        bullet: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or(function() {
                return this._apply("uliBullet");
            }, function() {
                return this._apply("oliBullet");
            });
        },
        bullet1: function() {
            var $elf = this, _fromIdx = this.input.idx, t;
            return function() {
                t = this._apply("anything");
                return this._applyWithArgs("apply", t + "liBullet");
            }.call(this);
        },
        listItemContent: function() {
            var $elf = this, _fromIdx = this.input.idx, c;
            return function() {
                c = this._many1(function() {
                    return function() {
                        this._not(function() {
                            return this._apply("blockEnd");
                        });
                        return this._apply("char");
                    }.call(this);
                });
                return ShmakoWiki.matchAll(c.join(""), "topInline");
            }.call(this);
        },
        listItem: function() {
            var $elf = this, _fromIdx = this.input.idx, t, n, s, p, b;
            return function() {
                t = this._apply("anything");
                n = this._apply("anything");
                s = this._many(function() {
                    return this._applyWithArgs("exactly", " ");
                });
                this._pred(n == s["length"]);
                this._applyWithArgs("bullet1", t);
                p = this._apply("listItemContent");
                this._or(function() {
                    return function() {
                        switch (this._apply("anything")) {
                          case "\n":
                            return "\n";
                          default:
                            throw fail();
                        }
                    }.call(this);
                }, function() {
                    return this._apply("end");
                });
                b = this._many(function() {
                    return this._applyWithArgs("list1", n + 1);
                });
                return [ t + "listItem", p.concat(b) ];
            }.call(this);
        },
        list: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._applyWithArgs("list1", 0);
        },
        list1: function() {
            var $elf = this, _fromIdx = this.input.idx, n, s, b, ss;
            return function() {
                n = this._apply("anything");
                this._not(function() {
                    return this._not(function() {
                        return function() {
                            s = this._many(function() {
                                return this._apply("noNlSpace");
                            });
                            return b = this._apply("bullet");
                        }.call(this);
                    });
                });
                this._pred(n <= s["length"]);
                ss = this._many1(function() {
                    return this._applyWithArgs("listItem", b, s["length"]);
                });
                this._many(function() {
                    return function() {
                        this._applyWithArgs("exactly", "\n");
                        return this._many(function() {
                            return this._apply("noNlSpace");
                        });
                    }.call(this);
                });
                return [ b + "list", ss ];
            }.call(this);
        },
        extBlockStart: function() {
            var $elf = this, _fromIdx = this.input.idx, t, tt, c, cc;
            return function() {
                tt = this._or(function() {
                    return function() {
                        this._apply("ext");
                        t = this._apply("char");
                        this._applyWithArgs("exactly", "%");
                        return t;
                    }.call(this);
                }, function() {
                    return function() {
                        this._apply("ext");
                        return "";
                    }.call(this);
                });
                c = this._many(function() {
                    return function() {
                        this._not(function() {
                            return this._apply("space");
                        });
                        return this._apply("char");
                    }.call(this);
                });
                this._apply("spacesNoNl");
                cc = this._many(function() {
                    return function() {
                        this._not(function() {
                            return this._applyWithArgs("exactly", "\n");
                        });
                        return this._apply("char");
                    }.call(this);
                });
                this._applyWithArgs("exactly", "\n");
                return [ tt, c.join(""), cc.join("") ];
            }.call(this);
        },
        extBlockEnd: function() {
            var $elf = this, _fromIdx = this.input.idx, t, t;
            return this._or(function() {
                return function() {
                    t = this._apply("anything");
                    this._pred(t["length"] == 0);
                    this._many(function() {
                        return this._apply("space");
                    });
                    return this._apply("ext");
                }.call(this);
            }, function() {
                return function() {
                    t = this._apply("char");
                    this._pred(t["length"] > 0);
                    this._many(function() {
                        return this._apply("space");
                    });
                    this._applyWithArgs("exactly", "%");
                    this._applyWithArgs("seq", t);
                    return this._apply("ext");
                }.call(this);
            });
        },
        extBlock: function() {
            var $elf = this, _fromIdx = this.input.idx, s, cc, c;
            return function() {
                s = this._apply("extBlockStart");
                c = function() {
                    cc = this._many1(function() {
                        return function() {
                            this._not(function() {
                                return this._applyWithArgs("extBlockEnd", s[0]);
                            });
                            return this._apply("char");
                        }.call(this);
                    });
                    return cc.join("");
                }.call(this);
                this._applyWithArgs("extBlockEnd", s[0]);
                this._or(function() {
                    return this._apply("blockEnd");
                }, function() {
                    return function() {
                        switch (this._apply("anything")) {
                          case "\n":
                            return "\n";
                          default:
                            throw fail();
                        }
                    }.call(this);
                });
                return [ "extension", s[1], utils.getExtension(s[1], "shmakowikiToAst")(c, s[2]), s[2] ];
            }.call(this);
        },
        allBlock: function() {
            var $elf = this, _fromIdx = this.input.idx;
            return this._or(function() {
                return this._apply("extBlock");
            }, function() {
                return this._apply("list");
            }, function() {
                return this._apply("header");
            }, function() {
                return this._apply("para");
            });
        },
        topLevel: function() {
            var $elf = this, _fromIdx = this.input.idx, t;
            return function() {
                this._many(function() {
                    return function() {
                        this._apply("spacesNoNl");
                        return this._applyWithArgs("exactly", "\n");
                    }.call(this);
                });
                t = this._many1(function() {
                    return this._apply("allBlock");
                });
                return t;
            }.call(this);
        }
    });
    ShmakoWiki["arrJoin"] = function(arr1, arr2) {
        var newArr = ShmakoWiki.arrCopy(arr1);
        for (var i = 0; i < arr2["length"]; i++) {
            newArr[newArr["length"]] = arr2[i];
        }
        return newArr;
    };
    ShmakoWiki["arrCopy"] = function(arr) {
        var newArr = [];
        for (var i = 0; i < arr["length"]; i++) {
            newArr[newArr["length"]] = arr[i];
        }
        return newArr;
    };
    ShmakoWiki["arrAdd"] = function(arr, elem) {
        for (var i = 0; i < arr["length"]; i++) {
            if (arr[i] == elem) {
                return arr;
            } else {
                undefined;
            }
        }
        arr[arr["length"]] = elem;
        return arr;
    };
}