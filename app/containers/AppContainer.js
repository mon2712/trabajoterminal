import AppView from '../views/appViews';
import {Container} from 'flux/utils';
import store from '../data/store';

function getStores() {
  return [
    store,
  ];
}

function getState() {
  return {
    todos: store.getState(),
  };
}

export default Container.createFunctional(AppView, getStores, getState);