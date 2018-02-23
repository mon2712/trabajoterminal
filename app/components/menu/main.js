import React from 'react';
import ButtonOptions from '../menu/buttonOptions'


class Menu extends React.Component {
    constructor(props){
        super(props);        
		this.props.actions.getMenuTypes('recepcion');        
    }
	
    render() {
		console.log("this.props en menu", this.props)
		
		return (
			<div className='menuContainer'>
				<ButtonOptions {...this.props.store } type="recepcion"/>
			</div>
		);
	}
  }
  export default Menu;