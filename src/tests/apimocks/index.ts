import { mockFetchOrders } from "./orders";

export const mockApi = () => {
    mockFetchOrders(1000); // delay mocked api call with 1000ms
}