
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
    }
    getRecomendaciones(){
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

        return(
            <div className="welcomeMsg">
                <span className="title">Bienvenido</span>
                <span className="name">{this.state.student}</span>
                <span className="inst">Trabajaras con: </span>
                <span className="assistant">{this.state.assistant}</span>
                <span className="titleRecommendations">Recuerda que: </span>
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
