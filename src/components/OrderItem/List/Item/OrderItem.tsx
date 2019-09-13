import React from "react";
import { connect, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { IState } from "../../../../core/app/types";
import { removeOrderItem } from "../../../../core/orderitems/actions";
import { IOrderItem } from "../../../../core/orderitems/types";
import { getProduct } from "../../../../core/products/reducer";
import { IProduct } from "../../../../core/products/types";

interface IDispatchFromProps { onDeleteOrderItem: (productId: string) => void; }
export interface IOrderItemProps extends IOrderItem {
    orderId: string;
}

type Props = IDispatchFromProps & IOrderItemProps;

const OrderItem = (props: Props) => {
    const { onDeleteOrderItem, productId, quantity } = props;

    const product = useSelector<IState, IProduct>(state => getProduct(state, productId));

    if (!product) { return null; }

    const { description, price } = product;
    return (
        <li>
            <span className="orderitem-product-description">
                {description}
            </span>:
            <span className="orderitem-quantity">
                {quantity}
            </span> x ${price.toFixed(2)} = ${(price * quantity).toFixed(2)}
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

const ConnectedOrderItem = connect(
        null,
        mapDispatchToProps,
    )(OrderItem);

export default ConnectedOrderItem;
