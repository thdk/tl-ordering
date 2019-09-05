import React, { useRef } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IState } from "../../../core/app/types";
import { addOrderItem } from "../../../core/orderitems/actions";
import { IOrderItem } from "../../../core/orderitems/types";
import { IProduct } from "../../../core/products/types";

export interface IPropsFromState {
    products: IProduct[];
}

export interface IPropsFromDispatch {
    readonly onAdd: (item: IOrderItem) => void;
}

export interface IOrderItemAddProps {
    readonly orderId: string;
}

type Props = IPropsFromState & IPropsFromDispatch & IOrderItemAddProps;

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
            if (productIdRef.current.value) {
                onAdd({
                    productId: productIdRef.current.value,
                    quantity: +quantityRef.current.value,
                });

                productIdRef.current.value = "";
                quantityRef.current.value = defaultQuantiy.toString();
            }

        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>Product id:</label><select ref={productIdRef}>
                ${products.map((product) => <option key={product.id} value={product.id}>{product.id}</option>)}
            </select>
            <label>Quantity:</label><input type="number" min="0" ref={quantityRef} defaultValue={"1"}></input>
            <input type="submit" value="Add product" />
        </form>
    );
};

const mapStateToProps = (state: IState) => {
    return {
        products: state.products.allIds.map((id) => state.products.byId[id]),
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IOrderItemAddProps) => {
    return {
        onAdd: (item: IOrderItem) => {
            dispatch(addOrderItem(item, ownProps.orderId));
        },
    };
};

const ConnectedOrderItemAdd = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderItemAdd);

export default ConnectedOrderItemAdd;
