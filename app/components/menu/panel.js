import React from 'react';
import Notification from '../menu/notification';


class Panel extends React.Component {
    
    renderSessionInfo(){
          return(
              <div className="sesionInfoContainer">
                    <span className="ico icon-user-female"></span>
                    <div className="sessionContainer">
                        <span>Hola Mónica</span>
                        <div className="logout">Cerrar Sesión</div>
                    </div>
              </div>
          );
    }
    render() {
		return (
            <div className="panelContainer">
                {this.renderSessionInfo()}
                <Notification {...this.props}/>
            </div>
		);
	}
  }
  export default Panel;