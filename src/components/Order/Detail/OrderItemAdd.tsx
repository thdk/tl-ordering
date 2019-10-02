import React, { useCallback, useState } from "react";
import { connect } from "react-redux";

import { getProducts } from "../../../core/app/selectors";
import { IState } from "../../../core/app/types";
import { addOrderItem } from "../../../core/orderitems/actions";

export interface IOrderItemAddProps {
    readonly orderId: string;
}

type Props = StateProps & DispatchProps & IOrderItemAddProps;

export const OrderItemAdd: React.FunctionComponent<Props> = props => {
    const { onAdd, products, orderId } = props;

    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChanged = useCallback<(e: React.ChangeEvent<HTMLInputElement>) => void>(e => {
        const value = +e.currentTarget.value;
        setQuantity(value);
    }, []);

    const handleProductChanged = useCallback<(e: React.ChangeEvent<HTMLSelectElement>) => void>(e => {
        const value = e.currentTarget.value;
        setProductId(value);
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (productId) {
            onAdd(orderId, {
                productId,
                quantity,
            });
        }

    }, [productId, quantity]);

    return (
        <form onSubmit={handleSubmit}>
            <label>Product:</label>
            <select
                value={productId}
                onChange={handleProductChanged}
                className="orderitem-add-product-select"
            >
                <option value="">Select a product</option>
                ${products.map(product => (
                    <option key={product.id} value={product.id}>{product.description}</option>
                ))}
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

export const mapStateToProps = (state: IState) => ({
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
