import { IOrder, IOrderItem } from "./orders";
import { IProduct } from "./products";

export type OrderItemDictionary = { [orderId: string]: IOrderItem[] };
export type ProductDictionary = { [productId: string]: IProduct };

export type IProductState = { byId: ProductDictionary, allIds: string[] };

export interface IState {
    orders: IOrder[];
    orderItems: {
        byOrderId: OrderItemDictionary;
    },
    products: IProductState,
}