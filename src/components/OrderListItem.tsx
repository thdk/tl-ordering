import * as React from 'react';

import { IOrder } from "../interfaces/orders";
import OrderLink from './links/OrderLink';
import { IState } from '../interfaces/state';
import { connect } from 'react-redux';

export interface IOrderListItemProps {
    order: IOrder;
}

export type PropsFromState = { total: number };

type Props = IOrderListItemProps & PropsFromState;

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
        if (!product) console.error("No product found for " + c.productId + ". Using '0' as price");
        p += (product ? product.unitPrice : 0) * c.quantity;
        return p;
    }, 0);

    return { total };
};

const ConnectedOrderListItem = connect(
    mapStateToProps
)(OrderListItem);

export default ConnectedOrderListItem;