import React from 'react';
import InputSearch from './inputSearch';
import InputTime from './inputTime';
import NavigationContainer from '../general/navigationContainer';
import StudentsCenter from './studentsCenter';
import TimeConfig from './timeConfig';

class TiempoReducido extends React.Component {
    constructor(props){
        super(props);
        this.state={
            configTime: false
        }
    }
    componentDidMount(){
        this.props.actions.getStudentsAtCenter();
    }
    render() {
		return (
            <div className="tiempoReducidoContainer">
                <div className='topContainer'>
                    <NavigationContainer texto="Tiempo Reducido" path='/menu'/>
                </div>
                <div className='leftContainer'>    
                    <StudentsCenter {...this.props}/>
                </div>
                <div className='rightContainer'> 
                    {this.props.store.configTime.active === true ? <TimeConfig {...this.props}/> : null}
                </div>
            </div>
		);
	}
  }
  export default TiempoReducido;