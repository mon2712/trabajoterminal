import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';


class GeneralForm extends React.Component {
    constructor(props){
        super(props);
        this.renderAnswers=this.renderAnswers.bind(this);

    }
    renderAnswers(answers){
        console.log("answers", answers)
        return(
            <div className="answers">
                {
                    answers.map((answer, index) => (
                        <div className="ans">
                            <div className={/*this.state.selectAll === true ? "checkbox active" : */"checkbox"} >
                                <span className="ico icon-checkmark"></span>
                            </div>
                            <span>{answer.label}</span>
                        </div>
                    ))
                }
            </div>
        );
    }
    renderGeneralForm(){
        console.log("questions", this.props.questions)
        return(
            <div className="generalForm">
                {
                    this.props.questions.map((question, index) => (
                        <div className="question" key={index}>
                            <span className="qs">{question.id+ ".-  " + question.question}</span>
                            {this.renderAnswers(question.answers)}
                        </div>
                    ))
                }
            </div>
        );
    }
    render() {
        //console.log("newComponent", this.props, this.state, this.props.history.location.state)
		return (
			<div className='formGeneralContainer'>
                <span className="title">Responder el test conforme al desempeño general</span>
                {this.renderGeneralForm()}
			</div>
		);
	}
  }
  
  export default withRouter(GeneralForm);