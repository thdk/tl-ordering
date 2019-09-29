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

export default orderingApp;
