import { useRef, useEffect, useMemo } from 'react';
import { QuerySuggestion } from '../QueryBox.types';
import { SimpleQueryMode } from '../../../utils/editor/simpleQueryMode';
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-text';

declare global {
    interface Window {
        ace: typeof ace;
    }
}

// Make ace available globally
window.ace = ace;

interface EditorSetupProps {
    words?: QuerySuggestion[];
    onQueryChange: (value: string) => void;
    initialValue?: string;
}

interface EditorInstance {
    editor: any;
    setEditorValue: (value: string) => void;
}

const operatorSuggestions = [
    { caption: 'between', value: 'between', meta: 'Range check operator', score: 1000 },
    { caption: 'is', value: 'is', meta: 'Boolean check operator', score: 1000 },
    { caption: 'in', value: 'in', meta: 'Set membership operator', score: 1000 },
    { caption: 'like', value: 'like', meta: 'Pattern match operator', score: 1000 },
    { caption: 'contains', value: 'contains', meta: 'Text search operator', score: 1000 },
    { caption: 'startwith', value: 'startwith', meta: 'Text prefix operator', score: 1000 }
];

export const useEditorSetup = ({
    words,
    onQueryChange,
    initialValue
}: EditorSetupProps): EditorInstance => {
    const aceEditor = useRef<HTMLDivElement>(null);
    const editorInstance = useRef<any>(null);

    const suggestions = useMemo(() => [
        ...(words || []).map(({ word, desc }) => ({
            caption: word,
            value: word,
            meta: desc,
            score: 100
        })),
        ...operatorSuggestions
    ], [words]);

    const customCompleter = useMemo(() => ({
        getCompletions: (_editor: any, session: any, pos: any, prefix: string, callback: Function) => {
            // Get the current line's text
            const line = session.getLine(pos.row);
            const cursorPosition = pos.column;

            // Check if we're after a field name by looking for spaces before the cursor
            const beforeCursor = line.substring(0, cursorPosition);
            const isAfterField = /\w+\s+$/.test(beforeCursor);

            // If we're after a field name, prioritize operators
            const filteredSuggestions = isAfterField
                ? suggestions.filter(s => operatorSuggestions.some(op => op.caption === s.caption))
                : suggestions;

            callback(null, filteredSuggestions);
        }
    }), [suggestions]);

    useEffect(() => {
        if (!aceEditor.current) return;

        // Initialize editor
        editorInstance.current = ace.edit(aceEditor.current);
        editorInstance.current.$blockScrolling = true;

        const session = editorInstance.current.getSession();
        
        // Create and set the mode
        const Mode = ace.require('ace/mode/text').Mode;
        const customMode = new Mode();
        customMode.HighlightRules = SimpleQueryMode;
        session.setMode(customMode);
        session.setUseWrapMode(true);

        // Configure editor
        const langTools = ace.require('ace/ext/language_tools');
        langTools.addCompleter(customCompleter);

        editorInstance.current.setOptions({
            maxLines: 1,
            minLines: 1,
            autoScrollEditorIntoView: true,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            highlightActiveLine: false,
            printMargin: false,
            showGutter: false,
            theme: 'ace/theme/tomorrow',
            fontSize: 13
        });

        // Add command for query submission
        editorInstance.current.commands.addCommand({
            name: 'submit-query',
            bindKey: {
                mac: 'Enter',
                win: 'Enter'
            },
            exec: (editor: any) => onQueryChange(editor.getSession().getValue())
        });

        // Set initial value
        if (initialValue) {
            session.setValue(initialValue);
            onQueryChange(initialValue);
        }

        // Cleanup
        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
        };
    }, [customCompleter, onQueryChange, initialValue]);

    const setEditorValue = (value: string) => {
        if (editorInstance.current) {
            const session = editorInstance.current.getSession();
            session.setValue(value);
            onQueryChange(value);
        }
    };

    return {
        editor: aceEditor,
        setEditorValue
    };
}; 