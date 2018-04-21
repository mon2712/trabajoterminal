import React from 'react';
import SelectionList from './selectionList';
import CreateUser from './createUser';
import AppStore from '../../data/store';

class PrintOptions extends React.Component {
    constructor(props){
        super(props);
        this.activeView=this.activeView.bind(this);                
        this.state={
            view: 0,
            selected: []
        };
    }
    activeView(id){
        if(id === 1  || id === 4){
            this.props.actions.getAllAssistants();
        }else if(id === 2){
            this.props.actions.getAllStudents("");
        }else if(id === 3){
            this.props.actions.getAssistantInfo(this.state.selected, id);
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
                {
                    this.props.startView === 2 ?
                        <div>
                            {this.renderButtons("Generar gafetes", "icon-id-card", "#b83a7c",1)}
                            {this.renderButtons("Generar etiquetas", "icon-qrcode", "#FF6B6B",2)}   
                        </div>
                    :
                    this.props.startView === 3 ? 
                        <div>
                            {this.renderButtons("Crear Asistente", "icon-user-male", "#EDAE49",3)}
                            {this.renderButtons("Editar Asistente", "icon-user-male", "#30638E",4)}
                        </div>
                    : null
                }

            </div>  
        );
    }
    render() {
		return (
            <div className="popUpContainer">
                <div className="printOptionsContainer">
                    <div className="headerPrintContainer">
                        <span className="titleContainer">
                            {this.state.view === 0 ? "Selecciona una opción" : 
                            this.state.view === 1 ? "Selecciona los asistentes" : 
                            this.state.view === 2 ?  "Selecciona a los alumnos" : 
                            this.state.view === 3 ? "Crear un Nuevo Asistente" : 
                            this.state.view === 4 ? "Editar Asistente" : ""}
                        </span>
                        <span className="ico icon-multiply" onClick={this.props.closePopUp()}/>
                    </div>
                    {
                        this.props.startView === 2 && this.state.view === 0 ? this.renderDivButtons() 

                        : this.props.startView === 3 && this.state.view === 0 ? this.renderDivButtons()

                        : this.state.view === 1 && this.props.store.assistants !== null 

                        ? <SelectionList {...this.props} allPeople={this.props.store.assistants} view={this.state.view} actions={this.props.actions}/>

                        : this.state.view === 2 && this.props.store.students !== null 

                        ? <SelectionList {...this.props} allPeople={this.props.store.students} view={this.state.view} actions={this.props.actions}/> 

                        : this.state.view === 3

                        ? <CreateUser {...this.props} view={this.state.view} actions={this.props.actions}/>

                        : this.state.view === 4 && this.props.store.assistants !== null 

                        ? <SelectionList {...this.props} allPeople={this.props.store.assistants} view={this.state.view} actions={this.props.actions}/>
                        
                        : null
                    }              
                </div>
            </div>
		);
	}
  }
  export default PrintOptions;
