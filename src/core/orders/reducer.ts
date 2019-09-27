import { combineReducers } from "redux";

import { IState } from "../app/types";
import { getOrderItems } from "../orderItems/reducer";
import { IOrderItemWithPrice } from "../orderItems/types";
import { OrderAction } from "./actions";
import * as types from "./constants";
import { IOrder, IOrderDictionary } from "./types";

export function byId(
    state: IOrderDictionary = {},
    action: OrderAction) {
    switch (action.type) {
        case types.FETCH_ORDERS_SUCCESS: {
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
    action: OrderAction) {
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

export function isLoading(_: boolean = true, action: OrderAction) {
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
        return null;
    }

    const items = getOrderItems(state, id);
    const total = items.reduce((p, c) => p += c.quantity * c.unitPrice, 0);
    return {
        ...order,
        items,
        total,
    };
}

export function getVisibleOrders(state: IState) {
    return state.orders.visibleIds
        .map(id => getOrder(state, id))
        .filter(o => !!o) as Array<IOrder & {items: IOrderItemWithPrice[], total: number}>;
}
