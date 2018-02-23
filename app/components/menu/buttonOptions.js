import React from 'react';

class ButtonOptions extends React.Component {
    
    
    renderButtons(menu){
        //map de menuTypes
        //console.log("en la funcion", this.props.store.store.menuTypes, this.props.type);
        //var menuTypes = this.props.store.store.menuTypes[0];
        console.log("menu", menu);
        return (
			<div className='buttonContainer'>
				<span>icono</span>
                <span>texto</span>
			</div>
		);
    }
	
    render() {
		console.log("this.props en buttonOptions", this.props)
        //{this.renderButtons(this.props.store.menuTypes, this.props.type)}
		
		return (
            <div className="optionsContainer">
              {this.renderButtons(this.props.store)}
            </div>
		);
	}
  }
  export default ButtonOptions;