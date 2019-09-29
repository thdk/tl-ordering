import { IOrderItemDictionary, IOrderItemState } from "./types";

import { OrderAction } from "../orders/actions";
import { FETCH_ORDERS_SUCCESS } from "../orders/constants";
import { OrderItemAction } from "./actions";
import * as types from "./constants";
import { selectOrderItems } from "./selectors";

export function orderItems(state: IOrderItemState = { byOrderId: {} }, action: OrderItemAction | OrderAction) {
    switch (action.type) {
        case FETCH_ORDERS_SUCCESS: {
            return {
                ...state,
                byOrderId: action.payload.reduce((p, c) => {
                    p[c.id] = c.items;
                    return p;
                }, {} as IOrderItemDictionary),
            };
        }
        case types.ADD_ORDER_ITEM: {
            const { item, orderId } = action.payload!;

            // Does product exist already for this order?
            const itemsForOrder = selectOrderItems(state, orderId);
            const existingProduct = itemsForOrder.find(product => product.productId === item.productId);

            const newItemsForOrder = existingProduct
                // Product already in order...
                // Find existing product in orderitem list for order and update quantity
                ? itemsForOrder
                    .map(i => i.productId === item.productId
                        ? { ...i, quantity: item.quantity + i.quantity }
                        : i)
                // Product not yet in order...
                // Add item to orderitem list
                : [...itemsForOrder, item];

            return {
                ...state,
                byOrderId: {
                    ...state.byOrderId,
                    [orderId]: newItemsForOrder,
                },
            };
        }
        case types.REMOVE_ORDER_ITEM: {
            const { orderId, productId } = action.payload!;
            return {
                ...state,
                byOrderId: {
                    ...state.byOrderId,
                    [orderId]: state.byOrderId[orderId].filter(oi => oi.productId !== productId),
                },
            };
        }
        default:
            return state;
    }
}

export default orderItems;
