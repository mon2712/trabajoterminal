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
    getPaymentListStudent(idStudent){
        dispatcher.dispatch({
            type: actionTypes.GET_PAYMENTLISTSTUDENT,
            idStudent
        });
    },
    getConfigCall(active,name, id, status, note, date, old){
        dispatcher.dispatch({
            type: actionTypes.GET_CONFIGCALL,
            active,
            name,
            id,
            status, 
            note, 
            date,
            old
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
    setResponseEmpty(){
        dispatcher.dispatch({
            type: actionTypes.SET_RESPONSEEMPTY,
        });
    }, 
    setPaymentTuition(infoPayment){
        dispatcher.dispatch({
            type: actionTypes.SET_PAYMENTTUITION,
            infoPayment
        });
    }, 
    setNoteCall(id, note, date, old) {
        dispatcher.dispatch({
            type: actionTypes.SET_NOTECALL,
            id,
            note,
            date,
            old
        });
    },
    cleanResponse(){
        dispatcher.dispatch({
            type: actionTypes.CLEAN_RESPONSE
        });
    }, 
    getFormAnualPlan(infoToGet){
        dispatcher.dispatch({
            type: actionTypes.GET_FORMANUALPLAN,
            infoToGet
        });
    }, 
    setAnnualPlan(result, view){
        dispatcher.dispatch({
            type: actionTypes.SET_ANNUALPLAN,
            result,
            view
        });
    }, 
    getStudentsWithoutAnnualPlan() {
        dispatcher.dispatch({
            type: actionTypes.GET_STUDENTSWITHOUTANNUALPLAN
        });
    },
    getStudentsWithAnnualPlan() {
        dispatcher.dispatch({
            type: actionTypes.GET_STUDENTSWITHANNUALPLAN
        });
    }, 
    cleanAnnualPlan() {
        dispatcher.dispatch({
            type: actionTypes.CLEAN_ANNUALPLAN
        });
    }, 
};
export default Actions;
