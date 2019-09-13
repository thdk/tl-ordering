import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { App } from "./components/App/App";
import { OrderDetail, OrderList } from "./components/Order";
import { IOrderMatchProps } from "./components/Order/Detail/OrderDetail";
import { configureStore } from "./configureStore";
import { mockApi } from "./tests/apimocks";

// For development without api only...
const params = new URLSearchParams(window.location.search);
const debug = params.get("debug");
if (debug !== null) { mockApi(); }

const store = configureStore();

// Make the store available on the window object (for development purposes only)
(window as any).store = store;

render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" render={() => (<App><OrderList></OrderList></App>)} />
      <Route path="/orders/:orderId" render={({ match }: IOrderMatchProps) => (
        <App><OrderDetail orderId={match.params.orderId} /></App>)} />
    </Router>
  </Provider>,
  document.getElementById("root"),
);
