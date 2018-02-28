import CallConfig from './callConfig';
var React = require('react');

class ListOfCalls extends React.Component {
   constructor(props){
        super(props);
        this.configCall = this.configCall.bind(this);
        this.renderList = this.renderList.bind(this);
    }
    configCall(name,id,status){
        this.props.actions.getConfigCall(true,name,id,status);
    }
    renderList(studentList){
        return studentList.map((opt,index)=>(
            <div key={index} className="confCall">
                <div className="nameStudent" id="nameStudentNoCalled">
                    <span >{index+1}. {opt.name}</span>
                </div>   
                <span className="icono icon-pencil2" id="icono1" onClick={this.configCall.bind(this, opt.name, opt.idStudent, opt.status)}></span>
            </div>
        ));
    }  
    render() {
        return (
            <div>
                <div className='studentsCallContainer'>
                    <span className="studentsText">Por realizar</span>
                        <div className= "namesStudents">
                                {this.props.store.configCallDone.done !== null ? this.renderList(this.props.store.configCallDone.done) : null}
                        </div>
                </div>
                <div className='studentsCallContainer'>
                    <span className="studentsText">Realizadas</span>
                    <div className= "namesStudents">
                        {this.props.store.configCallDone.notDone !== null ? this.renderList(this.props.store.configCallDone.notDone) : null}
                    </div>
                </div>
            </div>
        );
    }
  }
  export default ListOfCalls;