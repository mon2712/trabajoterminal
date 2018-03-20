import actionTypes from './actionTypes';
import dispatcher from './dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import axios from 'axios';
//import _ from 'underscore';

const CHANGE_EVENT = 'change';

let AppData = {
    data:{
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
        filt: null
    },
    getUser() {
    },
    getMenuTypes(action){
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
        var cadena="http://localhost:8088/pt1.pt2/webapi/centro/getStateAtCenter?filter="+AppData.data.filt;
        axios.get(cadena)
        .then(function(response){
            console.log(response)
            AppData.data.studentsAtCenter = response.data.studentsInCenter;
            AppStore.emitChange();
        })
        .catch(function (error){
            console.log("Estoy en el error del estore: ", error);
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
        //console.log("hola",action.timeRed);
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
    case actionTypes.GET_USER:
        AppData.getUser();
        break;
    case actionTypes.GET_MENUTYPES:
        AppData.getMenuTypes(action);
        break;
    case actionTypes.GET_NOTIFICATIONS:
        AppData.getNotifications(action);
        break;
    case actionTypes.GET_STUDENTSATCENTER:
        AppData.getStudentsAtCenter();
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