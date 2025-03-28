import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as PEG from 'pegjs';
import grammar from './gramma.pegjs';
import 'brace';
import 'brace/theme/tomorrow';
import "brace/snippets/text";
import 'brace/ext/language_tools';
import SimpleQueryMode from './simpleQuery.mode';
import debounce from 'lodash/debounce';

const baseSuggestion = [
];

const pegparser = PEG.generate(grammar);

const QueryBox = ({ id, className, onSearch, queryText, words }) => {
    const aceEditor = useRef(null);
    const editorInstance = useRef(null);
    const previousQueryText = useRef(queryText);
    const editorId = useMemo(() => id || Date.now().toString(16), [id]);

    const suggestions = useMemo(() => 
        baseSuggestion.concat((words || []).map(({ word, desc }) => ({
            caption: word,
            value: word,
            meta: desc
        }))),
        [words]
    );

    const customCompleter = useMemo(() => ({
        getCompletions: (editor, session, pos, prefix, callback) => {
            callback(null, suggestions);
        }
    }), [suggestions]);

    const handleQueryChange = useCallback(
        debounce((val) => {
            let err = null;
            let parsed = null;
            let freetext = '';
            try {
                freetext = val.trim();
                if (!freetext) {
                    onSearch(null, {}, '');
                    return;
                }
                parsed = pegparser.parse(freetext);
            } catch (e) {
                err = e;
                console.error('Query parsing error:', e);
            } finally {
                onSearch(err, parsed, freetext);
            }
        }, 300),
        [onSearch]
    );

    useEffect(() => {
        editorInstance.current = window.ace.edit(aceEditor.current);
        editorInstance.current.$blockScrolling = true;

        const langTools = window.ace.acequire('ace/ext/language_tools');
        langTools.addCompleter(customCompleter);

        editorInstance.current.setOptions({
            maxLines: 1,
            autoScrollEditorIntoView: true,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            highlightActiveLine: false,
            printMargin: false,
            showGutter: false,
            theme: "ace/theme/tomorrow",
            fontSize: 13
        });

        editorInstance.current.commands.addCommand({
            name: 'submit-query',
            bindKey: {
                mac: "Enter",
                win: "Enter"
            },
            exec: editor => handleQueryChange(editor.getSession().getValue())
        });

        editorInstance.current.getSession().setMode(new SimpleQueryMode());

        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
        };
    }, [customCompleter, handleQueryChange]);

    useEffect(() => {
        if (editorInstance.current && queryText !== previousQueryText.current) {
            const currentValue = editorInstance.current.getSession().getValue();
            if (queryText !== currentValue) {
                editorInstance.current.getSession().setValue(queryText);
                previousQueryText.current = queryText;
            }
        }
    }, [queryText]);

    return (
        <div 
            className={className || 'flex-fill bg-white border py-2'}
            role="search"
            aria-label="Query input"
        >
            <div 
                ref={aceEditor}
                id={editorId}
                tabIndex="0"
            />
        </div>
    );
};

QueryBox.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    queryText: PropTypes.string,
    words: PropTypes.arrayOf(
        PropTypes.shape({
            word: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired
        })
    )
};

export default QueryBox;
