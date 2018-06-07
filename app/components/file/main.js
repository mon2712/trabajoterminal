import React from 'react';
import NavigationContainer from '../general/navigationContainer';
import InfoStudent from '../general/infoStudent';
import { BrowserRouter as browserHistory, Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';



class FileStudent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            infoStudent: ""
        };
    }
    componentDidMount(){
        if(this.props.history.location.selected){
            //this.props.actions.getAnnualPlan(parseInt(this.props.history.location.selected.idStudent));
            this.setState({
                infoStudent: this.props.history.location.selected
            });
        }else{
            this.props.history.push({
                pathname: '/menu'
            });
        }
    }
    render() {
        return (
            <div className='fileContainer'>
                <NavigationContainer texto="Boleta" path='/menu'/>
                {this.state.infoStudent !== "" ? <InfoStudent infoStudent={this.state.infoStudent} /> : null}
                
            </div>
        );
    }
  }

export default withRouter(FileStudent);
