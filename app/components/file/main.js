import React from 'react';
import NavigationContainer from '../general/navigationContainer';
import Loader from '../general/loader';
import InfoStudent from '../general/infoStudent';
import { BrowserRouter as browserHistory, Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';



class FileStudent extends React.Component {
    constructor(props){
        super(props);
        this.renderFile=this.renderFile.bind(this); 
        this.setDaysInfo=this.setDaysInfo.bind(this);
        this.toggleList=this.toggleList.bind(this);
        this.state={
            infoStudent: "",
            months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            infoDays: null,
            activeList: false
        };
    }
    componentDidMount(){
        if(this.props.history.location.selected){
            this.props.actions.getFileGrades(parseInt(this.props.history.location.selected.idStudent));
            this.setState({
                infoStudent: this.props.history.location.selected
            });
        }else{
            this.props.history.push({
                pathname: '/menu'
            });
        }
    }
    renderFile(){
        return(
            <div className="file">
                <div className="headerTable">
                    <span className="col norm day">Día</span>
                    <span className="col norm">Set</span>
                    <span className="col norm">Tipo</span>
                    <span className="col norm">Tiempo</span>
                    <span className="col assistant">Assistente</span>
                    <span className="col calif">1</span>
                    <span className="col calif">2</span>
                    <span className="col calif">3</span>
                    <span className="col calif">4</span>
                    <span className="col calif">5</span>
                    <span className="col calif">6</span>
                    <span className="col calif">7</span>
                    <span className="col calif">8</span>
                    <span className="col calif">9</span>
                    <span className="col calif">10</span>
                </div>
                {
                    this.state.infoDays.map((info, index) => (
                        <div key={index}>
                            <span className="col norm day">{info.day}</span>
                            <span className="col norm">{info.set}</span>
                            <span className="col norm">{info.typeSet}</span>
                            <span className="col norm">{info.time}</span>
                            <span className="col assistant">{info.assistant}</span>
                            <span className="col calif">{info["1"]}</span>
                            <span className="col calif">{info["2"]}</span>
                            <span className="col calif">{info["3"]}</span>
                            <span className="col calif">{info["4"]}</span>
                            <span className="col calif">{info["5"]}</span>
                            <span className="col calif">{info["6"]}</span>
                            <span className="col calif">{info["7"]}</span>
                            <span className="col calif">{info["8"]}</span>
                            <span className="col calif">{info["9"]}</span>
                            <span className="col calif">{info["10"]}</span>
                        </div>
                    ))
                }
            </div>
        );
    }
    setDaysInfo(days){
        this.setState({
            infoDays: days
        });
    }
    toggleList(){
        this.setState({
            activeList: !this.state.activeList
        });
    }
    renderPageSelection(){
        var objFile = this.props.store.gradesStudent;
        return(
            <div className="gradesFileSelection">
                {
                    objFile.map((obj,index) => (
                        <div className="selectionYears" key={index}>
                            <span className="tag">Selecciona el mes</span>
                            <div className="yearBox">
                                <div className="year">{obj.year}</div>
                                <span className="ico icon-circle-down" onClick={this.toggleList}></span>
                            </div>
                            {
                                this.state.activeList !== false ? 
                                    <div className="monthsBox">
                                    {
                                        obj.months.map((month,index2) =>(
                                            <div className="month" key={index2} onClick={() => this.setDaysInfo(month.days)}>
                                            {this.state.months[month.month]}
                                            </div>
                                        ))
                                    }
                                    </div>
                                :
                                    null
                            }
                        </div>
                    ))
                }
            </div>
        );
    }
    renderFileBox(){
        var h = this.state.infoStudent != "" ? document.getElementById('containerInfoStudent').clientHeight : 0;
        return(
            <div className="fileBox"
                style={{
                    marginTop: ((h/2)+35)+'px'
                }}
            >
                {
                    this.props.store.gradesStudent !== "" && this.props.store.gradesStudent !== null ? 
                        <div className="containers">
                            <div className="leftContainer">
                                {this.renderPageSelection()}
                            </div>
                            <div className="rightContainer">
                                {this.state.infoDays !== null ? this.renderFile() : null}                            
                            </div>
                        </div>
                : 
                   <div className="errorMsg">
                       <span className="ico icon-sad"></span>
                       <span className="msg">No tiene calificaciones registradas</span>
                   </div>
                }
            </div>
            
        );
    }
    render() {
        return (
            <div className='fileContainer'>
                <NavigationContainer texto="Boleta" path='/menu'/>
                {this.state.infoStudent !== "" ? <InfoStudent infoStudent={this.state.infoStudent} /> : null}
                {
                    this.state.infoStudent !== null && document.getElementById('containerInfoStudent') && this.props.store.loader.gradesStudent !== true ? 
                        this.renderFileBox()
                    : 
                        <Loader {...this.props}/>
                }
                
            </div>
        );
    }
  }

export default withRouter(FileStudent);
