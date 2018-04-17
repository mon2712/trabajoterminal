import React from 'react';

class SelectionList extends React.Component {
    constructor(props){
        super(props);
        this.renderList=this.renderList.bind(this);        
        this.renderViewAll=this.renderViewAll.bind(this);        
        this.onSelected=this.onSelected.bind(this);
        this.selectAll=this.selectAll.bind(this);        
        this.sendAllSelected=this.sendAllSelected.bind(this);        
        this.state={
            selectAll: false,
            selected: [],
            people: null
        };
    }
    onSelected(person){
        var arraySelected = this.state.selected;
        console.log("onSelected",person)
        
        var bandera=0, idDelete="", identifier="";


        if(person.idStudent){
            console.log("es alumno")
            
        }else{
            console.log("es asistente")
        }

        if(arraySelected.length === 0){
            arraySelected.push(person);

            this.setState({
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
        /*this.state.selected.map((content,index)=>{
            console.log("los seleccionados fueron ", content)
        });*/
        this.props.actions.createStamp(this.state.selected);
    }
    renderViewAll(){
        return(
            <div className="selectPeople">
                <div className="optionAll">
                    <div className={this.state.selectAll === true ? "checkbox active" : "checkbox"} onClick={this.selectAll}>
                        <span className="ico icon-checkmark"></span>
                    </div>
                    <span>{this.props.view === 1 ? "Generar gafetes de todos los asistentes" : "Generar etiquetas de todos los alumnos"}</span>
                </div>
                <div className="peopleContainer">
                    {this.props.allPeople.map((person, i) => (
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
            <div className="selectionListContainer">
                {this.renderViewAll()}              
            </div>
		);
	}
  }
  export default SelectionList;
