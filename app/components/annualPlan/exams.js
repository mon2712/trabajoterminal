import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';


class Exams extends React.Component {
    constructor(props){
        super(props);
        this.state={
            resultsExam: []
        }
    }
    componentDidMount(){
        this.setState({
            resultsExam: this.props.exams.examsInfo
        });
    }
    renderExam(){
        return(
            <div>
                <table>
                    <tr>
                    </tr>
                </table>
            </div>
        );

    }
    renderExams(){
        return(
            <div className="examsContainer">
                

                    {
                        this.state.resultsExam.map((exam,index)=>(
                            <table key={index}>
                                <tbody>
                                    <tr>
                                        <th>
                                            Examen: 
                                        </th>
                                        <td>
                                            {exam.exam}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Niveles:
                                        </td>
                                        <td>
                                        {
                                            exam.levels.map((level, index2) => (
                                                <tr className="colLevels">
                                                    <td className="colLeft">
                                                        {level.level}
                                                    </td>
                                                    <td className="colRight">
                                                        {level.score}
                                                    </td>
                                                </tr>
                                            ))
                                        }
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
        console.log("exams", this.props.exams, this.state)
		return (
			<div className='examContainer'>
                <span className="title">Ingresar los resultados del examen</span>
                {this.renderExams()}
			</div>
		);
	}
  }
  
  export default withRouter(Exams);