import React from 'react';
import NavigationContainer from '../general/navigationContainer';
import ListOfCalls from './listOfCalls';
import CallConfig from './callConfig';

class studentsCalls extends React.Component {
    constructor(props){
        super(props);
        this.state={
            configCall: false,
            configCallDone:false
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
                <div className="fourContainers">
                    <NavigationContainer texto="Lista de llamadas"/>
                    <ListOfCalls {...this.props}/>  
                </div>
            </div>
		);
	}
  }
  export default studentsCalls;