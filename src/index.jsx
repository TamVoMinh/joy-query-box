import React from 'react';
import { func, string, arrayOf, shape } from 'prop-types';
import * as PEG from 'pegjs';
import grammar from './gramma.pegjs';
import 'brace';
import 'brace/theme/tomorrow';
import "brace/snippets/text";
import 'brace/ext/language_tools';
import SimpleQueryMode from './simpleQuery.mode';

const baseSuggestion = [
];

const pegparser = PEG.generate(grammar);
class QueryBox extends React.PureComponent {
    static propTypes = {
        id: string,
        className: string,
        onSearch: func.isRequired,
        queryText: string,
        words: arrayOf(shape({
            word: string.isRequired,
            desc: string.isRequired
        }))
    }

    constructor(props) {
        super(props);
        this.aceEditor = React.createRef();
    }

    customCompleter = {
        getCompletions: (editor, session, pos, prefix, callback) =>{
            callback(null, this.suggesions);
        }
    }

    render() {
        const inputClassName = this.props.className || 'flex-fill bg-white border py-2';
        return (
            <div className={inputClassName} >
                <div ref={this.aceEditor} id={this.editorId()}></div>
            </div>
        );
    }

    editorId = () =>{
        if(!this.__editorId) this.__editorId = this.props.id || Date.now().toString(16);
        return this.__editorId;
    }

    componentDidMount() {
        this.__editor = window.ace.edit(this.aceEditor.current);
        this.__editor.$blockScrolling = true;
        let langTools = window.ace.acequire('ace/ext/language_tools');
        langTools.addCompleter(this.customCompleter);

        this.suggesions = baseSuggestion.concat((this.props.words || []).map(({ word, desc }) => ({
            caption: word,
            value: word,
            meta: desc
        })));

        this.editor().setOptions({
            maxLines: 1,
            autoScrollEditorIntoView: true,
            enableBasicAutocompletion: this.customCompleter,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            highlightActiveLine: false,
            printMargin: false,
            showGutter: false,
            theme: "ace/theme/tomorrow",
            fontSize: 13
        });

        this.editor().commands.addCommand({
            name: 'submit-query',
            bindKey: {
                mac: "Enter",
                win: "Enter"
            },
            exec: editor => this.hanleQueryChange(editor.getSession().getValue())
        });

        this.editor().getSession().setMode(new SimpleQueryMode());

        this.props.queryText && this.editor().getSession().setValue(this.props.queryText);
    }

    editor = () => this.__editor;

    hanleQueryChange = val => {
        let err = null;
        let parsed = null;
        let freetext = '';
        try {
            freetext = val.trim();
            parsed = freetext ? pegparser.parse(freetext) : {};
        }
        catch (e) {
            err = e;
        } finally {
            this.props.onSearch(err, parsed, freetext);
        }
    }
}

export default QueryBox;
