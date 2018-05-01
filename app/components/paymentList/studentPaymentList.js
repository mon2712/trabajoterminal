import React from 'react';
import RegisterPayment from '../general/registerPayment';

class StudentPaymentList extends React.Component {
    constructor(props){
        super(props);
        this.closePopUp=this.closePopUp.bind(this);        
        this.activePopUp=this.activePopUp.bind(this);        
        this.state = {
            popUpActive: false,
            selected: []
        }
    }
    componentDidMount() {
       // this.props.actions.getPaymentListStudent();
    }
    renderList(){
        var studentPayments = this.props.store.paymentListStudent;

        return studentPayments.map((opt,index)=>{
            <div key={index} className="nameStudent">
            
            </div>   
        });
    }
    closePopUp(){
        this.setState({
            popUpActive: false
        });
    }
    renderStudentInfo(){
        console.log("infoAlumno", this.props)
        return(
            <div className="infoStudentContainer">
                <div className="nameStudent">
                    <span className="ico icon-smile"></span>
                    <span className="name">{this.props.infoStudent.name}</span>
                </div>
                <div className="infoStart">
                    <span className="tag">Ingreso: </span>
                    <span className="date">{this.props.infoStudent.startDate}</span>
                    <span className="level">{this.props.infoStudent.nivel}</span>
                </div>
            </div>
        );
    }
    activePopUp(){
        var infoToEdit = this.state.selected;
        infoToEdit.push(this.props.infoStudent)

        this.setState({
            infoToEdit,
            popUpActive: true
        });
    }
    render() {
        console.log("en los pagos de alumnos", this.props, this.state)
		return (
			<div className='paymentContainer'>
                <div className="buttonRegister" onClick={this.activePopUp}>
                    Registrar nuevo Pago
                </div>
                {this.props.infoStudent != undefined ? this.renderStudentInfo() : null}
                <div className= "namesStudents">
                    
                </div>
                {
                    this.state.popUpActive == true ?
                        <div className="popUpContainer">
                            <div className='registerPaymentContainer'>
                                <span className="title">Registrar Pago</span>   
                                <span className="icoClose icon-multiply" onClick={this.closePopUp}/>           
                                {this.props.infoStudent !== "" && this.props.infoStudent !== null ? <RegisterPayment {...this.props} selected={this.state.selected}  actions={this.props.actions} closePopUp={()=>this.closePopUp}/> : null }
                            </div>
                        </div>
                    :
                        null
                }
			</div>
		);
	}
  }
  export default StudentPaymentList;
