import React from 'react'
import { IState } from '../interfaces/state';
import { removeOrderItem } from '../actions/orderItems';
import { connect } from 'react-redux';
import { IOrderItem } from '../interfaces/orders';
import OrderItemList from './OrderItemList';

export interface IOrderProps {
    readonly onClick: () => void;
    readonly id: string;
    readonly customerId: string;
    readonly total: number;
}
const Order = (props: IOrderProps & { orderItems: IOrderItem[] }) => {
    const { onClick, id, customerId, orderItems } = props;

    const total = orderItems.reduce((p, c) => {
        return p += c.quantity * c.unitPrice;
    }, 0).toFixed(2);

    return (
        <>
            <div onClick={onClick}>
                {id} (${total})
        </div>
            <OrderItemList orderId={id} orderItems={orderItems} />
        </>
    );
};

const mapStateToProps = (state: IState, ownProps: IOrderProps) => {
    return {
        orderItems: state.orderItems.byOrderId[ownProps.id]
    }
};


const ConnectedOrder = connect(
    mapStateToProps,
)(Order);

export default ConnectedOrder;