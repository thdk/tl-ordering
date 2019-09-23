import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import OrderItemAdd from "./OrderItemAdd";

import { bindActionCreators, Dispatch } from "redux";
import { IState } from "../../../core/app/types";
import { placeOrder } from "../../../core/orders/actions";
import { getOrder } from "../../../core/orders/reducer";
import { OrderOverviewLink } from "../../links/OrderOverviewLink";
import { OrderItemList } from "../../OrderItem";

export interface IOrderDetailProps {
    orderId: string;
}

export interface IOrderMatchProps extends RouteComponentProps<IOrderDetailProps> {
}

type Props = IOrderDetailProps & StateProps & DispatchProps;

export const OrderDetail = (props: Props) => {
    const { onClick, orderId, order } = props;

    const { items, total } = order;

    if (!order) {
        return <div className="error">
            Order not found
        <br />
            <a href="?debug">Use mocked api?</a>
        </div>;
    }

    const { customerId } = order;

    const listJSX = items.length
        ? <>
            <OrderItemList orderId={orderId} orderItems={items} />
            <div className="order-detail-total">
                <span className="order-detail-total-label">
                    Total:
                </span>
                <span className="order-detail-total-value">
                    {total.toFixed(2)}
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

type StateProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: IState, ownProps: IOrderDetailProps) => ({
    order: getOrder(state, ownProps.orderId),
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const mapDispatchToProps = (dispatch: Dispatch, props: IOrderDetailProps) =>
    bindActionCreators(
        {
            onClick: () => placeOrder(props.orderId),
        },
        dispatch,
    );

const ConnectedOrderDetail = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderDetail);

export default ConnectedOrderDetail;
