export interface IOrder {
    readonly id: string;
    readonly customerId: string;
};

export interface IOrderItem {
    readonly productId: string;
    readonly quantity: number;
}
