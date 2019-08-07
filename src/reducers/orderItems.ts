import { ADD_ORDER, REMOVE_ORDER } from "../actions/orders";
import { IOrderItemAction } from "../actions/orderItems";
import { IOrderItem } from "../interfaces/orders";
import { OrderItemDictionary } from "../interfaces/state";

export function orderItems(state: { byOrderId: OrderItemDictionary } = { byOrderId: {} as OrderItemDictionary }, action: IOrderItemAction) {
  switch (action.type) {
    case "ADD_ORDER_ITEM": {
      const { item, orderId } = action.payload!;
      return {
        ...state,
        byOrderId: {
          ...state.byOrderId,
          [orderId]: [...state.byOrderId[orderId], item]
        }
      };
    }
    case "REMOVE_ORDER_ITEM": {
      const { orderId, productId } = action.payload!;
      return {
        ...state,
        byOrderId: {
          ...state.byOrderId,
          [orderId]: state.byOrderId[orderId].filter(oi => oi.productId !== productId)
        }
      };
    }
    default:
      return state
  }
}