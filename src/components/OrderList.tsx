import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { Link } from "react-router-dom";
import { fetchOrders } from "../actions/orders";
import { IOrder } from "../interfaces/orders";
import { IState } from "../interfaces/state";
import OrderListItem from "./OrderListitem";
import { OrderListItemHeader } from "./OrderListItemHeader";

interface IPropsFromState {
    orders: IOrder[];
}

type Props = IPropsFromState;
const OrderList = (props: Props) => {
    const { orders } = props;

    const listJSX = orders.length
        ? <div className="list">
            <OrderListItemHeader></OrderListItemHeader>
            {orders.map((order) => <OrderListItem key={order.id} order={order}></OrderListItem>)}
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
        orders: state.orders.orders,
    };
};

export default connect(mapStateToProps)(OrderList);
