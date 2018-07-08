var React = require('react');

class CallConfig extends React.Component {
    constructor(props){
        super(props);
        this.configCall = this.configCall.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setNote = this.setNote.bind(this);  
        this.state = {
            date: "",
            idS: "",
            note: "", 
            old: ""
        };
    }
    
    configCall(active,name,id, status,note, date){
        this.props.actions.getConfigCall(active, name,id,status, note, date);
    }
    setNote(val){
        this.setState({old: val})
        this.props.actions.setNoteCall(this.props.store.configCall.id, this.state.note, this.state.date, this.state.old);
    }
    handleChange(event){
        if (event.target.name === "fecha"){
            this.setState({date: event.target.value});
        }
        if (event.target.name ==="nota"){
            this.setState({note: event.target.value});
        } 
    }

    render() {
        return (
            <div className="popUpContainer">
            <div className='configCallContainer'>
                <div className="headerConfigCall">
                    <span className="callInitialText">Registro de llamada</span>
                    <span className="ico icon-multiply" onClick={() => this.configCall(false,null,null)}></span>
                </div>
                <span className="callText left">Alumno: </span>
                <span className="callText student right">{this.props.store.configCall.name}</span>
                
                <span className="callText left">Fecha: </span>
                <input type="date" name="fecha" value={this.state.date} onChange={this.handleChange}></input>
                
                <span className="callText note">Nota: </span>
                <textarea type="text" name="nota" placeholder="Agregar nota" text={this.state.note} onChange={this.handleChange}></textarea>
                
                <div className="buttonSetNote" onClick={() => this.setNote(false)}>
                    Guardar
                </div>
            </div>
            </div>
            );
    }
  }
  export default CallConfig;

