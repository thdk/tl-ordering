import {  IOrderItemDictionary, IOrderItemState } from "./types";

import { IOrderItemAction } from "./actions";

import { IOrderAction } from "../orders/actions";

export function orderItems(state: IOrderItemState = { byOrderId: {} }, action: IOrderItemAction | IOrderAction) {
  switch (action.type) {
    case "FETCH_ORDERS_SUCCESS": {
      return {
        ...state,
        byOrderId: action.payload.reduce((p, c) => {
          p[c.id] = c.items;
          return p;
        }, {} as IOrderItemDictionary),
      };
    }
    case "ADD_ORDER_ITEM": {
      const { item, orderId } = action.payload!;

      // Does product exist already for this order?
      const itemsForOrder = state.byOrderId[orderId];
      const existingProduct = itemsForOrder.find((product) => product.productId === item.productId);

      const newItemsForOrder = existingProduct
        // Product already in order...
        // Find existing product in orderitem list for order and update quantity
        ? itemsForOrder
          .map((i) => i.productId === item.productId
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
    case "REMOVE_ORDER_ITEM": {
      const { orderId, productId } = action.payload!;
      return {
        ...state,
        byOrderId: {
          ...state.byOrderId,
          [orderId]: state.byOrderId[orderId].filter((oi) => oi.productId !== productId),
        },
      };
    }
    default:
      return state;
  }
}
