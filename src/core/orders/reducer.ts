import { combineReducers } from "redux";

import { OrderAction } from "./actions";
import * as types from "./constants";
import { IOrderDictionary, IOrderState } from "./types";

export function byId(
    state: IOrderDictionary = {},
    action: OrderAction) {
    switch (action.type) {
        case types.FETCH_ORDERS_SUCCESS: {
            return action.payload.reduce((p, c) => {
                // Orders reducer only needs id and customerId
                // Don't save other properties such as items and total here
                const { id, customerId } = c;
                p[c.id] = { customerId, id };
                return p;
            }, {} as IOrderDictionary);
        }
        case types.PLACE_ORDER_SUCCESS: {
            const { success, order: { id } = { id: undefined } } = action.payload;

            if (!success || !id) { return state; }

            return {
                ...state,
                [id]: {
                    ...state[id],
                    isPlaced: success,
                },
            };
        }
        default:
            return state;
    }
}

export function isLoading(_: boolean = true, action: OrderAction) {
    switch (action.type) {
        case types.FETCH_ORDERS_REQUEST: {
            return true;
        }
        default:
            return false;
    }
}

export function visibleIds(
    state: string[] = [],
    action: OrderAction) {
    switch (action.type) {
        case types.FETCH_ORDERS_SUCCESS: {
            return action.payload.map(o => o.id);
        }
        default:
            return state;
    }
}

export default combineReducers<IOrderState, OrderAction>({
    byId,
    visibleIds,
    isLoading,
});
