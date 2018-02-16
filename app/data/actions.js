import actionTypes from './actionTypes';
import dispatcher from './dispatcher';

const Actions = {
  addTodo(text) {
    dispatcher.dispatch({
      type: actionTypes.ADD_TODO,
      text,
    });
  },

  getUser(user) {
    dispatcher.dispatch({
      type: actionTypes.GET_USER,
      user,
    });
  },

  deleteTodo(id) {
    dispatcher.dispatch({
      type: actionTypes.DELETE_TODO,
      id,
    });
  },

  toggleTodo(id) {
    dispatcher.dispatch({
      type: actionTypes.TOGGLE_TODO,
      id,
    });
  },
};

export default Actions;