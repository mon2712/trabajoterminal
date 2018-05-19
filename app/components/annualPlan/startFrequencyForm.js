import React from 'react';
import AppStore from '../../data/store';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

function getAppState() {
    return AppStore.getFormAnnualPlanInfo();
}

class StartFrequencyForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            results: getAppState().questionsPI
        }
    }
    componentDidMount() {
        AppStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }
    _onChange() {
       this.setState({results: getAppState().questionsPI});
    }
    selectAnswer(answer, question){
        //var total = this.state.finalScore;
        var arrayChange = this.state.results;
        //total = total - parseInt(arrayChange[question].score);    
          
        arrayChange[question].selected = answer;
        //arrayChange[question].score = score;
        //total = total + parseInt(score);
        this.setState({
            results: arrayChange
        });
    }
    renderAnswers(id,answers, indexQs){
        console.log("state", this.state.results)
        return(
            <div className="answers">
                {
                    answers.map((answer, index) => (
                        <div className="ans" key={index}>
                            <div className={this.state.results[indexQs].selected === answer.id  ? "checkbox active" : "checkbox"} onClick={() => this.selectAnswer(answer.id, indexQs)} >
                                <span className="ico icon-checkmark"></span>
                            </div>
                            <span>{answer.answer}</span>
                        </div>
                    ))
                }
            </div>
        );
    }
    renderGeneralForm(){
        return(
            <div className="generalForm">
                {
                    this.props.questions.map((question, index) => (
                        <div className="question" key={index}>
                            <span className="qs">{question.id+ ".- El alumno " + question.question}</span>
                            {this.props.questions.length !== 0 ? this.renderAnswers(question.id, question.answers, index) : null}
                        </div>
                    ))
                }
            </div>
        );
    }
    render() {
        console.log(this.props.questions)
        return (
			<div className='formGeneralContainer'>
                <span className="title">Responder el test para el punto de inicio</span>
                {
                    this.props.questions.length !== 0 ? 
                        <div>
                            {this.renderGeneralForm()} 
                            <div className="button">Aceptar</div>
                        </div>
                    : 
                    null
                }
			</div>
		);
	}
  }
  
  export default withRouter(StartFrequencyForm);