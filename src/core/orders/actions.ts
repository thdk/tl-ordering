import { Dispatch } from "redux";

import { IState } from "../app/types";
import * as types from "./constants";
import { convertOrders, convertPlaceOrderResult } from "./deserialization";
import { getOrder } from "./reducer";
import { serializeOrder } from "./serialization";
import { IOrderData, IPlaceOrderData } from "./types";

// action types
export type PlaceOrderAction = ReturnType<typeof placeOrderRequest>;
export type PlaceOrderSuccessAction = ReturnType<typeof placeOrderSuccess>;
export type PlaceOrderFailureAction = ReturnType<typeof placeOrderFailure>;
export type FetchOrdersAction = ReturnType<typeof fetchOrdersRequest>;
export type FetchOrdersSuccessAction = ReturnType<typeof fetchOrdersSuccess>;
export type FetchOrdersFailureAction = ReturnType<typeof fetchOrdersFailure>;

export type OrderAction =
    FetchOrdersAction |
    FetchOrdersFailureAction |
    FetchOrdersSuccessAction |
    PlaceOrderAction |
    PlaceOrderFailureAction |
    PlaceOrderSuccessAction;

// action creators

// begin fetch orders
export const fetchOrdersRequest = () => {
    return {
        type: types.FETCH_ORDERS_REQUEST as typeof types.FETCH_ORDERS_REQUEST,
    };
};

export const fetchOrdersSuccess = (orders: IOrderData[]) => {
    return {
        type: types.FETCH_ORDERS_SUCCESS as typeof types.FETCH_ORDERS_SUCCESS,
        payload: orders,
    };
};

export const fetchOrdersFailure = (ex: any) => {
    return {
        type: types.FETCH_ORDERS_FAILURE as typeof types.FETCH_ORDERS_FAILURE,
        ex,
    };
};

export function fetchOrders() {
    return (dispatch: Dispatch) => {
        dispatch(fetchOrdersRequest());
        return fetch(`${process.env.apiUrl}/orders`)
            .then(res => {
                return res.json()
                    .then(convertOrders)
                    .then(body => {
                        dispatch(fetchOrdersSuccess(body));
                    });
            })
            .catch(ex => {
                console.error(ex);
                dispatch(fetchOrdersFailure(ex));
            });
    };
}

// end fetch orders

// begin place order

export const placeOrderRequest = () => ({
    type: types.PLACE_ORDER_REQUEST as typeof types.PLACE_ORDER_REQUEST,
});

export const placeOrderSuccess = (result: IPlaceOrderData) => ({
    type: types.PLACE_ORDER_SUCCESS as typeof types.PLACE_ORDER_SUCCESS,
    payload: result,
});

export const placeOrderFailure = () => ({
    type: types.PLACE_ORDER_FAILURE as typeof types.PLACE_ORDER_FAILURE,
});

export const placeOrder = (id: string) => {
    return (dispatch: Dispatch, getState: () => IState) => {
        dispatch(placeOrderRequest());

        const state = getState();
        const orderItems = state.orderItems.byOrderId[id];
        const products = state.products.allIds.map(productId => state.products.byId[productId]);
        const order = getOrder(state, id);

        if (!order) { throw new Error(`Can't find order with id ${id}.`); }

        return fetch(`${process.env.apiUrl}/placeorder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(serializeOrder(order, orderItems, products)),
        })
            .then(res => {
                console.log("Place order result");
                return res.json()
                    .then(convertPlaceOrderResult, ex => { throw new Error(ex); })
                    .then(body => {
                        dispatch(placeOrderSuccess(body));
                    });
            })
            .catch(ex => {
                console.error(ex);
                dispatch(placeOrderFailure());
            });
    };
};
