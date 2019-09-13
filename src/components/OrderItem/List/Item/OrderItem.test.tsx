import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { IState } from "../../../../core/app/types";
import { ProductCategory } from "../../../../core/products/types";

import ConnectedOrderItem from "./OrderItem";

const mockStore = configureStore<Partial<IState>>();

const initialState: Pick<IState, "products"> = {
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

describe("OrderItem rendering for a given state from redux store:", () => {
   let store: MockStoreEnhanced;
   beforeEach(() => {
      store = mockStore(initialState);
      store.dispatch = jest.fn();
   });

   describe("An OrderItem", () => {
      let component: renderer.ReactTestRenderer;

      beforeEach(() => {
         component = renderer.create(
            <Provider store={store}>
                  <ConnectedOrderItem productId="p1" orderId="o1" quantity={3} />
            </Provider>,
         );
      });

      it("should match snapshot", () => {
         expect(component.toJSON()).toMatchSnapshot();
      });

      it("should display the full product name", () => {
         expect(
            component.root.findByProps({ className: "orderitem-product-description" }).children,
         ).toEqual(["some product"]);
      });
   });

   describe("An OrderItem for an invalid product", () => {
      let component: renderer.ReactTestRenderer;

      beforeEach(() => {
         component = renderer.create(
            <Provider store={store}>
               <Router>
                  <ConnectedOrderItem productId="p2" orderId="o1" quantity={3}  />
               </Router>
            </Provider>);
      });

      it("should match snapshot", () => {
         expect(component.toJSON()).toMatchSnapshot();
      });
   });
});
