import { Action } from "redux";
import { IOrderItem, IOrderItemState } from "../orderitems/types";
import { IOrder, IOrderState } from "../orders/types";
import { IProductState } from "../products/types";

export interface IState {
    orders: IOrderState;
    orderItems: IOrderItemState;
    products: IProductState;
}

export interface IAction<T, P = undefined> extends Action<T> {
    payload?: P;
}

export interface IOrderWithData extends IOrder {
    items: IOrderItemWithPrice[];
    total: number;
}

export interface IOrderItemWithPrice extends IOrderItem {
    readonly unitPrice: number;
}
