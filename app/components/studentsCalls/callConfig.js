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
            <div className="popUpContainer">
            <div className='configCallContainer'>
                <div className="headerConfigCall">
                    <span className="callInitialText">Registro de llamada</span>
                    <span className="ico icon-multiply" onClick={this.configCall.bind(this,null,null)}></span>
                </div>
                <span className="callText left">Alumno: </span>
                <span className="callText student right">{this.props.store.configCall.name}</span>
                
                <span className="callText left">Fecha: </span>
                <input type="date"></input>
                
                <span className="callText note">Nota: </span>
                <textarea type="text" placeholder="Agregar nota"></textarea>
                
                <div className="buttonSetNote" onClick={this.configCall.bind(this,null,null,null)}>
                    Guardar
                </div>
            </div>
            </div>
            );
    }
  }
  export default CallConfig;

