import { IApiOrder, IApiPlaceOrderResult } from "../../core/orders/types";
import { IMockedFetch } from "../fetch";

export const ordersTestData = [
    {
        "id": "1",
        "customer-id": "1",
        "items": [
            {
                "product-id": "B102",
                "quantity": "10",
                "unit-price": "4.99",
                "total": "49.90",
            },
        ],
        "total": "49.90",
    },
    {
        "id": "2",
        "customer-id": "2",
        "items": [
            {
                "product-id": "B102",
                "quantity": "5",
                "unit-price": "4.99",
                "total": "24.95",
            },
        ],
        "total": "24.95",
    },
    {
        "id": "3",
        "customer-id": "3",
        "items": [
            {
                "product-id": "A101",
                "quantity": "2",
                "unit-price": "9.75",
                "total": "19.50",
            },
            {
                "product-id": "A102",
                "quantity": "1",
                "unit-price": "49.50",
                "total": "49.50",
            },
        ],
        "total": "69.00",
    },
];

const placeOrderTestData = (params: any) => {
    return {
        order: JSON.parse(params.body),
        result: "true",
    } as IApiPlaceOrderResult;
};

const apiUrl = process.env.apiUrl;
export const mockFetchOrders = (mockedFetch: IMockedFetch) => {
    mockedFetch.add<IApiOrder[]>(`${apiUrl}/orders`, ordersTestData);
};

export const mockPlaceOrder = (mockedFetch: IMockedFetch) => {
    mockedFetch.add(`${apiUrl}/placeorder`, placeOrderTestData);
};
