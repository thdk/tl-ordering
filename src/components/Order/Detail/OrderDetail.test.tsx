import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import { IState } from "../../../core/app/types";
import { ProductCategory } from "../../../core/products/types";
import ConnectedOrderDetail from "./OrderDetail";

const mockStore = configureStore<IState>();

const initialState: Pick<IState, "orderItems" | "orders" | "products"> = {
   orderItems: {
      byOrderId: {
         o1: [
            {
               productId: "p1",
               quantity: 3,
            },
            {
               productId: "p2",
               quantity: 2,
            },
         ],
         o2: [
            {
               productId: "p1",
               quantity: 7,
            },
         ],
         o3: [],
      },
   },
   orders: {
      byId: {
         o1: {
            id: "o1",
            customerId: "c1",
         },
         o2: {
            id: "o2",
            customerId: "c1",
         },
         o3: {
            id: "o3",
            customerId: "c1",
         },
      },
      visibleIds: ["o1", "o2", "o3"],
      isLoading: false,
   },
   products: {
      byId: {
         p1: {
            price: 10.99,
            description: "some product",
            category: ProductCategory.tools,
            id: "p1",
         },
      },
      allIds: ["p1"],
      isLoading: false,
   },
};

describe("OrderDetail rendering for a given state from redux store:", () => {
   let store: MockStoreEnhanced<IState>;
   beforeEach(() => {
      store = mockStore(initialState);
      store.dispatch = jest.fn();
   });

   describe("An order with multiple order items", () => {
      let component: renderer.ReactTestRenderer;

      beforeEach(() => {
         component = renderer.create(
            <Provider store={store}>
               <Router>
                  <ConnectedOrderDetail orderId="o2" />
               </Router>
            </Provider>,
         );
      });

      it("should match snapshot", () => {
         expect(component.toJSON()).toMatchSnapshot();
      });

      it("should display the total price for an order", () => {
         expect(
            component.root.findByProps({ className: "order-detail-total-value" }).children,
         ).toEqual(["10.99"]);
      });
   });

   describe("An order with zero order items", () => {
      let component: renderer.ReactTestRenderer;

      beforeEach(() => {
         component = renderer.create(
            <Provider store={store}>
               <Router>
                  <ConnectedOrderDetail orderId="o3" />
               </Router>
            </Provider>);
      });

      it("should match snapshot", () => {
         expect(component.toJSON()).toMatchSnapshot();
      });

      it("should display div with class order-detail--empty", () => {
         expect(component.root.findByProps({className: "order-detail--empty"})).toBeTruthy();
      });
   });

   describe("An order with one orderitem for an invalid product", () => {
      let component: renderer.ReactTestRenderer;

      beforeEach(() => {
         component = renderer.create(
            <Provider store={store}>
               <Router>
                  <ConnectedOrderDetail orderId="o1" />
               </Router>
            </Provider>);
      });

      it("should match snapshot", () => {
         expect(component.toJSON()).toMatchSnapshot();
      });

      it("should display the total price for an order", () => {
         expect(
            component.root.findByProps({ className: "order-detail-total-value" }).children,
         ).toEqual(["10.99"]);
      });
   });
});
