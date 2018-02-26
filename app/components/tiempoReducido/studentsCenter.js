import InputSearch from './inputSearch';
import InputAlumno from './inputAlumno';

var React = require('react');

class StudentsCenter extends React.Component {
    renderList(){
        var studentsAtCenter = this.props.store.studentsAtCenter;
        return studentsAtCenter.map((opt,index)=>(
            <div key={index} className="nameStudent">
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
