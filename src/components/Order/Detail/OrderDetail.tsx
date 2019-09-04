import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";

import { IOrder, IOrderItem } from "../../../interfaces/orders";
import OrderItemAdd from "./OrderItemAdd";

import { placeOrder } from "../../../actions/orders";
import { IState } from "../../../interfaces/state";
import { OrderOverviewLink } from "../../links/OrderOverviewLink";
import OrderItems from "../OrderItems/List/OrderItemsList";

export interface IOrderProps {
    id: string;
}

export interface IOrderMatchProps extends RouteComponentProps<IOrderProps> {
}

interface IPropsFromDispatch {
    readonly onClick: () => void;
}

interface IPropsFromState {
    readonly orderItems: Array<IOrderItem & { unitPrice: number }>;
    readonly order?: IOrder;
}

type Props = IOrderProps & IPropsFromDispatch & IPropsFromState;

const Order = (props: Props) => {
    const { onClick, id, orderItems, order } = props;

    if (!order) {
        return <div>
            Order not found
        <br />
            <a href="?debug">Use mocked api?</a>
        </div>;
    }

    const { customerId } = order;

    const total = orderItems.reduce((p, c) => {
        return p += c.quantity * c.unitPrice;
    }, 0).toFixed(2);

    const listJSX = orderItems.length
        ? <>
            <OrderItems orderId={id} orderItems={orderItems} />
            Total: {total}
        </>
        : <div>This order contains no orders</div>;

    return (
        <>
            <div>
                Order detail page for order <span style={{ fontWeight: "bold" }}>{id}</span>
                <hr />
                <br />
                Customer: {customerId}
            </div>
            {listJSX}

            <br />
            <div>
                Add more products to this order:
                <OrderItemAdd orderId={id}></OrderItemAdd>
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

const mapStateToProps = (state: IState, ownProps: IOrderProps) => {
    const { id: orderId } = ownProps;
    // Todo use redux selector to get order by id
    const order = state.orders.orders.find((o) => o.id === orderId);

    return {
        order,
        // Todo: use selector to get orderitems by order with unitprice
        orderItems: (state.orderItems.byOrderId[orderId] || []).reduce((p, c) => {
            const product = state.products.byId[c.productId];
            if (!product) {
                console.error(`No product found for ${c.productId}. Product removed from order item list.`);
            } else {
                p.push({ ...c, unitPrice: product.unitPrice });
            }
            return p;
        }, [] as Array<IOrderItem & { unitPrice: number }>),
    };
};

const mapDispatchToProps = (dipatch: ThunkDispatch<{}, {}, any>, ownProps: IOrderProps) => {
    return {
        onClick: () => {
            dipatch(placeOrder(ownProps.id));
        },
    };
};

const ConnectedOrder = connect<IPropsFromState, IPropsFromDispatch, IOrderProps, IState>(
    mapStateToProps,
    mapDispatchToProps,
)(Order);

export default ConnectedOrder;
