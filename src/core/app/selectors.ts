import { IOrderItemWithPrice, IOrderWithData, IState } from "./types";

import { selectOrderItems } from "../orderitems/selectors";
import {
    selectAreOrdersFetched,
    selectIsLoading as selectIsOrdersLoading,
    selectOrder,
    selectVisibleOrders,
} from "../orders/selectors";

import {
    selectIsLoading as selectIsProductsLoading,
    selectProduct,
    selectProductPrice,
    selectProducts,
} from "../products/selectors";

import { IOrder } from "../orders/types";
import { } from "../products/selectors";

export const getIsLoading = (state: IState) =>
    selectIsOrdersLoading(state.orders) || selectIsProductsLoading(state.products);

export const getAreOrdersFetched = (state: IState) => {
    return selectAreOrdersFetched(state.orders);
};

export const getOrder = (state: IState, id: string): IOrderWithData | null => {
    const order = selectOrder(state.orders, id);

    return orderWithData(state, order);
};

export const orderWithData = (state: IState, order: IOrder | null): IOrderWithData | null => {
    if (!order) { return null; }

    const items = getOrderItems(state, order.id);
    const total = items.reduce((p, c) => p += c.quantity * c.unitPrice, 0);
    return {
        ...order,
        items,
        total,
    };
};

export const getVisibleOrders = (state: IState): IOrderWithData[] => {
    return selectVisibleOrders(state.orders)
        .map(order => orderWithData(state, order))
        .filter(o => !!o) as IOrderWithData[];
};

/* Order items */
export const getOrderItems = (state: IState, orderId: string): IOrderItemWithPrice[] => {
    const itemsForOrder = selectOrderItems(state.orderItems, orderId);

    return (itemsForOrder || []).reduce((items, orderItem) => {
        const productPrice = selectProductPrice(state.products, orderItem.productId);

        // filter out order items for invalid products
        if (productPrice) {
            items.push({ ...orderItem, unitPrice: productPrice });
        }
        return items;
    }, [] as IOrderItemWithPrice[]);
};

/* Products */
export const getProduct = (state: IState, id: string) => {
    return selectProduct(state.products, id);
};

export const getProducts = (state: IState) => {
    return selectProducts(state.products);
};
