import React from 'react';
import { BrowserRouter as Redirect} from 'react-router-dom';

class ButtonOptions extends React.Component {
    constructor(props){
        super(props);
        this.sendAction=this.sendAction.bind(this);
        this.statePopUp=this.statePopUp.bind(this);
        this.state = {
            popUpActive: false
        };  
    }
    sendAction(){
        console.log("soy de path y redirecciono");
        //this.setState({popUpActive: false});
        //this.props.actions.getUserLogin("esme","esme");
        <Redirect to='/vistaCentro' />
    }
    statePopUp(){
        console.log("activo el popUp")
        this.setState({popUpActive: true});
    }
    renderButtons(){
        //map de menuTypes
        var menuTypes = this.props.store.menuTypes[this.props.type];
        if (menuTypes == undefined)
          return null;

        return menuTypes.map((opt, index) => (
            <div className='buttonContainer' key={index} onClick={opt.popUp === true ? this.statePopUp : () => this.sendAction(opt.path)} style={{background: opt.color, border: opt.color}}>
                <span className={"ico "+opt.ico}></span>
                <span>{opt.text}</span>
            </div>
        ));
    }

    render() {
		return (
            <div className="optionsContainer">
              {this.renderButtons()}
            </div>
		);
	}
  }
  export default ButtonOptions;
