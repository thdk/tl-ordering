import React, { useRef } from 'react'
import { addOrderItem } from '../actions/orderItems';
import { connect } from 'react-redux';
import { IOrderItem } from '../interfaces/orders';
import { Dispatch } from 'redux';
import { IState } from '../interfaces/state';
import { IProduct } from '../interfaces/products';

export type PropsFromState = {
    products: IProduct[];
};

export type PropsFromDispatch = {
    readonly onAdd: (item: IOrderItem) => void;
}

export interface IOrderItemAddProps {
    readonly orderId: string;
}

type Props = PropsFromState & PropsFromDispatch & IOrderItemAddProps;

const OrderItemAdd = (props: Props) => {
    const { onAdd, products } = props;
    const defaultQuantiy = 1;

    const productIdRef = useRef<HTMLSelectElement | null>(null);
    const quantityRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Todo: validate input
        if (productIdRef.current && quantityRef.current) {
            onAdd({
                productId: productIdRef.current.value,
                quantity: +quantityRef.current.value,
            });

            productIdRef.current.value = "";
            quantityRef.current.value = defaultQuantiy.toString();
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>Product id:</label><select ref={productIdRef}>
                ${products.map(product => <option key={product.id} value={product.id}>{product.id}</option>)}
            </select>
            <label>Quantity:</label><input type="number" min="0" ref={quantityRef} defaultValue={"1"}></input>
            <input type="submit" value="Add product" />
        </form>
    );
};

const mapStateToProps = (state: IState) => {
    return {
        products: state.products.allIds.map(id => state.products.byId[id])
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IOrderItemAddProps) => {
    return {
        onAdd: (item: IOrderItem) => {
            dispatch(addOrderItem(item, ownProps.orderId))
        }
    }
};

const ConnectedOrderItemAdd = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderItemAdd);

export default ConnectedOrderItemAdd;