import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import _throttle from 'lodash/throttle';
import logger from 'redux-logger';

import './index.css';
import { App } from './App';

// combined reducers
import reducer from './redux';

// helpers
import { saveState, loadState } from './lib/LocalStorage';

let middleware = [];
if (process.env.REACT_APP_ENV !== 'production') {
  middleware = [...middleware, logger];
}
const persistedState = loadState();
const rootReducer = (state, action) => {
  return reducer(state, action);
};
const store = createStore(rootReducer, persistedState, applyMiddleware(...middleware));
store.subscribe(
  _throttle(() => {
    saveState(store.getState());
  }, 1000)
);

ReactDOM.render(<App store={store} />, document.getElementById('root'));
