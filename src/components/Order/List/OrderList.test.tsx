import { shallow, ShallowWrapper } from "enzyme";
import React from "react";

import { OrderListItem } from "./Item/OrderListItem";
import { OrderListItemHeader } from "./Item/OrderListItemHeader";
import { mapStateToProps, OrderList } from "./OrderList";

describe("Render OrderList", () => {
    let component: ShallowWrapper;
    describe("with multipe orders", () => {

        beforeEach(() => {
            component = shallow(
                <OrderList
                    orders={[
                        {
                            customerId: "c1",
                            id: "o1",
                            total: 5,
                            items: [],
                        },
                        {
                            customerId: "c2",
                            id: "o2",
                            total: 5,
                            items: [],
                        },
                        {
                            customerId: "c2",
                            id: "o3",
                            total: 5,
                            items: [],
                        },
                    ]} />,
            );
        });

        it("should match snapshot", () => {
            expect(component.debug()).toMatchSnapshot();
        });

        it("should have OrderListItemHeader component", () => {
            const listHeader = component.find(OrderListItemHeader);
            expect(listHeader.exists()).toBe(true);
        });

        it("should have a OrderListItem component for each order", () => {
            const items = component.find(OrderListItem);
            expect(items.length).toBe(3);
        });

        it("should display orders in correct order", () => {
            const items = component.find(OrderListItem);
            const orderIds = items.map(o => o.props().order.id);

            expect(orderIds).toEqual(["o1", "o2", "o3"]);
        });
    });

    describe("without orders", () => {

        beforeEach(() => {
            component = shallow(
                <OrderList
                    orders={[]}
                />,
            );
        });

        it("should match snapshot", () => {
            expect(component.debug()).toMatchSnapshot();
        });
    });
});

describe("OrderList mapStateToProps", () => {
    const stateProps = mapStateToProps({
        orderItems: {
            byOrderId: {},
        },
        orders: {
            byId: {
                o1: {
                    customerId: "c1",
                    id: "o1",
                },
            },
            isLoading: false,
            visibleIds: ["o1"],
        },
        products: {
            allIds: [],
            byId: {},
            isLoading: false,
        },
    });

    expect(stateProps.orders.length).toBe(1);
});
