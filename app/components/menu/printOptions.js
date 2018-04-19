import React from 'react';
import { ENGINE_METHOD_DIGESTS } from 'constants';
import SelectionList from './selectionList';

class PrintOptions extends React.Component {
    constructor(props){
        super(props);
        this.activeView=this.activeView.bind(this);                
        this.state={
            view: 0
        };
    }
    activeView(id){
        if(id === 1){
            this.props.actions.getAllAssistants();
        }else{
            this.props.actions.getAllStudents("");
        }
        this.setState({
            view: id
        });

    }
    renderButtons(name, icon, color, id){
        return(
            <div className='buttonContainer' onClick={() => this.activeView(id)} style={{background: color, border: color}}>
                <span className={"ico " + icon}></span>
                <span>{name}</span>
            </div>
        );
    }
    renderDivButtons(){
        return(
            <div className="divButtons">
                {this.renderButtons("Generar gafetes", "icon-id-card", "#b83a7c",1)}
                {this.renderButtons("Generar etiquetas", "icon-qrcode", "#633aba",2)}    
            </div>  
        );
    }
    render() {
		return (
            <div className="popUpContainer">
                <div className="printOptionsContainer">
                    <div className="headerPrintContainer">
                        <span className="titleContainer">{this.state.view === 0 ? "Selecciona una opción" : this.state.view === 1 ? "Selecciona los asistentes" : "Selecciona a los alumnos"}</span>
                        <span className="ico icon-multiply" onClick={this.props.closePopUp()}/>
                    </div>
                    {this.state.view === 0 ? this.renderDivButtons() : this.state.view === 1 && this.props.store.assistants !== null ? <SelectionList allPeople={this.props.store.assistants} view={this.state.view} actions={this.props.actions}/> : this.state.view === 2 && this.props.store.students !== null ? <SelectionList allPeople={this.props.store.students} view={this.state.view} actions={this.props.actions}/> : null}              
                </div>
            </div>
		);
	}
  }
  export default PrintOptions;
