import React, { useEffect } from 'react'
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux'

import { IOrder } from '../interfaces/orders';
import { IState } from '../interfaces/state';
import { fetchOrders } from '../actions/orders';
import OrderListItem from './OrderListitem';
import { OrderListItemHeader } from './OrderListItemHeader';



export interface PropsFromState {
    orders: IOrder[];
}

type Props = PropsFromState;
const OrderList = (props: Props) => {
    const { orders } = props;

    return (
        <div className="list">
            <OrderListItemHeader></OrderListItemHeader>
            {orders.map(order => <OrderListItem key={order.id} order={order}></OrderListItem>)}
        </div>
    )
};

const mapStateToProps = (state: IState): PropsFromState => {
    return {
        orders: state.orders.orders
    }
};


export default connect(mapStateToProps)(OrderList);