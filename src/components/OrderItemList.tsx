import React from "react";
import { IOrderItem } from "../interfaces/orders";

import OrderItem from "./OrderItem";

const OrderItemList = (props: { orderId: string, orderItems: IOrderItem[] }) => {
    const { orderItems, orderId } = props;
    return (
        <ul>
            {orderItems.map((orderItem) => {
                const { productId } = orderItem;
                return <OrderItem orderId={orderId} key={productId} {...orderItem} />;
            })}
        </ul>
    );
};

export default OrderItemList;
