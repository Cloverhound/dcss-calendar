// src/js/store/index.js
import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from 'redux-saga'
import rootReducer from "../reducers";
import mySaga from '../sagas'

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, /* preloadedState, */composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(mySaga)

export default store;