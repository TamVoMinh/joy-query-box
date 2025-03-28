import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-text';

const TextHighlightRules = ace.require('ace/mode/text_highlight_rules').TextHighlightRules;

export class SimpleQueryMode extends TextHighlightRules {
    constructor() {
        super();
        const operators = "is|like|contains|startwith|equal|and|or";
        const builtinConstants = "true|false";
        
        const keywordMapper = this.createKeywordMapper({
            "keyword.operator": operators,
            "constant.language": builtinConstants,
        }, "identifier", true);
    
        this.$rules = {
            "start": [{
                token: "comment",
                regex: "--.*$"
            }, {
                token: "comment",
                start: "/\\*",
                end: "\\*/"
            }, {
                token: "string",
                regex: '".*?"'
            }, {
                token: "string",
                regex: "'.*?'"
            }, {
                token: "string",
                regex: "`.*?`"
            }, {
                token: "constant.numeric",
                regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token: keywordMapper,
                regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token: "keyword.operator",
                regex: "\\&|>|>=|<|<=|=|#"
            }, {
                token: "paren.lparen",
                regex: "[\\(]"
            }, {
                token: "paren.rparen",
                regex: "[\\)]"
            }, {
                token: "text",
                regex: "\\s+"
            }]
        };
        this.normalizeRules();
    }
} 