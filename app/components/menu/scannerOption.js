
import React from 'react';
import { BrowserRouter as browserHistory, Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

class ScannerOption extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            result: "",
            active: true
        };
    }
    handleChange(event){
        console.log("event ", event.target.value)
        this.setState({
            result: event.target.value
        });
        var res = this.state.result.split("'");
        console.log("res length ", res.length)
        if(res.length === 3){
            console.log("res length es 3")
            console.log(res[0], " ", res[1])
            
            var obj={id: parseInt(res[0]), type: res[1]};
            console.log(obj)
            this.props.actions.setAssistanceStudent(obj);
        }

        
    }
    setString(){
        
    }
    renderScan(){
        return(
            <div className="scanDiv">
                <span className="ico icon-multiply" onClick={this.props.closePopUp()}></span>
                <span className="titleContainer">Escanea código de alumno o usuario</span>
                <div className="scanContainer">
                    <span className="icoQr icon-qrcode"></span>
                    <input type="text" value={this.state.result} onChange={this.handleChange} ></input>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="popUpContainer" style={{display: this.state.active === true ? 'block' : 'none'}}>
                <div className='scannerContainer'>
                    {this.renderScan()}
                </div>
            </div>
        );
    }
  }

  export default withRouter(ScannerOption);