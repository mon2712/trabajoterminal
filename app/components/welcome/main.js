
import React from 'react';
import AppStore from '../../data/store';
import { BrowserRouter as browserHistory, Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

class Welcome extends React.Component {
    constructor(props){
        super(props);
        this.renderWelcomeStudent=this.renderWelcomeStudent.bind(this);
        this.getRecomendaciones=this.getRecomendaciones.bind(this);
        this.state={
            student: "",
            assistant: "",
            recommendations: "",
        };
    }
    componentDidMount(){
        if(localStorage.getItem("student") && localStorage.getItem("assistant") && localStorage.getItem("recommendations")){
            this.setState({
                student: localStorage.getItem("student"),
                assistant: localStorage.getItem("assistant"),
                recommendations: localStorage.getItem("recommendations")
            });
        }
        var time = new Date().getTime();

        if(new Date().getTime() - time >= 30000){
            window.location.reload(true);
        }
        else {
            setTimeout(function() {
                location.reload();
            }, 30000);
        }
          
    }
    getRecomendaciones(){
        console.log(this.state.recommendations)
        var recom = this.state.recommendations.split("-");
        return(
            <div className="recommendations">
                {
                    recom.map((rec, index) => (
                        <span key={index}>{rec}</span>
                    ))
                }
            </div>
        );
    }
    renderWelcomeStudent(){
        console.log("entra a render")
        return(
            <div className="welcomeMsg">
                <span className="title">Bienvenido</span>
                <div className="nameContainer">
                    <span className="ico icon-smile"></span>
                    <span className="name">{this.state.student}</span>
                </div>
                <span className="inst">Trabajaras con: </span>
                <span className="assistant">{this.state.assistant}</span>
                <span className="titleRecommendations">Recuerda: </span>
                {this.getRecomendaciones()}
            </div>
        );
    }
    render() {
        return (
            <div className='welcomeDiv'>
                {localStorage.getItem("student") && localStorage.getItem("assistant") && localStorage.getItem("recommendations") ? this.renderWelcomeStudent() : null}
            </div>
        );
    }
  }

export default withRouter(Welcome);
