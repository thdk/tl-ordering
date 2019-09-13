import { IAction } from "../app/types";
import { IProductData } from "./types";

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export interface IFetchProductsAction extends IAction<typeof FETCH_PRODUCTS_REQUEST> { }
export interface IFetchProductsSuccessAction extends IAction<typeof FETCH_PRODUCTS_SUCCESS, IProductData[]> { }
export interface IFetchProductsFailureAction extends IAction<typeof FETCH_PRODUCTS_FAILURE> { }

export type ProductAction =
    IFetchProductsAction |
    IFetchProductsSuccessAction |
    IFetchProductsFailureAction;
