import React from 'react';


class PaymentList extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.props.actions.getStudentMissPayment();
    }
    renderList(){
        var studentPayments = this.props.store.paymentListStudent;
        return studentPayments.map((opt,index)=>{
            <div key={index} className="nameStudent">
            
            </div>   
        });
    }
    render() {
		return (
			<div className='paymentContainer'>
                <div className= "namesStudents">
                    {this.props.store.studentsMissPayment !== null ? this.renderList() : null}
                </div>
			</div>
		);
	}
  }
  export default PaymentList;
