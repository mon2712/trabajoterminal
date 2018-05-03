import SelectionList from '../menu/selectionList';
import React from 'react';


class RegisterPayment extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.renderDropMonths = this.renderDropMonths.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.changeType = this.changeType.bind(this);
        this.sendToRegister=this.sendToRegister.bind(this);  
        this.activeList = this.activeList.bind(this);
        this.state = {
            view: 0,
            listMonths: false,
            listYears: false,
            startYear: 2010,
            months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            typesOfPayments: ["Débito", "Crédito", "Efectivo", "Transferencia"],
            years: [],
            infoPayment:{
                date: "",
                card: "",
                idStudent: "",
                type: "",
                quantity: "",
                month: 0,
                year: ""
            }
        };
    }
    componentDidMount(){
        this.setBasics();
    }
    handleChange(event) {
        var arrayToEdit = this.state.infoPayment;
        var name= event.target.name;

        arrayToEdit[name] = event.target.value;
        this.setState({
            arrayToEdit
        })

    }
    changeMonth(index){
        console.log("index", index)

        var infoToEdit = this.state.infoPayment;
        infoToEdit["month"] = index;

        this.setState({
            infoToEdit,
            listMonths: !this.state.listMonths
        });
    }
    changeYear(value){
        console.log("value", value)

        var infoToEdit = this.state.infoPayment;
        infoToEdit["year"] = value;

        this.setState({
            infoToEdit,
            listYears: !this.state.listYears
        });
    }
    activeList(type){
        console.log("activeList", type)
        if(type === 1) 
            this.setState({
                listMonths: !this.state.listMonths
            });

        if(type === 2) 
            this.setState({
                listYears: !this.state.listYears
            });
        
    }
    sendToRegister(){
        console.log("mandar", this.state)
        if(this.state.infoPayment.type===2){
            if(this.state.infoPayment.idStudent.length !== '' && this.state.infoPayment.month != "" && this.state.infoPayment.quantity != "" && this.state.infoPayment.type !== "" && this.state.infoPayment.year !== ""){
                this.props.actions.setPaymentTuition(this.state.infoPayment);
            }
        }else{
            if(this.state.infoPayment.card !== "" && this.state.infoPayment.idStudent.length !== 0 && this.state.infoPayment.month != "" && this.state.infoPayment.quantity != "" && this.state.infoPayment.type !== "" && this.state.infoPayment.year !== ""){
                this.props.actions.setPaymentTuition(this.state.infoPayment);                
            }
            
        }
    }
    renderDropMonths(){
        return (
            <div className="selectionMonths">
                <div className={this.state.listMonths === true ? "selectedMonth listActive" : "selectedMonth"}>{this.state.months[this.state.infoPayment.month]}</div>
                <div className="iconContainer"  onClick={() => this.activeList(1)}> 
                    <span className="icon-circle-down"></span>
                </div>
                <div className="listMonths" style={{display: this.state.listMonths === true ? 'block' : 'none'}}>
                    {this.state.months.map((opt, index) => (
                        <div className={this.state.infoPayment.month === index ? "optionList selected" : "optionList"} key={index} onClick={() => this.changeMonth(index)}>
                            {opt}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    renderDropYears(){
        return (
            <div className="selectionYears">
                <div className={this.state.listYears === true ? "selectedYear listActive" : "selectedYear"}>{this.state.infoPayment.year}</div>
                <div className="iconContainer" onClick={() => this.activeList(2)}> 
                    <span className="icon-circle-down"></span>
                </div>
                <div className="listYears" style={{display: this.state.listYears === true ? 'block' : 'none'}}>
                    {this.state.years.map((opt, index) => (
                        <div className={this.state.infoPayment.year === opt ? "optionList selected" : "optionList"} key={index} onClick={() => this.changeYear(opt)}>
                            {opt}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    setBasics(){
        var d = new Date();
        var days = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
        var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        var day, month;

        if(d.getDate()<10) day="0"+d.getDate(); else day = d.getDate();
        if(d.getMonth()<10) month="0"+(d.getMonth()+1); else month=d.getMonth()+1;

        var numberDate = d.getFullYear()+"/"+month+"/"+day;
        var start = this.state.startYear;

        for(var i = 0; (i+this.state.startYear)<=d.getFullYear(); i++){
            this.state.years.push(start);  
            start=start+1;
        }


        var infoToEdit = this.state.infoPayment;
        infoToEdit["date"] = numberDate;
        infoToEdit["idStudent"]=this.props.selected[0].idStudent;
        infoToEdit["type"]=0;
        infoToEdit["month"]=d.getMonth();
        infoToEdit["year"]=d.getFullYear();
        
        this.setState({
            infoToEdit
        })
    }
    changeType(index){
        var infoToEdit = this.state.infoPayment;
        infoToEdit["type"] = index;

        this.setState({
            infoToEdit,
        });
    }
    renderTypesPayment(){
        return(
            <div className="typesOfPayments">
                <span className="typePay">Tipo de pago: </span>
                <div className="typesContainer">
                    {this.state.typesOfPayments.map((opt, index) => (
                        <div className="optionPayment" key={index}>
                            <div className={this.state.infoPayment.type === index ? "checkbox active" : "checkbox"} onClick={() => this.changeType(index)}>
                                <span className="ico icon-checkmark"></span>
                            </div>
                            <span>{opt}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    renderForm(){
        return(
            <div>
                <div className="form">
                    <div className="leftColumn">
                        <span className="ico icon-smile"></span>
                        <span className="nameStudent">{this.props.selected[0].name}</span>
                    </div>
                    <div className="rightColumn">
                        <span className="date">Fecha: </span>
                        <span className="valueDate">{this.state.infoPayment.date}</span>
                    </div>
                    {this.renderTypesPayment()}
                    <div className="leftColumn">
                        <span className="month">Mes: </span>
                        {this.renderDropMonths()}
                    </div>
                    <div className="rightColumn">
                        <span className="year">Año: </span>
                        {this.renderDropYears()}
                    </div>
                    <div className="leftColumn">
                        <span className="quantity"> Cantidad: </span>
                        <span className="moneySym">$</span>
                        <input type="number" maxLength="8" name="quantity" className="quantityVal" value={this.state.infoPayment.quantity} onChange={this.handleChange}></input>
                    </div>
                    <div className="rightColumn"  style={{display: this.state.infoPayment.type === 2 ? 'none' : 'inline-block'}}>
                        <span className="digits" >Digitos: </span>
                        <span className="stars">XXXXXXXXXXXX</span>
                        <input  type="number" maxLength="4" name="card" className="digits4" value={this.state.infoPayment.card} onChange={this.handleChange}></input>
                    </div>
                </div>
                <div className="button" onClick={this.sendToRegister}>
                    Aceptar
                </div>
            </div>
        );
    }
    render() {
        return (
            this.renderForm()
        );
    }
  }
  export default RegisterPayment;

