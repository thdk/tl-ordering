import React from 'react'
import { IState } from '../interfaces/state';
import { removeOrderItem } from '../actions/orderItems';
import { connect } from 'react-redux';
import { IOrderItem } from '../interfaces/orders';

export interface IOrderItemProps extends IOrderItem {
    readonly onDeleteOrderItem: (productId: string, orderId: string) => void;
    readonly orderId: string
}

const OrderItem = (props: IOrderItemProps) => {
    const { onDeleteOrderItem, productId, quantity, total, unitPrice, orderId } = props;

    return (
        <li onClick={() => onDeleteOrderItem(productId, orderId)}>
            {productId}: ${quantity} x ${unitPrice} = ${total}
        </li>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onDeleteOrderItem: (productId: string, orderId: string) => {
            dispatch(removeOrderItem(productId, orderId));
        }
    };
};

const ConnectedOrderItem = connect(
    mapDispatchToProps,
)(OrderItem);

export default ConnectedOrderItem;