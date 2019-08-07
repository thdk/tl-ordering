export interface IOrder {
    readonly id: string;
    readonly customerId: string;
    readonly total: number;
};

export interface IOrderItem {
    readonly productId: string;
    readonly quantity: number;
}
