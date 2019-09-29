import fetchMock from "fetch-mock";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";

import { IState } from "../app/types";
import { fetchProducts, FetchProductsAction, FetchProductsFailureAction, FetchProductsSuccessAction } from "./actions";
import * as types from "./constants";
import { IApiProduct, ProductCategory } from "./types";

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

  it(`creates ${types.FETCH_PRODUCTS_SUCCESS} when fetching products has been done`, () => {
    const product1: IApiProduct = {
      id: "p1",
      category: "electronics",
      description: "Product one",
      price: "10.99",
    };

    fetchMock.getOnce("http://test.api/products", {
      body: [product1] as IApiProduct[],
      headers: { "content-type": "application/json" },
    });

    const expectedActions: [FetchProductsAction, FetchProductsSuccessAction] = [
      { type: types.FETCH_PRODUCTS_REQUEST },
      {
        type: types.FETCH_PRODUCTS_SUCCESS, payload: [
          {
            id: "p1",
            category: ProductCategory.electronics,
            description: "Product one",
            price: 10.99,
          },
        ],
      },
    ];

    const store = mockStore();

    return store.dispatch<any>(fetchProducts()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it(`creates ${types.FETCH_PRODUCTS_FAILURE} when fetching products fails`, () => {

    fetchMock.getOnce("http://test.api/products", {
      throws: new TypeError("TEST API FAIL"),
    });

    const expectedActions: [FetchProductsAction, FetchProductsFailureAction] = [
      { type: types.FETCH_PRODUCTS_REQUEST },
      {
        type: types.FETCH_PRODUCTS_FAILURE,
        payload: new TypeError("TEST API FAIL"),
      },
    ];

    const store = mockStore();

    return store.dispatch<any>(fetchProducts()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
