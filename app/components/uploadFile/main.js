import React from 'react';
//import InputSearch from './inputSearch';
//import InputTime from './inputTime';
//import NavigationContainer from '../general/navigationContainer';
//import StudentsCenter from './studentsCenter';

class TiempoReducido extends React.Component {
    constructor(props){
        super(props);
        this.state={
            configTime: false
        }
    }
    componentDidMount(){
        this.props.actions.getStudentsAtCenter(' ');
    }
    render() {
		return (
            <div className="tiempoReducidoContainer">
                <div className='topContainer'>
                    <NavigationContainer texto="Tiempo Reducido" path='/menu'/>
                </div>
                <div >    
                    <StudentsCenter {...this.props}/>
                </div>
                
            </div>
		);
	}
  }
  export default TiempoReducido;