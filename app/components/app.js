import AppStore from '../data/store';
import React from 'react';
import Header from '../components/header/main';
import Login from '../components/login/main';
import TiempoReducido from './tiempoReducido/main';
import StudentsCalls from './studentsCalls/main';
import Menu from '../components/menu/main';
import actions from '../data/actions';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import history from '../history';


function getAppState() {
    return AppStore.getData();
}
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            store: getAppState()
        }
        this._onChange = this._onChange.bind(this);
    }
    componentDidMount() {
        AppStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }
    _onChange() {
       this.setState({store: getAppState()});
    }
    render() {

        return (
            <Router>
                <div id='generalDiv'>
                    <ul>
                        <li><Link to={'/login'}></Link></li>
                    </ul>
                    <Switch>
                        <Route exact path='/' render={(props) => <Header {...this.state} />} />
                        <Route path='/login' component={Login} />
                        <Route path='/tiempoReducido' render={(props) => <TiempoReducido {...this.state} actions={actions}/>} />
                        <Route path='/menu' render={(props) => <Menu {...this.state} actions={actions}/>} />
                        <Route path='/llamadasPendientes' render={(props) => <StudentsCalls {...this.state} actions={actions}/>} />
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
