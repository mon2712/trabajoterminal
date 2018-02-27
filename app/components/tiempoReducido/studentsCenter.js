import InputSearch from './inputSearch';
import TimeConfig from './timeConfig';
var React = require('react');

class StudentsCenter extends React.Component {
    constructor(props){
        super(props);
        this.configTime = this.configTime.bind(this);

    }
    configTime(name,id,hey){
        console.log("configTime", name, id);
        this.props.actions.getConfigTime(true, id,name);
    }
    renderList(){
        var studentsAtCenter = this.props.store.studentsAtCenter;
        return studentsAtCenter.map((opt,index)=>(
            <div key={index} className="nameStudent" onClick={this.configTime.bind(this, opt.name, opt.idStudent)}>
                <span >{index+1}. {opt.name}</span>
            </div>   
        ));

    }  
    render() {
        return (
            <div className='studentsCenterContainer'>
                <span className="studentsText">Alumnos en centro</span>
                    <InputSearch {...this.props}/>
                    <div className= "namesStudents">
                        {this.props.store.studentsAtCenter !== null ? this.renderList() : null}
                    </div>
            </div>
        );
    }
  }
  export default StudentsCenter;
