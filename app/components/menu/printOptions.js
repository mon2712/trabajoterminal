import React from 'react';

class PrintOptions extends React.Component {
    constructor(props){
        super(props);
        this.activeView=this.activeView.bind(this);        
        this.renderList=this.renderList.bind(this);        
        this.state={
            view: 0,
            asistentes: [
                {
                    id: "1",
                    name: "Montse Mendoza"
                },
                {
                    id: "2",
                    name: "Vanessa Miranda"
                },
                {
                    id: "3",
                    name: "Marcos Muñoz"
                }
            ],
            selected: []
        };
    }
    activeView(id){
        console.log(id);
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
    renderList(student, i){
        console.log(student)
        return(
            <div className="optionAll" key={i}>
                <div className="checkbox">
                    <span className="ico icon-checkmark"></span>
                </div>
                <span>{student}</span>
            </div>
        );
    }
    renderViewAll(){
        return(
            <div className="selectPeople">
                <div className="optionAll">
                    <div className="checkbox">
                        <span className="ico icon-checkmark"></span>
                    </div>
                    <span>Generar Gafetes de todos los asistentes</span>
                </div>
                <div>
                    {this.state.asistentes.map((student, i) => (
                        this.renderList(student.name, i)
                    ))}
                </div>
                <div className="button">
                    Generar
                </div>
            </div>  
        );
    }
    render() {
        console.log("div", this.state.view)
		return (
            <div className="popUpContainer">
                <div className="printOptionsContainer">
                    <div className="headerPrintContainer">
                        <span className="titleContainer">{this.state.view === 0 ? "Selecciona una opción" : "Selecciona los asistentes"}</span>
                        <span className="ico icon-multiply" onClick={this.props.closePopUp()}/>
                    </div>
                    {this.state.view === 0 ? this.renderDivButtons() : this.state.view === 1 ? this.renderViewAll() : null}              
                </div>
            </div>
		);
	}
  }
  export default PrintOptions;
