import React from 'react';
import InputAlumno from './inputAlumno';
import InputSearch from './inputSearch';
import InputTime from './inputTime';

class TiempoReducido extends React.Component {
    
    render() {
		console.log("Llego a tiempo reducido");
		return (
            <div className='generalContainer'>
                <div className='navigationContainer'>
                    <div className='buttonBack'>
                    </div>
                    <span id='title'>Tiempo reducido</span>
                </div>
                <div className='alumnosCentroContainer'>
                    <span id='title'>Alumnos en centro</span>
                    <InputSearch />
                    <InputAlumno />
                    <InputAlumno />
                    <InputAlumno />
                    <InputAlumno />
                </div>
                <div className='confTimeContainer'>
                    <span id='title'>Configurar tiempo</span>
                    <InputTime />
                </div>
            </div>
		);
	}
  }
  export default TiempoReducido;