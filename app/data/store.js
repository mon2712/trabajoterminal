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
            status: "",
            note:"", 
            date: ""
        },
        configCallDone: {
            done: [],
            notDone: []
        },
        menuTypes: {},
        notifications: null,
        studentsAtCenter: null,
        students: null,
        studentFileInfo: null,
        studentsMissPayment: null,
        paymentListStudent: null,
        setFiles: {
            fileBase: "",
            fileReport: ""
        },
        studentsViewCenter: "",
        assistants: null,
        selectedPeople: null,
        assistant: {
            arriveTime: "",
            idAssistant: "",
            lastName: "",
            level: "",
            name: "",
            password: "",
            phone: "",
            username: "",
            status: "",
            lunes: "",
            jueves: "",
            miercoles:"",
            sabado:"",
            type: 1,
        },
        response: {
            info: "",
            active: false
        },
        responsePayment: {
            info: "",
            active: false
        },
        annualPlanInfo: null,
        annualPlanResults: {
            view: 0,
            infoStudent: "",
            exams: [],
            finalScore: 0,
            startPoint: []
        },
        annualPlan: null,
        loader: {
            selectionList: true,
            annualPlan: true,
            asisstance: true,
            notification: true,
            scanCode: false,
            gafetes: false,
            users: false
        },
        popUpAssistance: false,
        welcomeInfo: null
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
        AppData.data.students="";
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
    getAllStudents(action){
        axios.get('http://localhost:8088/pt1.pt2/webapi/alumno/getAllStudents', {
            params: {
                filter: action.filter
            }
        })
        .then(function (response){
            AppData.data.loader.selectionList = false;            
            if(response.data.allStudents.length === 0){
                AppData.data.students = "";
            }else{
                AppData.data.students = response.data.allStudents;
            }
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log(error);
        });

    },
    getNotifications(action){
        console.log("si llega hasta aca")
        axios.get('http://localhost:8088/pt1.pt2/webapi/recepcion/getNotifications')
        .then(function (response){
            AppData.data.loader.notification = false;          
            if(response.data.notifications.length === 0){
                console.log("esta vacio")
                AppData.data.notifications = "";
            }else{
                console.log("no esta vacio")
                AppData.data.notifications = response.data.notifications;
            }
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log(error);
        });
    },
    getStudentsAtCenter(action){
        var filter=null;
        if(action.filt===undefined) filter=""
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
        axios.get('http://localhost:8088/pt1.pt2/webapi/alumno/getStudentFile', {
            params: {
                id: action.id
            }
        })
        .then(function (response){
            AppData.data.studentFileInfo = response.data.student;
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log(error);
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
        axios.get('http://localhost:8088/pt1.pt2/webapi/instructor/getStudentsMissingPayments')
        .then(function (response){
            if(response.data.studentMissingPayment.length === 0){
                AppData.data.studentsMissPayment = "";
            }else{
                AppData.data.studentsMissPayment = response.data.studentMissingPayment;
            }
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log(error);
        });
    },
    getPaymentListStudent(action){
        axios.get('http://localhost:8088/pt1.pt2/webapi/instructor/getPaymentOfStudent',{
            params: {
                idStudent: action.idStudent
            }
        })
        .then(function (response){
            if(response.data.paymentsStudent[0].err){
                AppData.data.response.info = response.data.paymentsStudent[0];
                AppData.data.response.active = true;
                AppData.data.paymentListStudent = "";
            }else{
                AppData.data.paymentListStudent = response.data.paymentsStudent;
            }
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log(error);
        });
    },
    getConfigCall(action){
        AppData.data.configCall.active = action.active;
        AppData.data.configCall.name = action.name;
        AppData.data.configCall.id = action.id;
        AppData.data.configCall.status = action.status;
        AppData.data.configCall.not = action.note;
        AppData.data.configCall.date = action.date;
         AppData.data.configCall.old = action.old;
        
        AppStore.emitChange();
    },
    getConfigCallDone(){
        var cadena="http://localhost:8088/pt1.pt2/webapi/recepcion/getStudentsCalls";
        axios.get(cadena)
        .then(function(response){
            var ListOfCalls = response.data.listOfCalls;
            AppData.data.configCallDone.done = [];
            AppData.data.configCallDone.notDone = [];
                ListOfCalls.map((student,index)=>{
                    if(student.call.done=="true"){
                        AppData.data.configCallDone.done.push(student);
                    }else{
                        AppData.data.configCallDone.notDone.push(student);
                    }
                });
            AppStore.emitChange();
         
        })
        .catch(function (error){
            console.log( error);
        });
    },
    getNote(action){
        AppData.data.configCallDone.done.map((student,index)=>{
            if(action.id === student.idStudent){
                AppData.data.configCallDone.done[index].call.active=action.active;
            }
        });
        AppStore.emitChange();
    },
    setNoteCall(action){
        axios.put('http://localhost:8088/pt1.pt2/webapi/recepcion/'+action.id+"/"+action.note+"/"+action.date)
        .then(function(response){
            AppData.data.configCall.active = false;
            AppData.getConfigCallDone();
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log( error);
        });
        
    },
    setFiles(action){
        axios.put('http://localhost:8088/pt1.pt2/webapi/documento/'+action.fileBase+"/"+action.fileReport)
        .then(function(response){
        })
        .catch(function (error){
            console.log( error);
        });
    },
    getStatusCenter(){
        //studentsViewCenter
        axios.get('http://localhost:8088/pt1.pt2/webapi/centro/getStatusOfCenter')
        .then(function (response){
            if(response.data.asistentes.length === 0){
                AppData.data.studentsViewCenter = "";
            }else{
                AppData.data.studentsViewCenter = response.data;
            }
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log(error);
        });
    },
    getAllAssistants(){
        axios.get('http://localhost:8088/pt1.pt2/webapi/asistente/getAllAssistants')
        .then(function (response){
            AppData.data.loader.selectionList = false;
            if(response.data.allAssistants.length === 0){
                AppData.data.assistants = "";
            }else{
                AppData.data.assistants = response.data.allAssistants;
            }
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log(error);
        });
    },
    createStamp(action){
        AppData.data.loader.gafetes = true;        
        AppData.data.selectedPeople = action.selectedPeople;
        AppStore.emitChange();

        axios.post('http://localhost:8088/pt1.pt2/webapi/instructor/createStampsStudents', 
        {
            selectedPeople: AppData.data.selectedPeople
        }
        ,{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(function (response){
            console.log("response cread stamp ", response)
            AppData.data.loader.gafetes = false;
            AppData.data.response.info = response.data.response.message;
            AppData.data.response.active = true;
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log(error);
        });
    },
    createIdsAssistants(action){
        AppData.data.loader.gafetes = true;
        AppData.data.selectedPeople = action.selectedPeople;
        AppStore.emitChange();

        axios.post('http://localhost:8088/pt1.pt2/webapi/instructor/createIds', 
        {
            selectedPeople: AppData.data.selectedPeople
        }
        ,{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(function (response){
            console.log("response cread ids ",response.data.response)
            AppData.data.loader.gafetes = false;
            AppData.data.response.info = response.data.response.message;
            AppData.data.response.active = true;
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log(error);
        });
    },
    getAssistantInfo(action){
        if(action.view == 4){

            axios.post('http://localhost:8088/pt1.pt2/webapi/asistente/getAssistantInfo', 
            {
                selectedPeople: action.selectedPeople
            }
            ,{
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(function (response){
                AppData.data.loader.selectionList = false;            
                AppData.data.assistant = response.data.assistantInfo;
                AppStore.emitChange();
                
            })
            .catch(function (error){
                console.log(error);
            });

        }else if(action.view == 3){
            AppData.data.assistant.arriveTime = "",
            AppData.data.assistant.idAssistant = "",
            AppData.data.assistant.lastName = "",
            AppData.data.assistant.level = "",
            AppData.data.assistant.name = "",
            AppData.data.assistant.password = "",
            AppData.data.assistant.phone = "",
            AppData.data.assistant.username = "", 
            AppData.data.assistant.lunes = "", 
            AppData.data.assistant.miercoles = "", 
            AppData.data.assistant.jueves = "", 
            AppData.data.assistant.sabado = "", 
            AppData.data.assistant.type = "asistente", 
            AppStore.emitChange();
        }
    },
    setAssistant(action){
        AppData.data.loader.users = true;
        AppStore.emitChange();

        axios.post('http://localhost:8088/pt1.pt2/webapi/asistente/setAssistant', 
        {
            infoAssistant: action.infoAssistant
        }
        ,{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(function (response){
            AppData.data.loader.users=false;
            AppData.data.response.info = response.data.assistantInfo;
            AppData.data.response.active = true;
            AppStore.emitChange();
                
        })
        .catch(function (error){
            console.log(error);
        });
    },
    setResponseEmpty(){
        AppData.data.response.info = "";
        AppData.data.response.active = false;
        AppStore.emitChange();
    },
    setPaymentTuition(action){
        axios.post('http://localhost:8088/pt1.pt2/webapi/instructor/setTuition', 
        {
            infoPayment: action.infoPayment
        }
        ,{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(function (response){
            AppData.data.responsePayment.info = response.data.response;
            AppData.data.responsePayment.active = true;
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log(error);
        });
    },
    cleanResponse(){
        AppData.data.response.info = "";
        AppData.data.response.active = false;
        AppData.data.responsePayment.info = "";
        AppData.data.responsePayment.active = false;
        AppStore.emitChange();
    },
    getFormAnualPlan(action){
        axios.get('http://localhost:8088/pt1.pt2/webapi/test/getTestAnnualPlan', 
        {
            params: {
                infoToGet: action.infoToGet
            }
        }
        ,{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(function (response){
            AppData.data.loader.annualPlan = false;   
            AppData.data.annualPlanInfo = response.data.infoForm
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log(error);
        });
    },
    setAnnualPlan(action){
        AppData.data.loader.annualPlan = true;
        if(action.view === 0){
            AppData.data.loader.annualPlan = false;
            AppData.data.annualPlanResults.exams = action.result.finalArray;
            AppData.data.annualPlanResults.infoStudent = action.result.infoStudent;
            AppData.data.annualPlanResults.view = action.view+1;
            AppStore.emitChange(); 
        }else if(action.view === 1){
            AppData.data.loader.annualPlan = false;
            AppData.data.annualPlanResults.finalScore = action.result;
            AppData.data.annualPlanResults.view = action.view+1;
            AppStore.emitChange(); 
        }else if(action.view === 2){
            AppData.data.annualPlanResults.startPoint = action.result; 
            AppStore.emitChange();  
            axios.put('http://localhost:8088/pt1.pt2/webapi/proyeccionAnual/setAnnualPlan', 
            {
                resultsTest: AppData.data.annualPlanResults
            }
            ,{
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(function (response){
                AppData.data.loader.annualPlan = false;            
                AppData.data.annualPlan = response.data.annualPlan.info;
                AppData.data.annualPlanResults.view = 3;
                AppStore.emitChange();
            })
            .catch(function (error){
                console.log(error);
            });
        }
        AppStore.emitChange();
    },
    getStudentsWithoutAnnualPlan(){
        axios.get('http://localhost:8088/pt1.pt2/webapi/alumno/getStudentsWithoutAnnualPlan')
        .then(function (response){
            AppData.data.loader.selectionList = false;                        
            if(response.data.allStudents.length === 0){
                AppData.data.students = "";
            }else{
                AppData.data.students = response.data.allStudents;
            }
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log(error);
        });
    },
    getStudentsWithAnnualPlan(){
        axios.get('http://localhost:8088/pt1.pt2/webapi/alumno/getStudentsWithAnnualPlan')
        .then(function (response){
            AppData.data.loader.selectionList = false;                        
            if(response.data.allStudents.length === 0){
                AppData.data.students = "";
            }else{
                AppData.data.students = response.data.allStudents;
            }
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log(error);
        });
    },
    cleanAnnualPlan(){
        AppData.data.annualPlanInfo = null;
        AppData.data.annualPlan= null;
        AppData.data.annualPlanResults.view=0;
        AppData.data.annualPlanResults.infoStudent="";
        AppData.data.annualPlanResults.exams=[];
        AppData.data.annualPlanResults.finalScore=0;
        AppData.data.annualPlanResults.startPoint=[];
        
        AppStore.emitChange();
    },
    getAnnualPlan(action){
        axios.get('http://localhost:8088/pt1.pt2/webapi/proyeccionAnual/getAnnualPlan',{
            params: {
                idAlumno: action.id
            }
        })
        .then(function (response){
            AppData.data.loader.annualPlan = false;
            if(response.data.annualPlan.err){
                AppData.data.response.info = response.data.annualPlan;
                AppData.data.response.active = true;
                AppData.data.annualPlan = null;
            }else{
                AppData.data.annualPlan = response.data.annualPlan.info;
                AppData.data.response.info = "";
                AppData.data.response.active = false;
            }
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log(error);
        });
    },
    setAssistanceStudent(action){
        AppData.data.loader.scanCode = true;
        AppStore.emitChange();
        axios.post('http://localhost:8088/pt1.pt2/webapi/recepcion/setAssistance', {
            scanned: action.scanned
        })
        .then(function (response){
            AppData.data.loader.scanCode = false;
            AppData.data.popUpAssistance = false;
            AppData.data.welcomeInfo = response.data.student;
            AppData.data.studentFileInfo = response.data.student;            
            AppStore.emitChange();
            axios.get('http://localhost:8088/pt1.pt2/webapi/recepcion/getNotifications')
            .then(function (response){
                AppData.data.loader.notification = false;            
                if(response.data.notifications.length === 0){
                    console.log("entra a vacio")
                    AppData.data.notifications = "";
                }else{
                    console.log("no esta vacio")
                    AppData.data.notifications = response.data.notifications;
                }
                AppStore.emitChange();
            })
            .catch(function (error){
                console.log(error);
            });
            
        })
        .catch(function (error){
            console.log(error);
        });
    },
    tooglePopUp(){
        console.log("llego")
        AppData.data.popUpAssistance = true;
        AppStore.emitChange();
    },
    closeNotification(action){
        console.log("clos notif en el store ", action)

        axios.delete('http://localhost:8088/pt1.pt2/webapi/recepcion/'+action.student.idStudent)
        .then(function(response){
            console.log("response ", response)
            AppData.data.loader.notification = false;            
                if(response.data.notifications.length === 0){
                    console.log("entra a vacio")
                    AppData.data.notifications = "";
                }else{
                    console.log("no esta vacio")
                    AppData.data.notifications = response.data.notifications;
                }
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log( error);
        });
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
    },
    getInfoAssistant: () => {
        return AppData.data.assistant;
    },
    getFormAnnualPlanInfo: () => {
        return AppData.data.annualPlanInfo;
    },
    getWelcomeInfo: () => {
        return AppData.data.welcomeInfo
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
    case actionTypes.GET_ALLSTUDENTS:
        AppData.getAllStudents(action);
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
        AppData.getStudentInfo(action);
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
        AppData.getPaymentListStudent(action);
        break;
    case actionTypes.GET_CONFIGCALL:
        AppData.getConfigCall(action);
        break;
    case actionTypes.GET_CONFIGCALLDONE:
        AppData.getConfigCallDone(action);
        break;
    case actionTypes.GET_NOTE:
        AppData.getNote(action);
        break;
    case actionTypes.SET_FILES:
        AppData.setFiles(action);
        break; 
    case actionTypes.GET_STATUSATCENTER:
        AppData.getStatusCenter();
        break; 
    case actionTypes.GET_ALLASSISTANTS:
        AppData.getAllAssistants();
        break; 
    case actionTypes.CREATE_STAMP:
        AppData.createStamp(action);
        break; 
    case actionTypes.CREATE_IDSASSISTANTS:
        AppData.createIdsAssistants(action);
        break; 
    case actionTypes.GET_ASSISTANTINFO:
        AppData.getAssistantInfo(action);
        break;
    case actionTypes.SET_ASSISTANT:
        AppData.setAssistant(action);
        break; 
    case actionTypes.SET_RESPONSEEMPTY:
        AppData.setResponseEmpty();
        break; 
    case actionTypes.SET_PAYMENTTUITION:
        AppData.setPaymentTuition(action);
        break; 
    case actionTypes.SET_NOTECALL:
        AppData.setNoteCall(action);
        break;
    case actionTypes.CLEAN_RESPONSE:
        AppData.cleanResponse();
        break;
    case actionTypes.GET_FORMANUALPLAN:
        AppData.getFormAnualPlan(action);
        break; 
    case actionTypes.SET_ANNUALPLAN:
        AppData.setAnnualPlan(action);
        break; 
    case actionTypes.GET_STUDENTSWITHOUTANNUALPLAN:
        AppData.getStudentsWithoutAnnualPlan();
        break;
    case actionTypes.GET_STUDENTSWITHANNUALPLAN:
        AppData.getStudentsWithAnnualPlan();
        break; 
    case actionTypes.CLEAN_ANNUALPLAN:
        AppData.cleanAnnualPlan();
        break; 
    case actionTypes.GET_ANNUALPLAN:
        AppData.getAnnualPlan(action);
        break; 
    case actionTypes.SET_ASSISTANCESTUDENT:
        AppData.setAssistanceStudent(action);
        break; 
    case actionTypes.TOOGLE_POPUP:
        AppData.tooglePopUp();
        break; 
    case actionTypes.CLOSE_NOTIFICATION:
        AppData.closeNotification(action);
        break;
    default: 
		// no op
    }
});

module.exports = AppStore;