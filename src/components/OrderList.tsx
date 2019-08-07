import React, { useEffect } from 'react'
import { IOrder } from '../interfaces/orders';
import Order from './Order';
import { IState } from '../interfaces/state';
import { placeOrder, fetchOrders } from '../actions/orders';
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';

type PropsFromState = {
    orders: IOrder[];
    isLoading: boolean;
};

type PropsFromDispatch = {
    fetchOrders: () => void;
    onPlaceOrder: (id: string) => void;
}

type Props = PropsFromState & PropsFromDispatch;

const OrderList = (props: Props) => {
    const { fetchOrders, orders, isLoading, onPlaceOrder } = props;

    useEffect(() => {
        fetchOrders()
    }, []);

    return isLoading
        ? <div>LOADING</div>
        : <ul>
            {orders.map(order => {
                const { id } = order;
                return <Order key={id} {...order} onClick={() => onPlaceOrder(id)} />
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
        onPlaceOrder: (id: string) => dispatch(placeOrder(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);