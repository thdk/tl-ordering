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
            return action.payload.map(o => o.id);
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

export function isLoading(_: boolean = true, action: IOrderAction) {
    switch (action.type) {
        case "FETCH_ORDERS_REQUEST": {
            return true;
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
    const order = state.orders.byId[id];
    if (!order) {
        throw new Error(`No order found for ${id}.`);
    }

    return order;
}

export function getVisibleOrders(state: IState) {
    return state.orders.visibleIds.map(id => getOrder(state, id));
}
