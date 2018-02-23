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
        menuTypes: []
    },
    getUser() {
        console.log("llego a store")
    },
    getMenuTypes(){
        console.log("get MenuType")

        $.getJSON('/app/fillData/menuTypes.js', function(info) {
           //console.log("menu correct", info);
           AppData.data.menuTypes = info;
           AppStore.emitChange();
        }).fail(function(error) {
            console.error(error);
        });
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
        AppData.getMenuTypes();
        break;

    default:
		// no op
    }
});

module.exports = AppStore;



/*
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
        // Don't add todos with no text.
        if (!action.text) {
          return state;
        }
        const id = Counter.increment();
        return state.set(id, new Todo({
          id,
          text: action.text,
          complete: false,
        }));
        return state;

      case actionTypes.DELETE_TODO:
        return state.delete(action.id);

      case actionTypes.TOGGLE_TODO:
        return state.update(
          action.id,
          todo => todo.set('complete', !todo.complete),
        );

      default:
        return state;
    }
  }
}

export default new store();
*/