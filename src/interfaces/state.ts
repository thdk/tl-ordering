import { IOrder, IOrderItem } from "./orders";
import { IProduct } from "./products";

export interface IOrderItemDictionary { [orderId: string]: IOrderItem[]; }
export interface IProductDictionary { [productId: string]: IProduct; }

export interface IOrderState { orders: IOrder[]; isLoading: boolean; }
export interface IProductState { byId: IProductDictionary; allIds: string[]; }
export interface IOrderItemState { byOrderId: IOrderItemDictionary; }

export interface IUiState {
    isLoading: boolean;
}

export interface IState {
    orders: IOrderState;
    orderItems: IOrderItemState;
    products: IProductState;
}
