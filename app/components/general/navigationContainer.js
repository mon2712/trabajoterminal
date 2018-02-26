var React = require('react');

class NavigationContainer extends React.Component {
    
    render() {
       return (
                <div className='navigationContainer'>
                      <span className="ico icon-left-arrow"></span>
                      <span className="navigationText">{this.props.texto}</span>
                </div>
            );
    }
  }
  export default NavigationContainer;
