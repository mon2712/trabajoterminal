var React = require('react');

class InputAlumno extends React.Component {
    
    render() {
       return (
            <div className="nameStudent">{this.props.texto}</div>
       );
    }
  }
  export default InputAlumno;