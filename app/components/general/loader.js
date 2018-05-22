
import React from 'react';
import logo from '../../images/faceBoyWhite.png' 
import { BrowserRouter as browserHistory, Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

class Loader extends React.Component {
    render() {
        return (
            <div className='divLoader'>
                <div className="loader"></div>
            </div>
        );
    }
  }

  export default withRouter(Loader);
