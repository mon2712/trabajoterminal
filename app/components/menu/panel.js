import React from 'react';
import Notification from '../menu/notification';
import Loader from '../general/loader';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';


class Panel extends React.Component {
    constructor(props){
        super(props);
        this.closeSession = this.closeSession.bind(this);        
    }
    closeSession(){
        this.props.actions.closeLogin();
    }
    renderSessionInfo(){
          return(
              <div className="sesionInfoContainer">
                    <span className="ico icon-user-female"></span>
                    <div className="sessionContainer">
                        <span className="nameSession" >Hola {this.props.store.authenticationInfo.name}</span>
                        <div className="logout" onClick={this.closeSession}>Cerrar Sesión</div>
                    </div>
              </div>
          );
    }
    render() {
		return (
            <div className="panelContainer">
                {this.props.store.isAuthenticated === true ? this.renderSessionInfo() : null}
                {this.props.store.loader.notification === true ? <Loader {...this.props}/> : <Notification {...this.props}/> }
            </div>
		);
	}
  }
  export default withRouter(Panel);