import React from 'react';
import { ENGINE_METHOD_DIGESTS } from 'constants';
import SelectionList from './selectionList';

class PrintOptions extends React.Component {
    constructor(props){
        super(props);
        this.activeView=this.activeView.bind(this);        
        this.renderList=this.renderList.bind(this);        
        this.renderViewAll=this.renderViewAll.bind(this);        
        this.onSelected=this.onSelected.bind(this);
        this.selectAll=this.selectAll.bind(this);        
        this.sendAllSelected=this.sendAllSelected.bind(this);        
        this.state={
            view: 0,
            selectAll: false,
            selected: [],
            allPeople: null
        };
    }
    componentDidMount(){
        //this.props.actions.getAllAssistants();        
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
    onSelected(person){
        var arraySelected = this.state.selected;
        
        var bandera=0, idDelete="";
        if(arraySelected.length === 0){
            arraySelected.push(person);

            this.setState({
                selected: arraySelected,
                selectAll: false
            });

        }else{
            this.state.selected.map((content,index)=>{
                if(content.idAssistant==person.idAssistant){
                    bandera=1;
                    idDelete=index;
                }
            });

            if(bandera===0){ 
                arraySelected.push(person);
            }else{
                delete arraySelected[idDelete];                
            }

            this.setState({
                selected: arraySelected,
                selectAll: false
            });
        }
    }
    selectAll(){
        var arraySelected = [];

        if(this.state.selectAll === false){

            this.props.store.assistants.map((content,index)=>{
                arraySelected.push(content);
            });

            this.setState({
                selected: arraySelected,
                selectAll: !this.state.selectAll
            });

        }else{
            this.setState({
                selected: [],
                selectAll: !this.state.selectAll
            });
        }
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
    renderList(person){
        var active=false;

        this.state.selected.map((content,index)=>{
            if(content.idAssistant === person.idAssistant){
                active=true;
            }
        });

        return(
            <div className="optionAll" key={person.idAssistant}>
                <div className={active === true ? "checkbox active" : "checkbox"} onClick={() => this.onSelected(person)}>
                    <span className="ico icon-checkmark"></span>
                </div>
                <span>{person.name}</span>
            </div>
        );
    }
    sendAllSelected(){
        this.state.selected.map((content,index)=>{
            console.log("los seleccionados fueron ", content)
        });
    }
    renderViewAll(){
        //console.log(people)
        console.log("people state", this.state.allPeople)
        return(
            <div className="selectPeople">
                <div className="optionAll">
                    <div className={this.state.selectAll === true ? "checkbox active" : "checkbox"}onClick={this.selectAll}>
                        <span className="ico icon-checkmark"></span>
                    </div>
                    <span>{this.state.view === 1 ? "Generar gafetes de todos los asistentes" : "Generar etiquetas de todos los alumnos"}</span>
                </div>
                <div className="peopleContainer">
                    {this.props.store.assistants.map((person, i) => (
                        this.renderList(person)
                    ))}
                </div>
                <div className="button" onClick={this.sendAllSelected}>
                    Generar
                </div>
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
