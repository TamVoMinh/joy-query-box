// Grammar: API Query Language (aql)
// =================================

{
	function parseAnd(res, term){
        const entities = Object.entries(term);
        if(entities.length ===1){
            const [exprKey, exprValue] = entities[0];
            if(res.hasOwnProperty(exprKey) && exprKey != '$or'){
                const originExpr = Object.assign({}, res[exprKey])
                res[exprKey] = {'$and': Object.assign(originExpr, exprValue)}
            }else{
                Object.assign(res, term)
            }
        }
        else{
            Object.assign(res, term)
        }
    	return res;
    }
    
    function parseOr(res, term){
    	return res.$or.push(term)
    }
    
    function parselogicExpr (res, op ,term) {
    	return op === '$and' ? parseAnd(res, term) : parseOr(res, term);
    }
    
	function ParseConjExpr(head, tail){
    	if(!tail.length) return head;
        var result = tail.reduce(function(res, element, ix){
        	var op = element[1];
            var term = element[3];
    
        	if(ix === 0) parselogicExpr(res, op, head);
            parselogicExpr(res, op, term);
            return res;
        },{$or:[]});
        
        if(!result.$or.length) delete result.$or;
        
        return result;
    }

    function parseBetween(left, right) {
        const [min, max] = right;
        return {
            "$gte": min,
            "$lte": max
        };
    }

    function parseIn(values) {
        return {
            "$in": values
        };
    }
}

SimpleQuery		= head:IrlExpr tail:(_ LogicOperators _ IrlExpr)* {return ParseConjExpr(head, tail)}
IrlExpr			= ConjExpr / GroupExpr
GroupExpr		= LP _ exprs:ConjExpr _ RP {return exprs}
ConjExpr		= head:CompExpr tail:(_ LogicOperators _ CompExpr)* {return ParseConjExpr(head, tail)}
CompExpr 		= BetweenExpr / InExpr / BasicCompExpr
BasicCompExpr   = left:Identifier _ op:CompOperators _ right:Expr { return {[left]: {[op]: right}} }
BetweenExpr     = left:Identifier _ "between" _ min:Number _ "and" _ max:Number { return {[left]: parseBetween(left, [min, max])} }
InExpr          = left:Identifier _ "in" _ LP _ values:InList _ RP { return {[left]: parseIn(values)} }
InList          = head:Expr tail:(_ "," _ Expr)* { return [head].concat(tail.map(item => item[3])) }

LogicOperators 	= logicOp:(AndOp / And / OrOp / Or) {return logicOp}
AndOp 			= "&" {return "$and"}
And 			= "and" {return "$and"}

OrOp			= "|" {return "$or" }
Or			    = "or" {return "$or" }

LP				= "("
RP				= ")"
    
CompOperators 	= EqualOp / GreaterThanOrEqualOp / GreaterThanOp / LessThanOrEqualOp / LessThanOp / Contains / Like / StartWith / Is / NotIs /
                Equal / GreaterThanOrEqual / GreaterThan / LessThanOrEqual / LessThan
EqualOp				    = "="	                {return "$eq"}
Equal				    = "equal"	            {return "$eq"}

GreaterThanOp 		    = ">"	                {return "$gt"}
GreaterThan		        = "greater than"	    {return "$gt"}

GreaterThanOrEqualOp 	= ">="	                        {return "$gte"}
GreaterThanOrEqual 	    = "greater than or equal"	    {return "$gte"}

LessThanOp 			    = "<"	                {return "$lt"} 
LessThan 			    = "less than"	        {return "$lt"} 

LessThanOrEqualOp 	    = "<="	                {return "$lte"} 
LessThanOrEqual 	    = "less than or equal"	{return "$lte"} 

StartWith 		        = "startwith"	{return "$startWith"} 
Contains                = "contains"	{return "$contains"} 
Like 			        = "like"        {return "$like"} 
Is 			            = "is"          {return "$is"} 
NotIs                 = "is not"             {return "$isNot"}

Expr = Boolean / Float / Integer / Identifier / String

Boolean = TrueVal / FalseVal
TrueVal = "true" { return true }
FalseVal = "false" { return false }

Identifier 	= [a-zA-Z0-9_]+ {return text()}

Number 	= Float / Integer
Integer = n:[0-9]+ {return parseInt(n.join(""), 10);}
Float	= left:Integer "." right:Integer { return parseFloat([left.toString(), right.toString()].join("."))}

String 	= "'" str:ValidStringChar* "'" {return str.join("")}
ValidStringChar	= !"'" c:. { return c;}

_ "whitespace"
  = (" "
  / "\t"
  / "\v"
  / "\f")*