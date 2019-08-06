import { IOrder, IOrderItem } from "./orders";

export interface IState {
    orders: IOrder[];
    orderItems: {
        byOrderId: {[orderId: string]: IOrderItem[]};
    }
}