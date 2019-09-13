import { Action } from "redux";
import { IOrderItemState } from "../orderitems/types";
import { IOrderState } from "../orders/types";
import { IProductState } from "../products/types";

export interface IState {
    orders: IOrderState;
    orderItems: IOrderItemState;
    products: IProductState;
}

export interface IAction<T, P = undefined> extends Action<T> {
    payload?: P;
}
