
import React from 'react';
import AppStore from '../../data/store';
import { BrowserRouter as browserHistory, Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

function getAppState() {
    return AppStore.getWelcomeInfo();
}

class Welcome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            welcomeInfo: getAppState()
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
       this.setState({welcomeInfo: getAppState()});
    }
    renderWelcomeStudent(){
        return(
            <div>
                Bienvenido estudiante
            </div>
        );
    }
    renderWelcomeAssistant(){
        return(
            <div>
                Bienvenido asistente
            </div>
        );
    }
    render() {
        console.log("props ", this.props)
        return (
            <div className='divLoader'>
                {this.props.store.welcomeInfo !== null ? this.renderWelcomeStudent() : null}
            </div>
        );
    }
  }

export default withRouter(Welcome);
