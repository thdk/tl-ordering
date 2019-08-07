import React, { useEffect } from 'react'
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux'

import { IOrder } from '../interfaces/orders';
import OrderLink from './links/OrderLink';
import Order from './Order';
import { IState } from '../interfaces/state';
import { placeOrder, fetchOrders } from '../actions/orders';

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

    useEffect(() => {
        // fetchOrders()
    }, []);

    return isLoading
        ? <div>LOADING</div>
        : <ul>
            {orders.map(order => {
                const { id } = order;
                return <React.Fragment key={id}>
                    <OrderLink orderId={id}>Order detail</OrderLink>
                    <Order key={id} id={id} />
                </React.Fragment>;
            })}
        </ul>;
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