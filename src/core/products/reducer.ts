import { combineReducers } from "redux";
import { IState } from "../app/types";
import { ProductAction } from "./actiontypes";
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

export function getProduct(state: IState, productId: string) {
    const product = state.products.byId[productId];
    if (!product) {
        // TODO: use logger
        // console.error(`Product with id ${productId} not found.`);
    }

    return product;
}

export function getProductPrice(state: IState, id: string) {
    const product = getProduct(state, id);
    return product ? product.price : undefined;
}
