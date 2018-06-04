import React from 'react';
import NavigationContainer from '../general/navigationContainer';


class ViewCenter extends React.Component {
    constructor(props){
        super(props);
        this.move=this.move.bind(this);
        this.state={
            currentPage: 1,
            position: 0,
            perPage: 4
        }
    }
    componentDidMount() {
        this.props.actions.getStatusCenter();
    }
    renderBarStatus(){
        return(
            <div className="barStatus">
                <div className="status">
                    <div className="statusSize">
                        <span className="circle normal"></span>
                        <span className="text normal">Normal</span>
                    </div>
                    <div className="statusSize">
                        <span className="circle soon"></span>
                        <span className="text soon" >Salida Pronto</span>
                    </div>
                    <div className="statusSize">
                        <span className="circle urgent"></span>
                        <span className="text urgent">Salida Urgente</span>
                    </div>
                    <div className="statusSize">
                        <span className="circle tr">TR</span>
                        <span className="text tr">Tiempo Reducido</span>
                    </div>
                </div>
            </div>
        );
    }
    renderEmptyCenter(){
        return(
            <div className="noStudents">
                <span className="icon-sad"></span>
                <span> No hay Alumnos Aun </span>
            </div>
        );
    }
    renderStudent(student, i){
        console.log("alumno en centro ",  student.timeAtCenter)
        var d = new Date("October 13, 2014 " + student.timeReduced);
        console.log(d)
        return(
            <div className={student.timeAtCenter>=45 && student.timeAtCenter<=60? 'studentContainer soon' : student.timeAtCenter>60 ? 'studentContainer urgent' : 'studentContainer normal'} key={i}>
                <span className="name">{student.name}</span>
                <span className="level">{student.level}</span>
                <span className="tr" style={{display: student.timeReduced === '00:00:00' ? 'none' : 'block'}}>{"TR"}</span>
                <div className="timeCont">
                    <span style={{fontSize: student.timeReduced === '00:00:00' ? '22px' : '18px'}}>{student.lastName}</span>
                    <span className="timeAtCenter" style={{fontSize: student.timeReduced === '00:00:00' ? '22px' : '18px'}}>{Math.ceil(student.timeAtCenter)+' min'}</span>
                    <span className="trTag" style={{display: student.timeReduced === '00:00:00' ? 'none' : 'block', fontSize: student.timeReduced === '00:00:00' ? '22px' : '18px'}}>{"TR: "+d.getMinutes() + "min"}</span>
                </div>
            </div>
        );
    }
    move(movement){

        if(movement=="left"){
            this.setState({
                currentPage: this.state.currentPage-1,
                position: this.state.position-((this.state.perPage*300)+(this.state.perPage*10))             
            })
        }else if(movement=="right"){
            this.setState({
                currentPage: this.state.currentPage+1,
                position: this.state.position+((this.state.perPage*300)+(this.state.perPage*10))
            })
        }

    }
    renderAssistant(){
        var assistants=[]
        assistants = this.props.store.studentsViewCenter.asistentes;
        var numAssis =assistants.length;
        var pages = Math.ceil(numAssis / this.state.perPage);
        return(
            <div className="assistantsContainer"
                style={{
                    width: (( this.state.perPage*300)+( this.state.perPage*10))+'px'
                }}            
            >
                {this.state.currentPage !== 1 ?
                    <div className="arrow left">
                        <span className="icon-left-arrow" onClick={()=>this.move("left")}></span>                    
                    </div>
                    :
                    null
                }
                {this.state.currentPage < pages ?
                    <div className="arrow right">
                        <span className="icon-right-arrow" onClick={()=>this.move("right")}></span>                    
                    </div>
                    :
                    null
                }
                <div className="assistants" 
                    style={{
                        width: ((numAssis*300)+(numAssis*10))+'px',
                        right: this.state.position+'px'
                    }}
                >
                    {assistants.map((opt, index) => (
                        <div className='eachAssistant' key={index}>
                            <div className="headerAssistant">
                                <span className="icon-user-male"></span>
                                <span>{opt.name}</span>
                                <span>{opt.level}</span>
                            </div>
                            {opt.students.map((student, i) => (
                                this.renderStudent(student, i)
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    render() {
		return (
			<div className='centerStateContainer'>
                <NavigationContainer texto="Vista del Centro" path='/menu'/>
                {this.renderBarStatus()}
                {this.props.store.studentsViewCenter != "" ? this.renderAssistant() : this.renderEmptyCenter()}
			</div>
		);
	}
  }
  export default ViewCenter;
