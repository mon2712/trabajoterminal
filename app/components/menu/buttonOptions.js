import React from 'react';
import UploadFile from './uploadFile';
import PrintOptions from './printOptions';
import RegisterPayment from '../general/registerPayment';
import SelectionList from './selectionList';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

class ButtonOptions extends React.Component {
    constructor(props){
        super(props);
        this.sendAction=this.sendAction.bind(this);
        this.closePopUp=this.closePopUp.bind(this);
        this.state = {
            popUpActive: false,
            id: ""
        };  
    }
    sendAction(id){
        
        if(id===4){
            this.props.actions.getAllStudents("");
        }

        this.setState({
            popUpActive: true,
            id: id
        });
    }
    closePopUp(){
        this.setState({
            popUpActive: false,
            id: ""
        });
    }
    renderButtons(){
        var menuTypes = this.props.store.menuTypes[this.props.type];
       
        return menuTypes.map((opt, index) => (
            opt.popUp === true ?
            <div className='buttonContainer' key={index} onClick={() => this.sendAction(opt.id)} style={{background: opt.color, border: opt.color}}>
                <span className={"ico "+opt.ico}></span>
                <span>{opt.text}</span>
            </div>
            :
            <Link to={opt.path} key={index}>
            <div className='buttonContainer' style={{background: opt.color, border: opt.color}}>
                <span className={"ico "+opt.ico}></span>
                <span className="textButton">{opt.text}</span>
            </div>
            </Link>
        ));
    }

    render() {
		return (
            <div className="optionsContainer">
               {this.props.store.menuTypes[this.props.type] != undefined ? this.renderButtons() : null}
                {
                    this.state.popUpActive === true && this.state.id===2 ? 
                        <PrintOptions {...this.props} startView={this.state.id} closePopUp={()=>this.closePopUp}/> 
                    :
                    this.state.popUpActive === true && this.state.id===1 ?
                        <UploadFile {...this.props} closePopUp={()=>this.closePopUp}/> 
                    : 
                    this.state.popUpActive == true && this.state.id===3 ?
                        <PrintOptions {...this.props} startView={this.state.id} closePopUp={()=>this.closePopUp} />
                    :
                    this.state.popUpActive == true && this.state.id===4 ?
                        <div className="popUpContainer">
                            <div className='registerPyamentContainer'>
                                <span className="title">Registrar Pago</span>   
                                <span className="icoClose icon-multiply" onClick={this.closePopUp}/>           
                                {this.props.store.students !== "" && this.props.store.students !== null ? <SelectionList {...this.props} allPeople={this.props.store.students} view={5} actions={this.props.actions} closePopUp={()=>this.closePopUp}/> : null }
                            </div>
                        </div>
                    :
                    null
                }                
            </div>
		);
	}
  }
  export default ButtonOptions;
