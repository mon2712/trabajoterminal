import actionTypes from './actionTypes';
import dispatcher from './dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import App from '../components/app';
//import _ from 'underscore';

const CHANGE_EVENT = 'change';

let AppData = {
    data:{
        isAuthenticated: false,
        tries: {
            max: 3,
            count: 0
        },
        authenticationInfo: {
            code: null,
            id: null,
            name: null,
            type: null
        },
        configTime: {
            active: false,
            name: "",
            id: "",
            timeRed: ""
        },
        configCall: {
            active: false,
            name: "",
            id: "",
            status: ""
        },
        configCallDone: {
            done: [],
            notDone: []
        },
        menuTypes: {},
        notifications: null,
        studentsAtCenter: null,
        studentFileInfo: null,
        studentsMissPayment: null,
        paymentListStudent: null,
    },
    confirmLogin(){
        if(localStorage.getItem("code") !== null){
            AppData.data.isAuthenticated=true;
            AppData.data.authenticationInfo.code=localStorage.getItem("code");
            AppData.data.authenticationInfo.id=localStorage.getItem("id");
            AppData.data.authenticationInfo.name=localStorage.getItem("name");
            AppData.data.authenticationInfo.type=localStorage.getItem("type");
            AppStore.emitChange();
        }
    },
    getUserLogin(action) {
        axios.get('http://localhost:8088/pt1.pt2/webapi/personal/getLogin', {
            params: {
                user: action.user,
                pass: action.pass
            }
        })
        .then(function (response) {
            if(response.data.infoLogin.code===0){
                AppData.data.tries.count++;
                AppData.data.isAuthenticated=false;
                AppData.data.authenticationInfo=response.data.infoLogin; 
                if(AppData.data.tries.count >= 3){
                    AppData.data.authenticationInfo.type="Has excedido el número de intentos permitidos"
                }
                AppStore.emitChange();                
            }else if(response.data.infoLogin.code===1){
                if(response.data.infoLogin.type === "recepcion" || response.data.infoLogin.type === "instructor"){
                    AppData.data.isAuthenticated=true;
                    AppData.data.authenticationInfo=response.data.infoLogin;
                    if (typeof(Storage) !== "undefined") {
                        localStorage.code = response.data.infoLogin.code;
                        localStorage.id = response.data.infoLogin.id;
                        localStorage.name = response.data.infoLogin.name;
                        localStorage.type = response.data.infoLogin.type;
                    } else {
                        console.log("Sorry! No Web Storage support..")
                    }
                    AppStore.emitChange();
                }else if(response.data.infoLogin.type === "asistente"){
                    AppData.data.isAuthenticated=false;
                    AppData.data.authenticationInfo=response.data.infoLogin;
                    AppData.data.authenticationInfo.code=0;
                    AppData.data.authenticationInfo.type="Tu usuario no cuenta con permisos para accesar";
                    AppStore.emitChange();
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    closeLogin(){
        localStorage.code = "";
        localStorage.id = "";
        localStorage.name = "";
        localStorage.type = "";
        AppData.data.isAuthenticated=false;
        AppData.data.authenticationInfo.code="";
        AppData.data.authenticationInfo.id="";
        AppData.data.authenticationInfo.name="";
        AppData.data.authenticationInfo.type="";
        AppStore.emitChange();
    },
    changeValueCode(){
        AppData.data.authenticationInfo.code=-1;
        AppStore.emitChange();
    },
    getMenuTypes(){
        $.getJSON('/app/fillData/menuTypes.js', function(info) {
           AppData.data.menuTypes = info.menuTypes;
           AppStore.emitChange();
        }).fail(function(error) {
            console.error(error);
        });
    },
    getNotifications(action){
        $.getJSON('/app/fillData/notifications.js', function(info) {
           AppData.data.notifications = info.notifications;
           AppStore.emitChange();
        }).fail(function(error) {
            console.error(error);
        });
    },
    getStudentsAtCenter(action){
        var filter=null;
        if(action.filt===undefined) filter="Jose"
        else filter=action.filt
        var cadena="http://localhost:8088/pt1.pt2/webapi/centro/getStateAtCenter?filter="+filter;
        axios.get(cadena)
        .then(function(response){
            AppData.data.studentsAtCenter = response.data.studentsInCenter;
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log( error);
        });
    },
    setTimeRed(action){
        axios.put('http://localhost:8088/pt1.pt2/webapi/centro/'+action.idStudent+"/"+action.timeRed)
        .then(function(response){
        })
        .catch(function (error){
            console.log( error);
        });
    },
    getStudentInfo(action){
        $.getJSON('/app/fillData/studentInfo.js', function(info) {
            AppData.data.studentFileInfo = info[0].student;
            AppStore.emitChange();
        }).fail(function(error) {
            console.error(error);
        });
    },
    closeStudentFile(){
        AppData.data.studentFileInfo = null;
        AppStore.emitChange();
    },
    getConfigTime(action){
        AppData.data.configTime.active = action.active;
        AppData.data.configTime.id = action.id;
        AppData.data.configTime.name = action.name;
        AppData.data.configTime.timeRed = action.timeRed;
        AppStore.emitChange();
    },
    getStudentMissPayment(){
        $.getJSON('/app/fillData/studentsInCenter.js', function(info) {
            AppData.data.studentsMissPayment = info.studentsInCenter;
            AppStore.emitChange();
        }).fail(function(error) {
            console.error(error);
        });
        AppStore.emitChange();  
    },
    getPaymentListStudent(){
        $.getJSON('/app/fillData/paymentsStudent.js', function(info) {
            AppData.data.studentsMissPayment = info.studentsInCenter;
            AppStore.emitChange();
        }).fail(function(error) {
            console.error(error);
        });
        AppStore.emitChange();
    },
    getConfigCall(action){
        AppData.data.configCall.active = action.active;
        AppData.data.configCall.name = action.name;
        AppData.data.configCall.id = action.id;
        AppData.data.configCall.status = action.status;
        AppData.data.configCall.timeRed = action.timeRed;
        AppStore.emitChange();
    },
    getConfigCallDone(){
        $.getJSON('/app/fillData/listOfCalls.js', function(info) {
            var ListOfCalls = info.listOfCalls;
            AppData.data.configCallDone.done = [];
            AppData.data.configCallDone.notDone = [];
                ListOfCalls.map((student,index)=>{
                    if(student.call.done==true)
                        AppData.data.configCallDone.done.push(student);
                    else
                        AppData.data.configCallDone.notDone.push(student);
                });
            AppStore.emitChange();
         }).fail(function(error) {
             console.error(error);
         });
    },
    getNote(action){
        AppData.data.configCallDone.done.map((student,index)=>{
            if(action.id === student.idStudent){
                AppData.data.configCallDone.done[index].call.active=action.active;
            }
        });
        AppStore.emitChange();
    }
}

let AppStore = assign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppStore = assign({}, AppStore, {
    getData: () => {
        return AppData.data;
    }
});

dispatcher.register((action) => {
    switch (action.type) {
    case actionTypes.CHANGEVALUE_CODE:
        AppData.changeValueCode();
        break;
    case actionTypes.CLOSE_LOGIN:
        AppData.closeLogin();
        break;
    case actionTypes.CONFIRM_LOGIN:
        AppData.confirmLogin();
        break;
    case actionTypes.GET_USERLOGIN:
        AppData.getUserLogin(action);
        break;
    case actionTypes.GET_MENUTYPES:
        AppData.getMenuTypes();
        break;
    case actionTypes.GET_NOTIFICATIONS:
        AppData.getNotifications(action);
        break;
    case actionTypes.GET_STUDENTSATCENTER:
        AppData.getStudentsAtCenter(action);
        break;
    case actionTypes.SET_TIMERED:
        AppData.setTimeRed(action);
        break;
    case actionTypes.GET_STUDENTINFO:
        AppData.getStudentInfo();
        break;
    case actionTypes.CLOSE_STUDENTFILE:
        AppData.closeStudentFile();
        break;
    case actionTypes.GET_CONFIGTIME:
        AppData.getConfigTime(action);
        break;
    case actionTypes.GET_STUDENTSMISSPAYMENT:
        AppData.getStudentMissPayment();
        break;
    case actionTypes.GET_PAYMENTLISTSTUDENT:
        AppData.getPaymentListStudent();
        break;
    case actionTypes.GET_CONFIGCALL:
        AppData.getConfigCall(action);
        break;
    case actionTypes.GET_CONFIGCALLDONE:
        AppData.getConfigCallDone(action);
        break;
    case actionTypes.GET_NOTE:
        AppData.getNote(action);
    default:
		// no op
    }
});

module.exports = AppStore;