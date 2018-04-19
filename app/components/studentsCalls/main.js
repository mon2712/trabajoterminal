import React from 'react';
import NavigationContainer from '../general/navigationContainer';
import ListOfCalls from './listOfCalls';
import CallConfig from './callConfig';
import StudentFile from '../studentFile/main';


class studentsCalls extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.actions.getConfigCallDone();
    }
    render() {
		return (
            <div>
                {this.props.store.configCall.active === true ? <CallConfig {...this.props}/> : null}
                <NavigationContainer texto="Lista de llamadas" path="/menu"/>
                {this.props.store.studentFileInfo !== null ? <StudentFile {...this.props}/> : null}
                <ListOfCalls {...this.props}/>
            </div>
		);
	}
  }
  export default studentsCalls;