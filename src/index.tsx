import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers';
import App from './components/App'
import { mockApi } from './tests/apimocks';
import { initialState } from './tests/initialState';

// For development without api only...
mockApi();

// Use an initial state until all api's are mocked
const initState = initialState;

const store = createStore(
  rootReducer,
  initState,
  applyMiddleware(
    thunkMiddleware,
    logger // TODO: only add logger middleware in development
  )
);

// Make the store available on the window object (for development purposes only)
(window as any)["store"] = store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
