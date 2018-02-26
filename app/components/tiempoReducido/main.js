import React from 'react';
import InputAlumno from './inputAlumno';
import InputSearch from './inputSearch';
import InputTime from './inputTime';
import NavigationContainer from '../general/navigationContainer';
import StudentsCenter from './studentsCenter';
import TimeConfig from './timeConfig';

class TiempoReducido extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.actions.getStudentsAtCenter();
    }
    render() {
		console.log("Llego a tiempo reducido");
		return (
            <div className="tiempoReducidoContainer">
                <div className='topContainer'>
                    <NavigationContainer texto="Tiempo Reducido"/>
                </div>
                <div className='leftContainer'>    
                    <StudentsCenter {...this.props}/>
                </div>
                <div className='rightContainer'> 
                    <TimeConfig />
                </div>
            </div>
		);
	}
  }
  export default TiempoReducido;