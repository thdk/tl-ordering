export interface IOrderData {
    id: string;
    items: IOrderItemData[];
    customerId: string;
    total: number;
}

export interface IOrderItemData {
    productId: string;
    quantity: number;
    orderId: string;
}