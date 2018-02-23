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
        menuTypes: {
            "recepcion": [{
                "ico": "icon-clipboard",
                "text": "Asistencia",
                "path": "/asistencia",
                "color": "#4765dd"
            },{
                "ico": "icon-learning",
                "text": "Vista Centro",
                "path": "/vistaCentro",
                "color": "#ebc531"
            },{
                "ico": "icon-payment",
                "text": "Registrar Pago",
                "path": "/registrarPago",
                "color": "#e84eb2"
            },{
                "ico": "icon-calls",
                "text": "Lista Llamadas",
                "path": "/",
                "color": "#6ddfc1"
            },{
                "ico": "icon-point-of-service",
                "text": "Lista Adeudo",
                "path": "/",
                "color": "#acea49"
            },{
                "ico": "icon-minute-mark",
                "text": "Tiempo Reducido",
                "path": "/",
                "color": "#48a2bb"
            }],
            "instructor": [{
                "ico": "icon-update",
                "text": "Actualizar Reporte",
                "path": "/",
                "color": "#FFFFFF"
            },{
                "ico": "icon-learning",
                "text": "Vista Centro",
                "path": "/",
                "color": "#FFFFFF"
            },{
                "ico": "icon-team",
                "text": "Registro Asistentes",
                "path": "/",
                "color": "#814bea"
            },{
                "ico": "icon-calls",
                "text": "Lista Llamadas",
                "path": "/",
                "color": "#FFFFFF"
            },{
                "ico": "icon-point-of-service",
                "text": "Lista Adeudos",
                "path": "/",
                "color": "#FFFFFF"
            },{
                "ico": "icon-printer",
                "text": "Imprimir",
                "path": "/",
                "color": "#e9414f"
            }]
        }
    },
    getUser() {
        console.log("llego a store")
    },
    getMenuTypes(action){
        console.log("get MenuType", action)

        $.getJSON('/app/fillData/menuTypes.js', function(info) {
           console.log("menu correct", info);
           AppData.data.menuTypes = info.menuTypes;
           AppStore.emitChange();
           console.log("Despues del emit", AppData.data.menuTypes)
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
        AppData.getMenuTypes(action);
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