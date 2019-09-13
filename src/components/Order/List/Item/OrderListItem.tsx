import * as React from "react";

import { connect } from "react-redux";
import { IState } from "../../../../core/app/types";
import { IOrder } from "../../../../core/orders/types";
import OrderLink from "../../../links/OrderLink";

interface IOrderListItemProps {
    order: IOrder;
}

interface IPropsFromState { total: number; }

type Props = IOrderListItemProps & IPropsFromState;

const OrderListItem = (props: Props) => {
    const { order: { id, customerId }, total } = props;

    return (
        <div className="row">
            <div className="row-left">
                <div>{id}</div>
                <div>{customerId}</div>
            </div>
            <div className="row-right">
                <div>{total.toFixed(2)}</div>
                <div>
                    <OrderLink orderId={id}>detail</OrderLink>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IState, ownProps: IOrderListItemProps) => {

    const total = state.orderItems.byOrderId[ownProps.order.id].reduce((p, c) => {
        const product = state.products.byId[c.productId];
        if (!product) { console.error("No product found for " + c.productId + ". Using '0' as price"); }
        p += (product ? product.price : 0) * c.quantity;
        return p;
    }, 0);

    return { total };
};

const ConnectedOrderListItem = connect(
    mapStateToProps,
)(OrderListItem);

export default ConnectedOrderListItem;
