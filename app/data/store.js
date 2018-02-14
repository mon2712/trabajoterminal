import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import actionTypes from './actionTypes';
import dispatcher from './dispatcher';

class store extends ReduceStore {
  constructor() {
    super(dispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(state, action) {
    switch (action.type) {
      case actionTypes.ADD_TODO:
        // Do nothing for now, we will add logic here soon!
        return state;

      default:
        return state;
    }
  }
}

export default new store();