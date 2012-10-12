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
}var Transform = exports.Transform = objectThatDelegatesTo(OMeta, {
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
              case "strike":
                return "strike";
              case "subscript":
                return "subscript";
              case "para":
                return "para";
              case "header5":
                return "header5";
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
              case "superscript_":
                return "superscript_";
              case "subscript_":
                return "subscript_";
              case "strike_":
                return "strike_";
              case "bold_":
                return "bold_";
              case "header6":
                return "header6";
              case "monospace_":
                return "monospace_";
              case "header2":
                return "header2";
              case "underline":
                return "underline";
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
                        return ans = this._apply("tokens");
                    }.call(this);
                });
                return [ t, ans ];
            }.call(this);
        }, function() {
            return this._apply("escaped");
        }, function() {
            return this._apply("extension");
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
        var $elf = this, _fromIdx = this.input.idx, t, tt, c, p;
        return function() {
            this._form(function() {
                return function() {
                    t = this._applyWithArgs("exactly", "extension");
                    tt = this._apply("anything");
                    c = this._apply("anything");
                    return p = this._apply("anything");
                }.call(this);
            });
            return [ t, tt, utils.getExtension(tt, "transformAst")(c, p), p ];
        }.call(this);
    },
    topLevel: function() {
        var $elf = this, _fromIdx = this.input.idx, c;
        return function() {
            c = this._apply("tokens");
            return c;
        }.call(this);
    }
});