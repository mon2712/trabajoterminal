import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

class Notification extends React.Component {
    constructor(props){
        super(props);        
        this.closeNotification = this.closeNotification.bind(this);        
        this.goToNotification = this.goToNotification.bind(this);        
    }
    closeNotification(){
        console.log("hola");
    }
    goToNotification(obj){

        if(parseInt(obj.idStudent) === 0){
            this.props.history.push({
                pathname: '/llamadasPendientes'
            });
        }else{
            //var obj={}
            this.props.history.push({
                pathname: '/paymentList',
                infoStudent: obj
            });
        }
    }
    renderNotification(){
        var notifications = this.props.store.notifications;

        return notifications.map((opt, index) => (
            //<Link key={index} to={opt.path}>
              <div className='notificationBox' key={index}>
                <div className="iconDiv">
                    <span className={opt.type==="call" ? "icon-call-answer" : "icon-card"}></span>
                </div>
                <div className="infoDiv">
                    <span className="title">{opt.title}</span>
                    <span className="button" onClick={()=>this.goToNotification(opt)}>{opt.button}</span>                  
                </div>
                <span className="ico icon-multiply" onClick={this.closeNotification}></span>
              </div>
            //</Link>
        ));
    }

    render() {
	    return (
            <div className="notificationsContainer">
                {this.props.store.notifications !== null && this.props.store.notifications !== "" && this.props.store.notifications.length !== 0 ? this.renderNotification() : null}
            </div>
		);
    }
  }
  export default withRouter(Notification);
