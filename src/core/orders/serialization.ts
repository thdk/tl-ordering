import { IApiOrder, IOrder, IOrderWithData } from "./types";

import { IApiOrderItem, IOrderItemWithPrice } from "../orderitems/types";

export const serializeOrder = (order: IOrderWithData): IApiOrder => {
    const apiItems = serializeOrderItems(order.items);
    const apiOrder: IApiOrder = {
        id: order.id,
        items: apiItems,
        total: order.total.toFixed(2),
    };

    apiOrder["customer-id"] = order.customerId;
    return apiOrder;
};

export const serializeOrderItems = (orderItems: IOrderItemWithPrice[]): IApiOrderItem[] =>
    orderItems.map(serializeOrderItem);

export const serializeOrderItem = (orderItem: IOrderItemWithPrice): IApiOrderItem => {
    const apiOrderItem: Partial<IApiOrderItem> = {};
    apiOrderItem.quantity = orderItem.quantity.toString();
    apiOrderItem.total = (orderItem.unitPrice * orderItem.quantity).toFixed(2);
    apiOrderItem["product-id"] = orderItem.productId;
    apiOrderItem["unit-price"] = orderItem.unitPrice.toFixed(2);
    return apiOrderItem as IApiOrderItem;
};
