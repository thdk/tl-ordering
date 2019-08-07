import { IApiOrder, IApiOrderItem } from "../api/interfaces";
import { IOrderData, IOrderItemData } from "../client/interfaces";

export const convertOrders = (apiData: IApiOrder[]): IOrderData[] =>
    apiData.map(convertOrder);

export const convertOrder = (apiData: IApiOrder): IOrderData => ({
    id: apiData.id,
    customerId: apiData["customer-id"],
    total: +apiData.total,
    items: apiData.items.map(item => convertOrderItem(item, apiData.id))
});

export const convertOrderItem = (apiData: IApiOrderItem, orderId: string): IOrderItemData => ({
    orderId,
    productId: apiData["product-id"],
    quantity: +apiData.quantity
});