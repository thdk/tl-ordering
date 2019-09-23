import { IOrderItem } from "./types";

// action types
export const ADD_ORDER_ITEM = "ADD_ORDER_ITEM";
export const REMOVE_ORDER_ITEM = "REMOVE_ORDER_ITEM";

// action interfaces
export interface IAddOrderItemAction {
    type: typeof ADD_ORDER_ITEM;
    payload?: { item: IOrderItem, orderId: string };
}

export interface IRemoveOrderItemAction {
    type: typeof REMOVE_ORDER_ITEM;
    payload?: { productId: string, orderId: string };
}

export type OrderItemAction = IAddOrderItemAction | IRemoveOrderItemAction;

// action creators
export const addOrderItem = (orderId: string, orderItem: IOrderItem): IAddOrderItemAction => {
    return {
        payload: { item: orderItem, orderId },
        type: ADD_ORDER_ITEM,
    };
};

export const removeOrderItem = (productId: string, orderId: string): IRemoveOrderItemAction => {
    return {
        payload: { productId, orderId },
        type: REMOVE_ORDER_ITEM,
    };
};
