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
				<span id='title'>Bienvenid<span className="icon-wondering"></span>s</span>
				<span id='instruction'>Ingresa tu usuario y contraseña</span>
                <div>
                <span className="ico icon-warning"></span>
                <span id='errorMessage'>Usuario o contraseña incorrecta</span>
                </div>
				<InputPass /> 
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