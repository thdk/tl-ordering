import React, { useEffect } from 'react'
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux'

import { IOrder } from '../interfaces/orders';
import { IState } from '../interfaces/state';
import { fetchOrders } from '../actions/orders';
import OrderListItem from './OrderListitem';
import { OrderListItemHeader } from './OrderListItemHeader';

type PropsFromState = {
    orders: IOrder[];
    isLoading: boolean;
};

type PropsFromDispatch = {
    fetchOrders: () => void;
}

type Props = PropsFromState & PropsFromDispatch;

const OrderList = (props: Props) => {
    const { fetchOrders, orders, isLoading } = props;

    if (!orders.length)
        useEffect(() => {
            fetchOrders()
        }, []);

    return isLoading
        ? <div>LOADING</div>
        : <div className="list">
            <OrderListItemHeader></OrderListItemHeader>
            {orders.map(order => <OrderListItem key={order.id} order={order}></OrderListItem>)}
        </div>;
};

const mapStateToProps = (state: IState): PropsFromState => {
    return {
        orders: state.orders.orders,
        isLoading: state.orders.isLoading
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): PropsFromDispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrders()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);