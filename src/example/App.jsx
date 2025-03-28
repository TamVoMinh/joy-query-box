import React, { useState, useCallback } from 'react';
import { hot } from 'react-hot-loader';
import QueryBox from '../index';
import './App.css';

const words = [
    {
        word: 'company',
        desc: 'Field: company name',
        type: 'string'
    },
    {
        word: 'email',
        desc: 'Field: Company Email',
        type: 'string'
    },
    {
        word: 'age',
        desc: 'Field: Person age',
        type: 'number'
    },
    {
        word: 'status',
        desc: 'Field: Account status',
        type: 'string',
        options: ['active', 'inactive', 'pending']
    },
    {
        word: 'isVerified',
        desc: 'Field: Verification status',
        type: 'boolean'
    },
    {
        word: 'registrationDate',
        desc: 'Field: Registration date',
        type: 'date'
    }
];

const examples = [
    {
        title: 'Simple Comparison',
        query: "company = 'Apple Inc'"
    },
    {
        title: 'Numeric Range',
        query: "age between 25 and 35"
    },
    {
        title: 'Multiple Conditions',
        query: "(status in ('active', 'pending')) & age > 21"
    },
    {
        title: 'Boolean Check',
        query: "isVerified is true"
    },
    {
        title: 'Complex Query',
        query: "(company like 'Tech%' & age >= 25) | (status = 'active' & isVerified is true)"
    }
];

const App = () => {
    const [result, setResult] = useState('');
    const [currentQuery, setCurrentQuery] = useState(examples[0].query);

    const handleSearch = useCallback((err, parsed, freeText) => {
        console.log({ err, parsed, freeText });
        setResult(JSON.stringify(err || parsed || undefined, null, 2));
        setCurrentQuery(freeText);
    }, []);

    const handleTryExample = useCallback((query) => {
        setCurrentQuery(query);
    }, []);

    return (
        <div className="col col-12 col-lg-12 d-flex flex-column h-100">
            <div className="panel">
                <h2 className="lead">Joy Query Box Demo</h2>
                <hr className="my-4" />
                <p>A React component for building complex queries with natural language support</p>
            </div>

            <div className="container small mb-4">
                <h5>Available Operators</h5>
                <div className="row">
                    <div className="col-md-3">
                        <h6>Comparison</h6>
                        <ul className="list-unstyled">
                            <li><code>=</code> Equal</li>
                            <li><code>{'>'}</code> Greater than</li>
                            <li><code>{'>='}</code> Greater than or equal</li>
                            <li><code>&lt;</code> Less than</li>
                            <li><code>&lt;=</code> Less than or equal</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h6>Text</h6>
                        <ul className="list-unstyled">
                            <li><code>like</code> Pattern match</li>
                            <li><code>contains</code> Contains text</li>
                            <li><code>startwith</code> Starts with</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h6>Special</h6>
                        <ul className="list-unstyled">
                            <li><code>is</code> Boolean check</li>
                            <li><code>is not</code> Negative boolean</li>
                            <li><code>in</code> Value in set</li>
                            <li><code>between</code> Range check</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h6>Logical</h6>
                        <ul className="list-unstyled">
                            <li><code>&amp;</code> AND</li>
                            <li><code>|</code> OR</li>
                            <li><code>()</code> Grouping</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container mb-4">
                <h5>Example Queries</h5>
                <div className="row">
                    {examples.map((example, index) => (
                        <div key={index} className="col-md-6 mb-2">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h6 className="card-title">{example.title}</h6>
                                    <p className="card-text">
                                        <code>{example.query}</code>
                                    </p>
                                    <button 
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => handleTryExample(example.query)}
                                    >
                                        Try This
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="panel flex-fill">
                <div className="panel mb-3">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Query</div>
                        </div>
                        <QueryBox
                            words={words}
                            onSearch={handleSearch}
                            queryText={currentQuery}
                        />
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Query Result</h5>
                    </div>
                    <div className="card-body">
                        <pre className="text-monospace mb-0">
                            {result}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default hot(module)(App);