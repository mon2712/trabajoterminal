import store from '../data/store';
import React from 'react';

import Header from '../components/header/main';
import Login from '../components/login/main';

/*var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;*/

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


/*function getStores() {
  return [
    store,
  ];
}

function getState() {
  return {
    todos: store.getState(),
  };
}

export default Container.createFunctional(AppView, getStores, getState);*/

class App extends React.Component {
  
render() {
    return (
        <Router>
          <div>
          <h2>Welcome to React Router Tutorial</h2>
               <ul>
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/login'}>Login</Link></li>
               </ul>

            
              <Switch>
                <Route exact path='/' component={Header} />
                <Route path='/login' component={Login} />
                <Route render={function (){
                    return <p> Not Found </p>
                }} />
              </Switch>
            </div>
        </Router>    
    );
  }
}
export default App;