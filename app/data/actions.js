import actionTypes from './actionTypes';
import dispatcher from './dispatcher';

const Actions = {
    confirmLogin() {
        dispatcher.dispatch({
            type: actionTypes.CONFIRM_LOGIN
        });
    },
    closeLogin() {
        dispatcher.dispatch({
            type: actionTypes.CLOSE_LOGIN
        });
    },
    changeValueCode() {
        dispatcher.dispatch({
            type: actionTypes.CHANGEVALUE_CODE
        });
    },
    getUserLogin(user, pass) {
        dispatcher.dispatch({
            type: actionTypes.GET_USERLOGIN,
            user,
            pass
        });
    },
    getMenuTypes(typeMenu) {
        dispatcher.dispatch({
            type: actionTypes.GET_MENUTYPES
        });
    },
    getAllStudents(filter) {
        dispatcher.dispatch({
            type: actionTypes.GET_ALLSTUDENTS,
            filter
        });
    },
    getNotifications() {
        dispatcher.dispatch({
            type: actionTypes.GET_NOTIFICATIONS
        });
    },
    getStudentsAtCenter(filt) {
        dispatcher.dispatch({
            type: actionTypes.GET_STUDENTSATCENTER,
            filt

        });
    },
    setTimeRed(id, timeRed) {
        dispatcher.dispatch({
            type: actionTypes.SET_TIMERED,
            idStudent: id,
            timeRed
        });
    },
    getStudentInfo(id) {
        dispatcher.dispatch({
            type: actionTypes.GET_STUDENTINFO,
            id
        });
    },
    closeStudentFile() {
        dispatcher.dispatch({
            type: actionTypes.CLOSE_STUDENTFILE
        });
    },
    getConfigTime(active, id, name, timeRed){
        dispatcher.dispatch({
            type: actionTypes.GET_CONFIGTIME,
            active,
            id,
            name,
            timeRed
        })
    },
    getStudentMissPayment(){
        dispatcher.dispatch({
            type: actionTypes.GET_STUDENTSMISSPAYMENT
        });
    },
    getPaymentListStudent(){
        dispatcher.dispatch({
            type: actionTypes.GET_PAYMENTLISTSTUDENT
        });
    },
    getConfigCall(active,name, id, status, note, date){
        dispatcher.dispatch({
            type: actionTypes.GET_CONFIGCALL,
            active,
            name,
            id,
            status, 
            note, 
            date
        });
    },
    getConfigCallDone(){
        dispatcher.dispatch({
        type: actionTypes.GET_CONFIGCALLDONE
        });
    },
    getNote(active,name, id, note){
        dispatcher.dispatch({
            type: actionTypes.GET_NOTE,
            active,
            name,
            id
        });
    },
    setFiles(fileBase,fileReport){
        dispatcher.dispatch({
            type: actionTypes.SET_FILES,
            fileBase,
            fileReport
        });
    },
    getStatusCenter(){
        dispatcher.dispatch({
            type: actionTypes.GET_STATUSATCENTER,
        });
    }, 
    getAllAssistants(){
        dispatcher.dispatch({
            type: actionTypes.GET_ALLASSISTANTS,
        });
    }, 
    createStamp(selectedPeople){
        dispatcher.dispatch({
            type: actionTypes.CREATE_STAMP,
            selectedPeople
        });
    },
    createIdsAssistants(selectedPeople){
        dispatcher.dispatch({
            type: actionTypes.CREATE_IDSASSISTANTS,
            selectedPeople
        });
    },
    getAssistantInfo(selectedPeople, view){
        dispatcher.dispatch({
            type: actionTypes.GET_ASSISTANTINFO,
            selectedPeople,
            view
        });
    },
    setAssistant(infoAssistant, view){
        dispatcher.dispatch({
            type: actionTypes.SET_ASSISTANT,
            infoAssistant,
            view
        });
    },
    setNoteCall(id, note, date) {
        dispatcher.dispatch({
            type: actionTypes.SET_NOTECALL,
            id,
            note,
            date
        });
    },
};
export default Actions;
