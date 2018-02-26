import React from 'react';
import {Link} from 'react-router-dom';

class Notification extends React.Component {
    constructor(props){
        super(props);        
        this.closeNotification = this.closeNotification.bind(this);        
    }
    closeNotification(){
        console.log("hola");
    }
    renderNotification(){
        var notifications = this.props.store.notifications;
        if (notifications === undefined || "")
            return null;

        return notifications.map((opt, index) => (
            //<Link key={index} to={opt.path}>
              <div className='notificationBox' key={index}>
                <div className="iconDiv">
                    <span className={opt.type==="call" ? "icon-call-answer" : "icon-card"}></span>
                </div>
                <div className="infoDiv">
                    <span className="title">{opt.title}</span>
                    <span className="button">{opt.button}</span>                    
                </div>
                <span className="ico icon-multiply" onClick={this.closeNotification}></span>
              </div>
            //</Link>
        ));
    }

    render() {
	    return (
            <div className="notificationsContainer">
                {this.props.store.notifications !== null ? this.renderNotification() : null}
            </div>
		);
    }
  }
  export default Notification;
