import actionTypes from './actionTypes';
import dispatcher from './dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
//import _ from 'underscore';

const CHANGE_EVENT = 'change';

let AppData = {
    data:{
        user:['Montse', 'Vane'],
        password: ['hola', 'holi'],
        configTime: {
            active: false,
            name: "",
            id: ""
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
        note:{
            active: false,
            name: "",
            id: "",
            note: ""
        },
        menuTypes: {},
        notifications: null,
        studentsAtCenter: null,
        studentFileInfo: null
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
        $.getJSON('/app/fillData/studentsInCenter.js', function(info) {
            AppData.data.studentsAtCenter = info.studentsInCenter;
           AppStore.emitChange();
        }).fail(function(error) {
            console.error(error);
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
        AppStore.emitChange();
       
    },
    getConfigCall(action){
        AppData.data.configCall.active = action.active;
        AppData.data.configCall.name = action.name;
        AppData.data.configCall.id = action.id;
        AppData.data.configCall.status = action.status;
        AppStore.emitChange();
    },
    getConfigCallDone(){
        $.getJSON('/app/fillData/listOfCalls.js', function(info) {
            var ListOfCalls = info.listOfCalls;
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
        AppData.data.note.active = action.active;
        AppData.data.note.name = action.name;
        AppData.data.note.id = action.id;
        AppData.data.note.note = action.note;
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