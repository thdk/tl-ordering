import { IApiOrder, IApiOrderItem } from "../../api/interfaces";
import { IOrderData, IOrderItemData } from "../interfaces";

// TODO: should be IProductData
import { IOrder, IOrderItem } from "../../interfaces/orders";
import { IProduct } from "../../interfaces/products";

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
    orderItems.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) { throw new Error(`Can't find product for ${item.productId}`); }

        return serializeOrderItem(item, product);
    });

export const serializeOrderItem = (orderItem: IOrderItem, product: IProduct): IApiOrderItem => {
    const apiOrderItem = {} as IApiOrderItem;
    apiOrderItem.quantity = orderItem.quantity.toString();
    apiOrderItem.total = (product.unitPrice * orderItem.quantity).toFixed(2);
    apiOrderItem["product-id"] = orderItem.productId;
    apiOrderItem["unit-price"] = product.unitPrice.toFixed(2);
    return apiOrderItem;
};
