import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryBox, QueryExpression, QuerySuggestion } from '../components/QueryBox';

const exampleQueries = [
    {
        title: 'Comparison Operators',
        query: "age >= 25 & salary <= 100000"
    },
    {
        title: 'Text Search',
        query: "company like 'Tech%' & email contains '@company.com' & department startwith 'Dev'"
    },
    {
        title: 'Boolean and Sets',
        query: "isVerified is true & status in ('active', 'pending')"
    },
    {
        title: 'Range Check',
        query: "age between 25 and 35"
    },
    {
        title: 'Logical Operators',
        query: "(department = 'Engineering' & salary > 80000) | (department = 'Sales' & salary > 60000)"
    },
    {
        title: 'Mixed Conditions',
        query: "(company like '%Tech%' | department = 'IT') & age > 21 & isVerified is true"
    }
];

const words: QuerySuggestion[] = [
    { word: 'company', desc: 'Company name', type: 'string' },
    { word: 'age', desc: 'Employee age', type: 'number' },
    { word: 'status', desc: 'Account status', type: 'string', options: ['active', 'pending', 'inactive'] },
    { word: 'isVerified', desc: 'Verification status', type: 'boolean' },
    { word: 'email', desc: 'Email address', type: 'string' },
    { word: 'department', desc: 'Department name', type: 'string' },
    { word: 'salary', desc: 'Annual salary', type: 'number' }
] as const;

const App = () => {
    const [result, setResult] = useState<{
        error: Error | null;
        parsed: QueryExpression | null;
        query: string;
    }>({ error: null, parsed: null, query: '' });

    const handleSearch = (error: Error | null, parsed: QueryExpression | null, query: string) => {
        setResult({ error, parsed, query });
    };

    const handleExampleClick = (query: string) => {
        const queryBoxElement = document.querySelector('.ace_text-input') as HTMLTextAreaElement;
        if (queryBoxElement) {
            queryBoxElement.value = query;
            queryBoxElement.dispatchEvent(new Event('input', { bubbles: true }));
        }
    };

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
                    {exampleQueries.map((example, index) => (
                        <div key={index} className="col-md-6 mb-2">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h6 className="card-title">{example.title}</h6>
                                    <p className="card-text">
                                        <code>{example.query}</code>
                                    </p>
                                    <button 
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => handleExampleClick(example.query)}
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
                        />
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Query Result</h5>
                    </div>
                    <div className="card-body">
                        <pre className="text-monospace mb-0">
                            {result.error ? (
                                `Error: ${result.error.message}`
                            ) : (
                                JSON.stringify(result.parsed, null, 2)
                            )}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
} 