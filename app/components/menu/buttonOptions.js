import React from 'react';

class ButtonOptions extends React.Component {


    renderButtons(){
        //map de menuTypes

        var menuTypes = this.props.store.menuTypes[this.props.type];
        if (menuTypes == undefined)
          return null;

        return menuTypes.map((opt, index) => (
            <div className='buttonContainer' key={index} style={{background: opt.color, border: opt.color} }>
                <span className={"ico "+opt.ico}></span>
                <span>{opt.text}</span>
            </div>
        ));
    }

    render() {
        //{this.renderButtons(this.props.store.menuTypes, this.props.type)}

		return (
            <div className="optionsContainer">
              {this.renderButtons()}
            </div>
		);
	}
  }
  export default ButtonOptions;
