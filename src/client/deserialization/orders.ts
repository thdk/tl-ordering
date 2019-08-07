import { IApiOrder, IApiOrderItem, IPlaceOrderResult } from "../../api/interfaces";
import { IOrderData, IOrderItemData, IPlaceOrderData } from "../interfaces";

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

export const convertPlaceOrderResult = (apiData: IPlaceOrderResult): IPlaceOrderData =>({
    success: apiData.result.toLowerCase() === "true",
    order: apiData.order ? convertOrder(apiData.order) : undefined,
    reason: apiData.reason,
});