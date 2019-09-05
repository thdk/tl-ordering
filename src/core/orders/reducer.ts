import { IOrderAction } from "./actions";
import { IOrderState } from "./types";

export function orders(state: IOrderState = { orders: [], isLoading: false }, action: IOrderAction) {
    switch (action.type) {
        case "FETCH_ORDERS_REQUEST": {
            return {
                ...state,
                isLoading: true,
            };
        }
        case "FETCH_ORDERS_SUCCESS": {
            return {
                ...state,
                isLoading: false,
                orders: action.payload,
            };
        }
        case "FETCH_ORDERS_FAILURE": {
            return {
                ...state,
                isLoading: false,
            };
        }
        case "PLACE_ORDER_SUCCESS": {
            const { success, order, reason } = action.payload;
            if (success) {
                console.log("Order placed succesfully:");
                console.log({ order });
            } else {
                console.error(`Coudn't place order: ${reason}`);
            }
        }
        default:
            return state;
    }
}
