import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

class annualPlanView extends React.Component {
    constructor(props){
        super(props);
        this.returnToMenu=this.returnToMenu.bind(this);
        //this.state={
            
        //};
    }
    renderPlan(){
        return(
            <div className="annualPlan">
                <table>
                    <tbody>
                        <tr>
                            <th className="">
                                Nivel
                            </th>
                            <th className="">
                                Frecuencia
                            </th>
                            <th className="">
                                Tipo
                            </th>
                            <th className="">
                                Total de Páginas
                            </th>
                            <th className="">
                                Total de Páginas por Mes
                            </th>
                            <th className="">
                                Meses para terminar
                            </th>
                            <th className="">
                                Páginas por día
                            </th>
                            <th className="">
                                TEF
                            </th>
                            <th className="">
                                Tiempo de trabajo diario
                            </th>
                        </tr>
                {
                    this.props.annualPlanInfo.map((plan, index) => (
                        <tr className="colLevels" key={index}>
                            <td className="">
                                <span>{plan.level}</span>
                            </td>
                            <td className="">
                                <span>{plan.frequency}</span>
                            </td>
                            <td className="">
                                <span>{plan.type}</span>
                            </td>
                            <td className="">
                                <span>{plan.totalPages}</span>
                            </td>
                            <td className="">
                                <span>{plan.totalPagesPerMonth}</span>
                            </td>
                            <td className="">
                                <span>{plan.months}</span>
                            </td>
                            <td className="">
                               <span>{plan.dailyPages}</span>
                            </td>
                            <td className="">
                                <span>{plan.timeLevel}</span>
                            </td>
                            <td className="">
                               <span>{plan.dailyTime}</span>
                            </td>
                        </tr>
                    ))
                }
                    </tbody>
                </table>
            </div>
        );
    }
    returnToMenu(){
        this.props.actions.cleanAnnualPlan();
        this.props.history.push({
            pathname: '/menu'
        });
    }
    render() {
		return (
			<div className="proyeccionanual">
                <span className="title">Proyección Anual</span>
                {this.renderPlan()}
                <div className="button" onClick={this.returnToMenu}>Finalizar</div>
            </div>
		);
	}
  }
  
  export default withRouter(annualPlanView);