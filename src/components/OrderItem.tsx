import React from 'react'
import { removeOrderItem } from '../actions/orderItems';
import { connect } from 'react-redux';
import { IOrderItem } from '../interfaces/orders';
import { IState } from '../interfaces/state';
import { Dispatch } from 'redux';

export type OrderItemPropsFromState = { unitPrice: number };
type DispatchFromProps = { onDeleteOrderItem: (productId: string) => void };
export interface IOrderItemProps extends IOrderItem {
    orderId: string;
};

type Props = OrderItemPropsFromState & DispatchFromProps & IOrderItemProps;

const OrderItem = (props: Props) => {
    const { onDeleteOrderItem, productId, quantity, unitPrice } = props;

    const total = (quantity * unitPrice).toFixed(2);
    return (
        <li>
            {productId}: {quantity} x ${unitPrice} = ${total}
            <input type="button" value="x" onClick={() => onDeleteOrderItem(productId)} />
        </li>
    );
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IOrderItemProps) => {
    return {
        onDeleteOrderItem: (productId: string) => {
            dispatch(removeOrderItem(productId, ownProps.orderId));
        }
    };
};

const mapStateToProps = (state: IState, ownProps: IOrderItemProps) => {
    return {
        unitPrice: state.products.byId[ownProps.productId].unitPrice
    };
};

const ConnectedOrderItem = connect
    <OrderItemPropsFromState, DispatchFromProps, IOrderItemProps, IState>(
        mapStateToProps,
        mapDispatchToProps,
    )(OrderItem);

export default ConnectedOrderItem;

