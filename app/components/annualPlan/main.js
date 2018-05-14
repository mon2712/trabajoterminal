import React from 'react';
import NavigationContainer from '../general/navigationContainer';
import StudentPaymentList from '../paymentList/studentPaymentList';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Exams from '../annualPlan/exams';
import GeneralForm from '../annualPlan/generalForm';
import StartFrequencyForm from '../annualPlan/startFrequencyForm';

class ProyeccionAnual extends React.Component {
    constructor(props){
        super(props);
        this.state={
            infoStudent: "",
            view: 0,
            steps: [
                {
                    tag: "Registro de exámenes",
                    icon: "icon-insert-template"
                },
                {
                    tag: "Desempeño General",
                    icon: "icon-list"
                },
                {
                    tag: "Frecuencia Inicial",
                    icon: "icon-tree"
                },
                {
                    tag: "Proyección Anual",
                    icon: "icon-planning"
                }
            ]
        };
    }
    componentDidMount(){
        console.log("state", this.props.history.location)
        this.props.actions.getFormAnualPlan(this.props.history.location.finalSelection);
        this.setState({
            infoStudent: this.props.history.location.finalSelection.selectedStudent
        })
    }
    renderStudentInfo(){
        return(
            <div className="infoStudentContainer" id="containerInfoStudent">
                <div className="nameStudent">
                    <span className="ico icon-smile"></span>
                    <span className="name">{this.state.infoStudent.name}</span>
                </div>
                <div className="infoContainer">
                    <div className="grade">
                        <span className="tag">Grado Escolar: {this.state.infoStudent.grade}</span>
                    </div>
                    <div className="level">
                        <span className="tag">Nivel de inicio: {this.state.infoStudent.level}</span>
                    </div>
                    <div className="date">
                        <span className="tag">Ingreso: {this.state.infoStudent.startDate}</span>
                    </div>
                    
                </div>
            </div>
        );
    }
    renderNavigationBar(){
        return(
            <div className="navigationBarProcess">
                <div className=""></div>
                <div className="processStatus">
                    <div className={this.state.view === 0 ? 'processIcon active' : 'processIcon'}>
                        <span className="ico icon-insert-template"></span>
                    </div>
                    <span className={this.state.view === 0 ? 'tab active' : 'tab'}>Registro de exámenes</span>
                </div>
                <div className="processStatus">
                    <div className={this.state.view === 1 ? 'processIcon active' : 'processIcon'}>
                        <span className="ico icon-list"></span>
                    </div>
                    <span className={this.state.view === 1 ? 'tab active' : 'tab'}>Desempeño General</span>
                </div>
                <div className="processStatus">
                    <div className={this.state.view === 2 ? 'processIcon active' : 'processIcon'}>
                        <span className="ico icon-tree"></span>
                    </div>
                    <span className={this.state.view === 2 ? 'tab active' : 'tab'}>Frecuencia Inicial</span>
                </div>
                <div className="processStatus">
                    <div className={this.state.view === 3 ? 'processIcon active' : 'processIcon'}>
                        <span className="ico icon-planning"></span>
                    </div>
                    <span className={this.state.view === 3 ? 'tab active' : 'tab'}>Proyección Anual</span>
                </div>
            </div>
        );
    }
    render() {
        console.log("newComponent", this.props.store)
		return (
			<div className='annualPlanContainer'>
                <NavigationContainer texto="Proyección Anual" path='/menu'/>
                {this.state.infoStudent !== "" ? this.renderStudentInfo() : null}
                {
                    this.props.store.annualPlanInfo != null || this.props.store.annualPlanInfo != "" ? 
                    
                    <div className="processContainer">
                        {this.renderNavigationBar()}
                        <div className="formContainer">
                            {
                                this.state.view === 0 ?
                                    <Exams {...this.props} view={this.state.view} finalSelection={this.props.history.location.finalSelection} actions={this.props.actions} />
                                :
                                this.state.view === 1 && this.props.store.annualPlanInfo != null ?
                                    <GeneralForm {...this.props} view={this.state.view} questions={this.props.store.annualPlanInfo[0].generalForm}/>
                                :
                                this.state.view === 2 && this.props.store.annualPlanInfo != null ?
                                    <StartFrequencyForm {...this.props} view={this.state.view}/>
                                :
                                    null
                            }
                        </div>
                    </div> 
                    : 
                    null
                }
			</div>
		);
	}
  }
  
  export default withRouter(ProyeccionAnual);