import React from 'react';
import AppStore from '../../data/store';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

function getAppState() {
    return AppStore.getFormAnnualPlanInfo();
}

class Exams extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.generalCount = this.generalCount.bind(this);
        this.move=this.move.bind(this);        
        this.state={
            results: getAppState(),
            perPage: 3,
            currentPage: 1,
            position: 0,
        }
    }
    componentDidMount() {
        AppStore.addChangeListener(this._onChange);
        this.setData();
    }
    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }
    _onChange() {
       this.setState({results: getAppState()});
    }
    setData(){
        console.log("scree ", screen.width)
        var realScreen = (screen.width*.9) - 50;
        console.log("realScreen", realScreen)
        this.setState({
            perPage: Math.floor(realScreen/(170+20))
        })
    }
    move(movement){
        if(movement=="left"){
            this.setState({
                currentPage: this.state.currentPage-1,
                position: this.state.position-((this.state.perPage*170)+(this.state.perPage*20))             
            })
        }else if(movement=="right"){
            this.setState({
                currentPage: this.state.currentPage+1,
                position: this.state.position+((this.state.perPage*170)+(this.state.perPage*20))
            })
        }

    }
    handleChange(event) {
        var stateArray = this.state.results;
        var resultsArray = this.state.results[1].examsInfo;
        var totalScore = this.state.results[2].finalScorePerLevel;
        var examSet, levelSet;
        var sp = event.target.name.split("/");

        examSet = sp[0]+"";
        levelSet = sp[1]+"";

        if(event.target.value.length < 3){
            if(event.target.value.length == 0){
                console.log("esta vacio")
                resultsArray.map((level, index) => {
                    if(level.exam === examSet){
                        level.levels.map((scores, index) => {
                            if(scores.level === levelSet){
                                scores.real = 0
                            }
                            
                        })
                    }
                    
                })

                stateArray[1].examsInfo = resultsArray;

                this.setState({
                    results: stateArray
                })

            }else{
                resultsArray.map((level, index) => {
                    if(level.exam === examSet){
                        level.levels.map((scores, index) => {
                            if(scores.level === levelSet){
                                scores.real = event.target.value
                            }
                            
                        })
                    }
                    
                })

                stateArray[1].examsInfo = resultsArray;

                this.setState({
                    results: stateArray
                })
            }
        }else{
            var str = event.target.value;
            var res = str.split("");
            var stringFinal = "";

            stringFinal = res[1] +res[2];

            resultsArray.map((level, index) => {
                if(level.exam === examSet){
                    level.levels.map((scores, index) => {
                        if(scores.level === levelSet){
                            scores.real = parseInt(stringFinal)
                        }
                    })
                }
                
            })

            stateArray[1].examsInfo = resultsArray;

            this.setState({
                results: stateArray
            })
        }
        this.generalCount();
    }
    generalCount(){
        var stateArray = this.state.results;
        var resultsArray = this.state.results[1].examsInfo;
        var totalScore = this.state.results[2].finalScorePerLevel;

        var varNivel = 0;

        totalScore.map((totalLevel, index3) => {
            varNivel=0;
            resultsArray.map((exams, index) => {
                exams.levels.map((level, index2) => {
                    if(totalLevel.level === level.level){
                        varNivel = varNivel + parseInt(level.real);
                        totalLevel.real = parseInt(varNivel);
                    }
                })
            })
        })

        stateArray[2].finalScorePerLevel = totalScore;

        this.setState({
            results: stateArray
        })
    }
    renderExams(){
        var resultsExams = this.props.store.annualPlanInfo[1].examsInfo;
        var numExams =resultsExams.length;
        var pages = Math.ceil(numExams / this.state.perPage);

        console.log("numExams ", numExams, "pages ", pages)

        return(
            <div className="bigContainer">
                {this.state.currentPage !== 1 ?
                    <div className="arrow left">
                        <span className="icon-left-arrow" onClick={()=>this.move("left")}></span>                    
                    </div>
                :
                    null
                }
                {this.state.currentPage < pages ?
                    <div className="arrow right">
                        <span className="icon-right-arrow" onClick={()=>this.move("right")}></span>                    
                    </div>
                :
                    null
                }
            <div className="wrapExams"
                style={{
                    width: (( this.state.perPage*170)+( this.state.perPage*20))+'px'
                }}            
            >

            <div className="examsContainer"
                style={{
                    width: ((numExams*170)+(numExams*20)+30)+'px',
                    right: this.state.position+'px'
                }}
            >
                    {
                        resultsExams.map((exam,index)=>(
                            <table className="completeTable" key={index}>
                                <tbody>
                                    <tr>
                                        <th className="borderRight">
                                            Examen
                                        </th>
                                        <td>
                                            {exam.exam}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="borderRight">
                                            Niveles
                                        </td>
                                        <td>
                                            <table className="smallTable" >
                                            <tbody>
                                        {
                                            exam.levels !== undefined && this.state.results.length !== 0 ? 
                                            
                                                exam.levels.map((level, index2) => (

                                                        <tr className="colLevels" key={index2}>
                                                            <td className="colLeft">
                                                                {level.level}
                                                            </td>
                                                            <td className="colRight">
                                                                <input type="number" className="score" name={exam.exam+"/"+level.level} value={this.state.results[1].examsInfo[index].levels[index2].real} min="0" max={level.score} maxLength="2" onChange={this.handleChange}></input>
                                                                <span className="maxScore">{"/"+level.score}</span>
                                                            </td>
                                                        </tr>
                                                    
                                                ))
                                            :
                                            null
                                        }
                                            </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        ))
                    }
            </div>
            </div>
            </div>
        );
    }
    renderFinalScore(){
        var finalScore = this.props.store.annualPlanInfo[2].finalScorePerLevel;
        
        return(
            <div className="finalScoreContainer">
                {
                    finalScore.map((finalScores, index) => (
                        <div className="boxLevel" key={index}>
                            <span className="levelTag">{finalScores.level}</span>
                            <span className="levelScore">
                                {finalScores.real + " / " + finalScores.total}
                            </span>
                        </div>
                    ))
                }
            </div>
        );
    }
    render() {
		return (
			<div className='examContainer'>
                <span className="title center">Puntajes totales</span> 
                {this.props.store.annualPlanInfo !== null && this.state.results.length !== 0 ? this.renderFinalScore() : null}       
                <span className="title">Ingresar los resultados por examen</span>         
                {
                    this.props.store.annualPlanInfo != null && this.state.results.length !== 0 && this.state.results ? 
                    <div>
                        {this.renderExams()}
                        <div className="button">Guardar</div>
                    </div>
                : 
                    null
                }
			</div>
		);
	}
  }
  
  export default withRouter(Exams);