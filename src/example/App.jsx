import React from 'react';
import { hot } from 'react-hot-loader';
import QueryBox from '../index';
import './App.scss';

const words = [
    {
        word: 'company',
        desc: 'Field: company name'
    },
    {
        word: 'email',
        desc: 'Field: Company Email'
    },
    {
        word: 'vat',
        desc: 'Field: Company VAT number'
    }
];

class App extends React.Component {
    state = {
        result: ``,
        queryText: "(gender = 'women' & age >= 18 & company like 'apple') | (gender = 'men' & age >= 22 & title contains 'mr')"

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
                            <code> &lt; </code> Less than
                        </div>
                        <div className="col-sm">
                            <code> &amp; </code> And
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-sm">
                        </div>
                        <div className="col-sm">
                            <code>>=</code> Greater than or equal
                        </div>
                        <div className="col-sm">
                            <code> &lt;= </code> Less than or equal
                        </div>

                        <div className="col-sm">
                            <code> | </code> Or
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <code>like</code> Like
                        </div>
                        <div className="col-sm">
                            <code>startwith</code> Start With
                        </div>
                        <div className="col-sm">
                            <code>contains</code> Contains
                        </div>
                        <div className="col-sm">
                        </div>
                    </div>

                </div>
                <div className="panel flex-fill my-2">
                    <div className="panel my-2">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Simple query</div>
                            </div>
                            <QueryBox
                                words={words}
                                onSearch={this.handleOnSeach}
                                queryText={this.state.queryText}
                            />
                        </div>

                    </div>
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