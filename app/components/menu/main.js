import React from 'react';
import ButtonOptions from '../menu/buttonOptions';
import SearchBar from '../menu/searchBar';
import Panel from '../menu/panel';
import AppStore from '../../data/store';


class Menu extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
      this.props.actions.getMenuTypes('recepcion');
      this.props.actions.getNotifications();
    }
    render() {
		return (
			<div className='menuContainer'>
                <div className="leftContainerM">
                    <SearchBar {...this.props} />
				    <ButtonOptions {...this.props } type="recepcion"/>
                </div>
                <div className="rightContainerM">
                    <Panel {...this.props}/>
                </div>
			</div>
		);
	}
  }
  export default Menu;
