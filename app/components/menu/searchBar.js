import React from 'react';

class ButtonOptions extends React.Component {
    
    
    renderSearchBar(){
        return(
            <div className='searchContainer'>
                <span className="ico icon-search"></span>
                <input type="search"/>
                <div className="buttonSearch">Buscar</div>
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