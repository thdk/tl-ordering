import { IOrder, IOrderItem } from "./orders";

export type OrderItemDictionary = { [orderId: string]: IOrderItem[] };
export interface IState {
    orders: IOrder[];
    orderItems: {
        byOrderId: OrderItemDictionary;
    }
}