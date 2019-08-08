import React, { useEffect } from 'react'
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux'

import { IOrder } from '../interfaces/orders';
import { IState } from '../interfaces/state';
import { fetchOrders } from '../actions/orders';
import OrderListItem from './OrderListitem';
import { OrderListItemHeader } from './OrderListItemHeader';
import { Link } from 'react-router-dom';



export interface PropsFromState {
    orders: IOrder[];
}

type Props = PropsFromState;
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

const mapStateToProps = (state: IState): PropsFromState => {
    return {
        orders: state.orders.orders
    }
};


export default connect(mapStateToProps)(OrderList);