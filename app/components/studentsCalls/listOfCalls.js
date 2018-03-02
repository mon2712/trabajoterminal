import CallConfig from './callConfig';
import Note from './note';
var React = require('react');

class ListOfCalls extends React.Component {
   constructor(props){
        super(props);
        this.configCall = this.configCall.bind(this);
        this.renderList = this.renderList.bind(this);
        this.n=null;
        this.flag=0;
        this.icon=null;
    }
    configCall(opt,type, num){
        this.flag=num;
        console.log(num, this.flag);
        if(type === 1){
            this.props.actions.getConfigCall(true,opt.name,opt.id,opt.call.note);
            }
            else{
                this.n=opt.name;
                console.log("Entro a la opcion de mostrar nota", this.n,opt.call.note);
                this.props.actions.getNote(true,opt.name, opt.id, opt.call.note);
                if(num === 2){
                    this.flag=0;
                }
            }
    }
    renderList(studentList, idColor, icon, type){
        this.icon=icon;
        return studentList.map((opt,index)=>(
            <div key={index} className="confCall" id={idColor}>
                <div className="nameStudent">
                    <span >{index+1}.{opt.name}</span>
                    <div className="note">
                        {(this.n === opt.name) && (this.props.store.note.active === true) && (this.flag===1) ? (icon="icon-upload3") && <Note {...this.props}/> : (icon=this.icon) && null}
                    </div>
                </div>
                <div className="icono">  
                    <span className={icon} onClick={this.configCall.bind(this, opt, type, this.flag+1)}></span>   
                </div>
           </div>      
        ));
    } 
    render() {
        return (
            <div>
                <div className='twoCallContainer' id="leftContainer">
                    <div className='studentsCallContainer'>
                        <span className="studentsText">Por realizar</span>
                        <div className= "namesStudents">
                                {this.props.store.configCallDone.notDone !== null ? this.renderList(this.props.store.configCallDone.notDone, "colorNotDone", "icon-pencil", 1) : null}
                            </div>
                    </div>
                </div>
                <div className='twoCallContainer' id="rightContainer">
                    <div className='studentsCallContainer'>
                        <span className="studentsText">Realizadas</span>
                        <div className= "namesStudents">
                            {this.props.store.configCallDone.done !== null ? this.renderList(this.props.store.configCallDone.done, "colorDone", "icon-newspaper", 2) : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
  }
  export default ListOfCalls;