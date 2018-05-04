import InputSearch from './inputSearch';
var React = require('react');

class StudentsCenter extends React.Component {
    constructor(props){
        super(props);
        this.configTimeT = this.configTimeT.bind(this);
        this.updateTimeRed = this.updateTimeRed.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: "",
            idS: ""
        };
    }
    configTimeT(name,id, timeRed){
        this.props.actions.getConfigTime(true, id,name, timeRed);
        this.setState({value: timeRed, idS: id});
    }
    configTimeF(name,id, timeRed){
        this.props.actions.getConfigTime(false, id,name, timeRed);
    }
    updateTimeRed(id,timeRed){
        this.props.actions.setTimeRed(id,timeRed);
        this.configTimeF(null,null,null);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    renderList(){
        var studentsAtCenter = this.props.store.studentsAtCenter;
        if(studentsAtCenter === null || studentsAtCenter === undefined){
            return null;
        }
        else{
            return studentsAtCenter.map((opt,index)=>(
                <div key={index} className="nameStudent" onClick={() => this.configTimeT(opt.name, opt.idStudent, opt.timeRed)}>
                    <span >{index+1}. {opt.name}</span>
                </div>   
            ));
        }
    }  
    renderConfigTime(){
        return(
            <div className='confTimeContainer'>
                <div className="headerTime">
                    <span className="timeText">Configurar Tiempo</span>
                    <span className="ico icon-multiply" onClick={() => this.configTimeF(null,null,null)}></span>
                </div>
                <div>
                    <span className="timeText2">Alumno: </span>
                    <span className="timeText2">{this.props.store.configTime.name}</span>
                </div>
                <div>
                    <span className="timeText2">Tiempo: </span>
                    <input type="time" step='300' max='00:55' min='00:00' value={this.state.value} onChange={this.handleChange}></input>
                    <span className="timeText2"> min</span>
                </div>
                <div className="buttonSetTime" onClick={() => this.updateTimeRed(this.state.idS, this.state.value)}>
                    <span className="timeText2">Aceptar</span>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div>
                <div className='leftContainer'>
                    <div className='studentsCenterContainer'>
                        <span className="studentsText">Alumnos en centro</span>
                            <InputSearch {...this.props}/>
                            <div className= "namesStudents">
                                {this.props.store.studentsAtCenter !== null ? this.renderList() : null}
                            </div>
                    </div>
                </div>
                <div className='rightContainer'> 
                        {this.props.store.configTime.active == true ? 
                        this.renderConfigTime()
                        : "00:00"}
                </div>
            </div>
        );
    }
  }
  export default StudentsCenter;
