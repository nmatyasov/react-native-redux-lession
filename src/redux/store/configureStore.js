import {createStore, compose, applyMiddleware} from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

const initialState = {};
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const middlewareList = [thunk, createLogger()];

const enhancer = composeEnhancers(applyMiddleware(...middlewareList));

export default function configureStore() {
  return createStore(reducer, initialState, enhancer);
}
