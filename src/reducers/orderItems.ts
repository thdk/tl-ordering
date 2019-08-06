import { ADD_ORDER, REMOVE_ORDER } from "../actions/orders";
import { IOrderItemAction } from "../actions/orderItems";
import { IOrderItem } from "../interfaces/orders";

export function orderItems(state: IOrderItem[] = [], action: IOrderItemAction) {
    switch (action.type) {
      case "ADD_ORDER_ITEM":
        return [
          ...state,
          action.payload
        ]
      case "REMOVE_ORDER_ITEM":
        // TODO Remove order
        throw new Error("TODO Remove order");
      default:
        return state
    }
  }