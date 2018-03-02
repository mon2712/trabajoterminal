import React from 'react';
import NavigationContainer from '../general/navigationContainer';
import ListOfCalls from './listOfCalls';
import CallConfig from './callConfig';
import StudentFile from '../studentFile/main';

class studentsCalls extends React.Component {
    constructor(props){
        super(props);
        this.state={
            configCall: false,
            configCallDone:false,
            note: false,
        }
    }
    componentDidMount(){
        this.props.actions.getConfigCallDone();
    }
    render() {
		return (
            <div>
                <div>
                    {this.props.store.configCall.active === true ? <CallConfig {...this.props}/> : null}
                </div>
                <NavigationContainer texto="Lista de llamadas"/>
                {this.props.store.studentFileInfo !== null ? <StudentFile {...this.props}/> : null}
                <div className="generalContainer">
                    <ListOfCalls {...this.props}/>  
                </div>
            </div>
		);
	}
  }
  export default studentsCalls;