
export class SimpleQueryRules extends window.ace.acequire("ace/mode/text_highlight_rules").TextHighlightRules {
	constructor() {
		super();
		var operators = ("is|like|contains|startwith|equal|and|or");
    
        var builtinConstants = ("true|false");
        
        var keywordMapper = this.createKeywordMapper({
            "keyword.operator": operators,
            "constant.language": builtinConstants,
        }, "identifier", true);
    
        this.$rules = {
            "start" : [ {
                token : "comment",
                regex : "--.*$"
            },  {
                token : "comment",
                start : "/\\*",
                end : "\\*/"
            }, {
                token : "string",
                regex : '".*?"'
            }, {
                token : "string",
                regex : "'.*?'"
            }, {
                token : "string",
                regex : "`.*?`"
            }, {
                token : "constant.numeric",
                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token : keywordMapper,
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token : "keyword.operator",
                regex : "\\&|>|>=|<|<=|=|#"
            }, {
                token : "paren.lparen",
                regex : "[\\(]"
            }, {
                token : "paren.rparen",
                regex : "[\\)]"
            }, {
                token : "text",
                regex : "\\s+"
            } ]
        };
        this.normalizeRules();
	}
}

export default class SimpleQueryMode extends window.ace.acequire('ace/mode/text').Mode {
	constructor() {
		super();
		this.HighlightRules = SimpleQueryRules;
	}
}

