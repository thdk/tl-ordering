import { IOrderAction } from "../actions/orders";
import { IOrder } from "../interfaces/orders";

export function orders(state: IOrder[] = [], action: IOrderAction) {
    switch (action.type) {
        case "FETCH_ORDERS_SUCCESS": {
            return action.payload;
        }
        case "ADD_ORDER":
            return state;
        default:
            return state
    }
}