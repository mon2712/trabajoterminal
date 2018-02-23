import React from 'react';
import ButtonOptions from '../menu/buttonOptions'
import AppStore from '../../data/store';

function getAppState() {
    return {
      store: AppStore.getData()
    };
}

class Menu extends React.Component {
    constructor(props){
        super(props);        
        //this.state = getAppState();
        this.props.actions.getMenuTypes('recepcion');         
        console.log("en app", this.props.store.user)        
    }
	componentWillMount(){
    }
    render() {
		console.log("this.props en menu", this.props.store.menuTypes)
		
		return (
			<div className='menuContainer'>
				<ButtonOptions {...this.props } type="recepcion"/>
			</div>
		);
	}
  }
  export default Menu;