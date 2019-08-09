import { combineReducers } from "redux";
import { IState } from "../interfaces/state";
import { orderItems } from "./orderItems";
import { orders } from "./orders";
import { products } from "./products";

const orderingApp = combineReducers<IState>({
    orderItems,
    orders,
    products,
});

export default orderingApp;
