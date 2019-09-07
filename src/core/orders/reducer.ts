import { combineReducers } from "redux";

import { IOrderAction } from "./actions";
import { IOrderDictionary, IOrderState } from "./types";

export function byId(
    state: IOrderDictionary = {},
    action: IOrderAction) {
    switch (action.type) {
        case "FETCH_ORDERS_SUCCESS": {
            return action.payload.reduce((p, c) => {
                p[c.id] = c;
                return p;
            }, {} as IOrderDictionary);
        }
        case "PLACE_ORDER_SUCCESS": {
            const { success, order, reason } = action.payload;
            if (success) {
                console.log("Order placed succesfully:");
                console.log({ order });
            } else {
                console.error(`Coudn't place order: ${reason}`);
            }
            return state;
        }
        case "FETCH_ORDERS_REQUEST":
        case "FETCH_ORDERS_FAILURE":
        default:
            return state;
    }
}

export function visibleIds(
    state: string[] = [],
    action: IOrderAction) {
    switch (action.type) {
        case "FETCH_ORDERS_SUCCESS": {
            return [...state, ...action.payload.map(o => o.id)];
        }
        case "PLACE_ORDER_SUCCESS": {
            const { success, order, reason } = action.payload;
            if (success) {
                console.log("Order placed succesfully:");
                console.log({ order });
            } else {
                console.error(`Coudn't place order: ${reason}`);
            }
            return state;
        }
        case "FETCH_ORDERS_REQUEST":
        case "FETCH_ORDERS_FAILURE":
        default:
            return state;
    }
}

export function isLoading(_: boolean = false, action: IOrderAction) {
    switch (action.type) {
        case "FETCH_ORDERS_REQUEST": {
            return false;
        }
        case "FETCH_ORDERS_FAILURE":
        case "FETCH_ORDERS_SUCCESS":
        default:
            return false;
    }
}

export default combineReducers({
    byId,
    visibleIds,
    isLoading,
});

export function getOrder(state: IOrderState, id: string) {
    return state.byId[id];
}

export function getVisibleOrders(state: IOrderState) {
    return state.visibleIds.map(id => getOrder(state, id));
}
