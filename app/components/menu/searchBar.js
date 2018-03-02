import React from 'react';

class ButtonOptions extends React.Component {
    constructor(props){
        super(props);  
        this.renderStudentFile=this.renderStudentFile.bind(this);           
    }
    renderStudentFile(){
        this.props.actions.getStudentInfo();
    }
    renderSearchBar(){
        return(
            <div className='searchContainer'>
                <span className="ico icon-search"></span>
                <input type="search"/>
                <div className="buttonSearch" onClick={this.renderStudentFile}>Buscar</div>
            </div>
        );    
    }
    render() {
		return (
            <div className="searchBarContainer">
              {this.renderSearchBar()}
            </div>
		);
	}
  }
  export default ButtonOptions;