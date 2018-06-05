import React from 'react';
import Loader from '../general/loader';
import IncompleteInputs from '../general/incompleteInputs';
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
        this.acceptResponse=this.acceptResponse.bind(this);  
        this.handleChange = this.handleChange.bind(this);
        this.renderDay = this.renderDay.bind(this);
        this.selectType = this.selectType.bind(this);
        this.state = {
            infoAssistant: getInfoAssistant(),
            value: '',
            activeTag: false
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
            activeTag: false,
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
    selectType() {
        var arrayToEdit = this.state.infoAssistant;
        
        if(this.state.infoAssistant.type === "asistente"){
            arrayToEdit["type"] = "recepcionista";
        }else{
            arrayToEdit["type"] = "asistente";
        }
        this.setState({
            arrayToEdit
        })

    }
    sendCreateEdit(){
        console.log("send ", this.state.infoAssistant)
        if(this.state.infoAssistant.type === "asistente"){
            if(this.state.infoAssistant.lastName !== "" && this.state.infoAssistant.name !== "" && this.state.infoAssistant.password !== "" && this.state.infoAssistant.username != "" && this.state.infoAssistant.level !== ""){
                this.props.actions.setAssistant(this.state.infoAssistant)
            }else{
                this.setState({
                    activeTag: true
                });
            }

        }
        if(this.state.infoAssistant.type === "recepcionista"){
            console.log("asistente ")
            if(this.state.infoAssistant.lastName !== "" && this.state.infoAssistant.name !== "" && this.state.infoAssistant.password !== "" && this.state.infoAssistant.username != ""){
                this.props.actions.setAssistant(this.state.infoAssistant)
            }else{
                this.setState({
                    activeTag: true
                });
            }
        }
    }
    acceptResponse(){
        this.props.actions.setResponseEmpty();
    }
    renderDay(day, dayName, value){
        var newValue = (value === "1" ? "0" : "1");
        return(
            <div className="dayContainer">
                <div className={value === "1" || value === "2" ? "checkbox active" : "checkbox"} onClick={()=>this.selectDays(dayName,newValue)}>
                    <span className="ico icon-checkmark"></span>
                </div>
                <span>{value === "2" ? "Desbloquear usuario" : value==="0" && dayName==="status" ? "Usuario activo, para dar de baja de clic aquí" : value==="1" && dayName==="status" ? "Para activar usuario de clic aquí" : day}</span>
            </div>
        );
    }
    renderType(){
        return(
            <div>
                <div className="dayContainer">
                    <div className={this.state.infoAssistant.type === "asistente" ? "checkbox active" : "checkbox"} onClick={this.selectType}>
                        <span className="ico icon-checkmark"></span>
                    </div>
                    <span>Asistente</span>
                </div>
                <div className="dayContainer">
                    <div className={this.state.infoAssistant.type === "recepcionista" ? "checkbox active" : "checkbox"} onClick={this.selectType}>
                        <span className="ico icon-checkmark"></span>
                    </div>
                    <span>Recepcionista</span>
                </div>
            </div>
        );
    }
    renderForm(){
        return(
            <div className="form">
                <div className="status" style={{display: this.props.view === 4 ? 'block' : 'none'}}>
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
                    <input type="text" value={this.state.infoAssistant.username} onChange={this.handleChange} name="username"></input>    
                </div>  
                <span className="leftColumn">Contraseña:</span>
                <div className="rightColumn">
                    <input type="text" type="password" value={this.state.infoAssistant.password} onChange={this.handleChange} name="password"></input>    
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
                    <input type="phone" maxLength="10" value={this.state.infoAssistant.phone} onChange={this.handleChange} name="phone"></input>    
                </div>
                <span className="leftColumn">Entrada: </span>  
                <div className="rightColumn">
                    <input type="time" pattern="[0-9]{2}:[0-9]{2}" min="12:00" max="18:00" value={this.state.infoAssistant.arriveTime} onChange={this.handleChange} name="arriveTime"></input>
                </div>
                <span className="leftColumn"  style={{display: this.props.view === 3 ? 'inline-block' : 'none'}}>Tipo: </span>  
                <div className="rightColumn" style={{display: this.props.view === 3 ? 'inline-block' : 'none'}}>
                    {this.renderType()}
                </div>
                <span className="leftColumn"  style={{display: this.state.infoAssistant.type === "asistente" ? 'inline-block' : 'none'}}>Nivel: </span>  
                <div className="rightColumn level"   style={{display: this.state.infoAssistant.type === "asistente" ? 'inline-block' : 'none'}}>
                    <input type="text" maxLength="3" value={this.state.infoAssistant.level} onChange={this.handleChange} name="level"></input>
                </div>
            </div>
        );
    }
    renderResponse(){
        return(
            <div className="response">
                <div className="message">
                    <span>El usuario con nombre <b>{this.props.store.response.info.name}</b></span>
                    <span><b>{this.props.store.response.info.messageError === "" ? "Se ha creado correctamente" : this.props.store.response.info.messageError}</b></span>
                </div>
                <div className="buttonCreate" onClick={this.props.closePopUp()}>{ "OK" }</div>                
            </div>
        );
    }
    render() {
		return (
            <div className="userInfoContainer">
                {this.state.activeTag === true ? <IncompleteInputs message={"No se han completado todos los campos"}/> : null}
                {
                    this.props.store.response.active === true ? 

                    this.renderResponse()

                    : this.props.store.loader.users === true ? 

                    <Loader {...this.props} /> : 

                    this.renderForm()

                }
                <div className="buttonCreate" style={{display: (this.props.view === 4 || this.props.view === 3)&& this.props.store.response.active === true ? 'none' : 'block'}} onClick={(this.props.view === 4 || this.props.view === 3 ) && this.props.store.response.active === true ? this.acceptResponse : this.sendCreateEdit }>{this.props.view === 3 && this.props.store.response.active === false ? "Crear" : (this.props.view === 4 || this.props.view === 3) && this.props.store.response.active === true ? "OK" : "Editar" }</div>
            </div>
		);
	}
  }
  export default CreateUser;
