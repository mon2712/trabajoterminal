import React from 'react';
import StudentFile from '../studentFile/main';
import AppStore from '../../data/store';


class ButtonOptions extends React.Component {
    constructor(props){
        super(props);  
        this.renderStudentFile=this.renderStudentFile.bind(this);           
    }
    renderStudentFile(){
        console.log("buscar boton", this.props);
        this.props.actions.getStudentInfo();
        console.log("props", this.props.store.studentFileInfo)
        //return(<StudentFile/>);
    }
    renderSearchBar(){
        console.log("en render search", this.props)
        return(
            <div className='searchContainer'>
                <span className="ico icon-search"></span>
                <input type="search"/>
                <div className="buttonSearch" onClick={this.renderStudentFile}>Buscar</div>
            </div>
        );    
    }
	
    render() {
		console.log("this search", this.props)
		return (
            <div className="searchBarContainer">
              {this.renderSearchBar()}
            </div>
		);
	}
  }
  export default ButtonOptions;