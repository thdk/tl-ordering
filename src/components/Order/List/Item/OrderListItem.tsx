import * as React from "react";

import { IOrder } from "../../../../core/orders/types";
import OrderLink from "../../../links/OrderLink";

interface IOrderListItemProps {
    order: IOrder & { total: number };
}

type Props = IOrderListItemProps;

export const OrderListItem: React.FunctionComponent<Props> = ({ order }: Props) => {
    const { id, customerId, total } = order;

    return (
        <div className="row">
            <div className="row-left">
                <div>{id}</div>
                <div>{customerId}</div>
            </div>
            <div className="row-right">
                <div>{total.toFixed(2)}</div>
                <div>
                    <OrderLink orderId={id}>detail</OrderLink>
                </div>
            </div>
        </div>
    );
};

OrderListItem.displayName = "OrderListItem";

export default OrderListItem;
