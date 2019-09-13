import { Dispatch } from "redux";
import {
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    IFetchProductsAction,
    IFetchProductsFailureAction,
    IFetchProductsSuccessAction,
} from "./actiontypes";
import { convertProducts } from "./deserialization";
import { IProductData } from "./types";

// begin fetch products
export const fetchProductsRequest = (): IFetchProductsAction => {
    return {
        type: FETCH_PRODUCTS_REQUEST,
    };
};

const fetchProductsSuccess = (products: IProductData[]): IFetchProductsSuccessAction => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: products,
    };
};

const fetchProductsFailure = (ex: any): IFetchProductsFailureAction => {
    return {
        type: FETCH_PRODUCTS_FAILURE,
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

// end fetch products
