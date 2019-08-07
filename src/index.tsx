import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App'
import orderingApp from './reducers';
import { IState } from './interfaces/state';

const initialState: IState = {
  orders: [
    {
      id: "1",
      customerId: "1",
      total: 109.90
    },
    {
      id: "2",
      customerId: "13",
      total: 49.90
    }
  ],
  orderItems: {
    byOrderId: {
        "1": [{
          productId: "B102",
          quantity: 10,
          unitPrice: 4.99,
          total: 49.90
        },
        {
          productId: "B202",
          quantity: 20,
          unitPrice: 3,
          total: 60.00
        } ],
        "2": [{
          productId: "B102",
          quantity: 1,
          unitPrice: 4.99,
          total: 4.99
        }]
    }
  }
}

const store = createStore(orderingApp, initialState);

(window as any)["store"] = store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);