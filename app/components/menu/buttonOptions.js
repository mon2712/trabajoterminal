import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

class ButtonOptions extends React.Component {
    constructor(props){
        super(props);
        this.sendAction=this.sendAction.bind(this);
        this.state = {
            popUpActive: false
        };  
    }
    sendAction(){
        console.log("activo el popUp")
        this.setState({popUpActive: true});
    }
    renderButtons(){
        var menuTypes = this.props.store.menuTypes[this.props.type];
       
        return menuTypes.map((opt, index) => (
            opt.popUp === true ?
            <div className='buttonContainer' key={index} onClick={this.sendAction} style={{background: opt.color, border: opt.color}}>
                <span className={"ico "+opt.ico}></span>
                <span>{opt.text}</span>
            </div>
            :
            <Link to={opt.path} key={index}>
            <div className='buttonContainer' style={{background: opt.color, border: opt.color}}>
                <span className={"ico "+opt.ico}></span>
                <span>{opt.text}</span>
            </div>
            </Link>
        ));
    }

    render() {
		return (
            <div className="optionsContainer">
              {this.props.store.menuTypes[this.props.type] != undefined ? this.renderButtons() : null}
            </div>
		);
	}
  }
  export default ButtonOptions;
