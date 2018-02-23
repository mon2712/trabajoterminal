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
  }

};

export default Actions;