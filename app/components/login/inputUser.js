var React = require('react');

class InputUser extends React.Component {
    
    render() {
       return (
        <form>
            <div>
                <input type="text" placeHolder="Usuario"/>
            </div>
        </form>
       );
    }
  }
  export default InputUser;