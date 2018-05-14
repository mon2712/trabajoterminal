import React from 'react';
import CreateUser from './createUser';
import RegisterPayment from '../general/registerPayment';
import IncompleteInputs from '../general/incompleteInputs';
import { BrowserRouter as browserHistory, Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

class SelectionList extends React.Component {
    constructor(props){
        super(props);
        this.renderList=this.renderList.bind(this);        
        this.renderViewAll=this.renderViewAll.bind(this);        
        this.onSelected=this.onSelected.bind(this);
        this.onSelectedExams=this.onSelectedExams.bind(this);
        this.selectAll=this.selectAll.bind(this);        
        this.deactivateTag = this.deactivateTag.bind(this);
        this.sendAllSelected=this.sendAllSelected.bind(this);  
        this.state={
            selectAll: false,
            selected: [],
            selectedExams: [],
            people: null,
            activeEdit: false,
            activeRegisterPayment: false,
            activeTag: false,
            exams: ["P1","P2","P3","P4","P5","P6"]
        };
    }
    deactivateTag(){
        this.setState({
            activeTag: false
        });
    }
    onSelected(person){
        var arraySelected = this.state.selected;

        if(this.props.view === 1 || this.props.view === 2){
            
            var bandera=0, idDelete="", identifier="";

            if(arraySelected.length === 0){
                arraySelected.push(person);

                this.setState({
                    activeTag: false,
                    selected: arraySelected,
                    selectAll: false
                });

            }else{
                this.state.selected.map((content,index)=>{
                    if(content.idAssistant){
                        if(content.idAssistant==person.idAssistant){
                            bandera=1;
                            idDelete=index;
                        }
                    }else{
                        if(content.idStudent==person.idStudent){
                            bandera=1;
                            idDelete=index;
                        }
                    }
                });

                if(bandera===0){ 
                    arraySelected.push(person);
                }else{
                    delete arraySelected[idDelete];     
                    arraySelected[idDelete] = {};          
                }

                this.setState({
                    activeTag: false,
                    selected: arraySelected,
                    selectAll: false
                });
            }
        }else{
            if(arraySelected.length === 0){
                arraySelected.push(person);
            }else{
                delete arraySelected[0]; 
                arraySelected[0] = person;
            }

            this.setState({
                activeTag: false,
                selected: arraySelected,
                selectAll: false
            });
        }
    }
    onSelectedExams(exam){
        var arraySelected = this.state.selectedExams;
            
            var bandera=0, idDelete="", identifier="";

            if(arraySelected.length === 0){
                arraySelected.push(exam);

                this.setState({
                    activeTag: false,
                    selectedExams: arraySelected,
                    selectAll: false
                });

            }else{
                this.state.selectedExams.map((content,index)=>{
                    if(content==exam){
                        bandera=1;
                        idDelete=index;
                    }
                });

                if(bandera===0){ 
                    arraySelected.push(exam);
                }else{
                    delete arraySelected[idDelete];     
                    arraySelected[idDelete] = "";          
                }

                this.setState({
                    activeTag: false,
                    selectedExams: arraySelected,
                    selectAll: false
                });
            }
    }
    selectAll(){
        var arraySelected = [];

        if(this.state.selectAll === false){

            this.props.allPeople.map((content,index)=>{
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
    renderList(person){
        var active=false;

        this.state.selected.map((content,index)=>{
            if(content.idAssistant){
                if(content.idAssistant === person.idAssistant){
                    active=true;
                }
            }else{
                if(content.idStudent === person.idStudent){
                    active=true;
                }
            }
        });

        return(
            <div className="optionAll" key={person.idAssistant ? person.idAssistant : person.idStudent }>
                <div className={active === true ? "checkbox active" : "checkbox"} onClick={() => this.onSelected(person)}>
                    <span className="ico icon-checkmark"></span>
                </div>
                <span>{person.name}</span>
            </div>
        );
    }
    sendAllSelected(){
        if(this.state.selected.length !== 0){
            if(this.props.view === 1){
                this.props.actions.createIdsAssistants(this.state.selected);            
            }
            if(this.props.view === 2){
                this.props.actions.createStamp(this.state.selected);
            }
            if(this.props.view === 4){
                this.props.actions.getAssistantInfo(this.state.selected, this.props.view);
                this.setState({activeEdit: true});
            }
            if(this.props.view === 55){ //El 55 es para el registro de pagos
                this.setState({activeRegisterPayment: true});
            }
            if(this.props.view === 5){
                var flag=1;
                this.state.selectedExams.map((opt, index) => {
                    if(opt.length === 0){
                        console.log("si esta vacio")
                        //flag=1;
                    }else{
                        console.log("no esta vacio")
                        flag=0;
                    }
                });
                console.log("flag", flag);
                if(flag === 0){
                    var finalSelection = {selectedStudent: this.state.selected[0], selectedExams: this.state.selectedExams};
                    //this.props.actions.getFormAnualPlan(finalSelection);
                    this.props.history.push({
                        pathname: '/proyeccionAnual',
                        selected: this.state.selected[0],
                        finalSelection: finalSelection
                      })
                    //this.props.history.push('/proyeccionAnual',this.state.selected);
                }else{
                    this.setState({
                        activeTag: true
                    });
                }
            }
        }else{
            this.setState({
                activeTag: true
            });
        }
    }
    renderExams(exam, index){
        var active=false;
        
        this.state.selectedExams.map((exams,index2)=>{
            
            if(exams === exam){
                active=true;
            }
            
        });

        return(
                
            <div className="examOption" key={index}>
                <div className={active === true ? "checkbox active" : "checkbox"} onClick={() => this.onSelectedExams(exam)} >
                    <div className="circle"></div>
                </div>
                <div className="text">{exam}</div>
            </div>
        );
    }
    renderViewAll(){
        return(
            <div className="selectPeople">
                {this.state.activeTag === true ? <IncompleteInputs message={this.props.view == 4 || this.props.view ==55 || this.props.view === 1 ? "No se ha seleccionado un usuario" : this.props.view === 5 ? "No se ha seleccionado un alumno o los exámenes realizados" : "No se ha seleccionado un alumno"}/> : null}            
                <div className="optionAll" style={{display: this.props.view === 4 || this.props.view === 55 || this.props.view === 5 || this.props.view === 6 ? 'none' : 'block'}}>
                    <div className={this.state.selectAll === true ? "checkbox active" : "checkbox"} onClick={this.selectAll}>
                        <span className="ico icon-checkmark"></span>
                    </div>
                    <span> {this.props.view === 1 ? "Generar gafetes de todos los usuarios" : this.props.view === 2 ?  "Generar etiquetas de todos los alumnos" : ""}</span>
                </div>
                <div className="peopleContainer">
                    {this.props.allPeople.map((person, i) => (
                        this.renderList(person)
                    ))}
                </div>
                {
                    this.props.view === 5 ? 
                        <div className="examsSelectorContainer">
                            <span className="instructions">Selecciona los examenes que el alumno realizó</span>
                  
                            {this.state.exams.map((exam, i) => (
                                this.renderExams(exam, i)
                            ))}
                        </div>
                    : 
                        null
                }
                <div className="button" onClick={this.sendAllSelected} >
                    {this.props.view === 4 ? "Editar" : this.props.view === 55 ? "Registrar" : this.props.view === 5 ? "Crear" : this.props.view === 6 ? "Consultar" : "Generar"}
                </div>
            </div>  
        );
    }
    render() {
		return (
            <div className="selectionListContainer">
                {
                    this.props.view === 4 && this.state.activeEdit === true ? 

                    <CreateUser {...this.props} selected={this.state.selected} view={this.props.view} actions={this.props.actions}/> 

                    : this.props.view === 55 && this.state.activeRegisterPayment === true ?

                    <RegisterPayment  {...this.props} selected={this.state.selected} update={false} view={this.props.view} actions={this.props.actions} /> :
                    
                    this.renderViewAll()
                }     
            </div>
		);
	}
  }
  export default withRouter(SelectionList);
