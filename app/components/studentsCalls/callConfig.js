var React = require('react');

class CallConfig extends React.Component {
    constructor(props){
        super(props);
        this.configCall = this.configCall.bind(this);
    }
    configCall(active,name,id, status,note){
        this.props.actions.getConfigCall(false, name,id,status);
    }

    render() {
        return (
            <div className="frontContainer">
            <div className='configCallContainer'>
                <div className="headerConfigCall">
                    <span className="callInitialText">Registro de llamada</span>
                    <span className="ico icon-multiply" onClick={this.configCall.bind(this,null,null)}></span>
                </div>
                <div>
                    <span className="callText">Alumno: </span>
                    <span className="callText">{this.props.store.configCall.name}</span>
                </div>
                <div>
                    <span className="callText">Fecha: </span>
                    <input type="date"></input>
                </div>
                <div>
                    <span className="callText">Nota: </span>
                </div>
                <div>
                    <textarea type="text" placeholder="Agregar nota"></textarea>
                </div>
                <div className="buttonSetNote">
                <span className="callText" onClick={this.configCall.bind(this,null,null,null)}>Guardar</span>
                </div>
            </div>
            </div>
            );
    }
  }
  export default CallConfig;

