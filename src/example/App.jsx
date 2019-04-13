import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import QueryBox from '../index';
const ace = require('ace-builds');
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/theme/github';
import 'brace/mode/mysql';
import 'brace/mode/json';
import './App.scss';
import SimpleQueryMode from '../simpleQuery.mode';

class App extends React.Component {
    state = {
        result: ``
    }
    componentDidMount() {
        const simpleQueryMode = new SimpleQueryMode();
        this.refs.aceEditor.editor.getSession().setMode(simpleQueryMode);
    }
    render() {
        return (
            <div className="col col-12 col-lg-12 d-flex flex-column h-100">
                <div className="panel">
                    <p className="lead">joy-query-box example </p>
                    <hr className="my-4" />
                    <p>A react-text-box component which will transform simple expression as free-text to object</p>
                </div>
                <div className="container small">
                    <div className="row">
                        <h5>operators</h5>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <code>=</code> Equal
                        </div>
                        <div className="col-sm">
                            <code>></code> Greater than
                        </div>
                        <div className="col-sm">
                            <code>>=</code> Greater than or equal
                        </div>
                        <div className="col-sm">
                         <code> &lt; </code> Less than
                        </div>
                        <div className="col-sm">
                            <code> &lt;= </code> Less than or equal
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <code> %= </code> Like
                        </div>
                        <div className="col-sm">
                            <code> @= </code> Contains
                        </div>
                        <div className="col-sm">
                            <code> $= </code> StartWith
                        </div>
                        <div className="col-sm">
                            <code> &amp; </code> And
                        </div>
                        <div className="col-sm">
                            <code> | </code> Or
                        </div>
                    </div>
                </div>
                <div className="panel flex-fill my-2">
                    <div id="ace-editor"></div>
                    <AceEditor
                        ref="aceEditor"
                        mode="text"
                        theme="github"
                        onChange={this.handleOnEditorChange}
                        name="ace-editor"
                        editorProps={{ $blockScrolling: true }}
                        showGutter={true}
                        maxLines={4}
                        minLines={2}
                        width="100%"
                    />
                    <QueryBox
                        autoFocus
                        label="Simple query"
                        placeholder="type condition here"
                        onSearch={this.handleOnSeach}
                        queryText={"(gender = 'women' & age >= 18) | (gender = 'men' & age >= 22)"}
                    />
                    <div className="card">
                        <div className="card-body">
                            <pre className="text-monospace">
                                {this.state.result}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    handleOnSeach = (err, parsed, freeText) => {
        console.log({ err, parsed, freeText });
        this.setState({
            result: JSON.stringify(err || parsed || undefined, null, 2)
        });
    }
    handleOnEditorChange = (text, eve) => {
        console.log(text, eve);
    }
}

export default hot(module)(App)