import InputSearch from './inputSearch';
import InputAlumno from './inputAlumno';

var React = require('react');

class StudentsCenter extends React.Component {
    
    render() {
       return (
                <div className='studentsCenterContainer'>
                    <span className="studentsText">Alumnos en centro</span>
>                   <InputSearch/>
                    <div className= "namesStudents">
                        <InputAlumno texto="Vanessa Miranda"/>
                        <InputAlumno texto="Montserrat Mendoza"/>
                        <InputAlumno texto="Marcos Muñoz"/>
                    </div>
                </div>
            );
    }
  }
  export default StudentsCenter;
