import React, { useCallback } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IState } from "../../../../core/app/types";
import { removeOrderItem } from "../../../../core/orderitems/actions";
import { IOrderItem } from "../../../../core/orderitems/types";
import { getProduct } from "../../../../core/products/reducer";

export interface IOrderItemProps extends IOrderItem {
    orderId: string;
}

type Props = IOrderItemProps & DispatchProps & StateProps;

const OrderItem: React.FunctionComponent<Props> = (props: Props) => {
    const { onDeleteOrderItem, productId, quantity, product } = props;

    const onClick = useCallback(() => onDeleteOrderItem(productId), [productId]);

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
            <input type="button" value="x" onClick={onClick} />
        </li>
    );
};

OrderItem.displayName = "OrderItem";

type StateProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: IState, {productId}: IOrderItemProps) => ({
    product: getProduct(state, productId),
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IOrderItemProps) => ({
    onDeleteOrderItem: (productId: string) => {
        dispatch(removeOrderItem(productId, ownProps.orderId));
    },
});

const ConnectedOrderItem = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderItem);

export default ConnectedOrderItem;
