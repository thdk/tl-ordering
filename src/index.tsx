import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";

import App from "./components/App/App";
import { OrderDetail, OrderList } from "./components/Order";
import { IOrderMatchProps } from "./components/Order/Detail/OrderDetail";
import rootReducer from "./core/app/reducer";
import { mockApi } from "./tests/apimocks";
import { initialState } from "./tests/initialState";

// For development without api only...
const params = new URLSearchParams(window.location.search);
const debug = params.get("debug");
if (debug !== null) { mockApi(); }

// Use an initial state until all api's are mocked
const initState = initialState;

const store = createStore(
  rootReducer,
  initState,
  applyMiddleware(
    thunkMiddleware,
    logger, // TODO: only add logger middleware in development
  ),
);

// Make the store available on the window object (for development purposes only)
(window as any).store = store;

render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" render={() => (<App><OrderList></OrderList></App>)} />
      <Route path="/orders/:id" render={({ match }: IOrderMatchProps) => (
        <App><OrderDetail id={match.params.id} /></App>)} />
    </Router>
  </Provider>,
  document.getElementById("root"),
);
