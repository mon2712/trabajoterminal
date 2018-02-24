import React from 'react';
import ButtonOptions from '../menu/buttonOptions'
import SearchBar from '../menu/searchBar'
import AppStore from '../../data/store';


class Menu extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
      this.props.actions.getMenuTypes('recepcion');
    }
    render() {
		return (
			<div className='menuContainer'>
                <SearchBar {...this.props} />
				<ButtonOptions {...this.props } type="recepcion"/>
			</div>
		);
	}
  }
  export default Menu;
