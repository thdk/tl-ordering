import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import rootReducer from './reducers';
import App from './components/App'
import { mockApi } from './tests/apimocks';
import { initialState } from './tests/initialState';
import { IOrderMatchProps } from './components/Order';
import Order from './components/Order';

// For development without api only...
const params = new URLSearchParams(window.location.search);
const debug = params.get("debug");
if (debug !== undefined) mockApi();

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
    <Router>
      <Route exact path="/" component={App} />
      <Route path="/orders/:id" render={({ match }: IOrderMatchProps) => (
        <Order id={match.params.id} />)} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
