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
            note: ""
        };
    }
    
    configCall(active,name,id, status,note, date){
        this.props.actions.getConfigCall(active, name,id,status, note, date);
    }
    setNote(active,name,id, status,note, date){
        console.log("antes del store active: ", active, "nombre: ", name, "id: ", id, "status: ", status, "nota: ", note, "date: ", date);
        this.props.actions.setNoteCall(id, note, date);
        //this.configCall(active, name,id,status, note, date); 
    }
    handleChange(event){
        if (event.target.name === "fecha"){
            this.setState({date: event.target.value});
            //console.log("nombre del componente: ", event.target.name,"date event: ", event.target.value, " date state: ",this.state.date, " note state: ",this.state.note);
        }
        if (event.target.name ==="nota"){
            this.setState({note: event.target.value});
            //console.log("nombre del componente: ", event.target.name,"note event: ", event.target.value, " note state: ",this.state.note, " date state: ",this.state.date);
        } 
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
                <input type="date" name="fecha" value={this.state.date} onChange={this.handleChange}></input>
                
                <span className="callText note">Nota: </span>
                <textarea type="text" name="nota" placeholder="Agregar nota" text={this.state.note} onChange={this.handleChange}></textarea>
                
                <div className="buttonSetNote" onClick={() => this.setNote(false, this.props.store.configCall.name, this.props.store.configCall.id, "done", this.state.note, this.state.date)}>
                    Guardar
                </div>
            </div>
            </div>
            );
    }
  }
  export default CallConfig;

