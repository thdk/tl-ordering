import React from "react";

import { IOrderItem } from "../../../core/orderitems/types";
import OrderItem from "./Item/OrderItem";

interface IOrderItemListProps {
    orderId: string;
    orderItems: IOrderItem[];
}

type Props = IOrderItemListProps;

const OrderItemList: React.FunctionComponent<Props> = ({ orderItems, orderId }: Props) =>
        <ul>
            {orderItems.map(orderItem => {
                const { productId } = orderItem;
                return <OrderItem orderId={orderId} key={productId} {...orderItem} />;
            })}
        </ul>;

OrderItemList.displayName = "OrderItemList";

export default OrderItemList;
