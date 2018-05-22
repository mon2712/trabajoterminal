import React from 'react';
import NavigationContainer from '../general/navigationContainer';
import StudentPaymentList from '../paymentList/studentPaymentList';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Exams from '../annualPlan/exams';
import GeneralForm from '../annualPlan/generalForm';
import InfoStudent from '../general/infoStudent';
import StartFrequencyForm from '../annualPlan/startFrequencyForm';
import AnnualPlanView from '../annualPlan/annualPlanView';

class ProyeccionAnual extends React.Component {
    constructor(props){
        super(props);
        this.activePopUp = this.activePopUp.bind(this);
        this.acceptExit = this.acceptExit.bind(this);
        this.closeExit = this.closeExit.bind(this);
        this.state={
            infoStudent: "",
            view: 0,
            newHeight: 1,
            activePopUp: false,
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
    activePopUp(){
        if(this.props.store.annualPlanResults.view === 0 || this.props.store.annualPlanResults.view === 1 || this.props.store.annualPlanResults.view === 2){
            this.setState({
                activePopUp: !this.state.activePopUp
            })
        }else{
            this.props.actions.cleanAnnualPlan();
            this.props.history.push({
                pathname: '/menu'
            });
        }
    }
    acceptExit(){
        this.props.actions.cleanAnnualPlan();
        this.props.history.push({
            pathname: '/menu'
        });
    }
    closeExit(){
        this.setState({
            activePopUp: !this.state.activePopUp
        })
    }
    renderNavigationButton(){
        return(
            <div className='navigationContainer'>
                <span className="ico icon-left-arrow" onClick={this.activePopUp}></span>
                <span className="navigationText">Proyección Anual</span>
            </div>
        );
    }
    renderWarning(){
        return(
            <div className="popUpContainer">
                <div className="warningPopUp">
                    <div className="warningMsg">
                        <span className="ico icon-warning"></span>
                        <span className="text">Sí sales en este punto del proceso perderás todos tus cambios. ¿Estas seguro de querer salir?</span>
                    </div>
                   <div className="buttonContainer">
                        <div className="button" onClick={this.acceptExit}>Aceptar</div>
                        <div className="button" onClick={this.closeExit}>Cancelar</div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount(){
        if(this.props.history.location.finalSelection){
            this.props.actions.getFormAnualPlan(this.props.history.location.finalSelection);
            this.setState({
                infoStudent: this.props.history.location.finalSelection.selectedStudent
            });
        }else{
            this.props.history.push({
                pathname: '/menu'
              });
        }
    }
    renderNavigationBar(){
        var h = this.state.infoStudent != "" ? document.getElementById('containerInfoStudent').clientHeight : 0;
        
        return(
            <div className="navigationBarProcess"
                style={{
                    marginTop: ((h/2)+15)+'px'
                }}
            >
                <div className="stepTitle">Pasos:</div>
                <div className="processStatus">
                    <div className={this.props.store.annualPlanResults.view === 0 ? 'processIcon active' : 'processIcon'}>
                        <span className="ico icon-insert-template"></span>
                    </div>
                    <span className={this.props.store.annualPlanResults.view === 0 ? 'tab active' : 'tab'}>Registro de exámenes</span>
                </div>
                <div className="processStatus">
                    <div className={this.props.store.annualPlanResults.view === 1 ? 'processIcon active' : 'processIcon'}>
                        <span className="ico icon-list"></span>
                    </div>
                    <span className={this.props.store.annualPlanResults.view === 1 ? 'tab active' : 'tab'}>Desempeño General</span>
                </div>
                <div className="processStatus">
                    <div className={this.props.store.annualPlanResults.view === 2 ? 'processIcon active' : 'processIcon'}>
                        <span className="ico icon-tree"></span>
                    </div>
                    <span className={this.props.store.annualPlanResults.view === 2 ? 'tab active' : 'tab'}>Frecuencia Inicial</span>
                </div>
                <div className="processStatus">
                    <div className={this.props.store.annualPlanResults.view === 3 ? 'processIcon active' : 'processIcon'}>
                        <span className="ico icon-planning"></span>
                    </div>
                    <span className={this.props.store.annualPlanResults.view === 3 ? 'tab active' : 'tab'}>Proyección Anual</span>
                </div>
            </div>
        );
    }
    render() {
        var h = document.getElementById('containerInfoStudent') ? document.getElementById('containerInfoStudent').clientHeight : 0;
        
		return (
			<div className='annualPlanContainer'>
                {this.renderNavigationButton()}
                {this.state.infoStudent !== "" ? <InfoStudent infoStudent={this.state.infoStudent}/> : null}
                {
                    this.props.store.annualPlanInfo != null || this.props.store.annualPlanInfo != "" ? 
                    
                    <div className="processContainer">
                        {this.state.infoStudent !== null && this.state.infoStudent !== "" && document.getElementById('containerInfoStudent') ? this.renderNavigationBar() : null}
                        <div className="formContainer"
                            style={{
                                marginTop: (h/2)+'px'
                            }}
                        >
                            {
                                this.props.store.annualPlanResults.view === 0 && this.props.store.annualPlanInfo !== null ?
                                    <Exams {...this.props} view={this.props.store.annualPlanResults.view} infoStudent={this.state.infoStudent} finalSelection={this.props.history.location.finalSelection} actions={this.props.actions} />
                                :
                                this.props.store.annualPlanResults.view === 1 && this.props.store.annualPlanInfo !== null ?
                                    <GeneralForm {...this.props} view={this.props.store.annualPlanResults.view} questions={this.props.store.annualPlanInfo.generalForm} actions={this.props.actions}/>
                                :
                                this.props.store.annualPlanResults.view === 2 && this.props.store.annualPlanInfo !== null ?
                                    <StartFrequencyForm {...this.props} view={this.props.store.annualPlanResults.view} questions={this.props.store.annualPlanInfo.questionsPI} actions={this.props.actions}/>
                                :
                                this.props.store.annualPlanResults.view === 3 && this.props.store.annualPlan !== null ?
                                    <AnnualPlanView {...this.props} view={this.props.store.annualPlanResults.view} annualPlanInfo={this.props.store.annualPlan}/>
                                :
                                    null
                            }
                        </div>
                    </div> 
                    : 
                    null
                }
                {this.state.activePopUp === true ? this.renderWarning() : null}
			</div>
		);
	}
  }
  
  export default withRouter(ProyeccionAnual);