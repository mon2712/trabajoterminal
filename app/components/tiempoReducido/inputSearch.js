import React from 'react';
import {Link} from 'react-router-dom';

class InputSearch extends React.Component {
    constructor(props){
        super(props);
        this.displayResult=this.displayResult.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state = {
            value: ""
        };
    }
    displayResult(event){
        var tecla = event.keyCode;
        if(tecla === 32 || tecla === 13 || tecla === undefined){
            this.props.actions.getStudentsAtCenter(this.state.value); 
        }
    }
    handleChange(event){
        this.setState({value: event.target.value});
    }

    render() {
       return (
            <div className='searchDiv'>
                  <input type="text" onChange={this.handleChange} onKeyDown={this.displayResult}/>
                  <span className="ico icon-search" onClick={this.displayResult}></span>
            </div>
       );
    }
  }
  export default InputSearch;