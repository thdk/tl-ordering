import { getOrder } from "../app/selectors";
import { fetchOrdersFailure, fetchOrdersRequest, placeOrderSuccess } from "./actions";
import * as types from "./constants";
import reducer from "./reducer";
import { selectOrder, selectVisibleOrders } from "./selectors";
import { IOrder, IOrderState, IPlaceOrderData } from "./types";

let initialState: IOrderState;

describe("Orders reducer:", () => {

    describe("Fetch orders:", () => {

        describe(`when receiving ${types.FETCH_ORDERS_REQUEST}`, () => {
            it("should set isLoading to true", () => {
                const newState = reducer(undefined, fetchOrdersRequest());

                expect(newState.isLoading).toBe(true);
            });
        });

        describe(`when receiving ${types.FETCH_ORDERS_FAILURE}`, () => {
            it("should set isLoading = false", () => {
                expect(reducer(
                    undefined,
                    fetchOrdersFailure(new Error("error")),
                ).isLoading).toBe(false);
            });
        });

        describe(`when receiving ${types.FETCH_ORDERS_SUCCESS}`, () => {
            const payload = [
                {
                    customerId: "c1",
                    id: "o1",
                    items: [
                        {
                            orderId: "o1",
                            productId: "p1",
                            quantity: 2,
                        },
                    ],
                    isPlaced: true,
                },
                {
                    customerId: "c2",
                    id: "o2",
                    items: [
                        {
                            orderId: "o2",
                            productId: "p1",
                            quantity: 2,
                        },
                        {
                            orderId: "o2",
                            productId: "p2",
                            quantity: 1,
                        },
                    ],
                },
            ];

            const newState = reducer(
                undefined,
                {
                    type: types.FETCH_ORDERS_SUCCESS,
                    payload,
                });

            it("should update state with orders from payload", () => {
                expect(selectVisibleOrders(newState)).toEqual([
                    {
                        customerId: "c1",
                        id: "o1",
                        isPlaced: true,
                    },
                    {
                        customerId: "c2",
                        id: "o2",
                    },
                ] as IOrder[]);
            });

            it("should set isFetched to true", () => {
                expect(newState.isFetched).toBe(true);
            });
        });
    });

    describe("Place order:", () => {

        describe(`when receiving ${types.PLACE_ORDER_SUCCESS}`, () => {

            beforeEach(() => {
                initialState = {
                    byId: {
                        o1: {
                            customerId: "c1",
                            id: "o1",
                        },
                    },
                    visibleIds: ["o1"],
                };
            });

            describe("with payload success = true", () => {
                let newState: IOrderState;

                beforeEach(() => {
                    newState = reducer(initialState, placeOrderSuccess(
                        {
                            order: {
                                id: "o1",
                                customerId: "c1",
                            },
                            success: true,
                        } as IPlaceOrderData,
                    ));
                });

                it("should set isPlaced for specified order to true", () => {
                    const order = selectOrder(newState, "o1");
                    expect(
                        order && order.isPlaced,
                    ).toBe(true);
                });
            });

            describe("with payload success = false", () => {
                let newState: IOrderState;

                beforeEach(() => {
                    newState = reducer(initialState, placeOrderSuccess(
                        {
                            success: false,
                            reason: "The shop is not open",
                        } as IPlaceOrderData,
                    ));
                });

                it("should not change the order", () => {
                    expect(selectOrder(newState, "o1")).toBe(selectOrder(initialState, "o1"));
                });
            });

        });
    });
});
