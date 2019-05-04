// Grammar: API Query Language (aql)
// =================================

{
	function parseAnd(res, term){
    	return Object.assign(res, term);
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
}

SimpleQuery		= head:IrlExpr tail:(_ LogicOperators _ IrlExpr)* {return ParseConjExpr(head, tail)}
IrlExpr			= ConjExpr / GroupExpr
GroupExpr		= LP _ exprs:ConjExpr _ RP {return exprs}
ConjExpr		= head:CompExpr tail:(_ LogicOperators _ CompExpr)* {return ParseConjExpr(head, tail)}
CompExpr 		= left:Identifier _ op:CompOperators _ right:Expr { return {[left]: {[op]: right}} }

LogicOperators 	= logicOp:(AndOp / OrOp) {return logicOp}
AndOp 			= "&" {return "$and"}
OrOp			= "|" {return "$or" }
LP				= "("
RP				= ")"
    
CompOperators 	= Equal / GreaterThanOrEqual / GreaterThan / LessThanOrEqual / LessThan / Contains / Like / StartWith / Is
Equal				= "="	        {return "$eq"}
Diff				= "#"	        {return "$dif"}
GreaterThan 		= ">"	        {return "$gt"} 
GreaterThanOrEqual 	= ">="	        {return "$gte"} 
LessThan 			= "<"	        {return "$lt"} 
LessThanOrEqual 	= "<="	        {return "$lte"} 
StartWith 		    = "startwith"	{return "$startWith"} 
Contains            = "contains"	{return "$contains"} 
Like 			    = "like"        {return "$like"} 
Is 			        = "is"          {return "$is"} 


Expr = Float / Integer / Identifier / String

Identifier 	= [a-zA-Z0-9_]+ {return text()}

Number 	= Float / Integer
Integer = n:[0-9]+ {return parseInt(n.join(""));}
Float	= left:Integer "." right:Integer { return parseFloat([left.toString(), right.toString()].join("."))}

String 	= "'" str:ValidStringChar* "'" {return str.join("")}
ValidStringChar	= !"'" c:. { return c;}

_ "whitespace"
  = (" "
  / "\t"
  / "\v"
  / "\f")*