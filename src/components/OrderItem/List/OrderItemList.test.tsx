import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { OrderItemList } from "..";
import ConnectedOrderItem from "./Item/OrderItem";

describe("Render OrderItemList", () => {
    let component: ShallowWrapper;
    describe("with multipe order items", () => {

        beforeEach(() => {
            component = shallow(
                <OrderItemList
                    orderId={"o1"}
                    orderItems={[
                        {
                            productId: "p1",
                            quantity: 2,
                        },
                        {
                            productId: "p2",
                            quantity: 1,
                        },
                        {
                            productId: "p3",
                            quantity: 1,
                        },
                    ]
                    }
                />,
            );
        });

        it("should match snapshot", () => {
            expect(component.debug()).toMatchSnapshot();
        });

        it("should have a OrderItemListItem component for each order item", () => {
            const items = component.find(ConnectedOrderItem);
            expect(items.length).toBe(3);
        });

        it("should display order items in correct order", () => {
            const items = component.find(ConnectedOrderItem);
            const orderIds = items.map(o => o.props().productId);

            expect(orderIds).toEqual(["p1", "p2", "p3"]);
        });
    });

    describe("without order items", () => {

        beforeEach(() => {
            component = shallow(
                <OrderItemList
                    orderId={"o1"}
                    orderItems={[]}
                />,
            );
        });

        it("should match snapshot", () => {
            expect(component.debug()).toMatchSnapshot();
        });
    });
});
