import React from 'react';
import NavigationContainer from '../general/navigationContainer';
import InfoStudent from '../general/infoStudent';
import AnnualPlanView from '../annualPlan/annualPlanView';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

class GeneralViewProyeccionAnual extends React.Component {
    constructor(props){
        super(props);
        this.renderAnnualPlan = this.renderAnnualPlan.bind(this);
        this.state={
            infoStudent: "",
            h: 0
        };
        
    }
    componentDidMount() {
        if(this.props.history.location.selected){
            this.props.actions.getAnnualPlan(parseInt(this.props.history.location.selected.idStudent));
            this.setState({
                infoStudent: this.props.history.location.selected
            });
        }else{
            this.props.history.push({
                pathname: '/menu'
            });
        }
    }
    renderError(){
        return(
            <div className="error">
                <span className="ico icon-sad"></span>
                <span className="msg">{this.props.store.response.info.messageError}</span>
            </div>
        );
    }
    renderAnnualPlan(){
        var h = this.state.infoStudent !== "" ? document.getElementById('containerInfoStudent').clientHeight : 0;
        return(
            <div className='annualPlanContainer'
                style={{
                    marginTop: ((h/2)+15)+'px'
                }}
            >
                <AnnualPlanView {...this.props} view={this.props.store.annualPlanResults.view} annualPlanInfo={this.props.store.annualPlan}/>
			</div>
        );

    }
    render() {
		return (
            <div className="generalAnnualPlanContainer">
                <NavigationContainer texto="Proyección Anual" path='/menu'/>
                {this.state.infoStudent !== "" ? <InfoStudent infoStudent={this.state.infoStudent} /> : null}
                {this.state.infoStudent !== "" && this.props.store.annualPlan !== null ? this.renderAnnualPlan() : null}
                {this.props.store.annualPlan === null && this.props.store.response.active === true ? this.renderError() : null}
            </div>
		);
	}
  }
  
  export default withRouter(GeneralViewProyeccionAnual);