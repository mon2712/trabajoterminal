import React from 'react';
import AppStore from '../../data/store';
import NavigationContainer from '../general/navigationContainer';


class PaymentList extends React.Component {
    constructor(props){
        super(props);

    }
    componentDidMount() {
        this.props.actions.getStudentMissPayment();
    }
    renderList(){
        var studentsMissPayment = this.props.store.studentsMissPayment;
        return studentsMissPayment.map((opt,index)=>(
            <div key={index} className="nameStudent">
                <span className="name">{index+1}. {opt.name}</span>
                <span className="ico icon-table"></span>
            </div>   
        ));
    }
    render() {
		return (
			<div className='paymentContainer'>
                <NavigationContainer texto="Lista Adeudos" path='/menu'/>
                <div className= "namesStudents">
                    {this.props.store.studentsMissPayment !== null ? this.renderList() : null}
                </div>
			</div>
		);
	}
  }
  export default PaymentList;
