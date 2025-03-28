import { FC } from 'react';

export type QueryOperator = 
    | '$eq' 
    | '$gt' 
    | '$gte' 
    | '$lt' 
    | '$lte' 
    | '$startWith' 
    | '$contains' 
    | '$like' 
    | '$is'
    | '$isNot'
    | '$in'
    | '$between';

export type LogicalOperator = '$and' | '$or';

export type QueryValue = string | number | boolean | Array<string | number | boolean>;

export interface QueryExpression {
    [field: string]: {
        [operator in QueryOperator]?: QueryValue;
    } | {
        [operator in LogicalOperator]?: QueryExpression;
    };
}

export interface QuerySuggestion {
    word: string;
    desc: string;
    type?: 'string' | 'number' | 'boolean' | 'date';
    options?: Array<string | number | boolean>;
}

export interface QueryBoxProps {
    /** Optional unique identifier for the query box */
    id?: string;
    /** Optional CSS class name */
    className?: string;
    /** Callback function when the query changes */
    onSearch: (error: Error | null, parsed: QueryExpression | null, freeText: string) => void;
    /** Initial query text */
    queryText?: string;
    /** Array of field suggestions with descriptions */
    words?: QuerySuggestion[];
}

declare const QueryBox: FC<QueryBoxProps>;

export default QueryBox; 