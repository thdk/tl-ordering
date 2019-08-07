import { IOrder } from "../interfaces/orders";
import { Dispatch } from "redux";
import { IApiOrder } from "../api/interfaces";
import { convertOrders } from "../deserialization/orders";
import { IOrderData } from "../client/interfaces";

// action types

export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";

export const ADD_ORDER = "ADD_ORDER";
export const REMOVE_ORDER = "REMOVE_ORDER";
export const PLACE_ORDER = "PLACE_ORDER";

// action interfaces
export interface IAddOrderAction {
    type: typeof ADD_ORDER;
    payload?: any;
}

export interface IRemoveOrderAction {
    type: typeof REMOVE_ORDER;
    payload?: any;
}

export interface IPlaceOrderAction {
    type: typeof PLACE_ORDER;
    payload?: any;
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

export function fetchOrders() {
    return (dispatch: Dispatch) => {
        dispatch(fetchOrdersRequest());
        return fetch(`${process.env.apiUrl}/orders`)
            .then(res => {
                return res.json()
                    .then(convertOrders)
                    .then(body => {
                        dispatch(fetchOrdersSuccess(body));
                    })
            })
            .catch(ex => {
                console.error(ex);
                dispatch(fetchOrdersFailure(ex))
            })
    };
}

export type IOrderAction =
    IAddOrderAction |
    IRemoveOrderAction |
    IFetchOrdersAction |
    IFetchOrdersFailureAction |
    IFetchOrdersSuccessAction;

// action creators

export const fetchOrdersRequest = () => {
    return {
        type: FETCH_ORDERS_REQUEST
    }
};

const fetchOrdersSuccess = (orders: IOrderData[]) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        payload: orders
    }
};

const fetchOrdersFailure = (ex: any) => {
    return {
        type: FETCH_ORDERS_FAILURE,
        ex
    }
};

export const addOrder = (order: IOrder): IAddOrderAction => {
    return {
        type: ADD_ORDER,
        payload: order
    }
};

export const removeOrder = (id: string): IRemoveOrderAction => {
    return {
        type: REMOVE_ORDER,
        payload: id
    }
};

export const placeOrder = (id: string): IPlaceOrderAction => {
    return {
        type: PLACE_ORDER,
        payload: id
    };
};

