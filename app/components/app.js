import AppStore from '../data/store';
import React from 'react';
import Header from '../components/header/main';
import Login from '../components/login/main';
import Menu from '../components/menu/main';
import actions from '../data/actions';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import history from '../history';

/*function getAppState() {
    return {
        store: AppStore.getData()
    };
}*/
function getAppState() {
    return {
      store: AppStore.getData()
    };
}
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = getAppState();
    }
    componentDidMount() {
        //AppStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        //AppStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        //this.setState({store: getAppState()});
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
        const MenuConst = (props) => {
            return (
                <Menu {...this.state} actions={actions} />
            );
        }

        return (
            <Router>
                <div id='generalDiv'>
                    <ul>
                        <li><Link to={'/login'}></Link></li>
                    </ul>
                    <Switch>
                        <Route exact path='/' component={HeaderConst} />
                        <Route path='/login' component={Login} />
                        <Route path='/menu' component={MenuConst} />
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