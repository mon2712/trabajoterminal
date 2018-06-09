import React from 'react';
import NavigationContainer from '../general/navigationContainer';
import StudentPaymentList from '../paymentList/studentPaymentList';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';


class PaymentList extends React.Component {
    constructor(props){
        super(props);
        this.openPaymentListStudent = this.openPaymentListStudent.bind(this);
        this.state = {
            view: 0,
            infoStudent: ""
        }
    }
    componentDidMount() {
        if(this.props.history.location.infoStudent){
            this.setState({
                view: 1,
                infoStudent: this.props.history.location.infoStudent
            });
        }else{
            this.props.actions.getStudentMissPayment();
        }
        
    }
    openPaymentListStudent(student){
        
        this.setState({
            view: 1,
            infoStudent: student
        });
    }
    renderList(){
        var studentsMissPayment = this.props.store.studentsMissPayment;
        
        return studentsMissPayment.map((opt,index)=>(
            <div key={index} className="nameStudent">
                <span className="name">{index+1}. {opt.name}</span>
                <span className="ico icon-card" onClick={() => this.openPaymentListStudent(opt)}></span>
            </div>
        ));
    }
    renderEmpty(){
        return(
            <div className="divEmpty">
                <span className="ico icon-smile"></span>
                <span className="tag">No hay alumnos con adeudo</span>
            </div>
        )
    }
    render() {

		return (
			<div className='paymentContainer'>
                <NavigationContainer texto="Lista Adeudos" path='/menu'/>
                {
                    this.state.view === 0 ? 

                        <div className= "namesStudents">
                            {this.props.store.studentsMissPayment !== null && this.props.store.studentsMissPayment !== "" ? this.renderList() : this.renderEmpty()}
                        </div>

                        :

                    this.state.view === 1 ?

                        <StudentPaymentList {...this.props} actions={this.props.actions} infoStudent={this.state.infoStudent}/>

                    :
                        null
                }
                
			</div>
		);
	}
  }
  
  export default withRouter(PaymentList);
