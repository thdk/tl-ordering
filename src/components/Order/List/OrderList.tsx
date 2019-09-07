import React from "react";
import { connect } from "react-redux";

import { IState } from "../../../core/app/types";
import { getVisibleOrders } from "../../../core/orders/reducer";
import { IOrder } from "../../../core/orders/types";
import OrderListItem from "./Item/OrderListItem";
import OrderListItemHeader from "./Item/OrderListItemHeader";

interface IPropsFromState {
    orders: IOrder[];
}

type Props = IPropsFromState;
const OrderList = (props: Props) => {
    const { orders } = props;

    const listJSX = orders.length
        ? <div className="list">
            <OrderListItemHeader></OrderListItemHeader>
            {orders.map(order => <OrderListItem key={order.id} order={order}></OrderListItem>)}
        </div>
        : <div>
            No orders found.
            <br/>
            <a href="?debug">Use mocked api?</a>
        </div>;

    return listJSX;
};

const mapStateToProps = (state: IState): IPropsFromState => {
    return {
        orders: getVisibleOrders(state.orders),
    };
};

export default connect(mapStateToProps)(OrderList);
