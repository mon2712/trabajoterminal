import React from 'react';
import NavigationContainer from '../general/navigationContainer';
import StudentPaymentList from '../paymentList/studentPaymentList';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';


class ProyeccionAnual extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        console.log("newComponent", this.props, this.state, this.props.history.location.state)
		return (
			<div className='annualPlanContainer'>
                <NavigationContainer texto="Proyección Anual" path='/menu'/>
                
                
			</div>
		);
	}
  }
  
  export default withRouter(ProyeccionAnual);