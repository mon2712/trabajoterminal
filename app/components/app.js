import AppStore from '../data/store';
import React from 'react';
import Login from '../components/login/main';
import TiempoReducido from './tiempoReducido/main';
import PaymentList from './paymentList/main';
import ViewCenter from './viewCenter/main';
import ProyeccionAnual from './annualPlan/main';
import GeneralViewProyeccionAnual from './annualPlan/generalViewAnnualPlan';
import FileStudent from './file/main';
import StudentsCalls from './studentsCalls/main';
import Menu from '../components/menu/main';
import Welcome from '../components/welcome/main';
import actions from '../data/actions';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()


function getAppState() {
    return AppStore.getData();
}

const PrivateRoute = ({ component: Component, store: store, actions: actions}) => (
    <Route render={(props) => (
        localStorage.getItem("code") !== null && localStorage.getItem("code") === "1"
        ? <Component {...store} history={history} actions={actions}/>
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
                        <PrivateRoute path="/llamadasPendientes" component={StudentsCalls}  store={this.state} actions={actions}/>
                        <PrivateRoute path="/paymentList" component={PaymentList}  store={this.state} actions={actions}/>
                        <PrivateRoute path="/vistaCentro" component={ViewCenter} store={this.state} actions={actions}/>
                        <PrivateRoute path="/crearProyeccionAnual" component={ProyeccionAnual} store={this.state} actions={actions}/>
                        <PrivateRoute path="/proyeccionAnual" component={GeneralViewProyeccionAnual} store={this.state} actions={actions}/>
                        <PrivateRoute path="/boleta" component={FileStudent} store={this.state} actions={actions}/>
                        <Route path='/bienvenida' render={(props) => <Welcome {...this.state} actions={actions}/>} />
                            
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
