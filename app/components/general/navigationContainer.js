import {Link} from 'react-router-dom';
import React from 'react';

class NavigationContainer extends React.Component {
    
    render() {
        return (
            <div className='navigationContainer'>
                <Link to={this.props.path}>
                    <span className="ico icon-left-arrow"></span>
                </Link>
                <span className="navigationText">{this.props.texto}</span>
            </div>
        );
    }
  }
  export default NavigationContainer;
