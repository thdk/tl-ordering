import React from "react";
import { connect, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";

import OrderItemAdd from "./OrderItemAdd";

import { IState } from "../../../core/app/types";
import { getOrderItems } from "../../../core/orderItems/reducer";
import { IOrderItem, IOrderItemWithPrice } from "../../../core/orderitems/types";
import { placeOrder } from "../../../core/orders/actions";
import { getOrder } from "../../../core/orders/reducer";
import { IOrder } from "../../../core/orders/types";
import { OrderOverviewLink } from "../../links/OrderOverviewLink";
import { OrderItemList } from "../../OrderItem";

export interface IOrderProps {
    orderId: string;
}

export interface IOrderMatchProps extends RouteComponentProps<IOrderProps> {
}

interface IPropsFromDispatch {
    readonly onClick: () => void;
}

type Props = IOrderProps & IPropsFromDispatch;

export const OrderDetail = (props: Props) => {
    const { onClick, orderId } = props;

    const order = useSelector<IState, IOrder>(
        state => getOrder(state, orderId),
    );
    const orderItems = useSelector<IState, IOrderItemWithPrice[]>(
        state => getOrderItems(state, orderId),
    );

    if (!order) {
        return <div className="error">
            Order not found
        <br />
            <a href="?debug">Use mocked api?</a>
        </div>;
    }

    const { customerId } = order;

    const listJSX = orderItems.length
        ? <>
            <OrderItemList orderId={orderId} orderItems={orderItems} />
            <div className="order-detail-total">
                <span className="order-detail-total-label">
                    Total:
                </span>
                <span className="order-detail-total-value">
                    {orderItems.reduce((p, c) => p += c.unitPrice, 0)}
                </span>
            </div>
        </>
        : <div className="order-detail--empty">This order contains no order items</div>;

    return (
        <>
            <div className="order-detail">
                Order detail page for order <span style={{ fontWeight: "bold" }}>{orderId}</span>
                <hr />
                <br />
                Customer: {customerId}
            </div>
            {listJSX}

            <br />
            <div>
                Add more products to this order:
                <OrderItemAdd orderId={orderId}></OrderItemAdd>
            </div>
            <br />
            <div>
                <input type="button" onClick={onClick} value="Place order"></input>
                <br />
                Response printed in the developer console...

                <br />
                <OrderOverviewLink>Back to order overview</OrderOverviewLink>
            </div>
        </>
    );
};

const mapDispatchToProps = (dipatch: ThunkDispatch<{}, {}, any>, ownProps: IOrderProps) => {
    return {
        onClick: () => {
            dipatch(placeOrder(ownProps.orderId));
        },
    };
};

const ConnectedOrderDetail = connect(
    null,
    mapDispatchToProps,
)(OrderDetail);

export default ConnectedOrderDetail;
