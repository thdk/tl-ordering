import { Dispatch } from "redux";

import { IState } from "../app/types";
import { convertOrders, convertPlaceOrderResult } from "./deserialization";
import { getOrder } from "./reducer";
import { serializeOrder } from "./serialization";
import { IOrderData, IPlaceOrderData } from "./types";

// action types

export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";

export const PLACE_ORDER_REQUEST = "PLACE_ORDER_REQUEST";
export const PLACE_ORDER_SUCCESS = "PLACE_ORDER_SUCCESS";
export const PLACE_ORDER_FAILURE = "PLACE_ORDER_FAILURE";

// action interfaces
export interface IPlaceOrderAction {
    type: typeof PLACE_ORDER_REQUEST;
    payload: string;
}

export interface IPlaceOrderSuccessAction {
    type: typeof PLACE_ORDER_SUCCESS;
    payload: IPlaceOrderData;
}

export interface IPlaceOrderFailureAction {
    type: typeof PLACE_ORDER_FAILURE;
}

export interface IFetchOrdersAction {
    type: typeof FETCH_ORDERS_REQUEST;
}

export interface IFetchOrdersSuccessAction {
    type: typeof FETCH_ORDERS_SUCCESS;
    payload: IOrderData[];
}

export interface IFetchOrdersFailureAction {
    type: typeof FETCH_ORDERS_FAILURE;
}

export type IOrderAction =
    IFetchOrdersAction |
    IFetchOrdersFailureAction |
    IFetchOrdersSuccessAction |
    IPlaceOrderAction |
    IPlaceOrderFailureAction |
    IPlaceOrderSuccessAction;

// action creators

// begin fetch orders
export const fetchOrdersRequest = () => {
    return {
        type: FETCH_ORDERS_REQUEST,
    };
};

const fetchOrdersSuccess = (orders: IOrderData[]) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        payload: orders,
    };
};

const fetchOrdersFailure = (ex: any) => {
    return {
        type: FETCH_ORDERS_FAILURE,
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
    type: PLACE_ORDER_REQUEST,
});

export const placeOrderSuccess = (result: IPlaceOrderData): IPlaceOrderSuccessAction => ({
    type: PLACE_ORDER_SUCCESS,
    payload: result,
});

export const placeOrderFailure = () => ({
    type: PLACE_ORDER_FAILURE,
});

export const placeOrder = (id: string) => {
    return (dispatch: Dispatch, getState: () => IState) => {
        dispatch(placeOrderRequest());

        const state = getState();
        const orderItems = state.orderItems.byOrderId[id];
        const products = state.products.allIds.map(productId => state.products.byId[productId]);
        const order = getOrder(state.orders, id);

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
