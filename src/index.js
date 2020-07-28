import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';

import { combineReducers, compose, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import authReducer from './store/reducer/auth'

const rootReducer = combineReducers({
  auth:authReducer,
})

// process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))



ReactDOM.render(
  <Provider  store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

