import React from 'react';

class IncompleteInputs extends React.Component {
    
    render() {
        return (
            <div className='tagWarning'>
                <span className="ico icon-warning"></span>
                <span className="msg">Llenar todos los campos requeridos</span>
            </div>
        );
    }
  }
  export default IncompleteInputs;