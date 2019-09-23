import * as React from "react";

export const OrderListItemHeader: React.FunctionComponent = () => {
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

OrderListItemHeader.displayName = "OrderListItemHeader";

export default OrderListItemHeader;
