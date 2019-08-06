import { IOrderItem } from "../interfaces/orders";

// action types
export const ADD_ORDER_ITEM = "ADD_ORDER_ITEM";
export const REMOVE_ORDER_ITEM = "REMOVE_ORDER_ITEM";

// action interfaces
export interface IAddOrderItemAction {
    type: typeof ADD_ORDER_ITEM;
    payload: any;
}

export interface IRemoveOrderItemAction {
    type: typeof REMOVE_ORDER_ITEM;
    payload: { id: string, orderId: string };
}

export type IOrderItemAction = IAddOrderItemAction | IRemoveOrderItemAction;

// action creators
export const addOrderItem = (orderItem: IOrderItem): IAddOrderItemAction => {
    return {
        type: ADD_ORDER_ITEM,
        payload: orderItem
    }
};

export const removeOrderItem = (id: string, orderId: string): IRemoveOrderItemAction => {
    return {
        type: REMOVE_ORDER_ITEM,
        payload: { id, orderId }
    }
};
