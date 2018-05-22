
import React from 'react';
import logo from '../../images/faceBoy.png' 
import { BrowserRouter as browserHistory, Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

class Loader extends React.Component {
    render() {
        return (
            <div className='loader'>
                <img className="img" src={logo}/>
            </div>
        );
    }
  }

  export default withRouter(Loader);
