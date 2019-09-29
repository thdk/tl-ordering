import { ProductCategory } from "../products/types";
import { getIsLoading, getProduct, getProducts, getVisibleOrders } from "./selectors";
import { IState } from "./types";

const createState = (isProductsLoading = false, isOrdersLoading = false): IState => ({
    products: {
        allIds: ["p1", "p2"],
        byId: {
            p1: {
                category: ProductCategory.electronics,
                description: "Product one",
                id: "p1",
                price: 10,
            },
            p2: {
                category: ProductCategory.electronics,
                description: "Product two",
                id: "p2",
                price: 17.45,
            },
        },
        isLoading: isProductsLoading,
    },
    orders: {
        byId: {
            o1: {
                customerId: "c1",
                id: "o1",
            },
            o2: {
                customerId: "c2",
                id: "o2",
            },
            o3: {
                customerId: "no-order-items",
                id: "o3",
            },
        },
        isLoading: isOrdersLoading,
        visibleIds: ["o1", "o2", "o3"],
    },
    orderItems: {
        byOrderId: {
            o1: [
                {
                    productId: "p1",
                    quantity: 13,
                },
            ],
            o2: [
                {
                    productId: "p1",
                    quantity: 1,
                },
                {
                    productId: "p2",
                    quantity: 3,
                },
                {
                    productId: "_invalid_",
                    quantity: 3,
                },
            ],
        },
    },
});

describe("App selectors:", () => {

    describe("getIsLoading", () => {
        describe("when products are loading", () => {
            it("should return true", () => {
                const isLoading = getIsLoading(createState(true, false));

                expect(isLoading).toBe(true);
            });
        });

        describe("when orders are loading", () => {
            it("should return true", () => {
                const isLoading = getIsLoading(createState(false, true));

                expect(isLoading).toBe(true);
            });
        });

        describe("when products and orders are loading", () => {
            it("should return true", () => {
                const isLoading = getIsLoading(createState(true, true));

                expect(isLoading).toBe(true);
            });
        });

        describe("when products and orders are NOT loading", () => {
            it("should return false", () => {
                const isLoading = getIsLoading(createState(false, false));

                expect(isLoading).toBe(false);
            });
        });
    });

    describe("getVisibileOrders", () => {

        const orders = getVisibleOrders(createState());

        it("should return three orders", () => {
            expect(orders.length).toBe(3);
        });

        it("should return total price for each order", () => {
            expect(orders[0].total).toBe(130);
            expect(orders[1].total).toBe(62.349999999999994);
        });
    });

    describe("getProducts", () => {
        const products = getProducts(createState());

        it("should return two products", () => {
            expect(products.length).toBe(2);
        });
    });
});
