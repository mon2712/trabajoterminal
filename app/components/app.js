import AppStore from '../data/store';
import React from 'react';
import Header from '../components/header/main';
import Login from '../components/login/main';
import TiempoReducido from './tiempoReducido/main';
import PaymentList from './paymentList/main';
import StudentsCalls from './studentsCalls/main';
import Menu from '../components/menu/main';
import actions from '../data/actions';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import history from '../history';
import UploadFile from './uploadFile/main'


function getAppState() {
    return AppStore.getData();
}

const PrivateRoute = ({ component: Component, store: store, actions: actions}) => (
    <Route render={(props) => (
        localStorage.getItem("code") !== null && localStorage.getItem("code") === "1"
        ? <Component {...store} actions={actions}/>
        : <Redirect to='/login' />
    )} />
)

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            store: getAppState()
        }
        this._onChange = this._onChange.bind(this);
    }
    componentDidMount() {
        actions.confirmLogin();
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
                    <Switch>
                        <PrivateRoute path="/menu" component={Menu} store={this.state} actions={actions}/>
                        <PrivateRoute path="/tiempoReducido" component={TiempoReducido} store={this.state} actions={actions}/>
                        <PrivateRoute path="/llamadasPendientes" component={StudentsCalls} store={this.state} actions={actions}/>
                        <PrivateRoute path="/paymentList" component={PaymentList} store={this.state} actions={actions}/>
                        <PrivateRoute path="/uploadFile" component={UploadFile} store={this.state} actions={actions}/>

                        <Route path="/login" render={(props) => (
                            localStorage.getItem("code") !== null && localStorage.getItem("code") === "1"
                            ? <Redirect to='/menu' />
                            : <Login {...this.state} actions={actions}/>
                        )} />
                        
                        <Route path="/" render={(props) => (
                            localStorage.getItem("code") !== null && localStorage.getItem("code") === "1"
                            ? <Redirect to='/menu' />
                            : <Login {...this.state} actions={actions}/>
                        )} />

                    </Switch>
                </div>
            </Router>

        );
    }
}

export default App;
