import React, { HTMLProps } from "react";
import { NavLink } from "react-router-dom";

export interface IOrderLinkProps extends HTMLProps<HTMLAnchorElement> {
    orderId: string;
}

const OrderLink = (props: IOrderLinkProps) => {
    const { orderId, children } = props;
    return (
        <NavLink
            exact
            to={`/orders/${orderId}`}
            activeStyle={{
                textDecoration: "none",
                color: "black",
            }}
        >
            {children}
        </NavLink>
    );
};

export default OrderLink;
