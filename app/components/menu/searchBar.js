import React from 'react';

class ButtonOptions extends React.Component {
    constructor(props){
        super(props);  
        this.renderStudentFile=this.renderStudentFile.bind(this);
        this.displayResult=this.displayResult.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state={
            textInput: "",
            listActive: false
        }    
    }
    renderStudentFile(id){
        this.props.actions.getStudentInfo(id);
        this.setState({
            listActive: false,
            textInput: ""
        });
    }
    displayResult(event){
        var tecla = event.keyCode;
        if(tecla === 32 || tecla === 13 || tecla === undefined){
            this.props.actions.getAllStudents(this.state.textInput);
            this.setState({listActive: true});
        }
        if(tecla === 8 && this.state.textInput === ""){
            this.setState({listActive: false})
        }else{
            //mandar a llamar la busqueda 
            this.props.actions.getAllStudents(this.state.textInput);
        }
    }
    handleChange(event){
        this.setState({textInput: event.target.value});        
    }
    renderStudentsList(){
        console.log("renderStudentList",this.props.store.students)
        if(this.props.store.students !== ""){
            return this.props.store.students.map((opt, index) => (
                <div className='student' key={index} onClick={() => this.renderStudentFile(opt.idStudent)}>
                    <span>{opt.name}</span>
                </div>
            ));
        }else{
            return(
                <div className='student'>
                    <span>No hay alumnos</span>
                </div>
            );
        }
    }
    renderSearchBar(){
        return(
            <div className='searchContainer'>
                <span className="ico icon-search"></span>
                <input type="search" value={this.state.textInput} onKeyDown={this.displayResult} onChange={this.handleChange}/>
                <div className="studentsListContainer" style={{display: this.state.listActive===false ? 'none' : 'block'}}>
                    {this.state.listActive===false ? null : this.renderStudentsList()}
                </div>
                <div className="buttonSearch" onClick={this.renderStudentFile}>Buscar</div>
            </div>
        );    
    }
    render() {
		return (
            <div className="searchBarContainer">
              {this.renderSearchBar()}
            </div>
		);
	}
  }
  export default ButtonOptions;