import React from 'react';

class Panel extends React.Component {
    
    
    renderSessionInfo(){
          return(
              <div className="sesionInfoContainer">
                    <span className="ico icon-user-female"></span>
                    <div className="sessionContainer">
                        <span>Hola Edith</span>
                        <div className="logout">Cerrar Sesión</div>
                    </div>
              </div>
          );
    }
	
    render() {
		
		return (
            <div className="panelContainer">
                {this.renderSessionInfo()}
                <div className="notificationsContainer">
                
                </div>
            </div>
		);
	}
  }
  export default Panel;