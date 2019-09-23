import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import OrderListItem from "./OrderListItem";

describe("Render OrderListItem", () => {
    let component: ShallowWrapper;

    beforeEach(() => {
        component = shallow(
            <OrderListItem
                order={{
                    id: "o1",
                    total: 15.19,
                    customerId: "c1",
                }}
            />,
        );
    });

    it("should match snapshot", () => {
        expect(component.debug()).toMatchSnapshot();
    });
});
