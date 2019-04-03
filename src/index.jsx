import React from 'react';
import { func , string} from 'prop-types';
import * as PEG from 'pegjs';
import grammar from './gramma.pegjs';
const pegparser = PEG.generate(grammar);
class QueryBox extends React.PureComponent {
    static propTypes = {
        label: string,
        placeholder: string,
        onSearch: func.isRequired,
        queryText: string
    }
    constructor(props) {
        super(props);
        this.state = {
            result:'',
            err: null
        }
    }

    render(){
        const {err} = this.state;
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">{this.props.label || 'Search'}</span>
                </div>
                <input 
                    id="joy-query-box-input" 
                    type="text" 
                    className={`${err ? 'form-control is-invalid' : 'form-control'}`}
                    aria-label="simple query" 
                    onKeyPress={this.onQueryTextPress} 
                    placeholder={this.props.placeholder || ''} 
                    defaultValue={this.props.queryText || ''} />
                 {err && <div id={`form-feedback-joy-query-box-input`} className="invalid-feedback">
                    {err.message}
                </div>}
            </div>
        )
    }
    onQueryTextPress = e => {
        if(e.key === 'Enter'){
            let err = null;
            let parsed = null;
            let freetext = '';
            try {
                freetext = e.target.value.trim();
                parsed = freetext ? pegparser.parse(e.target.value.trim()): {};
                this.setState({
                    result: JSON.stringify(parsed, null, 2),
                    err: null
                });
            }
            catch(e) {
                err = e;
                this.setState({
                    result: '',
                    err
                })
            } finally{
                this.props.onSearch(err, parsed, freetext);
            }
        }
    }
}

export default QueryBox;
