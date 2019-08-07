import React from 'react'
import { IState } from '../interfaces/state';
import { connect } from 'react-redux';
import { IOrderItem } from '../interfaces/orders';
import OrderItemList from './OrderItemList';
import OrderItemAdd from './OrderItemAdd';
import { IProduct } from '../interfaces/products';
import { IOrderItemProps, OrderItemPropsFromState } from './OrderItem';

export interface IOrderProps {
    readonly onClick: () => void;
    readonly id: string;
    readonly customerId: string;
    readonly total: number;
}
const Order = (props: IOrderProps & { orderItems: (IOrderItem & Pick<IProduct, "unitPrice">)[] }) => {
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
    return {
        orderItems: state.orderItems.byOrderId[ownProps.id].reduce((p, c) => {

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


const ConnectedOrder = connect(
    mapStateToProps,
)(Order);

export default ConnectedOrder;