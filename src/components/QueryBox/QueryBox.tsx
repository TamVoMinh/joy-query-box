import React, { useCallback } from 'react';
import { QueryBoxProps } from './QueryBox.types';
import { useEditorSetup } from './hooks/useEditorSetup';
import { useQueryParser } from '../../services/parser';
import debounce from 'lodash/debounce';

export const QueryBox: React.FC<QueryBoxProps> = ({
    id,
    className,
    onSearch,
    queryText,
    words
}) => {
    const { parseQuery } = useQueryParser();

    const handleQueryChange = useCallback(
        debounce((value: string) => {
            const { error, parsed, freeText } = parseQuery(value);
            onSearch(error, parsed, freeText);
        }, 300),
        [onSearch, parseQuery]
    );

    const { editor: aceEditor } = useEditorSetup({
        words,
        onQueryChange: handleQueryChange,
        initialValue: queryText
    });

    return (
        <div 
            className={className || 'flex-fill bg-white border py-2'}
            role="search"
            aria-label="Query input"
        >
            <div 
                ref={aceEditor}
                id={id || Date.now().toString(16)}
                tabIndex={0}
            />
        </div>
    );
}; 