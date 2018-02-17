import React from 'react';
import InputUser from './inputUser';
import InputPass from './inputPass';

class Login extends React.Component {
    
    render() {
        console.log("Llego al login");
       return (
        <div>
            <span>Usuario:</span>
            <InputUser />
            <span>Contraseña:</span>
            <InputPass />
            <div>
                Aceptar
            </div>
           
        </div>
       );
    }
  }
  export default Login;