import React from 'react'
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
        <li>
            {productId}: ${quantity} x ${unitPrice} = ${total}
            <input type="button" value="x" onClick={() => onDeleteOrderItem(productId, orderId)}/>
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
    null,
    mapDispatchToProps,
)(OrderItem);

export default ConnectedOrderItem;