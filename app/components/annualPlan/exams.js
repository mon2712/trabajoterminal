import React from 'react';
import AppStore from '../../data/store';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import { stringify } from 'querystring';

function getAppState() {
    return AppStore.getFormAnnualPlan();
}

class Exams extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.generalCount = this.generalCount.bind(this);
        this.state={
            results: getAppState()
        }
    }
    componentDidMount() {
        AppStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }
    _onChange() {
       this.setState({results: getAppState()});
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
        resultsArray.map((exams, index) => {
            console.log("exams", exams)
            exams.levels.map((level, index2) => {
                console.log("level", level)
                totalScore.map((totalLevel, index3) => {
                    console.log("totalLevel", totalLevel)
                    if(totalLevel.level === level.level){
                        varNivel = varNivel + level.real;
                        totalLevel.real = parseInt(varNivel);
                        console.log("totalReal ", totalLevel, "varNivel", varNivel)
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
        
        return(
            <div className="examsContainer">
                    {
                        resultsExams.map((exam,index)=>(
                            <table className="completeTable" key={index}>
                                <tbody>
                                    <tr>
                                        <th>
                                            Examen
                                        </th>
                                        <td>
                                            {exam.exam}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Niveles
                                        </td>
                                        <td>
                                            <table className="smallTable" >
                                            <tbody>
                                        {
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
        );
    }
    renderFinalScore(){
        var finalScore = this.props.store.annualPlanInfo[2].finalScorePerLevel;
        
        return(
            <div className="finalScoreContainer">
                <table>
                    <tbody>
                        <tr>
                {
                    finalScore.map((finalScores, index) => (
                        <td key={index}>
                            {finalScores.level}
                        </td>
                    ))
                }
                        </tr>
                        <tr>
                {
                    finalScore.map((finalScores, index) => (
                        <td key={index}>
                            <span>{finalScores.real}</span>
                            <span>{" /" + finalScores.total}</span>
                        </td>
                    ))
                }
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
    render() {
		return (
			<div className='examContainer'>
                <span className="title">Ingresar los resultados del examen</span>
                {this.props.store.annualPlanInfo != null && this.state.results.length !== 0 && this.props.store.annualPlanInfo !== null? this.renderExams() : null}
                {this.props.store.annualPlanInfo != null && this.state.results.length !== 0 ? this.renderFinalScore() : null}
			</div>
		);
	}
  }
  
  export default withRouter(Exams);