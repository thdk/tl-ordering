import React from 'react'
import { IOrder, IOrderItem } from '../interfaces/orders';
import { IState } from '../interfaces/state';
import { placeOrder } from '../actions/orders';
import { connect } from 'react-redux'
import OrderItem from './OrderItem';

const OrderItemList = (props: { orderId: string, orderItems: IOrderItem[] }) => {
    const { orderItems, orderId } = props;
    return (
        <ul>
            {orderItems.map(orderItem => {
                const { productId } = orderItem;
                return <OrderItem orderId={orderId} key={productId} {...orderItem} />
            })}
        </ul>
    );
};


export default OrderItemList;