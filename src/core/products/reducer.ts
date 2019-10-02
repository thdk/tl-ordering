import { combineReducers } from "redux";
import { ProductAction } from "./actions";
import { IProductDictionary } from "./types";

export function byId(
    state: IProductDictionary = {},
    action: ProductAction) {
    switch (action.type) {
        case "FETCH_PRODUCTS_SUCCESS": {
            return action.payload!.reduce((p, c) => {
                p[c.id] = c;
                return p;
            }, {} as IProductDictionary);
        }
        case "FETCH_PRODUCTS_REQUEST":
        case "FETCH_PRODUCTS_FAILURE":
        default:
            return state;
    }
}

export function allIds(
    state: string[] = [],
    action: ProductAction) {
    switch (action.type) {
        case "FETCH_PRODUCTS_SUCCESS": {
            return action.payload!.map(p => p.id);
        }
        case "FETCH_PRODUCTS_REQUEST":
        case "FETCH_PRODUCTS_FAILURE":
        default:
            return state;
    }
}

export function isLoading(_: boolean = true, action: ProductAction) {
    switch (action.type) {
        case "FETCH_PRODUCTS_REQUEST": {
            return true;
        }
        case "FETCH_PRODUCTS_FAILURE":
        case "FETCH_PRODUCTS_SUCCESS":
        default:
            return false;
    }
}

export default combineReducers({
    byId,
    allIds,
    isLoading,
});
