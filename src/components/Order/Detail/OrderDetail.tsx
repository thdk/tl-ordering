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

export interface IOrderDetailProps {
    orderId: string;
}

export interface IOrderMatchProps extends RouteComponentProps<IOrderDetailProps> {
}

interface IPropsFromState {
    readonly order?: IOrder;
    readonly orderItems: IOrderItemWithPrice[];
}

interface IPropsFromDispatch {
    readonly onClick: () => void;
}

type Props = IPropsFromState & IOrderDetailProps & IPropsFromDispatch;

export const OrderDetail = (props: Props) => {
    const { onClick, orderId, orderItems, order } = props;

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
                    {orderItems.reduce((p, c) => p += c.unitPrice, 0).toFixed(2)}
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
                <input
                    className="order-detail-place-order-button"
                    type="button"
                    onClick={onClick}
                    value="Place order">
                </input>
                <br />
                Response printed in the developer console...

                <br />
                <OrderOverviewLink>Back to order overview</OrderOverviewLink>
            </div>
        </>
    );
};

const mapStateToProps = (state: IState, ownProps: IOrderDetailProps) => ({
    order: getOrder(state, ownProps.orderId),
    orderItems: getOrderItems(state, ownProps.orderId),
});

const mapDispatchToProps = (dipatch: ThunkDispatch<{}, {}, any>, ownProps: IOrderDetailProps) => {
    return {
        onClick: () => {
            dipatch(placeOrder(ownProps.orderId));
        },
    };
};

const ConnectedOrderDetail = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderDetail);

export default ConnectedOrderDetail;
