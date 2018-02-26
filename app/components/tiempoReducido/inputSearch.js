import React from 'react';
import {Link} from 'react-router-dom';

class InputSearch extends React.Component {
    constructor(props){
        super(props);
        this.searchStudent=this.searchStudent.bind(this);
    }
    searchStudent(){
        console.log("Estoy ne searchStudnet");
    }
    render() {
       return (
            <div className='searchDiv'>
                  <input type="text"/>
                  <span className="ico icon-search" onClick={this.searchStudent}></span>
            </div>
       );
    }
  }
  export default InputSearch;