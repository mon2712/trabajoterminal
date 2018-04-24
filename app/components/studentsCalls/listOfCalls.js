import CallConfig from './callConfig';
import Note from './note';
import StudentFile from '../studentFile/main';

var React = require('react');

class ListOfCalls extends React.Component {
   constructor(props){
        super(props);
        this.renderListNew = this.renderListNew.bind(this);
        this.renderStudentFile=this.renderStudentFile.bind(this);
        this.activateConfigCall = this.activateConfigCall.bind(this);
        this.activateNote = this.activateNote.bind(this);
        this.deactivateNote = this.deactivateNote.bind(this);
        this.renderEmptyCenter = this.renderEmptyCenter.bind(this);
    }
    renderStudentFile(){
        this.props.actions.getStudentInfo();
    }
    activateConfigCall(idStudent, name){
        this.props.actions.getConfigCall(true,name,idStudent);
    }
    activateNote(idStudent, name){
        this.props.actions.getNote(true,name,idStudent);
    }
    deactivateNote(idStudent,name){
        this.props.actions.getNote(false,name,idStudent);
    }
    renderListNew(studentList,type){
        return studentList.map((opt,index)=>(
            <div key={index} className={type==="notDone" && this.props.store.configCall.old===false ? "confCall colorNotDone" : type==="notDone" && this.props.store.configCall.old === true ? "confCall colorOld" : "confCall colorNotDone"}>
                <span className="nameStudent" onClick={this.renderStudentFile}>{index+1}.  {opt.name}</span>
                <span onClick={type==="notDone" ? () => this.activateConfigCall(opt.idStudent, opt.name) : this.props.store.configCallDone.done[index].call.active === true ? () => this.deactivateNote(opt.idStudent, opt.name) : () => this.activateNote(opt.idStudent, opt.name)} className={type==="notDone" ? "ico icon-add-button" : this.props.store.configCallDone.done[index].call.active === true ? "ico icon-multiply" : "ico icon-speech-bubble"}></span>
                {this.props.store.configCallDone.done != null && type==="done" && this.props.store.configCallDone.done[index].call.active === true ? <Note note={this.props.store.configCallDone.done[index].call.note}/> : null }
           </div>      
        ));
    }
    renderEmptyCenter(msg){
        return(
            <div className="noStudents">
                <span className="text"> {msg} </span>
                <span className="icon-smile"></span>
            </div>
        );
    }
    render() {
        return (
            <div className="generalContainer">
                <div className='twoCallContainer' id="leftContainer">
                    <div className='studentsCallContainer'>
                        <span className="studentsText">Por realizar</span>
                            {this.props.store.configCallDone.notDone !== null && this.props.store.configCallDone.notDone !== undefined && this.props.store.configCallDone.notDone.length !==0 ? 
                               <div className= "namesStudents"> 
                                    {this.renderListNew(this.props.store.configCallDone.notDone, "notDone")} 
                                </div>
                                : 
                                this.renderEmptyCenter("No hay llamadas por realizar")
                            }
                    </div>
                </div>
                <div className='twoCallContainer' id="rightContainer">
                    <div className='studentsCallContainer'>
                        <span className="studentsText">Realizadas</span>
                            {this.props.store.configCallDone.done !== null && this.props.store.configCallDone.done !== undefined && this.props.store.configCallDone.done.length !== 0 ?
                                <div className= "namesStudents">
                                    {this.renderListNew(this.props.store.configCallDone.done, "done")}
                                </div> 
                                : 
                                this.renderEmptyCenter("No hay llamadas realizadas")
                            }
                    </div>
                </div>
            </div>
        );
    }
  }
  export default ListOfCalls;