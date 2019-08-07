import React from 'react'
import { IOrder } from '../interfaces/orders';
import Order from './Order';
import { IState } from '../interfaces/state';
import { placeOrder } from '../actions/orders';
import { connect } from 'react-redux'
import { Dispatch } from 'redux';

const OrderList = (props: { orders: IOrder[], onPlaceOrder: (id: string) => void }) => {
    const { orders, onPlaceOrder } = props;
    return (
        <ul>
            {orders.map(order => {
                const { id } = order;
                return <Order key={id} {...order} onClick={() => onPlaceOrder(id)} />
            })}
        </ul>
    );
};

const mapStateToProps = (state: IState) => {
    return {
        orders: state.orders
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onPlaceOrder: (id: string) => {
            dispatch(placeOrder(id))
        }
    };
};

const ConnectedOrderList = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderList)

export default ConnectedOrderList;