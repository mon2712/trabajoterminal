import React from 'react';
import {Link} from 'react-router-dom';

class InputSearch extends React.Component {
    
    render() {
       return (
            <div className='searchDiv'>
                  <input type="text"/>
                  <Link to={'/login'}>
                    <span className="ico icon-search"></span>
                  </Link>
            </div>
       );
    }
  }
  export default InputSearch;