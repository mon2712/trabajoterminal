import React from 'react';

class ButtonOptions extends React.Component {
    
    
    renderButtons(){
        //map de menuTypes
        console.log("en la funcion", this.props.store.menuTypes[this.props.type]);
        
        var menuTypes = this.props.store.menuTypes[this.props.type];
        return menuTypes.map((opt, index) => (
            <div className='buttonContainer' key={index} style={{background: opt.color, border: opt.color} }>
                <span>{opt.ico}</span>
                <span>{opt.text}</span>
            </div>
        ));    
    }
	
    render() {
		console.log("this.props en buttonOptions", this.props.store.menuTypes, this.props)
        //{this.renderButtons(this.props.store.menuTypes, this.props.type)}
		
		return (
            <div className="optionsContainer">
              {this.renderButtons()}
            </div>
		);
	}
  }
  export default ButtonOptions;