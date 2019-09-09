import { IState } from "../app/types";
import { IProductState } from "./types";

export function products(state: IProductState = { byId: {}, allIds: [] }) {
    return state;
}

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
    return product ? product.unitPrice : undefined;
}
