import * as types from "./constants";
import { IOrderItem } from "./types";

// action interfaces
export type AddOrderItemAction = ReturnType<typeof addOrderItem>;

export type RemoveOrderItemAction = ReturnType<typeof removeOrderItem>;

export type OrderItemAction = AddOrderItemAction | RemoveOrderItemAction;

// action creators
export const addOrderItem = (orderId: string, orderItem: IOrderItem) => ({
        payload: { item: orderItem, orderId },
        type: types.ADD_ORDER_ITEM as typeof types.ADD_ORDER_ITEM,
});

export const removeOrderItem = (productId: string, orderId: string) => ({
    payload: { productId, orderId },
    type: types.REMOVE_ORDER_ITEM as typeof types.REMOVE_ORDER_ITEM,
});
