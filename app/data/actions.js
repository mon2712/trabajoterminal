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
    getStudentsAtCenter() {
        dispatcher.dispatch({
            type: actionTypes.GET_STUDENTSATCENTER
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
    getConfigTime(active, id, name){
        dispatcher.dispatch({
            type: actionTypes.GET_CONFIGTIME,
            active,
            id,
            name
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
    }
};

export default Actions;
