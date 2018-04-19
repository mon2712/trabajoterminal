import React from 'react';

class CreateUser extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
		return (
            <div className="userInfoContainer">
                <span className="leftColumn">Nombre:</span>
                <div className="rightColumn">
                    <input type="text"></input>    
                </div>   
                <span className="leftColumn">Apellido:</span>
                <div className="rightColumn">
                    <input type="text"></input>    
                </div>  
                <span className="leftColumn">Telefono:</span>
                <div className="rightColumn">
                    <input type="number" maxLength="10"></input>    
                </div>  
                <span className="leftColumn">Días:</span>
                <div className="rightColumn">
                        
                </div>
                <span className="leftColumn">Hora de entrada: </span>  
                <div className="rightColumn">
                    <input type="time"></input>
                </div>
                <span className="leftColumn">Nivel: </span>  
                <div className="rightColumn">
                    <input type="text"></input>
                </div>

                <div className="buttonCreate">Crear</div>

            </div>
		);
	}
  }
  export default CreateUser;
