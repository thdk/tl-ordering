import fetchMock from "fetch-mock";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";

import { IState } from "../app/types";
import { IApiOrderItem } from "../orderItems/types";
import { ProductCategory } from "../products/types";
import * as actions from "./actions";
import * as types from "./constants";
import { IApiOrder } from "./types";

const middlewares = [thunk];
const mockStore = configureMockStore<Partial<IState>>(middlewares);

describe("Order actions", () => {
  const OLD_ENV = process.env;
  beforeAll(() => {
    process.env = { apiUrl: "http://test.api" };
  });

  afterAll(() => {
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("creates FETCH_ORDERS_SUCCESS when fetching orders has been done", () => {
    const order1: IApiOrder = {
      id: "o1",
      items: [],
      total: "10.00",
    };

    order1["customer-id"] = "c1";

    fetchMock.getOnce("http://test.api/orders", {
      body: [order1] as IApiOrder[],
      headers: { "content-type": "application/json" },
    });

    const expectedActions: [actions.FetchOrdersAction, actions.FetchOrdersSuccessAction] = [
      { type: types.FETCH_ORDERS_REQUEST },
      {
        type: types.FETCH_ORDERS_SUCCESS, payload: [
          {
            customerId: "c1",
            id: "o1",
            items: [],
          },
        ],
      },
    ];

    const store = mockStore();

    return store.dispatch<any>(actions.fetchOrders()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates FETCH_ORDERS_FAILURE when fetching orders fails", () => {

    fetchMock.getOnce("http://test.api/orders", {
      throws: new TypeError("TEST API FAIL"),
    });

    const expectedActions: [actions.FetchOrdersAction, actions.FetchOrdersFailureAction] = [
      { type: types.FETCH_ORDERS_REQUEST },
      {
        type: types.FETCH_ORDERS_FAILURE,
        error: new TypeError("TEST API FAIL"),
      },
    ];

    const store = mockStore();

    return store.dispatch<any>(actions.fetchOrders()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe("place order", () => {

    let store: MockStoreEnhanced<Partial<IState>>;

    beforeEach(() => {
      store = mockStore({
        orders: {
          byId: {
            o1: {
              customerId: "c1",
              id: "o1",
            },
          },
          isLoading: false,
          visibleIds: ["o1"],
        },
        orderItems: {
          byOrderId: {
            o1: [
              {
                productId: "p1",
                quantity: 1,
              },
            ],
          },
        },
        products: {
          allIds: ["p1"],
          byId: {
            p1: {
              category: ProductCategory.electronics,
              description: "p1 description",
              id: "p1",
              price: 10,
            },
          },
          isLoading: false,
        },
      } as Partial<IState>);
    });

    it("creates PLACE_ORDER_SUCCESS after place order", () => {
      const apiOrderItem: IApiOrderItem = {
        quantity: "1",
        total: "10.00",
      };

      apiOrderItem["product-id"] = "p1";

      const apiOrder: IApiOrder = {
        id: "o1",
        items: [apiOrderItem],
        total: "10.00",
      };

      apiOrder["customer-id"] = "c1";

      fetchMock.postOnce("http://test.api/placeorder", {
        body: { result: "true", order: apiOrder },
        headers: { "content-type": "application/json" },
      });

      const expectedActions: [actions.PlaceOrderAction, actions.PlaceOrderSuccessAction] = [
        { type: types.PLACE_ORDER_REQUEST },
        {
          type: types.PLACE_ORDER_SUCCESS, payload:
          {
            success: true,
            order: {
              customerId: "c1",
              id: "o1",
              items: [
                {
                  productId: "p1",
                  quantity: 1,
                  orderId: "o1",
                },
              ],
            },
          },
        },
      ];

      return store.dispatch<any>(actions.placeOrder("o1")).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("creates PLACE_ORDER_FAILURE after failed placeorder api call", () => {

      fetchMock.postOnce("http://test.api/placeorder", {
        throws: new Error("TEST API FAIL"),
      });

      const expectedActions: [actions.PlaceOrderAction, actions.PlaceOrderFailureAction] = [
        { type: types.PLACE_ORDER_REQUEST },
        {
          type: types.PLACE_ORDER_FAILURE,
          error: new Error("TEST API FAIL"),
        },
      ];

      return store.dispatch<any>(actions.placeOrder("o1")).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("creates PLACE_ORDER_FAILURE when order not found in store", () => {

      const expectedActions: [actions.PlaceOrderAction, actions.PlaceOrderFailureAction] = [
        { type: types.PLACE_ORDER_REQUEST },
        {
          type: types.PLACE_ORDER_FAILURE,
          error: new Error(`Can't find order with id o2.`),
        },
      ];
      store.dispatch<any>(actions.placeOrder("o2"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
