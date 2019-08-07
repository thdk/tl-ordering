import { IOrder } from "../interfaces/orders";

// action types
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


export type IOrderAction = IAddOrderAction | IRemoveOrderAction;

// action creators
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

