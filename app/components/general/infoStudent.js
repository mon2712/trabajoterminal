import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

class InfoStudent extends React.Component {
    renderStudentInfo(){
        return(
            <div className="infoStudentContainer" id="containerInfoStudent">
                <div className="nameStudent">
                    <span className="ico icon-smile"></span>
                    <span className="name">{this.props.infoStudent.name}</span>
                </div>
                <div className="infoContainer">
                    <div className="grade">
                        <span className="tag">Grado Escolar: {this.props.infoStudent.grade}</span>
                    </div>
                    <div className="level">
                        <span className="tag">Nivel de inicio: {this.props.infoStudent.level}</span>
                    </div>
                    <div className="date">
                        <span className="tag">Ingreso: {this.props.infoStudent.startDate}</span>
                    </div>
                    
                </div>
            </div>
        );
    }
    render() {
        //this.props.annualPlanInfo
		return (
			<div className="">
                {this.props.infoStudent !== "" ? this.renderStudentInfo() : null}
			</div>
		);
	}
  }
  
  export default withRouter(InfoStudent);