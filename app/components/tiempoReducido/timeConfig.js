var React = require('react');

class TimeConfig extends React.Component {
    constructor(props){
        super(props);
        this.configTime = this.configTime.bind(this);
    }
    configTime(active,name,id){
        console.log("configTime", active, name, id);
        this.props.actions.getConfigTime(false, id,name);
    }
    render() {
        console.log("Llego al timeConfig.js", this.props);
        return (
            <div className='confTimeContainer'>
                <div className="headerTime">
                    <span className="timeText">Configurar Tiempo</span>
                    <span className="ico icon-multiply" onClick={this.configTime.bind(this,null,null,null)}></span>
                </div>
                <div>
                    <span className="timeText2">Alumno: </span>
                    <span className="timeText2">{this.props.store.configTime.name}</span>
                </div>
                <div>
                    <span className="timeText2">Tiempo: </span>
                    <input type="number"></input>
                    <span className="timeText2"> min</span>
                </div>
                <div className="buttonSetTime">
                <span className="timeText2">Aceptar</span>
                </div>
            </div>
            );
    }
  }
  export default TimeConfig;
