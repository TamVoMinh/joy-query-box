// Grammar: API Query Language (aql)
// =================================

{
	function parseAnd(res, term) {
		if (!term) return res;
		
		// Convert both operands to arrays of conditions
		const conditions = [];
		if (Array.isArray(res)) {
			conditions.push(...res);
		} else {
			conditions.push(res);
		}
		if (Array.isArray(term)) {
			conditions.push(...term);
		} else {
			conditions.push(term);
		}
		
		// Group conditions by field
		const groupedConditions = conditions.reduce((acc, condition) => {
			const [[field, value]] = Object.entries(condition);
			if (!acc[field]) {
				acc[field] = [];
			}
			acc[field].push(value);
			return acc;
		}, {});
		
		// Combine conditions for each field
		const result = {};
		Object.entries(groupedConditions).forEach(([field, values]) => {
			if (values.length === 1) {
				result[field] = values[0];
			} else {
				result[field] = { '$and': values };
			}
		});
		
		return result;
	}
	
	function parseOr(left, right) {
		return { '$or': [left, right] };
	}
	
	function ParseConjExpr(head, tail) {
		if (!tail || !tail.length) return head;
		
		return tail.reduce((result, element) => {
			const [, op, , term] = element;
			if (op === '$and') {
				return parseAnd(result, term);
			} else { // op === '$or'
				return parseOr(result, term);
			}
		}, head);
	}

	function parseBetween(field, [min, max]) {
		return {
			[field]: {
				"$gte": min,
				"$lte": max
			}
		};
	}

	function parseIn(field, values) {
		return {
			[field]: {
				"$in": values
			}
		};
	}
}

SimpleQuery		= head:IrlExpr tail:(_ LogicOperators _ IrlExpr)* {return ParseConjExpr(head, tail)}
IrlExpr			= ConjExpr / GroupExpr
GroupExpr		= LP _ exprs:ConjExpr _ RP {return exprs}
ConjExpr		= head:CompExpr tail:(_ LogicOperators _ CompExpr)* {return ParseConjExpr(head, tail)}
CompExpr 		= BetweenExpr / InExpr / BasicCompExpr
BasicCompExpr   = left:Identifier _ op:CompOperators _ right:Expr { return {[left]: {[op]: right}} }
BetweenExpr     = left:Identifier _ "between" _ min:Number _ "and" _ max:Number { return parseBetween(left, [min, max]) }
InExpr          = left:Identifier _ "in" _ LP _ values:InList _ RP { return parseIn(left, values) }
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
NotIs                   = "is not"      {return "$isNot"}

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