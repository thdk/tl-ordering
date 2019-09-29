import {
    IApiOrderItem,
    IOrderItemData,
} from "../orderitems/types";

import {
    IApiOrder,
    IApiPlaceOrderResult,
    IOrderData,
    IPlaceOrderData,
} from "./types";

export const convertOrders = (apiData: IApiOrder[]): IOrderData[] =>
    apiData.map(convertOrder);

export const convertOrder = (apiData: IApiOrder): IOrderData => ({
    id: apiData.id,
    customerId: apiData["customer-id"],
    items: apiData.items.map(item => convertOrderItem(item, apiData.id)),
});

export const convertOrderItem = (apiData: IApiOrderItem, orderId: string): IOrderItemData => ({
    orderId,
    productId: apiData["product-id"],
    quantity: +apiData.quantity,
});

export const convertPlaceOrderResult = (apiData: IApiPlaceOrderResult): IPlaceOrderData => ({
    success: apiData.result.toLowerCase() === "true",
    order: convertOrder(apiData.order),
    reason: apiData.reason,
});
