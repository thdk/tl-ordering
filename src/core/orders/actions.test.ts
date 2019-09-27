import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as actions from "./actions";
import * as types from "./constants";
import { IApiOrder, IOrderData } from "./types";

const orders = [
  {
    customerId: "c1",
    id: "o1",
    items: [],
    total: 10,
  }];

describe("actions", () => {
  it("should create an action PlaceOrderSuccessAction", () => {

    const expectedAction: actions.PlaceOrderSuccessAction = {
      type: types.PLACE_ORDER_SUCCESS,
      payload: {
        success: true,
      },
    };

    expect(actions.placeOrderSuccess({ success: true })).toEqual(expectedAction);
  });

  it("should create an action PlaceOrderFailureAction", () => {

    const expectedAction: actions.PlaceOrderFailureAction = {
      type: types.PLACE_ORDER_FAILURE,
    };

    expect(actions.placeOrderFailure()).toEqual(expectedAction);
  });

  it("should create an action FetchOrdersSuccessAction", () => {

    const expectedAction: actions.FetchOrdersSuccessAction = {
      type: types.FETCH_ORDERS_SUCCESS,
      payload: orders,
    };

    expect(actions.fetchOrdersSuccess(orders)).toEqual(expectedAction);
  });

  it("should create an action FetchOrdersFailureAction", () => {
    const ex = {
      code: "404",
      message: "Error message",
    };

    const expectedAction: actions.FetchOrdersFailureAction = {
      type: types.FETCH_ORDERS_FAILURE,
      ex,
    };

    expect(actions.fetchOrdersFailure(ex)).toEqual(expectedAction);
  });
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
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

  it("creates FETCH_TODOS_SUCCESS when fetching todos has been done", () => {
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
            total: 10,
          },
        ],
      },
    ];

    const store = mockStore({ orders: [] });

    return store.dispatch<any>(actions.fetchOrders()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
