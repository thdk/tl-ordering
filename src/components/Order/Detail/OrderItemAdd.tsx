import React, { useCallback, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { IState } from "../../../core/app/types";
import { addOrderItem } from "../../../core/orderitems/actions";
import { IOrderItem } from "../../../core/orderitems/types";
import { getProducts } from "../../../core/products/reducer";

export interface IOrderItemAddProps {
    readonly orderId: string;
}

type Props = StateProps & DispatchProps & IOrderItemAddProps;

export const OrderItemAdd: React.FunctionComponent<Props> = props => {
    const { onAdd, products, orderId } = props;
    const defaultQuantiy = 1;

    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChanged = useCallback<(e: React.ChangeEvent<HTMLInputElement>) => void>(e => {
        setQuantity(+e.currentTarget.value);
    }, []);

    const handleProductChanged = useCallback<(e: React.ChangeEvent<HTMLSelectElement>) => void>(e => {
        setProductId(e.currentTarget.value);
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Todo: validate input

        if (productId) {
            onAdd(orderId, {
                productId,
                quantity,
            });
        }

        setProductId("");
        setQuantity(defaultQuantiy);

    }, [productId, quantity]);

    return (
        <form onSubmit={handleSubmit}>
            <label>Product id:</label>
            <select
                onChange={handleProductChanged}
                className="orderitem-add-product-select"
            >
                <option value="">Select a product</option>
                ${products.map(product => <option key={product.id} value={product.id}>{product.id}</option>)}
            </select>
            <label>Quantity:</label>
            <input className="orderitem-add-quantity"
                onChange={handleQuantityChanged}
                type="number"
                min="0"
                defaultValue={"1"}>
            </input>
            <input className="orderitem-add-submit-button" type="submit" value="Add product" />
        </form>
    );
};

OrderItemAdd.displayName = "OrderItemAdd";

type StateProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: IState) => ({
    products: getProducts(state),
});

type DispatchProps = typeof mapDispatchToProps;
const mapDispatchToProps = {
    onAdd: addOrderItem,
};

const ConnectedOrderItemAdd = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderItemAdd);

export default ConnectedOrderItemAdd;
