import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import QueryBox from '../index';
import './App.scss';

class App extends React.Component {
    state = {
        result: ``
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
                            <code>=</code> equal
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
}

export default hot(module)(App)