import { IApiOrder, IOrder } from "./types";

import { IApiOrderItem, IOrderItem } from "../orderitems/types";

import { IProduct } from "../products/types";

export const serializeOrder = (order: IOrder, items: IOrderItem[], products: IProduct[]): IApiOrder => {
    const apiItems = serializeOrderItems(items, products);
    const apiOrder: IApiOrder = {
        id: order.id,
        items: apiItems,
        total: apiItems.reduce((p, c) => p += (+c.total), 0).toFixed(2),
    };

    apiOrder["customer-id"] = order.customerId;
    return apiOrder;
};

export const serializeOrderItems = (orderItems: IOrderItem[], products: IProduct[]): IApiOrderItem[] =>
    orderItems.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) { throw new Error(`Can't find product for ${item.productId}`); }

        return serializeOrderItem(item, product);
    });

export const serializeOrderItem = (orderItem: IOrderItem, product: IProduct): IApiOrderItem => {
    const apiOrderItem = {} as IApiOrderItem;
    apiOrderItem.quantity = orderItem.quantity.toString();
    apiOrderItem.total = (product.price * orderItem.quantity).toFixed(2);
    apiOrderItem["product-id"] = orderItem.productId;
    apiOrderItem["unit-price"] = product.price.toFixed(2);
    return apiOrderItem;
};
