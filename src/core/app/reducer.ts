import { combineReducers } from "redux";

import { orderItems } from "../orderItems/reducer";
import orders from "../orders/reducer";
import products from "../products/reducer";
import { IState } from "./types";

const orderingApp = combineReducers<IState>({
    orderItems,
    orders,
    products,
});

export const getIsLoading = (state: IState) => {
    return state.orders.isLoading || state.products.isLoading;
};

export default orderingApp;
