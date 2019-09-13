import { IMockedFetch, mockFetch } from "../fetch";
import { mockFetchOrders, mockPlaceOrder } from "./orders";
import { mockFetchProducts } from "./products";

export const mockApi = () => {
    const mockedFetch = mockFetch();
    mockFetchOrders(mockedFetch);
    mockPlaceOrder(mockedFetch);
    mockFetchProducts(mockedFetch);
};
