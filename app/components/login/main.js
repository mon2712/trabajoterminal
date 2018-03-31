import React from 'react';
import InputLogin from './inputLogin';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            password: '',
            code: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.verifyUser = this.verifyUser.bind(this);
    }
    handleChange(event) {
        if(event.target.className=="user")
            this.setState({user: event.target.value});
        else   
            this.setState({password: event.target.value});
    }
    changeColor(){
        this.props.actions.changeValueCode();
    }
    verifyUser(){
        this.props.actions.getUserLogin(this.state.user,this.state.password);
        <Redirect to='/menu' />
    }
    render() {
		return (
			<div className='loginContainer'>
				<span id='title'>Bienvenid<span className="icon-wondering"></span>s</span>
				<span id='instruction'>Ingresa tu usuario y contraseña</span>
                <div className='errorContent' style={{display: this.props.store.authenticationInfo.code === 0 ? 'block' : 'none'}}>
                    <span className="ico icon-warning"></span>
                    <span id='errorMessage'>{this.props.store.authenticationInfo.type ? this.props.store.authenticationInfo.type: ''}</span>
                </div>

				<InputLogin store={this.props.store} type="text" class="user" placeHolder="Usuario" onChange={this.handleChange} onFocus={this.changeColor}/> 
				<InputLogin store={this.props.store} type="password" class="pass" placeHolder="Contraseña" onChange={this.handleChange} onFocus={this.changeColor}/>
                
				<div className='button' onClick={this.verifyUser}> Aceptar </div>
				<span id='forgot'>¿Olvidaste tu contraseña?</span>
			</div>
		);
	}
  }
  export default withRouter(Login);