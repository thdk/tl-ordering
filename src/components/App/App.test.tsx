import { fireEvent, getByTestId, render } from "@testing-library/react";
import React from "react";

import { shallow } from "enzyme";
import { App } from "./App";

const createProps = (isLoading: boolean) => ({
    fetchProducts: jest.fn(),
    fetchOrders: jest.fn(),
    isLoading,
});

describe("App rendering", () => {
    describe("when state is loading", () => {
        it("should match snapshot", () => {
            const component = shallow(
                <App {...createProps(false)}>App</App>,
            );

            expect(component.debug()).toMatchSnapshot();
        });

        it("should render loading indicator", () => {
            const { container } = render(<App {...createProps(true)}>App</App>);
            const loadingIndicator = getByTestId(container, "app-loading");
            expect(loadingIndicator).not.toBe(null);
        });
    });

    describe("when state is not loading", () => {
        it("should match snapshot", () => {
            const component = shallow(
                <App {...createProps(false)}>App</App>,
            );

            expect(component.debug()).toMatchSnapshot();
        });
    });
});
