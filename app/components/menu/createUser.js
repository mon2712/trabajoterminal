import React from 'react';
import AppStore from '../../data/store';

function getInfoAssistant() {
    return AppStore.getInfoAssistant();
}

class CreateUser extends React.Component {
    constructor(props){
        super(props);
        this._onChange = this._onChange.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.sendCreateEdit=this.sendCreateEdit.bind(this);  
        this.handleChange = this.handleChange.bind(this);
        this.renderDay = this.renderDay.bind(this);
        this.state = {
            infoAssistant: getInfoAssistant(),
            value: ''
        }
    }
    componentDidMount() {
        AppStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        this.setState({infoAssistant: getInfoAssistant()});
    }
    handleChange(event) {
        var arrayToEdit = this.state.infoAssistant;
        var name= event.target.name;

        arrayToEdit[name] = event.target.value;
        this.setState({
            arrayToEdit
        })

    }
    selectDays(name, value) {
        var arrayToEdit = this.state.infoAssistant;

        arrayToEdit[name] = value;
        this.setState({
            arrayToEdit
        })

    }
    sendCreateEdit(){
        this.props.actions.setAssistant(this.state.infoAssistant)
    }
    renderDay(day, dayName, value){
        console.log("value", value)
        var newValue = (value === "1" ? "0" : value === "2" ? "1" : value==="0" ? "1" : "");
        console.log("newValue", newValue)
        return(
            <div className="dayContainer">
                <div className={value === "1" ? "checkbox active" : "checkbox"} onClick={()=>this.selectDays(dayName,newValue)}>
                    <span className="ico icon-checkmark"></span>
                </div>
                <span>{day}</span>
            </div>
        );
    }
    renderForm(){
        console.log("dias", this.state.infoAssistant)
        return(
            <div className="form">
                <div className="status">
                    {this.renderDay("Activo","status",this.state.infoAssistant.status)}
                </div>  
                <span className="leftColumn">Nombre:</span>
                <div className="rightColumn">
                    <input type="text" value={this.state.infoAssistant.name} onChange={this.handleChange} name="name"></input>    
                </div>   
                <span className="leftColumn">Apellido:</span>
                <div className="rightColumn">
                    <input type="text" value={this.state.infoAssistant.lastName} onChange={this.handleChange} name="lastName"></input>    
                </div>  
                <span className="leftColumn">Usuario:</span>
                <div className="rightColumn">
                    <input type="text" value={this.state.infoAssistant.username} onChange={this.handleChange} name="lastName"></input>    
                </div>  
                <span className="leftColumn">Contraseña:</span>
                <div className="rightColumn">
                    <input type="text" type="password" value={this.state.infoAssistant.password} onChange={this.handleChange} name="lastName"></input>    
                </div>
                <span className="leftColumn">Días:</span>
                <div className="rightColumn days">
                    {this.renderDay("Lunes","lunes",this.state.infoAssistant.lunes)}
                    {this.renderDay("Miércoles","miercoles",this.state.infoAssistant.miercoles)}
                    {this.renderDay("Jueves","jueves",this.state.infoAssistant.jueves)}
                    {this.renderDay("Sábado","sabado",this.state.infoAssistant.sabado)}
                </div>  
                <span className="leftColumn">Telefono:</span>
                <div className="rightColumn">
                    <input type="number" maxLength="10" value={this.state.infoAssistant.phone} onChange={this.handleChange} name="phone"></input>    
                </div>
                <span className="leftColumn">Hora de entrada: </span>  
                <div className="rightColumn">
                    <input type="time" pattern="[0-9]{2}:[0-9]{2}" min="12:00" max="18:00" value={this.state.infoAssistant.arriveTime} onChange={this.handleChange} name="arriveTime"></input>
                </div>
                <span className="leftColumn">Nivel: </span>  
                <div className="rightColumn">
                    <input type="text" value={this.state.infoAssistant.level} onChange={this.handleChange} name="level"></input>
                </div>

                <div className="buttonCreate" onClick={this.sendCreateEdit}>{this.props.view === 3 ? "Crear" : "Editar"}</div>
            </div>
        );
    }
    render() {
		return (
            <div className="userInfoContainer">
                {this.renderForm()}
            </div>
		);
	}
  }
  export default CreateUser;
