import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { removeOrderItem } from "../../../../../actions/orderItems";
import { IOrderItem } from "../../../../../interfaces/orders";
import { IState } from "../../../../../interfaces/state";

interface IOrderItemPropsFromState { unitPrice: number; }
interface IDispatchFromProps { onDeleteOrderItem: (productId: string) => void; }
export interface IOrderItemProps extends IOrderItem {
    orderId: string;
}

type Props = IOrderItemPropsFromState & IDispatchFromProps & IOrderItemProps;

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
        },
    };
};

const mapStateToProps = (state: IState, ownProps: IOrderItemProps) => {
    return {
        unitPrice: state.products.byId[ownProps.productId].unitPrice,
    };
};

const ConnectedOrderItem = connect
    <IOrderItemPropsFromState, IDispatchFromProps, IOrderItemProps, IState>(
        mapStateToProps,
        mapDispatchToProps,
    )(OrderItem);

export default ConnectedOrderItem;
