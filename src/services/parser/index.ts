import * as PEG from 'pegjs';
import { QueryExpression } from '../../components/QueryBox/QueryBox.types';
import grammar from './grammar.pegjs';

const pegparser = PEG.generate(grammar);

export interface ParserResult {
    error: Error | null;
    parsed: QueryExpression | null;
    freeText: string;
}

export const useQueryParser = () => {
    const parseQuery = (query: string): ParserResult => {
        let error = null;
        let parsed = null;
        let freeText = '';

        try {
            freeText = query.trim();
            if (!freeText) {
                return { error: null, parsed: {}, freeText: '' };
            }
            parsed = pegparser.parse(freeText);
        } catch (e) {
            error = e as Error;
            console.error('Query parsing error:', e);
        }

        return { error, parsed, freeText };
    };

    return { parseQuery };
}; 