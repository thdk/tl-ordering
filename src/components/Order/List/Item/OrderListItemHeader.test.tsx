import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import OrderListItemHeader from "./OrderListItemHeader";

describe("Render OrderListItemHeader", () => {
    let component: ShallowWrapper;

    beforeEach(() => {
        component = shallow(
            <OrderListItemHeader />,
        );
    });

    it("should match snapshot", () => {
        expect(component.debug()).toMatchSnapshot();
    });
});
