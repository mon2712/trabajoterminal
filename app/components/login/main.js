import React from 'react';
import InputUser from './inputUser';
import InputPass from './inputPass';

class Login extends React.Component {
    
    render() {
		console.log("Llego al login");
		return (
			<div className='loginContainer'>
				<span id='title'>Bienvenidos</span>
				<span id='instruction'>Ingresa tu usuario y contraseña</span>
				<InputUser />
				<InputPass />
				<div className='button'>
					Aceptar
				</div>
				<span id='forgot'>¿Olvidaste tu contraseña?</span>
			</div>
		);
	}
  }
  export default Login;