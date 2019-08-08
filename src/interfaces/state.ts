import { IOrder, IOrderItem } from "./orders";
import { IProduct } from "./products";

export type OrderItemDictionary = { [orderId: string]: IOrderItem[] };
export type ProductDictionary = { [productId: string]: IProduct };

export type IOrderState = { orders: IOrder[], isLoading: boolean };
export type IProductState = { byId: ProductDictionary, allIds: string[] };
export type IUiState = {
    isLoading: boolean;
}

export interface IState {
    orders: IOrderState;
    orderItems: {
        byOrderId: OrderItemDictionary;
    },
    products: IProductState
}