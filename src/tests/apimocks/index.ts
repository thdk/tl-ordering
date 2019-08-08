import { mockFetchOrders, mockPlaceOrder } from "./orders";
import { mockFetch } from "../fetch";

export const mockApi = () => {
    const mockedFetch = mockFetch();
    mockFetchOrders(mockedFetch);
    mockPlaceOrder(mockedFetch);
};