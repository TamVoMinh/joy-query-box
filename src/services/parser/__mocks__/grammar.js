module.exports = `
start = expression

expression = condition / logicalExpression

logicalExpression = "(" _ left:expression _ op:logicalOperator _ right:expression _ ")" {
    const result = {};
    result[op] = [left, right];
    return result;
}

condition = field:identifier _ op:operator _ value:value {
    const result = {};
    result[field] = {};
    result[field][op] = value;
    return result;
}

logicalOperator = "&" { return "$and"; } / "|" { return "$or"; }

operator = "=" { return "$eq"; }
        / ">=" { return "$gte"; }
        / ">" { return "$gt"; }
        / "<=" { return "$lte"; }
        / "<" { return "$lt"; }
        / "like" { return "$like"; }
        / "contains" { return "$contains"; }
        / "startwith" { return "$startWith"; }
        / "is" { return "$is"; }
        / "in" { return "$in"; }
        / "between" { return "$between"; }

identifier = [a-zA-Z_][a-zA-Z0-9_]* { return text(); }

value = string / number / boolean / array

string = "'" chars:[^']* "'" { return chars.join(""); }
       / '"' chars:[^"]* '"' { return chars.join(""); }

number = digits:[0-9]+ { return parseInt(digits.join(""), 10); }

boolean = "true" { return true; }
        / "false" { return false; }

array = "(" _ head:value tail:(_ "," _ value)* _ ")" {
    return [head].concat(tail.map(item => item[3]));
}

_ = [ \\t\\n\\r]*
`; 