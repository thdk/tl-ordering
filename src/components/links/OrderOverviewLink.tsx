import React, { HTMLProps } from "react";
import { NavLink } from "react-router-dom";

export interface IOrderOverviewLinkProps extends HTMLProps<HTMLAnchorElement> { }

export const OrderOverviewLink = (props: IOrderOverviewLinkProps) => {
    const { children } = props;
    return (
        <NavLink
            exact
            to={`/`}
            activeStyle={{
                textDecoration: "none",
                color: "black",
            }}
        >
            {children}
        </NavLink>
    );
};
