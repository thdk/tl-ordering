import { IOrderItemState } from "../orderitems/types";
import { IOrderState } from "../orders/types";
import { IProductState } from "../products/types";

export interface IState {
    orders: IOrderState;
    orderItems: IOrderItemState;
    products: IProductState;
}
