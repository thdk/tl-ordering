import React from "react";
import { connect } from "react-redux";

import { IState } from "../../../core/app/types";
import { getVisibleOrders } from "../../../core/orders/reducer";
import { OrderListItem } from "./Item/OrderListItem";
import OrderListItemHeader from "./Item/OrderListItemHeader";

type OrderListProps = StateProps;

export const OrderList = (props: OrderListProps) => {
    const { orders } = props;

    const listJSX = orders.length
        ? <div className="list">
            <OrderListItemHeader></OrderListItemHeader>
            {orders.map(order => <OrderListItem key={order.id} order={order}></OrderListItem>)}
        </div>
        : <div>
            No orders found.
            <br />
            <a href="?debug">Use mocked api?</a>
        </div>;

    return listJSX;
};

type StateProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: IState) => ({
    orders: getVisibleOrders(state),
});

export default connect(mapStateToProps)(OrderList);
