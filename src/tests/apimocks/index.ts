import { mockFetch } from "../fetch";
import { mockFetchOrders, mockPlaceOrder } from "./orders";

export const mockApi = () => {
    const mockedFetch = mockFetch();
    mockFetchOrders(mockedFetch);
    mockPlaceOrder(mockedFetch);
};
