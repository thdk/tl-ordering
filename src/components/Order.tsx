import React from 'react'
import { IState } from '../interfaces/state';
import { connect } from 'react-redux';
import { IOrderItem } from '../interfaces/orders';
import OrderItemList from './OrderItemList';
import OrderItemAdd from './OrderItemAdd';
import { Dispatch } from 'redux';
import { placeOrder, placeOrderRequest } from '../actions/orders';
import { RouteComponentProps } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

export interface IOrderProps {
    id: string;
}

export interface IOrderMatchProps extends RouteComponentProps<IOrderProps> {
}

export type PropsFromDispatch = {
    readonly onClick: () => void;
}

export type PropsFromState = {
    readonly orderItems: (IOrderItem & { unitPrice: number })[];
    readonly customerId: string;
    readonly total: number;
}

type Props = IOrderProps & PropsFromDispatch & PropsFromState;

const Order = (props: Props) => {
    const { onClick, id, customerId, orderItems } = props;

    const total = orderItems.reduce((p, c) => {
        return p += c.quantity * c.unitPrice;
    }, 0).toFixed(2);

    return (
        <>
            <div onClick={onClick}>
                {id} (${total}) for customer: {customerId}
            </div>
            <OrderItemList orderId={id} orderItems={orderItems} />
            <OrderItemAdd orderId={id}></OrderItemAdd>
        </>
    );
};

const mapStateToProps = (state: IState, ownProps: IOrderProps) => {
    const { id: orderId } = ownProps;
    // Todo use redux selector to get order by id
    const order = state.orders.orders.find(o => o.id === orderId);
    if (!order) throw new Error("Can't find order for " + orderId)

    const { customerId, total } = order;

    return {
        customerId,
        total,
        orderItems: state.orderItems.byOrderId[orderId].reduce((p, c) => {

            const product = state.products.byId[c.productId];
            if (!product) {
                console.error(`No product found for ${c.productId}. Product removed from order item list.`);
            } else {
                p.push({ ...c, unitPrice: product.unitPrice });
            }
            return p;
        }, [] as (IOrderItem & { unitPrice: number })[])
    };
};

const mapDispatchToProps = (dipatch: ThunkDispatch<{}, {}, any>, ownProps: IOrderProps) => {
    return {
        onClick: () => {
            dipatch(placeOrder(ownProps.id))
        }
    };
}


const ConnectedOrder = connect<PropsFromState, PropsFromDispatch, IOrderProps, IState>(
    mapStateToProps,
    mapDispatchToProps
)(Order);

export default ConnectedOrder;