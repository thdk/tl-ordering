import { combineReducers } from "redux";

import { IState } from "../app/types";
import { IOrderAction } from "./actions";
import { IOrderDictionary } from "./types";

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

export function getOrder(state: IState, id: string) {
    return state.orders.byId[id];
}

export function getVisibleOrders(state: IState) {
    return state.orders.visibleIds.map(id => getOrder(state, id));
}
