import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';


class StartFrequencyForm extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        //console.log("newComponent", this.props, this.state, this.props.history.location.state)
		return (
			<div className='formContainer'>
                Formulario para la frecuencia de inicio
			</div>
		);
	}
  }
  
  export default withRouter(StartFrequencyForm);