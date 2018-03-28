var React = require('react');

class InputPass extends React.Component {
    
    render() {
       return (
            <div className="inputLogin">
              <input type="password" placeholder="Contraseña"/>
              <span className="icon-cross"></span>
            </div>
       );
    }
  }
  export default InputPass;