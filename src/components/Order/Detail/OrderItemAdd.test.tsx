import { shallow } from "enzyme";
import React from "react";

import { ProductCategory } from "../../../core/products/types";
import { OrderItemAdd } from "./OrderItemAdd";

describe("Rendering OrderItemAdd", () => {
    const onAdd = jest.fn();

    const component = shallow(
        <OrderItemAdd
            orderId={"o1"}
            products={[
                {
                    id: "p1",
                    category: ProductCategory.electronics,
                    description: "Product description 1",
                    price: 5,
                },
                {
                    id: "p2",
                    category: ProductCategory.electronics,
                    description: "Product description 2",
                    price: 5,
                },
                {
                    id: "p3",
                    category: ProductCategory.electronics,
                    description: "Product description 3",
                    price: 5,
                },
            ]}
            onAdd={onAdd}
        />,
    );

    it("should match snapshot", () => {
        expect(component.debug()).toMatchSnapshot();
    });

    it("should call mockFunction on button click", () => {
        component.find("select").simulate("change", { currentTarget: { value: "p1" } });
        component.find(".orderitem-add-quantity").simulate("change", { currentTarget: { value: "3" } });

        component.find("form").simulate("submit", { preventDefault: jest.fn(), stopPropagation: jest.fn() });

        expect(onAdd).toBeCalledWith("o1", { productId: "p1", quantity: 3 });
    });
});
