import { IOrderAction } from "../actions/orders";
import { IOrder } from "../interfaces/orders";

export function orders(state: IOrder[] = [], action: IOrderAction) {
    switch (action.type) {
        case "ADD_ORDER":
            return state;
        default:
            return state
    }
}