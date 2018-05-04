import React from 'react';
import RegisterPayment from '../general/registerPayment';

class StudentPaymentList extends React.Component {
    constructor(props){
        super(props);
        this.closePopUp=this.closePopUp.bind(this);        
        this.activePopUp=this.activePopUp.bind(this);
        this.activeInfoPayment=this.activeInfoPayment.bind(this);
        this.move=this.move.bind(this);        
        this.state = {
            months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            popUpActive: false,
            selected: [],
            currentPage: 1,
            position: 0,
            perPage: 3,
            infoActive: false,
            infoId: 0,
            infoYear: '',
            newHeight: 0,
        }
    }
    componentDidMount() {
        this.getData();
        this.props.actions.getPaymentListStudent(this.props.infoStudent.idStudent);
    }
    renderList(){
        var studentPayments = this.props.store.paymentListStudent;

        return studentPayments.map((opt,index)=>{
            <div key={index} className="nameStudent">
            
            </div>   
        });
    }
    closePopUp(){
        this.props.actions.getPaymentListStudent(this.props.infoStudent.idStudent);        
        this.props.actions.cleanResponse();
        this.setState({
            popUpActive: false
        });
    }
    renderStudentInfo(){
        return(
            <div className="infoStudentContainer" id="containerInfoStudent">
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
    activeInfoPayment(year,index,status){
        this.setState({
            infoYear: year,
            infoId: index,
            infoActive: status
        });
    }
    move(movement){
        if(movement=="left"){
            this.setState({
                currentPage: this.state.currentPage-1,
                position: this.state.position-((this.state.perPage*300)+(this.state.perPage*10))             
            })
        }else if(movement=="right"){
            this.setState({
                currentPage: this.state.currentPage+1,
                position: this.state.position+((this.state.perPage*300)+(this.state.perPage*10))
            })
        }

    }
    renderListOfYears(){
        var payments=[]
        payments = this.props.store.paymentListStudent != undefined && this.props.store.paymentListStudent != null ? this.props.store.paymentListStudent : [];
        var numAssis =payments.length;
        var pages = Math.ceil(numAssis / this.state.perPage);
        return(
            <div className="listsContainer"
                style={{
                    width: ((numAssis*300)+(numAssis*10))+'px',
                    right: this.state.position+'px'
                }}
            >
                {
                    this.props.store.paymentListStudent.map((colegiatura,index) => (
                        <div className="yearContainer" key={index}>
                            <span className="year">{colegiatura.year}</span>
                            {
                                colegiatura.months.map((month, index2) => (
                                    <div className={this.state.infoActive === true ? "monthContainer active" : "monthContainer"} key={index2}>
                                        <div className="generalDiv">
                                            <span className="monthName">{this.state.months[month.month-1]}</span>
                                            <span className="arrowDown icon-circle-down"  style={{display: this.state.infoActive === false ? 'inline-block' : 'none'}} onClick={() => this.activeInfoPayment(index,index2,true)}></span>
                                            <span className="cross icon-multiply" style={{display: this.state.infoActive === true  && this.state.infoId === index2 && this.state.infoYear === index ? 'inline-block' : 'none'}}  onClick={() => this.activeInfoPayment(index,index2,false)}></span>
                                        </div>
                                        <div className="infoPayment"  style={{display: this.state.infoActive === true && this.state.infoId === index2 && this.state.infoYear === index? 'block' : 'none'}}>
                                            <div className="topDiv">
                                                <span className="folio">Folio: </span>
                                                <span className="numFolio">{month.idPayment}</span>
                                                <span className="dateTag">Fecha: </span>
                                                <span className="date">{month.date}</span>
                                            </div>
                                            <div className="midDiv">
                                                <span className="type">Tipo de Pago: </span>
                                                <span className="typePayment">{month.typePayment}</span>
                                                <span className="quantityTag">Cantidad: </span>
                                                <span className="quantity">${month.quantity}</span>
                                            </div>
                                            <div>***********{month.card}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        );
    }
    getData(){
        var h = document.getElementById('containerInfoStudent').clientHeight;

        this.setState({
            perPage: Math.floor(screen.width/(300+10)),
            newHeight: h-30
        })
    }
    renderEmpty(){
        if(this.props.store.response.active === true){
            return(
                <div className="response" >
                    <span className="msg">{this.props.store.response.info.messageError}</span>     
                    <span className="ico icon-sad"></span>                               
                </div>
            );
        }
    }
    renderListOfPayments(){
        var payments=[]
        payments = this.props.store.paymentListStudent != undefined && this.props.store.paymentListStudent != null && this.props.store.paymentListStudent != "" ? this.props.store.paymentListStudent : [];
        var numAssis =payments.length;
        var pages = Math.ceil(numAssis / this.state.perPage);
        return(
            <div className="bigContainer">
                {this.state.currentPage !== 1 ?
                        <div className="arrow left">
                            <span className="icon-left-arrow" onClick={()=>this.move("left")}></span>                    
                        </div>
                        :
                        null
                    }
                    {this.state.currentPage < pages ?
                        <div className="arrow right">
                            <span className="icon-right-arrow" onClick={()=>this.move("right")}></span>                    
                        </div>
                        :
                        null
                    }
                <div className="containerPayments"
                    style={{
                        width: (( this.state.perPage*300)+( this.state.perPage*10))+'px',
                        marginTop: (this.state.newHeight)+'px'
                    }}            
                >
                    
                {
                    this.props.store.paymentListStudent != undefined && this.props.store.paymentListStudent != null && this.props.store.paymentListStudent != "" ?
                        this.renderListOfYears()
                    :
                        this.renderEmpty()    
                }
                </div>
            </div>
        );
    }
    render() {
        
		return (
			<div className='paymentContainer'>

                <div className="buttonRegister" onClick={this.activePopUp}>
                    Registrar nuevo Pago
                </div>

                {this.props.infoStudent != undefined ? this.renderStudentInfo() : null}

                {
                    this.props.store.paymentListStudent != null && this.props.store.paymentListStudent != undefined ? 
                    this.renderListOfPayments()
                    : 
                    null
                }
                
                {
                    this.state.popUpActive == true ?
                        <div className="popUpContainer">
                            <div className='registerPaymentContainer'>
                                <span className="title">Registrar Pago</span>   
                                <span className="icoClose icon-multiply" onClick={this.closePopUp} style={{display: this.props.store.response.active === true ? 'none' : 'inline-block'}} />                                                  
                                {this.props.infoStudent !== "" && this.props.infoStudent !== null ? <RegisterPayment {...this.props} selected={this.state.selected}  actions={this.props.actions} update={true} closePopUp={()=>this.closePopUp}/> : null }
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
