import AppStore from '../data/store';
import React from 'react';

import Header from '../components/header/main';
import Login from '../components/login/main';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


/*function getStores() {
  return [
    store,
  ];
}*/

class App extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
        let storeData = AppStore.getData();
        if (storeData != null) {
            this.setState({store: storeData});
        }
    }
    render() {
        console.log("this.state componente papa", this.state);
        
        const HeaderConst = (props) => {
            return (
              <Header 
                {...this.state}
              />
            );
          }

        return (
            <Router>
            <div>
                    <h2>Welcome to React Router Tutorial</h2>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/login'}>Login</Link></li>
                    </ul>

                
                <Switch>
                    <Route exact path='/' component={HeaderConst} />
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