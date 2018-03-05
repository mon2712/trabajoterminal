import React from 'react';
import InputUser from './inputUser';
import InputPass from './inputPass';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {browserHistory} from 'react-router';

import {withRouter} from "react-router-dom";

class Login extends React.Component {
	verifyUser(){
		return(
			<div>
       			
			</div>
		)
    }
    
    render() {
		return (
			<div className='loginContainer'>
				<span id='title'>Bienvenidos</span>
				<span id='instruction'>Ingresa tu usuario y contraseña</span>
				<InputUser />
				<InputPass />
				<div className='button'>
					<Link to={'/menu'}>Aceptar</Link>
				</div>
				<span id='forgot'>¿Olvidaste tu contraseña?</span>
			</div>
		);
	}
  }
  export default withRouter(Login);