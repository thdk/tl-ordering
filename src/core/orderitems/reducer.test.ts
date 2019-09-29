import { fetchOrdersSuccess, OrderAction } from "../orders/actions";
import * as orderTypes from "../orders/constants";
import { IOrderData } from "../orders/types";
import { addOrderItem, removeOrderItem } from "./actions";
import * as types from "./constants";
import reducer from "./reducer";
import { selectOrderItems } from "./selectors";
import { IOrderItemState } from "./types";

describe("Order items reducer:", () => {
    describe("Default", () => {
        it("should return initial state by default", () => {
            const initialState = { byOrderId: {} };
            expect(
                reducer(
                    initialState,
                    { type: "_ANY_OTHER_ACTION_" } as any as OrderAction,
                ),
            ).toBe(initialState);
        });

        it("should return default state when initial state is undefined", () => {
            const initialState = undefined;
            expect(
                reducer(
                    initialState,
                    { type: "_ANY_OTHER_ACTION_" } as any as OrderAction,
                ),
            ).toEqual({byOrderId: {}});
        });
    });
    describe("Fetch orders", () => {
        const initialState: IOrderItemState = {
            byOrderId: {},
        };
        describe(`when receiving ${orderTypes.FETCH_ORDERS_SUCCESS}`, () => {
            const orders: IOrderData[] = [
                {
                    customerId: "c1",
                    id: "o1",
                    items: [
                        {
                            orderId: "o1",
                            productId: "p1",
                            quantity: 3,
                        },
                        {
                            orderId: "o1",
                            productId: "p2",
                            quantity: 2,
                        },
                    ],
                },
            ];
            it("should update state with order items from payload", () => {
                expect(reducer(
                    initialState,
                    fetchOrdersSuccess(orders),
                )).toEqual({
                    byOrderId: {
                        o1:
                            [
                                {
                                    orderId: "o1",
                                    productId: "p1",
                                    quantity: 3,
                                },
                                {
                                    orderId: "o1",
                                    productId: "p2",
                                    quantity: 2,
                                },
                            ],
                    },
                });
            });
        });
    });

    describe("Add / Remove order items:", () => {
        let initialState: IOrderItemState;

        beforeEach(() => {
            initialState = {
                byOrderId: {
                    o1: [
                        {
                            productId: "p1",
                            quantity: 2,
                        },
                    ],
                    o2: [
                        {
                            productId: "p2",
                            quantity: 2,
                        },
                        {
                            productId: "p4",
                            quantity: 1,
                        },
                    ],
                },
            };
        });

        describe(`when receiving ${types.ADD_ORDER_ITEM}`, () => {
            describe("and order doesn't contain an item for that product yet", () => {
                it("should add a new order item to the state", () => {
                    const newOrderItem = { quantity: 1, productId: "p3" };
                    const orderId = "o1";

                    // Verfiy initial state did not contain the order item
                    expect(
                        selectOrderItems(initialState, orderId)
                            .some(item => item.productId === newOrderItem.productId),
                    ).toBe(false);

                    const newState = reducer(
                        initialState,
                        addOrderItem(orderId, newOrderItem),
                    );

                    const newOrderItems = selectOrderItems(newState, orderId)
                        .filter(item => item.productId === newOrderItem.productId);
                    expect(newOrderItems.length).toBe(1);
                    expect(newOrderItems[0].quantity).toBe(1);
                });
            });

            describe("and order contains already an item for that product", () => {
                it("should update the quantity of the existing order item", () => {
                    const newOrderItem = { quantity: 1, productId: "p2" };
                    const orderId = "o2";

                    // Verfiy initial state did contain the order item
                    expect(
                        selectOrderItems(initialState, orderId)
                            .some(item => item.productId === newOrderItem.productId),
                    ).toBe(true);

                    const newState = reducer(
                        initialState,
                        addOrderItem(orderId, newOrderItem),
                    );

                    const orderItems = selectOrderItems(newState, orderId)
                        .filter(item => item.productId === newOrderItem.productId);

                    // New state should contain exactly one order item for that product
                    expect(orderItems.length).toBe(1);

                    expect(orderItems[0].quantity).toBe(3);
                });
            });
        });

        describe(`when receiving ${types.REMOVE_ORDER_ITEM}`, () => {
            describe("and order doesn't contain an item for that product", () => {
                const productId = "p3";
                const orderId = "o2";

                it("should not remove any order item", () => {
                    const oldOrderItems = selectOrderItems(initialState, orderId);

                    expect(oldOrderItems.some(item => item.productId === productId))
                        .toBe(false);

                    const newState = reducer(
                        initialState,
                        removeOrderItem(productId, orderId),
                    );

                    const newOrderItems = selectOrderItems(newState, orderId);

                    expect(newOrderItems.length).toBe(oldOrderItems.length);

                    expect(newOrderItems.some(item => item.productId === productId))
                        .toBe(false);
                });
            });

            describe("and order contains an item for that product", () => {
                it("should remove the order item", () => {
                    const productId = "p2";
                    const orderId = "o2";

                    // Verfiy initial state did contain the order item
                    expect(
                        selectOrderItems(initialState, orderId)
                            .some(item => item.productId === productId),
                    ).toBe(true);

                    const newState = reducer(
                        initialState,
                        removeOrderItem(productId, orderId),
                    );

                    const orderItems = selectOrderItems(newState, orderId)
                        .filter(item => item.productId === productId);

                    // New state should not contain order item for that product
                    expect(orderItems.length).toBe(0);
                });
            });
        });
    });
});
