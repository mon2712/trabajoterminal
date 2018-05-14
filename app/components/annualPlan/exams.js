import React from 'react';
import AppStore from '../../data/store';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

class Exams extends React.Component {
    constructor(props){
        super(props);
        this.state={
            resultsExam: []
        }
    }
    componentDidMount() {
        console.log("finalSelection ", this.props.finalSelection)
        this.props.actions.getFormAnualPlan(this.props.finalSelection);
    }
    renderExams(){
        //console.log("resultsExam", this.state.resultsExam[1].examsInfo)
        var resultsExams = this.props.store.annualPlanInfo[1].examsInfo;
        console.log("variable ", this.props)
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
                                                                <input className="score" type="number" min="0" max={level.score}></input>
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
    render() {
        console.log("exams", this.props, this.state)
		return (
			<div className='examContainer'>
                <span className="title">Ingresar los resultados del examen</span>
                {this.props.store.annualPlanInfo != null ? this.renderExams() : null}
			</div>
		);
	}
  }
  
  export default withRouter(Exams);