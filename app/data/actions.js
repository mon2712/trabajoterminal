import actionTypes from './actionTypes';
import dispatcher from './dispatcher';

const Actions = {
    getUser(user) {
        dispatcher.dispatch({
            type: actionTypes.GET_USER,
            user,
        });
    },
    getMenuTypes(typeMenu) {
        dispatcher.dispatch({
            type: actionTypes.GET_MENUTYPES,
            typeMenu
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
    getStudentInfo() {
        dispatcher.dispatch({
            type: actionTypes.GET_STUDENTINFO
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
    getConfigCall(active,name, id, status){
        dispatcher.dispatch({
            type: actionTypes.GET_CONFIGCALL,
            active,
            name,
            id,
            status
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
    }
};
export default Actions;
