import * as React from "react";

const OrderListItemHeader = () => {
    return (
        <div className="row header">
            <div className="row-left">
                <div>Order id</div>
                <div>Customer id</div>
            </div>
            <div className="row-right">
                <div>Total</div>
                <div>
                    Order detail
                </div>
            </div>
        </div>
    );
};

export default OrderListItemHeader;
