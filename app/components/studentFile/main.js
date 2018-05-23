import React from 'react';


class StudentFile extends React.Component {
    constructor(props){
        super(props);
        this.renderAssistance = this.renderAssistance.bind(this);
        this.closeFileStudent = this.closeFileStudent.bind(this);
    }
    closeFileStudent(){
        this.props.actions.closeStudentFile();
    }
    renderAssistance(){
        var indents = [];
        for (var i = 0; i < 9; i++) {
            if(i<this.props.store.studentFileInfo.assistances)
                indents.push(<span className='icogreen icon-wondering' key={i}></span>);
            else
                indents.push(<span className='icogray icon-wondering' key={i}></span>);       
        }
        return (
            <div className="assistanceFaces">
                {indents}
            </div>
        );
    }
    render() {
		return (
			<div className='studentFileContainer'>
                <div className="leftStudentFile">
                    <span className="nameStudent">{this.props.store.studentFileInfo.name + " " + this.props.store.studentFileInfo.lastName}</span>
                    <div className="infoTutor">
                        <span className="icon-tutor"></span>
                        <span>{this.props.store.studentFileInfo.nameMom + " " + this.props.store.studentFileInfo.lastNameMom}</span>
                    </div>
                    <div className="infoPhones">
                        <span className="icon-call-answer" style={{display: this.props.store.studentFileInfo.phoneHouse !== "" ? 'inline-block' : 'none'}}></span>
                        <span style={{display: this.props.store.studentFileInfo.phoneHouse !== "" ? 'inline-block' : 'none'}}>{this.props.store.studentFileInfo.phoneHouse}</span>
                        
                        <span className="icon-smartphone-call" style={{display: this.props.store.studentFileInfo.cellMom !== "" ? 'inline-block' : 'none'}}></span>
                        <span style={{display: this.props.store.studentFileInfo.cellMom !== "" ? 'inline-block' : 'none'}}>{this.props.store.studentFileInfo.cellMom}</span>
                    </div>
                    <div className="infoTutor" style={{display: this.props.store.studentFileInfo.tutor !== "" ? 'inline-block' : 'none'}}>
                        <span className="icon-tutor"></span>
                        <span>{this.props.store.studentFileInfo.tutor + " " + this.props.store.studentFileInfo.tutor}</span>
                    </div>
                    <div className="infoPhones" style={{display: this.props.store.studentFileInfo.cellTutor !== "" ? 'inline-block' : 'none'}}>
                        <span className="icon-smartphone-call" ></span>
                        <span style={{display: this.props.store.studentFileInfo.cellTutor !== "" ? 'inline-block' : 'none'}}>{this.props.store.studentFileInfo.cellTutor}</span>
                    </div>
                </div>
                <div className="rightStudentFile">
                    <span className="cross icon-multiply" onClick={this.closeFileStudent}></span>
                    <span className="level">{this.props.store.studentFileInfo.level}</span>
                    {this.props.store.studentFileInfo.missingPayment === "true" ? 
                        <div className="paymentInfo">
                            <span className="ico icon-invoice"></span>
                            <span className="tag">Falta pago de colegiatura</span>
                        </div> 
                        : 
                        null
                    }
                    {this.renderAssistance()}
                </div>
			</div>
		);
	}
  }
  export default StudentFile;
