import React from 'react';

class IncompleteInputs extends React.Component {
    
    render() {
        return (
            <div className='tagWarning'>
                <span className="ico icon-warning"></span>
                <span className="msg">{this.props.message}</span>
            </div>
        );
    }
  }
  export default IncompleteInputs;