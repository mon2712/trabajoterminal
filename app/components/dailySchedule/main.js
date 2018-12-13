import React from 'react';
import NavigationContainer from '../general/navigationContainer';
import Loader from '../general/loader';
import InfoStudent from '../general/infoStudent';
import { BrowserRouter as browserHistory, Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';



class DailySchedule extends React.Component {
    constructor(props){
        super(props);
        this.setSecuencias=this.setSecuencias.bind(this);
        this.state={
            infoStudent: "",
            secuencias: "",
            infoLevel: null
        }
        
    }
    componentDidMount(){
        if(this.props.history.location.selected){
            this.props.actions.getDailySchedule(parseInt(this.props.history.location.selected.idStudent));
            this.setState({
                infoStudent: this.props.history.location.selected
            });
        }else{
            this.props.history.push({
                pathname: '/menu'
            });
        }
    }
    setSecuencias(secuencias){
        this.setState({
            secuencias: secuencias
        });
    }
    renderLevels(){
     return(
         <div className="containerLevels">
            <span id="title">Selecciona nivel</span>
             {
                 this.props.store.dailySchedule.map((nivel, index) =>(
                 <div className="level" key={index} onClick={() => this.setSecuencias(nivel.secuencias)}>
                     {nivel.nivel}
                 </div>
                 ))
             }
         </div>
     );   
    }
    renderSecuencias(){
        return(
            <div className="containerSecuencias">
                {
                    this.state.secuencias.map((nivel, index) =>(
                        <div className = "row" key={index} >
                                {nivel.map((secuencia, index2) =>(
                                    <div className = "set" key={index2}>
                                        {
                                            secuencia                                        
                                        }
                                    </div>

                                ))}
                        </div>
                    ))
                }
            </div>
        );
    }
    setLevelsInfo(level){
        this.setState({
            infoLevel: level
        });
    }
    render() {


        return(
            <div className="containerDailySchedule">
                <NavigationContainer texto="Programacion diaria" path='/menu'/>
                {this.state.infoStudent !== "" ? <InfoStudent infoStudent={this.state.infoStudent} /> : null}
                {this.props.store.dailySchedule !== "" && this.props.store.dailySchedule !== null ? this.renderLevels() : null}
                {this.state.secuencias !== "" ? this.renderSecuencias() : null}
            </div>

        );

    }

  }

export default withRouter(DailySchedule);
