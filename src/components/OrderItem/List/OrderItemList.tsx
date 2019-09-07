import React from "react";

import { IOrderItem } from "../../../core/orderitems/types";
import OrderItem from "./Item/OrderItem";

const OrderItemList = (props: { orderId: string, orderItems: IOrderItem[] }) => {
    const { orderItems, orderId } = props;
    return (
        <ul>
            {orderItems.map(orderItem => {
                const { productId } = orderItem;
                return <OrderItem orderId={orderId} key={productId} {...orderItem} />;
            })}
        </ul>
    );
};

export default OrderItemList;
