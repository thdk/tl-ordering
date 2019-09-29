import { IProductState } from "./types";

export function selectIsLoading(state: IProductState) {
    return state.isLoading;
}

export function selectProduct(state: IProductState, productId: string) {
    return state.byId[productId];
}

export function selectProducts(state: IProductState) {
    return state.allIds.map(productId => selectProduct(state, productId));
}

export function selectProductPrice(state: IProductState, id: string) {
    const product = selectProduct(state, id);
    return product ? product.price : undefined;
}
