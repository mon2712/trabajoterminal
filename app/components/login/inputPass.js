var React = require('react');

class InputPass extends React.Component {
    
    render() {
       return (
         <form>
            <div>
              <input type="password" placeholder="Contraseña"/>
            </div>
          </form>
       );
    }
  }
  export default InputPass;