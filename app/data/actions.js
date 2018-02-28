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
  getConfigTime(active, id, name){
    dispatcher.dispatch({
      type: actionTypes.GET_CONFIGTIME,
      active,
      id,
      name
    });
  },
  getStudentMissPayment(){
    dispatcher.dispatch({
      type: actionTypes.GET_STUDENTSMISSPAYMENT
    });
  }
};

export default Actions;
