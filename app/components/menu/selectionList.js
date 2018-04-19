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
        if(this.props.view === 1 || this.props.view === 2){
            
            var bandera=0, idDelete="", identifier="";

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
                    arraySelected[idDelete] = {};          
                }

                this.setState({
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
                console.log(arraySelected[0])
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
        if(this.props.view === 1){
            this.props.actions.createIdsAssistants(this.state.selected);            
        }
        if(this.props.view === 2){
            this.props.actions.createStamp(this.state.selected);
        }
        if(this.props.view === 4){
            this.props.actions.getAssistantInfo(this.state.selected);
        }
    }
    
    renderViewAll(){
        return(
            <div className="selectPeople">
                <div className="optionAll" style={{display: this.props.view === 4 ? 'none' : 'block'}}>
                    <div className={this.state.selectAll === true ? "checkbox active" : "checkbox"} onClick={this.selectAll}>
                        <span className="ico icon-checkmark"></span>
                    </div>
                    <span> {this.props.view === 1 ? "Generar gafetes de todos los asistentes" : this.props.view === 2 ?  "Generar etiquetas de todos los alumnos" : ""}</span>
                </div>
                <div className="peopleContainer">
                    {this.props.allPeople.map((person, i) => (
                        this.renderList(person)
                    ))}
                </div>
                <div className="button" onClick={this.sendAllSelected}>
                    {this.props.view === 4 ? "Editar" : "Generar"}
                </div>
            </div>  
        );
    }
    render() {
        console.log("estoy en selectionlist")
		return (
            <div className="selectionListContainer">
                {this.renderViewAll()}              
            </div>
		);
	}
  }
  export default SelectionList;
