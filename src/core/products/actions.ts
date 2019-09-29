import { Dispatch } from "redux";
import * as types from "./constants";
import { convertProducts } from "./deserialization";
import { IProductData } from "./types";

// action types

export type FetchProductsAction = ReturnType<typeof fetchProductsRequest>;
export type FetchProductsSuccessAction = ReturnType<typeof fetchProductsSuccess>;
export type FetchProductsFailureAction = ReturnType<typeof fetchProductsFailure>;

export type ProductAction =
    FetchProductsAction |
    FetchProductsSuccessAction |
    FetchProductsFailureAction;

export const fetchProductsRequest = () => {
    return {
        type: types.FETCH_PRODUCTS_REQUEST as typeof types.FETCH_PRODUCTS_REQUEST,
    };
};

const fetchProductsSuccess = (products: IProductData[]) => {
    return {
        type: types.FETCH_PRODUCTS_SUCCESS as typeof types.FETCH_PRODUCTS_SUCCESS,
        payload: products,
    };
};

const fetchProductsFailure = (ex: any) => {
    return {
        type: types.FETCH_PRODUCTS_FAILURE as typeof types.FETCH_PRODUCTS_FAILURE,
        payload: ex,
    };
};

export function fetchProducts() {
    return (dispatch: Dispatch) => {
        dispatch(fetchProductsRequest());
        return fetch(`${process.env.apiUrl}/products`)
            .then(res => {
                return res.json()
                    .then(convertProducts)
                    .then(body => {
                        dispatch(fetchProductsSuccess(body));
                    });
            })
            .catch(ex => {
                console.error(ex);
                dispatch(fetchProductsFailure(ex));
            });
    };
}
