var React = require('react');

class InputPass extends React.Component {
    
    render() {
       return (
         <form>
            <div>
              <input type="password" placeHolder="Contraseña"/>
            </div>
          </form>
       );
    }
  }
  export default InputPass;