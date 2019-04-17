import React from 'react';
import { func , string, bool} from 'prop-types';
import * as PEG from 'pegjs';
import grammar from './gramma.pegjs';
import 'brace';
import 'brace/theme/tomorrow';

//import ace from 'ace-builds';
import SimpleQueryMode from './simpleQuery.mode';

const pegparser = PEG.generate(grammar);
class QueryBox extends React.PureComponent {
    static propTypes = {
        className: string,
        placeholder: string,
        onSearch: func.isRequired,
        queryText: string,
        autoFocus: bool
    }

    constructor(props) {
        super(props);
        this.aceEditor = React.createRef();
      }

    render(){
        const inputClassName = this.props.className || 'flex-fill bg-white border py-2';
        return (
            <div className={inputClassName}>
                <div ref={this.aceEditor} id="query-text-box"></div>
            </div>
        );
    }

    componentDidMount() {
        const hanleQueryChange = this.hanleQueryChange;
        this.__editor =  ace.edit(this.aceEditor.current);
        this.editor().setOptions({
            maxLines: 1,
            autoScrollEditorIntoView: true,
            highlightActiveLine: false,
            printMargin: false,
            showGutter: false,
            theme: "ace/theme/tomorrow",
            fontSize: 13,
        });
        this.editor().commands.addCommand({
            name: 'submit-query',
            bindKey: {
                sender:     "editor|cli",
                mac:        "Enter",
                windows:    "Enter"
            },
            exec: editor => hanleQueryChange(editor.getSession().getValue())
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
            parsed = freetext ? pegparser.parse(freetext): {};
        }
        catch(e) {
            err = e;
        } finally{
           this.props.onSearch(err, parsed, freetext);
        }
    }
}

export default QueryBox;
