import React from 'react';
import ButtonOptions from '../menu/buttonOptions';
import SearchBar from '../menu/searchBar';
import Panel from '../menu/panel';
import AppStore from '../../data/store';
import StudentFile from '../studentFile/main';



class Menu extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
      this.props.actions.getMenuTypes();
      this.props.actions.getNotifications();
    }
    render() {
		return (
			<div className='menuContainer'>
                <div className="leftContainerM">
                    <SearchBar {...this.props} />
                    {this.props.store.studentFileInfo !== null ? <StudentFile {...this.props}/> : null}
				    <ButtonOptions {...this.props } type={this.props.store.authenticationInfo.type}/>
                </div>
                <div className="rightContainerM">
                    <Panel {...this.props}/>
                </div>
			</div>
            
		);
	}
  }
  export default Menu;
