import React from 'react';
import AppStore from '../../data/store';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

function getAppState() {
    console.log(AppStore.getFormAnnualPlanInfo().questionsPI)
    return AppStore.getFormAnnualPlanInfo().questionsPI;
}

class StartFrequencyForm extends React.Component {
    constructor(props){
        super(props);
        this.setStartPoint=this.setStartPoint.bind(this);     
        this._onChange = this._onChange.bind(this);   
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
        if(this.refs.myRef){
            this.setState({
            results: getAppState()
            });
        }
    }
    selectAnswer(answer, question){
        var arrayChange = this.state.results;
          
        arrayChange[question].selected = answer;
        this.setState({
            results: arrayChange
        });
    }
    renderAnswers(id,answers, indexQs){
        return(
            <div className="answers">
                {
                    answers.map((answer, index) => (
                        <div className="ans" key={index}>
                            <div className={parseInt(this.state.results[indexQs].selected) === answer.id  ? "checkbox active" : "checkbox"} onClick={() => this.selectAnswer(answer.id, indexQs)} >
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
    setStartPoint(){
        var array = [];
        var seleccionada = "";
        var valor = 0;

        this.state.results.map((question, index) => {
            question.answers.map((answer, index2) => {
                if(parseInt(question.selected) === answer.id){
                    seleccionada = answer.answer;
                    valor= answer.score;
                }
            });
            var obj = {identificador: question.identification, answer: valor, answerLbl: seleccionada};
            array.push(obj);
        });
        this.props.actions.setAnnualPlan(array, this.props.view);
    }
    render() {
        return (
			<div className='formGeneralContainer' ref="myRef">
                <span className="title">Responder el test para el punto de inicio</span>
                {
                    this.props.questions.length !== 0 ? 
                        <div>
                            {this.renderGeneralForm()} 
                            <div className="button" onClick={this.setStartPoint}>Aceptar</div>
                        </div>
                    : 
                    null
                }
			</div>
		);
	}
  }
  
  export default withRouter(StartFrequencyForm);