import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';


class GeneralForm extends React.Component {
    constructor(props){
        super(props);
        this.selectAnswer=this.selectAnswer.bind(this);
        this.state={
            results: [],
            finalScore: 0
        }
    }
    componentDidMount(){
        this.setQuestions();
    }
    setQuestions(){
        var resultsStart = [];
        var total = this.state.finalScore;
        this.props.questions.map((qs, index) => {
            var obj = {idQs: qs.id, idAns: qs.answers[0].id, score:qs.answers[0].score};
            total = total + parseInt(qs.answers[0].score);
            resultsStart.push(obj);
        });

        this.setState({
            results: resultsStart,
            finalScore: total
        });
    }
    selectAnswer(answer, score, question){
        var total = this.state.finalScore;
        var arrayChange = this.state.results;
        total = total - parseInt(arrayChange[question].score);    
          
        arrayChange[question].idAns = answer;
        arrayChange[question].score = score;
        total = total + parseInt(score);
        this.setState({
            results: arrayChange,
            finalScore: total
        });
    }
    renderAnswers(id,answers, indexQs){
        return(
            <div className="answers">
                {
                    answers.map((answer, index) => (
                        <div className="ans">
                            <div className={this.state.results[indexQs].idAns === answer.id  ? "checkbox active" : "checkbox"} onClick={() => this.selectAnswer(answer.id, answer.score, indexQs)} >
                                <span className="ico icon-checkmark"></span>
                            </div>
                            <span>{answer.label}</span>
                        </div>
                    ))
                }
            </div>
        );
    }
    renderTotal(){
        return(
            <div className="finalScore">
                <span>Puntaje total: </span>
                <span>{this.state.finalScore}</span>
            </div>
        );
    }
    renderGeneralForm(){
        return(
            <div className="generalForm">
                {
                    this.props.questions.map((question, index) => (
                        <div className="question" key={index}>
                            <span className="qs">{question.id+ ".-  " + question.question}</span>
                            {this.state.results.length !== 0 ? this.renderAnswers(question.id, question.answers, index) : null}
                        </div>
                    ))
                }
            </div>
        );
    }
    render() {
		return (
			<div className='formGeneralContainer'>
                <span className="title">Responder el test conforme al desempeño general</span>
                {this.state.results.length !== 0 ? this.renderTotal() : null}
                {this.state.results.length !== 0 ? this.renderGeneralForm() : null}
			</div>
		);
	}
  }
  
  export default withRouter(GeneralForm);